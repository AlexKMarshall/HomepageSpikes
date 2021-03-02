import { useState, forwardRef } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import styled from "styled-components";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

import samplePdf from "../assets/sample.pdf";

const SDocument = styled(Document)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const PageWithRef = forwardRef((props, ref) => {
  return <Page inputRef={ref} {...props} />;
});

const MPage = motion(PageWithRef);

const SContainer = styled.div`
  height: 75vh;
  background-color: cornsilk;
  padding: 3rem;
`;

export default function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  // we have to provide pixel dimensions to the pdf page, so it can render legible text
  // which means we have to be careful where/how we render it. Its parent needs to have a size
  // otherwise it'll just come out tiny. That's the purpose of the container wrapper here,
  // to provide a size and allow for padding and such
  const [ref, bounds] = useMeasure();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <SContainer>
        <SDocument
          inputRef={ref}
          file={samplePdf}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <AnimatePresence>
            <motion.div
              key={`page-${pageNumber}`}
              style={{ position: "absolute" }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              initial={{ x: "100vw", opacity: 0, scale: 0.9 }}
              exit={{ x: "-100vw", opacity: 0, scale: 1.1 }}
            >
              <MPage pageNumber={pageNumber} height={bounds.height} />
            </motion.div>
          </AnimatePresence>
        </SDocument>
      </SContainer>

      <div>
        {pageNumber > 1 ? (
          <button onClick={() => setPageNumber((pageNumber) => pageNumber - 1)}>
            Previous
          </button>
        ) : null}
        <p>
          Page {pageNumber} of {numPages}
        </p>
        {pageNumber < numPages ? (
          <button onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}>
            Next
          </button>
        ) : null}
        <a href={samplePdf}>Download my PDF</a>
      </div>
    </div>
  );
}
