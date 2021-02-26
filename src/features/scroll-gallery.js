import { Stack, Box, Reel, Cluster } from "../layout";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const colors = [
  "#668586",
  "#82aeb1",
  "#93c6d6",
  "#a7acd9",
  "#9e8fb2",
  "#4d5382",
  "#514663",
  "#8b575c",
  "#5d576b",
];

const myCards = [];

function randNumber(max) {
  return Math.floor(Math.random() * max);
}

for (let i = 0; i < 20; i++) {
  myCards.push({
    id: uuidv4(),
    color: colors[randNumber(colors.length)],
    imageColor: colors[randNumber(colors.length)],
    textColor: colors[randNumber(colors.length)],
    linkColor: colors[randNumber(colors.length)],
    textHeight: randNumber(3) + 1,
  });
}

const SCardBG = styled.div`
  min-height: 600px;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
`;

const SImage = styled.div`
  height: 300px;
  width: 400px;
  background-color: ${(props) => props.color};
  border-radius: 2px;
  border: 3px solid rgba(0, 0, 0, 0.1);
`;

const SText = styled.div`
  height: ${(props) => props.textHeight * 4}rem;
  background-color: ${(props) => props.color};
  border-radius: 2px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  margin-bottom: auto;
`;

const SLink = styled.div`
  height: 2.5rem;
  width: 6rem;
  background-color: ${(props) => props.color};
  border-radius: 2px;
  border: 3px solid rgba(0, 0, 0, 0.1);
`;

function Card({ color, imageColor, textColor, textHeight, linkColor }) {
  return (
    <SCardBG color={color}>
      <Box>
        <Stack splitAfter={2}>
          <SImage color={imageColor} />
          <SText color={textColor} textHeight={textHeight} />
          <Cluster justify="flex-end">
            <SLink color={linkColor} />
          </Cluster>
        </Stack>
      </Box>
    </SCardBG>
  );
}

export default function ScrollGallery() {
  return (
    <Box>
      <Stack>
        <h2>Scrolling Gallery</h2>
        <Reel>
          {myCards.map((card) => (
            <Card
              key={card.id}
              color={card.color}
              imageColor={card.imageColor}
              textColor={card.textColor}
              textHeight={card.textHeight}
              linkColor={card.linkColor}
            />
          ))}
          {/* <div style={{ flexBasis: "var(--s0)", background: "hotpink" }}></div> */}
        </Reel>
      </Stack>
    </Box>
  );
}
