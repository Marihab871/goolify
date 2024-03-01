const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalsModel')


const getGoals = asyncHandler(async(req,res) =>{
    const goals = await Goal.find()
    if(!goals){
        console.log(goals);
    }
    res.status(200).json({message:'Get goals'})
})

const setGoal = asyncHandler(async(req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message:'Set goals'})
})

const updateGoal = asyncHandler(async(req,res) =>{
    res.status(200).json({message:`Update goals ${req.params.id}`})
})

const deleteGoal = asyncHandler(async(req,res) =>{
    res.status(200).json({message:`Delete goals ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}