import { useState } from "react";
import "../App.css";
// import ReactDraftWysiwyg from "./react-draft-wysiwyg";
import RichTextEditor from "../RichTextEditor";
import ImageFeature from "../ImageFeature";
import { posts as initialPosts } from "../dummy-content";
import RichTextContent from "../RichTextContent";
import { Box, Stack, Cluster } from "../layout";

export default function RichTextPage() {
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

  return (
    <div>
      <h2>Rich Text Editor with DraftJs</h2>
      {posts.map((post) => (
        <Box key={post.item}>
          <ImageFeature
            richContent={
              postToEdit === post.item ? (
                <RichTextEditor
                  key={post.item}
                  initialContent={post.content}
                  onSave={(content) => updatePost(post.item, content)}
                  onCancel={() => setPostToEdit("")}
                />
              ) : (
                <Box>
                  <Stack>
                    <RichTextContent dangerousHtmlContent={post.content} />
                    <Cluster>
                      <button onClick={() => setPostToEdit(post.item)}>
                        Edit this item
                      </button>
                    </Cluster>
                  </Stack>
                </Box>
              )
            }
          />
        </Box>
      ))}
    </div>
  );
}
