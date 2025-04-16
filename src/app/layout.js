"use client";
import { ThemeProvider } from "@mui/material";
import { Montserrat } from "next/font/google";
import React, { useState } from "react";
import theme from "./themeprovider";
import "./globals.css";
import IconButton from "@mui/material/IconButton";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';


import {
  SUPABASE_URL, API_KEY,
  AppName,
  BackgroundColor,
  TextColorHover,
  TextColor,
  FontType,
  NavigationBackgroundColor,
  NavigationTextSize,
  MainMenuList,
  SubMenuList
} from "./supabase";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(SUPABASE_URL, API_KEY);
const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error during logout:", error.message);
    } else {
      // Optionally, you can also remove the token from localStorage or cookies if needed
      localStorage.removeItem("access_token");
      // Redirect the user or update state (e.g., user is logged out)
      window.location.href = "/login"; // Or use your preferred method to redirect
    }
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        overflow: "auto",
        minHeight: "100vh",
      }}
      className={` bg-[url(./background.svg)] `}
      role="presentation">
      <Button
        className="flex align-center justify-center mb-7"
        sx={{ textTransform: "none" }}
        href="/"
      >
        <div
          style={{ fontFamily: FontType }}
          className={`p-1 text-3xl font-semibold text-center  justify-center ${TextColor} mt-2`}
        >
          {AppName}
        </div>
      </Button>
      {MainMenuList.map((list, index) => (
        <Accordion
          key={index}
          elevation={0}
          className="bg-transparent"
        >
          <AccordionSummary
            sx={{
              '&:hover': {
                backgroundColor: BackgroundColor,
                color: TextColorHover,
              }
            }}
            expandIcon={<ArrowDownwardIcon style={{ width: "15px", height: "15px" }} className={`${TextColor}`} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography
              style={{ fontFamily: FontType }} className={`${TextColor} text-${NavigationTextSize}`}
              component="span">{list.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <List className="grid grid-flow-row gap-0">
                {list.menu.map((submenubutton, subIndex) => (
                  <ListItemButton
                    className={`${TextColor}`}
                    sx={{
                      '&:hover': {
                        backgroundColor: BackgroundColor,
                        color: TextColorHover,
                      }
                    }}
                    key={subIndex}
                    href={submenubutton.path}
                    onClick={toggleDrawer(false)} // Close drawer on click
                  >
                    <div style={{ fontFamily: FontType }} className={`text-${NavigationTextSize}`}>{submenubutton.name}</div>
                  </ListItemButton>
                ))}
              </List>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Divider />
      <List className="mt-10">
        {SubMenuList.map((menuItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              className={`${TextColor}`}
              sx={{
                minWidth: 250,
                '&:hover': {
                  backgroundColor: BackgroundColor,
                  color: TextColorHover,
                }
              }}
              href={menuItem.path}
            >
              <div style={{ fontFamily: FontType }} className={`${TextColor} text-${NavigationTextSize}`}>{menuItem.name}</div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ListItemButton
        onClick={handleLogout}
        className={`${TextColor}`}
        sx={{
          minWidth: 250,
          '&:hover': {
            backgroundColor: BackgroundColor,
            color: TextColorHover,
          }
        }}
      >
        <div style={{ fontFamily: FontType }} className={`${TextColor} text-${NavigationTextSize}`}>Logout</div>
      </ListItemButton>
    </Box>
  );

  return (
    <html lang="en" className="flex h-full items-center justify-center">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      <body
        className={`${montserrat.className} h-full w-full bg-[url(./background.svg)] bg-repeat bg-cover bg-fixed`}
      >
        <div
          style={{ height: "44px" }}
          className="fixed bg-black opacity-50 w-full z-30">
        </div>
        <div className="z-50 fixed my-auto left-1" >
          <IconButton
            onClick={toggleDrawer(true)}
            size="medium">
            <MenuRoundedIcon
              sx={{ color: "#b1fbfc" }}
            />
          </IconButton>
        </div>
        <Drawer
          transitionDuration={900} // Matches the toggleDrawer delay
          disableScrollLock={true}
          open={open}
          onClose={toggleDrawer(false)}
        >
          {DrawerList}
        </Drawer>
        <div className="z-50 fixed my-auto right-1">
          <IconButton
            size="medium" href="/cart">
            <ShoppingCartIcon
              sx={{ color: "#b1fbfc" }}
            />
          </IconButton>
        </div>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
