import PubSubNameFormatter from '../../../PubSubNameFormatter';
import { PubSubConstants } from '../../../PubSubConstants';
import Train from '../../../../Train';
import TrainStop from '../../../../TrainStop';
import Subscriber from '../../Subscriber';

export default class OnTrainDetailsChanged extends Subscriber<TrainStop[]> {
	train: Train;
	callback: (train: Train, data: TrainStop[]) => void;

	constructor(train: Train, callback: (train: Train, data: TrainStop[]) => void) {
		super();
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
