import React from 'react'
import ImageWithModal from './image/imageWithModal'
import CategoryButton from './button/category-button'
import styles from './art-preview-grid.module.css'

// Filters art gallery items by category and returns
// Array of artwork nodes
const filterArt = (tag, list) => {
  // Return if no tag selected
  if (!tag) {
    return list
  }

  return list.filter(item => {
    let categoryList = item.artworkCategory

    for (item in categoryList) {
      const title = categoryList[item].title

      if (title === tag) {
        return title
      }
    }
  })
}

// Takes in artwork nodes and returns list of components
const generate = list => {
  return list.map(item => {
    return <ImageWithModal key={item.id} fluid={item.artwork.asset.fluid} alt={item.artwork.alt} />
  })
}

export default class ArtPrieviewGrid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      galleryItems: [],
      activeButton: null
    }
  }

  componentWillMount() {
    this.setState({
      galleryItems: filterArt(this.state.activeButton, this.props.media)
    })
  }

  // Filters gallery on click
  handleClick = e => {
    e.preventDefault()
    const category = e.target.getAttribute('cattitle')
    this.setState({
      activeButton: category,
      galleryItems: filterArt(category, this.props.media)
    })
  }

  render() {
    const { categories } = this.props
    let art = generate(this.state.galleryItems)
    return (
      <>
        <div className={styles.categoryWrapper}>
          {categories.map(item => {
            // Check if button is active to change its color
            const isActive = this.state.activeButton === item.title ? true : false
            return (
              <CategoryButton
                isActive={isActive}
                cattitle={item.title}
                key={item.id}
                onClick={this.handleClick}
              >
                {item.title}
              </CategoryButton>
            )
          })}
        </div>
        <div className={styles.grid}>{art}</div>
      </>
    )
  }
}
