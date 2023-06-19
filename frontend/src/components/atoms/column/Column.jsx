import styled from "@emotion/styled";

export const Column = styled.div`
  display: flex;
  height: ${props => props.height};
  width: ${props => props.width};
  flex: ${props => props.flex};
  background-color : ${props => props.color};
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;