<script>
	/**
	 * An array of project objects passed via component props.
	 *
	 * Each project object contains:
	 * @typedef {Object} Project
	 * @property {string} repo - project repository name.
	 * @property {string} desc - short description of the project.
	 * @property {string} demo - link to a live demo of the project (empty string if none).
	 *
	 * @type {Project[]}
	 */
	let { projects } = $props();
</script>

<div class="component m-2 grid grid-cols-1 gap-4 text-pretty break-words md:m-0 md:grid-cols-2">
	{#each projects as project, i (i)}
		<dl class="not-prose flex flex-col gap-2 rounded-xl bg-panel p-6">
			<dt class="text-fg">{project.repo}</dt>
			<dd class="text-body">{project.desc}</dd>
			<dd class="mt-4 flex gap-2">
				<a
					target="_blank"
					class="rounded-xl bg-bg px-2 py-0.5 text-highlight no-underline transition-all duration-200 ease-in hover:bg-highlight hover:text-bg"
					href="https://github.com/commitsovercoffee/{project.repo}">source</a
				>
				{#if project.demo != ''}
					<a
						target="_blank"
						class="rounded-xl bg-bg px-2 py-0.5 text-tertiary transition-all duration-200 ease-in hover:bg-tertiary hover:text-bg"
						href={project.demo}>demo</a
					>
				{/if}
			</dd>
		</dl>
	{/each}
</div>
