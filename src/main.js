import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		application:  {
			displayName: 'Template',
			name: 'template',
			url: 'template.serrer.dev'
		}
	}
});

export default app;