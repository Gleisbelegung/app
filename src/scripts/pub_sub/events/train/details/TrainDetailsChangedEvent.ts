import { IEvent } from '../../IEvent';
import TrainDetails from '../../../../TrainDetails';
import Train from '../../../../Train';
import { PubSubConstants } from '../../../PubSubConstants';
import PubSubNameFormatter from '../../../PubSubNameFormatter';

export default class TrainDetailsChangedEvent implements IEvent<TrainDetails> {
	details: TrainDetails;
	train: Train;

	constructor(train: Train, details: TrainDetails) {
		this.train = train;
		this.details = details;
	}

	getName(): string {
		return PubSubNameFormatter.format(PubSubConstants.TRAIN_DETAILS_CHANGED, this.train);
	}

	getData(): TrainDetails {
		return this.details;
	}
}
