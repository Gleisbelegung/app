import { writable, derived } from 'svelte/store';
import Train from '../scripts/Train';

export const trains = writable<Train[]>([]);
export const trainsById = derived(trains, ($trains: Train[]) => {
	const _trains = new Map<Number, Train>();
	$trains.forEach((t) => {
		_trains.set(Number(t.id), t);
	});
	return _trains;
});
export const trainsToShow = writable<Train[]>([]);
