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
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, API_KEY } from "./supabase";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const supabase = createClient(SUPABASE_URL, API_KEY);

const AppName = "Choowy";
const BackgroundColor = "#04b9c9"
const TextColorHover = "#0A4D68"
const TextColor = "text-sky-900"
const NavigationBackgroundColor = "to-teal-600 from-emerald-200"


const MenuList = [
  {
    "name": 'Food and Treats', "path": "/rent-a-service", "data": "",
    "menu":
      [{ "name": 'Dry Food', "path": "/my-services" },
      { "name": 'Wet Food', "path": "/rent-a-service" },
      { "name": 'Treats', "path": "/rent-a-service" },
      { "name": 'Specialized Diets', "path": "/rent-a-service" }]
  },
  {
    "name": 'Accessories', "path": '/rent-a-service', "icon": <ShoppingBasketIcon />, "menu":
      [{ "name": "Collars and Leashes", "path": "/rent-a-service" },
      { "name": "Toys", "path": "/rent-a-service" },
      { "name": "Beds and Crates", "path": "/rent-a-service" },
      { "name": "Bowls and Feeders", "path": "/rent-a-service" }]
  },
  {
    "name": 'Health & Wellness', "path": '/rent-a-service', "icon": <ShoppingBasketIcon />, "menu":
      [{ "name": "Supplements", "path": "/rent-a-service" },
      { "name": "Medications", "path": "/rent-a-service" },
      { "name": "Grooming Products", "path": "/rent-a-service" },
      { "name": "Dental Care", "path": "/rent-a-service" }]
  }, {
    "name": 'Apparel', "path": '/rent-a-service', "icon": <ShoppingBasketIcon />, "menu":
      [{ "name": "Clothing", "path": "/rent-a-service" },
      { "name": "Shoes and Booties", "path": "/rent-a-service" },
      { "name": "Seasonal Wear", "path": "/rent-a-service" }]
  },
  {
    "name": 'Travel & Outdoor', "path": '/rent-a-service', "icon": <ShoppingBasketIcon />, "menu":
      [{ "name": "Carriers", "path": "/rent-a-service" },
      { "name": "Travel Bowls", "path": "/rent-a-service" },
      { "name": "Outdoor Toys", "path": "/rent-a-service" },
      { "name": "Harnesses", "path": "/rent-a-service" },
      ]
  },
  {
    "name": 'Pet Tech', "path": '/rent-a-service', "icon": <ShoppingBasketIcon />, "menu":
      [{ "name": "GPS Trackers", "path": "/rent-a-service" },
      { "name": "Smart Feeders", "path": "/rent-a-service" },
      { "name": "Interactive Toys", "path": "/rent-a-service" },
      ]
  },
  {
    "name": 'Cleaning & Hygiene', "path": '/rent-a-service', "icon": <ShoppingBasketIcon />, "menu":
      [{ "name": "Litter & Accessories", "path": "/rent-a-service" },
      { "name": "Waste Bags", "path": "/rent-a-service" },
      { "name": "Odor Control", "path": "/rent-a-service" },
      ]
  },
  {
    "name": 'Training Supplies', "path": '/rent-a-service', "icon": <ShoppingBasketIcon />, "menu":
      [{ "name": "Clickers", "path": "/rent-a-service" },
      { "name": "Training Pads", "path": "/rent-a-service" },
      { "name": "Training Treats", "path": "/rent-a-service" },
      ]
  },
  {
    "name": 'Small Pets & Exotics', "path": '/rent-a-service', "icon": <ShoppingBasketIcon />, "menu":
      [{ "name": "Birds", "path": "/rent-a-service" },
      { "name": "Reptile Care", "path": "/rent-a-service" },
      { "name": "Small Mammals", "path": "/rent-a-service" },
      ]
  },
  {
    "name": 'New Arrivals', "path": '/rent-a-service', "icon": <ShoppingBasketIcon />, "menu":
      [{ "name": "Recently Added Products", "path": "/rent-a-service" },

      ]
  },
  {
    "name": 'Deals & Discounts', "path": '/rent-a-service', "icon": <ShoppingBasketIcon />, "menu":
      [{ "name": "Sale Items", "path": "/rent-a-service" },
      { "name": "Bulk Discounts", "path": "/rent-a-service" }

      ]
  }]

const SubMenuList = [
  { "name": 'Orders', "path": "/login", "icon": <LoginIcon /> },
  { "name": 'Account', "path": "/account", "icon": <AccountBoxIcon /> },
  { "name": 'Login / Sign Up', "path": "/login", "icon": <LoginIcon /> },
]

const MenuIconButton = ({ toggleDrawer }) => {
  return (
    <IconButton size="large"
      fullWidth={false}
      className="rounded-full"
      onClick={toggleDrawer}
      sx={{
        backgroundColor: "transparent",
        color: 'whitesmoke',
      }}
    >
      <MenuIcon />
    </IconButton>
  )
}

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
        minHeight: "100vh"
      }}
      role="presentation"
      className={`bg-linear-to-br ${NavigationBackgroundColor}`}>
      <Button
        className="flex align-center justify-center mb-7"
        sx={{ textTransform: "none" }}
        href="/"
      >
        <div
          style={{ fontFamily: "Pacifico, serif" }}
          className={`p-1 text-3xl font-semibold text-center justify-center ${TextColor} mt-2`}
        >
          {AppName}
        </div>
      </Button>
      {MenuList.map((list, index) => (
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
            expandIcon={<ArrowDownwardIcon className={`${TextColor}`} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography
              className={`${TextColor}`}
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
                    <ListItemText className="font-sans text-sm" primary={submenubutton.name} />
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
              <ListItemText className={`font-sans ${TextColor}`} primary={menuItem.name} />
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
        <ListItemText className={`font-sans ${TextColor}`} primary={"Logout"} />
      </ListItemButton>
    </Box>
  );

  return (
    <html lang="en" className="flex h-full items-center justify-center">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      <body
        className={`${montserrat.className} h-full w-full bg-[url(./background.svg)] bg-repeat`}
      >
        <div className="z-50 fixed mt-1 ml-1 ">
          <MenuIconButton
            toggleDrawer={toggleDrawer(true)} />
        </div>
        <Drawer
          transitionDuration={800} // Matches the toggleDrawer delay
          disableScrollLock={true}
          open={open}
          onClose={toggleDrawer(false)}
        >
          {DrawerList}
        </Drawer>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
