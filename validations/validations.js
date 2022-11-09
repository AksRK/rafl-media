import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите Имя').isLength({ min: 3 }),
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3}).isString(),
    body('description', 'Введите описание статьи').isLength({ min: 3}).isString(),
    body('category', 'Укажите категорию статьи').isLength({ min: 3}).isString(),
    body('imageUrl', 'Неверная ссылка на изображение').isString(),
    body('content', 'Статья не может быть пустой..').isLength({ min: 10 }).isString(),
    body('readAlso', 'Не указаны рекомендованные статьи').isLength({ min: 1 }).isArray(),
]

export const creatorPostCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3}).isString(),
    body('description', 'Введите описание статьи').isLength({ min: 3}).isString(),
    body('creator', 'Укажите креатора статьи').isLength({ min: 3}).isString(),
    body('imageUrl', 'Неверная ссылка на изображение').isString(),
    body('content', 'Статья не может быть пустой..').isLength({ min: 10 }).isString(),
    body('readAlso', 'Не указаны рекомендованные статьи').isLength({ min: 1 }).isArray(),
]

export const creatorCreateValidation = [
    body('login', 'Укажите Логин креатора').isLength({ min: 3}).isString(),
    body('about', 'Укажите краткое описание креатора').isLength({ min: 3}).isString(),
    body('kindActivity', 'Введите направление деятельности креатора').isLength({ min: 3}).isString(),
    body('fullName', 'Введите имя креатора').isLength({ min: 3}).isString(),
    body('description', 'Введите описание креатора').isLength({ min: 3}).isString(),
    body('imageUrl', 'Неверная ссылка на изображение').isLength({ min: 3}).isString(),
    body('social', 'Не указаны соц. сети креатора').isLength({ min: 1}).isArray(),
]

export const creatorUpdateValidation = [
    body('about', 'Укажите краткое описание креатора').isLength({ min: 3}).isString(),
    body('kindActivity', 'Введите направление деятельности креатора').isLength({ min: 3}).isString(),
    body('fullName', 'Введите имя креатора').isLength({ min: 3}).isString(),
    body('description', 'Введите описание креатора').isLength({ min: 3}).isString(),
    body('imageUrl', 'Неверная ссылка на изображение').isLength({ min: 3}).isString(),
    body('social', 'Не указаны соц. сети креатора').isLength({ min: 1}).isArray(),
]