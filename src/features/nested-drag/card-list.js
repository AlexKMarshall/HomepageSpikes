import { Droppable } from "react-beautiful-dnd";

import styled from "styled-components";
import Card from "./card";

const SContainer = styled.div`
  margin: 1rem;
  border: 1px solid lightgrey;
`;
const STitle = styled.h3`
  padding: 1rem;
`;
const SCardList = styled.div`
  padding: 1rem;
`;

export default function CardList({ id, title, cards, isDropEnabled }) {
  return (
    <SContainer>
      <STitle>{title}</STitle>
      <Droppable droppableId={id} isDropDisabled={!isDropEnabled}>
        {(provided) => (
          <SCardList {...provided.droppableProps} ref={provided.innerRef}>
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </SCardList>
        )}
      </Droppable>
    </SContainer>
  );
}
