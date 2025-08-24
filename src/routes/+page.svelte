<script>
	import { SvelteSet } from 'svelte/reactivity';
	import { cubicIn, cubicInOut, cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let { data } = $props();
	let { posts } = data;

	const tags = [...new Set(posts.flatMap((p) => p.tags || []))];
	let selectedTags = new SvelteSet();

	let filteredPosts = $derived(
		selectedTags.size > 0 ? posts.filter((p) => p.tags?.some((t) => selectedTags.has(t))) : posts
	);

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
				animate:flip={{ easing: cubicInOut, duration: 400, delay: 400 }}
				in:fly={{ easing: cubicOut, x: -40, duration: 400, delay: 800 }}
				out:fly={{ easing: cubicIn, x: -40, duration: 400 }}
				class="group no-underline"
			>
				<dl>
					<dt class="text-fg">{post.title}</dt>
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
