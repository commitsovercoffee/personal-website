const greetings = {
	dawn: [
		{ first: 'Already', second: 'Awake?', comment: 'Well... I am probably asleep.' },
		{ first: 'Already', second: 'Awake?', comment: '... I probably haven’t gone to bed yet.' }
	],
	early_morning: [
		{ first: 'Good', second: 'Morning', comment: 'Hope you’ve had your coffee.' },
		{ first: 'Good', second: 'Morning', comment: 'Did you have breakfast?' }
	],
	late_morning: [
		{ first: 'Hello', second: 'Sunshine', comment: '... avoiding work already?' },
		{ first: 'Hello', second: 'Sunshine', comment: 'Yak shaving are we?' }
	],
	early_afternoon: [
		{ first: 'Good', second: 'Afternoon', comment: 'Did you have lunch?' },
		{ first: 'Good', second: 'Afternoon', comment: 'Working hard or hardly working?' }
	],
	late_afternoon: [
		{ first: 'Still', second: 'Working?', comment: 'Would you like some tea?' },
		{ first: 'Still', second: 'Working?', comment: 'Take a stretch break!' }
	],
	early_evening: [
		{ first: 'Good', second: 'Evening', comment: 'Time to relax a bit.' },
		{ first: 'Good', second: 'Evening', comment: 'Are you wrapping up work?' }
	],
	late_evening: [
		{ first: 'Almost', second: 'Bedtime', comment: '... still scrolling?' },
		{ first: 'Almost', second: 'Bedtime', comment: '... still scrolling? Please stop.' }
	],
	midnight: [
		{ first: 'Hello', second: 'Night Owl', comment: "Aren't you sleepy yet?" },
		{ first: 'Hello', second: 'Night Owl', comment: 'Burning the midnight oil?' }
	],
	late_night: [
		{ first: 'Still', second: 'Awake?', comment: 'I am too. Probably.' },
		{ first: 'Hello', second: 'Insomniac', comment: 'Surely, Sleep is for the weak.' }
	],
	weekend: [
		{ first: 'Happy', second: 'Weekend', comment: 'I hope you are not working today.' },
		{ first: 'Happy', second: 'Weekend', comment: 'Do what makes you happy.' }
	],
	random: [
		{ first: 'Hello', second: 'Friend', comment: 'Are you a pescatarian by any chance?' },
		{ first: 'Hello', second: 'Friend', comment: 'Do you play dota by any chance?' },

		{ first: 'Hey', second: 'Champ', comment: 'Having a bad day? Here’s a virtual hug.' },
		{ first: 'Hey', second: 'Champ', comment: 'Stressful day? Pat yourself on the back.' },
		{ first: 'Hey', second: 'Explorer', desc: 'Try clicking on things, see what breaks.' },
		{ first: 'Hey', second: 'Explorer', desc: 'Try clicking on things, see what breaks.' },

		{ first: 'Breaking', second: 'News', comment: 'You’ve just wasted 3 seconds reading this.' },
		{ first: 'Breaking', second: 'News', comment: "This line you're reading is unnecessary." },

		{ first: 'Error', second: '404', comment: "Just kidding, You're right where you should be :P" },
		{ first: 'Error', second: '404', comment: "Lost? Don't worry, so is everyone else." },

		{ first: 'Shower', second: 'Thought', comment: 'Do fish know they’re wet?' },
		{ first: 'Shower', second: 'Thought', comment: 'To your stomach, all potatoes are mashed.' },

		{ first: 'Fun', second: 'Fact', comment: 'Sharks existed before Saturn got its rings.' },
		{ first: 'Fun', second: 'Fact', comment: 'Sharks existed before trees.' },
		{ first: 'Fun', second: 'Fact', comment: 'Rabbits can’t vomit.' },
		{ first: 'Fun', second: 'Fact', comment: 'Turtles can breathe through their butts.' },
		{ first: 'Fun', second: 'Fact', comment: 'Rats laugh when tickled.' },
		{ first: 'Fun', second: 'Fact', comment: 'A blue whale’s heart is the size of a small car.' },
		{ first: 'Fun', second: 'Fact', comment: 'Bananas are berries, but strawberries aren’t.' },
		{ first: 'Fun', second: 'Fact', comment: 'Koalas sleep up to 22 hours a day.' },
		{ first: 'Fun', second: 'Fact', comment: 'Penguins propose with pebbles.' },
		{ first: 'Fun', second: 'Fact', comment: 'Otters have favorite rocks they keep for life.' },
		{ first: 'Fun', second: 'Fact', comment: 'Ants never sleep.' },
		{ first: 'Fun', second: 'Fact', comment: 'Honey never spoils.' },
		{ first: 'Fun', second: 'Fact', comment: 'A snail can sleep for three years.' },
		{ first: 'Fun', second: 'Fact', comment: 'One piece of space junk falls to Earth every day.' },
		{ first: 'Fun', second: 'Fact', comment: 'Trees can communicate using underground fungi.' },
		{ first: 'Fun', second: 'Fact', comment: 'The first oranges weren’t orange, they were green.' },
		{ first: 'Fun', second: 'Fact', comment: 'Every zebra has unique stripes like fingerprints.' }
	]
};

function getTimeSlot() {
	const now = new Date();
	const day = now.getDay(); // 0 = Sunday, 6 = Saturday
	const hour = now.getHours();

	if (day === 0 || day === 6) return 'weekend';
	if (hour >= 4 && hour < 6) return 'dawn';
	if (hour >= 6 && hour < 9) return 'early_morning';
	if (hour >= 9 && hour < 12) return 'late_morning';
	if (hour >= 12 && hour < 15) return 'early_afternoon';
	if (hour >= 15 && hour < 18) return 'late_afternoon';
	if (hour >= 18 && hour < 21) return 'early_evening';
	if (hour >= 21 && hour < 23) return 'late_evening';
	if (hour >= 23 || hour < 1) return 'midnight';
	if (hour >= 1 && hour < 4) return 'late_night';

	return 'late_night';
}

export function pickGreeting() {
	let greeting = { first: '', second: '', comment: '' };

	const hasVisited = localStorage.getItem('coc_has_visited');

	// First-time visitor
	if (!hasVisited) {
		greeting = {
			first: 'Hello',
			second: 'Beautiful',
			comment: 'Welcome to my corner of the internet :P'
		};
		localStorage.setItem('coc_has_visited', 'true');
		return greeting;
	}

	const slot = getTimeSlot();
	const lastSegment = localStorage.getItem('coc_greeting_segment');
	const lastGreeting = localStorage.getItem('coc_greeting_data');

	// Use cached greeting if still in same slot
	if (lastSegment === slot && lastGreeting) {
		return JSON.parse(lastGreeting);
	}

	// 40% random, 60% slot-specific
	const pool = Math.random() < 0.4 ? greetings.random : greetings[slot];
	const randomGreeting = pool[Math.floor(Math.random() * pool.length)];

	localStorage.setItem('coc_greeting_segment', slot);
	localStorage.setItem('coc_greeting_data', JSON.stringify(randomGreeting));

	return randomGreeting;
}
