import Subscriber from './Subscriber';

export default abstract class FunctionCallSubscriber<T> extends Subscriber<T> {
	protected callback: (data: T) => void;

	constructor(callback: (data: T) => void) {
		super();
		this.callback = callback;
	}

	abstract getName(): string;

	trigger(data: T): void {
		if (this.callback === undefined) {
			throw new Error(`Callback for ${this.getName()} was not provided!`);
		}
		this.callback(data);
	}
}
