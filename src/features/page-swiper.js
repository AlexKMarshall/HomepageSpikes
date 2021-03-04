import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";

const colors = [
  "#668586",
  "#82aeb1",
  "#93c6d6",
  "#a7acd9",
  "#9e8fb2",
  "#4d5382",
  // "#514663",
  // "#8b575c",
  // "#5d576b",
];

const images = [image1, image2, image3, image4, image5, image6];

const SDocument = styled.div`
  top: 3rem;
  left: 3rem;
  right: 3rem;
  bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
`;

const MFrame = motion(SDocument);

const SContainer = styled.div`
  height: 75vh;
  background-color: cornsilk;
  position: relative;
`;

export default function PageSwiper() {
  const numPages = colors.length;
  const [pageNumber, setPageNumber] = useState(1);
  const [moveDirection, setMoveDirection] = useState("right");

  // This doesn't work the first time you change direction
  // not figured out the solution yet
  // works for the keyboard handler, but not the button press
  const moveRight = useCallback(() => {
    setMoveDirection("right");
    setPageNumber((pageNum) => (pageNum + 1 <= numPages ? pageNum + 1 : 1));
  }, [numPages]);

  const moveLeft = useCallback(() => {
    setMoveDirection("left");
    setPageNumber((pageNum) => {
      return pageNum - 1 > 0 ? pageNum - 1 : numPages;
    });
  }, [numPages]);

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        moveLeft();
      } else if (e.key === "ArrowRight") {
        moveRight();
      }
    },
    [moveLeft, moveRight]
  );

  // probably shouldn't set up global event listener
  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div>
      <SContainer onKeyUp={handleKeyUp}>
        <AnimatePresence>
          <MFrame
            key={pageNumber}
            style={{ backgroundColor: colors[pageNumber - 1] }}
            initial={{
              opacity: 0,
              x: moveDirection === "right" ? "100vw" : "-100vw",
              scale: moveDirection === "right" ? 0.9 : 1.1,
            }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{
              opacity: 0,
              x: moveDirection === "right" ? "-100vw" : "100vw",
              scale: moveDirection === "right" ? 1.1 : 0.9,
            }}
            transition={{ mass: 1.5, damping: 5 }}
          >
            <img
              src={images[pageNumber - 1]}
              alt=""
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </MFrame>
        </AnimatePresence>
      </SContainer>

      <div>
        {pageNumber > 1 ? <button onClick={moveLeft}>Prev</button> : null}
        <p>
          Page {pageNumber} of {numPages}
        </p>
        {pageNumber < numPages ? (
          <button onClick={moveRight}>Next</button>
        ) : null}
      </div>
    </div>
  );
}
