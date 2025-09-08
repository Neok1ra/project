import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId, responses, userProfile } = await request.json()

    const groqApiKey = process.env.GROQ_API_KEY || "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"
    const groqClient = createGroq({ apiKey: groqApiKey })

    const prompt = `You are an expert career counselor analyzing quiz responses for a student in Jammu & Kashmir, India.

Student Profile:
- Class: ${userProfile.class}
- Location: Jammu & Kashmir
- Quiz Responses: ${JSON.stringify(responses)}

Based on the responses, provide detailed career guidance including:
1. Top 3 recommended streams/fields
2. Specific career paths within each stream
3. Colleges in J&K that offer these programs
4. Skills to develop
5. Future prospects and salary expectations

Return ONLY a valid JSON object in this exact format:
{
  "recommendations": [
    {
      "stream": "Science/Commerce/Arts",
      "match_percentage": 85,
      "careers": ["Career 1", "Career 2", "Career 3"],
      "colleges": ["College 1", "College 2"],
      "skills": ["Skill 1", "Skill 2"],
      "salary_range": "₹3-8 LPA",
      "growth_prospects": "High/Medium/Low"
    }
  ],
  "strengths": ["Strength 1", "Strength 2"],
  "areas_to_improve": ["Area 1", "Area 2"],
  "next_steps": ["Step 1", "Step 2"],
  "personalized_message": "Detailed guidance message for the student"
}`

    const { text } = await generateText({
      model: groqClient("llama-3.1-8b-instant"),
      prompt,
      temperature: 0.3,
      maxTokens: 1500,
    })

    let analysis
    try {
      analysis = JSON.parse(text)
    } catch (parseError) {
      console.error("Failed to parse AI analysis:", text)
      throw new Error("Invalid AI analysis format")
    }

    return NextResponse.json({
      success: true,
      analysis,
      generatedBy: "AI",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI Analysis Error:", error)

    const fallbackAnalysis = {
      recommendations: [
        {
          stream: "Science",
          match_percentage: 75,
          careers: ["Engineering", "Medical", "Research"],
          colleges: ["NIT Srinagar", "SKIMS", "University of Kashmir"],
          skills: ["Problem Solving", "Analytical Thinking"],
          salary_range: "₹4-12 LPA",
          growth_prospects: "High",
        },
      ],
      strengths: ["Logical Thinking", "Academic Performance"],
      areas_to_improve: ["Communication Skills", "Practical Application"],
      next_steps: ["Focus on JEE/NEET preparation", "Develop coding skills"],
      personalized_message:
        "Based on your responses, you show strong analytical abilities suitable for science streams.",
    }

    return NextResponse.json({
      success: true,
      analysis: fallbackAnalysis,
      generatedBy: "Fallback",
      error: "AI analysis failed, using fallback recommendations",
    })
  }
}
