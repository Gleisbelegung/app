import { Element } from 'xml-js';
import { get } from 'svelte/store';
import IMessageProcessor from './IMessageProcessor';
import { MessageConstants } from '../MessageConstants';
import { trainsById } from '../../../stores/trains';
import Train from '../../Train';
import TrainDetails from '../../TrainDetails';
import { platformsByName } from '../../../stores/platforms';
import Platform from '../../Platform';
import PubSub from '../../pub_sub/PubSub';
import TrainDetailsChangedEvent from '../../pub_sub/events/train/details/TrainDetailsChangedEvent';

export default class TrainDetailsProcessor implements IMessageProcessor {
	getName(): string {
		return MessageConstants.TRAIN_DETAILS;
	}

	process(data: Element) {
		const trains: Map<number, Train> = get(trainsById);
		const train: Train = trains.get(<number>data.attributes.zid);

		const isVisible: boolean = data.attributes.sichtbar === 'true';
		const isAtPlatform: boolean = data.attributes.amgleis === 'true';

		const platforms: Map<string, Platform> = get(platformsByName);

		const details: TrainDetails = new TrainDetails(
			<number>data.attributes.verspaetung,
			platforms.get(<string>data.attributes.gleis),
			platforms.get(<string>data.attributes.plangleis),
			<string>data.attributes.von,
			<string>data.attributes.nach,
			isVisible,
			isAtPlatform,
		);

		train.details = details;

		PubSub.publish(new TrainDetailsChangedEvent(train, details));
	}
}
