import React from 'react'

// Components
import { PageContainer } from 'components/common'
import { Auth } from 'components/auth'

function Authpage(props) {
  const { match } = props

  return (
    <PageContainer>
      <Auth mode={match.params.mode} />
    </PageContainer>
  )
}

export default Authpage