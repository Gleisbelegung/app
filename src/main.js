import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		application: {
			displayName: 'Gleisbelegung',
			name: 'gleisbelegung',
			url: 'gleisbelegung.serret.dev',
		},
	},
});

export default app;
