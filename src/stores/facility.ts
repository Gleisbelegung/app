import { writable } from 'svelte/store';

export const simbuild = writable<number>(0)
export const id = writable<number>(0)
export const name = writable<string>("")