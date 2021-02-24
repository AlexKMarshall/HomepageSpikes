import DOMPurify from "dompurify";
import { useMemo } from "react";

export default function RichTextContent({ dangerousHtmlContent }) {
  const markup = useMemo(
    () => ({ __html: DOMPurify.sanitize(dangerousHtmlContent) }),
    [dangerousHtmlContent]
  );

  return <div dangerouslySetInnerHTML={markup} />;
}
