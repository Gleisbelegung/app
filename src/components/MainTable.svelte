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


<div class="table-container">
	<table class="table is-striped is-hoverable is-bordered is-narrow">
		<thead>
			<th class="table-head" />
			{#each $platforms as platform}
				<th class="table-head"><span>{platform.name}</span></th>
			{/each}
		</thead>
		<tbody bind:this="{tableBodyElement}">
			
		</tbody>
	</table>
</div>

<style>
	.table {
		text-align: center;
	}

	.table-head {
		position: sticky;
		top: 0;
		background-color: #505050;
		border-top-width: 0 !important;
	}

	.table-container {
		overflow-y: auto;
		max-height: calc(100vh - 60px);
	}
</style>
