import IMessageProcessor from './IMessageProcessor';
import { MessageConstants } from '../MessageConstants';
import Platform from '../../Platform';
import { platforms } from '../../../stores/platforms';
import WebSocketSingleton from '../WebSocketSingleton';
import TrainListMessage from '../messages/TrainListMessage';

export default class PlatformListProcessor implements IMessageProcessor {
	getName(): string {
		return MessageConstants.PLATFORM_LIST;
	}

	process(data: any) {
		const platformsLocal: Platform[] = [];
		const xml = data.bahnsteig;

		xml.forEach((p) => {
			platformsLocal.push(new Platform(<string>p.name));
		});

		platforms.set(platformsLocal);

		// TODO: Take care of the neigbours
		WebSocketSingleton.send(new TrainListMessage());
	}
}
