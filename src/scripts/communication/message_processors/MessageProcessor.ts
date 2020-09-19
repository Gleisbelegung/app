import { xml2js } from 'xml-js';
import StatusMessageProcessor from './StatusMessageProcessor';
import FacilityInfoProcessor from './FacilityInfoProcessor';
import IMessageProcessor from './IMessageProcessor';
import PlatformsProcessor from './PlatformListProcessor';
import TrainListProcessor from './TrainListProcessor';
import TrainDetailsProcessor from './TrainDetailsProcessor';
import TrainScheduleProcessor from './TrainScheduleProcessor';
import TimeProcessor from './TimeProcessor';

export default class MessageProcessor {
	private messageProcessors: IMessageProcessor[];

	constructor() {
		this.messageProcessors = [];

		this.messageProcessors.push(new StatusMessageProcessor());
		this.messageProcessors.push(new FacilityInfoProcessor());
		this.messageProcessors.push(new PlatformsProcessor());
		this.messageProcessors.push(new TrainListProcessor());
		this.messageProcessors.push(new TrainDetailsProcessor());
		this.messageProcessors.push(new TrainScheduleProcessor());
		this.messageProcessors.push(new TimeProcessor());
	}

	public readMessage(message: string) {
		const { elements } = xml2js(message, { compact: false });

		elements.forEach((data) => {
			for (const messageProcessor of this.messageProcessors) {
				if (messageProcessor.getName() === data.name) {
					messageProcessor.process(data);
					break;
				}
			}
		});
	}
}
