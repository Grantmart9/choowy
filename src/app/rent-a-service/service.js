
"use client"; // Add this line at the top of your component file
import React, { useState, useEffect, useCallback } from "react";
import { ListItem, TextField, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { createClient } from "@supabase/supabase-js";
import Slider from '@mui/material/Slider';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import { Circles } from 'react-loader-spinner'
import { SUPABASE_URL, API_KEY } from "../supabase";
import Button from "@mui/material/Button";
import Ripple from "./components/Ripple";

const supabase = createClient(SUPABASE_URL, API_KEY);

const SearchBar = ({
    handleFilter,
    handleClose,
    handleChange,
    handleChange1,
    handleChange2,
    valuetext,
    open,
    value,
    value1,
    value2,
    searchQuery,
    handleSearchChange,
    handleClearFilter,
    handleClearSearch
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
                    <span style={{ opacity: 1, color: "#b1fbfc" }}>Filter<Ripple color={"#1fecf9"} duration={2000}></Ripple></span> {/* Ensure text is fully opaque */}
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

const CustomerRating = () => {
    <Rating
        style={{ position: "relative", top: 5, left: 5 }}
        name="Avg rating"
        value={Service.rating ? Service.rating : 0}
        size="medium"
        sx={{ alignItems: "center", justifyItems: "center" }}
    />
}


const SupDataMap = ({ Data }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-4 pb-5">
            {Data.map((Service, index) => (
                <motion.div
                    key={Service.id} // assuming each service has a unique id
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
                    <Button className="block rounded-none bg-gradient-to-b from-transparent to-cyan-500 via-tansparent P-0 shadow-sm shadow-gray-600 h-full w-full">
                        <img
                            alt="test"
                            style={{ maxHeight: "80px", width: "100%" }}
                            src={`data:image/jpeg;base64,${Service.person_logo}`}
                        />
                        <div className="flex text-cyan-100 text-md font-bold my-auto justify-start p-2">
                            R {Service.price}
                        </div>
                        <div className="flex transform-none text-cyan-100 font-sans text-xs my-auto justify-center p-2">
                            Cool Beans
                        </div>
                    </Button>
                </motion.div>
            ))}
        </div>
    );
};


const Service = () => {
    const [Data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([1, 5]); // Rating range
    const [value1, setValue1] = useState([100, 3000]); // Price range
    const [value2, setValue2] = useState([1, 100]); // Distance range
    const [searchQuery, setSearchQuery] = useState("");

    const handleFilter = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                                color="#0A4D68"
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
                            Data={Data} />
                    </div>
                }
            </div>
        </React.Fragment >
    );
};

export default Service;
