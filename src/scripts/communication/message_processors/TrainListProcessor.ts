import IMessageProcessor from "./IMessageProcessor";
import { Element } from "xml-js";
import { MessageConstants } from "../MessageConstants";
import Train from "../../Train";
import { trains } from "../../../stores/trains";
import WebSocketSingleton from "../WebSocketSingleton";
import TrainDetailsMessage from "../messages/TrainDetailsMessage";
import TrainScheduleMessage from "../messages/TrainScheduleMessage";

export default class TrainListProcessor implements IMessageProcessor {

    getName(): string {
        return MessageConstants.TRAIN_LIST;
    }

    process(data: Element) {
        var elements = data.elements;
        var trainsLocal: Train[] = [];

        elements.forEach(t => {
            var train: Train = new Train(
                <number>t.attributes.zid,
                <string>t.attributes.name
            )
            trainsLocal.push(train)

            WebSocketSingleton.send(new TrainDetailsMessage(train.id));
            WebSocketSingleton.send(new TrainScheduleMessage(train.id));
        });

        trains.set(trainsLocal)
    }

}