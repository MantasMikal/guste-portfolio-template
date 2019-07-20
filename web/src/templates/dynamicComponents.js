import React from 'react'
import Grid from '../components/grid/grid'
import Video from '../components/video/video'
import UrlVideo from '../components/video/urlVideo'
import BlockContent from '../components/block-content'
import Img from '../components/image/zoomableImage'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'
const cfg = { projectId: 'ee0lu4ue', dataset: 'production' }

export function makeMediaComponent (component) {
  const hasBorder = component.hasBorder ? component.hasBorder : false
  switch (component._type) {
  case 'figure':
    if (!component || !component.asset || !component.asset.mimeType) {
      console.log('Could not create figure component, because asset is invalid: ', component)
      break
    }

    const image = component.asset
    const imageAlt = component.alt ? component.alt : ' '
    // Determine if it is a gif and render aproprietly

    if (image.mimeType === 'image/gif') {
      return (
        <img src={image.url} alt={imageAlt} style={{ width: '100%' }} key={component.asset.id} />
      )
    } else {
      const fluidProps = image.fluid
        ? image.fluid
        : getFluidGatsbyImage(image._id, { maxWidth: 1920 }, cfg)
      const isZoomable = component.isZoomable
      return (
        <Img fluid={fluidProps} alt={imageAlt} key={component.asset.id} isZoomable={isZoomable} hasBorder={hasBorder} />
      )
    }

  case 'video':
    if (!component && !component.url) {
      console.error('Could not create video component, because url is undefined', component)
      break
    }

    return <UrlVideo url={component.url} alt={component.alt} key={component._key} hasBorder={hasBorder} />

  case 'contentBlock':
    // const maxWidth = component.maxWidth ? component.maxWidth : 100
    // style={{ maxWidth: `${maxWidth}%` }}
    return (
      <div key={component._key}>
        <BlockContent blocks={component.contentBlock} />
      </div>
    )

  default:
    console.log(component._type, ' does not exist!')
    return <div>Missing component</div>
  }
}

export function makeGrid (component) {
  const gridMedia = component.gridMedia
  const colCount = component.colCount
  const colTemplate = component.colTemplate
  const rowGap = component.rowGap
  const colGap = component.colGap
  // Build content
  const gridComponents = gridMedia.map(item => {
    return makeMediaComponent(item)
  })
  return (
    <Grid colCount={colCount} key={component._key} colTemplate={colTemplate} rowGap={rowGap} colGap={colGap}>
      {gridComponents}
    </Grid>
  )
}

export function makeComponents (components) {
  if (!components) {
    return <> </>
  }
  return components.map(component => {
    switch (component._type) {
    case 'grid':
      return makeGrid(component)
    case 'figure':
      return makeMediaComponent(component)
    case 'video':
      return makeMediaComponent(component)
    default:
      console.log(component._type, ' does not exist!')
      return <div>Missing component</div>
    }
  })
}
