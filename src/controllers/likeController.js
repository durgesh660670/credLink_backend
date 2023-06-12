const likeModel = require('../models/like');
const create = async (req, res) => {
    const reqObj = req.body;
    const result = likeModel.userReaction(reqObj);
    const resp = await result;
    res.send(resp);
}

const userReactions = async (req, res) => {
    const result = await likeModel.getUserReaction();
    res.send(result);
}


module.exports = {create: create,read: userReactions}
