import IMessage from "./IMessage";

export default class FacilityInfoMessage implements IMessage {

    getMessage(): string {
        return "<anlageninfo />";
    }
}