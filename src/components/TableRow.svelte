<script lang="ts">
	import { platforms } from '../stores/platforms';
	import TableElement from './TableElement.svelte';

	export let time;
	let tableRowElement;

	function createElements(ps) {
		var options = {
			target: tableRowElement,
			props: {
				time: undefined,
				platform: undefined
			}
		};

		ps.forEach((platform) => {
			options.props.time = time;
			options.props.platform = platform;

			let e = new TableElement(options);
		})
	}

	$: {
		if($platforms !== undefined) {
			createElements($platforms);
		}
	}

</script>

<tr bind:this="{tableRowElement}">
	<td>{time.toFormat('HH:mm')}</td>
</tr>
