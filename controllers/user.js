const User = require('../models/user');

async function handleCreateNewUser(req, res) {
    const { username, password, language } = req.body;

    const newUser = new User({
        username,
        password,
        language
    });

    try {
        const savedUser = await newUser.save();
        console.log("User created:", savedUser);
        res.status(201).redirect('/');
    } catch (error) {
        res.status(400).send('Error registering user: ' + error.message);
    }
}

async function handleToFindUser(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Missing username or password');
        }
        let user = await User.findOne({ username, password });
        if (user) {
            const userLanguage = user.language;
            const userName = user.username;

            console.log("User logged in:", user.language);

            res.render('dashboard', { userLanguage, userName });

        } else {
            res.status(404).redirect('/');
        }
    } catch (error) {
        res.status(500).send('Error finding user: ' + error.message);
    }
}

module.exports = {
    handleCreateNewUser,
    handleToFindUser,
};
