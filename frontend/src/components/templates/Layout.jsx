import styled from '@emotion/styled'


const Layout = ({ children }) => {
  return <Main>{children}</Main>
}

const Main = styled.main`
  display: flex;
`

export default Layout