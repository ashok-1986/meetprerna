import type { Metadata } from 'next'
import { Header } from '@/components/header/Header'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How MeetPrerna handles your data. Fillout, Senja, Vercel Analytics, and on-site behaviour events.',
}

export default function Privacy() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className={styles.section} aria-labelledby="privacy-heading">
          <h1 id="privacy-heading" className={styles.sectionHeading}>
            Privacy
          </h1>
          <p className={styles.body}>
            This page describes what data this site collects, who processes it, and your rights.
            It is a factual disclosure, not legal advice. For legal questions, consult a qualified professional.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="controllers-heading">
          <h2 id="controllers-heading" className={styles.sectionHeading}>
            Data controllers
          </h2>
          <p className={styles.body}>
            Prerna (the artist) is the data controller for all personal data submitted through this site.
            Contact: <a href="mailto:prerna@meetprerna.com" className={styles.link}>prerna@meetprerna.com</a>.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="processors-heading">
          <h2 id="processors-heading" className={styles.sectionHeading}>
            Processors
          </h2>

          <h3 className={styles.subHeading}>Fillout (enquiry forms)</h3>
          <p className={styles.body}>
            The consultation form on <code>/consulting</code> is a Fillout embed.
            Fillout receives the fields you enter (name, contact, project type, brief, references, consent).
            Fillout&rsquo;s privacy policy: <a href="https://www.fillout.com/privacy" className={styles.link} target="_blank" rel="noopener noreferrer">fillout.com/privacy</a>.
            Fillout is a processor; we are the controller.
          </p>

          <h3 className={styles.subHeading}>Senja (testimonials)</h3>
          <p className={styles.body}>
            Testimonials displayed on the site are collected and hosted via Senja.
            Senja&rsquo;s privacy policy: <a href="https://senja.io/privacy" className={styles.link} target="_blank" rel="noopener noreferrer">senja.io/privacy</a>.
            Senja is a processor for testimonial content.
          </p>

          <h3 className={styles.subHeading}>Vercel Analytics</h3>
          <p className={styles.body}>
            We use <a href="https://vercel.com/analytics" className={styles.link} target="_blank" rel="noopener noreferrer">Vercel Analytics</a>.
            It is cookieless and does not collect personal data. It measures page views and referrers in aggregate.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="on-site-analytics-heading">
          <h2 id="on-site-analytics-heading" className={styles.sectionHeading}>
            On-site behaviour events (<code>/api/analytics</code>)
          </h2>
          <p className={styles.body}>
            This endpoint records interaction events only — things no third party can see:
            slider use, sketchbook opens, filter use, scroll depth, CTA taps.
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>What is recorded:</strong> event name (e.g., <code>slider_use</code>, <code>sketchbook_open</code>),
              page URL, timestamp, anonymous session ID.
            </li>
            <li className={styles.listItem}>
              <strong>What is NOT recorded:</strong> no PII, no IP addresses, no user identifiers, no form contents.
            </li>
            <li className={styles.listItem}>
              <strong>Do Not Track:</strong> If <code>navigator.doNotTrack === &apos;1&apos;</code>, the client does not send events.
            </li>
            <li className={styles.listItem}>
              <strong>Retention:</strong> raw events are retained for 90 days, then aggregated and deleted.
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="dpdp-heading">
          <h2 id="dpdp-heading" className={styles.sectionHeading}>
            India DPDP Act — your rights
          </h2>
          <p className={styles.body}>
            If you are in India, the Digital Personal Data Protection Act, 2023 gives you the right to:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Access the personal data we hold about you</li>
            <li className={styles.listItem}>Correct inaccurate data</li>
            <li className={styles.listItem}>Request deletion of your data</li>
            <li className={styles.listItem}>Withdraw consent for processing</li>
            <li className={styles.listItem}>Nominate a grievance officer</li>
          </ul>
          <p className={styles.body}>
            To exercise these rights, email <a href="mailto:prerna@meetprerna.com" className={styles.link}>prerna@meetprerna.com</a>
            with the subject &ldquo;DPDP Request&rdquo;. We will respond within the statutory timeframe.
          </p>
          <p className={styles.body}>
            Grievance officer: TODO(owner): confirm officer and contact address.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="retention-heading">
          <h2 id="retention-heading" className={styles.sectionHeading}>
            Data retention
          </h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>Enquiry submissions (Fillout): retained until you request deletion, or 2 years after last contact.</li>
            <li className={styles.listItem}>Testimonials (Senja): retained until you request removal.</li>
            <li className={styles.listItem}>Analytics events: 90 days raw, then aggregated.</li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="cookies-heading">
          <h2 id="cookies-heading" className={styles.sectionHeading}>
            Cookies
          </h2>
          <p className={styles.body}>
            This site sets no marketing cookies. Vercel Analytics and Fillout may set essential session cookies
            for their own operation. You can block all cookies in your browser without losing site functionality.
          </p>
        </section>
      </main>
    </>
  )
}