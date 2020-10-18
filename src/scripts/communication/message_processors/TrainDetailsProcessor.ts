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

	process(data: any) {
		const trains: Map<Number, Train> = get(trainsById);
		const train: Train = trains.get(Number(data.zid));

		const isVisible: boolean = data.sichtbar === 'true';
		const isAtPlatform: boolean = data.amgleis === 'true';

		const platforms: Map<string, Platform> = get(platformsByName);

		const details: TrainDetails = new TrainDetails(
			<number>data.verspaetung,
			platforms.get(<string>data.gleis),
			platforms.get(<string>data.plangleis),
			<string>data.von,
			<string>data.nach,
			isVisible,
			isAtPlatform,
		);

		train.details = details;

		PubSub.publish(new TrainDetailsChangedEvent(train, details));
	}
}
