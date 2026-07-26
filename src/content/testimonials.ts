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
    name: 'Amala James',
    text: 'TODO(prerna): paste real testimonial from Senja.',
    tags: ['pain'],
  },
  {
    id: 't2',
    name: 'Rutuja Babar',
    text: 'TODO(prerna): paste real testimonial from Senja.',
    tags: ['hygiene'],
  },
  {
    id: 't3',
    name: 'Prisha Nayak',
    text: 'TODO(prerna): paste real testimonial from Senja.',
    tags: ['indecision'],
  },
  {
    id: 't4',
    name: 'Sambhav Chathly',
    text: 'TODO(prerna): paste real testimonial from Senja.',
    tags: ['hygiene', 'pain'],
  },
  {
    id: 't5',
    name: 'Pramayee Bhaware',
    text: 'TODO(prerna): paste real testimonial from Senja.',
    tags: ['indecision'],
  },
]