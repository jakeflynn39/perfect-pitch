<script>
	import { clickOutside } from 'svelte-use-click-outside';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Loading from '$lib/components/Loading.svelte';

	export let data;

	const { topArtists, sideArtists } = data;
	let { accessToken } = data;

	let cell = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];
	let searchMenu = false;
	let searchBar;
	let searchString;
	let tracks;
	let activeCell;
	let topArtist;
	let sideArtist;
	let guessesLeft = 9;

	$: searchString && (tracks = null);

	function openCell(tempCell) {
		searchMenu = true;
		const activeCellX = tempCell[0];
		const activeCellY = tempCell[1];
		activeCell = [activeCellX, activeCellY];
		tempCell = document.getElementById(`${tempCell[0]}${tempCell[1]}`);
		tempCell.style.border = '2px solid yellow';
	}

	function handleClose() {
		let tempCell = document.getElementById(`${activeCell[0]}${activeCell[1]}`);
		tempCell.style.border = 'none';
		searchMenu = false;
		searchString = '';
		activeCell = null;
		tracks = null;
	}

	function guessSong(track) {
		guessesLeft -= 1;
		topArtist = topArtists[activeCell[0]];
		sideArtist = sideArtists[activeCell[1]];

		if (
			track.artists.map((artist) => artist.id).includes(topArtist.id) &&
			track.artists.map((artist) => artist.id).includes(sideArtist.id)
		) {
			cell[activeCell[0]][activeCell[1]] = track;
		}

		handleClose();
	}

	onMount(async () => {
		if (accessToken) {
			const spotifyTokenData = {
				token: accessToken,
				expires: Date.now() + 3600
			};
			localStorage.setItem('spotifyAccessToken', JSON.stringify(spotifyTokenData));
			window.location.hash = '';
		} else {
			const storedAccessToken = localStorage.getItem('spotifyAccessToken');

			if (storedAccessToken && JSON.parse(storedAccessToken).expires < Date.now()) {
				accessToken = storedAccessToken.token;
			} else {
				console.error('No access token found.');
			}
		}
	});

	async function search() {
		if (searchString === '') {
			tracks = null;
			return;
		}
		let url = `https://api.spotify.com/v1/search?query=${searchString}&offset=0&limit=10&type=track&market=US`;
		tracks = fetch(url, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}).then((res) => res.json());
	}

	const debounce = (func, timer) => {
		let timeId = null;
		return (...args) => {
			if (timeId) {
				clearTimeout(timeId);
			}
			timeId = setTimeout(() => {
				func(...args);
			}, timer);
		};
	};
</script>

<svelte:head>
	<title>Perfect Pitch</title>
</svelte:head>

<div class="page-container">
	<div class="grid-titles top">
		{#each topArtists as artist}
			<a class="grid-title" href="https://open.spotify.com/artist/{artist.id}" target="_blank"
				>{artist.name}</a
			>
		{/each}
	</div>
	<div class="x-container">
		<div class="axis-game">
			<div class="grid-titles side">
				{#each sideArtists as artist}
					<a class="grid-title" href="https://open.spotify.com/artist/{artist.id}" target="_blank"
						>{artist.name}</a
					>
				{/each}
			</div>
			<div class="grid-container">
				<div class="grid">
					<div class="grid-item" id="00">
						{#if cell[0][0]}
							<img src={cell[0][0].album.images[0].url} alt={cell[0][0].name} />
							<span> {cell[0][0].name} </span>
						{:else}
							<button
								on:click={() => {
									openCell('00');
								}}
							/>
						{/if}
					</div>
					<div class="grid-item" id="10">
						{#if cell[1][0]}
							<img src={cell[1][0].album.images[0].url} alt={cell[1][0].name} />
							<span> {cell[1][0].name} </span>
						{:else}
							<button
								on:click={() => {
									openCell('10');
								}}
							/>
						{/if}
					</div>
					<div class="grid-item" id="20">
						{#if cell[2][0]}
							<img src={cell[2][0].album.images[0].url} alt={cell[2][0].name} />
							<span> {cell[2][0].name} </span>
						{:else}
							<button
								on:click={() => {
									openCell('20');
								}}
							/>
						{/if}
					</div>
					<div class="grid-item" id="01">
						{#if cell[0][1]}
							<img src={cell[0][1].album.images[0].url} alt={cell[0][1].name} />
							<span> {cell[0][1].name} </span>
						{:else}
							<button
								on:click={() => {
									openCell('01');
								}}
							/>
						{/if}
					</div>
					<div class="grid-item" id="11">
						{#if cell[1][1]}
							<img src={cell[1][1].album.images[0].url} alt={cell[1][1].name} />
							<span> {cell[1][1].name} </span>
						{:else}
							<button
								on:click={() => {
									openCell('11');
								}}
							/>
						{/if}
					</div>
					<div class="grid-item" id="21">
						{#if cell[2][1]}
							<img src={cell[2][1].album.images[0].url} alt={cell[2][1].name} />
							<span> {cell[2][1].name} </span>
						{:else}
							<button
								on:click={() => {
									openCell('21');
								}}
							/>
						{/if}
					</div>
					<div class="grid-item" id="02">
						{#if cell[0][2]}
							<img src={cell[0][2].album.images[0].url} alt={cell[0][2].name} />
							<span> {cell[0][2].name} </span>
						{:else}
							<button
								on:click={() => {
									openCell('02');
								}}
							/>
						{/if}
					</div>
					<div class="grid-item" id="12">
						{#if cell[1][2]}
							<img src={cell[1][2].album.images[0].url} alt={cell[1][2].name} />
							<span> {cell[1][2].name} </span>
						{:else}
							<button
								on:click={() => {
									openCell('12');
								}}
							/>
						{/if}
					</div>
					<div class="grid-item" id="22">
						{#if cell[2][2]}
							<img src={cell[2][2].album.images[0].url} alt={cell[2][2].name} />
							<span> {cell[2][2].name} </span>
						{:else}
							<button
								on:click={() => {
									openCell('22');
								}}
							/>
						{/if}
					</div>
				</div>
			</div>
		</div>
		<div class="guess-counter">
			<span class="num"> {guessesLeft} </span>
			<span class="guess">Guesses</span>
		</div>
	</div>
	{#if searchMenu}
		<div class="search-bar-page" transition:fade={{ delay: 25, duration: 80 }}>
			<div
				class="search-bar-container"
				use:clickOutside={() => {
					handleClose();
				}}
			>
				<div class="search-bar">
					<!-- svelte-ignore a11y-autofocus -->
					<input
						id="song-search-bar"
						type="text"
						placeholder="Search for a song"
						bind:this={searchBar}
						autofocus
						bind:value={searchString}
						on:keyup={debounce(search, 1000)}
					/>
				</div>
				{#if searchString}
					<ul class="autocomplete-items">
						{#if tracks}
							{#await tracks}
								<Loading />
							{:then data}
								{#each data.tracks.items as track}
									<li>
										<button
											class="search-item"
											on:click={() => {
												guessSong(track);
											}}
										>
											<div class="search-text">
												<div>
													<span class="song-name">{track.name}</span>
													<div class="song-info">
														{track?.album?.artists[0]?.name} | {track?.album?.name || '2023'} | {track?.album?.release_date?.slice(
															0,
															4
														) || '2023'}
													</div>
												</div>
											</div>
										</button>
									</li>
								{/each}
							{:catch error}
								<p>{error}</p>
								<p>
									Spotify account is not registered with the development enviorment. To play, email
									@jpflynn01@gmail.com for permission to play.
								</p>
							{/await}
						{:else}
							<Loading />
						{/if}
					</ul>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	span {
		color: white;
	}

	.page-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 100px;
	}

	$grid-size: 600px;
	$title-small: 200px;
	$grid-gap: 8px;
	$border-radius: 15px;
	$border-radius-small: 5px;

	$tablet-width: 1065px;
	$tablet-grid-size: 350px;
	$tablet-title-small: 100px;

	$phone-width: 768px;
	$phone-grid-size: 220px;
	$phone-title-small: 70px;

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
			padding: 5px;

			@media (max-width: $tablet-width) {
				font-size: 1.2rem;
			}

			@media (max-width: $phone-width) {
				font-size: 0.9rem;
			}
		}

		&.top {
			grid-template-columns: repeat(3, 1fr);
			width: $grid-size;
			height: 80px;

			@media (max-width: $tablet-width) {
				width: $tablet-grid-size;
			}

			@media (max-width: $phone-width) {
				width: $phone-grid-size;
				padding-left: $phone-title-small;
			}
		}

		&.side {
			grid-template-rows: repeat(3, 1fr);
			width: $title-small;
			height: $grid-size;

			@media (max-width: $tablet-width) {
				height: $tablet-grid-size;
				width: $tablet-title-small;
			}

			@media (max-width: $phone-width) {
				height: $phone-grid-size;
				width: $phone-title-small;
			}
		}
	}

	.x-container {
		display: flex;
		justify-content: center;
		align-items: center;

		@media (max-width: $phone-width) {
			flex-direction: column;
		}

		.axis-game {
			display: flex;
			justify-content: center;
			align-items: center;

			.grid-container {
				width: $grid-size;
				height: $grid-size;
				display: flex;
				justify-content: center;
				align-items: center;

				@media (max-width: $tablet-width) {
					height: $tablet-grid-size;
					width: $tablet-grid-size;
				}

				@media (max-width: $phone-width) {
					height: $phone-grid-size;
					width: $phone-grid-size;
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
					}

					@media (max-width: $phone-width) {
						max-width: $phone-grid-size;
						max-height: $phone-grid-size;
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

						button {
							width: 100%;
							height: 100%;
							background-color: transparent;
							border: none;
							cursor: pointer;
						}

						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
							border-radius: $border-radius-small;
							transform: all 0.1s ease-in-out;
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
						}

						&:hover {
							background-color: rgb(108, 108, 108);
							scale: 1.1;
							z-index: 2;
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

		.guess-counter {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: $title-small;
			height: $title-small;
			color: white;

			@media (max-width: $tablet-width) {
				width: $tablet-title-small;
				height: $tablet-title-small;
			}

			@media (max-width: $phone-width) {
				width: $phone-title-small;
				height: $phone-title-small;
			}

			.num {
				font-size: 4rem;
				font-weight: 500;

				@media (max-width: $tablet-width) {
					font-size: 3rem;
				}

				@media (max-width: $phone-width) {
					font-size: 2rem;
				}
			}

			.guess {
				font-size: 1.5rem;
				font-weight: 300;

				@media (max-width: $tablet-width) {
					font-size: 1rem;
				}

				@media (max-width: $phone-width) {
					font-size: 0.75rem;
				}
			}
		}
	}

	.search-bar-page {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.5);
		opacity: 1;
		visibility: visible;

		.search-bar-container {
			padding-top: 40px;
			margin: 0 auto;
			width: 100%;
			max-width: 350px;
		}

		.search-bar {
			border-radius: 10px;
			position: relative;
			box-shadow: inset 0 0 0 1.8px #eaeaead9;
			padding: 1rem;
			background-color: rgb(29, 29, 29);

			input {
				font-size: 20px;
				border: none;
				position: relative;
				width: 100%;
				height: 100%;
				background: transparent;
				color: white;

				&:focus {
					outline: none;
				}
			}
		}

		.autocomplete-items {
			z-index: 90;
			left: 0;
			right: 0;
			z-index: 99;
			padding: 0;
			margin: 0;
			list-style: none;
			outline: 2.3px solid #cfcfcfcf;
			box-shadow: inset 0 0 0 1.8px #eaeaead9;
			max-height: 350px;
			overflow-y: scroll;
			box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.333);
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			border-bottom-left-radius: 15px;
			border-bottom-right-radius: 15px;
			background-color: rgb(29, 29, 29);

			p {
				color: white;
				font-size: 1.2rem;
				font-weight: 300;
				padding: 1rem;
				text-align: center;
			}

			.search-item {
				cursor: pointer;
				transition: background-color 30ms ease-in-out;
				display: block;
				width: 100%;
				background-color: rgb(45, 45, 45);
				color: white;
				margin: 0;
				outline: none;
				padding: 0;
				border: none;
				transition: background-color 20ms ease-in-out;

				&:hover {
					background-color: #434343;
				}

				.search-text {
					margin: 0 1.2rem;
					padding: 0.6rem 0;
					height: 100%;
					border-bottom: 1.2px solid #ccc;
					text-align: left;

					.song-name {
						font-size: 19px;
						color: rgb(255, 255, 255);
						font-weight: 300;
					}

					.song-info {
						font-size: 12px;
						color: rgba(203, 203, 203, 0.778);
						font-weight: 200;
					}
				}

				&:last-child {
					.search-text {
						border-bottom: none;
					}
				}
			}
		}
	}
</style>
