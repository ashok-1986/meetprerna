
import { Hero } from '@/components/hero/Hero.client'
import { Marquee } from '@/components/marquee/Marquee.client'
import { ThesisStats } from '@/components/proof/ThesisStats.client'
import { M3Reveal } from '@/components/sanctuary/M3Reveal'
import { SessionLine } from '@/components/session/SessionLine.client'
import { SelectedWork } from '@/components/home/SelectedWork'
import { Block05Pillars } from '@/components/pillars/Block05Pillars'
import { TheHinge } from '@/components/hinge/TheHinge'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { Voices } from '@/components/voices/Voices'
import styles from './page.module.css'

const PROCESS_STEPS = [
  { num: '01', label: 'The Intake' },
  { num: '02', label: 'The Conversation' },
  { num: '03', label: 'The Design' },
  { num: '04', label: 'The Session' },
  { num: '05', label: 'The Aftercare' },
] as const;

export default function Home() {


  return (
    <main id="main-content" className={styles.page}>
      <SessionLine />
      <Hero />

      <Marquee />

      {/* Block 02b: Band + Stats */}
      <M3Reveal>
        <ThesisStats />
      </M3Reveal>

      {/* Block 03: Selected Work (Horizontal scroll gallery) */}
      <SelectedWork />

      {/* Block 04b: The Hinge / Still Band */}
      <M3Reveal>
        <TheHinge />
      </M3Reveal>

      <div className={styles.lightTheme}>
        {/* Block 05: Pillars */}
        <M3Reveal>
          <Block05Pillars />
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

        {/* Block 07: Voices */}
        <M3Reveal>
          <Voices />
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
