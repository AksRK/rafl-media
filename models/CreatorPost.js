import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const CreatorPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    creator: {
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
        length: 2,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

}, {
    timestamps: true,
})
CreatorPostSchema.plugin(mongoosePaginate)

export default mongoose.model('CreatorPost', CreatorPostSchema);