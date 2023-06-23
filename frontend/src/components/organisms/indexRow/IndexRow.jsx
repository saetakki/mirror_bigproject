import styled from "@emotion/styled";
import { Column } from "../../atoms";
import { CiStar } from 'react-icons/ci'
import { getHistoryItem } from "../../../apis";


const IndexRow = ({ id, date, persona, isBooked, isMobile }) => {

  const onClickHandler = (e) => {
    e.preventDefault();
    getHistoryItem(`${id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return(
    <ColumnContainer onClick={onClickHandler}>
      {isMobile 
      ? null
      : <Column width="120px" height="50px">{id}</Column> 
      }
      {isBooked 
      ? ( <BookMarked width="24px" height="24px"><CiStar/></BookMarked>) 
      : null
      }
      <Column width="240px" height="50px">{date}</Column>
      <Column flex="1" height="50px">PERSONA</Column>
    </ColumnContainer>
  )
}


const ColumnContainer = styled.div`
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: row;
`

const BookMarked = styled.div`
  position:absolute;
  height: 24px;
  width: 24px;
  top: 8px;
  left: 8px;

  display:flex;
  justify-content: center;
  align-items: center;
`




export default IndexRow;