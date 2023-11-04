import { openai } from "../src/app.js";

export const chatGPT = async (context, text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content: context,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return response.choices[0].message.content;
};
