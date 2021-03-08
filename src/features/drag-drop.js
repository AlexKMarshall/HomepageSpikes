import { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { HashLink } from "react-router-hash-link";

const types = { WIDGET: "widget", HEADER: "header" };

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
  "Why do pirates not know the alphabet? They always get stuck at 'C'.",
  "Who did the wizard marry? His ghoul-friend",
  "Just read a few facts about frogs. They were ribbiting.",
  "Do you know where you can get chicken broth in bulk? The stock market.",
];

const headers = [
  "Local Man Wins Aubergine Growing Contest For the Third Time",
  "Woman With Butterfly Tattoo Arrested for 37th Time",
  "Viral Photo of Lizard Had Been Photoshopped",
  "Small Tornado Forcast in Northern Regions",
];

const jokeItems = jokes.reduce((collection, srcItem, index) => {
  const item =
    srcItem.type === types.HEADER ? makeHeadline(index) : makeWidget(index);
  return { ...collection, [item.id]: item };
}, {});

const headlineItems = headers.reduce((collection, srcItem, index) => {
  const item = makeHeadline(index);
  return { ...collection, [item.id]: item };
}, {});

const initialOrder = [
  ...headers.map((_header, index) => makeHeadline(index).id),
  ...jokes.map((_joke, index) => makeWidget(index).id),
];

function makeHeadline(index) {
  return {
    id: `headline-${index}`,
    text: headers[index],
    type: types.HEADER,
  };
}

function makeWidget(index) {
  return {
    id: `widget-${index}`,
    text: jokes[index],
    color: colors[randNumber(colors.length)],
    type: types.WIDGET,
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
  const items = { ...jokeItems, ...headlineItems };
  const [order, setOrder] = useState(initialOrder);

  const orderedItems = order.map((itemId) => items[itemId]);
  const orderedHeadlines = orderedItems.filter(
    (item) => item.type === types.HEADER
  );

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
    <div>
      <h2>Table of Contents</h2>
      <nav style={{ display: "flex", flexDirection: "column" }}>
        {orderedHeadlines.map((headline) => (
          <HashLink key={headline.id} to={`/drag-drop#${headline.id}`}>
            {headline.text}
          </HashLink>
        ))}
      </nav>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Title>Re-order by Drag and Drop</Title>

          <Droppable droppableId="homepage-0">
            {(provided) => (
              <WidgetList ref={provided.innerRef} {...provided.droppableProps}>
                {orderedItems.map(({ id, text, color, type }, index) =>
                  type === types.WIDGET ? (
                    <Widget
                      key={id}
                      id={id}
                      text={text}
                      color={color}
                      index={index}
                    />
                  ) : (
                    <Header key={id} id={id} text={text} index={index} />
                  )
                )}
                {provided.placeholder}
              </WidgetList>
            )}
          </Droppable>
        </Container>
      </DragDropContext>
    </div>
  );
}

const SHeader = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: navy;
  border: 1px solid lightgrey;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background-color: white;
`;

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

function Header({ id, index, text, color }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <SHeader
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          id={id}
        >
          {text}
        </SHeader>
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
