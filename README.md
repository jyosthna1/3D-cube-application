# 3D-cube-controller-application : Interactive Web application for real-time rotation and state-persistence.

project Description:
In this project we are building the 3D cube using Three.js.

• Rotation Speed Control: We are using INPUT element to control rotation.
• Position Control: We are using buttons to move the cube left,right,up,down.
• Movement Boundaries: Implementd boundaries to prevent cube from moving off-screen 
• Real-time Updates: When the user clicks on the save button, the cube data will be stored in the database, then in the response we get the saved data, we are storing the id into the local storage, using the id we will reset the data, update the current data, when the page is loaded automatically it will update the cube.If the changes was made and if we didn't update the data into database, then when we clicked on the reset button it will automatically come to the previous state.

Technologies used:
front-end:   html,css,javascript,
back-end:    Node.js,Express.js
database:    Mongodb
libraries:   Three.js for rendering the cube

core feautures :
Rotation speed controller
Directional moment
Boundaries to prevent cube from moving off-screen
Real-time updates


