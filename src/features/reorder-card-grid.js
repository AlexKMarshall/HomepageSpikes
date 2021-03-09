import { useReducer } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import CardList from "./nested-drag/card-list";
import { types, itemHash, homePage } from "./nested-drag/data";

const actionTypes = {
  DRAG_END: "dragEnd",
};

function dragDropReducer(state, action) {
  switch (action.type) {
    case actionTypes.DRAG_END:
      const {
        source: dropSource,
        destination: dropDestination,
        draggableId,
      } = action.payload;
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
    default:
      throw new Error("unexpected action type ", action.type);
  }
}

export default function Homepage({ homepageId = homePage.id } = {}) {
  const [items, dispatch] = useReducer(dragDropReducer, itemHash);

  const widgets = items[homepageId].orderedChildren.map((id) => items[id]);

  function renderWidget(widget) {
    switch (widget.type) {
      case types.CARD_LIST:
        return (
          <CardList
            key={widget.id}
            id={widget.id}
            title={widget.title}
            cards={widget.orderedChildren.map((id) => items[id])}
          />
        );
      default:
        return null;
    }
  }

  function onDragEnd(result) {
    console.log("finished dragging");
    dispatch({ type: actionTypes.DRAG_END, payload: result });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {widgets.map(renderWidget)}
    </DragDropContext>
  );
}
