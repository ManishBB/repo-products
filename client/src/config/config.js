const conf = {
    serverUrl: String(import.meta.env.SERVER_URL),
    baseUrl: "http://localhost:8000/api/v1",
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export default conf;
