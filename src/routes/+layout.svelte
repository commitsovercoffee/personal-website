<script>
	import '../app.css';
	import '@fontsource-variable/inter'; // supports 100-900

	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';

	import { theme } from '$lib/shared.svelte';
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { navigating } from '$app/state';

	let { children } = $props();
</script>

<svelte:window on:contextmenu|preventDefault />
<div
	class="{theme.prefers} flex min-h-screen flex-col justify-between bg-bg transition-colors duration-300"
>
	<Nav />
	<div>
		{#if !navigating.to}
			<div
				in:fly={{ easing: cubicOut, y: 40, duration: 300, delay: 300 }}
				out:fly={{ easing: cubicIn, y: -40, duration: 300 }}
				class="prose mx-auto my-28 px-4 text-fg selection:bg-primary selection:text-bg md:my-40 md:px-0"
			>
				{@render children?.()}
			</div>
		{/if}
	</div>
	<Footer />
</div>

<style>
	:global(body) {
		font-family: 'Inter Variable', sans-serif;
	}
</style>
