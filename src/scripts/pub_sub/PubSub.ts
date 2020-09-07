import { IEvent } from "./events/IEvent";
import { ISubscriber } from "./subscriber/ISubscriber";
import { PubSubConstants } from "./PubSubConstants";

class PubSub {
    private static instance: PubSub = null;
    private subscribers: Map<PubSubConstants, ISubscriber<any>[]>;

    constructor() {
        this.subscribers = new Map();
    }

    static getInstance(): PubSub {
        if (this.instance == null) {
            this.instance = new PubSub();
        }
        return this.instance;
    }

    public publish<T>(event: IEvent<T>) {
        var subs = this.subscribers.get(event.getName());
        subs.forEach(sub => {
            sub.trigger(event.getData())
        });
    }

    public subscribe<T>(subsciber: ISubscriber<T>) {
        var list = this.subscribers.get(subsciber.getName());

        if(list == undefined) {
            list = [];
        } 

        list.push(subsciber);

        this.subscribers.set(subsciber.getName(), list);
    }
}

export default PubSub.getInstance()