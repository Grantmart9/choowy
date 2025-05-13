"use client";
import React, { useEffect, useCallback, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT } from "../supabase";
import LoadingThreeDotsJumping from "../components/loading";
import { Card } from "@mui/material";

const supabase = createClient(SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT);

function transformDataset({ Data }) {
    const groupedData = {};

    if (!Array.isArray(Data)) {
        throw new Error("Input dataset must be a valid array.");
    }

    Data.forEach(row => {
        const { order_id, product_id, quantity, delivery_address, contact_person, date_created, status, user_id } = row;

        // If the order_id doesn't exist in the groupedData object, initialize it
        if (!groupedData[order_id]) {
            groupedData[order_id] = {
                order_id,
                delivery_address,
                contact_person,
                date_created,
                status,
                user_id,
                order: []
            };
        }
        // Push the product information into the order array
        groupedData[order_id].order.push({ product_id, quantity });
    });

    // Convert the groupedData object to an array
    return Object.values(groupedData)
}

const Orders = () => {
    const [Data, setData] = useState([])
    const [error, setError] = useState("")

    const fetchCartData = useCallback(async () => {
        try {
            const userId = localStorage.getItem("user_id");
            if (!userId) {
                console.error("No User ID found in localStorage");
                setError("No User ID found in localStorage");
                return;
            }
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .eq("user_id", userId);

            if (error) {
                console.error("Supabase error:", error);
                setError(error.message);
                return;
            }

            if (!Array.isArray(data)) {
                console.log("Supabase data must be a valid array.");
            }

            const transformedData = transformDataset({ Data: data });
            setData(transformedData); // Update state with the fetched data

        } catch (err) {
            console.error("Error fetching cart data:", err);
            setError(err.message);
        }
    }, []);

    // Fetch cart data when the component mounts
    useEffect(() => {
        fetchCartData();
    }, [fetchCartData]);

    return (
        <React.Fragment>
            <div className=" mt-20 m-4 text-center text-white justify-center">
                {Data.length !== 0 ?
                    <div >
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-4 pb-5">
                            {Data.map((order, index) => <Card className={`bg-[url(./background2.svg)]`} key={index}>
                                <div className="grid grid-flow-row">
                                    <div className="text-xs text-left text-cyan-950 px-2 font-bold">Order Date: {order.date_created}</div>
                                    <div className="text-xs text-left text-cyan-950 px-2">Order Id: {order.order_id}</div>
                                    <div className="text-xs text-left text-cyan-950 px-2">Status: {order.status}</div>
                                </div>
                            </Card>)
                            }
                        </div>
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
