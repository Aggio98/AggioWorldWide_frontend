import styled from "styled-components";

export const Button = styled.button`
  background: ${(props) => (props.primary ? "black" : "white")};
  color: ${(props) => (props.primary ? "white" : "black")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #b22727;
  border-radius: 3px;

  &:hover {
    border: 2px solid #;
  }
`;
