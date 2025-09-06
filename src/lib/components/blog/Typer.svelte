<script>
	const paragraph = 'The quick brown fox jumps over the lazy dog.';

	let typed = $state('');
	let active = $state(false);

	let chars = $derived(paragraph.split(''));
	let typedChars = $derived(typed.split(''));
	let currentIndex = $derived(typedChars.length);

	function handleKeydown(e) {
		if (!active) return;
		if (e.key.length === 1) {
			e.preventDefault(); // Prevent scrolling
			typed += e.key;
		} else if (e.key === 'Backspace') {
			typed = typed.slice(0, -1);
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />
<div class="not-prose flex flex-wrap py-4">
	{#each chars as char, i (i)}
		<span
			class="text-xl transition-all duration-100 ease-in
			{active && i === currentIndex
				? 'bg-primary text-bg' // cursor
				: typedChars[i] === char
					? 'text-highlight' // correct
					: typedChars[i] && typedChars[i] !== char
						? char != ' '
							? 'text-secondary' // incorrect letter
							: 'bg-secondary' // incorrect space
						: !typedChars[i] && !active && 'text-body'}"
		>
			{char === ' ' ? '\u00A0' : char}
		</span>
	{/each}
</div>
<button
	class="my-2 rounded-xl bg-panel p-2 shadow"
	onclick={() => {
		active = !active;
		typed = '';
	}}
>
	{active ? 'End Typing' : 'Start Typing'}
</button>
