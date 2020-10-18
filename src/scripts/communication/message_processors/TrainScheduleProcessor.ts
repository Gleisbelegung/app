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
import FlagParser from '../../data/flags/FlagParser';
import NewTrainFullyLoadedEvent from '../../pub_sub/events/train/NewTrainFullyLoadedEvent';

export default class TrainScheduleProcessor implements IMessageProcessor {
	getName(): string {
		return MessageConstants.TRAIN_SCHEDULE;
	}

	process(data: any) {
		const trainsLocal: Map<Number, Train> = get(trainsById);
		const train: Train = trainsLocal.get(Number(data.zid));

		const platforms: Map<string, Platform> = get(platformsByName);

		const stops: TrainStop[] = [];
		data.gleis.forEach((s) => {
			let arrival = null;
			if (<string>s.an !== '') {
				arrival = DateTime.fromFormat(<string>s.an, 'HH:mm');
			}
			let departure = null;
			if (<string>s.ab !== '') {
				departure = DateTime.fromFormat(<string>s.ab, 'HH:mm');
			}

			const stop = new TrainStop(
				arrival,
				departure,
				platforms.get(<string>s.name),
				platforms.get(<string>s.plan),
				<string>s.flags,
			);

			stops.push(stop);

			if (stop.rawFlags !== '') {
				FlagParser.parse(train, stop);
			}
		});

		train.stops = stops;
		train.isFullyLoaded = true;

		trains.set(get(trains));

		PubSub.publish(new TrainScheduleChangedEvent(train, stops));
		PubSub.publish(new NewTrainFullyLoadedEvent(train));
	}
}
