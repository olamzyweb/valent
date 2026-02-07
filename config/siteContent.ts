export type TimelineItem = {
  date: string;
  title: string;
  description: string;
};

export type ReasonItem = {
  title: string;
  message: string;
};

export const siteContent = {
  recipientName: 'Alex',
  heroMessage: 'A little place for all the moments that feel like home.',
  timeline: [
    {
      date: 'Jan 14, 2022',
      title: 'The First Hello',
      description: 'Coffee, laughter, and the easiest conversation I ever had.'
    },
    {
      date: 'Jun 02, 2022',
      title: 'Our Favorite Walk',
      description: 'Golden hour, quiet streets, and the way you held my hand.'
    },
    {
      date: 'Nov 19, 2023',
      title: 'The Cozy Winter',
      description: 'Blankets, playlists, and making a home in small moments.'
    },
    {
      date: 'Aug 08, 2024',
      title: 'The Big Adventure',
      description: 'New places, new memories, same favorite person.'
    }
  ] satisfies TimelineItem[],
  reasons: [
    {
      title: 'Your laugh',
      message: 'It makes any room feel warm and bright.'
    },
    {
      title: 'Your calm',
      message: 'You turn chaos into something gentle and clear.'
    },
    {
      title: 'Your kindness',
      message: 'You notice people and make them feel seen.'
    },
    {
      title: 'Your curiosity',
      message: 'You make everyday things feel like discoveries.'
    },
    {
      title: 'Your taste',
      message: 'From playlists to places, you always choose beautifully.'
    },
    {
      title: 'Your heart',
      message: 'You love deeply and it inspires me.'
    },
    {
      title: 'Your patience',
      message: 'You listen in a way that makes space for me.'
    },
    {
      title: 'Your sparkle',
      message: 'The little magic that follows you everywhere.'
    },
    {
      title: 'Your support',
      message: 'You believe in me, even when I forget to.'
    },
    {
      title: 'Your hugs',
      message: 'They always feel like the right place to be.'
    }
  ] satisfies ReasonItem[],
  loveLetter: `My dearest Alex,\n\nEvery day with you feels like a soft sunrise — warm, steady, and full of promise. Thank you for the joy you bring into my life, for the way you see me, and for the love you give so freely. I love the little rituals we share, the big dreams we build, and the simple peace of just being near you.\n\nHappy Valentine’s Day. I’m so grateful it’s you.\n\nForever yours,\nYour favorite person`,
  surpriseMessage: 'You are my best surprise — every single day.',
  surprisePhotos: ['Photo Placeholder 1', 'Photo Placeholder 2', 'Photo Placeholder 3'],
  songPath: ''
};
