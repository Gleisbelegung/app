<script lang="ts">
	import { simbuild, id, name } from '../stores/facility';
	import MainTable from '../components/MainTable.svelte';
	import PubSub from '../scripts/pub_sub/PubSub';
	import OnTimeChanged from '../scripts/pub_sub/subscriber/time/OnTimeChanged';

	PubSub.subscribe(new OnTimeChanged((data) => {
		console.log(`time changed ${data.toMillis()}`);
	}));
</script>

<button class='button is-primary'>some text</button><br>

<span>simbuild: {$simbuild}</span><br>
<span>id: {$id}</span><br>
<span>name: {$name}</span><br>

<MainTable></MainTable>

<!-- {#if $startTime !== null}
	<span>{$currentTime.hour}:{$currentTime.minute}:{$currentTime.second}</span><br>
{/if}

{#each $platforms as platform, i}
	<span>{i}: {platform.name}</span><br>
{/each}

{#each $trains as { id, name, stops, details }}
	<span>
		{id}: {name}
		{#if details !== undefined}
			({details.delay}, {details.from} - {details.to})
		{/if}

	</span><br>

	{#each stops as stop}
		<span>{stop.arrival} - {stop.departure}: {stop.platform.name}</span><br>
	{/each}
	<br>
{/each} -->