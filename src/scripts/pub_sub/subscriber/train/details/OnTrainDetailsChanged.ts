import TrainDetails from '../../../../TrainDetails';
import PubSubNameFormatter from '../../../PubSubNameFormatter';
import { PubSubConstants } from '../../../PubSubConstants';
import Train from '../../../../Train';
import { ISubscriber } from '../../ISubscriber';

export default class OnTrainDetailsChanged implements ISubscriber<TrainDetails> {
	train: Train;
	callback: (train: Train, data: TrainDetails) => void;

	constructor(train: Train, callback: (train: Train, data: TrainDetails) => void) {
		this.train = train;
		this.callback = callback;
	}

	getName(): string {
		return PubSubNameFormatter.format(PubSubConstants.TRAIN_DETAILS_CHANGED, this.train);
	}

	trigger(data: TrainDetails): void {
		if (this.callback === undefined) {
			throw new Error(`Callback for ${this.getName()} was not provided!`);
		}
		this.callback(this.train, data);
	}
}
