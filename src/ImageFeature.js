export default function ImageFeature({
  richContent,
  imageUrl = "https://source.unsplash.com/featured/?cat",
}) {
  return (
    <div style={{ display: "flex" }}>
      {richContent}
      <img alt="cat" src={imageUrl} style={{ maxWidth: "50vw" }} />
    </div>
  );
}
