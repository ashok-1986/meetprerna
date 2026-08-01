import styles from './marquee.module.css'

const ITEM = "Mumbai · Navi Mumbai · Travelling Artist";

function Track({ hidden }: { hidden: boolean }) {
  return (
    <div className={styles.marqueeTrack} aria-hidden={hidden || undefined}>
      <div className={styles.marqueeItem}>
        <span>{ITEM}</span>
        <span className={styles.separator}>·</span>
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section className={styles.marqueeSection} aria-label="Locations">
      {/* Exactly two tracks for a seamless CSS loop: one visible and
          readable to assistive tech, one aria-hidden duplicate that
          the marquee animation scrolls into view next. */}
      <Track hidden={false} />
      <Track hidden={true} />
    </section>
  )
}
