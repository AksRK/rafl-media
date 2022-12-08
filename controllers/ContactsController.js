import ContactsModel from "../models/Contacts.js";

export const getAll = async (req, res) => {
    try {
        const contacts = await ContactsModel.find()
        const result = [...contacts.sort((x, y) => x.createdAt - y.createdAt)]
        res.json(result)
    }catch (err) {
        res.status(500).json({
            message: 'Не удалось получить контакты',
        })
    }
}

export const create = async (req, res) => {

    try {
        const doc = new ContactsModel({
            title: req.body.title,
            url: req.body.url,
            titleUrl: req.body.titleUrl
        })

        const contact = await doc.save()
        res.json(contact)
    }catch (err) {
        console.log(err)
        res.status(400).json([{
            message: 'Не удалось добавить новое поле контакта',
        }])
    }
}


export const update = async (req, res) => {

    try {
        const contactId = req.params.id

        await ContactsModel.updateOne({
            _id: contactId,
        }, {
            title: req.body.title,
            url: req.body.url,
            titleUrl: req.body.titleUrl

        })

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json([{
            message: 'Не удалось изменить поле контакта'
        }])
    }
}

export const remove = async (req, res) => {
    try {
        const contactId = req.params.id
        ContactsModel.findOneAndDelete({
            _id: contactId,
        }, async (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message: 'Не удалось удалить поле контакта'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Контакт не найден'
                })
            }

            res.json({
                success: true,
            })
        })
    }catch (err) {
        res.status(500).json([{
            message: 'Не удалось удалить поле контакта'
        }])
    }
}