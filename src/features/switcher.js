import { useCallback, useMemo, useRef, useState } from "react";
import useResizeObserver from "use-resize-observer";
import styled from "styled-components";

const SSwitcher = styled.div`
  border: 1px solid lightgrey;

  & > * {
    --s1: 1rem;
    --measure: 60ch;
    display: flex;
    flex-wrap: wrap;
    margin: calc((var(--s1) / 2) * -1);
  }

  & > * > * {
    flex-grow: 1;
    flex-basis: calc((var(--measure) - (100% - var(--s1))) * 999);
    margin: calc(var(--s1) / 2);
  }

  & > * > :nth-last-child(n + 4),
  & > * > :nth-last-child(n + 4) ~ * {
    flex-basis: 100%;
  }
`;

const SWrapper = styled.div`
  padding: 1rem;
`;

const SCard = styled.div`
  border: 1px solid lightgrey;
  padding: 1rem;
`;

const content = [1, 2, 3].map((id) => ({ id, content: getContent() }));

export default function Switcher() {
  const [dragDirection, setDragDirection] = useState("horizontal");
  const flexRef = useRef();

  const handleResize = useMemo(() => {
    function detectLayout() {
      if (!flexRef.current) return;

      const children = Array.from(flexRef.current.children);
      const childrenTops = children.map(
        (child) => child.getBoundingClientRect().top
      );

      const direction = childrenTops.every((top) => top === childrenTops[0])
        ? "horizontal"
        : "vertical";

      setDragDirection(direction);
    }

    return throttle(detectLayout, 500);
  }, []);

  useResizeObserver({ ref: flexRef, onResize: throttle(handleResize, 500) });

  return (
    <div>
      <h2>The Switcher, or Holy Albatross</h2>
      <p>Switch from horizontal layout to vertical with no media queries.</p>
      <p>
        Based on{" "}
        <a href="https://heydonworks.com/article/the-flexbox-holy-albatross-reincarnated/">
          FlexBox Holy Albatross
        </a>{" "}
      </p>
      <SSwitcher>
        <SWrapper ref={flexRef}>
          {content.map(({ content, id }) => (
            <SCard key={id}>{content}</SCard>
          ))}
        </SWrapper>
      </SSwitcher>
    </div>
  );
}

function getContent() {
  const jokes = [
    "I used to work for a soft drink can crusher. It was soda pressing.",
    "I just read a book about Stockholm syndrome. It was pretty bad at first, but by the end I liked it.",
    "Did you hear about the cheese who saved the world? It was Legend-dairy!",
    "Why do bananas have to put on sunscreen before they go to the beach? Because they might peel!",
    "How do robots eat guacamole? With computer chips.",
    "What do Alexander the Great and Winnie the Pooh have in common? Same middle name.",
    "What did one plate say to the other plate? Dinner is on me!",
    "Why do pirates not know the alphabet? They always get stuck at 'C'.",
    "Who did the wizard marry? His ghoul-friend",
    "Just read a few facts about frogs. They were ribbiting.",
    "Do you know where you can get chicken broth in bulk? The stock market.",
  ];

  return jokes[randNumber(jokes.length)];
}

function randNumber(max) {
  return Math.floor(Math.random() * max);
}

function throttle(func, time) {
  let lastTime = 0;
  return function (...args) {
    const now = new Date();
    if (now - lastTime >= time) {
      func(...args);
      lastTime = now;
    }
  };
}

function mergeRefs(...refs) {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 1) return filteredRefs[0];

  return function (instance) {
    for (const ref of filteredRefs) {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref) {
        ref.current = instance;
      }
    }
  };
}
