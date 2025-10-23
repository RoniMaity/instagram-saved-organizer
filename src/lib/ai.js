// import 'dotenv/config'ch

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function categorize(data) {
const prompt = `
You will be given Instagram post data in this exact format:
[
  [ "caption string here" ],
  [ "hashtag1", "hashtag2", ... ]
]
Your task:
Determine the single most accurate topic category that best represents the post using both the caption and hashtags.
Output Rules:
Output only one category
Must be a single word or short phrase
Example categories:
Food, Travel, Fitness, Motivation, Fashion, Pets, Technology, Business, Nature, Sports, Art, Coding, Quotes, Lifestyle
Do NOT provide explanations
Do NOT output more than one category
Input:
${data}
Output:
Only the category name.
`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  } catch {
    return { category: "Other", hashtags: [] };
  }
}
