import React from 'react'

import MainColumn from './mainColumn'

class Footer extends React.Component {
  render() {
    const date = new Date()
    const year = date.getFullYear()
    return (
      <section className="section footer">
        <MainColumn>
          <div className="has-text-centered">
            <p>
              <span className="icon is-small"><i className="fa fa-copyright" aria-hidden="true"></i></span> {year} Yosuke Ushigome
            </p>
            <p>
              The source code of this website is licensed <a href="http://opensource.org/licenses/mit-license.php" target="blank">MIT</a> and is accessible on <a href="https://github.com/ushi-/yosukeushigome-web-gatsby" target="blank">Github</a>.
            </p>
          </div>
        </MainColumn>
      </section>
    )
  }

}

export default Footer
