import styled from "styled-components";

const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--s-1) var(--s0);
  font-size: 1em;
  font-weight: 400;
  font-family: inherit;
  border-radius: 3px;
  border: 1px solid gray;
  ${(props) =>
    props.color === "primary" &&
    `background-color: darkblue;
  color: white;
  `}
`;

//   background-color: hsl(0, 0.5, 0.5);

export function Button({ ...props }) {
  return <SButton {...props} />;
}

const SIconButton = styled(SButton)`
  font-size: var(--s1);
  background: none;
  border-radius: 50%;
  border: none;
  padding: var(--s-3);

  &:active,
  :focus {
    border: none;
    outline: none;
  }
`;

export function IconButton(props) {
  return <SIconButton {...props} />;
}
