import { HeaderClient } from './Header.client'
import { SkipLink } from './SkipLink'
import { site } from '@/content/site'

export function Header() {
  return (
    <>
      <SkipLink />
      <HeaderClient cityLine={site.cityLine} />
    </>
  )
}
