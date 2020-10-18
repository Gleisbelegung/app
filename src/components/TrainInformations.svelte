<script lang="ts">
	import { trainsToShow }  from '../stores/trains'
</script>

<div class="train-informations">
	{#each $trainsToShow as train}
		<div class="columns">
			<div class="column">
				<span>{train.id}</span><br>
				<span>{train.name}</span><br>
				<span>{train.details.from}</span><br>
				<span>{train.details.to}</span><br>
			</div>
			<div class="column">
				{#each train.stops as stop}
					{#if stop.arrival !== null}
						<span>{stop.arrival.toFormat('HH:mm')}</span><br>
					{/if}
				{/each}
			</div>
			<div class="column">
				{#each train.stops as stop}
					{#if stop.departure !== null}
						<span>{stop.departure.toFormat('HH:mm')}</span><br>
					{/if}
				{/each}
			</div>
			<div class="column">
				{#each train.stops as stop}
					<span>{stop.platform.name}</span><br>
				{/each}
			</div>
			<div class="column">
				{#each train.stops as stop}
					<span>{stop.rawFlags}</span><br>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.train-informations {
		width: 50%;
		position: fixed;
		bottom: 0;
		left: 25%;
		background-color: #707070;
		border-top-left-radius: 25px;
		border-top-right-radius: 25px;
		padding: 10px;

		-webkit-box-shadow: 0px 0px 10px 8px rgba(48,48,48,1);
		-moz-box-shadow: 0px 0px 10px 8px rgba(48,48,48,1);
		box-shadow: 0px 0px 10px 8px rgba(48,48,48,1);
	}
</style>
