
export const generateCustomId = (prefix) => {
    // Generate 4 random digits
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomDigits}`;
};
