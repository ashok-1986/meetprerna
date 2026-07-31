import { Hero } from '@/components/hero/Hero.client'
import { Marquee } from '@/components/marquee/Marquee.client'
import { StatsGrid } from '@/components/stats/StatsGrid'
import { M3Reveal } from '@/components/sanctuary/M3Reveal'
import { SessionLine } from '@/components/session/SessionLine.client'
import { FeaturedPortfolio } from '@/components/home/FeaturedPortfolio'
import { TheHinge } from '@/components/hinge/TheHinge'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { Voices } from '@/components/voices/Voices'
import { Process } from '@/components/process/Process'
import { WhereToFindMe } from '@/components/about/WhereToFindMe'
import { Practice } from '@/components/practice/Practice.client'
import styles from './page.module.css'

export default function Home() {
  return (
    <main id="main-content" className={styles.page}>
      <SessionLine />
      
      {/* Dark Ground Wrapper: Blocks 01 through 05 */}
      <div className={styles.darkTheme}>
        <Hero />
        <Marquee />

        {/* Block 05: The Practice / Pillars & StatsGrid */}
        <Practice />
        <StatsGrid />



        {/* Block 03: Selected Work / Featured Portfolio */}
        <FeaturedPortfolio />

        {/* Block 04: Fresh → Healed (TODO) */}
      </div>

      {/* Block 05b: The Still Band / The Hinge */}
      <M3Reveal>
        <TheHinge />
      </M3Reveal>

      {/* Light Ground Wrapper: Blocks 06 through 10 */}
      <div className={styles.lightTheme}>
        {/* Block 06: Process */}
        <Process />

        {/* Block 07: Sketchbook (TODO) */}

        {/* Block 08: Voices */}
        <M3Reveal>
          <Voices />
        </M3Reveal>

        {/* Block 09: Where to find me */}
        <WhereToFindMe />

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
