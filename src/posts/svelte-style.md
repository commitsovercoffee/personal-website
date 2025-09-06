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

  const outputStyle="p-4 border border-highlight border-dashed rounded-lg";
  const buttonStyle="p-2 rounded-xl bg-panel shadow my-2";
</script>

Svelte components bundle markup, styles, and behavior. Styles are scoped by
default, so they apply only to the component and don’t leak out.

By default, a Svelte component is styled with a single `<style>` tag containing
CSS rules. In this blog, though, we’ll lean towards Tailwind for styling.

---

## Conditional Styling

Adding or removing a class based on a condition is a common pattern in UI
development. In Svelte, there are several ways to do this. Consider the sample
program below, and explore the different approaches discussed.

Sample Program :

`$lib/components/blog/Typer.svelte`
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

Often, you need to influence the styles inside a child component. To do this,
we can pass classes to components as props.

Sample Program :

`Button.svelte`
```svelte
<script>
	let props = $props();
</script>

<button {...props} class={['rounded-xl border p-2 shadow', props.class]}>
	{@render props.children?.()}
</button>
```

`App.svelte`
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

Since we cannot construct [dynamic classes in tailwind](https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names).
This approach limits its usage when we need something really dynamic. In those,
cases we can fall back to style and css vairabels I guess.


---

## Custom Animations with Tailwind

Here’s a simple balloon animation using plain CSS:

```svelte
<script>
	let balloon = '🎈';
</script>

<div class="sky">
	<p class="balloon">{balloon}</p>
</div>

<style>
	.sky {
		position: relative;
		height: 200px;
		background: linear-gradient(skyblue, white);
		overflow: hidden;
		border-radius: 8px;
	}

	.balloon {
		font-size: 2.5rem;
		position: absolute;
		left: 50%;
		bottom: -50%;
		transform: translateX(-50%);
		animation: float 6s ease-in-out infinite;
	}

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
</style>
```

We can rewrite the same animation using tailwind as shown below.

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

If you notice in the above rewrite, we have used a class named `animate-float`.
This class will be responsible for the animation. But to make it work, we'll
need to define it somewhere first. We have two options:

1. Define it in `<style>` of the (above) component. If, it's only used there.

```svelte
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

2. Define it in `app.css`. If you plan to reuse it across components.

```css

@import 'tailwindcss';
@plugin '@tailwindcss/typography';

@theme {
	--animate-float-up: float-up 6s ease-in-out infinite;
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

Output :


<div class={outputStyle}>
    <Balloon/>
</div>

---

## Extras

###   The style directive

We can use `style:` directive to write multiple inline styles.

```svelte
<button
	class="card"
	style:transform={flipped ? 'rotateY(0)' : ''}
	style:--bg-1="palegoldenrod"
	style:--bg-2="black"
	style:--bg-3="goldenrod"
	onclick={() => flipped = !flipped}
>
```

### Custom Properties

`Box.svelte`
```svelte
<style>
	.box {
		width: 5em;
		height: 5em;
		border-radius: 0.5em;
		margin: 0 0 1em 0;
		background-color: var(--color, #ddd);
	}
</style>
```

We can set the value of `--color` on individual components. These values can be
dynamic, like any other attribute.

`App.svelte`
```svelte
<div class="boxes">
	<Box --color="red" />
	<Box --color="green" />
	<Box --color="blue" />
</div>
```
