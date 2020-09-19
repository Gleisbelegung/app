import { Element } from 'xml-js';
import { get } from 'svelte/store';
import IMessageProcessor from './IMessageProcessor';
import { MessageConstants } from '../MessageConstants';
import { trainsById } from '../../../stores/trains';
import Train from '../../Train';
import TrainDetails from '../../TrainDetails';
import { platformsByName } from '../../../stores/platforms';

export default class TrainDetailsProcessor implements IMessageProcessor {
	getName(): string {
		return MessageConstants.TRAIN_DETAILS;
	}

	process(data: Element) {
		const trains: Map<number, Train> = get(trainsById);
		const train: Train = trains.get(<number>data.attributes.zid);

		const isVisible: boolean = data.attributes.sichtbar === 'true';
		const isAtPlatform: boolean = data.attributes.amgleis === 'true';

		const platforms = get(platformsByName);

		const details: TrainDetails = new TrainDetails(
			<number>data.attributes.verspaetung,
			platforms.get(data.attributes.gleis),
			platforms.get(data.attributes.plangleis),
			<string>data.attributes.von,
			<string>data.attributes.nach,
			isVisible,
			isAtPlatform,
		);

		train.details = details;
	}
}
