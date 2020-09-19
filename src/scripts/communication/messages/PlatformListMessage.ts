import IMessage from './IMessage';
import { MessageConstants } from '../MessageConstants';

export default class PlatformListMessage implements IMessage {
	getMessage(): string {
		return `<${MessageConstants.PLATFORM_LIST} />`;
	}
}
