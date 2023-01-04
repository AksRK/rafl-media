import CreatorModel from "../models/Creator.js";
import CreatorPostModel from "../models/CreatorPost.js";
import fs from "fs/promises";
import constants from "fs/promises";

export const getAll = async (req, res) => {
    const {page, perPage} = req.query
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 8,
        sort: {
            viewsCount: -1
        }
    };

    try {
        const creators = await CreatorModel.paginate({}, options)
        res.json(creators)
    }catch (err) {
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

export const findAll = async (req, res) => {
    try {
        const {findParams} = req.params
        const creatorsLogin = await CreatorModel.find({login: {'$regex': findParams, '$options': 'i'}})
        const creatorsFullName = await CreatorModel.find({fullName: {'$regex': findParams, '$options': 'i'}})
        const result = {...creatorsLogin, ...creatorsFullName}
        if (Object.keys(result).length == 0) {
            return res.status(404).json({
                message: 'Ничего не найдено'
            })
        }
        res.json([...creatorsLogin, ...creatorsFullName])
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
};

export const getOneAdmin = async (req, res) => {
    try {
        const creatorId = req.params
        const creator = await CreatorModel.findOne(creatorId)
        res.json(creator)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
};

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
        const regexUrl = new RegExp(/(\/uploads.*\.(?:png|jpg|jpeg))/, 'g')
        const regexTag = new RegExp(/<img\s+[^>]*src="([^"]*)"[^>]*>/, 'g')

        if (!currentCreator) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }
        const {imageUrl, login} = currentCreator._doc
        const creatorPosts = await CreatorPostModel.find({creator: login})

        if (creatorPosts.length >=1) {
            for (let post of creatorPosts) {
                const {_id, imageUrl, content} = post._doc

                try {
                    await fs.access('.'+imageUrl.url, constants.F_OK);
                    fs.unlink(('.'+imageUrl.url))
                } catch {}
                const allTags = content.match(regexTag)

                if (allTags !== null) {
                    for (let tag of allTags) {
                        if (!tag.match(regexUrl)) {
                            continue
                        }
                        try {
                            await fs.access('.'+tag.match(regexUrl)[0], constants.F_OK);
                            fs.unlink(('.'+tag.match(regexUrl)[0]))
                        } catch {}
                    }
                }

                await CreatorPostModel.findByIdAndDelete(_id)
            }
        }

        CreatorModel.findOneAndDelete({
            _id: creatorId,
        }, async (err, doc) => {
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
            try {
                await fs.access('.'+imageUrl.url, constants.F_OK);
                fs.unlink(('.'+imageUrl.url))
            } catch {}
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
        res.status(500).json([{
            message: 'Не удалось добавить креатора, проверьте логин на уникальность',
        }])
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
                // login: req.body.login,
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
                    return  res.status(500).json([{
                        message: 'Ошибка обновления данных',
                    }])
                }

                if (!doc) {
                    return res.status(404).json([{
                        message: 'Креатор не найден'
                    }])
                }

                res.json(doc)
            }
        )

    }catch (err) {
        console.log(err)
        res.status(500).json([{
            message: 'Не удалось обновить данные креатора',
        }])
    }
}