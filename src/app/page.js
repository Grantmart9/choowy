
"use client"
import React, { useState, useEffect, useCallback } from "react";
import ScrollTriggered from "./components/scrolltriggered";
import { FontType, SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT } from "./supabase";
import { createClient } from "@supabase/supabase-js";
import LoadingThreeDotsJumping from "./components/loading";

const supabase = createClient(SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT);

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
          <>
            <div style={{ fontFamily: FontType, color: "whitesmoke" }} className="text-left  ml-2">Top Sellers</div>
            <ScrollTriggered Data={Data} />
          </>}
        {Data.length === 0 ?
          <div style={{ minWidth: "100vw", marginTop: "40vh" }} className="flex">
            <div
              className="mx-auto">
              <LoadingThreeDotsJumping />
            </div>
          </div> :
          <>
            <div style={{ fontFamily: FontType, color: "whitesmoke" }} className="text-left  ml-2">Top Rated</div>
            <ScrollTriggered Data={Data} />
          </>}
        {Data.length === 0 ?
          <div style={{ minWidth: "100vw", marginTop: "40vh" }} className="flex">
            <div
              className="mx-auto">
              <LoadingThreeDotsJumping />
            </div>
          </div> :
          <>
            <div style={{ fontFamily: FontType, color: "whitesmoke" }} className="text-left  ml-2">New Arivals</div>
            <ScrollTriggered Data={Data} />
          </>}
      </div>
    </React.Fragment>
  );
}
