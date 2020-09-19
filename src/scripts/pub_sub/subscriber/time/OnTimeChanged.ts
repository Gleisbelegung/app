import FunctionCallSubscriber from "../FunctionCallSubscriber";
import { PubSubConstants } from "../../PubSubConstants";
import { DateTime } from 'luxon'

export default class OnTimeChanged extends FunctionCallSubscriber<DateTime> {

    constructor(callback: (data: DateTime) => void) {
        super(callback)
    }

    getName(): PubSubConstants {
        return PubSubConstants.TIME_CHANGED
    }

}