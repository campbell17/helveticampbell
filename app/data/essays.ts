// Essays data for the writing section
export interface Essay {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags?: string[];
}

export const essays: Essay[] = [
  {
    id: "essay-1",
    title: "A New Chapter in Making Progress",
    date: "December 4, 2020",
    excerpt: "When I used to read social media posts from the Rise-and-grind™ glitterati, the half of my brain that didn't scoff and chortle was deeply curious and a little envious.",
    slug: "new-morning-routine",
    tags: ["Productivity"]
  },
  {
    id: "essay-2",
    title: "Laundry Gratitude",
    date: "March 29, 2021",
    excerpt: "We tend to take for granted the small things that keep everything afloat...",
    slug: "laundry-gratitude",
    tags: ["Personal"]
  },
  {
    id: "essay-3",
    title: "Free Play",
    date: "September 25, 2020",
    excerpt: "Yesterday I did something I want to take back. I ruined the fun of my 8 year old when we were playing in the driveway.",
    slug: "free-play",
    tags: ["Personal"]
  },
  {
    id: "essay-4",
    title: "My 2021 System",
    date: "January 14, 2021",
    excerpt: "I've never been a practitioner of yearly goal setting since it goes against my tendency to go with the flow, but this year I'm taking a new approach.",
    slug: "system-for-2021",
    tags: ["Personal"]
  },
  {
    id: "essay-5",
    title: "I Got Five Minutes",
    date: "October 29, 2020",
    excerpt: "I have six minutes to write something. Make that five. Today has been tough. Not tough in the sense that anything bad has happened...",
    slug: "five-minutes",
    tags: ["Personal"]
  }
]; 