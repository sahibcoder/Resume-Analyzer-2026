import { NextResponse } from "next/server";
import { openrouter } from "@/lib/openrouter";

export async function POST() {
  try {
    const completion =
      await openrouter.chat.completions.create({
        model: "openai/gpt-4.1-mini",
        messages: [
          {
            role: "user",
            content: "Say Hello Resume Analyzer",
          },
        ],
      });

    return NextResponse.json({
      success: true,
      response:
        completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}