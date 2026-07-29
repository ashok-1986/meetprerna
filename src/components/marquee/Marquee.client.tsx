import styles from './marquee.module.css'

const ITEM = "Mumbai · Navi Mumbai · Travelling Artist";
// Repeating it enough times so one track is wider than the widest normal viewport
const ITEMS_PER_TRACK = 6; 
const trackItems = Array(ITEMS_PER_TRACK).fill(ITEM);

export function Marquee() {
  const renderTrack = () => (
    <div className={styles.marqueeTrack} aria-hidden={true}>
      {trackItems.map((text, i) => (
        <div key={i} className={styles.marqueeItem}>
          <span>{text}</span>
          <span className={styles.separator}>·</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className={styles.marqueeSection} aria-label="Locations">
      <div className="sr-only">Mumbai, Navi Mumbai, Travelling Artist</div>
      {renderTrack()}
      {renderTrack()}
    </section>
  )
}
