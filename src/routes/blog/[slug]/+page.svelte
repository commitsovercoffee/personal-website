<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title} | Commits Over Coffee Blog</title>
	<meta name="description" content={data.desc} />
</svelte:head>

<article class="blog">
	<div class="pb-16">
		<h1 class="mb-2 text-fg">{data.title}</h1>
		<span class="text-body">{data.desc}</span>
	</div>
	<data.content />
</article>
