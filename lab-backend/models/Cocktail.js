const mongoose = require('mongoose');

const CocktailSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    ingredients: [
        {name: String, amount: String}
    ],
    recipe: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;