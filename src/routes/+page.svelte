<script>
	// @ts-nocheck
	import { leetcodeWorth } from '$lib/index.js';
	import { codeforcesWorth } from '$lib/index.js';
	import characters from '$lib/character-1.gif';

	let platform = '';
	let handle = '';
	let s = '';
	let errorMsg = false;

	function setPlatform(selectedPlatform) {
		platform = selectedPlatform;
	}

	async function generateWorth() {
		s = '';
		errorMsg = false;
		if (platform == 'Codeforces') {
			try {
				const result = await codeforcesWorth(handle);
				if (result.error) {
					errorMsg = true;
				}
				s = result.message;
			} catch (error) {
				s = error.message;
				errorMsg = true;
			}
		} else if (platform == 'Leetcode') {
			try {
				const result = await leetcodeWorth(handle);
				if (result.error) {
					errorMsg = true;
				}
				s = result.message;
			} catch (error) {
				s = error.message;
				errorMsg = true;
			}
		} else {
			s = 'Please select a platform';
			errorMsg = true;
		}
	}
	function handleEnterKey(event) {
		if (event.key === 'Enter') {
			generateWorth();
		}
	}
</script>

<main>
	<h1>CPValor</h1>
	<img src={characters} alt="" />
	<p>
		"Choose the Platform to Uncover Your Code's Worth: Discover the Value of Your Programming
		Skills"
	</p>
	{#if !s || errorMsg}
		<div class="platforms">
			<button
				on:click={() => setPlatform('Codeforces')}
				class:Codeforces={platform === 'Codeforces'}
			>
				Codeforces
			</button>
			<button on:click={() => setPlatform('Leetcode')} class:Leetcode={platform === 'Leetcode'}>
				Leetcode
			</button>
		</div>
		<div class="handle">
			<span class="user-handle">Enter Username:</span>
			<input bind:value={handle} type="text" class="input-username" on:keydown={handleEnterKey} />
			<button on:click={generateWorth} class="worth-btn"> Generate Worth </button>
		</div>
		<p style="color: red; margin-top: 1rem; text-align: center;">{s}</p>
	{:else}
		<div style="margin-top: 5rem; color: green;">
			{s}
		</div>
	{/if}

	<p class="developer">
		Developed by
		<a href="https://twitter.com/bj_jiwrajka" target="_blank">bj_jiwrajka</a>
	</p>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Open Sans', sans-serif;
		background-color: #ededed;
	}
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		text-align: center;
	}

	p {
		font-family: Poppins;
		font-size: 1.2rem;
		font-weight: 600;
		text-align: center;
		color: #002939;
	}

	h1 {
		font-size: 2.5rem;
		color: #212152;
		font-weight: 600;
		margin-bottom: 0;
		margin-top: 5rem;
	}

	.platforms {
		display: flex;
		gap: 2rem;
	}

	button {
		padding: 0.8rem 2.5rem;
		font-size: 1.2rem;
		cursor: pointer;
		background-color: #fff;
		outline: none;
		border-radius: 0.8rem;
		font-weight: 550;
		border: 2px solid #0000005c;
		color: #3a3a66;
		box-shadow: 0 0.5rem 0.5rem #0000001c;
	}

	.handle {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.input-username {
		height: 3.2rem;
		border-radius: 0.8rem;
		border: 1px solid #0000003d;
		outline: none;
		padding: 0 1rem;
		font-size: 1.2rem;
	}
	.user-handle {
		color: #3a3a66;
		font-weight: 600;
		font-size: 1.2rem;
	}
	.worth-btn {
		color: #fff;
		background-color: #3a3a66;
	}
	.worth-btn:hover {
		background-color: #2e2e66;
		transition: 0.2s ease-in-out;
	}
	img {
		width: 18rem;
		height: 14rem;
	}
	.Codeforces,
	.Leetcode {
		background-color: #3a3a66;
		color: #fff;
	}
	.developer {
		position: absolute;
		bottom: 0;
		font-size: 1.2rem;
		color: #3a3a66;
	}

	/* let shareUrl = 'https://cpvalor.netlify.app/';
	// let shareTitle = 'CPValor';
	// let shareText = 'Check out my CPValor';
	// let shareVia = 'CPValor';
	// let shareHashtags = 'CPValor';
	// let shareImage = 'https://cpvalor.netlify.app/share.png';
	// function shareSM() {
	// 	if (navigator.share) {
	// 		navigator
	// 			.share({
	// 				title: shareTitle,
	// 				text: shareText,
	// 				url: shareUrl
	// 			})
	// 			.then(() => console.log('Successful share'))
	// 			.catch((error) => console.log('Error sharing', error));
	// 	} else {
	// 		alert('Web Share API not supported');
	// 	}
	// } 
	<!-- <button on:click={shareSM}> Share.. </button> -->
	*/
</style>
