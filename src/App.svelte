<script lang="typescript">
	export let application;

	import Routes from './Routes.svelte'
	import Navbar from './components/Navbar.svelte';

	import MessageProcessor from './scripts/communication/message_processors/MessageProcessor'
	import WebSocketSingleton from './scripts/communication/WebSocketSingleton'

	var processor = new MessageProcessor()

	var ws = WebSocketSingleton.getInstance();

	// ws.addEventListener('open', function (event) {
	// 	// ws.send('Hello Server!');
	// });

	// // Listen for messages
	ws.addEventListener('message', function (event) {
		console.log('Message from server: ', event.data);
		// ws.send("<register protokoll='1' name='MonitorWand' text='Demo-Abfahrtwand' version='0.9' autor='JS' />")

		processor.readMessage(event.data)
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

