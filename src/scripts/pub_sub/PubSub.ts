import { IEvent } from './events/IEvent';
import Subscriber from './subscriber/Subscriber';

class PubSub {
	private static instance: PubSub = null;

	private subscribers: Map<string, Subscriber<any>[]>;

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
		const subs = this.subscribers.get(event.getName());
		if (subs !== undefined) {
			subs.forEach((sub) => {
				sub.trigger(event.getData());
			});
		}
	}

	public subscribe<T>(subscriber: Subscriber<T>): () => void {
		let list = this.subscribers.get(subscriber.getName());

		if (list === undefined) {
			list = [];
		}

		list.push(subscriber);

		this.subscribers.set(subscriber.getName(), list);

		return () => this.unsubscribe(subscriber.getName(), subscriber.uid);
	}

	private unsubscribe(name: string, uid: string) {
		const subs = this.subscribers.get(name);
		const filteredSubs = subs.filter((s) => s.uid !== uid);
		this.subscribers.set(name, filteredSubs);
	}
}

export default PubSub.getInstance();
