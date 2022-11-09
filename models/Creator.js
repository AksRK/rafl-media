import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const CreatorSchema = new mongoose.Schema({

    imageUrl: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    kindActivity : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    social : {
        type: Array,
        required: true
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    login: {
        type: String,
        required: true,
        unique: true
    },

}, {
    timestamps: true,
})
CreatorSchema.plugin(mongoosePaginate)

export default mongoose.model('Creator', CreatorSchema);