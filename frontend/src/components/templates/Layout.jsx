import styled from '@emotion/styled'
import Header from './Header'

const Layout = ({ children }) => {
  return <Main>
    <Header/>
    {children}
    </Main>
}

const Main = styled.main`
  display: flex;
`

export default Layout