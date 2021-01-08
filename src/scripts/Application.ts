import MessageProcessor from './communication/message_processors/MessageProcessor';
import WebSocketSingleton from './communication/WebSocketSingleton';
import TrainController from './controllers/TrainController';

export default class Application {
	public static init() {
		const processor = new MessageProcessor();

		const ws = WebSocketSingleton.getInstance();

		ws.addEventListener('open', (event) => {
			console.log("on open")
			ws.send("client");
		})

		ws.addEventListener('message', (event) => {
			processor.readMessage(event.data);
		});

		this.loadControllers();
	}

	private static loadControllers() {
		new TrainController();
	}
}
