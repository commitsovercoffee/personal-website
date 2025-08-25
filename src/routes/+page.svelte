<script>
	import { SvelteSet } from 'svelte/reactivity';
	import { cubicIn, cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { Flame } from '@lucide/svelte';

	let { data } = $props();
	let { posts } = data;

	const tags = [...new Set(posts.flatMap((p) => p.tags || []))];
	let selectedTags = new SvelteSet();
	const pinned = posts.filter((p) => p.pinned);
	const unpinned = posts.filter((p) => !p.pinned);

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

<section>
	<h1 class="font-medium text-fg">Hello <span class="text-primary">Beautiful</span></h1>
	<p>
		Welcome to my corner of the web. Here you’ll find half-finished projects, wandering thoughts,
		and maybe a cozy idea to ponder about. Thanks for stopping by.
	</p>
</section>

<hr class="border-panel" />

{#if tags.length > 0}
	<div class="flex flex-wrap gap-2">
		{#each tags as tag (tag)}
			<button
				class="cursor-pointer rounded-xl px-2 py-1 transition-all duration-200 active:translate-y-2
						{selectedTags.has(tag) ? 'bg-fg text-bg' : 'bg-panel text-fg hover:bg-fg hover:text-bg'}"
				onclick={() => toggleTag(tag)}
			>
				{tag}
			</button>
		{/each}
	</div>
{/if}

<ul class="flex flex-col justify-around pl-0">
	{#if filteredPosts.length > 0}
		{#each filteredPosts as post (post)}
			<a
				href={`/blog/${post.slug}`}
				animate:flip={{ easing: cubicInOut, duration: 200, delay: 200 }}
				in:fly={{ easing: cubicInOut, x: -20, duration: 200, delay: 400 }}
				out:fly={{ easing: cubicIn, x: -20, duration: 200 }}
				class="group no-underline"
			>
				<dl>
					<dt class="flex gap-2 text-fg">
						{#if post.pinned}
							<Flame class="fill-primary stroke-primary" strokeWidth={1.2} size={16} />
						{/if}
						{post.title}
					</dt>
					<span
						class="block h-0.5 max-w-16 bg-primary transition-all duration-300 group-hover:max-w-sm"
					></span>
					<dd class="text-body">{post.description}</dd>
				</dl>
			</a>
		{/each}
	{:else}
		<p class="text-body">No posts found for selected tag(s).</p>
	{/if}
</ul>
