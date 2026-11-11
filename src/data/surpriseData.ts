import { StoryScene, CareItem, FlirtMessage, JokeItem, MissMoment, BookPage } from '../types/surprise';

export const DEFAULT_STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    title: "A Gentle Evening",
    subtitle: "When the weight of the day feels heavy",
    description: "Mili sits quietly under the lavender twilight sky, tired from a long, exhausting day.",
    dialogue: "Today was a lot...",
    speaker: "Mili",
    actionMood: "tired",
    backgroundNote: "Soft evening dusk with drifting twilight clouds and dimming stars."
  },
  {
    id: 2,
    title: "Quiet Presence",
    subtitle: "Noticing without needing to be told",
    description: "Nayan notices her exhaustion. Without rushing or overwhelming her, he gently walks over and sits beside her.",
    dialogue: "Hey... I'm right here. Take all the time you need.",
    speaker: "Nayan",
    actionMood: "approach",
    backgroundNote: "Gentle warm golden lantern light glowing between them."
  },
  {
    id: 3,
    title: "A Silly Smile",
    subtitle: "Turning sighs into soft giggles",
    description: "Nayan starts doing a goofy little star-juggling dance just to see her smile. Mili's tiredness begins melting into a warm grin.",
    dialogue: "Look, I caught a constellation for you! ...Okay wait, I dropped it.",
    speaker: "Nayan",
    actionMood: "cheer",
    backgroundNote: "Tiny playful shooting stars bursting above them."
  },
  {
    id: 4,
    title: "Gentle Care Returned",
    subtitle: "Taking turns carrying the world",
    description: "On another day when Nayan feels worn out, Mili gently wraps a cozy blanket around him and hands him a warm cup of sweetness.",
    dialogue: "You take care of everything, now let me take care of you.",
    speaker: "Mili",
    actionMood: "caring",
    backgroundNote: "Warm cozy glow with swirling soft steam and floating heart sparkles."
  },
  {
    id: 5,
    title: "Under The Same Moon",
    subtitle: "Thousands of miles, one shared sky",
    description: "Side by side beneath the glowing crescent moon, both find complete calm. Distance feels powerless against such quiet understanding.",
    dialogue: "Look up at the moon... we're both under the very same light.",
    speaker: "Both",
    actionMood: "moon-peace",
    backgroundNote: "Grand golden crescent moon radiating peaceful silver-blue starlight."
  },
  {
    id: 6,
    title: "The Warmest Embrace",
    subtitle: "Where heartbeats align",
    description: "They hold each other close in a warm, unbreakable embrace as the entire sky bursts into shimmering stardust.",
    dialogue: "Care was never supposed to be one-sided. Sometimes I take care of you, sometimes you take care of me. And somehow, even from far away, we find little ways to make each other's days better.",
    speaker: "Both",
    actionMood: "warm-hug",
    backgroundNote: "Radiant starlight aura and blooming celestial hearts filling the night."
  }
];

export const DEFAULT_CARE_ITEMS: CareItem[] = [
  {
    id: "food",
    question: "Had something to eat?",
    shortLabel: "Nutritious Food",
    icon: "food",
    responseTitle: "Fuel your precious energy ♡",
    comfortMessage: "Please make sure you nourish yourself today! Even a warm bowl of soup, a tasty snack, or your favourite treat. You work so hard, and your body deserves gentle fuel.",
    actionTip: "A quick bite or a warm snack will make you feel so much better."
  },
  {
    id: "break",
    question: "Remember to take little breaks.",
    shortLabel: "Pause & Breathe",
    icon: "break",
    responseTitle: "The world can wait for a few minutes ♡",
    comfortMessage: "Unclench your jaw, soften your shoulders, and close your eyes for just 60 seconds. You don't have to carry every worry at this exact moment.",
    actionTip: "Take three slow, deep breaths right now. Inhale peace, exhale tension."
  },
  {
    id: "rest",
    question: "Don't forget to rest when you're tired.",
    shortLabel: "Sweet Rest",
    icon: "rest",
    responseTitle: "Rest is never wasted time ♡",
    comfortMessage: "It is okay to stop. It is okay to sleep early. Rest is how you heal and replenish your wonderful spirit. Give yourself full permission to curl up comfortably.",
    actionTip: "Wrap yourself in the fluffiest blanket you can find."
  },
  {
    id: "water",
    question: "Drink some water.",
    shortLabel: "Hydration",
    icon: "water",
    responseTitle: "A refreshing sip for you ♡",
    comfortMessage: "Go grab a fresh glass of water or a warm cup of herbal tea. Hydrating is a quiet little act of love towards your body, and I want you to feel refreshed.",
    actionTip: "Keep a water bottle nearby and take a refreshing sip right now."
  },
  {
    id: "peace",
    question: "You don't have to make every day perfect.",
    shortLabel: "Gentle Grace",
    icon: "peace",
    responseTitle: "You are already more than enough ♡",
    comfortMessage: "Some days are meant for thriving, and some days are just for surviving softly. Whatever you did today was enough. Be gentle with yourself, my cute baby.",
    actionTip: "Remind yourself: 'I am doing my best, and that is worthy of love.'"
  }
];

export const DEFAULT_FLIRT_MESSAGES: FlirtMessage[] = [
  {
    id: "flirt-1",
    text: "I was going to do something productive, but then my brain decided to think about you.",
    reaction: "🙈"
  },
  {
    id: "flirt-2",
    text: "You're becoming a very distracting part of my day, you know?",
    reaction: "✨"
  },
  {
    id: "flirt-3",
    text: "I think my favourite notification has a very specific name.",
    reaction: "💌"
  },
  {
    id: "flirt-4",
    text: "If being cute was a competition, I don't think you'd let anyone else win.",
    reaction: "👑"
  },
  {
    id: "flirt-5",
    text: "I have a complaint. You're way too easy to miss.",
    reaction: "🥺"
  },
  {
    id: "flirt-6",
    text: "Do you have any idea how unfair it is that someone this cute is also this sweet?",
    reaction: "🍓"
  },
  {
    id: "flirt-7",
    text: "Warning: thinking about your smile may cause spontaneous butterflies.",
    reaction: "🦋"
  }
];

export const DEFAULT_JOKES: JokeItem[] = [
  {
    id: "joke-1",
    punchline: "My productivity disappears faster than my battery when I start talking to you.",
    reaction: "🔋"
  },
  {
    id: "joke-2",
    punchline: "I think my brain has a shortcut, and somehow it always leads to you.",
    reaction: "🧠"
  },
  {
    id: "joke-3",
    punchline: "If overthinking was an Olympic sport, I'd probably forget to attend the final.",
    reaction: "🥇"
  },
  {
    id: "joke-4",
    punchline: "My GPS asked where I was going, and I almost typed 'into your arms'. The map got very confused.",
    reaction: "🗺️"
  }
];

export const DEFAULT_MISS_MOMENTS: MissMoment[] = [
  {
    id: "miss-1",
    text: "Sometimes I randomly wish you were here.",
    starColor: "#fbcfe8"
  },
  {
    id: "miss-2",
    text: "I wish we could talk about absolutely nothing and still enjoy every second.",
    starColor: "#e9d5ff"
  },
  {
    id: "miss-3",
    text: "Even the smallest things remind me of you.",
    starColor: "#fef08a"
  },
  {
    id: "miss-4",
    text: "Distance is annoying, but having you in my life makes it feel a little easier.",
    starColor: "#bae6fd"
  }
];

export const DEFAULT_BOOK_PAGES: BookPage[] = [
  {
    pageNumber: 1,
    header: "Chapter I",
    text: "Hey you. If you've made it all the way here, I hope this little world made you smile."
  },
  {
    pageNumber: 2,
    header: "Chapter II",
    text: "I know I can't always be physically there when your day gets difficult, but I hope you never forget how much your happiness matters."
  },
  {
    pageNumber: 3,
    header: "Chapter III",
    text: "I don't need every day to be perfect. I just want us to keep understanding each other, caring for each other, and growing together."
  },
  {
    pageNumber: 4,
    header: "Chapter IV",
    text: "Thank you for being a part of my life and for making ordinary moments feel a little more special."
  },
  {
    pageNumber: 5,
    header: "Final Chapter",
    text: "Until the day distance becomes just another story we laugh about...\n\nTake care of yourself, keep smiling, and remember that you're appreciated more than you know.\n\nWith lots of warmth,\n\nNayan ♡",
    footerSign: "Made with love, just for you."
  }
];

export const NOTE_FOR_YOU_TEXT = {
  heading: "Just a little reminder...",
  paragraphs: [
    "Sometimes I wish I could make your tiring days a little lighter, even if it's just by making you smile for a moment.",
    "You deserve kindness, peace, and all the little happiness life can offer.",
    "And whenever your day feels a little too much, I hope this tiny corner of the internet reminds you that someone genuinely cares about you."
  ]
};
