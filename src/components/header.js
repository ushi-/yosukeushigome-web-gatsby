import React from 'react'

import MainColumn from './mainColumn'

class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <MainColumn>
          <div>
            <h1 className="title is-1">I’m Yosuke Ushigome, a creative technologist based in London.</h1>
          </div>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <h2 className="title is-2">I demystify emerging technology through prototyping.</h2>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item has-text-right"  style={{marginLeft: '2rem'}}>
                <h2 className="title is-2">More about me</h2>
              </div>
            </div>
          </div>
        </MainColumn>
      </header>
    )
  }

}

export default Header
