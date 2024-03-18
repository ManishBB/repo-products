const conf = {
    serverUrl: String(import.meta.env.SERVER_URL),
    baseUrl: "https://nice-ruby-chinchilla-hat.cyclic.app/api/v1",
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export default conf;
