const express = require('express')
const router = express.Router()
const Questions = require('../models/questions')

router.get('/',async (req,res)=>{
    try{
        const questions = await Questions.find()
        res.status(200).json(questions)
    }catch(err){
        res.status(500).send(err)
    }
})

router.post('/', async(req,res)=>{
    try{
    const {question, options ,answer } = req.body
    const newQuestion = new Questions({
        question: question,
        options: options ,
        answer: answer
    })
    const uploadedQuestion = newQuestion.save()
    res.status(200).json(uploadedQuestion)
    }catch(err){
        res.json(err)
    }

})

router.put('/update/:id', async (req,res) =>{
    
})


module.exports = router