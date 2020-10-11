import { DateTime } from 'luxon';
import FunctionCallSubscriber from '../FunctionCallSubscriber';
import Train from '../../../Train';
import { PubSubConstants } from '../../PubSubConstants';
import Platform from '../../../Platform';

export default class OnEntryByPlatformAndTime extends FunctionCallSubscriber<Train> {
	private time: DateTime;
	private platform: Platform;

	constructor(time: DateTime, platform: Platform, callback: (data: Train) => void) {
		super(callback);
		this.time = time;
		this.platform = platform;
	}

	getName(): string {
		return `${PubSubConstants.NEW_TRAIN}_${this.platform.uid}_${this.time.toMillis()}`;
	}
}
