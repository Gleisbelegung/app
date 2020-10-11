import { Element } from 'xml-js';
import IMessageProcessor from './IMessageProcessor';
import { MessageConstants } from '../MessageConstants';
import Train from '../../Train';
import { trains } from '../../../stores/trains';
import WebSocketSingleton from '../WebSocketSingleton';
import TrainDetailsMessage from '../messages/TrainDetailsMessage';
import TrainScheduleMessage from '../messages/TrainScheduleMessage';
import PubSub from '../../pub_sub/PubSub';
import NewTrainEvent from '../../pub_sub/events/train/NewTrainEvent';

export default class TrainListProcessor implements IMessageProcessor {
	getName(): string {
		return MessageConstants.TRAIN_LIST;
	}

	process(data: Element) {
		const { elements } = data;
		const trainsLocal: Train[] = [];

		elements.forEach((t) => {
			const train: Train = new Train(
				<number>t.attributes.zid,
				<string>t.attributes.name,
			);
			trainsLocal.push(train);

			PubSub.publish(new NewTrainEvent(train));

			WebSocketSingleton.send(new TrainDetailsMessage(train.id));
			WebSocketSingleton.send(new TrainScheduleMessage(train.id));
		});

		trains.set(trainsLocal);
	}
}
