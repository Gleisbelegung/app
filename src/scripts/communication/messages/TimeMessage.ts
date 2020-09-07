import IMessage from './IMessage'
import { MessageConstants } from '../MessageConstants'

export default class TimeMessage implements IMessage {
    private timestamp: number;

    constructor() {
        this.timestamp = Date.now()
    }

    getMessage(): string {
        return `<${MessageConstants.TIME} sender='${this.timestamp}' />`
    }

}