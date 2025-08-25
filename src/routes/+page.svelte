<script>
	import { SvelteSet } from 'svelte/reactivity';
	import { cubicIn, cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let { data } = $props();
	let { posts } = data;

	// Collect all unique tags.
	const tags = [...new Set(posts.flatMap((p) => p.tags || []))];

	// Reactive set for selected tags.
	let selectedTags = new SvelteSet();

	// Split pinned/unpinned once.
	const pinned = posts.filter((p) => p.pinned);
	const unpinned = posts.filter((p) => !p.pinned);

	// Always show pinned, filter unpinned if tags are selected.
	let filteredPosts = $derived([
		...pinned,
		...(selectedTags.size > 0
			? unpinned.filter((p) => p.tags?.some((t) => selectedTags.has(t)))
			: unpinned)
	]);

	function toggleTag(tag) {
		selectedTags[selectedTags.has(tag) ? 'delete' : 'add'](tag);
	}
</script>

<h1 class="mb-0 font-semibold text-fg">
	Hello <span class="text-primary">Beautiful</span>
</h1>
<p class="mt-2 text-body">What are you doing today?</p>
<p class="mt-12">
	Welcome to my corner of the web. Here you’ll find half finished projects, wandering thoughts, and
	maybe a cozy idea to ponder about. Thanks for stopping by.
</p>
<hr class="border-panel" />

{#if tags.length > 0}
	<div class="my-16 flex flex-wrap gap-2">
		{#each tags as tag (tag)}
			<button
				class="transition-color cursor-pointer rounded-2xl px-4 py-1 duration-200 active:translate-y-4
						{selectedTags.has(tag) ? 'bg-primary text-bg' : 'bg-panel text-fg hover:bg-fg hover:text-bg'}"
				onclick={() => toggleTag(tag)}
			>
				{tag}
			</button>
		{/each}
	</div>
{/if}

<ul class="flex flex-col gap-4 pl-0">
	{#if filteredPosts.length > 0}
		{#each filteredPosts as post (post)}
			<a
				href={`/blog/${post.slug}`}
				animate:flip={{ easing: cubicInOut, duration: 300, delay: 300 }}
				in:fly={{ easing: cubicInOut, x: -40, duration: 300, delay: 600 }}
				out:fly={{ easing: cubicIn, x: -40, duration: 300 }}
				class="group no-underline"
			>
				<dl>
					<dt class="flex gap-2 font-bold text-fg">
						{post.title}
					</dt>
					<span
						class="block h-0.5 max-w-16 bg-primary transition-all duration-300 group-hover:max-w-sm"
					></span>
					<dd class="font-normal text-body">{post.desc}</dd>
				</dl>
			</a>
		{/each}
	{:else}
		<p class="text-body">No posts found for selected tag(s).</p>
	{/if}
</ul>
