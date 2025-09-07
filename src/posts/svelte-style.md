---
title: "Svelte & Tailwind"
date: "2025-09-03"
desc: "Notes on styling svelte components."
tags: ["notes", "svelte"]
published: true
position: 4
---

<script>
  import Balloon from '$lib/components/blog/Balloon.svelte';
	import Typer from '$lib/components/blog/Typer.svelte';
	import Button from '$lib/components/blog/Button.svelte';
	import Box from '$lib/components/blog/Box.svelte';

	const outputStyle = 'p-4 border border-highlight border-dashed rounded-lg';
	const buttonStyle = 'p-2 rounded-xl bg-panel shadow my-2';

	function randomPastel() {
		const hue = Math.floor(Math.random() * 360); // random hue
		const saturation = Math.floor(Math.random() * 20 + 80); // 80–100% for bright pastel
		const lightness = Math.floor(Math.random() * 15 + 75); // 75–90% for soft bright color
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}
</script>

Svelte components bundle markup, styles, and behavior. Styles are scoped by
default, so they apply only to the component and don’t leak out.

By default, a Svelte component is styled with a single `<style>` tag containing
CSS rules. In this blog, though, we’ll lean towards Tailwind for styling.

---

## Conditional Styling

Adding or removing a class based on a condition is a common pattern in UI
development. In Svelte, there are several ways to do this. Consider the sample
program below, and then let's explore the different approaches.

Sample Program :

`src/routes/+page.svelte`
```svelte
<script>
	const paragraph = 'The quick brown fox jumps over the lazy dog.';

	let typed = $state('');
	let active = $state(false);

	let chars = $derived(paragraph.split(''));
	let typedChars = $derived(typed.split(''));
	let currentIndex = $derived(typedChars.length);

	function handleKeydown(e) {
		if (!active) return;
		if (e.key.length === 1) {
			e.preventDefault(); // Prevent scrolling
			typed += e.key;
		} else if (e.key === 'Backspace') {
			typed = typed.slice(0, -1);
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />
<div class="not-prose flex flex-wrap py-4">
	{#each chars as char, i (i)}
		<span
			class="text-xl transition-all duration-100 ease-in
			{active && i == currentIndex
				? 'bg-primary text-bg' // cursor
				: typedChars[i] === char
					? 'text-highlight' // correct letter
					: typedChars[i] && typedChars[i] !== char
						? char != ' '
							? 'text-secondary' // incorrect letter
							: 'bg-secondary' // incorrect space
						: !typedChars[i] && !active && 'text-body'}"
		>
			{char === ' ' ? '\u00A0' : char}
		</span>
	{/each}
</div>
<button
	class="my-2 rounded-xl bg-panel p-2 shadow"
	onclick={() => {
		active = !active;
		typed = '';
	}}
>
	{active ? 'End Typing' : 'Start Typing'}
</button>
```

Output :

<div class={outputStyle}>
    <Typer/>
</div>

### 1. Using Ternary Operators

```svelte
<span
	class="text-xl transition-all duration-100 ease-in
			{active && i === currentIndex
		? 'bg-primary text-bg' // cursor
		: typedChars[i] === char
			? 'text-highlight' // correct
			: typedChars[i] && typedChars[i] !== char
				? char != ' '
					? 'text-secondary' // incorrect letter
					: 'bg-secondary' // incorrect space
				: !typedChars[i] && !active && 'text-body'}"
>
	{char === ' ' ? '\u00A0' : char}
</span>
```

In the `Output` above, style of the text is applied conditionally using a
ternary operator. Using ternary operators for simple conditional styling is
fine. But, for more complex cases (as above), they quickly become verbose and
hard to read (as you may have felt). That’s why I consider their usage
`❌ Bad Practice`.

### 2. Passing an Object

```svelte
<span
	class={{
		'text-xl transition-all duration-100 ease-in': true, // always
		'bg-primary text-bg': active && i === currentIndex, // cursor
		'text-highlight': typedChars[i] === char, // correct
		'text-secondary': typedChars[i] && typedChars[i] !== char && char !== ' ', // wrong letter
		'bg-secondary': typedChars[i] && typedChars[i] !== char && char === ' ', // wrong space
		'text-body': !typedChars[i] && !active // untyped
	}}
>
	{char === ' ' ? '\u00A0' : char}
</span>
```

We can rewrite the logic in an object. Using objects for conditional styling is
more readable than using ternary operators. Personally, I’m not fond of this
syntax, but using it is still a `✅ Good Practice`.

### 3. Passing an Array

```svelte
<span
	class={[
		'text-xl transition-all duration-100 ease-in', // always
		active && i === currentIndex && 'bg-primary text-bg', // cursor
		typedChars[i] === char && 'text-highlight', // correct
		typedChars[i] && typedChars[i] !== char && char !== ' ' && 'text-secondary', // wrong letter
		typedChars[i] && typedChars[i] !== char && char === ' ' && 'bg-secondary', // wrong space
		!typedChars[i] && !active && 'text-body' // untyped
	]}
>
	{char === ' ' ? '\u00A0' : char}
</span>
````

We can also rewrite the logic in an array. Using arrays for conditional styling
is just as readable as using objects. Personally, I find the array syntax the
clearest, since it reads like a collection of __if this, then that__ statements.
Definitely a `✅ Good Practice`.

Besides the approaches discuss above, we can also achieve the same using a `class:`
directive, which was once a convenient way to set classes on elements conditionally.
However, It's [no longer recommended](https://svelte.dev/docs/svelte/class#The-class:-directive).

---

## Style Child Component

Often, you need to influence the styles inside a child component. In Svelte,
you can do this by passing classes as props or using CSS variables, allowing the
parent to control the styling.

### 1. Passing classes as prop

With this method, you can easily pass Tailwind utility classes to style a child
component as you like. However, because Tailwind doesn’t support constructing
[dynamic classes](https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names), this approach has its limitations.

Sample Program :

`$lib/components/Button.svelte`
```svelte
<script>
	let props = $props();
</script>
<button {...props} class={['rounded-xl border p-2 shadow', props.class]}>
	{@render props.children?.()}
</button>
```

`src/routes/+page.svelte`
```svelte
<script>
	import Button from '$lib/components/Button.svelte';
</script>

<Button class={['border-red-400 bg-red-200 text-red-800']}>Primary</Button>
<Button class={['border-sky-400 bg-sky-200 text-sky-800']}>Secondary</Button>
```

Output :

<div class={outputStyle}>
    <Button class={['border-red-400 bg-red-200 text-red-800']}>Primary</Button>
    <Button class={['border-sky-400 bg-sky-200 text-sky-800']}>Secondary</Button>
</div>

### 2. Passing CSS Variables

With this method, you can pass CSS custom properties to a child component, making
it easy to style elements dynamically. Unlike Tailwind classes, CSS variables can
be computed on the fly.

Sample Program :

`$lib/components/Box.svelte`
```svelte
<div class="box"></div>

<style>
	.box {
		width: 5em;
		height: 5em;
		background-color: var(--bg-color, #dcdcdc);
		transition: background-color 1s ease;
	}
</style>
```

`src/routes/+page.svelte`
```svelte
<script>
	import Box from '$lib/components/Box.svelte';

	function randomPastel() {
		const hue = Math.floor(Math.random() * 360); // random hue
		const saturation = Math.floor(Math.random() * 20 + 80); // 80–100% for bright pastel
		const lightness = Math.floor(Math.random() * 15 + 75); // 75–90% for soft bright color
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}
</script>

<div class="my-2 flex flex-row gap-2">
	<Box --bg-color={randomPastel()} />
	<Box --bg-color={randomPastel()} />
</div>
```

Output :

<div class={outputStyle}>
	<div class="my-2 flex flex-row gap-2">
		<Box --bg-color={randomPastel()} />
		<Box --bg-color={randomPastel()} />
		<Box --bg-color={randomPastel()} />
		<Box --bg-color={randomPastel()} />
	</div>
</div>

---

## Custom Animations

When working with Tailwind, you can’t directly define custom animations inside it.

### 1. Component Scoped

If the animation is only needed for a single component and won’t be reused elsewhere,
we can define it inside that component’s `<style>` tag.

Sample Program :

`src/routes/+page.svelte`
```svelte
<script>
	let balloon = '🎈';
</script>

<div
	class="relative h-[200px] w-full overflow-hidden rounded-md bg-gradient-to-t from-white to-sky-300"
>
	<p class="animate-float absolute -bottom-1/2 left-1/2 -translate-x-1/2 text-[2.5rem]">
		{balloon}
	</p>
</div>

<style>
	@keyframes float {
		0% {
			transform: translate(-50%, 100px) rotate(0deg);
		}
		50% {
			transform: translate(-50%, -100px) rotate(3deg);
		}
		100% {
			transform: translate(-50%, -300px) rotate(-3deg);
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
</style>
```

### 2. Global ~ Outside the Component

If the animation should be shared across multiple components, we can define it in
`app.css` (or another global stylesheet) so it can be reused anywhere.

Sample Program :

`src/app.css`
```css
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

@theme {
	--animate-float: float-up 6s ease-in-out infinite;
	@keyframes float-up {
		0% {
			transform: translate(-50%, 100px) rotate(0deg);
		}
		50% {
			transform: translate(-50%, -100px) rotate(3deg);
		}
		100% {
			transform: translate(-50%, -300px) rotate(-3deg);
		}
	}
}
```

`src/routes/+page.svelte`
```svelte
<script>
	let balloon = '🎈';
</script>

<div
	class="relative h-[200px] w-full overflow-hidden rounded-md bg-gradient-to-t from-white to-sky-300"
>
	<p class="animate-float absolute -bottom-1/2 left-1/2 -translate-x-1/2 text-[2.5rem]">
		{balloon}
	</p>
</div>
```

Output :

<div class={outputStyle}>
    <Balloon/>
</div>

---

## That's all folks.

Svelte and Tailwind play really well together. You get scoped styles by default,
utility-driven styling, and the freedom to fall back on CSS variables or custom
animations whenever you need more fine-grained control.
