import IMessage from './messages/IMessage';

export default class WebSocketSingleton {
	private static instance: WebSocketSingleton;

	private webSocket: WebSocket;

	private constructor() {
		this.webSocket = new WebSocket('ws://localhost:3108');
	}

	public static getInstance() : WebSocket {
		if (this.instance === undefined) {
			this.instance = new WebSocketSingleton();
		}

		return this.instance.webSocket;
	}

	public static send(message: IMessage): void {
		this.getInstance().send(message.getMessage());
	}
}
