"use client";
import React, { useEffect, useCallback, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT } from "../supabase";
import LoadingThreeDotsJumping from "../components/loading";

const supabase = createClient(SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT);

const Orders = () => {
    const [Data, setData] = useState("")
    const [error, setError] = useState("")

    const fetchCartData = useCallback(async () => {
        try {
            if (!localStorage.getItem("user_id")) {
                throw new Error("User ID is not found in localStorage");
            }
            // Query the "cart" table where user_id matches
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .eq("user_id", localStorage.getItem("user_id"));

            if (error) {
                throw error;
            }

            setData(data); // Update state with the fetched data
        } catch (err) {
            setError(err.message);
            console.error("Error fetching cart data:", err);
        }
    }, []);

    // Fetch cart data when the component mounts
    useEffect(() => {
        fetchCartData();
    }, [fetchCartData]);

    return (
        <React.Fragment>
            <div className=" mt-20 m-4 text-center text-white justify-center">
                {Data ?
                    <div className="grid grid-flow-row gap-0.5">
                        <div>Order Summary</div>
                        <div></div>
                    </div> : <div style={{ minWidth: "100vw", marginTop: "40vh" }} className="flex">
                        <div
                            className="mx-auto">
                            <LoadingThreeDotsJumping />
                        </div>
                    </div>}
            </div>
        </React.Fragment>
    );
};

export default Orders;
