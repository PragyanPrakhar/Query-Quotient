import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
    const supportAgent = createAgent({
        model: gemini({
            model: "gemini-1.5-flash-8b",
            apiKey: process.env.GEMINI_API_KEY,
        }),
        name: "AI Ticket Analyzer",
        system: `You are an expert AI assistant that processes technical support tickets.
Your task is to analyze tickets and return ONLY a valid JSON object with no additional text.

CRITICAL INSTRUCTIONS:
- Return ONLY raw JSON with no markdown formatting, no code blocks, no comments
- The response must be a parseable JSON object and nothing else
- Do not wrap your response in \`\`\`json or any other formatting
- Include these fields: summary, priority, helpfulNotes, and relatedSkills`,
    });

    try {
        console.log("Analyzing ticket:", ticket.title);

        const response = await supportAgent.run(`
Analyze this support ticket and provide ONLY a JSON object with these fields:
- summary: A short 1-2 sentence summary of the issue
- priority: One of "low", "medium", or "high"
- helpfulNotes: A detailed technical explanation with useful resources
- relatedSkills: An array of relevant technical skills needed

Ticket information:
- Title: ${ticket.title}
- Description: ${ticket.description}

IMPORTANT: Return ONLY the JSON object with no additional text or formatting.
`);

        console.log("Raw AI response:", response.output[0].content);

        // Extract and parse the JSON
        return parseAIResponse(response.output[0].content);
    } catch (error) {
        console.error("Error in AI ticket analysis:", error);
        return {
            error: true,
            data: null,
            message: `AI processing error: ${error.message}`,
        };
    }
};

function parseAIResponse(rawResponse) {
    try {
        // First attempt: Try direct JSON parsing
        try {
            return JSON.parse(rawResponse);
        } catch (e) {
            console.log(
                "Direct JSON parsing failed, trying extraction methods"
            );
        }

        // Second attempt: Extract JSON object pattern
        const jsonPattern = /{[\s\S]*}/;
        const match = rawResponse.match(jsonPattern);

        if (!match) {
            throw new Error("No JSON object structure found in response");
        }

        let jsonString = match[0];

        // Clean up the extracted JSON string
        jsonString = jsonString
            .replace(/\\n/g, " ")
            .replace(/\\"/g, '"')
            .replace(/[""]/g, '"')
            .replace(/['']/g, "'")
            .trim();

        console.log("Extracted JSON string:", jsonString);

        // Parse the cleaned JSON
        const parsedData = JSON.parse(jsonString);

        // Validate required fields
        const requiredFields = [
            "summary",
            "priority",
            "helpfulNotes",
            "relatedSkills",
        ];
        const missingFields = requiredFields.filter(
            (field) => !parsedData[field]
        );

        if (missingFields.length > 0) {
            console.warn(
                `Missing required fields in AI response: ${missingFields.join(
                    ", "
                )}`
            );

            // Provide defaults for missing fields
            missingFields.forEach((field) => {
                if (field === "relatedSkills") {
                    parsedData[field] = ["General Support"];
                } else if (field === "priority") {
                    parsedData[field] = "medium";
                } else {
                    parsedData[field] = "Not provided by AI";
                }
            });
        }

        return parsedData;
    } catch (error) {
        console.error("Failed to parse AI response:", error);
        console.error("Raw response was:", rawResponse);

        // Return a structured error response
        return {
            error: true,
            data: null,
            message: "Failed to parse AI response: " + error.message,
        };
    }
}

export default analyzeTicket;
