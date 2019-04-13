import React from 'react'

// Components
import { Header, Footer } from 'components/common'

function PageContainer(props) {
  return (
    <div className="page-container">
      <Header />

      <main>
        { props.children }
      </main>

      <Footer />
    </div>
  )
}

export default PageContainer