<script>
	// @ts-nocheck
	import { leetcodeWorth } from '$lib/index.js';
	import { codeforcesWorth } from '$lib/index.js';
	import characters from '$lib/assets/cpvalor-img.gif';
	import Icon from '@iconify/svelte';

	let platform = '',
		handle = '',
		s = '',
		totalContribution = '',
		rating = '',
		maxRating = '',
		avatar = '',
		totalSolved = '',
		easySolved = '',
		mediumSolved = '',
		hardSolved = '',
		worth = '',
		buttonText = 'Generate Worth';
	let errorMsg = false;

	function setPlatform(selectedPlatform) {
		platform = selectedPlatform;
	}

	async function generateWorth() {
		s = '';
		errorMsg = false;
		let result;
		if (platform == '') {
			s = 'Please select a platform';
			errorMsg = true;
			return;
		} else if (platform === 'Codeforces') {
			buttonText = 'Generating...';
			result = await codeforcesWorth(handle);
			(totalContribution = result.totalContribution),
				(rating = result.rating),
				(maxRating = result.maxRating),
				(worth = result.worth),
				(avatar = result.avatar);
		} else {
			buttonText = 'Generating...';
			result = await leetcodeWorth(handle);
			(totalSolved = result.totalSolved),
				(easySolved = result.easySolved),
				(worth = result.worth),
				(mediumSolved = result.mediumSolved),
				(hardSolved = result.hardSolved);
		}
		buttonText = 'Generate Worth';
		if (result) {
			s = result.message;
			if (result.error) {
				errorMsg = true;
			}
		}
	}

	function handleEnterKey(event) {
		if (event.key === 'Enter') {
			generateWorth();
		}
	}
	async function shareResults() {
		try {
			let shareMessage = '';
			if (platform === 'Codeforces') {
				shareMessage = `🚀 Do you know how much worth is your coding profile? Just calculated my Codeforces profile worth on CPValor: ${worth}$! Check it out at https://cpvalor.netlify.app 🔥 #Codeforces`;
			} else if (platform === 'Leetcode') {
				shareMessage = `🚀 Do you know how much worth is your coding profile? Just calculated my Leetcode profile worth on CPValor: ${worth}$! Check it out at https://cpvalor.netlify.app 🔥 #Leetcode`;
			}
			const shareDialogUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
				shareMessage
			)}`;
			window.open(shareDialogUrl, '_blank');
		} catch (error) {
			console.error('Error sharing:', error.message);
		}
	}
</script>

<main>
	<h1>CPValor</h1>
	<img src={characters} alt="" />
	<p id="caption">
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
			<button on:click={generateWorth} class="worth-btn">{buttonText}</button>
		</div>
		<p style="color: red; margin: 1rem; text-align: center;">{s}</p>
	{:else if platform == 'Codeforces'}
		<div class="results">
			<img src={avatar} alt="cf-avatar" id="cf-avatar" />
			<p>Total Contribution: {totalContribution}</p>
			<p>Rating: {rating}</p>
			<p>Max rating: {maxRating}</p>
			<p>{s}</p>
		</div>
		<div class="buttons">
			<button
				class="worth-btn"
				on:click={() => {
					s = '';
					errorMsg = false;
				}}>Refresh</button
			>
			<button class="worth-btn" on:click={shareResults}
				>Share
				<Icon icon="akar-icons:twitter-fill" style="color: #fff; font-size: 1rem;"></Icon></button
			>
		</div>
	{:else}
		<div class="results">
			<p>Total Solved: {totalSolved}</p>
			<p>Easy Solved: {easySolved}</p>
			<p>Medium Solved: {mediumSolved}</p>
			<p>Hard Solved: {hardSolved}</p>
			<p>{s}</p>
		</div>
		<div class="buttons">
			<button
				class="worth-btn"
				on:click={() => {
					s = '';
					errorMsg = false;
				}}>Refresh</button
			>
			<button class="worth-btn" on:click={shareResults}
				>Share
				<Icon icon="akar-icons:twitter-fill" style="color: #fff; font-size: 1.2rem;"></Icon>
			</button>
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
		text-align: center;
		color: #002939;
		margin: 0;
		padding: 0;
	}

	h1 {
		font-size: 2.5rem;
		color: #212152;
		font-weight: 600;
		margin-bottom: 0;
		margin-top: 2rem;
	}
	#caption {
		margin: 1.5rem auto;
		font-weight: 600;
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
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.3rem;
		width: 14rem;
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
		position: relative;
		bottom: 0;
		font-size: 1.2rem;
		color: #3a3a66;
	}
	.buttons {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	.results {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		margin-bottom: 1rem;
		font-weight: 500;
	}
	#cf-avatar {
		width: 8rem;
		height: 8rem;
		margin: auto;
		border-radius: 50%;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}
		#caption {
			font-size: 1rem;
			width: 90%;
		}
		img {
			width: 15rem;
			height: 11rem;
		}
		.platforms {
			flex-direction: column;
			gap: 1rem;
		}
		.handle {
			flex-direction: column;
			gap: 0.5rem;
		}
		.user-handle {
			font-size: 1rem;
		}
		.input-username {
			height: 2.8rem;
			font-size: 1rem;
			width: 9.7rem;
		}
		.worth-btn {
			font-size: 1rem;
			width: 11.5rem;
			padding: 0;
		}
		button {
			height: 3rem;
		}
		.developer {
			font-size: 1rem;
		}
		.results {
			font-size: 1rem;
			width: 90%;
		}
		#cf-avatar {
			width: 6rem;
			height: 6rem;
		}
		.buttons {
			display: flex;
			flex-direction: column;
		}
	}
</style>
