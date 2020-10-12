import IMessageProcessor from './IMessageProcessor';
import WebSocketSingleton from '../WebSocketSingleton';
import { simbuild, id, name } from '../../../stores/facility';
import PlatformsMessage from '../messages/PlatformListMessage';

export default class FacilityInfoProcessor implements IMessageProcessor {
	getName(): string {
		return 'anlageninfo';
	}

	process(data: any) {
		simbuild.set(<number>data.simbuild);
		id.set(<number>data.aid);
		name.set(<string>data.name);

		WebSocketSingleton.send(new PlatformsMessage());
	}
}
