
import { Hero } from '@/components/hero/Hero.client'
import { Marquee } from '@/components/marquee/Marquee.client'
import { ThesisStats } from '@/components/proof/ThesisStats.client'
import { M3Reveal } from '@/components/sanctuary/M3Reveal'
import { TestimonialQuote } from '@/components/TestimonialQuote'
import { SessionLine } from '@/components/session/SessionLine.client'
import { SelectedWorkRail } from '@/components/drag/SelectedWorkRail.client'
import { PillarScrub } from '@/components/pillars/PillarScrub.client'
import { TheHinge } from '@/components/hinge/TheHinge'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'

import { testimonials } from '@/content/testimonials'
import styles from './page.module.css'


const PILLARS = [
  {
    title: 'Psychology',
    body: 'Choosing to mark your skin is a decision about who you are becoming. I want to hear the why before I draw anything.',
  },
  {
    title: 'Meditation',
    body: 'The needle, the brush and the pencil are three rhythms with one shared attention. When I work, the room gets quiet.',
  },
  {
    title: 'Therapy',
    body: 'I am not a therapist. I do hold the room. Some things come out easier when your hands are busy and nobody is watching your face.',
  },
  {
    title: 'Calmness',
    body: 'No rushed stencils. No brushed-off questions. You can arrive with a mess of feelings and no vocabulary for them.',
  },
] as const

const PROCESS_STEPS = [
  { num: '01', label: 'Conversation' },
  { num: '02', label: 'Sketch' },
  { num: '03', label: 'Design' },
  { num: '04', label: 'Session' },
  { num: '05', label: 'Aftercare' },
] as const

export default function Home() {
  const homeTestimonials = testimonials.slice(0, 3)

  return (
    <main id="main-content" className={styles.page}>
      <SessionLine />
      <Hero />

      <Marquee />

      {/* Block 02b: Band + Stats */}
      <M3Reveal>
        <ThesisStats />
      </M3Reveal>

      {/* Block 04: Drag rail */}
      <M3Reveal>
        <SelectedWorkRail />
      </M3Reveal>

      {/* Block 04b: The Hinge / Still Band */}
      <M3Reveal>
        <TheHinge />
      </M3Reveal>

      <div className={styles.lightTheme}>
        {/* Block 05: Pillars */}
        <M3Reveal>
          <PillarScrub pillars={PILLARS} />
        </M3Reveal>

        {/* Block 06: Process */}
        <M3Reveal>
          <section aria-labelledby="process-heading" className={styles.processSection}>
            <div className={styles.processLeft}>
              <span className={styles.sectionLabel}>The process</span>
              <h2 id="process-heading" className={styles.processHeading}>
                How a piece actually gets made.
              </h2>
            </div>
            <div className={styles.processRight}>
              <div className={styles.process}>
                {PROCESS_STEPS.map((step) => (
                  <div key={step.num} className={styles.processStep}>
                    <span className={styles.processNum}>{step.num}</span>
                    <span className={styles.processLabel}>{step.label}</span>
                  </div>
                ))}
              </div>
              <a href="/sanctuary" className={styles.textLink}>
                Walk through the process
              </a>
            </div>
          </section>
        </M3Reveal>

        {/* Block 08: Voices */}
        <M3Reveal>
          <section aria-labelledby="voices-heading" className={styles.block}>
            <span className={styles.sectionLabel}>Voices</span>
            <h2 id="voices-heading" className={styles.sectionHeading}>
              Some clients know me as Alza.
            </h2>
            <div className={styles.voices}>
              {homeTestimonials.map((t) => (
                <TestimonialQuote key={t.id} testimonial={t} />
              ))}
            </div>
          </section>
        </M3Reveal>

        {/* Block 09: Where to find me */}
        <M3Reveal>
          <section aria-labelledby="find-heading" className={styles.block}>
            <span className={styles.sectionLabel}>Where to find me</span>
            <h2 id="find-heading" className={styles.sectionHeading}>
              Where to find me
            </h2>
            <p className={styles.bodyText}>
              My primary location is Kharghar, in Navi Mumbai. Most sessions happen
              there. I also work from studios elsewhere in Mumbai when there is
              demand.
            </p>
            <p className={styles.bodyMeta}>
              No fixed studio address. Start a conversation to find out where.
            </p>
          </section>
        </M3Reveal>

        {/* Block 10: Close */}
        <M3Reveal>
          <section aria-labelledby="close-heading" className={styles.closeSection}>
            <h2 id="close-heading" className={styles.closeHeading}>
              Your story deserves to be worn.
            </h2>
            <InteractiveHoverButton href="/consulting">
              Start a conversation
            </InteractiveHoverButton>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '919820012345'}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
            >
              Message on WhatsApp
            </a>
          </section>
        </M3Reveal>
      </div>
    </main>
  )
}
