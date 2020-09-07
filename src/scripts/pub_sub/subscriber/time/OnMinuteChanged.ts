import { ISubscriber } from "../ISubscriber";
import { PubSubConstants } from "../../PubSubConstants";
import { DateTime } from 'luxon'

export default class OnMinuteChanged implements ISubscriber<DateTime> {

    getName(): PubSubConstants {
        return PubSubConstants.MINUTE_CHANGED
    }

    trigger(data: DateTime): void {
        console.log("minute changed " + data.toLocal())
    }

}