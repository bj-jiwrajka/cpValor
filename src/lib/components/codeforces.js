// @ts-nocheck
export async function codeforcesWorth(handle) {
	try {
		if (handle === '') {
			return { error: true, message: 'Username cannot be empty' };
		}

		const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
		if (!response.ok) {
			throw new Error('Username not found');
		}

		const data = await response.json();

		const {
			lastOnlineTimeSeconds,
			rating,
			friendOfCount,
			titlePhoto,
			avatar,
			contribution,
			maxRating,
			registrationTimeSeconds
		} = data.result[0];

		const worth = calculateCF({
			lastOnlineTimeSeconds,
			rating,
			friendOfCount,
			titlePhoto,
			avatar,
			contribution,
			maxRating,
			registrationTimeSeconds
		});
		return {
			error: false,
			message: 'Congratulations ! Your Codeforces profile is worth ' + worth + ` $`,
			totalContribution: contribution,
			rating: rating,
			maxRating: maxRating,
			avatar: avatar,
			worth:worth
		};
	} catch (error) {
		return { error: true, message: 'Error: ' + error.message };
	}
}

function calculateCF({
	lastOnlineTimeSeconds,
	rating,
	friendOfCount,
	contribution,
	maxRating,
	registrationTimeSeconds
}) {
	const lastOnlineTimeSecondsWeight = 0.1;
	const ratingWeight = 0.3;
	const friendOfCountWeight = 0.1;
	const contributionWeight = 0.1;
	const maxRatingWeight = 0.2;
	const registrationTimeSecondsWeight = 0.2;

	const normalizedLastOnlineTimeSeconds = lastOnlineTimeSeconds / 1000000000000;
	const normalizedRating = rating / 4000;
	const normalizedFriendOfCount = friendOfCount / 1000;
	const normalizedContribution = contribution / 1000;
	const normalizedMaxRating = maxRating / 4000;
	const normalizedRegistrationTimeSeconds = registrationTimeSeconds / 1000000000000;

	const worth =
		lastOnlineTimeSecondsWeight * normalizedLastOnlineTimeSeconds +
		ratingWeight * normalizedRating +
		friendOfCountWeight * normalizedFriendOfCount +
		contributionWeight * normalizedContribution +
		maxRatingWeight * normalizedMaxRating +
		registrationTimeSecondsWeight * normalizedRegistrationTimeSeconds;

	return Math.round(worth * 100000) / 100;
}
