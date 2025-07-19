const express = require("express");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const CubeModelSchema = require("./models/CubeModel")
const app = express();
const cors = require("cors")
const router = express.Router()
const {MongoClient} = require("mongodb")

const port = process.env.PORT || 3000
app.use(express.json());

dotEnv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Mongoose connected to MongoDB");
}).catch((error) => {
  console.log(`Mongoose connection error: ${error}`);
});


app.use(cors({
    origin:'http://127.0.0.1:5500',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}))

// creating new data
app.post('/api/cubes', async(req,res) => {
  try{
    const newCube = new CubeModelSchema(req.body)
    await newCube.save()
    return res.json({newCube})
  }catch(error){
    res.status(500)
  }
})

// updating cube
app.post('/api/cubes/:id/save',async (req,res) => {
  const {position,rotationSpeed} = req.body
  try{
    let cube = await CubeModelSchema.findById(req.params.id);
    if(cube){
      // updating cube
    cube.position = position,
    cube.rotationSpeed = rotationSpeed,
    await cube.save()
    return res.json({message: 'Cube State Updated'})
    }
    else{
      res.json({message: 'Cube Not Found'})
    }
  }
  catch(error){
    res.status(500).json({message: 'saving failed',error})
  }
})

// fetching the data
app.get('/api/cubes/:id', async (req, res) => {
  try {
    const cube = await CubeModelSchema.findById(req.params.id);
    if (!cube) return res.status(404).json({ message: "Cube not found" });
    res.json(cube); // Sends data to frontend
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// reseting the data
app.post('/api/cubes/:id/reset', async (req,res) => {
  try{
    const cube = await CubeModelSchema.findByIdAndUpdate(req.params.id);
    if(!cube) return res.status(404).json({message: 'Cube not found'});
    res.json({message: "Cube reset to default", cube})
  }
  catch(error){
    res.status(500).json({message:'Reset failed', error})
  }
})

app.listen(port, () =>{
    console.log(`server started and running at ${port}`)
})
module.exports = router;


