import React from "react"
import { Grid, Row, Col } from 'react-flexbox-grid';

class AboutTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    var wrapTag = '<span class="hankaku">';
  	var wrapTag_end = '</span>';
  	var isTag = false;
  	var isHan = false;

  	var re = new RegExp(/[\da-z\ \.\-\!"#\$%&'\(\)=\^~\|@`\[\{\]\}\*\:\+;\?\/\,_\\]/i);
  	var html = post.html;
  	html = html.replace(/\s+>/g, '>');

  	var i;
  	for(i=0; i<html.length; i++){
  		if (isTag===false){
  			if (html[i]=='<'){

  				isTag = true;

  				if (isHan===true){
  					html = html.substr(0,i)+wrapTag_end+html.substr(i);
  					i += wrapTag_end.length;
  					isHan = false;
  					continue;
  				}

  			}
  		} else {
  			if (html[i]=='>'){
  				isTag = false;
  			}
  		}

  		if (isTag===false){
  			if (html[i].match(re)){
  				if (isHan===false){
  					html = html.substr(0,i)+wrapTag+html.substr(i);
  					i += wrapTag.length;
  				}
  				isHan = true;
  			} else {
  				if (isHan===true){
  					html = html.substr(0,i)+wrapTag_end+html.substr(i);
  					i += wrapTag_end.length;
  				}
  				isHan = false;
  			}
  		}

  	}
    return (
      <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
    )
  }
}

export default AboutTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
      }
    }
  }
`
