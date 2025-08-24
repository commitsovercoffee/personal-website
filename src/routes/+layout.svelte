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

<Nav />
<div class="py-32 {theme.prefers} bg-bg transition-colors duration-300">
	<main class="mx-auto prose text-fg">
		{@render children?.()}
	</main>
</div>
<Footer />
