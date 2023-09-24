<script>
	import FaMusic from 'svelte-icons/fa/FaMusic.svelte';
	import FaSpotify from 'svelte-icons/fa/FaSpotify.svelte';
</script>

<div class="header">
	<a class="spotify-logo" href="https://open.spotify.com" target="_blank">
		<FaSpotify />
	</a>
	<h1>
		<span>
			<FaMusic />
		</span>
		<a href="/"> Perfect Pitch </a>
		<span>
			<FaMusic />
		</span>
	</h1>
</div>

<style lang="scss">
	$tablet-width: 1065px;
	$phone-width: 768px;

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
		position: relative;
	}

	.spotify-logo {
		position: absolute;
		color: white;
		max-width: 80px;
		left: 0;
		top: 0;
		margin-top: 20px;
		margin-left: 70px;

		@media (max-width: $tablet-width) {
			max-width: 60px;
		}

		@media (max-width: $phone-width) {
			display: none;
		}
	}

	h1 {
		color: white;
		font-size: 80px;
		font-weight: 100;
		display: flex;
		text-transform: lowercase;
		letter-spacing: -0.04em;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;

		@media (max-width: $tablet-width) {
			font-size: 50px;
		}

		@media (max-width: $phone-width) {
			font-size: 40px;
			width: 100%;
		}

		a {
			text-decoration: none;
			color: white;
		}

		span {
			max-width: 70px;
			margin-top: 21px;

			@media (max-width: $tablet-width) {
				max-width: 50px;
			}

			@media (max-width: $phone-width) {
				// height: 20px;
				margin-top: 10px;
				max-width: 30px;
			}
		}
	}
</style>
