<script>
	import { Sun, Moon, Coffee } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	import { theme } from '$lib/shared.svelte';
	import { onMount } from 'svelte';

	let scrollProgress = $state(0);

	function updateScrollProgress() {
		const scrollTop = window.scrollY;
		const docHeight = document.body.scrollHeight - window.innerHeight;
		const percent = docHeight > 0 ? scrollTop / docHeight : 0;
		scrollProgress = percent;
	}

	onMount(() => {
		let storedTheme = localStorage.getItem('coc-theme');
		if (!storedTheme) {
			storedTheme = 'dark';
			localStorage.setItem('coc-theme', storedTheme);
		}
		theme.prefers = storedTheme;

		updateScrollProgress();
		window.addEventListener('scroll', updateScrollProgress);
		window.addEventListener('resize', updateScrollProgress);

		return () => {
			window.removeEventListener('scroll', updateScrollProgress);
			window.removeEventListener('resize', updateScrollProgress);
		};
	});
</script>

<div
	class="{theme.prefers} fixed z-40 w-full bg-panel p-2 text-fg shadow-md/10 shadow-black transition-colors duration-300"
>
	<header class="m-2 flex justify-between">
		<a class="group flex gap-2" href="/">
			<Coffee
				class="-rotate-12 transition-all duration-100 ease-in group-hover:rotate-0"
				strokeWidth={1.2}
				size={32}
			/>
			<span class="text-xl">CommitsOverCoffee</span>
		</a>
		<div class="h-[32px] w-[32px]">
			{#if theme.prefers == 'light'}
				<div
					in:fly={{ easing: cubicOut, y: 20, duration: 200, delay: 200 }}
					out:fly={{ easing: cubicIn, y: 20, duration: 200 }}
					class="transition-all duration-300 ease-in active:translate-y-2"
				>
					<Sun
						onclick={() => {
							theme.prefers = 'dark';
							localStorage.setItem('coc-theme', theme.prefers);
						}}
						size={32}
						strokeWidth={1.2}
						class="cursor-pointer fill-amber-500 stroke-amber-500"
					/>
				</div>
			{:else if theme.prefers == 'dark'}
				<div
					in:fly={{ easing: cubicOut, y: 20, duration: 200, delay: 200 }}
					out:fly={{ easing: cubicIn, y: 20, duration: 200 }}
					class="transition-all duration-300 ease-in active:translate-y-2"
				>
					<Moon
						onclick={() => {
							theme.prefers = 'light';
							localStorage.setItem('coc-theme', theme.prefers);
						}}
						size={32}
						strokeWidth={1.2}
						class="cursor-pointer fill-white stroke-white"
					/>
				</div>
			{/if}
		</div>
	</header>
	<hr
		class="absolute left-0 z-50 mt-2 h-1 border-none bg-primary p-0 transition-all duration-300 ease-out"
		style="width: {scrollProgress * 100}%"
	/>
</div>
