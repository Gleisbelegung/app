import * as parser from 'fast-xml-parser';
import IMessageProcessor from './IMessageProcessor';
import StatusMessageProcessor from './StatusMessageProcessor';
import FacilityInfoProcessor from './FacilityInfoProcessor';
import PlatformListProcessor from './PlatformListProcessor';
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
		this.messageProcessors.push(new PlatformListProcessor());
		this.messageProcessors.push(new TrainListProcessor());
		this.messageProcessors.push(new TrainDetailsProcessor());
		this.messageProcessors.push(new TrainScheduleProcessor());
		this.messageProcessors.push(new TimeProcessor());
	}

	public readMessage(message: string) {
		const jObject = parser.parse(message, { ignoreAttributes: false, attributeNamePrefix: '', arrayMode: true });

		for (const [key, value] of Object.entries(jObject)) {
			for (const messageProcessor of this.messageProcessors) {
				if (messageProcessor.getName() === key) {
					if (Array.isArray(value)) {
						value.forEach((v) => {
							messageProcessor.process(v);
						});
					} else {
						messageProcessor.process(value);
					}
					break;
				}
			}
		}
	}
}
