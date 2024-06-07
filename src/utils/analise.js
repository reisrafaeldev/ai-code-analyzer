import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyD1sKkal3bgXQWl0Ayqa2-cuI2gK-NM2vM";
const genAI = new GoogleGenerativeAI(apiKey);

// Inicializa o modelo de IA generativa
const model = genAI.getGenerativeModel({
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
    
    // Usar generateContentStream para gerar conteúdo em streaming
    const { stream, response } = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig,
    });

    // Coletar e exibir cada parte do stream
    let fullResponseText = '';
    for await (const chunk of stream) {
      if (chunk && chunk.text) {
        fullResponseText += chunk.text();  // Concatenar texto de cada parte
      }
    }

    // Aguardar a resposta final (agregada)
    const finalResponse = await response;
    if (finalResponse && finalResponse.text) {
      return finalResponse.text();
    } else {
      throw new Error('Resposta final da IA não encontrada ou incompleta.');
    }
  } catch (error) {
    console.error('Erro na geração de texto pela IA:', error);
    return ''; // Retorna uma string vazia em caso de erro.
  }
}
