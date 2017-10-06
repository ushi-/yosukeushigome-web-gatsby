import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'

import Header from '../components/Header'
import MainColumn from '../components/MainColumn'

class NotFound extends React.Component { // eslint-disable-line
  render() {
    const { headerTitle } = // eslint-disable-line
        this.props.data.site.siteMetadata // eslint-disable-line
    return (
      <div>
        <Header
          title="404 Not Found"
          subtitle="The page you entered the URL for is not found."
          link={<Link to={'/'}>Go back home</Link>}
        />
        <section
          className={classnames(
            'section',
            'content',
          )}
        >
          <MainColumn>
            <h1 className="title is-2">Here is the list of all pages on this website.</h1>
            <ul>
              {this.props.data.allMarkdownRemark.edges.map((project, i) => (
                <li><Link to={project.node.fields.slug}>
                  {project.node.fields.isProject ? (
                    <span>Project: </span>
                  ) : null}{project.node.frontmatter.title}
                </Link></li>
              ))}
            </ul>
            <span>
              If you're looking for an old blog article of mine, you may be able to find it on <a href="https://medium.com/@yosukeushigome" target="_blank">Medium</a>.
            </span>
          </MainColumn>
        </section>
      </div>
    )
  }
}

export default NotFound

export const siteDataQuery = graphql`
  query siteData {
    site {
      siteMetadata {
        headerTitle
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [id], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            isProject
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
