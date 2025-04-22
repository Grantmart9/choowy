
"use client"
import React from "react";
import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll, Variants
} from "motion/react"
import { useRef } from "react"

function ScrollTriggered() {
  return (
    <div style={container}>
      {food.map(([emoji, hueA, hueB], i) => (
        <Card i={i} emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
      ))}
    </div>
  );
}

function Card({ emoji, hueA, hueB, i }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div style={{ ...splash, background }} />
      <motion.div style={card} variants={cardVariants} className="card">
        {emoji}
      </motion.div>
    </motion.div>
  );
}

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

/**
* ==============   Styles   ================
*/

const container = {
  margin: "0px auto",
  maxWidth: 500,
  paddingBottom: 100,
  width: "100%",
};

const cardContainer = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  paddingLeft: 5,
  paddingRight: 5,
  marginBottom: -120,
};

const splash = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card = {
  fontSize: 164,
  width: 300,
  height: 430,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "#f5f5f5",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
};

/**
* ==============   Data   ================
*/

const food = [
  ["🍅", 340, 10],
  ["🍊", 20, 40],
  ["🍋", 60, 90],
  ["🍐", 80, 120],
  ["🍏", 100, 140],
  ["🫐", 205, 245],
  ["🍆", 260, 290],
  ["🍇", 290, 320],
];

function ScrollLinked2() {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  return (
    <div id="example">
      <motion.ul className="mx-auto" ref={ref} style={{ maskImage }}>
        <li style={{ background: "#ff0088" }}></li>
        <li style={{ background: "#dd00ee" }}></li>
        <li style={{ background: "#9911ff" }}></li>
        <li style={{ background: "#0d63f8" }}></li>
        <li style={{ background: "#0cdcf7" }}></li>
        <li style={{ background: "#8df0cc" }}></li>
        <li style={{ background: "#ff0088" }}></li>
        <li style={{ background: "#dd00ee" }}></li>
        <li style={{ background: "#9911ff" }}></li>
        <li style={{ background: "#0d63f8" }}></li>
        <li style={{ background: "#0cdcf7" }}></li>
        <li style={{ background: "#8df0cc" }}></li>
      </motion.ul>
      <StyleSheet />
    </div>
  );
}

const left = `0%`;
const right = `100%`;
const leftInset = `20%`;
const rightInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;

function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}

/**
* ==============   Styles   ================
*/

function StyleSheet() {
  return (
    <style>{`
          #example {
            width: 100vw;
            max-width: 100vw;
            position: relative;
          }

          #example #progress {
              position: absolute;
              top: -65px;
              left: -15px;
              transform: rotate(-90deg);
          }

          #example .bg {
              stroke: #0b1011;
          }

          #example #progress circle {
              stroke-dashoffset: 0;
              stroke-width: 10%;
              fill: none;
          }

          #progress .indicator {
              stroke: var(--accent);
          }

          #example ul {
              display: flex;
              list-style: none;
              height: 220px;
              overflow-x: scroll;
              padding: 20px 0;
              flex: 0 0 600px;
              margin: 0 auto;
              gap: 20px;
          }

          #example ::-webkit-scrollbar {
              height: 5px;
              width: 5px;
              background: #fff3;
              -webkit-border-radius: 1ex;
          }

          #example ::-webkit-scrollbar-thumb {
              background: var(--accent);
              -webkit-border-radius: 1ex;
          }

          #example ::-webkit-scrollbar-corner {
              background: #fff3;
          }

          #example li {
              flex: 0 0 200px;
              background: var(--accent);
          }

  `}</style>
  );
}



export default function Home() {

  return (
    <React.Fragment>
      <div className="mt-7 block align-center justify-center" >
        <div className="flex align-center justify-center">
          <ScrollLinked2 />
        </div>
        <div><ScrollTriggered /></div>

      </div>
    </React.Fragment>
  );
}
