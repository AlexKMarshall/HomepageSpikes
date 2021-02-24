import { useState } from "react";
import "./App.css";
// import ReactDraftWysiwyg from "./react-draft-wysiwyg";
import RichTextEditor from "./RichTextEditor";
import { posts as initialPosts } from "./dummy-content";
import RichTextContent from "./RichTextContent";

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [postToEdit, setPostToEdit] = useState("");

  function updatePost(item, postContent) {
    setPosts((prevPosts) =>
      prevPosts.map((prevPost) =>
        prevPost.item === item
          ? { ...prevPost, content: postContent }
          : prevPost
      )
    );
    setPostToEdit("");
  }

  console.log(postToEdit);

  return (
    <div className="App">
      <h2>Rich Text Editor with DraftJs</h2>
      {posts.map((post) =>
        postToEdit === post.item ? (
          <RichTextEditor
            key={post.item}
            initialContent={post.content}
            onSave={(content) => updatePost(post.item, content)}
          />
        ) : (
          <div key={post.item}>
            <RichTextContent dangerousHtmlContent={post.content} />
            <button onClick={() => setPostToEdit(post.item)}>
              Edit this item
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default App;
