'use client'

import { AnchorHTMLAttributes } from 'react'
import { recordInteraction } from '@/lib/behaviour'
import { site } from '@/content/site'

interface TrackingWhatsAppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> {
  trackingSource: string
  trackingPage: string
}

export function TrackingWhatsAppLink({
  trackingSource,
  trackingPage,
  onClick,
  ...props
}: TrackingWhatsAppLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    recordInteraction('whatsapp_cta_clicked', {
      source: trackingSource,
      page: trackingPage,
    })
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <a
      {...props}
      href={`https://wa.me/${site.whatsapp}?text=Hello,%20I%20have%20a%20query%20regarding%20tattoo`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    />
  )
}
