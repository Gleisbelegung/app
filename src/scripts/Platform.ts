import { uid } from 'uid';

export default class Platform {
	public readonly name: string;
	public readonly uid: string;

	constructor(name: string) {
		this.name = name;
		this.uid = uid();
	}
}
