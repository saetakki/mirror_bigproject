import styled from '@emotion/styled';
import { Header, SideNav } from '@organisms';import { Container } from "@styles"

const Layout = ({ children }) => {
  return (
    <Main>
      <Header />
      <BodyContainer>
        <SideNavContainer>
          <SideNav />
        </SideNavContainer>
        <ContentContainer>
          {children}
        </ContentContainer>
      </BodyContainer>
    </Main>
  );
};

const Main = styled.main`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  background-color: #f1f1f1;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1980px;
  height: 100vh;
  overflow: hidden;
`;

const BodyContainer = styled(Container)`
  padding-right: 0;
  display: flex;
  height: 100%;
`;

const SideNavContainer = styled.div`
  flex: 0 0 auto;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow: auto;
  margin-bottom: 90px;
`;

export default Layout;
