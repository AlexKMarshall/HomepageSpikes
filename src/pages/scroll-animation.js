import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const colors = [
  "#f7b1ab",
  "#cbd4c2",
  "#dbebc0",
  "#815355",
  "#523249",
  "#ffe66d",
  "#f7fff7",
  "#e1bc29",
  "#f7b538",
  "#f4bfdb",
  "#ffe9f3",
];

function randNumber(max) {
  return Math.floor(Math.random() * max);
}

function getDimensions() {
  const rnd = Math.random();
  if (rnd < 0.8) return { x: 1, y: 1 };
  if (rnd < 0.85) return { x: 1, y: 2 };
  if (rnd < 0.9) return { x: 2, y: 1 };
  if (rnd < 0.95) return { x: 2, y: 2 };
  if (rnd < 1) return { x: 3, y: 1 };
}

function buildData() {
  let items = [];
  for (let i = 0; i < 30; i++) {
    const item = {
      id: uuidv4(),
      color: colors[randNumber(colors.length)],
      dimensions: getDimensions(),
    };
    items.push(item);
  }
  return items;
}

const SBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  grid-row-start: span ${(props) => props.dimensions?.y};
  grid-column-start: span ${(props) => props.dimensions?.x};
`;

const SGrid = styled.div`
  padding: var(--s0);
  max-width: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-auto-rows: 20rem;
  grid-auto-flow: row dense;
  gap: 1rem;
  background: lightslategrey;
  border-radius: 5px;
`;

export default function ScrollAnimation() {
  const [items] = useState(buildData());
  return (
    <>
      <h2>Animate appearance on scroll</h2>
      <SGrid>
        {items.map((item) => (
          <Block
            key={item.id}
            color={item.color}
            dimensions={item.dimensions}
          />
        ))}
      </SGrid>
    </>
  );
}

const MBlock = motion(SBlock);

function Block({ color, dimensions }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <MBlock
      color={color}
      dimensions={dimensions}
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
      transition={{
        y: {
          mass: 2,
          stiffness: 150,
        },
        opacity: {
          duration: 0.75,
        },
      }}
    />
  );
}
