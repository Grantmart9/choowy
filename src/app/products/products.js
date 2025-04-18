
"use client"; // Add this line at the top of your component file
import React, { useState, useEffect, useCallback } from "react";
import { ListItem, TextField, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Rating from '@mui/material/Rating';
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import Box from "@mui/material/Box";
import Slider from '@mui/material/Slider';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import { Circles } from 'react-loader-spinner'
import { SUPABASE_URL, API_KEY, TextColor, BackgroundColor, FontType } from "../supabase";
import Button from "@mui/material/Button";
import Ripple from "./components/Ripple";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

const supabase = createClient(SUPABASE_URL, API_KEY);

const SearchBar = ({
    handleFilter,
    handleClose,
    handleChange,
    handleChange1,
    valuetext,
    open,
    value,
    value1,
    searchQuery,
    handleSearchChange,
    handleClearSearch,

}) => {

    return (
        <div className="mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 5 }}
                transition={{
                    delay: 1,
                    type: "spring",
                    bounce: 0.02,
                    stiffness: 100,
                    damping: 30,
                    mass: 5,
                    duration: 0.5,
                }}
                className="inline-flex ml-14 sm:ml-2 sm:mr-2 mr-14"
            >
                <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    variant="text"
                    className="rounded-r-none shadow-r-none shadow-gray-800 shadow-xs transform-none text-gray-100 md:w-28"
                    style={{
                        background: "rgba(128, 128, 128, 0.25)", padding: "3px" // Set the background with 15% opacity
                    }}
                    onClick={handleFilter}
                >
                    <span style={{ opacity: 1, color: "#b1fbfc", fontFamily: FontType }}>Filter<Ripple color={"#1fecf9"} duration={2000}></Ripple></span> {/* Ensure text is fully opaque */}
                </Button>
                <div
                    style={{
                        background: "rgba(128, 128, 128, 0.25)", // Set the background with 15% opacity
                    }}
                    className="p-1 shadow-gray-800 shadow-xs text-center justify-center my-auto md:w-80">
                    <TextField
                        size="small"
                        fullWidth={true}
                        value={searchQuery}
                        color="info"
                        style={{
                            background: "rgba(128, 128, 128, 0.25)", // Set the background with 15% opacity
                        }}
                        onChange={handleSearchChange}
                        sx={{ input: { color: 'whitesmoke', maxHeight: "7px" } }}
                    />
                </div>
                <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    variant="text"
                    onClick={handleClearSearch}
                    style={{
                        background: "rgba(128, 128, 128, 0.25)", // Set the background with 15% opacity
                    }}
                    className="rounded-l-none shadow-r-none shadow-gray-800 shadow-xs transform-none text-gray-100">
                    <span style={{ opacity: 1, color: "#b1fbfc" }} >
                        <ClearIcon size="small" />
                        <Ripple color={"#1fecf9"} duration={2000}></Ripple>
                    </span>

                </Button>
            </motion.div>
            <Dialog
                onClose={handleClose}
                open={open}
            >
                <List
                    className="p-10"
                    style={{ backgroundColor: "rgba(128, 128, 128, 0.25)" }}>
                    <ListItem sx={{ minWidth: "200pt" }}>
                        <Typography className="text-lime-600 whitespace-nowrap">Rating </Typography>
                        <Slider
                            className="text-lime-600 ml-4"
                            getAriaLabel={() => 'Rating range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            max={5}
                            step={1}
                            min={1}
                        />
                    </ListItem>
                    <ListItem sx={{ minWidth: "200pt" }}>
                        <Typography className="text-lime-600 whitespace-nowrap">Price Range </Typography>
                        <Slider
                            className="text-lime-600 ml-4"
                            getAriaLabel={() => 'Price range'}
                            value={value1}
                            onChange={handleChange1}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            max={3000}
                            step={100}
                            min={100}
                        />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
};

const SupDataMap = ({
    Data,
    handleProduct,
    handleCloseProduct,
    product,
    productIndex,
    handleSnackbar }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-4 pb-5">
            {Data.map((Product, index) => (
                <motion.div
                    key={index} // assuming each Product has a unique id
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: index * 0.12, // Add staggered delay based on index
                        type: "spring",
                        stiffness: 300,
                        damping: 55,
                        mass: 10,
                        duration: 0.3,
                    }}
                >
                    <Button sx={{ padding: 0 }} onClick={(event) => handleProduct(event, index)} className="block rounded-none bg-gradient-to-b from-transparent to-amber-700 via-tansparent shadow-sm shadow-gray-600 h-full w-full">
                        <Image
                            alt="test"
                            style={{ maxHeight: "100px", width: "100%", top: 0 }}
                            src={`data:image/jpeg;base64,${Product.person_logo}`}
                        />
                        <div style={{ fontFamily: FontType, color: "whitesmoke", textTransform: "none" }} className="flex text-lg font- my-auto justify-center p-2">
                            {Product.service_title}
                        </div>
                        <div style={{ fontFamily: FontType, color: "whitesmoke", textTransform: "none" }} className="flex text-xl font-bold my-auto justify-end p-2">
                            R {Product.price}
                        </div>
                    </Button>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 1, // Add staggered delay based on index
                            type: "spring",
                            stiffness: 300,
                            damping: 55,
                            mass: 10,
                            duration: 1,
                        }}>
                        <Dialog
                            onClose={handleCloseProduct}
                            open={product}
                            sx={{ bgcolor: "darkcyan" }}
                        >
                            <Box style={{ maxWidth: "400px", maxHeight: "1000px" }}>
                                <Image
                                    alt="test"
                                    style={{ maxHeight: "300px", minWidth: "100%" }}
                                    src={`data:image/jpeg;base64,${Data[productIndex].person_logo}`}
                                />
                                <Rating
                                    style={{ color: "gold" }}
                                    name="Avg rating"
                                    value={Data[productIndex].rating}
                                    size="medium"
                                    sx={{ position: "absolute", top: 8, right: 5, alignItems: "center", justifyItems: "center" }}
                                />
                                <div className="flex transform-none text-cyan-950 font-sans text-md my-auto justify-center p-2">
                                    {Data[productIndex].service_title}
                                </div>
                                <div className="flex text-cyan-950 text-sm font-light my-auto justify-center p-2">{Data[productIndex].service_description}</div>
                                <div className="grid grid-cols-3">
                                    <div className="flex text-cyan-950 text-lg font-light my-auto justify-end p-2">
                                    </div>
                                    <Button
                                        onClick={handleSnackbar}
                                        sx={{
                                            textTransform: "none", bgcolor: "rgba(128, 128, 128, 0.40)", color: "#9af5f5",
                                            '&:hover': {
                                                backgroundColor: BackgroundColor,
                                                color: 'white',
                                            }
                                        }}
                                        className="text-cyan-950 justify-center my-auto text-sm"
                                        size="small">
                                        add to cart +
                                    </Button>
                                    <div className="flex text-cyan-950 text-lg font-medium align-center justify-end p-2">
                                        R {Data[productIndex].price}
                                    </div>
                                </div>
                            </Box>
                        </Dialog>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};


const Products = () => {
    const [Data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([1, 5]); // Rating range
    const [value1, setValue1] = useState([100, 3000]); // Price range
    const [value2, setValue2] = useState([1, 100]); // Distance range
    const [searchQuery, setSearchQuery] = useState("");
    const [product, setProduct] = useState(false);
    const [productIndex, setProductIndex] = useState(0);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleFilter = () => {
        setOpen(true);
    };

    const handleProduct = (e, index) => {
        setProductIndex(index);
        setProduct(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseProduct = () => {
        setProduct(false);

    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange1 = (event, newValue) => {
        setValue1(newValue);
    };

    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };

    const valuetext = (value) => {
        return `${value}°C`;
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchQuery("")

    };

    const handleClearFilter = () => {
        setValue([1, 5]);
        setValue1([100, 3000]);
        setValue2([1, 100]);
    };

    const handleSnackBar = () => {
        setOpenSnackbar(true) && setOpen(false);
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setProduct(false);
    };

    // Memoized getInstruments function
    const getInstruments = useCallback(async () => {
        let query = supabase.from("nextjs_services").select();

        // Filter by rating
        if (value && value[0] !== undefined && value[1] !== undefined) {
            query = query.gte("rating", value[0]).lte("rating", value[1]);
        }

        // Filter by price
        if (value1 && value1[0] !== undefined && value1[1] !== undefined) {
            query = query.gte("price", value1[0]).lte("price", value1[1]);
        }

        // Add search query filter
        if (searchQuery) {
            query = query.ilike("service_title", `%${searchQuery}%`);
        }

        const { data } = await query;
        setData(data);
    }, [value, value1, searchQuery]);

    useEffect(() => {
        getInstruments();
    }, [getInstruments]);

    return (
        <React.Fragment>
            <div className="fixed w-full mx-auto flex justify-cente z-40">
                <SearchBar
                    handleFilter={handleFilter}
                    handleClose={handleClose}
                    handleChange={handleChange}
                    handleChange1={handleChange1}
                    handleChange2={handleChange2}
                    valuetext={valuetext}
                    open={open}
                    value={value}
                    value1={value1}
                    value2={value2}
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    handleClearFilter={handleClearFilter}
                    handleClearSearch={handleClearSearch}

                />
            </div>
            <div className="block align-center justify-center mt-14" style={{ width: "100vw" }}>
                {Data.length === 0 ?
                    <div style={{ minWidth: "100vw", marginTop: "30vh" }} className="flex">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: 0,
                                type: "spring",
                                stiffness: 100,
                                damping: 10,
                                mass: 30,
                                duration: 3,
                            }}
                            className="mx-auto">
                            <Circles
                                height="150"
                                width="150"
                                color="#86f7d5"
                                ariaLabel="circles-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </motion.div>
                    </div>
                    :
                    <div
                        className="sticky align-center justify-center rounded-md py-2.5 z-20 min-w-full">
                        <SupDataMap
                            Data={Data}
                            handleProduct={handleProduct}
                            handleCloseProduct={handleCloseProduct}
                            product={product}
                            productIndex={productIndex}
                            handleSnackbar={handleSnackBar}

                        />
                    </div>
                }
            </div>
            <Snackbar
                open={openSnackbar}
                anchorOrigin={{ "vertical": 'bottom', "horizontal": 'right' }}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <SnackbarContent
                    className={"flex justify-center align-center mx-auto bg-lime-600"}
                    message={
                        <div style={{ color: TextColor }} className="text-center ">Added to your cart</div>
                    }
                />
            </Snackbar>
        </React.Fragment >
    );
};


export default Products;
