<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { theme } from '$lib/shared.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="{theme.prefers} flex min-h-screen flex-col justify-between bg-bg transition-colors duration-300"
>
	<Nav />
	<div class="mx-auto prose mt-32 text-fg">
		{@render children?.()}
	</div>
	<Footer />
</div>
