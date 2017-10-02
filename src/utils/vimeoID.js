
const vimeoGetID = (url) => {
  var vimeo_Reg = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
  var match = url.match(vimeo_Reg);

  if (match){
    return match[3]
	}
}

export default vimeoGetID
