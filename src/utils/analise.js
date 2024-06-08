import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_AI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Inicializa o modelo de IA generativa
const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});
const modelComplex = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 1,
  topK: 0,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

export async function aiGeneration(prompt, text) {
  try {
    const fullPrompt = prompt + window.atob(text);
    
    const { stream, response } = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig,
    });

    
    let fullResponseText = '';
    for await (const chunk of stream) {
      if (chunk && chunk.text) {
        fullResponseText += chunk.text(); 
      }
    }

    const finalResponse = await response;
    if (finalResponse && finalResponse.text) {
      return finalResponse.text();
    } else {
      throw new Error('Resposta final da IA não encontrada ou incompleta.');
    }
  } catch (error) {
    console.error('Erro na geração de texto pela IA:', error);
    return ''; 
  }
}
export async function aiAutoGeneration(prompt, text) {
  try {
    const fullPrompt = prompt + text;
    

    const { stream, response } = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig,
    });

    
    let fullResponseText = '';
    for await (const chunk of stream) {
      if (chunk && chunk.text) {
        fullResponseText += chunk.text(); 
      }
    }

    const finalResponse = await response;
    if (finalResponse && finalResponse.text) {
      return finalResponse.text();
    } else {
      throw new Error('Resposta final da IA não encontrada ou incompleta.');
    }
  } catch (error) {
    console.error('Erro na geração de texto pela IA:', error);
    return ''; 
  }
}
export async function aiComplexidadeAnalyser(prompt, text) {
  try {
    const fullPrompt = prompt + text;
    

    const { stream, response } = await modelComplex.generateContentStream({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig,
    });

    
    let fullResponseText = '';
    for await (const chunk of stream) {
      if (chunk && chunk.text) {
        fullResponseText += chunk.text(); 
      }
    }

    const finalResponse = await response;
    if (finalResponse && finalResponse.text) {
      return finalResponse.text();
    } else {
      throw new Error('Resposta final da IA não encontrada ou incompleta.');
    }
  } catch (error) {
    console.error('Erro na geração de texto pela IA:', error);
    return ''; 
  }
}
