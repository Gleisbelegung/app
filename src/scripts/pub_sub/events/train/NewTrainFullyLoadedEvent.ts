import { IEvent } from '../IEvent';
import Train from '../../../Train';
import { PubSubConstants } from '../../PubSubConstants';
import PubSubNameFormatter from '../../PubSubNameFormatter';

export default class NewTrainFullyLoadedEvent implements IEvent<Train> {
	private readonly train: Train;

	constructor(train: Train) {
		this.train = train;
	}

	getName(): string {
		return PubSubNameFormatter.format(PubSubConstants.NEW_TRAIN_LOADED, this.train);
	}

	getData(): Train {
		return this.train;
	}
}
