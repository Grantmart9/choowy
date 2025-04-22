
"use client"
import React from "react";
import ScrollLinked2 from "./components/scrollLinked2";
import ScrollTriggered from "./components/scrolltriggered";
import { FontType } from "./supabase";


export default function Home() {

  return (
    <React.Fragment>
      <div className="mt-12 block align-center justify-center" >
        <div style={{ fontFamily: FontType, color: "whitesmoke" }} className="text-left  ml-2">Top Sellers</div>
        <div className="flex align-center justify-center">
          <ScrollLinked2 />
        </div>
        <div style={{ fontFamily: FontType, color: "whitesmoke" }} className="text-left  ml-2">Top Rated</div>
        <div className="flex align-center justify-center">
          <ScrollLinked2 />
        </div>
        <div style={{ fontFamily: FontType, color: "whitesmoke" }} className={'text-left ml-2'}>Recently Added</div>
        <div className="flex align-center justify-center">
          <ScrollLinked2 />
        </div>
        <div>
          <ScrollTriggered />
        </div>
      </div>
    </React.Fragment>
  );
}
