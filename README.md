# 3D-cube-controller-apllication: An Interactive 3D cube conroller built with Three.js, Node.js, MongoDB.

##Features

•	Real-time cube rotation and movement.
•	State persistence using MongoDB.
•	Responsive design with dynamic boundaries.
•	RESTful API integration for state managment.

project Description:
In this project we are building the 3D cube.
•	Rotation Speed Control: We are using INPUT element to control rotation.
•	Position Control: We are using buttons to move the cube left,right,up,down.
•	Movement Boundaries: Implemented boundaries to prevent cube from moving off-screen.
•	Real-time Updates:  When the user clicks on the save button, the cube data will be stored in the database, then in the response we get the saved data, we are storing the id into the local storage, using the id we will reset the data, update the current data, when the page is loaded automatically it will update the cube. If the changes was made and if we didn't update the data into database, then when we clicked on the reset button it will automatically come to the previous state.

Technologies used:
Front-end:   html,css,javascript,
Back-end:    Node.js,Express.js
Database:    MongoDB
libraries:   Three.js for rendering the cube

3d-cube-controller/
│
├── client/               # HTML, CSS, JS, Three.js
│   ├── index.html
│   ├── script.js
│   ├── style.css
│
├── server/               # Node.js + Express API
│   ├── controllers/
│   ├── models/
│   ├── Routes/
|   └── cube-data.js
|   
│
├── README.md


clone the repositery:
git clone https://github.com/jyosthna1/3D-cube-application.git
cd 3D-cube-application

Install backend dependencies :
cd server
npm install

setup Environmental variables
create .env file in the backend directory
port = 3000
MONGODB_URI=mongodb://localhost:5500/3DCubeApp

start the backend server
npm start

open Frontend :
Open client/index.html in your browser (or use Live Server in VS code).




