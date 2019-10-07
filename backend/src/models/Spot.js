const mongoose = require('mongoose');

const SpotSChema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    },
});

SpotSChema.virtual('thumbnail_url').get(function(){
    return `http://192.168.0.5:3333/files/${this.thumbnail}`
})

// SpotSChema.virtual('thumbnail_url').get(function(){
//     return `http://localhost:3333/files/${this.thumbnail}`
// })

module.exports = mongoose.model('Spot', SpotSChema);