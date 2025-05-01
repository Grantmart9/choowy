"use client"; // Add this line at the top of your component file
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT, FontType } from "../supabase";
import LoadingThreeDotsJumping from "../components/loading";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from "@mui/material/TableFooter";
import Paper from '@mui/material/Paper';
import { Button, Dialog, IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import Image from "next/image";

const supabase = createClient(SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT);

const Cart = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [checkout, setCheckout] = useState(false);

    const handleCheckout = () => { setCheckout(true) }

    function truncateWords(text, wordLimit) {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    }

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

    const deleteCartItem = useCallback(async (id) => {
        try {
            const { error } = await supabase
                .from("cart")
                .delete()
                .eq("id", id);

            if (error) throw error;

            // Update the data after deletion
            setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (err) {
            setError(err.message);
            console.error("Error deleting cart item:", err);
        }
    }, []);

    const updateQuantity = useCallback(async (id, newQuantity) => {
        try {
            const { error } = await supabase
                .from("cart")
                .update({ quantity: newQuantity })
                .eq("id", id);

            if (error) throw error;

            // Update local state
            setData((prevData) =>
                prevData.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (err) {
            setError(err.message);
            console.error("Error updating quantity:", err);
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
                    <TableContainer className={`mx-auto bg-[url(./background3.svg)]`} sx={{ maxWidth: 1000 }} component={Paper}>
                        <Table sx={{ maxWidth: 1000 }} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        className={`text-cyan-950`}
                                        style={{ fontWeight: 'bold', fontFamily: FontType }}>Product</TableCell>
                                    <TableCell
                                        className={`text-cyan-950`}
                                        style={{ fontWeight: 'bold', fontFamily: FontType }} align="center">Quantity</TableCell>
                                    <TableCell
                                        className={`text-cyan-950`}
                                        style={{ fontWeight: 'bold', fontFamily: FontType }}>Cost</TableCell>
                                    <TableCell
                                        className={`text-cyan-950`}
                                        style={{ fontWeight: 'bold', fontFamily: FontType }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            className={`text-cyan-950 text-sm`}
                                            style={{ fontFamily: FontType }}>
                                            <Image src={`data:image/jpeg;base64,${row.image}`} alt={"product"}></Image>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            className={`text-cyan-950 text-sm`}
                                            style={{ fontFamily: FontType }}>
                                            <div className={`grid grid-cols-3 gap-2`}>
                                                <IconButton onClick={() => updateQuantity(row.id, Math.max(row.quantity - 1, 1))}>
                                                    <RemoveCircleOutlinedIcon />
                                                </IconButton>
                                                <div className="text-center justify-center my-auto">{row.quantity}</div>
                                                <IconButton onClick={() => updateQuantity(row.id, row.quantity + 1)}>
                                                    <AddCircleOutlinedIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                        <TableCell
                                            className={`text-cyan-950 text-sm`}
                                            style={{ fontFamily: FontType }}>R {row.cost_after_vat * row.quantity}</TableCell>
                                        <TableCell>
                                            <Button
                                                className={`text-cyan-950`}
                                                size="small"
                                                onClick={() => deleteCartItem(row.id)}
                                                sx={{
                                                    textTransform: "none", bgcolor: "transparent",
                                                    '&:hover': {
                                                        backgroundColor: "transparent",
                                                        color: 'red',
                                                    }
                                                }}>
                                                <DeleteOutlineIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={2} align="right" style={{ fontWeight: 'bold' }} className="text-cyan-950">
                                        Total:
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} className="text-cyan-950">
                                        R {data.reduce((sum, row) => sum + row.cost_after_vat * row.quantity, 0).toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={handleCheckout}
                                            size="small"
                                            sx={{
                                                textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white",
                                                '&:hover': {
                                                    backgroundColor: "rgba(44, 192, 222,0.8)",
                                                    color: 'white',
                                                }
                                            }}>Checkout
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    <Dialog
                        onClose={handleCheckout}
                        open={checkout}
                        className={` bg-[url(./background.svg)] mx-auto my-auto `}>
                        <div className={`${FontType} text-cyan-950 text-lg text-center mx-auto font-bold underline`}>Confirm your deliver address and contact details</div>
                        <div className={`${FontType} text-cyan-950 text-md text-center mx-auto`}><text className="font-bold">Delivery Address:</text> 12 Bossie Street, Japan</div>
                        <div className={`${FontType} text-cyan-950 text-md text-center mx-auto`}><text className="font-bold">Cell:</text> 0749382928</div>
                        <Button
                            sx={{
                                textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white",
                                '&:hover': {
                                    backgroundColor: "rgba(44, 192, 222,0.8)",
                                    color: 'white',
                                }
                            }}>
                            Confirm
                        </Button>
                    </Dialog>
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
