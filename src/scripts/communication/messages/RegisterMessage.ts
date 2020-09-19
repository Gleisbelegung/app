import IMessage from './IMessage';

export default class RegisterMessage implements IMessage {
	private protocoll: number = 1;
	private name: string;
	private description: string;
	private version: string;
	private author: string;

	constructor(name: string, description: string, version: string, author: string) {
		this.name = name;
		this.description = description;
		this.version = version;
		this.author = author;
	}

	getMessage(): string {
		return `<register protokoll='${this.protocoll}' name='${this.name}' text='${this.description}' version='${this.version}' autor='${this.author}' />`;
	}
}
