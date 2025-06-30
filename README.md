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
|  |  ├── App.css
│  |  ├── App.jsx
|  |  ├── index.css
│  |  └── main.jsx
├── Execution_Video
├── README.md
├── testing Screenshots



##    Features Implemented

# Authentication
-- User Signup/Login (JWT-based)
-- Password strength validation
-- Protected video upload and comment actions

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

# State Management
-- Context API used for user login state
-- LocalStorage used to persist session

# Responsive UI
-- Adaptive layout for mobile/tablet
-- Collapsible sidebar and expandable search


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