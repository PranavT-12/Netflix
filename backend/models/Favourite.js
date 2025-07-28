const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const favouriteSchema = new Schema({
    userId: {
        type: Types.ObjectId, ref: "user", required: true
    },
    movie: { type: Object, required: true },
});

module.exports = mongoose.model("favourite", favouriteSchema);