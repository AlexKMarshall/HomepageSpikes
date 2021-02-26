import { useState } from "react";
import "../App.css";
import styled from "styled-components";
// import ReactDraftWysiwyg from "./react-draft-wysiwyg";
import RichTextEditor from "../RichTextEditor";
import ImageFeature from "../ImageFeature";
import { posts as initialPosts } from "../dummy-content";
import RichTextContent from "../RichTextContent";
import { Box, Stack, Cluster } from "../layout";

const cats = [
  "https://images.unsplash.com/photo-1613568435900-6721bbba0715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxyYW5kb218fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit",
  "https://images.unsplash.com/photo-1613988753044-5cf74912c241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxyYW5kb218fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit",
  "https://images.unsplash.com/photo-1613685396238-852abd2b6d36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxyYW5kb218fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit",
  "https://images.unsplash.com/photo-1614016038933-fab68d4adb8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxyYW5kb218fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit",
];

const AlternatingBox = styled(Box)`
  background: hotpink;
`;

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
      {posts.map((post, i) => (
        <AlternatingBox key={post.item} className="alternating-box">
          <ImageFeature
            imageUrl={cats[i]}
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
        </AlternatingBox>
      ))}
    </div>
  );
}
