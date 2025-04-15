import React from "react";

export const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkc2Vqc3lyZWNyZmZuanFldmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4NTcxOTcsImV4cCI6MjAwNDQzMzE5N30.lQp4_X1_JxGAS3SlmFHgHs8TQs30F35ssfS-0oZOw-k";
export const API_KEY_CLOUDCRAFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhYndweXJybGtqdHBvaHN6cmhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMjI4NzQsImV4cCI6MjA1Nzg5ODg3NH0.gdePSQMQweGXneKFnLq6V3gU1UuilCvIwIIIBwZ-yBI";
export const SUPABASE_URL = "https://sdsejsyrecrffnjqevfm.supabase.co";
export const SUPABASE_URL_CLOUDCRAFT = "https://dabwpyrrlkjtpohszrhr.supabase.co"

export const MainMenuList = [
  {
    "name": 'Food and Treats', "path": "/rent-a-service", "data": "",
    "menu":
      [{ "name": 'Dry Food', "path": "/rent-a-service" },
      { "name": 'Wet Food', "path": "/my-services" },
      { "name": 'Treats', "path": "/rent-a-service" },
      { "name": 'Specialized Diets', "path": "/rent-a-service" }]
  },
  {
    "name": 'Accessories', "path": '/rent-a-service', "menu":
      [{ "name": "Collars and Leashes", "path": "/rent-a-service" },
      { "name": "Toys", "path": "/rent-a-service" },
      { "name": "Beds and Crates", "path": "/rent-a-service" },
      { "name": "Bowls and Feeders", "path": "/rent-a-service" }]
  },
  {
    "name": 'Health & Wellness', "path": '/rent-a-service', "menu":
      [{ "name": "Supplements", "path": "/rent-a-service" },
      { "name": "Medications", "path": "/rent-a-service" },
      { "name": "Grooming Products", "path": "/rent-a-service" },
      { "name": "Dental Care", "path": "/rent-a-service" }]
  }, {
    "name": 'Apparel', "path": '/rent-a-service', "menu":
      [{ "name": "Clothing", "path": "/rent-a-service" },
      { "name": "Shoes and Booties", "path": "/rent-a-service" },
      { "name": "Seasonal Wear", "path": "/rent-a-service" }]
  },
  {
    "name": 'Travel & Outdoor', "path": '/rent-a-service', "menu":
      [{ "name": "Carriers", "path": "/rent-a-service" },
      { "name": "Travel Bowls", "path": "/rent-a-service" },
      { "name": "Outdoor Toys", "path": "/rent-a-service" },
      { "name": "Harnesses", "path": "/rent-a-service" },
      ]
  },
  {
    "name": 'Pet Tech', "path": '/rent-a-service', "menu":
      [{ "name": "GPS Trackers", "path": "/rent-a-service" },
      { "name": "Smart Feeders", "path": "/rent-a-service" },
      { "name": "Interactive Toys", "path": "/rent-a-service" },
      ]
  },
  {
    "name": 'Cleaning & Hygiene', "path": '/rent-a-service', "menu":
      [{ "name": "Litter & Accessories", "path": "/rent-a-service" },
      { "name": "Waste Bags", "path": "/rent-a-service" },
      { "name": "Odor Control", "path": "/rent-a-service" },
      ]
  },
  {
    "name": 'New Arrivals', "path": '/rent-a-service', "menu":
      [{ "name": "Recently Added Products", "path": "/rent-a-service" },

      ]
  },
  {
    "name": 'Deals & Discounts', "path": '/rent-a-service', "menu":
      [{ "name": "Sale Items", "path": "/rent-a-service" },
      { "name": "Bulk Discounts", "path": "/rent-a-service" }

      ]
  }]

export const SubMenuList = [
  { "name": 'Orders', "path": "/orders" },
  { "name": 'Account', "path": "/account" },
  { "name": 'Login / Sign Up', "path": "/login" },
]

export const AppName = "Choowy";
export const BackgroundColor = "#53f559"
export const TextColorHover = "#0A4D68"
export const TextColor = "text-sky-700"
export const FontType = "Pacifico, serif"
export const NavigationBackgroundColor = "to-lime-400 from-cyan-500 via-pink-500"
export const NavigationTextSize = "sm";