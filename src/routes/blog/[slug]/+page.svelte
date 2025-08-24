<script>
	export let data;
	const { content, meta } = data;
</script>

<article>
	<svelte:component this={content} />
</article>
