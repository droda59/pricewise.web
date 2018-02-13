import { List, IList } from "../../shared/models/list";

export class SharedList extends List implements ISharedList {
    userName: string;

    constructor();
    constructor(dto: ISharedList);
    constructor(dto?: ISharedList) {
        super(dto);

        if (dto) {
            this.userName = dto.userName;
        }
    }
}

interface ISharedList extends IList {
    userName: string;
}
