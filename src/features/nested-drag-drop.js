import { useReducer } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import CardList from "./nested-drag/card-list";
import { types, itemHash, homePage } from "./nested-drag/data";

const actionTypes = {
  DRAG_END: "dragEnd",
  DRAG_START: "dragStart",
};

function dragDropReducer(state, action) {
  if (action.type === actionTypes.DRAG_END) {
    const {
      source: dropSource,
      destination: dropDestination,
      draggableId,
    } = action.payload;

    if (!dropDestination) {
      // didn't drop in a valid space, do nothing
      return state;
    }

    if (
      dropSource.droppableId === dropDestination.droppableId &&
      dropSource.index === dropDestination.index
    ) {
      // didn't move it, do nothing
      return state;
    }

    // update item positions

    // remove from source
    const source = state[dropSource.droppableId];
    const newSourceOrder = [...source.orderedChildren];
    newSourceOrder.splice(dropSource.index, 1);
    const removedFromSource = {
      ...state,
      [dropSource.droppableId]: {
        ...source,
        orderedChildren: newSourceOrder,
      },
    };

    if (!dropDestination) {
      return removedFromSource;
    }

    // add to destination
    const destination = removedFromSource[dropDestination.droppableId];
    const newDestinationOrder = [...destination.orderedChildren];
    newDestinationOrder.splice(dropDestination.index, 0, draggableId);
    const addedToDestination = {
      ...removedFromSource,
      [dropDestination.droppableId]: {
        ...destination,
        orderedChildren: newDestinationOrder,
      },
    };

    return addedToDestination;
  }

  if (action.type === actionTypes.DRAG_START) {
    // set enabled droppables
    // currently only allow the same list, items can't move between lists
    const { source } = action.payload;
    return { ...state, droppablesEnabled: [source.droppableId] };
  }

  switch (action.type) {
    case actionTypes.DRAG_END:
    case actionTypes.DRAG_START:
    default:
      throw new Error("unexpected action type ", action.type);
  }
}

const SWidgetList = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid lightgrey;
`;

export default function NestedDragDrop({ homepageId = homePage.id } = {}) {
  const [state, dispatch] = useReducer(dragDropReducer, {
    ...itemHash,
    droppablesEnabled: [],
  });

  const widgets = state[homepageId].orderedChildren.map((id) => state[id]);

  function renderWidget(widget, index) {
    switch (widget.type) {
      case types.CARD_LIST:
        return (
          <CardList
            key={widget.id}
            id={widget.id}
            title={widget.title}
            cards={widget.orderedChildren.map((id) => state[id])}
            isDropEnabled={state.droppablesEnabled.includes(widget.id)}
            index={index}
          />
        );
      default:
        return null;
    }
  }

  function onDragEnd(result) {
    dispatch({ type: actionTypes.DRAG_END, payload: result });
  }

  function onDragStart(start) {
    dispatch({ type: actionTypes.DRAG_START, payload: start });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable
        droppableId={homepageId}
        isDropDisabled={!state.droppablesEnabled.includes(homepageId)}
      >
        {(provided) => (
          <SWidgetList {...provided.droppableProps} ref={provided.innerRef}>
            {widgets.map(renderWidget)}
            {provided.placeholder}
          </SWidgetList>
        )}
      </Droppable>
    </DragDropContext>
  );
}
