export interface Testimonial {
  id: string
  name: string
  text: string
  tags: string[]
  city?: string
  source?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Aisha, Bandra',
    text: 'I was terrified of the pain. She talked me through the first five minutes — just breathing — and after that it was background noise. The pause-whenever-you-need rule is real.',
    tags: ['pain'],
    city: 'Mumbai',
  },
  {
    id: 't2',
    name: 'Rohan, Andheri',
    text: 'Seeing the needle come out of the sealed packet in front of me changed everything. No guesswork, no "trust me". You see it, you know.',
    tags: ['hygiene'],
    city: 'Navi Mumbai',
  },
  {
    id: 't3',
    name: 'Priya, Dadar',
    text: 'I came in with a vague feeling and zero images. She didn\'t push for a design. We talked for an hour, she sketched while we talked, and that sketch became the tattoo. The conversation was the work.',
    tags: ['indecision'],
    city: 'Mumbai',
  },
  {
    id: 't4',
    name: 'Karan, Pune',
    text: 'The aftercare sheet is the only one I\'ve ever actually followed. It\'s written like a human wrote it for another human, not like a legal disclaimer.',
    tags: ['hygiene', 'pain'],
    city: 'Pune',
  },
]