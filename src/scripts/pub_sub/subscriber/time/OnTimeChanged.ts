import { ISubscriber } from "../ISubscriber";
import { PubSubConstants } from "../../PubSubConstants";
import { DateTime } from 'luxon'

export default class OnTimeChanged implements ISubscriber<DateTime> {

    getName(): PubSubConstants {
        return PubSubConstants.TIME_CHANGED
    }

    trigger(data: DateTime): void {
        console.log("date time changed " + data.toLocal())
    }

}