import styled from '@emotion/styled';
import { Container } from '@styles';
import { IndexItem, PageHeader } from '@organisms';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPages } from '@apis/HistoryApi';
import { useMediaQuery } from 'react-responsive';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';

import ReactDOMServer from 'react-dom/server';

const History = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [history, setHistory] = useState([]);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const navigate = useNavigate();

  useEffect(() => {
    requestPages(true, pageNum)
      .then((res) => {
        setHistory(res.results);
      })
      .catch((err) => console.log(err));
    setIsLoad(true);
  }, [pageNum]);

  const navigateHandler = (e) => {
    navigate(`${e}`);
  };
  const [content, setContent] = useState(null);
  const onClickHandler = (item) => {
    const labels = ['이름', '나이', '성별', '직책', '부서', '상태'];
    setContent(
      <>
        <GridPersonaTitle>
          No.{ReactDOMServer.renderToStaticMarkup(item.id)}
        </GridPersonaTitle>
        <GridPersonaFont>QUICK VIEW</GridPersonaFont>
        <br />
        <GridPersonaTitle>PERSONA</GridPersonaTitle>
        {Object.values(item.persona).map((value, idx) => (
          <>
            <GridPersonaFont key={idx}>
              {labels[idx]}: {value}
            </GridPersonaFont>
          </>
        ))}
        <br />
        <GridPersonaTitle>SUMMARY</GridPersonaTitle>
        <GridPersonaFont>
          {item.report['what went well'] && Object.values(item.report['what went well'])}
        </GridPersonaFont>
        <br />
        <hr />
        <br />
      </>
    );
  };

  return isLoad ? (
    <Container>
      <GridContainer>
        {!isMobile ? (
          <GridPageHeaderWrap>
            <PageHeader page='HISTORY' />
          </GridPageHeaderWrap>
        ) : (
          <MGridPageHeaderWrap>
            <PageHeader page='HISTORY' />
          </MGridPageHeaderWrap>
        )}
        {!isMobile ? (
          <GridQuickView>
            {content}
            <GridQuickViewTitle>
              Chatgpt와 함께하는 리더 코칭 훈련
            </GridQuickViewTitle>
            <ul>
              <GridQuickViewLi> - 코칭 사전 훈련</GridQuickViewLi>
              <GridQuickViewLi> - 코칭 숙련 대상 확보</GridQuickViewLi>
              <GridQuickViewLi> - 리더들의 코칭역량 향상</GridQuickViewLi>
            </ul>
            <br />
            <GridQuickViewTitle>
              지금까지 진행한 코칭 연습기록을 다시 확인해보세요!
            </GridQuickViewTitle>
          </GridQuickView>
        ) : null}
        {!isMobile ? (
          <GridHistoryList>
            <IndexItem isHeader={true} />
            {history.map((item) => (
              <BtnLayer
                className='btn'
                key={item.id}
                onClick={() => navigateHandler(item.id)}
                onMouseOver={() => onClickHandler(item)}
              >
                <IndexItem
                  id={item.id}
                  date={item.date}
                  persona={Object.values(item.persona)}
                  isBooked={item.bookmark}
                  isMobile={isMobile}
                />
              </BtnLayer>
            ))}
          </GridHistoryList>
        ) : (
          <MGridHistoryList>
            <IndexItem isHeader={true} />
            {history.map((item) => (
              <BtnLayer
                key={item.id}
                onClick={() => navigateHandler(item.id)}
                onMouseOver={() => onClickHandler(item.id, item)}
              >
                <IndexItem
                  id={item.id}
                  date={item.date}
                  persona={Object.values(item.persona)}
                  isBooked={item.bookmark}
                  isMobile={isMobile}
                />
              </BtnLayer>
            ))}
          </MGridHistoryList>
        )}
        {!isMobile ? (
          <GridPaginationWrap>
            <Pagination>
              <Page>
                <PageButton
                  onClick={() => setPageNum(pageNum - 1)}
                  disabled={pageNum === 1}
                >
                  <CiCircleChevLeft />
                </PageButton>
                <span>{pageNum} / inf</span>
                <PageButton
                  onClick={() => setPageNum(pageNum + 1)}
                  disabled={pageNum === 5}
                >
                  <CiCircleChevRight />
                </PageButton>
              </Page>
            </Pagination>
          </GridPaginationWrap>
        ) : (
          <MGridPaginationWrap>
            <Pagination>
              <Page>
                <PageButton
                  onClick={() => setPageNum(pageNum - 1)}
                  disabled={pageNum === 1}
                >
                  <CiCircleChevLeft />
                </PageButton>
                <span>{pageNum} / inf</span>
                <PageButton
                  onClick={() => setPageNum(pageNum + 1)}
                  disabled={pageNum === 5}
                >
                  <CiCircleChevRight />
                </PageButton>
              </Page>
            </Pagination>
          </MGridPaginationWrap>
        )}
      </GridContainer>
    </Container>
  ) : (
    <div>loading...</div>
  );
};

export default History;

const GridQuickViewTitle = styled.strong``;

const GridQuickViewLi = styled.li`
  font-size: 14px;
`;

const GridPersonaTitle = styled.strong`
  font-weight: bold;
`;
const GridPersonaFont = styled.p`
  font-size: 12px;
`;

const GridQuickView = styled.div`
  min-width: 300px;
  max-width: 300px;
  height: calc(100vh - 131px);
  padding: 20px;
  position: fixed;
  left: 128px;
  top: 116px;
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media (max-width: 1630px) {
    left: 128px;
    min-width: 200px;
    max-width: 200px;
  }
  @media (max-width: 1163px) {
    left: 128px;
    min-width: 120px;
    max-width: 120px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  padding: 20px 10px;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(7, 1fr);
  grid-gap: 24px;
`;

const GridPageHeaderWrap = styled.div`
  padding: 20px;
  grid-column: 4 / 16;
  grid-row: 1;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const MGridPageHeaderWrap = styled.div`
  padding: 20px;
  grid-column: 1 / 16;
  grid-row: 1;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const GridHistoryList = styled.div`
  padding: 20px 20px;
  grid-column: 4 / 16;
  grid-row: 2 / 7;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const MGridHistoryList = styled.div`
  padding: 20px 20px;
  grid-column: 1 / 16;
  grid-row: 2 / 8;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const GridPaginationWrap = styled.div`
  grid-column: 4 / 16;
  grid-row: 7;
`;
const MGridPaginationWrap = styled.div`
  grid-column: 1 / 16;
  grid-row: 8;
`;

const BtnLayer = styled.div`
  width: 100%;
  &:hover {
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
    border-radius: 10px;
  }
`;

const Pagination = styled(Container)`
  height: 80px;
  display: flex;
  justify-content: center;
`;

const Page = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background-color: #f5f5f5;
  opacity: 1;
  margin: 0 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    background-color: #d9d9d9;
  }
`;
