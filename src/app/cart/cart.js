
"use client"; // Add this line at the top of your component file
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT, BackgroundColor, FontType, TextColor } from "../supabase";
import LoadingThreeDotsJumping from "../components/loading";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from "@mui/material/TableFooter";
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const supabase = createClient(SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT);

const Cart = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // Memoized function to fetch cart data
    const fetchCartData = useCallback(async () => {
        try {
            if (!localStorage.getItem("user_id")) {
                throw new Error("User ID is not found in localStorage");
            }

            // Query the "cart" table where user_id matches
            const { data, error } = await supabase
                .from("cart")
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

    // Render cart data or an error message
    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {data.length > 0 ? (
                <div className="sticky align-center justify-center rounded-md z-20 max-w-full mx-4 mt-14 pb-14">
                    <TableContainer className="mx-auto" sx={{ maxWidth: 1000, bgcolor: "rgba(128, 128, 128, 0.45)" }} component={Paper}>
                        <Table sx={{ maxWidth: 1000 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        className={`${TextColor}`}
                                        style={{ fontWeight: 'bold', fontFamily: FontType }}>Product</TableCell>
                                    <TableCell
                                        className={`${TextColor}`}
                                        style={{ fontWeight: 'bold', fontFamily: FontType }}>Quantity</TableCell>
                                    <TableCell
                                        className={`${TextColor}`}
                                        style={{ fontWeight: 'bold', fontFamily: FontType }}>Cost Inc Vat</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            className={`${TextColor}`}
                                            style={{ fontFamily: FontType }}>
                                            {row.title}
                                        </TableCell>
                                        <TableCell
                                            className={`${TextColor}`}
                                            style={{ fontFamily: FontType }}>{row.quantity}</TableCell>
                                        <TableCell
                                            className={`${TextColor}`}
                                            style={{ fontFamily: FontType }}>R {row.cost_after_vat}</TableCell>
                                        <TableCell><Button size="small" sx={{
                                            textTransform: "none", bgcolor: "transparent", color: "#9af5f5",
                                            '&:hover': {
                                                backgroundColor: "transparent",
                                                color: 'red',
                                            }
                                        }}><DeleteOutlineIcon /></Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={2} align="right" style={{ fontWeight: 'bold' }}>
                                        Total:
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>
                                        R {data.reduce((sum, row) => sum + row.cost_after_vat, 0).toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Button sx={{
                                            textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white",
                                            '&:hover': {
                                                backgroundColor: "rgba(44, 192, 222,0.8)",
                                                color: 'white',
                                            }
                                        }}>Checkout</Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <div style={{ minWidth: "100vw", marginTop: "40vh" }} className="flex">
                    <div
                        className="mx-auto">
                        <LoadingThreeDotsJumping />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
