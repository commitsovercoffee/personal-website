<script>
	export let data;
	let { title, date, content } = data;
</script>

<article class="mx-auto max-w-3xl py-12">
	<h1 class="mb-4 text-4xl font-bold">{title}</h1>
	<p class="mb-8 text-gray-500">{date}</p>

	<!-- Render the markdown as a Svelte component -->
	<svelte:component this={content} />
</article>
