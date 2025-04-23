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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AddIcon from '@mui/icons-material/Add';
import {
  SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT,
  AppName,
  BackgroundColor,
  TextColor,
  FontType,
  NavigationTextSize,
  MainMenuList,
  SubMenuList
} from "./supabase";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(SUPABASE_URL_CLOUDCRAFT, API_KEY_CLOUDCRAFT);
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
        width: 280,
        height: "100%",
        overflow: "auto",
        minHeight: "100vh",
      }}
      className={` bg-[url(./background.svg)] `}
      role="presentation">
      <Button
        fullWidth={true}
        className="flex align-center justify-center mb-7"
        sx={{ textTransform: "none", padding: 0 }}
        href="/"
      >
        <div style={{ backgroundColor: "rgba(245, 83, 2, 0.7)", width: "100%" }} >
          <div
            style={{ fontFamily: "cursive", fontWeight: "bolder", fontStyle: "italic", fontSize: "55px", rotate: "-7deg" }}
            className={`text-center justify-center ${TextColor}`}
          >
            {AppName}
          </div>
        </div>
      </Button>
      <div className="ml-1 mr-1" style={{ backgroundColor: "rgba(245, 83, 2, 0.45)" }} >
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

                }
              }}
              expandIcon={<AddIcon style={{ width: "15px", height: "15px" }} className={`${TextColor}`} />}
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
      </div>
      <Divider />
      <div className="ml-1 mr-1" style={{ backgroundColor: "rgba(245, 83, 2, 0.45)" }}>
        <List className="mt-10">
          {SubMenuList.map((menuItem, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                className={`${TextColor}`}
                sx={{
                  minWidth: 250,
                  '&:hover': {
                    backgroundColor: BackgroundColor,

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

            }
          }}
        >
          <div style={{ fontFamily: FontType }} className={`${TextColor} text-${NavigationTextSize}`}>Logout</div>
        </ListItemButton>
      </div>
    </Box>
  );

  return (
    <html lang="en" className="flex h-full items-center justify-center">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Bona+Nova+SC:ital,wght@0,400;0,700;1,400&family=Dancing+Script&family=Faculty+Glyphic&family=Geist:wght@100..900&family=Nanum+Gothic&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poetsen+One&display=swap" rel="stylesheet" />
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
