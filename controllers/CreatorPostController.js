import CreatorPostModel from '../models/CreatorPost.js'

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

        CreatorPostModel.findOneAndDelete({
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
        const doc = new CreatorPostModel({
            creator: req.body.creator,
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