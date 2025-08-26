const greetings = {
	dawn: [
		{ first: 'Already', second: 'Awake?', comment: 'Well... I am probably asleep.' },
		{ first: 'Chirp', second: 'Birdie', comment: 'Already on the screen?' }
	],
	early_morning: [
		{ first: 'Good', second: 'Morning', comment: 'Hope you’ve had your coffee.' },
		{ first: 'Good', second: 'Morning', comment: 'Did you have breakfast?' }
	],
	late_morning: [
		{ first: 'Hey', second: 'Sunshine', comment: '... avoiding work already?' },
		{ first: 'Hey', second: 'Sunshine', comment: 'Yak shaving are we?' }
	],
	early_afternoon: [
		{ first: 'Good', second: 'Afternoon', comment: 'Did you have lunch?' },
		{ first: 'Good', second: 'Afternoon', comment: 'Working hard or hardly working?' }
	],
	late_afternoon: [
		{ first: 'Still', second: 'Working?', comment: 'Would you like a snack?' },
		{ first: 'Still', second: 'Working?', comment: 'Take a stretch break!' }
	],
	early_evening: [
		{ first: 'Good', second: 'Evening', comment: 'Time to relax a bit.' },
		{ first: 'Good', second: 'Evening', comment: 'Are you wrapping up work?' }
	],
	late_evening: [
		{ first: 'Almost', second: 'Bedtime', comment: '... still scrolling?' },
		{ first: 'Almost', second: 'Bedtime', comment: "Don't fight it too long." }
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
		{ first: 'Happy', second: 'Weekend', comment: 'Do what makes you happy.' },
		{ first: 'Almost', second: 'Monday', comment: 'But don’t think about it yet.' }
	],
	random: [
		{ first: 'Hello', second: 'Beautiful', comment: 'Welcome to my corner of the internet :P' },
		{ first: 'Hello', second: 'Beautiful', comment: 'Welcome to my markup mansion.' },

		{ first: 'Hello', second: 'Friend', comment: 'Are you a pescatarian by any chance?' },
		{ first: 'Hello', second: 'Friend', comment: 'Do you play dota by any chance?' },

		{ first: 'Hey', second: 'Champ', comment: 'Having a bad day? Here’s a virtual hug.' },
		{ first: 'Hey', second: 'Champ', comment: 'Stressful day? Pat yourself on the back.' },

		{ first: 'Hey', second: 'Explorer', desc: 'Try clicking on things, see what breaks.' },
		{ first: 'Hey', second: 'Explorer', desc: 'Try clicking on things, see what breaks.' },

		{ first: 'Hello', second: 'Test Subject', comment: 'This is a test. You are my subject.' },
		{ first: 'Hello', second: 'Test Subject', comment: 'I see you’re reading this. Impressive.' },

		{ first: 'Breaking', second: 'News', comment: 'You’ve just wasted 3 seconds reading this.' },
		{ first: 'Breaking', second: 'News', comment: "This line you're reading is unnecessary." },

		{ first: 'Error', second: '404', comment: "Just kidding, You're right where you should be :P" },
		{ first: 'Error', second: '404', comment: "Lost? Don't worry, so is everyone else." },

		{ first: 'Shower', second: 'Thought', comment: 'Do fish know they’re wet?' },
		{ first: 'Shower', second: 'Thought', comment: 'To your stomach, all potatoes are mashed.' }
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

	// 30% random, 70% slot-specific
	const pool = Math.random() < 0.3 ? greetings.random : greetings[slot];
	const randomGreeting = pool[Math.floor(Math.random() * pool.length)];

	localStorage.setItem('coc_greeting_segment', slot);
	localStorage.setItem('coc_greeting_data', JSON.stringify(randomGreeting));

	return randomGreeting;
}
