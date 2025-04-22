
"use client"
import React from "react";
import ScrollTriggered from "./components/scrolltriggered";
import { FontType } from "./supabase";

export default function Home() {

  return (
    <React.Fragment>
      <div className="mt-12 block align-center justify-center" >
        <div style={{ fontFamily: FontType, color: "whitesmoke" }} className="text-left  ml-2">Top Sellers</div>
        <ScrollTriggered />
      </div>
    </React.Fragment>
  );
}
