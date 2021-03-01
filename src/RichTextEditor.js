import { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { Button, IconButton } from "./components/button";
import { Box, Cluster, Stack } from "./layout";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatListBulleted,
} from "react-icons/md";

import "draft-js/dist/Draft.css";

export default function DraftJsEditor({ initialContent, onSave, onCancel }) {
  const [editorState, setEditorState] = useState(() =>
    initialContent
      ? EditorState.createWithContent(convertFromHTML(initialContent))
      : EditorState.createEmpty()
  );

  function handleKeyCommand(command) {
    setEditorState((prevState) => {
      const newState = RichUtils.handleKeyCommand(prevState, command);
      if (newState) return newState;
      return prevState;
    });
  }

  function toggleInlineStyle(mode) {
    setEditorState((prevState) => {
      return RichUtils.toggleInlineStyle(prevState, mode);
    });
  }

  function toggleBlockType(blockType) {
    setEditorState((prevState) => {
      return RichUtils.toggleBlockType(prevState, blockType);
    });
  }

  function handleSave() {
    const updatedContent = convertToHTML(editorState.getCurrentContent());
    onSave(updatedContent);
  }

  return (
    <Box>
      <Stack>
        <Cluster>
          <InlineStyleToolbar onToggle={toggleInlineStyle} />
          <BlockStyleToolbar
            editorState={editorState}
            onToggle={toggleBlockType}
          />
        </Cluster>
        <div
          style={{
            border: "2px solid lightgrey",
            minHeight: "30vh",
            display: "flex",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Cluster space="s-1">
            <Button onClick={onCancel}>Cancel</Button>
            <Button color="primary" onClick={handleSave}>
              Save
            </Button>
          </Cluster>
        </div>
      </Stack>
    </Box>
  );
}

// function ContentPreview({ editorState }) {
//   const rawHTML = convertToHTML(editorState.getCurrentContent());

//   return (
//     <>
//       <h3>Preview</h3>
//       <RichTextContent dangerousHtmlContent={rawHTML} />
//     </>
//   );
// }

export const BLOCK_TYPES = [
  { label: "UL", style: "unordered-list-item" },
  // { label: "OL", style: "ordered-list-item" },
];
export const HEADER_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
];

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

function InlineStyleToolbar({ onToggle }) {
  return (
    <Cluster space="s-2">
      <IconButton onClick={() => onToggle("BOLD")}>
        <MdFormatBold />
      </IconButton>
      <IconButton onClick={() => onToggle("ITALIC")}>
        <MdFormatItalic />
      </IconButton>
      <IconButton onClick={() => onToggle("UNDERLINE")}>
        <MdFormatUnderlined />
      </IconButton>
    </Cluster>
  );
}

function BlockStyleToolbar({ editorState, onToggle }) {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <Cluster space="s-2">
      <HeaderStyleDropdown
        onToggle={onToggle}
        active={blockType}
        headerOptions={HEADER_TYPES}
      />
      {BLOCK_TYPES.map((type) => (
        <BlockStyleButton
          key={type.style}
          label={<MdFormatListBulleted />}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </Cluster>
  );
}

function HeaderStyleDropdown({ onToggle, active, headerOptions }) {
  return (
    <select value={active} onChange={(e) => onToggle(e.target.value)}>
      <option value="">Header Levels</option>
      {headerOptions.map((headerLevel) => (
        <option key={headerLevel.style} value={headerLevel.style}>
          {headerLevel.label}
        </option>
      ))}
    </select>
  );
}

function BlockStyleButton({ onToggle, style, label }) {
  function handleClick() {
    onToggle(style);
  }

  return <IconButton onClick={handleClick}>{label}</IconButton>;
}
