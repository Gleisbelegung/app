import { Element } from 'xml-js';
import IMessageProcessor from './IMessageProcessor';
import WebSocketSingleton from '../WebSocketSingleton';
import RegisterMessage from '../messages/RegisterMessage';
import FacilityInfoMessage from '../messages/FacilityInfoMessage';
import TimeMessage from '../messages/TimeMessage';

export default class StatusMessageProcessor implements IMessageProcessor {
	public isRegistered: boolean = false;

	getName(): string {
		return 'status';
	}

	process(data: Element) {
		if (data.attributes.code === '300') {
			WebSocketSingleton.send(new RegisterMessage(
				'Gleisbelegung',
				'Displays the Facility in a table',
				'0.0.1',
				'manuel3108',
			));
		} else if (data.attributes.code === '220') {
			console.log('registered');
			this.isRegistered = true;
			WebSocketSingleton.send(new FacilityInfoMessage());
			WebSocketSingleton.send(new TimeMessage());
		}
	}
}
