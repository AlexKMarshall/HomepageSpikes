import styled, { createGlobalStyle } from "styled-components";

export const GlobalScale = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: border-box;
  }

  :root {
    --ratio: 1.5;
  --s-5: calc(var(--s-4) / var(--ratio));
  --s-4: calc(var(--s-3) / var(--ratio));
  --s-3: calc(var(--s-2) / var(--ratio));
  --s-2: calc(var(--s-1) / var(--ratio));
  --s-1: calc(var(--s0) / var(--ratio));
  --s0: 1rem;
  --s1: calc(var(--s0) * var(--ratio));
  --s2: calc(var(--s1) * var(--ratio));
  --s3: calc(var(--s2) * var(--ratio));
  --s4: calc(var(--s3) * var(--ratio));
  --s5: calc(var(--s4) * var(--ratio));
  }
`;

const SCluster = styled.div`
  overflow: hidden;

  & > * {
    display: flex;
    flex-wrap: wrap;
    justify-content: ${(props) => props.justify};
    align-items: center;
    margin: calc(var(--${(props) => props.space}) / 2 * -1);
  }

  & > * > * {
    margin: calc(var(--${(props) => props.space}) / 2);
  }
`;

export function Cluster({ children, space = "s0", justify = "flex-start" }) {
  return (
    <SCluster space={space} justify={justify} className="cluster">
      <div className="cluster-inner-wrapper">{children}</div>
    </SCluster>
  );
}

const SBox = styled.div`
  --padding: 1rem;
  --border: 0;
  padding: var(--padding);
  border: var(--border) solid;
`;

export function Box({ children }) {
  return <SBox>{children}</SBox>;
}

const SStack = styled.div`
  --space: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > * + * {
    margin-top: var(--space);
  }

  &:only-child {
    height: 100%;
  }

  ${(props) =>
    props.splitAfter > 0 &&
    `& > :nth-child(${props.splitAfter}) {
    margin-bottom: auto;
  }`}
`;

export function Stack({ splitAfter, children }) {
  return <SStack>{children}</SStack>;
}

const SReel = styled.div`
  display: flex;
  height: auto;
  overflow-x: auto;
  overflow-y: hidden;
  margin: var(--s0);
  background: cornsilk;

  &::after {
    content: "";
    display: block;
    padding-right: var(--s0);
  }

  & > * {
    margin: var(--s0);
    margin-right: 0;
    flex: 0 0 auto;
  }
`;

export function Reel(props) {
  return <SReel {...props} />;
}
