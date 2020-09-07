import { IEvent } from "../IEvent";
import { PubSubConstants } from "../../PubSubConstants";
import { DateTime } from 'luxon'

export default class TimeChangeEvent implements IEvent<DateTime> {
    time: DateTime;
    
    constructor(time: DateTime) {
        this.time = time;
    }

    getName(): PubSubConstants {
        return PubSubConstants.TIME_CHANGED;
    }

    getData(): DateTime {
        return this.time;
    }
}