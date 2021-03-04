import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import styled from "styled-components";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "framer-motion";

import samplePdf from "../assets/sample.pdf";

const SDocument = styled(Document)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SContainer = styled.div`
  height: 75vh;
  background-color: cornsilk;
  padding: 3rem;
`;

export default function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderedPageNumber, setRenderedPageNumber] = useState(null);
  // we have to provide pixel dimensions to the pdf page, so it can render legible text
  // which means we have to be careful where/how we render it. Its parent needs to have a size
  // otherwise it'll just come out tiny. That's the purpose of the container wrapper here,
  // to provide a size and allow for padding and such
  const [ref, bounds] = useMeasure();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const isLoading = renderedPageNumber !== pageNumber;

  return (
    <div>
      <SContainer>
        <SDocument
          inputRef={ref}
          file={samplePdf}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <AnimatePresence>
            {isLoading && renderedPageNumber ? (
              <motion.div
                key={renderedPageNumber}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  willChange: "transform",
                }}
                animate={{ opacity: 1 }}
                // initial={{ opacity: 0, x: "100vw" }}
                exit={{ opacity: 0, x: "-100vw" }}
              >
                <Page
                  key={`Page-${renderedPageNumber}`}
                  height={bounds.height}
                  pageNumber={renderedPageNumber}
                />
              </motion.div>
            ) : null}
            <motion.div
              key={pageNumber}
              style={{ position: "absolute", willChange: "transform" }}
              animate={{
                opacity: isLoading ? 0 : 1,
                x: isLoading ? "100vw" : 0,
              }}
              // initial={{ opacity: 0 }}
              // exit={{ opacity: 0 }}
            >
              <Page
                key={`Page-${pageNumber}`}
                pageNumber={pageNumber}
                height={bounds.height}
                onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
              />
            </motion.div>
          </AnimatePresence>
        </SDocument>
      </SContainer>

      <div>
        {pageNumber > 1 ? (
          <button onClick={() => setPageNumber((pageNumber) => pageNumber - 1)}>
            Prev
          </button>
        ) : null}
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <div>{isLoading ? "Loading" : "Ready"} </div>
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
