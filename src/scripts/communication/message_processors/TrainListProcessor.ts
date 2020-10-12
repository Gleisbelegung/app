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

	process(data: any) {
		const trainsXML = data.zug;
		const trainsLocal: Train[] = [];

		trainsXML.forEach((t) => {
			const train: Train = new Train(
				<number>t.zid,
				<string>t.name,
			);
			trainsLocal.push(train);

			PubSub.publish(new NewTrainEvent(train));

			WebSocketSingleton.send(new TrainDetailsMessage(train.id));
			WebSocketSingleton.send(new TrainScheduleMessage(train.id));
		});

		trains.set(trainsLocal);
	}
}
