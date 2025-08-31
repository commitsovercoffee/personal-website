<script>
	import { Image } from '@unpic/svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	let { images } = $props();
	let selected = $state(-1);

	function handleKeyDown(e) {
		switch (e.key) {
			case 'Escape':
				selected = -1;
				break;
			case 'ArrowLeft':
			case 'h':
			case 'a':
				selected = (selected - 1 + images.length) % images.length;
				break;
			case 'ArrowRight':
			case 'l':
			case 'd':
				selected = (selected + 1) % images.length;
				break;
		}
	}

	function handleGesture(event) {
		if (event.detail.direction === 'right') {
			selected = (selected + 1) % images.length;
		}
		if (event.detail.direction === 'left') {
			selected = (selected - 1 + images.length) % images.length;
		}
	}
</script>

<div class="justifycenter flex flex-wrap items-center gap-2">
	{#each images as image, i (i)}
		<div transition:fly={{ easing: cubicOut, y: 40, duration: 300, delay: 300 }}>
			<Image
				class="not-prose rounded-2xl object-cover"
				onclick={() => {
					selected = i;
				}}
				src={image.src}
				alt={image.alt}
				width={400}
				height={400}
				layout="constrained"
			/>
		</div>
	{/each}
</div>

<svelte:window
	onkeydown={(e) => {
		handleKeyDown(e);
	}}
	onclickcapture={() => {
		selected = -1;
	}}
/>

{#if selected !== -1}
	<div
		transition:fade={{ easing: cubicOut, duration: 200 }}
		use:swipe={() => ({ timeframe: 300, minSwipeDistance: 40, touchAction: 'pan-y' })}
		onswipe={handleGesture}
		class="not-prose fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-lg"
	>
		<div class="max-h-screen max-w-screen">
			<Image
				src={images[selected].src}
				alt={images[selected].alt}
				layout="constrained"
				class="max-h-screen"
			/>
		</div>
	</div>
{/if}
