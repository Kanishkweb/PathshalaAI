import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({}); // picks API key from GEMINI_API_KEY

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
    You are PathshalaAI — an English tutor.
    Correct mistakes, explain grammar simply, give examples, and be friendly.
    Student: ${message}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",  // this is valid in new SDK
      contents: prompt,
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
