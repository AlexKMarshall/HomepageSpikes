import { Draggable } from "react-beautiful-dnd";

import styled from "styled-components";

const SContainer = styled.div`
  padding: 1rem;
  border: 1px solid lightgrey;
  margin-bottom: 1rem;
`;

export default function Card({ card, index }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <SContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {card.content}
        </SContainer>
      )}
    </Draggable>
  );
}
