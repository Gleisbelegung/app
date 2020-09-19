import { writable } from 'svelte/store';
import { DateTime } from 'luxon';

export const startTime = writable<DateTime>(null);
export const currentTime = writable<DateTime>(null);
