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
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import QrCodeIcon from '@mui/icons-material/QrCode';
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
      "name": 'Services', "path": "/rent-a-service", "icon": <VolunteerActivismIcon />,
      "submenu":
        [{ "name": 'My Services', "path": "/my-services" },
        { "name": 'Rent A Service', "path": "/rent-a-service" }]
    },
    {
      "name": 'Loyalty Points', "path": "/loyalty", "icon": <CardMembershipIcon />,
      "submenu": []
    },
    {
      "name": 'Tokens', "path": "/tokens", "icon": <QrCodeIcon />,
      "submenu":
        [{ "name": 'My tokens', "path": "/my-tokens" },
        { "name": 'Token History', "path": "/token-history" },
        { "name": 'Scan Token', "path": "/scan-token" },
        ]
    }]

  const SubMenuList = [
    { "name": 'Account', "path": "/account", "icon": <AccountBoxIcon /> },
    { "name": 'Login / Sign Up', "path": "/login", "icon": <LoginIcon /> },
  ]


  const DrawerList = (
    <Box
      sx={{ width: 250, height: "100vh" }}
      className="bg-linear-to-br from-cyan-900 to-red-600  bg-repeat-y"
      role="presentation"
      onClick={toggleDrawer(false)}>
      <Button
        className="flex align-center justify-center"
        sx={{ textTransform: "none" }} href="/">
        <div style={{ fontFamily: "Pacifico, serif" }} className="p-1 text-3xl font-semibold text-center justify-center text-cyan-50 mt-2">
          TemoServe
        </div>
      </Button>
      <List className="mt-4 mb-3">
        {MenuList.map((menuItem, index) => (
          <ListItem className="grid grid-flow-row gap-0 w-full" key={index} disablePadding>
            <ListItemButton
              divider={true}
              disabled={true}
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
                }} className=" font-sans">
                {menuItem.icon}
              </ListItemIcon>
            </ListItemButton>
            <List className="grid grid-flow-row gap-0">
              {menuItem.submenu.map((submenubutton, index) =>
                <ListItemButton
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
