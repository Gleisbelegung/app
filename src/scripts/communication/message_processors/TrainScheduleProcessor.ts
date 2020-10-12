import { get } from 'svelte/store';
import { DateTime } from 'luxon';
import IMessageProcessor from './IMessageProcessor';
import { MessageConstants } from '../MessageConstants';
import { trains, trainsById } from '../../../stores/trains';
import Train from '../../Train';
import TrainStop from '../../TrainStop';
import { platformsByName } from '../../../stores/platforms';
import Platform from '../../Platform';
import PubSub from '../../pub_sub/PubSub';
import TrainScheduleChangedEvent from '../../pub_sub/events/train/details/TrainScheduleChangedEvent';

export default class TrainScheduleProcessor implements IMessageProcessor {
	getName(): string {
		return MessageConstants.TRAIN_SCHEDULE;
	}

	process(data: any) {
		const trainsLocal: Map<number, Train> = get(trainsById);
		const train: Train = trainsLocal.get(<number>data.zid);

		const platforms: Map<string, Platform> = get(platformsByName);

		const stops: TrainStop[] = [];
		data.gleis.forEach((s) => {
			const arrival = DateTime.fromFormat(<string>s.an, 'HH:mm');
			const departure = DateTime.fromFormat(<string>s.ab, 'HH:mm');

			const stop = new TrainStop(
				arrival,
				departure,
				platforms.get(<string>s.name),
				platforms.get(<string>s.plan),
				<string>s.flags,
			);

			stops.push(stop);
		});

		train.stops = stops;

		trains.set(get(trains));

		PubSub.publish(new TrainScheduleChangedEvent(train, stops));
	}
}
