<script lang="ts">
	import { DateTime } from "luxon";
	import Platform from "../scripts/Platform";
	import PubSub from "../scripts/pub_sub/PubSub";
	import OnAddTrainToGridElement from '../scripts/pub_sub/subscriber/grid/OnAddTrainToGridElement'
	import Train from "../scripts/Train";
	import TrainInformations from './TrainInformations.svelte'
	import { trainsToShow } from '../stores/trains'
import TrainController from "../scripts/controllers/TrainController";

	export let platform: Platform;
	export let time: DateTime;

	let tableElement: HTMLElement;
	let text = "";
	let trainInformationsVisible = false;
	let trains: Train[] = []

	PubSub.subscribe(new OnAddTrainToGridElement(platform, time, (train) => {
		trains.push(train)

		text = trainsToString()
		tableElement.style.backgroundColor = train.color;

		const stop = train.getStopByTime(time);

		if(stop !== null && stop.isPassing) {
			tableElement.style.opacity = '40%';
		} else {
			tableElement.style.opacity = '100%';
		}

		if (text === '') {
			tableElement.style.cursor = 'cursor'
		} else { 
			tableElement.style.cursor = 'pointer'
		}
	}));

	function trainsToString() {
		let text = '';
		for (let i = 0; i < trains.length; i += 1) {
			const train = trains[i];

			text += train.name;
			if (i < trains.length - 1) {
				text += ', ';
			}
		}
		return text;
	}
</script>

<td class="table-element" bind:this="{tableElement}" on:click="{() => $trainsToShow = trains}">
	<span>{text}</span>
</td>

<style>
	.table-element {
		white-space: nowrap;
	}
</style>
