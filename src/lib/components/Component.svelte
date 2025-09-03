<script>
	let type = 'success'; // success, error, warning
	let size = 'small'; // small, large
	let isActive = false;
</script>

<div
	class={(type === 'success'
		? 'bg-green-100 text-green-800'
		: type === 'error'
			? 'bg-red-100 text-red-800'
			: 'bg-yellow-100 text-yellow-800') +
		' ' +
		(size === 'large' ? 'px-6 py-3 text-lg' : 'px-3 py-1 text-sm') +
		' ' +
		(isActive ? 'shadow-lg' : '') +
		' rounded-md font-medium'}
>
	Ternary Badge
</div>
