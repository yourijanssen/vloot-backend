import bcrypt from 'bcrypt';

/**
 * @author Youri Janssen
 * Represents the roles of a user.
 */
export enum Roles {
    USER = 'user',
    ADMIN = 'admin',
}

/**
 * @author Youri Janssen
 * Represents a user with email and password.
 */
export class User {
    private email: string;
    private password: string;
    private type: Roles;
    private active: number;
    /**
     * @author Youri Janssen
     * Creates a new User instance.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     */
    private constructor(
        email: string,
        password: string,
        type: Roles,
        active: number
    ) {
        this.email = email;
        this.password = password;
        this.type = type;
        this.active = active;
    }

    /**
     * @author Youri Janssen
     * Method for creates a new User instance.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {User} The created User object.
     */
    public static createUser(
        email: string,
        password: string,
        type: Roles,
        active: number
    ): User {
        return new User(email, password, type, active);
    }

    /**
     * @author Youri Janssen
     * Validates the user's email and password.
     * @returns {null|string[]} An array of validation error messages, or null if valid.
     */
    public validateUser(): null | string[] {
        const passwordRegEx =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;

        const emailRegEx =
            /^(?=.{1,320}$)^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const error: string[] = [];
        if (passwordRegEx.test(this.password) === false) {
            error.push('Invalid password');
        }
        if (emailRegEx.test(this.email) === false) {
            error.push('Invalid email');
        }
        return error.length > 0 ? error : null;
    }

    /**
     * @author Youri Janssen
     * Hashes a user's password using bcrypt with salt rounds.
     * @param {string} password - The password to be hashed.
     * @param {number} saltRounds - The number of salt rounds to use for hashing.
     *   A higher value increases security but also computational cost.
     * @returns {Promise<string>} A promise that resolves to the hashed password.
     */
    public static hashPassword(
        password: string,
        saltRounds: number
    ): Promise<string> {
        return bcrypt.hash(password, saltRounds);
    }
}
