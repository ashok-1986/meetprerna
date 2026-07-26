import type { Metadata } from 'next'
import Image from 'next/image'
import { M3Reveal } from '@/components/sanctuary/M3Reveal'
import prernaHero from '@/../public/images/about/prerna-hero.jpg'
import prernaWithWork from '@/../public/images/about/prerna-with-work.jpg'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About Prerna — Tattoo Artist, Painter, Sketch Artist',
  description:
    'Painter and sketch artist first, tattoo artist second. Working from Kharghar, Navi Mumbai, and travelling on request.',
}

export default function About() {
  return (
    <main id="main-content">
      <M3Reveal className={styles.section}>
        <section aria-labelledby="about-hero-heading">
          <div className={styles.imageWrap}>
            <Image
              src={prernaHero}
              alt="Prerna in a leather jacket, arm raised"
              className={styles.image}
              sizes="(max-width: 800px) 100vw, 800px"
              placeholder="blur"
            />
          </div>
          <div className={styles.hero}>
            <h1 id="about-hero-heading" className={styles.heroH1}>
              I started with a brush.
            </h1>
            <p className={styles.heroSub}>
              Painter and sketch artist first. The needle came later, and it did not replace anything.
            </p>
          </div>
        </section>
      </M3Reveal>

      <M3Reveal className={`${styles.section} ${styles.twoAnchorSection}`} aria-labelledby="how-started-heading">
        <div className={styles.twoAnchorLeft}>
          <h2 id="how-started-heading" className={styles.sectionHeading}>
            How this started
          </h2>
        </div>
        <div className={styles.twoAnchorRight}>
          <p className={styles.bodyText}>
            I started on someone else&rsquo;s studio floor in 2021. Five years later the work is under my own name.
          </p>
          <p className={styles.bodyText}>
            I painted long before I tattooed. Abstract work, mostly on paper, mostly for myself.
          </p>
          <p className={styles.bodyText}>
            At some point a canvas on a wall stopped being enough. People do not want to look at their life transitions from across a room. They want to carry them. Grief, a decision, something that finally went right. Those things want a place to live, and skin turned out to be the place.
          </p>
          <p className={styles.bodyText}>
            So I brought the brush with me. The way I think about weight, and where a line thickens or thins, comes from painting, not from a tattoo apprenticeship. That is why my work looks the way it does.
          </p>
        </div>
      </M3Reveal>

      <M3Reveal className={`${styles.section} ${styles.twoAnchorSection}`} aria-labelledby="training-heading">
        <div className={styles.twoAnchorLeft}>
          <h2 id="training-heading" className={styles.sectionHeading}>
            Training and timeline
          </h2>
        </div>
        <div className={styles.twoAnchorRight}>
          <div className={styles.trainingLayout}>
            <div className={styles.trainingText}>
              <p className={styles.bodyText}>
                I studied fine art at JK Academy of Art and Design in Wadala, and finished the diploma before I ever picked up a machine. The painting came first. The tattooing came out of it, not instead of it.
              </p>
              <p className={styles.bodyText}>
                I have been tattooing since 2021. Most of that has been with Witch Art Tattoos in Mumbai, where I still work.
              </p>
            </div>
            <div className={styles.trainingImageWrap}>
              <Image
                src={prernaWithWork}
                alt="Prerna sitting next to one of her paintings"
                className={styles.trainingImage}
                sizes="(max-width: 768px) 100vw, 400px"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </M3Reveal>

      <M3Reveal className={`${styles.section} ${styles.twoAnchorSection}`} aria-labelledby="why-works-heading">
        <div className={styles.twoAnchorLeft}>
          <h2 id="why-works-heading" className={styles.sectionHeading}>
            Why it works this way
          </h2>
        </div>
        <div className={styles.twoAnchorRight}>
          <p className={styles.bodyText}>
            Most tattoo studios are not built for people who are unsure. They are fast, loud, and they assume you arrive knowing the vocabulary. If you hesitate at the door, that room does not help you.
          </p>
          <p className={styles.bodyText}>
            I wanted the opposite of that room.
          </p>
          <p className={styles.bodyText}>
            No rushed stencils. No brushed-off questions. You can arrive with a mess of feelings and no words for them, and that is a normal place to start, not a problem to fix before you book.
          </p>
          <p className={styles.bodyText}>
            I am not a therapist and I do not pretend to be one. What I can do is hold the room, keep it quiet, and pay attention. Most things come out easier when your hands are busy and nobody is watching your face.
          </p>
        </div>
      </M3Reveal>

      <M3Reveal className={`${styles.section} ${styles.twoAnchorSection}`} aria-labelledby="find-me-heading">
        <div className={styles.twoAnchorLeft}>
          <h2 id="find-me-heading" className={styles.sectionHeading}>
            Where to find me
          </h2>
        </div>
        <div className={styles.twoAnchorRight}>
          <p className={styles.bodyText}>
            My primary location is Kharghar, in Navi Mumbai. Most sessions happen there.
          </p>
          <p className={styles.bodyText}>
            I also work from studios elsewhere in Mumbai when there is demand, at places I have collaborated with before.
          </p>
          <p className={styles.bodyText}>
            I have been tattooing since 2021. The brush is older.
          </p>
        </div>
      </M3Reveal>

      <M3Reveal className={`${styles.section} ${styles.twoAnchorSection}`} aria-labelledby="travel-heading">
        <div className={styles.twoAnchorLeft}>
          <h2 id="travel-heading" className={styles.sectionHeading}>
            Travel
          </h2>
        </div>
        <div className={styles.twoAnchorRight}>
          <p className={styles.bodyText}>
            I travel on request, not on a schedule.
          </p>
          <p className={styles.bodyText}>
            If you are outside Mumbai and you want a piece, send me the details through the enquiry form and I will tell you honestly whether I can make it work.
          </p>
        </div>
      </M3Reveal>

      <M3Reveal className={styles.section} aria-labelledby="the-name-heading">
        <section>
          <p className={styles.nameLine}>
            Some earlier clients knew me as Alza. That was an old nickname. The work is under Prerna now.
          </p>
        </section>
      </M3Reveal>

      <M3Reveal>
        <section className={styles.ctaSection} aria-labelledby="about-cta-heading">
          <p id="about-cta-heading" className={styles.ctaText}>
            If any of this sounds like the room you want to be in, start a conversation.
          </p>
          <a href="/consulting" className={styles.ctaPrimary}>
            Start a conversation
          </a>
        </section>
      </M3Reveal>
    </main>
  )
}
