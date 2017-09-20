import { UserSettings } from "../../settings/models/user-settings";

export class User implements IUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    settings: UserSettings;

    constructor();
    constructor(dto: IUser);
    constructor(dto?: IUser) {
        if (dto) {
            (<any>Object).assign(this, dto);

            this.settings = new UserSettings(dto.settings);
        }
    }
}

interface IUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    settings: UserSettings;
}
