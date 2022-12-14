import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import {
    registerValidation, loginValidation, userUpdateValidation,
    postCreateValidation, postUpdateValidation,
    creatorCreateValidation, creatorUpdateValidation,
    creatorPostCreateValidation, creatorPostUpdateValidation,
    contactsCreateUpdateValidation

} from './validations/validations.js';

import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from "./utils/handleValidationErrors.js";

import * as UserController from "./controllers/UserController.js";
import * as CreatorController from "./controllers/CreatorController.js";
import * as CreatorPostController from "./controllers/CreatorPostController.js";
import * as PostController from "./controllers/PostController.js";
import * as ContactsController from "./controllers/ContactsController.js"
import fss from 'fs/promises'

import cors from 'cors'

const app = express();
const PORT = 4444;
const baseUrl = 'http://localhost:4444/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ '-' + uuidv4()+'-'+file.originalname.replaceAll(' ', ''))
    },
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb('Невозможно загрузить картинку');
    }
}

const upload = multer({ fileFilter, storage, limits:{ fileSize: 5000000 }  })

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
    res.send('Hi')
})

app.get('/admin/users/', checkAuth, UserController.getAll)
app.get('/admin/users/:id', UserController.getOne)
app.put('/admin/users/:id', checkAuth, userUpdateValidation,handleValidationErrors, UserController.update)
app.delete('/admin/users/:id', checkAuth, UserController.remove)

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register',checkAuth, registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/uploads',  upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.filename}`,
        fullUrl: `${baseUrl}uploads/${req.file.filename}`
    })
})
app.delete('/uploads/:name', async (req, res) => {
    try {
        await fss.unlink(('./uploads/'+req.params.name))
        res.json({
            message:'true'
        })
    } catch (e) {
        res.status(500).json({
            message: 'Не удалось удалить файл',
        })
    }
})

app.get('/creator', CreatorController.getAll)
app.get('/creator/:id', CreatorController.getOne)
app.get('/creator/find/:findParams', CreatorController.findAll)
app.get('/creator/edit/:id', CreatorController.getOneAdmin)
app.get('/creator/login/:login', CreatorController.getOneByLogin)
app.post('/creator', checkAuth, creatorCreateValidation , handleValidationErrors, CreatorController.create)
app.put('/creator/:id', checkAuth, creatorUpdateValidation , handleValidationErrors, CreatorController.update)
app.delete('/creator/:id', checkAuth, CreatorController.remove);

app.get('/creator/posts/:id', CreatorPostController.getOne)
app.get('/creator/posts/find/:findParams', CreatorPostController.getAllByTitle)
app.get('/creator/posts/edit/:id', CreatorPostController.getOneAdmin)
app.get('/creator/posts/admin/all', CreatorPostController.getAllCreatorPostsAdmin)
app.get('/creator/posts/title/:titleUrl', CreatorPostController.getOneByTitle)
app.get('/creator/posts/login/:creator', CreatorPostController.getCreatorPosts)
app.post('/creator/posts', checkAuth, creatorPostCreateValidation, handleValidationErrors, CreatorPostController.create)
app.put('/creator/posts/:id', checkAuth, creatorPostUpdateValidation, handleValidationErrors, CreatorPostController.update)
app.put('/creator/posts/like/:id', handleValidationErrors, CreatorPostController.like)
app.delete('/creator/posts/:id', checkAuth, CreatorPostController.remove);

app.get('/posts', PostController.getAll)
app.get('/posts/banner', PostController.getBannerCards)
app.get('/posts/:id', PostController.getOne)
app.get('/posts/find/:findParams', PostController.getAllByTitle)
app.get('/posts/admin/all', PostController.getAllAdmin)
app.get('/posts/admin/edit/:id', PostController.getOneAdmin)
app.get('/posts/title/:titleUrl', PostController.getOneByTitle)
app.get('/posts/category/:category', PostController.getCategory);
app.put('/posts/like/:id', handleValidationErrors, PostController.like)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.put('/posts/:id', checkAuth, postUpdateValidation, handleValidationErrors, PostController.update)
app.delete('/posts/:id', checkAuth, PostController.remove);

app.get('/project/contacts', ContactsController.getAll)
app.post('/project/contacts', checkAuth, contactsCreateUpdateValidation , handleValidationErrors, ContactsController.create)
app.put('/project/contacts/:id', checkAuth, contactsCreateUpdateValidation , handleValidationErrors, ContactsController.update)
app.delete('/project/contacts/:id', checkAuth, ContactsController.remove);

async function start() {
    try {
        await mongoose
            .connect('mongodb+srv://Admin:Ctktyjd1994Sele62I0@cluster0.sbmoots.mongodb.net/RAFL?retryWrites=true&w=majority',)
            .then(() => {console.log('DB connect')})
            .catch((err) => {console.log('DB err', err)})
        app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1)
    }
}

start()

