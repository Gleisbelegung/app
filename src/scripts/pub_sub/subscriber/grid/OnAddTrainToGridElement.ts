import { DateTime } from 'luxon';
import Platform from '../../../Platform';
import Train from '../../../Train';
import { PubSubConstants } from '../../PubSubConstants';
import PubSubNameFormatter from '../../PubSubNameFormatter';
import FunctionCallSubscriber from '../FunctionCallSubscriber';

export default class OnAddTrainToGridElement extends FunctionCallSubscriber<Train> {
	time: DateTime;
	platform: Platform;

	constructor(platform: Platform, time: DateTime, callback: (data: Train) => void) {
		super(callback);
		this.platform = platform;
		this.time = time;
	}

	getName(): string {
		return PubSubNameFormatter.format1(PubSubConstants.TRAIN_ADD_TO_GRID, this.platform, this.time);
	}
}
