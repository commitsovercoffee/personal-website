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
