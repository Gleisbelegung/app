import IMessageProcessor from "./IMessageProcessor";
import { Element } from "xml-js";
import { MessageConstants } from "../MessageConstants";
import Platform from "../../Platform";
import { platforms } from "../../../stores/platforms";
import WebSocketSingleton from "../WebSocketSingleton";
import TrainListMessage from "../messages/TrainListMessage";

export default class PlatformListProcessor implements IMessageProcessor {
    getName(): string {
        return MessageConstants.PLATFORM_LIST;
    }

    process(data: Element) {
        var platformsLocal: Platform[] = [];

        var xml = data.elements;

        xml.forEach(p => {
            platformsLocal.push(new Platform(<string>p.attributes.name))
        });

        platforms.set(platformsLocal);

        // TODO: Take care of the neigbours

        WebSocketSingleton.send(new TrainListMessage())
    }

}