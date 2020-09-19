<script lang="ts">
	import { DateTime, Duration } from 'luxon';
	import { platforms } from '../stores/platforms';
	import { startTime } from '../stores/time';
	import IdFormatter from '../scripts/common/IdFormatter';
	import PubSub from '../scripts/pub_sub/PubSub';
	import OnMinuteChanged from '../scripts/pub_sub/subscriber/time/OnMinuteChanged';
	import TableRow from './TableRow.svelte'

	let tableBodyElement;

	let timePerRow;
	$: if ($startTime !== null) {
		updateStarttime($startTime);
		createTable();
	}

	function updateStarttime(startTime: DateTime) {
		timePerRow = DateTime.fromFormat(startTime.toFormat('HH:mm'), 'HH:mm')
	}

	function createTable() {
		var options = {
			target: tableBodyElement,
			props: {
				time: undefined
			}
		};

		for (let i = 0; i < 60; i++) {
			options.props.time = getTime();

			let r = new TableRow(options);
		}
	}

	function getTime() {
		timePerRow = timePerRow.plus(Duration.fromMillis(1000 * 60));
		return timePerRow;
	}

	PubSub.subscribe(
		new OnMinuteChanged((data) => {
			console.log(`minute changed ${data.toMillis()}`);
		}),
	);
</script>


<table class="table is-striped is-hoverable is-bordered">
	<thead>
		<th />
		{#each $platforms as platform}
			<th><span>{platform.name}</span></th>
		{/each}
	</thead>
	<tbody bind:this="{tableBodyElement}">
		<!-- {#if $startTime !== null && timePerRow !== null}
			{#each { length: 60 } as _, i}
				<tr>
					<td>{getTime()}</td>
					{#each $platforms as platform}
						<td>
							<span
								id={IdFormatter.timePlatformId(timePerRow, platform)} />
						</td>
					{/each}
				</tr>
			{/each}
		{/if} -->
	</tbody>
</table>
