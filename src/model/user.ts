import bcrypt from 'bcrypt';

/**
 * @author Youri Janssen
 */
export class User {
    private id: number | undefined;
    private userMail: string;
    private userPassword: string;
    private constructor(userMail: string, userPassword: string) {
        this.userMail = userMail;
        this.userPassword = userPassword;
    }

    static createUser(userMail: string, userPassword: string): User {
        const user = new User(userMail, userPassword);
        return user;
    }

    public validateUser(): null | string[] {
        const passwordRegEx =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        const emailRegEx =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const error: string[] = [];
        if (passwordRegEx.test(this.userPassword) === false) {
            error.push('Invalid password');
        }
        if (emailRegEx.test(this.userMail) === false) {
            error.push('Invalid email');
        }
        return error.length > 0 ? error : null;
    }

    /**
     * Hashes a user's password using bcrypt with salt rounds.
     * @param {string} userPassword - The password to be hashed.
     * @param {number} saltRounds - The number of salt rounds to use for hashing.
     *   A higher value increases security but also computational cost.
     * @returns {Promise<string>} A promise that resolves to the hashed password.
     */
    public static hashPassword(
        userPassword: string,
        saltRounds: number
    ): Promise<string> {
        return bcrypt.hash(userPassword, saltRounds);
    }
}
