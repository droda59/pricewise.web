import { UserAlertSummary } from "./user-alert-summary";

export class List implements IList {
    id: string;
    name: string;
    alerts: Array<UserAlertSummary>;

    constructor();
    constructor(dto: IList);
    constructor(dto?: IList) {
        if (dto) {
            (<any>Object).assign(this, dto);

            this.alerts = dto.alerts
                ? dto.alerts.map(alertDto => new UserAlertSummary(alertDto)) 
                : new Array<UserAlertSummary>();
        }
    }
}

interface IList {
    id: string;
    name: string;
    alerts: Array<UserAlertSummary>;
}
