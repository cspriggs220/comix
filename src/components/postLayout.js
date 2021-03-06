import React, { Component } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { motion } from "framer-motion"
import Layout from "./layout"
import "../css/gatsby-overrides.css"

export default class postLayout extends Component {
  render() {
    const { markdownRemark } = this.props.data
    const { location } = this.props

    return (
      <Layout location={location}>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <motion.div 
          initial={{ 
            opacity: 0.5 
          }}
          animate={{ 
            opacity: 1, 
            rotate: 360 
          }} 
          transition={{ 
            duration: 0.5 
          }}
        >
          <Img fluid={markdownRemark.frontmatter.featuredImage.childImageSharp.fluid} />
        </motion.div>
        <div
          dangerouslySetInnerHTML={{
            __html: markdownRemark.html,
          }}
        />
      </Layout>
    )
  }
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
