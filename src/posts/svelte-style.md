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
  import Button from '$lib/components/blog/Button.svelte';

  const outputStyle="p-4 border border-highlight border-dashed rounded-lg";
  const buttonStyle="p-2 rounded-xl bg-panel shadow";

	let type = $state('success'); // success, error, warning
	let size = $state('small'); // small, large
</script>

Svelte components bundle markup, styles, and behavior. Styles are scoped by
default, so they apply only to the component and don’t leak out.

By default, a svelte component is styled using a single `<style>` tag with
CSS rules. In this blog, however, we’ll focus on using Tailwind and utility
classes for styles.

---

## The Class Attribute.

Adding or removing a class based on some condition is a common pattern
in UI development. In svelte, we can do this in three different ways:

### 1. Using a ternary operator :

```svelte
<script>
	let type = $state('success'); // success, error, warning
	let size = $state('small'); // small, large
</script>

<div
	class="{type === 'success'
		? 'bg-green-100 text-green-800'
		: type === 'error'
			? 'bg-red-100 text-red-800'
			: 'bg-yellow-100 text-yellow-800'} {size === 'large'
		? 'px-6 py-3 text-lg'
		: 'px-3 py-1 text-sm'} rounded-md font-medium"
>
	🔔 Notification
</div>
```

Using ternary operators for simple conditional styling is fine. But, for more
complex cases, they quickly become verbose and hard to read. Therefore, I
consider their usage `❌ Bad Practice`.

### 2. Passing an Object :

```svelte
<script>
	let type = $state('success'); // success, error, warning
	let size = $state('small'); // small, large
</script>

<div
	class={{
		'bg-green-100 text-green-800': type === 'success',
		'bg-red-100 text-red-800': type === 'error',
		'bg-yellow-100 text-yellow-800': type === 'warning',
		'px-6 py-3 text-lg': size === 'large',
		'px-3 py-1 text-sm': size === 'small',
		'rounded-md font-medium': true
	}}
>
	🔔 Notification
</div>
```

Using objects for conditional styling is more readable than using ternary
operators. Personally, I am not fond of this syntax, but using it is still
a `✅ Good Practice`.

### 3. Passing an Array :

```svelte
<script>
	let type = $state('success'); // success, error, warning
	let size = $state('small'); // small, large
</script>

<div
	class={[
		type === 'success' && 'bg-green-100 text-green-800',
		type === 'error' && 'bg-red-100 text-red-800',
		type === 'warning' && 'bg-yellow-100 text-yellow-800',
		size === 'large' && 'px-6 py-3 text-lg',
		size === 'small' && 'px-3 py-1 text-sm',
		'rounded-md font-medium'
	]}
>
	🔔 Notification
</div>
```

Using arrays for conditional styling is just as readable as using objects.
Personally, I find the array syntax the clearest, since it reads like a
collection of __if this, then that style__ statements. Definitely a `✅ Good Practice`.

### Output :

<div class={outputStyle}>
<div
	class={[
		type === 'success' && 'bg-green-100 text-green-800',
		type === 'error' && 'bg-red-100 text-red-800',
		type === 'warning' && 'bg-yellow-100 text-yellow-800',
		size === 'large' && 'px-6 py-3 text-lg',
		size === 'small' && 'px-3 py-1 text-sm',
		'rounded-md font-medium'
	]}
>
	Notification
</div>

<div class="mt-4 space-x-2">
	<label>Type:</label>
	<select bind:value={type} class="rounded border px-2 py-1">
		<option value="success">Success</option>
		<option value="error">Error</option>
		<option value="warning">Warning</option>
	</select>
	<label>Size:</label>
	<select bind:value={size} class="rounded border px-2 py-1">
		<option value="small">Small</option>
		<option value="large">Large</option>
	</select>
</div>
</div>

---

## Passing Classes to Components

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

### Output :

<div class={outputStyle}>
    <Button class={['border-red-400 bg-red-200 text-red-800']}>Primary</Button>
    <Button class={['border-sky-400 bg-sky-200 text-sky-800']}>Secondary</Button>
</div>

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
