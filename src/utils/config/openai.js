import axios from 'axios';

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer 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`,
    'Content-Type': 'application/json',
  }
});

export const fetchChatGPTResponse = async (message) => {
  try {
    const response = await openai.post('/chat/completions', {
      model: "gpt-3.5-turbo",  // ou outro modelo disponível
      messages: [{role: "user", content: message}]
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default openai;
