<script lang="ts">
	import { platforms } from '../stores/platforms';
	// import IdFormatter from '../scripts/common/IdFormatter';

	export let time;
</script>

<tr>
	<td>{time.toFormat('HH:mm', { timeZoneName: 'utc' })}</td>
	{#each $platforms as platform}
		<td>
			<!-- <span id={IdFormatter.timePlatformId(timePerRow, platform)} /> -->
		</td>
	{/each}
</tr>
