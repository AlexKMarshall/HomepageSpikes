import styled from "styled-components";

const SImg = styled.img`
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 8px;
`;

export default function ImageFeature({
  richContent,
  imageUrl = "https://source.unsplash.com/featured/?cat",
}) {
  return (
    <div style={{ display: "flex" }}>
      {richContent}
      <SImg alt="cat" src={imageUrl} style={{ maxWidth: "50vw" }} />
    </div>
  );
}
