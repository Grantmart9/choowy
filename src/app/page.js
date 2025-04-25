
"use client"
import React, { useState, useEffect, useCallback } from "react";
import ScrollTriggered from "./components/scrolltriggered";
import { FontType, SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT } from "./supabase";
import { createClient } from "@supabase/supabase-js";
import LoadingThreeDotsJumping from "./components/loading";
import ScrollLinked2 from "./components/scrollLinked2";
import { motion } from "motion/react";


const supabase = createClient(SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT);

const CircleOfDots = () => {
  const dotCount = 5; // Number of dots
  const radius = 200; // Radius of the circle in pixels
  const centerX = 0; // X-coordinate of the circle center
  const centerY = 0; // Y-coordinate of the circle center

  // Generate dot positions based on circle geometry
  const dots = Array.from({ length: dotCount }).map((_, index) => {
    const angle = (index / dotCount) * 2 * Math.PI; // Angle in radians
    const x = centerX + radius * Math.cos(angle); // X-position
    const y = centerY + radius * Math.sin(angle); // Y-position
    return { x, y };
  });

  return (
    <div
      className="mx-auto"
      style={{
        width: radius * 2 + 50, // Circle container size
        height: radius * 2 + 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          initial={{ backgroundColor: "#038067", scale: 1 }}
          animate={{ backgroundColor: "#05edbf", scale: 1 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "circInOut",
          }}
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            top: `${dot.y + radius}px`,
            left: `${dot.x + radius}px`,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [Data, setData] = useState([]);

  // Memoized getInstruments function
  const getInstruments = useCallback(async () => {
    let query = supabase.from("products").select();
    const { data } = await query;
    setData(data);
  }, []);

  useEffect(() => {
    getInstruments();
  }, [getInstruments]);

  return (
    <React.Fragment>
      <div className="mt-12 block align-center justify-center" >
        {Data.length === 0 ?
          <div style={{ minWidth: "100vw", marginTop: "40vh" }} className="flex">
            <div
              className="mx-auto">
              <LoadingThreeDotsJumping />
            </div>
          </div> :
          <div>
            <text className={`text-cyan-100 font-bold ${FontType} text-xl`}>Top Sellers</text>
            <ScrollLinked2 />
            <text className={`text-cyan-100 font-bold ${FontType} text-xl mt-3`}>Top Rated</text>
            <ScrollLinked2 />
            <text className={`text-cyan-100 font-bold ${FontType} text-xl mt-3`}>Recently Added</text>
            <ScrollLinked2 />
          </div>
        }
      </div>
    </React.Fragment>
  );
}
