import PubSubNameFormatter from '../../../PubSubNameFormatter';
import { PubSubConstants } from '../../../PubSubConstants';
import Train from '../../../../Train';
import TrainStop from '../../../../TrainStop';
import { ISubscriber } from '../../ISubscriber';

export default class OnTrainDetailsChanged implements ISubscriber<TrainStop[]> {
	train: Train;
	callback: (train: Train, data: TrainStop[]) => void;

	constructor(train: Train, callback: (train: Train, data: TrainStop[]) => void) {
		this.callback = callback;
		this.train = train;
	}

	getName(): string {
		return PubSubNameFormatter.format(PubSubConstants.TRAIN_SCHEDULE_CHANGED, this.train);
	}

	trigger(data: TrainStop[]): void {
		if (this.callback === undefined) {
			throw new Error(`Callback for ${this.getName()} was not provided!`);
		}
		this.callback(this.train, data);
	}
}
