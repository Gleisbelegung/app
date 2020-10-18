import IMessage from './IMessage';
import { MessageConstants } from '../MessageConstants';

export default class TrainDetailsMessage implements IMessage {
	private readonly trainId: Number;

	constructor(trainId: Number) {
		this.trainId = trainId;
	}

	getMessage(): string {
		return `<${MessageConstants.TRAIN_DETAILS} zid='${this.trainId}' />`;
	}
}
