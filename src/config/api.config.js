const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('Gemini API key is missing. Please check your .env file');
}

export { GEMINI_API_KEY }; 