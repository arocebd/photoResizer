import { useEffect } from 'react'

// AdSense Display Ad Component
export const AdSenseDisplay = ({ adSlot, adFormat = 'auto', fullWidthResponsive = true }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-1388226619737490"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    ></ins>
  )
}

// AdSense In-feed Ad Component
export const AdSenseInFeed = ({ adSlot, adLayoutKey }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="fluid"
      data-ad-layout-key={adLayoutKey}
      data-ad-client="ca-pub-1388226619737490"
      data-ad-slot={adSlot}
    ></ins>
  )
}

// AdSense In-article Ad Component
export const AdSenseInArticle = ({ adSlot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', textAlign: 'center' }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-1388226619737490"
      data-ad-slot={adSlot}
    ></ins>
  )
}

export default AdSenseDisplay
