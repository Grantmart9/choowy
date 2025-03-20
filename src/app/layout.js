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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, API_KEY } from "./supabase";

const supabase = createClient(SUPABASE_URL, API_KEY);

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


  const MenuList = [
    {
      "name": 'Products', "path": "/rent-a-service", "icon": <ShoppingBagIcon />,
      "submenu":
        [{ "name": 'Food', "path": "/my-services" },
        { "name": 'Treats', "path": "/rent-a-service" },
        { "name": 'Nutrition', "path": "/rent-a-service" },
        { "name": 'Toys', "path": "/rent-a-service" }]
    }, {
      "name": 'Orders', "path": '/rent-a-service', "icon": <ShoppingBasketIcon />, "submenu":
        [{ "name": "Single Orders", "path": "/rent-a-service" },
        { "name": "Recuring Orders", "path": "/rent-a-service" },
        { "name": "Order History", "path": "/rent-a-service" }]
    }]

  const SubMenuList = [
    { "name": 'Account', "path": "/account", "icon": <AccountBoxIcon /> },
    { "name": 'Login / Sign Up', "path": "/login", "icon": <LoginIcon /> },
  ]

  const textColor = "text-pink-500"


  const DrawerList = (
    <Box
      sx={{ width: 250, height: "100vh" }}
      className="bg-linear-to-br from-lime-400 to-cyan-400  bg-repeat-y"
      role="presentation"
      onClick={toggleDrawer(false)}>
      <Button
        className="flex align-center justify-center"
        sx={{ textTransform: "none" }} href="/">
        <div style={{ fontFamily: "Pacifico, serif" }} className='p-1 text-3xl font-semibold text-center justify-center text-pink-500 mt-2'>
          Choowy
        </div>
      </Button>
      <List className="mt-4 mb-3">
        {MenuList.map((menuItem, index) => (
          <ListItem className="grid grid-flow-row gap-0 w-full" key={index} disablePadding>
            <ListItemButton
              divider={true}
              disabled={true}
              className="text-pink-500"
              sx={{
                minWidth: 250,
                color: "whitesmoke",
                '&:hover': {
                  backgroundColor: '#80cae8',
                  color: 'white',
                }
              }}
            >
              <ListItemText
                className="font-sans text-md"
                primary={menuItem.name} />
              <ListItemIcon
                sx={{
                  color: "whitesmoke",
                  '&:hover': {
                    backgroundColor: '#80cae8',
                    color: 'white',
                  }
                }} className="text-pink-500">
                {menuItem.icon}
              </ListItemIcon>
            </ListItemButton>
            <List className="grid grid-flow-row gap-0">
              {menuItem.submenu.map((submenubutton, index) =>
                <ListItemButton
                  className="text-pink-500"
                  sx={{
                    minWidth: 250,
                    color: "whitesmoke",
                    '&:hover': {
                      backgroundColor: '#80cae8',
                      color: 'white',
                    }
                  }}
                  key={index}
                  href={submenubutton.path}>
                  <ListItemText className="font-sans text-sm" primary={submenubutton.name} />
                </ListItemButton>
              )}
            </List>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List className="mt-10">
        {SubMenuList.map((menuItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              className="text-pink-500"
              sx={{
                minWidth: 250,
                color: "whitesmoke",
                '&:hover': {
                  backgroundColor: '#80cae8',
                  color: 'white',
                }
              }} href={menuItem.path}>
              <ListItemText className="text-cyan-50 font-sans" primary={menuItem.name} />
              <ListItemIcon
                sx={{
                  color: "whitesmoke",
                  '&:hover': {
                    backgroundColor: '#80cae8',
                    color: 'white',
                  }
                }} className="text-cyan-50 font-sans">
                {menuItem.icon}
              </ListItemIcon>

            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ListItemButton
        onClick={handleLogout}
        sx={{
          minWidth: 250,
          color: "whitesmoke",
          '&:hover': {
            backgroundColor: '#80cae8',
            color: 'white',
          }
        }}
      > <ListItemText className="font-sans" primary={"Logout"} />
        <ListItemIcon
          sx={{
            color: "whitesmoke",
            '&:hover': {
              backgroundColor: '#80cae8',
              color: 'white',
            }
          }} className="text-cyan-50 font-sans">
          <LogoutIcon />
        </ListItemIcon>
      </ListItemButton>
    </Box>
  );

  return (
    <html lang="en" className="flex h-full items-center justify-center">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      <body
        className={`${montserrat.className} h-full w-full bg-[url(./background.svg)] bg-fixed`}
      >
        <div className="z-50 fixed mt-1 ml-1">
          <MenuIconButton toggleDrawer={toggleDrawer(true)} />
        </div>
        <Drawer
          transitionDuration={800}
          disableScrollLock={true}
          variant="temporary"
          elevation={20}
          open={open}
          onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
