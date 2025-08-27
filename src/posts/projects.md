---
title: "Projects"
date: "2023-04-01"
desc: "What I’ve been spending my weekends on."
tags: ["personal"]
published: true
pinned: true
position: 2
---

<script>
	import Project from '$lib/components/Project.svelte';
</script>

<Project
	projects={[
		{ repo: 'hope', desc: 'arch install script. ⚡', demo: '' },
		{ repo: 'dwm-remix', desc: 'pre-patched dwm. ✨', demo: '' },
		{ repo: 'border-patrol', desc: 'toggles element borders. 🚧', demo: '' }
	]}
/>
