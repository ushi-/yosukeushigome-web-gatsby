const path = require('path')
const Remark = require(`remark`)
const select = require(`unist-util-select`)
const _ = require(`lodash`)
const isRelativeUrl = require(`is-relative-url`)
const fsExtra = require(`fs-extra`)

exports.onCreateNode = ({ store, node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  let slug, isProject
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)

    // adding path as the slug
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === ``) {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }
    createNodeField({ node, name: `slug`, value: slug })

    // adding the project flag
    isProject = parsedFilePath.dir.indexOf('projects') === 0
    createNodeField({ node, name: `isProject`, value: isProject })

    // adding the featured image url
    const remark = new Remark().data(`settings`, {
      commonmark: true,
      footnotes: true,
      pedantic: true,
    })
    const markdownAST = remark.parse(node.internal.content)
    const markdownImageNodes = select(markdownAST, `image`)
    if (markdownImageNodes.length >= 1) {
      let imageNode = markdownImageNodes[0]
      const files = _.values(store.getState().nodes).filter(
        n => n.internal.type === `File`
      )
      if (
        isRelativeUrl(imageNode.url) &&
        getNode(node.parent).internal.type === `File`
      ) {
        const linkPath = path.join(getNode(node.parent).dir, imageNode.url)
        const linkNode = _.find(files, file => {
          if (file && file.absolutePath) {
            return file.absolutePath === linkPath
          }
          return null
        })
        if (linkNode && linkNode.absolutePath) {
          const newPath = path.join(
            process.cwd(),
            `public`,
            `${linkNode.internal.contentDigest}.${linkNode.extension}`
          )
          const relativePath = path.join(
            `/${linkNode.internal.contentDigest}.${linkNode.extension}`
          )
          imageNode.url = `${relativePath}`
          if (!fsExtra.existsSync(newPath)) {
            fsExtra.copy(linkPath, newPath, err => {
              if (err) {
                console.error(`error copying file`, err)
              }
            })
          }
        }
      }
      createNodeField({ node, name: `featuredImageUrl`, value: imageNode.url })
    }
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const about = path.resolve("src/templates/about.js")
    const project = path.resolve("src/templates/project.js")
    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
        `
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                  isProject
                }
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        result.data.allMarkdownRemark.edges.forEach(edge => {
          const slug = edge.node.fields.slug
          createPage({
            path: slug, // required
            component: edge.node.fields.isProject ? project : about,
            context: {
              slug: slug,
            },
          })
        })

        return
      })
    )
  })
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case 'develop':
      config.loader('css', {
        include: /flexboxgrid/,
      });

      break;

    case 'build-css':
      config.loader('css', {
        include: /flexboxgrid/,
      });

      break;

    case 'build-html':
      config.loader('css', {
        include: /flexboxgrid/,
      });

      break;

    case 'build-javascript':
      config.loader('css', {
        include: /flexboxgrid/,
      });

      break;
  }

  return config;
};
