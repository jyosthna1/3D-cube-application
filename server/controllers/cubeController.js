const cubeModel = require('../models/CubeModel')

const createCubeValues = async (req,res)=> {
    try{
        const {cubeId,position,rotationSpeed,lastSaved,updatedAt} = req.body
        console.log(rotationSpeed)
        const {x,y,z} = position
        const cube = new cubeModel({
            cubeId,
            position:{
                x,
                y,
                z,
            },
            rotationSpeed,
            lastSaved,
            updatedAt,
        })
        await cube.save()
        res.status(201).json(cube)
    }
    catch(error){
        console.log(`Error ${error}`)
        res.status(500).json({message:"Server Error"})
    }
}

module.exports = {createCubeValues}