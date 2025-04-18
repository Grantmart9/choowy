import React from "react";

export const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkc2Vqc3lyZWNyZmZuanFldmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4NTcxOTcsImV4cCI6MjAwNDQzMzE5N30.lQp4_X1_JxGAS3SlmFHgHs8TQs30F35ssfS-0oZOw-k";
export const API_KEY_CLOUDCRAFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhYndweXJybGtqdHBvaHN6cmhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMjI4NzQsImV4cCI6MjA1Nzg5ODg3NH0.gdePSQMQweGXneKFnLq6V3gU1UuilCvIwIIIBwZ-yBI";
export const SUPABASE_URL = "https://sdsejsyrecrffnjqevfm.supabase.co";
export const SUPABASE_URL_CLOUDCRAFT = "https://dabwpyrrlkjtpohszrhr.supabase.co"

export const MainMenuList = [
  {
    "name": 'Food and Treats', "path": "/products", "data": "",
    "menu":
      [{ "name": 'Dry Food', "path": "/products" },
      { "name": 'Wet Food', "path": "/my-services" },
      { "name": 'Treats', "path": "/products" },
      { "name": 'Specialized Diets', "path": "/products" }]
  },
  {
    "name": 'Accessories', "path": '/products', "menu":
      [{ "name": "Collars and Leashes", "path": "/products" },
      { "name": "Toys", "path": "/products" },
      { "name": "Beds and Crates", "path": "/products" },
      { "name": "Bowls and Feeders", "path": "/products" }]
  },
  {
    "name": 'Health & Wellness', "path": '/products', "menu":
      [{ "name": "Supplements", "path": "/products" },
      { "name": "Medications", "path": "/products" },
      { "name": "Grooming productss", "path": "/products" },
      { "name": "Dental Care", "path": "/products" }]
  }, {
    "name": 'Apparel', "path": '/products', "menu":
      [{ "name": "Clothing", "path": "/products" },
      { "name": "Shoes and Booties", "path": "/products" },
      { "name": "Seasonal Wear", "path": "/products" }]
  },
  {
    "name": 'Travel & Outdoor', "path": '/products', "menu":
      [
        { "name": "Outdoor Toys", "path": "/products" },
        { "name": "Harnesses", "path": "/products" },
      ]
  },
  {
    "name": 'Cleaning & Hygiene', "path": '/products', "menu":
      [{ "name": "Litter & Accessories", "path": "/products" },
      { "name": "Waste Bags", "path": "/products" },
      { "name": "Odor Control", "path": "/products" },
      ]
  },
  {
    "name": 'New Arrivals', "path": '/products', "menu":
      [{ "name": "Recently Added productss", "path": "/products" },

      ]
  },
  {
    "name": 'Deals & Discounts', "path": '/products', "menu":
      [{ "name": "Sale Items", "path": "/products" },
      { "name": "Bulk Discounts", "path": "/products" }

      ]
  }]

export const SubMenuList = [
  { "name": 'Orders', "path": "/orders" },
  { "name": 'Account', "path": "/account" },
  { "name": 'Login / Sign Up', "path": "/login" },
]

export const AppName = "Choowy";
export const BackgroundColor = "rgba(7, 247, 179, 0.7)"
export const TextColorHover = "#0A4D68"
export const TextColor = "text-amber-50"
export const FontType = "Poetsen One, serif"
export const NavigationBackgroundColor = "to-lime-400 from-cyan-500 via-pink-500"
export const NavigationTextSize = "sm";