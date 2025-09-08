import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId, userProfile, previousAnswers } = await request.json()

    const groqApiKey = process.env.GROQ_API_KEY || "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"
    if (!groqApiKey) {
      console.log("[v0] Groq API key not found, using fallback questions")
      throw new Error("Groq API key not configured")
    }

    const groqClient = createGroq({ apiKey: groqApiKey })

    const prompt = `You are an expert career counselor for students in Jammu & Kashmir, India. Generate 5 personalized career assessment questions for this student profile:

Student Profile:
- Class: ${userProfile.class}
- Previous Answers: ${JSON.stringify(previousAnswers || {})}
- Location: Jammu & Kashmir
- Language Preference: ${userProfile.language || "English"}

Requirements:
1. Generate exactly 5 multiple-choice questions
2. Each question should have 4 options (A, B, C, D)
3. Questions should be relevant to Indian education system and J&K opportunities
4. Focus on interests, aptitude, and career preferences
5. Avoid repeating similar questions from previous answers
6. Make questions age-appropriate for ${userProfile.class} students

Return ONLY a valid JSON object in this exact format:
{
  "questions": [
    {
      "id": "q1",
      "question": "Question text here?",
      "options": [
        { "id": "A", "text": "Option A text", "weight": { "science": 3, "commerce": 1, "arts": 0 } },
        { "id": "B", "text": "Option B text", "weight": { "science": 1, "commerce": 3, "arts": 1 } },
        { "id": "C", "text": "Option C text", "weight": { "science": 0, "commerce": 1, "arts": 3 } },
        { "id": "D", "text": "Option D text", "weight": { "science": 2, "commerce": 2, "arts": 2 } }
      ]
    }
  ]
}`

    const { text } = await generateText({
      model: groqClient("llama-3.1-8b-instant"),
      prompt,
      temperature: 0.7,
      maxTokens: 2000,
    })

    let aiQuestions
    try {
      aiQuestions = JSON.parse(text)
    } catch (parseError) {
      console.error("Failed to parse AI response:", text)
      throw new Error("Invalid AI response format")
    }

    if (!aiQuestions.questions || !Array.isArray(aiQuestions.questions)) {
      throw new Error("Invalid questions format from AI")
    }

    return NextResponse.json({
      success: true,
      questions: aiQuestions.questions,
      generatedBy: "AI",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI Quiz Generation Error:", error)

    const fallbackQuestions = [
      {
        id: "q1",
        question: "What type of activities do you enjoy most in your free time?",
        options: [
          { id: "A", text: "Reading books and researching topics", weight: { science: 2, commerce: 1, arts: 3 } },
          { id: "B", text: "Solving math problems and puzzles", weight: { science: 3, commerce: 2, arts: 0 } },
          { id: "C", text: "Drawing, painting, or creative writing", weight: { science: 0, commerce: 1, arts: 3 } },
          { id: "D", text: "Managing events or leading group projects", weight: { science: 1, commerce: 3, arts: 2 } },
        ],
      },
      {
        id: "q2",
        question: "Which subject area interests you the most?",
        options: [
          { id: "A", text: "Physics, Chemistry, Biology", weight: { science: 3, commerce: 0, arts: 0 } },
          { id: "B", text: "Mathematics, Economics, Accounts", weight: { science: 2, commerce: 3, arts: 0 } },
          { id: "C", text: "History, Literature, Psychology", weight: { science: 0, commerce: 1, arts: 3 } },
          { id: "D", text: "Computer Science, Technology", weight: { science: 3, commerce: 2, arts: 1 } },
        ],
      },
      {
        id: "q3",
        question: "What kind of work environment appeals to you?",
        options: [
          { id: "A", text: "Laboratory or research facility", weight: { science: 3, commerce: 0, arts: 1 } },
          { id: "B", text: "Corporate office or business setting", weight: { science: 1, commerce: 3, arts: 1 } },
          { id: "C", text: "Creative studio or cultural center", weight: { science: 0, commerce: 1, arts: 3 } },
          { id: "D", text: "Outdoor fieldwork or community service", weight: { science: 2, commerce: 2, arts: 2 } },
        ],
      },
      {
        id: "q4",
        question: "Which career goal motivates you the most?",
        options: [
          { id: "A", text: "Making scientific discoveries", weight: { science: 3, commerce: 0, arts: 1 } },
          { id: "B", text: "Building successful businesses", weight: { science: 1, commerce: 3, arts: 0 } },
          { id: "C", text: "Creating meaningful art or content", weight: { science: 0, commerce: 1, arts: 3 } },
          { id: "D", text: "Helping people and society", weight: { science: 2, commerce: 2, arts: 2 } },
        ],
      },
      {
        id: "q5",
        question: "How do you prefer to solve problems?",
        options: [
          {
            id: "A",
            text: "Through systematic analysis and experiments",
            weight: { science: 3, commerce: 1, arts: 0 },
          },
          {
            id: "B",
            text: "Using data, statistics, and logical reasoning",
            weight: { science: 2, commerce: 3, arts: 0 },
          },
          { id: "C", text: "Through creative thinking and intuition", weight: { science: 0, commerce: 1, arts: 3 } },
          {
            id: "D",
            text: "By collaborating and discussing with others",
            weight: { science: 1, commerce: 2, arts: 2 },
          },
        ],
      },
    ]

    return NextResponse.json({
      success: true,
      questions: fallbackQuestions,
      generatedBy: "Demo",
      message: "Using demo questions - AI generation requires API key configuration",
    })
  }
}
