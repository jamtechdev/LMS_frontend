export const fetchMessageApi = async (): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve("✅ Message from API!"), 1000);
    });
};
