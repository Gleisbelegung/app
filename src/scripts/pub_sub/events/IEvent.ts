import { PubSubConstants } from "../PubSubConstants";

export interface IEvent<T> {
    getName(): PubSubConstants;
    getData(): T;
}