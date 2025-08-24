<script>
	import { SvelteSet } from 'svelte/reactivity';

	export let data;
	let { posts } = data;

	// Unique tags collected from posts
	const tags = [...new Set(posts.flatMap((p) => p.tags || []))];

	// Reactive Set for selected tags
	let selectedTags = new SvelteSet();

	// Reactive filtered posts
	$: filtered =
		selectedTags.size > 0 ? posts.filter((p) => p.tags?.some((t) => selectedTags.has(t))) : posts;

	function toggleTag(tag) {
		if (selectedTags.has(tag)) {
			selectedTags.delete(tag); // still reactive with SvelteSet
		} else {
			selectedTags.add(tag);
		}
	}
</script>

<section class="mx-auto max-w-3xl py-12">
	<h1 class="mb-8 text-4xl font-bold">Blog</h1>

	<!-- Tag Filter -->
	{#if tags.length > 0}
		<div class="mb-8 flex flex-wrap gap-2">
			{#each tags as tag}
				<button
					class="rounded border px-3 py-1 text-sm transition
						{selectedTags.has(tag)
						? 'border-blue-600 bg-blue-600 text-white'
						: 'border-gray-300 bg-gray-100 hover:bg-gray-200'}"
					on:click={() => toggleTag(tag)}
				>
					{tag}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Blog List -->
	{#if filtered.length > 0}
		<ul class="space-y-6">
			{#each filtered as post}
				<li class="border-b pb-4">
					<a
						href={`/blog/${post.slug}`}
						class="text-2xl font-semibold text-blue-600 hover:underline"
					>
						{post.title}
					</a>
					<p class="text-sm text-gray-500">{post.date}</p>
					<p class="mt-2 text-gray-700">{post.description}</p>
					{#if post.tags}
						<div class="mt-2 flex flex-wrap gap-1">
							{#each post.tags as t}
								<span class="rounded bg-gray-200 px-2 py-0.5 text-xs">{t}</span>
							{/each}
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<p>No posts found for selected tag(s).</p>
	{/if}
</section>
