import CreatorPostModel from '../models/CreatorPost.js'
import fs from "fs/promises";
import constants from "fs/promises";

export const getCreatorPosts = async (req, res) => {

    const {page, perPage} = req.query
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 8,
        sort: {
            viewsCount: -1
        }
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

export const getAllCreatorPostsAdmin = async (req, res) => {

    const {page, perPage} = req.query
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 8,
        sort: {
            createdAt: -1
        }
    };

    try {
        const posts = await CreatorPostModel.paginate({}, options)
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
        const {id} = req.params
        const post = await CreatorPostModel.findById(id)
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

        CreatorPostModel.findOneAndUpdate(
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

                const seeMorePosts = await CreatorPostModel.find(
                    {
                        createdAt : {$lte: doc.createdAt }
                    }).sort({createdAt:-1})
                const seeMorePostsFiltered = seeMorePosts.slice(0, 4)
                let resultSeeMorePosts = []

                for (let post of seeMorePostsFiltered) {
                    const {title, creator, titleUrl, _id} = post
                    resultSeeMorePosts.push({_id,creator, title, titleUrl})
                }

                const {readAlso} = post
                const readAlsoResult = []

                for (let readAlsoId of readAlso) {
                    if (readAlsoId) {
                        const {creator,title, titleUrl, description, imageUrl, likes} = await CreatorPostModel.findById(readAlsoId)
                        readAlsoResult.push({creator, title, titleUrl, description, imageUrl, likes})
                    }
                }

                res.json({readAlsoList:readAlsoResult, postsAlso : resultSeeMorePosts, ...post})
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
        const postTitle = await CreatorPostModel.find({title: {'$regex': findParams, '$options': 'i'}})
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
            titleUrl: req.body.titleUrl,
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
        res.status(500).json([{
            message: 'Не удалось создать статью, проверьте заголовок на уникальность',
        }])
    }
}

export const update = async (req, res) => {

    try {
        const postId = req.params.id

        await CreatorPostModel.updateOne({
            _id: postId,
        }, {
            // creator: req.body.creator,
            title: req.body.title,
            titleUrl: req.body.titleUrl,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            content: req.body.content,
            user: req.body.userId,
            likes: req.body.likes,
            readAlso: req.body.readAlso,
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