import { Element } from 'xml-js';
import IMessageProcessor from './IMessageProcessor';
import WebSocketSingleton from '../WebSocketSingleton';
import { simbuild, id, name } from '../../../stores/facility';
import PlatformsMessage from '../messages/PlatformListMessage';

export default class FacilityInfoProcessor implements IMessageProcessor {
	getName(): string {
		return 'anlageninfo';
	}

	process(data: Element) {
		simbuild.set(<number>data.attributes.simbuild);
		id.set(<number>data.attributes.aid);
		name.set(<string>data.attributes.name);

		WebSocketSingleton.send(new PlatformsMessage());
	}
}
