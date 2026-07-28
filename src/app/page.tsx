import Link from 'next/link'
import Image from 'next/image'
import { Hero } from '@/components/hero/Hero.client'
import { BandStats } from '@/components/proof/BandStats.client'
import { M3Reveal } from '@/components/sanctuary/M3Reveal'
import { TestimonialQuote } from '@/components/TestimonialQuote'
import { SessionLine } from '@/components/session/SessionLine.client'
import { DragRail } from '@/components/drag/DragRail.client'
import { PillarScrub } from '@/components/pillars/PillarScrub.client'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { portfolio } from '@/content/portfolio'
import { testimonials } from '@/content/testimonials'
import styles from './page.module.css'

const tattooCount = portfolio.filter((p) => p.medium === 'tattoo').length
const paintingCount = portfolio.filter((p) => p.medium === 'painting').length
const sketchCount = portfolio.filter((p) => p.medium === 'sketch').length

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

      <M3Reveal className={styles.indexSection}>
        <section aria-labelledby="index-heading" className={styles.block}>
          <span className={styles.sectionLabel}>The work</span>
          <div id="index-heading" className={styles.index}>
            <Link href="/portfolio?medium=tattoo" className={styles.indexRow}>
              <span className={styles.indexNum}>01</span>
              <span className={styles.indexLabel}>Tattoos</span>
              <span className={styles.indexCount}>({tattooCount})</span>
            </Link>
            <Link href="/portfolio?medium=painting" className={styles.indexRow}>
              <span className={styles.indexNum}>02</span>
              <span className={styles.indexLabel}>Paintings</span>
              <span className={styles.indexCount}>({paintingCount})</span>
            </Link>
            <Link href="/portfolio?medium=sketch" className={styles.indexRow}>
              <span className={styles.indexNum}>03</span>
              <span className={styles.indexLabel}>Sketches</span>
              <span className={styles.indexCount}>({sketchCount})</span>
            </Link>
          </div>

          <div className={styles.scrollCue} aria-hidden="true">
            <span className={styles.scrollLine} />
            <span className={styles.scrollText}>SCROLL</span>
          </div>
        </section>
      </M3Reveal>

      {/* Block 02b: Band + Stats */}
      <M3Reveal>
        <BandStats />
      </M3Reveal>

      {/* Block 03: Drag rail */}
      <M3Reveal>
        <DragRail />
      </M3Reveal>

      <div className={styles.lightTheme}>
        {/* Block 05b: The still (Hinge) */}
        <M3Reveal>
          <section aria-labelledby="still-heading" className={styles.stillBand}>
            <h2 id="still-heading" className={styles.visuallyHidden}>
              Prerna tattooing a client
            </h2>
            <Image
              src="/images/studio/prerna-working-bw.jpg"
              alt="Prerna tattooing a client's forearm"
              width={1920}
              height={1080}
              className={styles.stillImage}
              sizes="100vw"
              priority={false}
            />
            <div className={styles.stillScrim} />
            <div className={styles.stillText}>
              <p className={styles.stillLine}>She has never done the same thing twice.</p>
              <p className={styles.stillLineAccent}>On purpose.</p>
            </div>
          </section>
        </M3Reveal>

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
