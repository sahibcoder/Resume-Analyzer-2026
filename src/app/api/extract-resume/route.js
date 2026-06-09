import { NextResponse } from "next/server";

import { extractResumeText } from "@/lib/resume-parser";
import { analyzeResume } from "@/lib/openrouter";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const userId = session.user.id;

    const formData = await request.formData();

    const companyName = formData.get("companyName");
    const jobTitle = formData.get("jobTitle");
    const jobDescription = formData.get("jobDescription");
    const resume = formData.get("resume");

    // =========================
    // VALIDATION
    // =========================

    if (!companyName || !jobTitle || !jobDescription || !resume) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // FILE DETAILS
    // =========================

    const fileName = resume.name;
    const fileSize = resume.size;
    const fileType = resume.type;

    // =========================
    // CLOUDINARY UPLOAD
    // =========================

    const bytes = await resume.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // const uploadedFile = await new Promise(
    //   (resolve, reject) => {
    //     cloudinary.uploader
    //       .upload_stream(
    //         {
    //           resource_type: "raw",
    //           folder: "resumes",
    //         },
    //         (error, result) => {
    //           if (error) reject(error);
    //           else resolve(result);
    //         }
    //       )
    //       .end(buffer);
    //   }
    // );

    const uploadedFile = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            folder: "resumes",

            public_id: `${Date.now()}-${resume.name}`,

            use_filename: true,
            unique_filename: false,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });
    console.log("Uploaded File:", uploadedFile);

    // const fileUrl = uploadedFile.secure_url;
    const fileUrl = uploadedFile.secure_url.replace(
      "/upload/",
      "/upload/fl_attachment/",
    );

    // =========================
    // RESUME TEXT EXTRACT
    // =========================

    const resumeText = await extractResumeText(resume);

    // =========================
    // AI PROMPT
    // =========================

    const prompt = `
You are an expert ATS Resume Analyzer.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "matchPercentage": 0,

  "finalVerdict": "",

  "resumeScoreGauge": {
    "resumeQuality": 0,
    "recruiterReadability": 0
  },

  "skillMatchAnalysis": {
    "missingSkills": []
  },

  "missingKeywordsAnalysis": {
    "keywords": []
  }
}

JOB TITLE:
${jobTitle}

COMPANY:
${companyName}

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}
`;

    // =========================
    // AI RESPONSE
    // =========================

    const aiResponse = await analyzeResume(prompt);

    const cleanResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(cleanResponse);

    // =========================
    // DATABASE SAVE
    // =========================

    const savedAnalysis = await prisma.resumeAnalysis.create({
      data: {
        atsScore: analysis.atsScore || 0,

        matchPercentage: analysis.matchPercentage || 0,

        resumeQuality: analysis.resumeScoreGauge?.resumeQuality || 0,

        recruiterReadability:
          analysis.resumeScoreGauge?.recruiterReadability || 0,

        missingSkills: analysis.skillMatchAnalysis?.missingSkills || [],

        missingKeywords: analysis.missingKeywordsAnalysis?.keywords || [],

        finalVerdict: analysis.finalVerdict || "",

        // File Details
        fileUrl,
        fileName,
        fileSize,
        fileType,

        // User Relation
        userId,
      },
    });

    // =========================
    // RESPONSE
    // =========================

    return NextResponse.json({
      success: true,
      analysis,
      savedAnalysis,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
