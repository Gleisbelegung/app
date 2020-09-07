import { IEvent } from "../IEvent";
import { PubSubConstants } from "../../PubSubConstants";
import { DateTime } from 'luxon'

export default class MinuteChangeEvent implements IEvent<DateTime> {
    time: DateTime;
    
    constructor(time: DateTime) {
        this.time = time;
    }

    getName(): PubSubConstants {
        return PubSubConstants.MINUTE_CHANGED;
    }

    getData(): DateTime {
        return this.time;
    }
}