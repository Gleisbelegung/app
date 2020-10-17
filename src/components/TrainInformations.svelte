<script lang="ts">
	import { trainsToShow } from '../stores/trains'
</script>

<div class="train-informations">
	{#each $trainsToShow as train}
		<div class="columns">
			<div class="column">
				<span>{train.id}</span>
			</div>
			<div class="column">
				<span>{train.name}</span>
			</div>
			<div class="column">
				<span>{train.details.from}</span>
			</div>
			<div class="column">
				<span>{train.details.to}</span>
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
