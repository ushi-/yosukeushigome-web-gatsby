const path = require('path')
const Remark = require(`remark`)
const select = require(`unist-util-select`)
const _ = require(`lodash`)
const isRelativeUrl = require(`is-relative-url`)
const fsExtra = require(`fs-extra`)
const slugify = require('slug')
const { responsiveSizes } = require(`gatsby-plugin-sharp`)

exports.onCreateNode = ({ store, node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  let slug, isProject
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    // wrapSingleByteTexts
    node.internal.content = node.internal.content.replace(
      /<div[^>]*class="(.*?ja.*?)"[^>]*>[\s\S]*<\/div>/gm,
      function replace(tag) {
        return tag.replace(
          />[\s\S]?[^><]+[\s\S]?</igm,
          function replace(content) {
            return content.replace(
              /[\da-z\.\-\!"#\$%&'\(\)=\^~\|@`\[\{\]\}\*\:\+;\?\/\,_\\\s]+/igm,
              function replace(singleBytePhraseWithSpace) {
                return singleBytePhraseWithSpace.replace(
                  /^[\da-z\.\-\!"#\$%&'\(\)=\^~\|@`\[\{\]\}\*\:\+;\?\/\,_\\].*/igm,
                  function replace(singleBytePhrase) {
                    return '<span class="single-byte">' + singleBytePhrase + '</span>'
                  }
                )
              }
            )
          }
        )
      }
    )

    const parsedFilePath = path.parse(fileNode.relativePath)

    // adding the project flag
    isProject = parsedFilePath.dir.indexOf('projects') === 0
    createNodeField({ node, name: `isProject`, value: isProject })

    // adding path as the slug
    if (isProject) {
      slug = `/projects/${slugify(node.frontmatter.title, {lower: true, })}`
    } else {
      if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
        slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
      } else if (parsedFilePath.dir === ``) {
        slug = `/${parsedFilePath.name}/`
      } else {
        slug = `/${parsedFilePath.dir}/`
      }
    }
    console.log(slug);
    createNodeField({ node, name: `slug`, value: slug })

    if (isProject) {
      // adding the hero image url
      let heroImage = node.frontmatter.heroImage
      if (
        isRelativeUrl(heroImage) &&
        getNode(node.parent).internal.type === `File`
      ) {
        const imagePath = path.join(
          getNode(node.parent).dir,
          heroImage
        )
        const files = _.values(store.getState().nodes).filter(
          n => n.internal.type === `File`
        )
        const imageNode = _.find(files, file => {
          if (file && file.absolutePath) {
            return file.absolutePath === imagePath
          }
          return null
        })
        if (imageNode && imageNode.absolutePath) {
          let options = {
            maxWidth: 1600,
            quality: 90,
          }
          responsiveSizes({
            file: imageNode,
            args: options,
          }).then( (responsiveSizesResult) => {
            createNodeField({
              node,
              name: `heroImageBase64`,
              value: responsiveSizesResult.base64
            })
            createNodeField({
              node,
              name: `heroImageAspectRatio`,
              value: responsiveSizesResult.aspectRatio
            })
            createNodeField({
              node,
              name: `heroImageSrc`,
              value: responsiveSizesResult.src
            })
            createNodeField({
              node,
              name: `heroImageSrcSet`,
              value: responsiveSizesResult.srcSet
            })
            createNodeField({
              node,
              name: `heroImageSizes`,
              value: responsiveSizesResult.sizes
            })
            createNodeField({
              node,
              name: `heroImageOriginalImg`,
              value: responsiveSizesResult.originalImg
            })
            createNodeField({
              node,
              name: `heroImageOriginalName`,
              value: responsiveSizesResult.originalName
            })
          })
        }
      }
    }
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const about = path.resolve("src/templates/about.jsx")
    const project = path.resolve("src/templates/project.jsx")
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
              slug,
            },
          })
        })
        return
      })
    )
  })
}
