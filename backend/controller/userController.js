const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { z } = require('zod')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
    //schema de validation 
    const schema = z.object({
        username: z.string()
            .min(4, {message: "Le nom d'utilisateur doit comporter plus de 3 caractères"})
            .max(20, {message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères"}),
        email: z.string()
            .email({message: "Adresse e-mail est invalide Ex:jean@gmail.com"}),
        password: z.string()
            .min(8, {message: "Le mot de passe doit comporter au moins 8 caractères"})
            .regex(/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d@$!%*?&]+$/, {message: "Le mot de passe doit contenir au moins une lettre majuscule et un chiffre"}),
        confirmPassword: z.string()
    }).refine((val,par) => val.confirmPassword === val.password, {message: "Les mots de passe doivent correspondre",path: ["confirmPassword"]})
    ;
    
    
    const { username, email, password, confirmPassword } = req.body;
    //validation proprement dite
    const validation = schema.safeParse({ username, email, password, confirmPassword })
    if (validation.success) {
        // Handle successful validation
        const parsedValue = validation.data
        console.log("success!", parsedValue)
        const hashedPassword = await bcrypt.hash(parsedValue.password, 10)
        const user = await User.create({username,hashedPassword,email})
        if (!user) {
            res.status(500).send('Something went wrong')
        }
        const token = jwt.sign({ username: user.username, id: user._id }, 'jailbreaf',{expiresIn: 60 * 10});
        res.status(201).json(token)

    } else {
        const validationErrors = validation.error.format();
        // Handle validation issues
        console.error('Validation failed:', validationErrors);
        // res.status(500).json({ message: 'Validation failed', errors: validationErrors });
        res.status(500).json({ errors: validationErrors });

    }
}

const loginUser = async (req, res) => {
    //schema de validation
    const schema = z.object({
        username: z.string()
            .min(4, {message: "Le nom d'utilisateur doit comporter plus de 3 caractères"})
            .max(20, {message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères"}),        
        password: z.string()
            .min(8, {message: "Le mot de passe doit comporter au moins 8 caractères"})
            .regex(/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d@$!%*?&]+$/, {message: "Le mot de passe doit contenir au moins une lettre majuscule et un chiffre"}),
    });
    const { username, password } = req.body;
    const validation = schema.safeParse({ username, password })
    
    
    if (validation.success) {
        const parsedValue = validation.data
        console.log("success!", parsedValue)
        try {
            const user = await User.find({ username: username })
            console.log(user)
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({ message: `nom d'uti;lisateur ou mot de pass invalide` })
        }
    } else {
        const validationErrors = validation.error.format();
        // Handle validation issues
        console.error('Validation failed:', validationErrors);
        res.status(500).json({ message: 'Validation failed', errors: validationErrors });
    }


}

module.exports = { registerUser, loginUser }