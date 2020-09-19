import { DateTime } from 'luxon';
import { PubSubConstants } from '../../PubSubConstants';
import FunctionCallSubscriber from '../FunctionCallSubscriber';

export default class OnMinuteChanged extends FunctionCallSubscriber<DateTime> {
	constructor(callback: (data: DateTime) => void) {
		super(callback);
	}

	getName(): PubSubConstants {
		return PubSubConstants.MINUTE_CHANGED;
	}
}