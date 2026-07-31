import { Hero } from '@/components/hero/Hero.client'
import { Marquee } from '@/components/marquee/Marquee.client'
import { StatsGrid } from '@/components/stats/StatsGrid'
import { M3Reveal } from '@/components/sanctuary/M3Reveal'
import { SessionLine } from '@/components/session/SessionLine.client'
import { FeaturedPortfolio } from '@/components/home/FeaturedPortfolio'
import { Block05Pillars } from '@/components/pillars/Block05Pillars'
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
      
      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Scrolling Location Marquee */}
      <Marquee />

      {/* 3. The Practice / Philosophy Block */}
      <Practice />

      {/* 4. Featured Portfolio (Grid with Pixel-Block reveals) */}
      <FeaturedPortfolio />

      {/* 5. The Hinge / Still Band (Dark to Light Transition) */}
      <M3Reveal>
        <TheHinge />
      </M3Reveal>

      <div className={styles.lightTheme}>
        {/* 6. The 4 Pillars (Ivory Background) */}
        <M3Reveal>
          <Block05Pillars />
        </M3Reveal>

        {/* 7. The Editorial Stats Grid */}
        <StatsGrid />

        {/* 8. Process */}
        <Process />

        {/* 9. Voices */}
        <M3Reveal>
          <Voices />
        </M3Reveal>

        {/* 10. Where to find me */}
        <WhereToFindMe />

        {/* 11. Close */}
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
