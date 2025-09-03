---
title: "Svelte & Runes"
date: "2025-09-02"
desc: "Notes on svelte's reactviity system."
tags: ["notes", "svelte"]
published: true
position: 4
---

<script>
  const outputStyle="p-4 border border-highlight border-dashed rounded-lg"
  const buttonStyle="p-2 rounded-xl bg-panel shadow";

	const goal = 8;
	let glasses = $state(0);
	let liters = $derived(glasses * 0.25);
	let progress = $derived.by(() => Math.min(100, (glasses / goal) * 100));

	let count = $state(0);
	$inspect(count);

	import { counter } from '$lib/shared.svelte.js';
</script>

Svelte is a tool for building web applications. It allows you to build your app
declaratively out of components that combine markup, styles and behaviours.

In this blog, we will look at the heart of svelte ~ reactivity.

---

In svelte...

- __State__ refers to the current values held by variables, when the state updates
through a reassignment or mutation, it triggers reactivity.
- __Reactivity__ is a mechanism that ensures when your state changes, the DOM
and dependent computations automatically update.
- __Runes__ are explicit syntax through which you can mark a variable
as reactive, so that when the variable’s value changes, reactivity gets triggered.

## Runes

There are 7 types of Runes in svelte :

1. __$state__ rune allows you to create reactive state, which means that your UI
reacts when it changes. If $state is used with an array or a simple object, we
call this deep reactivity.

2. __$derived__ rune allows you to derive state from other state. The expression
inside the $derived declaration will be re-evaluated whenever its dependencies
are updated. __$derived.by__ can be used for complex derivations.

Sample Program :

```svelte
<script>
	const goal = 8;

	let glasses = $state(0);
	let liters = $derived(glasses * 0.25);
	let progress = $derived.by(() => {
		Math.min(100, (glasses / goal) * 100);
	});
</script>

<p>💧 Water Tracker :</p>
<p>🥤 Glasses: {glasses}</p>
<p>🪣 Liters: {liters}</p>
<p>📊 Progerss: {progress}%</p>
<button
	disabled={liters >= goal * 0.25}
	onclick={() => {
		glasses++;
	}}
>
	Add a Glass
</button>
```

Output :

<div class={outputStyle}>
<p>💧 Water Tracker :</p>
<p>🥤 Glasses: {glasses}</p>
<p>🪣 Liters: {liters}</p>
<p>📊 Progerss: {progress}%</p>
<button class={buttonStyle}
	disabled={liters >= goal * 0.25}
	onclick={() => {
		glasses++;
	}}
>
	Add a Glass
</button>
</div>

---

3. __$effect__ rune are functions that run when state updates, and can be used
for things like calling third-party libraries, drawing on \<canvas\> elements, or
making network requests. You should normally avoid these.

---

4. __$props__ rune are inputs to a component. These can have fallback values,
which are used, if the parent component does not set a prop, or its value is undefined.

Sample Program :

`$lib/components/Footer.svelte`
```svelte
<script>
	let { company = 'Facebook' } = $props();
</script>

<p>© {new Date().getFullYear()} {company}</p>
```

`+layout.svelte`
```svelte
<script>
  import Footer from '$lib/components/Footer.svelte';
</script>
<Footer company='Meta'/>
```

Output :

<div class={outputStyle}>
<p>© 2025 Meta</p>
</div>

---

5. __$bindable__ : In Svelte, component props can be bound, which means that
data can also flow up from child to parent. This isn’t something you should
do often.

---

6. __$inspect__ rune only works during development. It is roughly equivalent
to console.log, with the exception that it will re-run whenever its argument
changes.

Sample Program :

```svelte
<script>
	let count = $state(0);
	$inspect(count); // will console.log when count changes.
</script>

<button onclick={() => count++}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>
```

Output :

<div class={outputStyle}>
<button class={buttonStyle} onclick={() => count++}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>
</div>

Open browser console to see output.

---

7. __$host__ rune provides access to the host element, when compiling
a component as a custom elements (aka web components).

----

## Universal Reactivity

Runes can also work outside components. For example, to share some
global state. However, they are not supported in normal `.js` files, only
`.svelte.js` files.

Sample Program :

`$lib/shared.svelte.js`
```js
export const counter = $state({
	count: 0
});
```

`$lib/components/Increment.svelte`
```svelte
<script>
	import { counter } from '$lib/shared.svelte.js';
</script>

<button onclick={() => (counter.count += 1)}>
Add
</button>
````

`$lib/components/Decrement.svelte`
```svelte
<script>
	import { counter } from '$lib/shared.svelte.js';
</script>

<button onclick={() => (counter.count -= 1)}>
Subtract
</button>
````

`routes/+page.svelte`
```svelte
<script>
	import { counter } from '$lib/shared.svelte';
	import Increment from '$lib/components/Increment.svelte';
	import Decrement from '$lib/components/Decrement.svelte';
</script>

<p>
	Clicked {counter.count}
	{counter.count === 1 ? 'time' : 'times'}.
</p>
<Increment />
<Decrement />
```

Output :

<div class={outputStyle}>
<p>
	Clicked {counter.count}
	{counter.count === 1 ? 'time' : 'times'}.
</p>
<button class={buttonStyle} onclick={() => (counter.count += 1)}> Add </button>
<button class={buttonStyle} onclick={() => (counter.count -= 1)}> Subtract </button>
</div>

---

## Reactive Built-ins

Svelte provides [reactive versions of various built-ins](https://svelte.dev/docs/svelte/svelte-reactivity)
like Map, Set and URL that can be used just like their native counterparts.

```svelte
<script>
import {
	MediaQuery,
	SvelteDate,
	SvelteMap,
	SvelteSet,
	SvelteURL,
	SvelteURLSearchParams,
	createSubscriber
} from 'svelte/reactivity';
</script>
```

---

## End
