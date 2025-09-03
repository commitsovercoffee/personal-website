<script>
	let props = $props();
</script>

<button {...props} class={['rounded-xl border p-2 shadow', props.class]}>
	{@render props.children?.()}
</button>
