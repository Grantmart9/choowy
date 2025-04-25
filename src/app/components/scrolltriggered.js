"use client"
import React from "react";
import { motion } from "motion/react"
import TopSellers from "../royalCanin.jpeg"
import Image from "next/image";
import { Button } from "@mui/material";

export default function ScrollTriggered() {

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
            viewport={{ amount: 1 }}
        >
            <div style={{ ...splash, background, width: "100%" }} />
            <Button disableRipple={true}>
                <motion.div className="bg-[url(./background2.svg)] bg-repeat bg-cover p-1" style={card} variants={cardVariants} className="card">
                    {emoji}
                </motion.div>
            </Button>
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
    clipPath: `path("M 14 303.5 C 14 292.454 21.8 285.101 29 283.5 L 414 219.5 C 424 218.033 434 228.454 434 239.5 L 428 430 C 428 441.046 420 450 410 450 L 15 450 C 7.8 450 0 441.046 0 430 Z")`,
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

const food = [
    [<Image src={TopSellers} alt={"product"} />, 340, 10],
    [<Image src={TopSellers} alt={"product"} />, 20, 40],
    [<Image src={TopSellers} alt={"product"} />, 60, 90],
    [<Image src={TopSellers} alt={"product"} />, 80, 120],
    [<Image src={TopSellers} alt={"product"} />, 100, 140],
    [<Image src={TopSellers} alt={"product"} />, 205, 245],
    [<Image src={TopSellers} alt={"product"} />, 260, 290],
    [<Image src={TopSellers} alt={"product"} />, 290, 320],
];