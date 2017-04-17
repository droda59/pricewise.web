import * as moment from "moment";

export class TimeAgoValueConverter {
    toView(value: Date) {
        const utcValue = moment(value).utc();
        const currentMoment = moment().utc();

        return utcValue.from(currentMoment);
    }
}
