import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import { resumeData } from '@/lib/data/resume';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are the digital twin of Sabarish P, an Aspiring Software & Product Developer.
Answer questions strictly based on his resume data provided below.

RESPONSE RULES (follow these exactly):
- Be concise and slightly witty — no filler phrases like "Great question!" or "Certainly!"
- Always structure answers using short bullet points (•) or numbered lists
- Use **bold** for names, technologies, and key terms
- Keep each bullet to one clear idea — max 15 words per bullet
- If asked a simple yes/no question, answer in one line then add 1-2 bullets of context
- Never write long paragraphs — break everything into scannable points
- End with a short punchy one-liner or follow-up offer when appropriate

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}`;

const FALLBACK_MODELS = [
  'google/gemma-4-31b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'google/gemma-4-26b-a4b-it:free',
  'openai/gpt-oss-20b:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'poolside/laguna-m.1:free',
  'poolside/laguna-s-2.1:free',
  'poolside/laguna-xs-2.1:free',
  'cohere/north-mini-code:free',
  'nvidia/nemotron-3-nano-30b-a3b:free',
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  'nvidia/nemotron-nano-12b-v2-vl:free',
  'nvidia/nemotron-nano-9b-v2:free',
  'google/lyria-3-pro-preview',
  'google/lyria-3-clip-preview',
  'nvidia/nemotron-3.5-content-safety:free'
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("[AI TWIN] Received Request with messages:", messages.length);

    // CRITICAL FIX: Sanitize frontend UIMessages to match backend CoreMessage schema
    const coreMessages = await convertToModelMessages(messages);

    for (const modelSlug of FALLBACK_MODELS) {
      console.log(`[AI TWIN] Validating model availability: ${modelSlug}`);

      // 1. Ping the model with a minimal payload to confirm it is online
      const testResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelSlug,
          messages: [{ role: 'user', content: 'ping' }],
          max_tokens: 1,
        }),
      });

      if (!testResponse.ok) {
        console.warn(`[AI TWIN] Model ${modelSlug} rejected with status ${testResponse.status}. Skipping...`);
        continue;
      }

      // 2. Model is alive — start the real stream
      console.log(`[AI TWIN] Model ${modelSlug} is ONLINE. Starting stream...`);
      const result = await streamText({
        model: openrouter(modelSlug),
        system: SYSTEM_PROMPT,
        messages: coreMessages,
      });

      return result.toUIMessageStreamResponse();
    }

    return new Response(
      JSON.stringify({ error: 'The digital twin is currently sleeping. Please try again later.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("[AI TWIN] Fatal Route Error:", error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
