
// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube geometry and material
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff99 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 2);
scene.add(light);

let rotationSpeed = parseFloat(document.getElementById('rotation-slider').value);
document.getElementById('rotation-slider').addEventListener('input', (event) => {
  rotationSpeed = parseFloat(event.target.value);
});

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += rotationSpeed;
  cube.rotation.y += rotationSpeed;

  renderer.render(scene, camera);
}

animate();

const moveAmount = 0.2;
// according to the screen size
function calculateBoundaries() {
  const aspect = window.innerWidth / window.innerHeight;
  const fovRad = (camera.fov * Math.PI) / 180;

  const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
  const visibleWidth = visibleHeight * aspect;

  const cubeSize = 1; 
  const boundaryX = visibleWidth / 2 - cubeSize / 2;
  const boundaryY = visibleHeight / 2 - cubeSize / 2;

  return { boundaryX, boundaryY };
}

let boundaries = calculateBoundaries();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  boundaries = calculateBoundaries();
});


function move(axis, delta) {
  const max = axis === 'x' ? boundaries.boundaryX : boundaries.boundaryY;
  const newPos = cube.position[axis] + delta;

  if (Math.abs(newPos) <= max) {
    cube.position[axis] = newPos;
  } else {
    alert("cube hit the screen boundary");
  }
}


document.getElementById('move-up').onclick = () => move('y', moveAmount);
document.getElementById('move-down').onclick = () => move('y', -moveAmount);
document.getElementById('move-left').onclick = () => move('x', -moveAmount);
document.getElementById('move-right').onclick = () => move('x', moveAmount);


const cubeId = "cube_1";

const save = document.getElementById("save")
const updatingState = document.getElementById('updatingState')
let message = document.getElementById("message")

// Saving the cube data

save.addEventListener('click' , async() => {
  message.textContent = ''
  let rotationSpeed = document.getElementById('rotation-slider').value;
    const newCubeData = {
      cubeId:'cube_1',
      position:{
        x:cube.position.x,
        y:cube.position.y,
        z:cube.position.z,
      },
      rotationSpeed,
      lastSaved: new Date(),
    }
    try{
      let response = await fetch('http://localhost:3000/api/cubes',{
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(newCubeData),
      })
      if(response.ok){
        const data = await response.json()
        localStorage.setItem("key",data.newCube._id)
        message.textContent = "New Cube Added To Database."
      }
    }catch(error){
      message.textContent = `Error: ${error}`
    }
})
// Updating the cube data

  updatingState.addEventListener("click" , async () => {
    message.textContent = ''
    let id = localStorage.getItem("key")
    let rotationSpeed = document.getElementById('rotation-slider').value;
    const updatedData = {
      position:{
        x:cube.position.x,
        y:cube.position.y,
        z:cube.position.z,
      },
      rotationSpeed,
    }

    try{
      let response = await fetch(`http://localhost:3000/api/cubes/${id}/save`,{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body : JSON.stringify(updatedData),
      })
      if(response.ok){
        message.textContent = "Updated Successfuly."
      }else{
        message.textContent = 'update failed.';
      }
    }catch(error){
      message.textContent = `Error:${error}`;
    }
  })

// page loaded
window.addEventListener('DOMContentLoaded', async () => {
  message.textContent = ''
  let id = localStorage.getItem("key")
  if(id !== null){
    let response = await fetch(`http://localhost:3000/api/cubes/${id}`)
    let data = await response.json()
      if (!response.ok) {
        message.textContent = "Fetching the data Failed.";
      }
      else{
        document.getElementById("rotation-slider").value = data.rotationSpeed
        cube.position.set(data.position.x,data.position.y,data.position.z)
      }
  }
})


const reset = document.getElementById("reset")
    
reset.addEventListener('click', async () => {
  message.textContent = ''
  let id = localStorage.getItem("key")
  const updateCubeState = (newRotationSpeed, newPosition) => {
      cube.position.set(newPosition.x, newPosition.y, newPosition.z);
      rotationSpeed = newRotationSpeed;
      };
  try{
    let response = await fetch(`http://localhost:3000/api/cubes/${id}/reset`,{
      method:'POST',
    })
    const data = await response.json()
    if (response.ok){
      let newRotationSpeed = data.cube.rotationSpeed;
      let newPosition = data.cube.position;
      updateCubeState(newRotationSpeed,newPosition)
      document.getElementById('rotation-slider').value = newRotationSpeed;
    }
    else{
      alert("Cube Reset Failed")
    }
  }catch(error){
    alert("Error:" ,error)
  }
})