import { Element } from 'xml-js';
import { get } from 'svelte/store';
import IMessageProcessor from './IMessageProcessor';
import { MessageConstants } from '../MessageConstants';
import { trains, trainsById } from '../../../stores/trains';
import Train from '../../Train';
import TrainStop from '../../TrainStop';
import { platformsByName } from '../../../stores/platforms';
import Platform from '../../Platform';
import PubSub from '../../pub_sub/PubSub';
import TrainScheduleChangedEvent from "../../pub_sub/events/train/details/TrainScheduleChangedEvent";
import { DateTime } from 'luxon';
import FlagParser from '../../data/flags/FlagParser';

export default class TrainScheduleProcessor implements IMessageProcessor {
	getName(): string {
		return MessageConstants.TRAIN_SCHEDULE;
	}

	process(data: Element) {
		const trainsLocal: Map<number, Train> = get(trainsById);
		const train: Train = trainsLocal.get(<number>data.attributes.zid);

		const platforms: Map<string, Platform> = get(platformsByName);

		const stops: TrainStop[] = [];
		data.elements.forEach((s) => {
			const arrival = DateTime.fromFormat(<string>s.attributes.an, 'HH:mm');
			const departure = DateTime.fromFormat(<string>s.attributes.ab, 'HH:mm');

			const stop = new TrainStop(
				arrival,
				departure,
				platforms.get(<string>s.attributes.name),
				platforms.get(<string>s.attributes.plan),
				<string>s.attributes.flags,
			);

			stops.push(stop);
		});

		train.stops = stops;

		trains.set(get(trains));

		PubSub.publish(new TrainScheduleChangedEvent(train, stops));
	}
}
