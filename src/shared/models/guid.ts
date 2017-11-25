export class Guid {
    private _value: string;

    public toString = () : string => {
        return this._value;
    }

    constructor() {
        this._value = `${this._s4() + this._s4()}-${this._s4()}-${this._s4()}-${this._s4()}-${this._s4() + this._s4() + this._s4()}`;
    }

    private _s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}
