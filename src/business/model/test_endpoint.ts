export class Test {
    private _message!: string;
    public get message(): string {
        return this._message;
    }

    constructor(message: string) {
        this._message = message;
    }

    public toJSON(): {message: string} {
        return {message: this._message};
    }
}