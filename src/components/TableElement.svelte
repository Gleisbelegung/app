<script lang="ts">
	import { DateTime } from "luxon";
	import Platform from "../scripts/Platform";
	import PubSub from "../scripts/pub_sub/PubSub";
	import OnAddTrainToGridElement from '../scripts/pub_sub/subscriber/grid/OnAddTrainToGridElement'

	export let platform: Platform;
	export let time: DateTime;

	let tableElement;
	let text = "";

	PubSub.subscribe(new OnAddTrainToGridElement(platform, time, (train) => {
		text = train.name;
		tableElement.style.backgroundColor = train.color;
	}));
</script>

<td class="table-element-text" bind:this="{tableElement}">
	<span>{text}</span>
</td>

<style>
	.table-element-text {
		white-space: nowrap;
	}
</style>
