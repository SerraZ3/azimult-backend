const { API_CHAT_GPT, PAYMENT_ACCESS_TOKEN, PAYMENT_URL_API } = process.env;

const openaiConfig = {
  apiKey: API_CHAT_GPT || "",
};

export default openaiConfig;
