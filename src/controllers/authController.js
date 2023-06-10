// const auth = require('../models/auth');
const authModel = require('../models/auth');

const signUp = async (req, res) => {
    const auth = req.body;
    const result = await authModel.create(auth); // Await the promise returned by authModel.create
    res.send(result);
}

const read = async (req, res) => {
    const user_id = req.params.user_id;
    console.log(user_id)
    const result = await authModel.read(user_id); // Await the promise returned by authModel.read
    res.send(result);
}

module.exports = {
    signUp: signUp,
    read: read
}
