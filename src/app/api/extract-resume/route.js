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
You are an expert ATS Resume Analyzer, Recruiter, Career Coach, and Hiring Manager.

Analyze the resume against the provided Job Description.

IMPORTANT RULES:
- Return ONLY valid JSON.
- Do not return markdown.
- Do not wrap response in \`\`\`json.
- All scores must be between 0 and 100.
- Give realistic and professional feedback.

Return JSON in this exact format:

{
  "atsScore": 0,
  "matchPercentage": 0,

  "resumeSummary": "",

  "finalVerdict": "",

  "resumeScoreGauge": {
    "atsCompatibility": 0,
    "resumeQuality": 0,
    "recruiterReadability": 0
  },

  "skillMatchAnalysis": {
    "matchedSkills": [
      {
        "skill": "",
        "score": 0
      }
    ],
    "missingSkills": [],
    "recommendedSkills": [],
    "skillGapPercentage": 0
  },

  "sectionWiseAnalysis": {
    "professionalSummary": {
      "score": 0,
      "feedback": "",
      "suggestion": ""
    },
    "skillsSection": {
      "score": 0,
      "feedback": "",
      "suggestion": ""
    },
    "experienceSection": {
      "score": 0,
      "feedback": "",
      "suggestion": ""
    },
    "projectsSection": {
      "score": 0,
      "feedback": "",
      "suggestion": ""
    },
    "educationSection": {
      "score": 0,
      "feedback": "",
      "suggestion": ""
    }
  },

  "missingKeywordsAnalysis": {
    "keywords": [],
    "priorityKeywords": [],
    "atsImpactLevel": "Low"
  },

  "resumeStrengths": [],

  "resumeWeaknesses": [],

  "improvementSuggestions": [],

  "careerCoach": {
    "overallAdvice": "",
    "recommendedLearningPath": [],
    "recommendedProjects": [],
    "nextCareerSteps": []
  },

  "interviewQuestions": {
    "technical": [],
    "projectBased": [],
    "behavioral": [],
    "hr": []
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

    //     const prompt = `
    // You are an ATS Resume Analyzer.

    // Return ONLY JSON.

    // {
    //   "atsScore":0,
    //   "matchPercentage":0,
    //   "summary":"",
    //   "strengths":[],
    //   "missingKeywords":[],
    //   "improvements":[],
    //   "finalVerdict":""
    // }

    // Job Title:
    // ${jobTitle}

    // Company:
    // ${companyName}

    // Job Description:
    // ${jobDescription}

    // Resume:
    // ${resumeText}
    // `;

    const aiResponse = await analyzeResume(prompt);

    // CLEAN RESPONSE BEFORE PARSE
    const cleanResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(cleanResponse);

    // console.log("Analysis:", analysis);

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