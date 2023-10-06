/**
 * @author Youri Janssen
 * Generates a unique email address based on the current timestamp.
 * @returns {string} A unique email address.
 */
export function generateUniqueEmail(): string {
    const timestamp = new Date().getTime();
    return `user${timestamp}@testing.com`;
}
