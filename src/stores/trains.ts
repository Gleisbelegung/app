import { writable, derived } from 'svelte/store';
import Train from '../scripts/Train';

export const trains = writable<Train[]>([])
export const trainsById = derived(trains, ($trains: Train[]) => {
    let trains = new Map<number, Train>();
    $trains.forEach(t => {
        trains.set(t.id, t);
    });
    return trains;
})