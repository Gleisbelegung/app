import IMessage from './IMessage';
import { MessageConstants } from '../MessageConstants';

export default class TrainScheduleMessage implements IMessage {
	private readonly trainId: number;

	constructor(trainId: number) {
		this.trainId = trainId;
	}

	getMessage(): string {
		return `<${MessageConstants.TRAIN_SCHEDULE} zid='${this.trainId}' />`;
	}
}
