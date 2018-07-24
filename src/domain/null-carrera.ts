import { Carrera } from "./carrera";

export class NullCarrera extends Carrera {
    constructor() {
        super("", "", "");
    }

    public isNull(): boolean {
        return true;
    }
}
