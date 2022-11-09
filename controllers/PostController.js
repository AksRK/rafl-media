import PostModel from '../models/Post.js';

export const getCategory = async (req, res) => {
    try {
        const postsTag = req.params
        const posts = await PostModel.find(postsTag)
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
    console.log(req.query)

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

export const getOneByTitle = async (req, res) => {

    try {
        const postTitle = req.params.title;

        PostModel.findOneAndUpdate(
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

        PostModel.findOneAndDelete({
            _id: postId,
        }, (err, doc) => {
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
        res.status(500).json({
            message: 'Не удалось создать статью',
        })
    }
}

export const update = async (req, res) => {

    try {
        const postId = req.params.id

        await PostModel.updateOne({
            _id: postId,
        }, {
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            content: req.body.content,
            readAlso: req.body.readAlso,
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