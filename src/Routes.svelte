<script>
	import Navaid from 'navaid';
	import { onDestroy } from 'svelte';
	import Index from './routes/index.svelte'
	let Route;
	let params=undefined
	let uri = location.pathname;

	function track(obj) {
		uri = obj.state || obj.uri || location.pathname;
		if (window.ga) ga.send('pageview', { dp:uri });
	}

	addEventListener('replacestate', track);
	addEventListener('pushstate', track);
	addEventListener('popstate', track);

	const router = Navaid('/')
		.on('/', () => {params = undefined; Route = Index;})
		.listen();
	onDestroy(router.unlisten);
</script>

{#if params === undefined}
	<svelte:component this={Route}/>
{:else}
	<svelte:component this={Route} {params} />
{/if}