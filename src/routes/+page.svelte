<script>
	import FaSpotify from 'svelte-icons/fa/FaSpotify.svelte';

	export let data;

	const { topArtists, sideArtists } = data;

	async function loginWithSpotify() {
		const data = await fetch('/api/login').then((res) => res.json());
		if (!data.status == 302) {
			return;
		} else {
			window.location = data.headers.location;
		}
	}
</script>

<svelte:head>
	<title>Perfect Pitch</title>
</svelte:head>

<div class="page-container">
	<h2>guess which songs your favorite artists have in common</h2>

	<button on:click={loginWithSpotify}>
		<span>
			<FaSpotify />
		</span>
		log in with spotify</button
	>

	<div class="dummy-game">
		<div class="grid-titles top">
			{#each topArtists as artist}
				<a class="grid-title" href="https://open.spotify.com/artist/{artist.id}" target="_blank"
					>{artist.name}</a
				>
			{/each}
		</div>
		<div class="x-container">
			<div class="grid-titles side">
				{#each sideArtists as artist}
					<a class="grid-title" href="https://open.spotify.com/artist/{artist.id}" target="_blank"
						>{artist.name}</a
					>
				{/each}
			</div>
			<div class="grid-container">
				<div class="grid">
					<div class="grid-item" id="00" />
					<div class="grid-item">
						<img
							src="https://i.scdn.co/image/ab67616d0000b273bb1138165ad4ec2306f4e886"
							alt="Mona Lisa"
						/>
						<span> Mona Lisa </span>
					</div>
					<div class="grid-item" />
					<div class="grid-item">
						<img
							src="https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacc1263c0f4b"
							alt="End Game"
						/>
						<span> End Game </span>
					</div>
					<div class="grid-item">
						<img
							src="https://i.scdn.co/image/ab67616d0000b27380c64a084164867806ea617a"
							alt="Love Me"
						/>
						<span> Love Me </span>
					</div>
					<div class="grid-item" />
					<div class="grid-item" />
					<div class="grid-item">
						<img
							src="https://i.scdn.co/image/ab67616d0000b273a191830c8b300bc71c2faac7"
							alt="Strange Clouds"
						/>
						<span> Strange Clouds </span>
					</div>
					<div class="grid-item">
						<img
							src="https://i.scdn.co/image/ab67616d0000b273a5ce1f2b476d2bbb3cb43551"
							alt="Paranoid"
						/>
						<span> Paranoid </span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	$tablet-width: 1065px;
	$phone-width: 768px;

	$tablet-grid-size: 600px;
	$tablet-title-small: 150px;
	$tablet-grid-gap: 8px;

	$phone-grid-size: 290px;
	$phone-title-small: 60px;
	$phone-grid-gap: 4px;

	.page-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	h2 {
		font-size: 2rem;
		margin-bottom: 2rem;
		color: white;
		font-weight: 100;
		text-align: center;

		@media (max-width: $tablet-width) {
			font-size: 1.5rem;
		}

		@media (max-width: $phone-width) {
			font-size: 1.2rem;
		}
	}

	button {
		background-color: #1db954;
		border: none;
		border-radius: 500px;
		color: white;
		cursor: pointer;
		font-size: 1.5rem;
		font-weight: 400;
		padding: 1rem 2rem;
		transition: all 0.2s ease-in-out;
		display: flex;

		@media (max-width: $tablet-width) {
			font-size: 1.2rem;
		}

		span {
			display: block;
			max-width: 1.5rem;
			margin-right: 0.8rem;
			padding-top: 0.1rem;

			@media (max-width: $tablet-width) {
				max-width: 1.2rem;
			}
		}

		&:hover {
			background-color: #1ed760;
		}
	}

	.dummy-game {
		$grid-size: 600px;
		$title-small: 150px;
		$grid-gap: 8px;
		$border-radius: 15px;
		$border-radius-small: 5px;
		$rotate: 20deg;

		scale: 0.9;
		cursor: default;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: linear-gradient(to bottom right, #1b1b1bd6, #1b1b1b43);
			z-index: 100;
		}

		.grid-titles {
			font-size: larger;
			display: grid;
			gap: $grid-gap;
			justify-content: center;
			align-items: center;
			text-align: center;

			.grid-title {
				font-weight: 200;
				text-decoration: none;
				color: white;

				@media (max-width: $phone-width) {
					font-size: 0.8rem;
				}
			}

			&.top {
				grid-template-columns: repeat(3, 1fr);
				width: $grid-size;
				height: 80px;
				padding-left: $title-small;

				@media (max-width: $tablet-width) {
					width: $tablet-grid-size;
					height: $tablet-title-small;
					padding-left: $tablet-title-small;
				}

				@media (max-width: $phone-width) {
					width: $phone-grid-size;
					height: $phone-title-small;
					padding-left: $phone-title-small;
				}
			}

			&.side {
				grid-template-rows: repeat(3, 1fr);
				width: $title-small;
				height: $grid-size;

				@media (max-width: $tablet-width) {
					width: $tablet-title-small;
					height: $tablet-grid-size;
				}

				@media (max-width: $phone-width) {
					width: $phone-title-small;
					height: $phone-grid-size;
				}
			}
		}

		.x-container {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-right: calc($grid-size / 3);

			@media (max-width: $tablet-width) {
				padding-right: 0;
			}
		}

		.grid-container {
			width: $grid-size;
			height: $grid-size;
			display: flex;
			justify-content: center;
			align-items: center;

			@media (max-width: $tablet-width) {
				width: $tablet-grid-size;
				height: $tablet-grid-size;
			}

			@media (max-width: $phone-width) {
				width: $phone-grid-size;
				height: $phone-grid-size;
			}

			.grid {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: repeat(3, 1fr);
				width: 100%;
				height: 100%;
				max-width: $grid-size;
				max-height: $grid-size;
				gap: $grid-gap;

				@media (max-width: $tablet-width) {
					max-width: $tablet-grid-size;
					max-height: $tablet-grid-size;
					gap: $tablet-grid-gap;
				}

				@media (max-width: $phone-width) {
					max-width: $phone-grid-size;
					max-height: $phone-grid-size;
					gap: $phone-grid-gap;
				}

				.grid-item {
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: $border-radius-small;
					background-color: rgb(60, 60, 60);
					transition: all 0.1s ease-in-out;
					color: white;
					position: relative;

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
						border-radius: $border-radius-small;
					}

					span {
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						text-align: center;
						z-index: 1;
						padding: 0 7px 2px 5px;
						background-color: rgba(0, 0, 0, 0.675);
						border-bottom-right-radius: $border-radius-small;
						border-bottom-left-radius: $border-radius-small;
						font-weight: 200;

						@media (max-width: $tablet-width) {
							font-size: 0.8rem;
						}

						@media (max-width: $phone-width) {
							font-size: 0.7rem;
						}
					}

					&:nth-child(1) {
						border-top-left-radius: $border-radius;

						img {
							border-top-left-radius: $border-radius;
						}
					}

					&:nth-child(3) {
						border-top-right-radius: $border-radius;

						img {
							border-top-right-radius: $border-radius;
						}
					}

					&:nth-child(7) {
						border-bottom-left-radius: $border-radius;

						img {
							border-bottom-left-radius: $border-radius;
						}

						span {
							border-bottom-left-radius: $border-radius;
						}
					}

					&:nth-child(9) {
						border-bottom-right-radius: $border-radius;

						img {
							border-bottom-right-radius: $border-radius;
						}

						span {
							border-bottom-right-radius: $border-radius;
						}
					}
				}
			}
		}
	}
</style>
