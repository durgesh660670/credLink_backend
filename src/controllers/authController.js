
// const auth = require('../models/auth');
const authModel = require('../models/auth');

const signUp = async (req, res) => {
    const auth = req.body;
    const result = authModel.create(auth);
    const resp = await result;
    res.send(resp);
}

const read = async (req, res) => {
    const user_id = req.params.user_id;
    const result = authModel.read(user_id);
    const resp = await result;
    res.send(resp);
}
module.exports = {
    signUp: signUp,
    read: read
}
