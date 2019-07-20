import React from 'react'
import GatsbyImage from 'gatsby-image'
import NoImage from '../../images/noImage.svg'
import { cn } from '../../lib/helpers'
import styles from './image.module.css'

export default function Image (props) {
  const { fluid, alt, hasBorder } = props
  return fluid ? <GatsbyImage fluid={fluid} alt={alt} className={hasBorder ? cn(styles.border, styles.image) : styles.image} /> : <NoImage />
}
