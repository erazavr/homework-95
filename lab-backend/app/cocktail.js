const path = require('path');

const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');

const Cocktail = require('../models/Cocktail');
const config = require('../config');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const check = require('../middleware/check');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', check, async (req, res) => {
    let cocktails;
    if(req.query.id) {
        cocktails = await Cocktail.find({user: req.query.id})
    } else if (req.user.role === "admin"){
        cocktails = await Cocktail.find();
    } else {
        cocktails = await Cocktail.find({published: true})
    }
    res.send(cocktails)
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const cocktailData = req.body;
        if (cocktailData.ingredients) {
            cocktailData.ingredients = JSON.parse(req.body.ingredients);
        }
        if (req.file) {
            cocktailData.image = req.file.filename
        }
        cocktailData.user = req.user._id;

        const cocktail = new Cocktail(cocktailData);

        await cocktail.save();

        return res.send(cocktail)

    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/:id/published', [auth, permit('admin')], async(req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);
        if (!cocktail) {
            res.status(400).send({message: "Cocktail not found"})
        }
        cocktail.published = !cocktail.published;

        await cocktail.save();

        return res.send(cocktail);
    }catch (error) {
        res.status(400).send(error)
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);
        if (!cocktail) {
            res.status(400).send({error: "Wrong Id"})
        } else {
            await Cocktail.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;