import { NextResponse } from "next/server";
import { extractResumeText } from "@/lib/resume-parser";
import { analyzeResume } from "@/lib/openrouter";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const companyName = formData.get("companyName");
    const jobTitle = formData.get("jobTitle");
    const jobDescription = formData.get("jobDescription");
    const resume = formData.get("resume");

    const resumeText = await extractResumeText(resume);

    const prompt = `
You are an ATS Resume Analyzer.

Return ONLY JSON.

{
  "atsScore":0,
  "matchPercentage":0,
  "summary":"",
  "strengths":[],
  "missingKeywords":[],
  "improvements":[],
  "finalVerdict":""
}

Job Title:
${jobTitle}

Company:
${companyName}

Job Description:
${jobDescription}

Resume:
${resumeText}
`;

    const aiResponse = await analyzeResume(prompt);

    // CLEAN RESPONSE BEFORE PARSE
    const cleanResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(cleanResponse);

    console.log("Analysis:", analysis);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
