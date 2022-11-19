import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const getAll = async (req, res) => {
    try {
        const {page} = req.query

        const options = {
            page: parseInt(page, 10) || 1,
            limit: 10,
            sort: {
                createdAt: -1,
            }
        };

        const users = await UserModel.paginate({}, options)
        res.json(users)
    }catch (err) {
        res.status(500).json([{
            message: 'Не удалось получить список пользователей'
        }])
    }
}

export const getOne = async (req, res) => {
    try {
        const {id} = req.params
        const user = await UserModel.findById(id)
        const { passwordHash, ...userData } = user._doc
        res.json({
            ...userData,
        })
    }catch (err) {
        console.log(err)
        res.status(500).json([{
            message: 'Не удалось получить пользователя',
        }])
    }
};

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secretRaflKey',
            {
                expiresIn: '1d',
            }
        )

        const { passwordHash, ...userData } = user._doc

        res.json({
            ...userData,
            token
        })
    } catch (err) {
        res.status(500).json([{
            message: 'Не удалось зарегистрироваться'
        }])
    }
}

export const update = async (req, res) => {

    try {
        const userId = req.params.id

        await UserModel.updateOne({
            _id: userId,
        }, {
            fullName: req.body.fullName,
            email: req.body.email,

        })

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json([{
            message: 'Не удалось изменить пользователя'
        }])
    }
}

export const remove = async (req, res) => {
    try {
        const userId = req.params.id
        UserModel.findOneAndDelete({
            _id: userId,
        }, async (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message: 'Не удалось удалить пользователя'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Пользователь не найден'
                })
            }

            res.json({
                success: true,
            })
        })
    }catch (err) {
        res.status(500).json([{
            message: 'Не удалось удалить пользователя'
        }])
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})

        if (!user) {
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secretRaflKey',
            {
                expiresIn: '1d',
            }
        )

        const { passwordHash, ...userData } = user._doc

        res.json({
            ...userData,
            token
        })
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }
        const { passwordHash, ...userData } = user._doc

        res.json({
            userData
        })
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}