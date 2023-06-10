const likeModel = require('../models/like');

const create = async (req, res) => {
    const create = req.body;
    const result = profileModel.create(create);
    const resp = await result;
    res.send(resp);
}
const update = async (req, res) => {
    const update = req.body;
    const result = profileModel.update(update);
    const resp = await result;
    res.send(resp);
}


const read = async (req, res) => {
    const profileId = req.params.id;
    const result = profileModel.read(profileId);
    const resp = await result;
    res.send(resp);
}


module.exports = {
    create: create,
    update: update,
    read: read
}
