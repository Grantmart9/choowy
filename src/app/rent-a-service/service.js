
"use client"; // Add this line at the top of your component file
import React, { useState, useEffect, useCallback } from "react";
import { ListItem, TextField, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import { createClient } from "@supabase/supabase-js";
import Slider from '@mui/material/Slider';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import { Circles } from 'react-loader-spinner'
import { SUPABASE_URL, API_KEY } from "../supabase";

const supabase = createClient(SUPABASE_URL, API_KEY);

///<ListItem sx={{ minWidth: "200pt" }}>
///<Typography className="text-gray-900 whitespace-nowrap">Distance </Typography>
///<Slider
///    className="text-gray-800 ml-4"
///    value={value2}
///    onChange={handleChange2}
///    valueLabelDisplay="auto"
///    getAriaValueText={() => `${value2} Km`}
///    max={100}
///    step={5}
///    min={1}
////>
///</ListItem>

const ServiceSearchBar = ({
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
        <div>
            <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{
                    type: "spring",
                    bounce: 0.02,
                    stiffness: 200,
                    damping: 20,
                    mass: 20,
                    duration: 0.5,
                }}
                className="inline-flex mx-2"
            >
                <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    variant="text"
                    className="rounded-r-none shadow-r-none shadow-gray-800 shadow-xs transform-none text-gray-100 md:w-28"
                    style={{
                        background: "rgba(128, 128, 128, 0.25)", // Set the background with 15% opacity
                    }}
                    onClick={handleFilter}
                >
                    <span style={{ opacity: 1 }}>Filter</span> {/* Ensure text is fully opaque */}
                </Button>
                <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    variant="text"
                    onClick={handleClearFilter}
                    style={{
                        background: "rgba(128, 128, 128, 0.25)", // Set the background with 15% opacity
                    }}
                    className="rounded-r-none rounded-l-none shadow-r-none shadow-gray-800 shadow-xs transform-none text-gray-100">
                    <span style={{ opacity: 1 }} >
                        <ClearIcon />
                    </span>
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
                        color="success"
                        style={{
                            background: "rgba(128, 128, 128, 0.25)", // Set the background with 15% opacity
                        }}
                        onChange={handleSearchChange}
                        sx={{ input: { color: 'lime' } }}
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
                    <span style={{ opacity: 1 }} >
                        <ClearIcon />
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

const ServiceMap = ({ Data }) => {
    return (
        <div className="grid lg:grid-cols-5 grid-flow-row gap-4 mt-20 mx-4 pb-5">
            {Data.map((Service, index) => (
                <motion.div
                    key={Service.id} // assuming each service has a unique id
                    initial={{ opacity: 0, height: "0%" }}
                    animate={{ opacity: 1, height: "100%" }}
                    transition={{
                        delay: index * 0.1, // Add staggered delay based on index
                        type: "keyframes",
                        stiffness: 400,
                        damping: 10,
                        mass: 10,
                        duration: 0.3,
                    }}
                >
                    <Stack className="block bg-linear-to-r from-gray-100 to-gray-100 via-gray-300 shadow-md shadow-gray-800 h-full">
                        <img
                            alt="test"
                            style={{ maxHeight: "150pt", width: "100%" }}
                            src={`data:image/jpeg;base64,${Service.person_logo}`}
                        />
                        <div className="flex align-center justify-center my-2">
                            <Rating
                                name="Avg rating"
                                value={Service.rating ? Service.rating : 0}
                                size="medium"
                                sx={{ alignItems: "center", justifyItems: "center" }}
                            />
                        </div>
                        <div className="flex text-gray-700 text-xs font-serif my-auto justify-center">
                            R {Service.price} / {Service.rate_unit}
                        </div>
                        <div className="text-gray-700 text-2xl font-serif text-center justify-center font-bold">
                            <div className="ml-5">{Service.service_title.toUpperCase()}</div>
                            <div className="w-full h-0.5 bg-linear-to-r from-cyan-950 to-cyan-950 via-cyan-600 px-2"></div>
                        </div>
                        <div className="flex p-4 text-center align-center justify-center">
                            <div className="text-gray-700 text-md font-serif text-center justify-center">
                                {Service.service_description}
                            </div>
                        </div>
                    </Stack>
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

        // Filter by distance
        // if (value2 && value2[0] !== undefined && value2[1] !== undefined) {
        //     query = query.gte("distance", value2[0]).lte("distance", value2[1]);
        // }

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
            <div className="mt-14">
                <div className="block align-center justify-center">
                    <div>
                        <div className="flex align-center justify-center">
                            <ServiceSearchBar
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
                                className="flex align-center justify-center mb-2"
                            />
                        </div>
                        {Data.length === 0 ?
                            <div style={{ marginTop: "30vh" }} className="flex align-center justify-center">
                                <Circles
                                    height="200"
                                    width="200"
                                    color="#b1fa07"
                                    ariaLabel="circles-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </div>
                            : <ServiceMap Data={Data} />
                        }
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
};

export default Service;
