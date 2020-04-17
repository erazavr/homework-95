const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const config = require('./config');

const User = require('./models/User');
const Cocktail = require('./models/Cocktail');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name)
    }
    const [user1, admin] = await User.create({
        username: "user1",
        password: "123",
        token: nanoid(),
        role: 'user',
    }, {
        username: "admin",
        password: "123",
        token: nanoid(),
        role: 'admin',
        avatar: 'avatar.jpg'
    });

    await Cocktail.create({
        name: "Мохито",
        recipe: "Положи в хайбол лайм 3 дольки и подави мадлером\n" +
            "Возьми мяту 10 листиков в одну руку и хлопни по ним другой рукой\n" +
            "Положи мяту в хайбол\n" +
            "Наполни бокал дробленым льдом доверху\n" +
            "Добавь сахарный сироп 15 мл и белый ром 50 мл\n" +
            "Долей содовую доверху и аккуратно размешай коктейльной ложкой\n" +
            "Досыпь немного дробленого льда\n" +
            "Укрась веточкой мяты и долькой лайма",
        ingredients: [
            {name: "Белый ром", amount: "50 мл"},
            {name: "Сахарный сироп", amount: "15 мл"},
            {name: "Содовая", amount: "100 мл"},
            {name: "Лайм", amount: "80 г"},
            {name: "Мята", amount: "3 г"},
            {name: "lemon soda", amount: "1 bottle"},
            {name: "Дробленый лед", amount: "200г"},

        ],
        published: false,
        user: user1._id,
        image: 'мохито.jpg'
        },
        {
            name: "Мартини",
            recipe: "Налей в стакан для смешивания сухой вермут 15 мл и водку 75 мл\n" +
                "Наполни стакан кубиками льда и аккуратно размешай коктейльной ложкой\n" +
                "Перелей через стрейнер в охлажденный коктейльный бокал\n" +
                "Укрась тремя оливками на шпажке",
            ingredients: [
                {name: "Водка Finlandia", amount: "75 мл"},
                {name: "Сухой вермут", amount: "15 мл"},
                {name: "Оливки", amount: "9 г"},
                {name: "Лед в кубиках", amount: "300 г"},
            ],
            published: false,
            user: user1._id,
            image: 'martini.jpg'},
        {
            name: "Матанга",
            recipe: 'Наполни хайбол кубиками льда доверху\n' +
                'Выжми лаймовый сок 25 мл\n' +
                'Налей сироп соленая карамель 20 мл и золотую текилу 40 мл\n' +
                'Долей содовую доверху и аккуратно размешай коктейльной ложкой\n' +
                'Укрась ножом и долькой лайма',
            ingredients: [
                {name: "Золотая текила", amount: "40 мл"},
                {name: "Сироп соленая карамель", amount: "20 мл"},
                {name: "Лаймовый сок", amount: "25 мл"},
                {name: "Содовая", amount: "60 мл"},
                {name: "Лайм", amount: "10 г"},
                {name: "Лед в кубиках", amount: "180 г"},
            ],
            published: true,
            user: admin._id,
            image: 'matanga.jpg'
        }
        );

    mongoose.connection.close();
};


run().catch(error => {
    throw error
});