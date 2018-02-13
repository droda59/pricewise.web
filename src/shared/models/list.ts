import { UserAlertSummary } from "./user-alert-summary";

export class List implements IList {
    id: string;
    name: string;
    alerts: Array<UserAlertSummary>;
    isPublic: boolean;

    constructor();
    constructor(dto: IList);
    constructor(dto?: IList) {
        this.alerts = new Array<UserAlertSummary>();

        if (dto) {
            (<any>Object).assign(this, dto);

            if (dto.alerts) {
                this.alerts = dto.alerts.map(alertDto => new UserAlertSummary(alertDto)) ;
            }
        }
    }
}

export interface IList {
    id: string;
    name: string;
    alerts: Array<UserAlertSummary>;
    isPublic: boolean;
}
