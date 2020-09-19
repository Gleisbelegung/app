<script lang="ts">
	import { simbuild, id, name } from '../stores/facility';
	import { currentTime } from '../stores/time';
	import MainTable from '../components/MainTable.svelte';
</script>

<button class='button is-primary'>some text</button><br>

<span>simbuild: {$simbuild}</span><br>
<span>id: {$id}</span><br>
<span>name: {$name}</span><br>

{#if $currentTime !== null}
	<span>time: {$currentTime.toFormat('HH:mm:ss', { timeZoneName: 'utc' })}</span><br>
{/if}

<MainTable></MainTable>