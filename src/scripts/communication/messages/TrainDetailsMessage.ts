import IMessage from "./IMessage";
import { MessageConstants } from '../MessageConstants'

export default class TrainDetailsMessage implements IMessage {
    private readonly trainId: number;

    constructor(trainId: number) {
        this.trainId = trainId;
    }

    getMessage(): string {
        return `<${MessageConstants.TRAIN_DETAILS} zid='${this.trainId}' />`
    }

}