import styles from './header.module.css'

interface CityLineProps {
  cityLine: string | null
}

export function CityLine({ cityLine }: CityLineProps) {
  if (!cityLine) return null

  return (
    <span className={styles.cityLine} aria-label="Current location">
      {cityLine}
    </span>
  )
}
