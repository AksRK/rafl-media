import CreatorPostModel from '../models/CreatorPost.js'
import fss from "fs/promises";
import fs from "fs/promises";
import constants from "fs/promises";

export const getCreatorPosts = async (req, res) => {

    const {page, perPage} = req.query
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 8,
    };

    try {
        const creator = req.params
        const posts = await CreatorPostModel.paginate({...creator}, options)
        res.json(posts)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
};

export const getOne = async (req, res) => {

    try {
        const postId = req.params.id;

        CreatorPostModel.findOneAndUpdate(
            {
                _id: postId,
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
                        message: 'Не удалось вернуть статью',
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена'
                    })
                }

                res.json(doc)
            }
        )

    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статью',
        })
    }
}

export const getOneAdmin = async (req, res) => {
    try {
        const postId = req.params
        const post = await CreatorPostModel.findOne(postId)
        res.json(post)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
};

export const getOneByTitle = async (req, res) => {

    try {
        const postTitle = req.params.title;

        CreatorPostModel.findOneAndUpdate(
            {
                title: postTitle,
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
                        message: 'Не удалось вернуть статью',
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена'
                    })
                }

                res.json(doc)
            }
        )

    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статью',
        })
    }
}

export const remove = async (req, res) => {

    try {
        const postId = req.params.id
        const post = await CreatorPostModel.findById(postId)
        const regexUrl = new RegExp(/(\/uploads.*\.(?:png|jpg|jpeg))/, 'g')
        const regexTag = new RegExp(/<img\s+[^>]*src="([^"]*)"[^>]*>/, 'g')


        CreatorPostModel.findOneAndDelete({
            _id: postId,
        }, async (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message: 'Не удалось удалить статью'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена'
                })
            }

            const {imageUrl, content} = post._doc
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

            res.json({
                success: true,
            })
        })
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
}

export const create = async (req, res) => {

    try {
        const doc = new CreatorPostModel({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            creator: req.body.creator,
            content: req.body.content,
            readAlso: req.body.readAlso,
            user: req.userId,

        })

        const post = await doc.save()
        res.json(post)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать статью',
        })
    }
}

export const update = async (req, res) => {

    try {
        const postId = req.params.id

        await CreatorPostModel.updateOne({
            _id: postId,
        }, {
            creator: req.body.creator,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            content: req.body.content,
            user: req.body.userId,
            likes: req.body.likes,
            viewsCount: req.body.viewsCount
        })

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}

export const like = async (req, res) => {

    try {
        const postId = req.params.id

        await CreatorPostModel.updateOne({
            _id: postId,
        }, {
            $inc: { likes: 1 },
        })

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}