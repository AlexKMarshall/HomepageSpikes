import { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

const jokes = [
  "I used to work for a soft drink can crusher. It was soda pressing.",
  "I just read a book about Stockholm syndrome. It was pretty bad at first, but by the end I liked it.",
  "Did you hear about the cheese who saved the world? It was Legend-dairy!",
  "Why do bananas have to put on sunscreen before they go to the beach? Because they might peel!",
  "How do robots eat guacamole? With computer chips.",
  "What do Alexander the Great and Winnie the Pooh have in common? Same middle name.",
  "What did one plate say to the other plate? Dinner is on me!",
];

const initialItems = jokes.reduce((collection, _joke, index) => {
  const item = makeItem(index);
  return { ...collection, [item.id]: item };
}, {});

const initialOrder = jokes.map((_joke, index) => makeItem(index).id);

function makeItem(index) {
  return {
    id: `item-${index}`,
    text: jokes[index],
    color: colors[randNumber(colors.length)],
  };
}

const Container = styled.div`
  margin: 1rem;
  border: 1px solid lightgrey;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: ghostwhite;
`;
const Title = styled.h2`
  padding: 1rem;
`;
const WidgetList = styled.div`
  padding: 1rem;
`;

export default function DragDrop() {
  const items = initialItems;
  const [order, setOrder] = useState(initialOrder);

  const orderedItems = order.map((itemId) => items[itemId]);

  function onDragEnd({ destination, source, draggableId }) {
    if (!destination) {
      return;
    }
    const { index: srcIdx } = source;
    const { index: destIdx } = destination;
    if (destination.droppableId === source.droppableId && destIdx === srcIdx) {
      return;
    }

    setOrder((oldOrder) => moveElement(srcIdx, destIdx, oldOrder));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Title>Re-order by Drag and Drop</Title>

        <Droppable droppableId="homepage-0">
          {(provided) => (
            <WidgetList ref={provided.innerRef} {...provided.droppableProps}>
              {orderedItems.map(({ id, text, color }, index) => (
                <Widget
                  key={id}
                  id={id}
                  text={text}
                  color={color}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </WidgetList>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  );
}

const SWidget = styled.div`
  padding: 2rem;
  max-width: 50ch;
  font-size: 1.6rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background-color: ${(props) => props.color};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

// There should be a better way of wrapping this so that the stack is still applied rather than
// explicit bottom margin. Maybe the stack needs to be the droppable target???
function Widget({ id, index, text, color }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <SWidget
          color={color}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {text}
        </SWidget>
      )}
    </Draggable>
  );
}

function moveElement(sourceIndex, destinationIndex, array) {
  const movingElement = array[sourceIndex];
  const arrayCopy = [...array];
  arrayCopy.splice(sourceIndex, 1);
  arrayCopy.splice(destinationIndex, 0, movingElement);
  return arrayCopy;
}

function randNumber(max) {
  return Math.floor(Math.random() * max);
}