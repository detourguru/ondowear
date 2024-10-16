import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";

export const useGemini = (prompt: string) => {
  const [gemini, setGemini] = useState("");

  useEffect(() => {
    const getGemini = async () => {
      const genAI = new GoogleGenerativeAI(
        `${process.env.NEXT_PUBLIC_GEMINI_APP_KEY}`
      );
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
      });
      try {
        if (prompt.length > 0) {
          const result = await model.generateContent(prompt);
          setGemini(result.response.text());
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGemini();
  }, [prompt]);

  return { gemini };
};
