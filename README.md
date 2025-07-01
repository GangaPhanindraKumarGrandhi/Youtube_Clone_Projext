#     YouTube Clone (MERN Stack Project)

This is a full-stack YouTube Clone application built using the **MERN** (MongoDB, Express.js, React.js, Node.js) stack. Users can create channels, upload videos, add or update comment, and manage their content.

##    Project Structure

Youtube Project/
├── back-end/ # Node.js + Express + MongoDB
├─├─  middleware/
│ ├── models/
│ ├── routes/
│ ├── controllers/
├─├─  insertData.js
│ └── server.js
├── front-end/ # React (Vite) UI
├──├──src/
│  |  ├── components/
│  |  ├── context/
|  |  ├── hook/
|  |  ├── Images/
|  |  |── utils/
|  |  ├── App.css
│  |  ├── App.jsx
|  |  ├── index.css
│  |  └── main.jsx
├── Execution_Video
├── README.md
├── testing Screenshots 
|── Execution Video



##    Features Implemented

# Authentication
-- User Signup/Login (JWT-based)
-- Password strength validation
-- Protected video upload and comment actions

# User Login/Signup 
-- Allow users to log in and log out as needed
-- Allow users to register with or without a Avtar(profile photo)
   -- If the user uploads an image, it will be displayed as the Avtar
   -- If not, the first letter of the username will be displayed as the Avtar

# Video Functionality
-- Upload, edit, and delete videos
-- View video with iframe and fallback loading
-- Filter by category and search videos

#  Commenting System
-- Add, edit, delete comments
-- Only comment owner can edit/delete
-- Mobile comment truncation + show more

# Channels
-- Create a channel
-- View channel info and related videos
-- Allow users to delete their channel
-- Allow users to create a channel with or without a channel logo (channel banner)
   -- If the user uploads an image, it will be displayed as the logo
   -- If not, the first letter of the username will be displayed as the logo

# State Management
-- Context API used for user login state
-- LocalStorage used to persist session

# Responsive UI
-- Adaptive layout for mobile/tablet
-- Collapsible sidebar and expandable search

# Filter Videos
-- Allow users to filter/search videos based on category buttons and search input
-- When a user adds a new video, the filter bar updates to include the new category 
-- If a category has no videos (i.e., length is 0), its filter button is removed automatically


####    Technologies Used

## Frontend:
-- React, Vite, Axios, React Router DOM

## Backend:
-- Express.js, MongoDB, Mongoose, JWT

## Styling:
-- CSS, conditional styling, responsive layouts

## Notifications:
-- `react-toastify`


######     Setup Instructions         ####

#  Prerequisites
-- Node.js & npm
-- MongoDB installed

## Backend Setup(/back-end)

--  cd back-end
--  npm install
--  node insertData.js
--  npm start

## Frontend Setup(/front-end)

-- cd front-end
-- npm install
-- npm run dev


####     GitHub Repository     ####

-- URL: https://github.com/GangaPhanindraKumarGrandhi/Youtube_Clone_Projext.git