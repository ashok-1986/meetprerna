import { HeaderClient } from './Header.client'
import { SkipLink } from './SkipLink'

export function Header() {
  return (
    <>
      <SkipLink />
      <HeaderClient />
    </>
  )
}
