import CreatorModel from "../models/Creator.js";
import CreatorPostModel from "../models/CreatorPost.js";

export const getAll = async (req, res) => {
    const {page, perPage} = req.query
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 8,
    };

    try {
        const creators = await CreatorModel.paginate({}, options)
        res.json(creators)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить список креаторов',
        })
    }
}

export const getOne = async (req, res) => {

    try {
        const creatorId = req.params.id;

        CreatorModel.findOneAndUpdate(
            {
                _id: creatorId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            ( err, doc ) => {
                if (err) {
                    console.log(err)
                    return  res.status(500).json({
                        message: 'Не удалось вернуть креатора',
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Креатор не найден'
                    })
                }

                res.json(doc)
            }
        )

    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить креатора',
        })
    }
}

export const getOneByLogin = async (req, res) => {

    try {
        const creatorLogin = req.params.login;

        CreatorModel.findOneAndUpdate(
            {
                login: creatorLogin,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            ( err, doc ) => {
                if (err) {
                    console.log(err)
                    return  res.status(500).json({
                        message: 'Не удалось вернуть креатора',
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Креатор не найден'
                    })
                }

                res.json(doc)
            }
        )

    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить креатора',
        })
    }
}

export const remove = async (req, res) => {

    try {
        const creatorId = req.params.id

        const currentCreator = await CreatorModel.findById(req.params.id)

        if (!currentCreator) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const {login} = currentCreator._doc

        const creatorPosts = await CreatorPostModel.find({creator: login})

        for (let post of creatorPosts) {
            await CreatorPostModel.findOneAndDelete(post)
        }

        CreatorModel.findOneAndDelete({
            _id: creatorId,
        }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message: 'Не удалось удалить креатора'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Креатор не найден'
                })
            }

            res.json({
                success: true,
            })
        })
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить креаторов',
        })
    }
}

export const create = async (req, res) => {

    try {
        const doc = await new CreatorModel({
            login: req.body.login,
            imageUrl: req.body.imageUrl,
            fullName: req.body.fullName,
            about: req.body.about,
            description: req.body.description,
            kindActivity: req.body.kindActivity,
            social: req.body.social
        })

        const creator = await doc.save()
        res.json(creator)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось добавить креатора',
        })
    }
}

export const update = async (req, res) => {

    try {
        const creatorId = req.params.id;

        CreatorModel.findOneAndUpdate(
            {
                _id: creatorId,
            },
            {
                imageUrl: req.body.imageUrl,
                fullName: req.body.fullName,
                about: req.body.about,
                description: req.body.description,
                kindActivity: req.body.kindActivity,
                social: req.body.social,
                viewsCount: req.body.viewsCount
            },
            {
                returnDocument: 'after',
            },
            ( err, doc ) => {
                if (err) {
                    console.log(err)
                    return  res.status(500).json({
                        message: 'Ошибка обновления данных',
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Креатор не найден'
                    })
                }

                res.json(doc)
            }
        )

    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить данные креатора',
        })
    }
}