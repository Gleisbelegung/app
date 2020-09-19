import { writable, derived } from 'svelte/store';
import Platform from '../scripts/Platform';

export const platforms = writable<Platform[]>([]);
export const platformsByName = derived(platforms, ($platforms: Platform[]) => {
	const _platforms = new Map<string, Platform>();
	$platforms.forEach((p) => {
		_platforms.set(p.name, p);
	});
	return _platforms;
});
