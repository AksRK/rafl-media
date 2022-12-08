import mongoose from 'mongoose';

const ContactsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    titleUrl: {
        type: String,
    },
}, {
    timestamps: true,
})

export default mongoose.model('Contacts', ContactsSchema);