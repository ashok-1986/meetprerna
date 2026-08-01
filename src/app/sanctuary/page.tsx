import { testimonials } from '@/content/testimonials'
import { TestimonialQuote } from '@/components/sanctuary/TestimonialQuote'
import { FAQAccordion } from '@/components/sanctuary/FAQAccordion'
import { M3Reveal } from '@/components/sanctuary/M3Reveal'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { site } from '@/content/site'
import styles from './page.module.css'

const faqItems = [
  {
    id: 'cost',
    question: 'What does it cost?',
    answer: 'It depends on three things: the size, how detailed the design is, and how many sessions it needs.\n\nI will not quote a number before we have talked, because a guess helps neither of us. Once the design is agreed, a deposit of ₹500 holds the slot for a small piece. Larger work is quoted after the consultation.',
    jsonLd: true,
  },
  {
    id: 'duration',
    question: 'How long will it take?',
    answer: 'A small piece usually takes four to five hours in one sitting.\n\nI know that sounds long for something small. It is deliberate. I do not rush a stencil and I do not rush the line work, and the difference shows in five years, not on the day.\n\nLarger pieces depend on the size and where they sit on the body. Some areas take longer than others. I will give you a real number once I have seen the design.',
    jsonLd: true,
  },
  {
    id: 'idea',
    question: 'Do I need to know exactly what I want?',
    answer: 'No. Most people do not.\n\nWhen someone tells me they want a tattoo but have no idea what, I ask three things. Do you have a reference, even a rough one? Is there a story behind it? And what do you like the most, generally, not in tattoos.\n\nAny one of those is enough to start. The design comes out of that conversation, not before it.',
    jsonLd: true,
  },
  {
    id: 'see-design',
    question: 'Can I see the design before the day?',
    answer: 'Yes. The stencil is built for your body and you approve it before any ink is opened.',
    jsonLd: true,
  },
  {
    id: 'location',
    question: 'Where do you work from?',
    answer: 'My primary location is Kharghar, in Navi Mumbai. That is where most sessions happen.\n\nI also work from studios elsewhere in Mumbai when there is demand, at places I have collaborated with before. If you are somewhere else in the city, tell me where and I will let you know what is possible.',
    jsonLd: true,
  },
  {
    id: 'travel',
    question: 'Do you travel?',
    answer: 'Yes, but not on a fixed schedule.\n\nTravel depends on what comes in through the enquiry form. If you are outside Mumbai and you want a piece, send me the details and I will tell you honestly whether I can make it work.',
    jsonLd: true,
  },
  {
    id: 'coverup',
    question: 'Can I get a tattoo over a scar or an existing piece?',
    answer: 'This one I will not answer in general terms, because the honest answer depends on your skin, the scar, and what is already there.\n\nSend me a photo through the enquiry form and we can talk about it properly. I would rather tell you the truth about your case than give you a rule that might not apply to it.',
    jsonLd: true,
  },
  {
    id: 'change-mind',
    question: 'What if I change my mind?',
    answer: 'The deposit is not refundable, but it is not lost either.\n\nIf you need to move your date, tell me and we will find another one. The deposit moves with you. If I need to move it, the same thing — it stays with you until we find a time that works.\n\nThe only time a deposit is gone is if you stop replying altogether.',
    jsonLd: true,
  },
]

const painTestimonials = testimonials.filter(t => t.tags.includes('pain'))
const hygieneTestimonials = testimonials.filter(t => t.tags.includes('hygiene'))
const indecisionTestimonials = testimonials.filter(t => t.tags.includes('indecision'))

export default function Sanctuary() {

  return (
    <>
      <main id="main-content">
        {/* Hero */}
        <M3Reveal className={`${styles.section} ${styles.hero}`} aria-labelledby="sanctuary-hero-heading">
          <h1 id="sanctuary-hero-heading" className={styles.sectionHeading}>
            The room is quiet. Take your time.
          </h1>
          <p className={styles.sub}>
            What actually happens, from the first message to the day it has healed.
          </p>
        </M3Reveal>

        {/* The Five Steps */}
        <M3Reveal className={`${styles.section} ${styles.stepsSection}`} aria-labelledby="steps-heading">
          <span className={styles.sectionLabel}>THE PROCESS</span>
          <h2 id="steps-heading" className={styles.sectionHeading}>
            The five steps
          </h2>

          <div className={styles.steps}>
            {/* Step 01 */}
            <article className={styles.step}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>01</span>
                <h3 className={styles.stepHeading}>The Intake</h3>
              </div>
              <p className={styles.stepBody}>
                You fill out the consultation form. Tell me about your idea, your placement, and your timeline.
              </p>
              <div className={styles.testimonialPlacement}>
                {indecisionTestimonials.map(t => (
                  <TestimonialQuote key={t.id} name={t.name} text={t.text} />
                ))}
              </div>
            </article>

            {/* Step 02 */}
            <article className={styles.step}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>02</span>
                <h3 className={styles.stepHeading}>The Conversation</h3>
              </div>
              <p className={styles.stepBody}>
                I review your brief, and we move to WhatsApp. This is where we discuss the details, answer your questions, and build the vision together.
              </p>
            </article>

            {/* Step 03 */}
            <article className={styles.step}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>03</span>
                <h3 className={styles.stepHeading}>The Design</h3>
              </div>
              <p className={styles.stepBody}>
                Once we agree on the direction, I draft the custom design. We refine it until it is exactly right for you.
              </p>
            </article>

            {/* Step 04 */}
            <article className={styles.step}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>04</span>
                <h3 className={styles.stepHeading}>The Session</h3>
              </div>
              <p className={styles.stepBody}>
                We meet in person. The studio is quiet, the kit is single-use, and we take the time to get it right. Never in a rush.
              </p>
            </article>

            {/* Step 05 */}
            <article className={styles.step}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>05</span>
                <h3 className={styles.stepHeading}>The Aftercare</h3>
              </div>
              <p className={styles.stepBody}>
                You leave with clear healing instructions. I check in with you as it heals, and once it is settled, I ask for your honest feedback.
              </p>
            </article>
          </div>
        </M3Reveal>

        {/* Pain Section */}
        <M3Reveal className={`${styles.section} ${styles.twoAnchorSection}`} aria-labelledby="pain-heading">
          <div className={styles.twoAnchorLeft}>
            <span className={styles.sectionLabel}>PAIN</span>
            <h2 id="pain-heading" className={styles.sectionHeading}>
              Yes, it hurts. Here is what that actually means.
            </h2>
          </div>
          <div className={styles.twoAnchorRight}>
            <p className={styles.sectionBody}>
              It is closer to a hot scratch than a cut. Ribs, spine, elbows and ankles are sharper. Forearms, outer thighs and shoulders are gentler. Most people settle within ten minutes. We stop whenever you ask, as often as you ask, and nobody keeps score.
            </p>
            <div className={styles.testimonialPlacement}>
              {painTestimonials.map(t => (
                <TestimonialQuote key={t.id} name={t.name} text={t.text} />
              ))}
            </div>
          </div>
        </M3Reveal>

        {/* Hygiene Section */}
        <M3Reveal className={`${styles.section} ${styles.twoAnchorSection}`} aria-labelledby="hygiene-heading">
          <div className={styles.twoAnchorLeft}>
            <span className={styles.sectionLabel}>HYGIENE</span>
            <h2 id="hygiene-heading" className={styles.sectionHeading}>
              What comes out of the packet.
            </h2>
          </div>
          <div className={styles.twoAnchorRight}>
            <p className={styles.sectionBody}>
              Fresh needles opened in front of you. New grips, new tubes, new ink caps for every session. Gloves changed whenever I touch anything that is not you. The station is wiped down and covered before you sit.
            </p>
            <div className={styles.testimonialPlacement}>
              {hygieneTestimonials.map(t => (
                <TestimonialQuote key={t.id} name={t.name} text={t.text} />
              ))}
            </div>
          </div>
        </M3Reveal>

        {/* FAQ */}
        <M3Reveal className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-heading">
          <span className={styles.sectionLabel}>COST & QUESTIONS</span>
          <h2 id="faq-heading" className={styles.sectionHeading}>
            Questions people are scared to ask
          </h2>
          <FAQAccordion items={faqItems} />
        </M3Reveal>

        {/* Closing CTA */}
        <M3Reveal className={`${styles.section} ${styles.ctaSection}`} aria-labelledby="cta-heading">
          <h2 id="cta-heading" className={styles.ctaHeading}>
            Your story deserves to be worn.
          </h2>
          <InteractiveHoverButton
            href={`https://wa.me/${site.whatsapp}?text=Hello,%20I%20have%20a%20query%20regarding%20tattoo`}
            trackingSource="sanctuary_page"
            trackingPage="sanctuary"
          >
            Start a conversation
          </InteractiveHoverButton>
          <p className={styles.ctaNote}>
            Having trouble? <a href="mailto:prerna@meetprerna.com" className={styles.whatsappLink}>Email prerna@meetprerna.com</a>
          </p>
        </M3Reveal>

        {/* FAQPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems
                .filter(item => item.jsonLd)
                .map(item => ({
                  '@type': 'Question',
                  name: item.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                  },
                })),
            }),
          }}
        />
      </main>
    </>
  )
}
