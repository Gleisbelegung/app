import FunctionCallSubscriber from '../FunctionCallSubscriber';
import Train from '../../../Train';
import { PubSubConstants } from '../../PubSubConstants';
import PubSubNameFormatter from '../../PubSubNameFormatter';

export default class OnNewTrain extends FunctionCallSubscriber<Train> {
	private trainId: number;

	constructor(trainId: number, callback: (data: Train) => void) {
		super(callback);
		this.trainId = trainId;
	}

	getName(): string {
		return PubSubNameFormatter.format2(PubSubConstants.NEW_TRAIN_LOADED, this.trainId);
	}
}
