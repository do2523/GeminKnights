const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Replace this with your actual API key
const API_KEY = process.env.gemini_key;

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateText(prompt) {
  try {
    // Make sure to use 'gemini-1.5-pro-latest' or 'gemini-1.0-pro'
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini response:", text);
  } catch (error) {
    console.error("Error using Gemini API:", error);
  }
}

generateText("What is the capital of Spain?");
