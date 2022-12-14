import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    titleUrl: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: Object,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    readAlso : {
        type: Array,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

}, {
    timestamps: true,
})
PostSchema.plugin(mongoosePaginate)

export default mongoose.model('Post', PostSchema);