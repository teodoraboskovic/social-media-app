1. Project Setup
This project consists of two applications built with Node.js and React. Below are the detailed steps for downloading, installing, and running the application.
1.1 Downloading the Project
To get started, download the project in your preferred format (ZIP or clone the repository), extract it, and open it in a supported development environment such as Visual Studio Code.
1.2 Running the Backend Application (Node.js)
1.2.1 Open a new terminal and execute the following commands:
   cd Backend
   npm init
   npm install
   npm start
1.3 Create an online MongoDB database.
1.4 Update the .env file and the corresponding JSON file to ensure the correct database connection.
1.5 To apply migrations, run the following commands in the terminal:
   1.5.1 Apply migrations:
   migrate-mongo up
   1.5.2 Rollback migrations:
   migrate-mongo down
1.6 Running the Frontend Application (React)
1.6.1 Open a new terminal and run the following commands:
   cd Frontend
   cd myapp
   npm install
   npm start   
2. Features
This application functions as a social media platform, allowing users to interact and share content.
Key features include:
User Registration and Authentication – Users must sign up before accessing the platform.
Post Creation and Viewing – Users can create posts containing text and multimedia content.
Interactions – Users can like, comment, and view reactions on posts.
Friends List and User Search – Users can add friends, search for profiles, and manage their friend list.
Administrator Privileges – Admin users can remove inappropriate content.
Navigation and UX – An intuitive navigation menu allows easy switching between home, profile, and friends list.
Additional Features – Includes notifications, weather display, an online user list, and advertisements.
2.1 User Roles:
2.1.1 Content Creator – Can create posts, manage friends, comment, and react to posts.
2.1.2 Visitor User – Can view and interact with posts but cannot create their own content.
2.1.3 Administrator – Has moderation rights and can remove inappropriate content in addition to standard user functionalities.
