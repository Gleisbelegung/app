import { IEvent } from '../IEvent';
import Train from '../../../Train';
import { PubSubConstants } from '../../PubSubConstants';

export default class NewTrainEvent implements IEvent<Train> {
	private readonly train: Train;

	constructor(train: Train) {
		this.train = train;
	}

	getName(): string {
		return `${PubSubConstants.NEW_TRAIN}`;
	}

	getData(): Train {
		return this.train;
	}
}
