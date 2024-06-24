import { Participation } from "./Participation";

export class Country {
    constructor(public id: number,
                public country: string,
                public participations: Participation[]) {}
}
