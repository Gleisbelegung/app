import { IEvent } from '../../IEvent';
import Train from '../../../../Train';
import { PubSubConstants } from '../../../PubSubConstants';
import PubSubNameFormatter from '../../../PubSubNameFormatter';
import TrainStop from '../../../../TrainStop';

export default class TrainDetailsChangedEvent implements IEvent<TrainStop[]> {
	stops: TrainStop[];
	train: Train;

	constructor(train: Train, stops: TrainStop[]) {
		this.train = train;
		this.stops = stops;
	}

	getName(): string {
		return PubSubNameFormatter.format(PubSubConstants.TRAIN_SCHEDULE_CHANGED, this.train);
	}

	getData(): TrainStop[] {
		return this.stops;
	}
}
