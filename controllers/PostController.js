import PostModel from '../models/Post.js';
import fs from "fs/promises";
import constants from 'fs/promises';

export const getCategory = async (req, res) => {
    const {page, perPage} = req.query

    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 8,
        sort: {
            viewsCount: -1
        }
    };

    try {
        const postsTag = req.params
        const posts = await PostModel.paginate({...postsTag}, options)
        res.json(posts)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
};

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
        const posts = await PostModel.paginate({}, options)
        res.json(posts)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
}

export const getBannerCards = async (req, res) => {
    const {cardsLimit} = req.query

    const options = {
        limit: parseInt(cardsLimit, 10) || 5,
        sort: {
            createdAt: -1,
        }
    };

    try {
        const posts = await PostModel.paginate({}, options)
        res.json(posts)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
}

export const getOne = async (req, res) => {

    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate(
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
        const {id} = req.params
        const post = await PostModel.findById(id)
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
        const postTitleUrl = req.params.titleUrl;
        PostModel.findOneAndUpdate(
            {
                titleUrl: postTitleUrl,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            async ( err, doc ) => {
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

                const post = doc._doc

                const seeMorePosts = await PostModel.find(
                    {
                        category: doc.category,
                        createdAt : {$lte: doc.createdAt }
                    }).sort({createdAt:-1})
                const seeMorePostsFiltered = seeMorePosts.slice(0, 4)
                const resultSeeMorePosts = []

                for (let post of seeMorePostsFiltered) {
                    const {title, titleUrl, _id} = post
                    resultSeeMorePosts.push({_id, title,titleUrl})
                }

                const {readAlso} = post
                const readAlsoResult = []
                for (let readAlsoId of readAlso) {
                    try {
                        const {title, titleUrl, description, imageUrl, likes} = await PostModel.findById(readAlsoId)
                        readAlsoResult.push({title, titleUrl, description, imageUrl, likes})
                    }catch (err) {
                        console.log(err)
                    }
                }


                res.json({postsAlso : resultSeeMorePosts, readAlsoList:readAlsoResult,  ...post})
            }
        )

    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статью',
        })
    }
}

export const getAllByTitle = async (req, res) => {
    try {
        const {findParams} = req.params
        const postTitle = await PostModel.find({title: {'$regex': findParams, '$options': 'i'}})
        const result = {...postTitle}
        if (Object.keys(result).length == 0) {
            return res.status(404).json({
                message: 'Ничего не найдено'
            })
        }
        res.json([...postTitle])
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await PostModel.findById(postId)
        const regexUrl = new RegExp(/(\/uploads.*\.(?:png|jpg|jpeg))/, 'g')
        const regexTag = new RegExp(/<img\s+[^>]*src="([^"]*)"[^>]*>/, 'g')

        PostModel.findOneAndDelete({
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
        const doc = new PostModel({
            category: req.body.category,
            title: req.body.title,
            titleUrl: req.body.titleUrl,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            content: req.body.content,
            readAlso: req.body.readAlso,
            user: req.userId,

        })

        const post = await doc.save()
        res.json(post)
    }catch (err) {
        console.log(err)
        res.status(400).json([{
            message: 'Не удалось создать статью,  проверьте заголовок на уникальность',
        }])
    }
}

export const update = async (req, res) => {

    try {
        const postId = req.params.id

        await PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            titleUrl: req.body.titleUrl,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            content: req.body.content,
            readAlso: req.body.readAlso,
            user: req.userId,
            likes: req.body.likes,
            viewsCount: req.body.viewsCount
        })

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json([{
            message: 'Не удалось обновить статью, проверьте заголовок на уникальность'
        }])
    }
}

export const like = async (req, res) => {

    try {
        const postId = req.params.id

        await PostModel.updateOne({
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