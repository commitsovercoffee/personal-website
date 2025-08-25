<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>Writings ~ {data.title}</title>
	<meta name="description" content={data.desc} />
</svelte:head>

<article class="blog">
	<h1 class="font-medium text-fg">{data.title}</h1>
	<p class="text-body">{data.desc}</p>
	<hr class="border-panel" />
	<data.content />
</article>
