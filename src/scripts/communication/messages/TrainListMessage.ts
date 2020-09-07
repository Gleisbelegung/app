import IMessage from "./IMessage";
import { MessageConstants } from "../MessageConstants";

export default class TrainListMessage implements IMessage {
    
    getMessage(): string {
        return `<${MessageConstants.TRAIN_LIST} />`
    }

}