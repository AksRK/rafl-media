import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import {
    registerValidation,
    loginValidation,
    postCreateValidation,
    creatorCreateValidation,
    creatorUpdateValidation,
    creatorPostCreateValidation} from './validations/validations.js';

import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from "./utils/handleValidationErrors.js";

import * as UserController from "./controllers/UserController.js";
import * as CreatorController from "./controllers/CreatorController.js";
import * as CreatorPostController from "./controllers/CreatorPostController.js";
import * as PostController from "./controllers/PostController.js";


import cors from 'cors'


mongoose
    .connect('mongodb+srv://admin:wwwwww@cluster0.odjoyaf.mongodb.net/rafl-media?retryWrites=true&w=majority',)
    .then(() => {console.log('DB connect')})
    .catch((err) => {console.log('DB err', err)})

const app = express();

const baseUrl = 'http://localhost:4444/'

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hi')
})

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register',checkAuth, registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/uploads',  upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
        fullUrl: `${baseUrl}uploads/${req.file.originalname}`
    })
})

app.get('/creator', CreatorController.getAll)
app.get('/creator/:id', CreatorController.getOne)
app.get('/creator/login/:login', CreatorController.getOneByLogin)
app.post('/creator', checkAuth, creatorCreateValidation , handleValidationErrors, CreatorController.create)
app.patch('/creator/:id', checkAuth, creatorUpdateValidation , handleValidationErrors, CreatorController.update)
app.delete('/creator/:id', checkAuth, CreatorController.remove);

app.get('/creator/posts/:id', CreatorPostController.getOne)
app.get('/creator/posts/title/:title', CreatorPostController.getOneByTitle)
app.get('/creator/posts/login/:creator', CreatorPostController.getCreatorPosts)
app.post('/creator/posts', checkAuth, creatorPostCreateValidation, handleValidationErrors, CreatorPostController.create)
app.patch('/creator/posts/:id', checkAuth, creatorPostCreateValidation, handleValidationErrors, CreatorPostController.update)
app.patch('/creator/posts/like/:id', handleValidationErrors, CreatorPostController.like)
app.delete('/creator/posts/:id', checkAuth, CreatorPostController.remove);

app.get('/posts', PostController.getAll)
app.get('/posts/banner', PostController.getBannerCards)
app.get('/posts/:id', PostController.getOne)
app.get('/posts/title/:title', PostController.getOneByTitle)
app.get('/posts/category/:category', PostController.getCategory);
app.patch('/posts/like/:id', handleValidationErrors, PostController.like)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)
app.delete('/posts/:id', checkAuth, PostController.remove);

app.listen(4444, (err)=> {
    if (err) {
        return console.log(err)
    }

    console.log('Server running')
})
