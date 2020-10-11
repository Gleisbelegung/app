import { DateTime } from 'luxon';
import { IEvent } from '../IEvent';
import Train from '../../../Train';
import Platform from '../../../Platform';
import PubSubNameFormatter from '../../PubSubNameFormatter';
import { PubSubConstants } from '../../PubSubConstants';

export default class AddTrainToGridElementEvent implements IEvent<Train> {
	time: DateTime;
	platform: Platform;
	train: Train;

	constructor(platform: Platform, time: DateTime, train: Train) {
		this.time = time;
		this.platform = platform;
		this.train = train;
	}

	getName(): string {
		return PubSubNameFormatter.format1(PubSubConstants.TRAIN_ADD_TO_GRID, this.platform, this.time);
	}

	getData(): Train {
		return this.train;
	}
}
