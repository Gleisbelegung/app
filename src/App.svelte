<script lang="typescript">
	import Routes from './Routes.svelte';
	import Navbar from './components/Navbar.svelte';

	import MessageProcessor from './scripts/communication/message_processors/MessageProcessor';
	import WebSocketSingleton from './scripts/communication/WebSocketSingleton';

	export let application;

	const processor = new MessageProcessor();

	const ws = WebSocketSingleton.getInstance();

	ws.addEventListener('message', (event) => {
		console.log('Message from server: ', event.data);
		processor.readMessage(event.data);
	});
</script>

<style global lang="scss">
	@import "main.scss";
</style>

<svelte:head>
	<title>{application.displayName}</title>
</svelte:head>

<Navbar bind:application></Navbar>
<main>
	<Routes></Routes>
</main>

