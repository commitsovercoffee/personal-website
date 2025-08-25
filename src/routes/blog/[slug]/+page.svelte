<script>
	export let data;
	const { content, meta } = data;
</script>

<article class="blog">
	<h1 class="font-medium text-fg">{meta.title}</h1>
	<p class="text-body">{meta.description}</p>
	<hr class="border-panel" />
	<svelte:component this={content} />
</article>
