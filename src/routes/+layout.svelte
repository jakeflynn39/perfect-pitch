<script>
	import Header from '$lib/components/Header.svelte';
</script>

<Header />

<slot />

<style lang="scss">
	$tablet-width: 1065px;
	$phone-width: 768px;

	:global(body) {
		background-color: #1b1b1b;
		padding: 0 50px;
		margin: 0;
		font-family: 'Nunito', sans-serif;
		letter-spacing: -0.02em;

		@media (max-width: $tablet-width) {
			padding: 0 20px;
		}

		@media (max-width: $phone-width) {
			padding: 0 10px;
		}
	}

	:global(button) {
		background-color: #1b1b1b;
		padding: 0;
		margin: 0;
		font-family: 'Nunito', sans-serif;
		letter-spacing: -0.02em;
	}
</style>
