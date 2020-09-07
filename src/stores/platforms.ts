import { writable, derived } from 'svelte/store';
import Platform from '../scripts/Platform';

export const platforms = writable<Platform[]>(new Array())
export const platformsByName = derived(platforms, ($platforms: Platform[]) => {
    let platforms = new Map<string, Platform>();
    $platforms.forEach(p => {
        platforms.set(p.name, p);
    });
    return platforms;
})