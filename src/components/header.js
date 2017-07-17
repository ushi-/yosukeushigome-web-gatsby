import React from 'react'

import MainColumn from './mainColumn'

class Header extends React.Component {

  render() {
    return (
      <div>
        <MainColumn>
          <div>
            <h1 className="title is-1">I’m Yosuke Ushigome, a creative technologist based in London.</h1>
            <h2 className="title is-2">I demystify emerging technology through prototyping.</h2>
          </div>
        </MainColumn>
      </div>
    )
  }

}

export default Header
