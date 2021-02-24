import { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";

import "draft-js/dist/Draft.css";
import RichTextContent from "./RichTextContent";

export default function DraftJsEditor({ initialContent, onSave }) {
  const [editorState, setEditorState] = useState(() =>
    initialContent
      ? EditorState.createWithContent(convertFromHTML(initialContent))
      : EditorState.createEmpty()
  );
  const [mode, setMode] = useState("edit");

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

  function toggleMode() {
    setMode((prevMode) => (prevMode === "edit" ? "view" : "edit"));
  }

  function handleSave() {
    const updatedContent = convertToHTML(editorState.getCurrentContent());
    onSave(updatedContent);
  }

  return (
    <div>
      <button onClick={toggleMode}>
        {mode === "edit" ? "preview" : "write"}
      </button>
      {mode === "edit" ? (
        <>
          <h3>Editor</h3>
          <BlockStyleToolbar
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <button onClick={() => toggleInlineStyle("BOLD")}>B</button>
          <button onClick={() => toggleInlineStyle("ITALIC")}>I</button>
          <button onClick={() => toggleInlineStyle("UNDERLINE")}>U</button>
          <div style={{ border: "2px solid grey", minHeight: "30vh" }}>
            <Editor
              blockStyleFn={getBlockStyle}
              editorState={editorState}
              onChange={setEditorState}
              handleKeyCommand={handleKeyCommand}
            />
          </div>
          <button onClick={handleSave}>save</button>
        </>
      ) : (
        <ContentPreview editorState={editorState} />
      )}
    </div>
  );
}

function ContentPreview({ editorState }) {
  const rawHTML = convertToHTML(editorState.getCurrentContent());

  return (
    <>
      <h3>Preview</h3>
      <RichTextContent dangerousHtmlContent={rawHTML} />
    </>
  );
}

export const BLOCK_TYPES = [
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
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

function BlockStyleToolbar({ editorState, onToggle }) {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div>
      <HeaderStyleDropdown
        onToggle={onToggle}
        active={blockType}
        headerOptions={HEADER_TYPES}
      />
      {BLOCK_TYPES.map((type) => (
        <BlockStyleButton
          key={type.style}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
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

  return <button onClick={handleClick}>{label}</button>;
}
