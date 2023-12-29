// @ts-nocheck
export async function leetcodeWorth(handle) {
	try {
		if (handle === '') {
			return { error: true, message: 'Username cannot be empty' };
		}

		const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${handle}/`);
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data = await response.json();

		if (
			typeof data.status !== 'undefined' &&
			data.status === 'error' &&
			typeof data.message !== 'undefined'
		) {
			throw new Error('Username not found');
		}

		const {
			totalSolved,
			easySolved,
			mediumSolved,
			hardSolved,
			contributionPoints,
			reputation,
			totalQuestions
		} = data;

		const worth = calculateLC({
			totalSolved,
			easySolved,
			mediumSolved,
			hardSolved,
			contributionPoints,
			reputation,
			totalQuestions
		});

		return { error: false, message: 'Your Leetcode profile is worth ' + worth + ` $` };
	} catch (error) {
		return { error: true, message: 'Error: ' + error.message };
	}
}

function calculateLC({
	totalSolved,
	easySolved,
	mediumSolved,
	hardSolved,
	contributionPoints,
	reputation,
	totalQuestions
}) {
	const contributionWeight = 0.15;
	const reputationWeight = 0.15;
	const easySolvedWeight = 0.1;
	const mediumSolvedWeight = 0.15;
	const hardSolvedWeight = 0.25;
	const totalProblemsWeight = 0.2;

	const normalizedContribution = contributionPoints / 5000;
	const normalizedReputation = reputation / 5000;
	const normalizedEasySolved = easySolved / totalSolved;
	const normalizedMediumSolved = mediumSolved / totalSolved;
	const normalizedHardSolved = hardSolved / totalSolved;
	const normalizedTotalProblems = totalSolved / totalQuestions;

	const worth =
		easySolvedWeight * normalizedEasySolved +
		mediumSolvedWeight * normalizedMediumSolved +
		hardSolvedWeight * normalizedHardSolved +
		contributionWeight * normalizedContribution +
		reputationWeight * normalizedReputation +
		totalProblemsWeight * normalizedTotalProblems;

	return Math.round(worth * 100000) / 100;
}
