exports.getAll = (req, res, next) => {
    console.log("GET getAll");
    res.status(200).json({ "msg": "ok" })
}
exports.getOne = (req, res, next) => {
    console.log("GET getOne");
    res.status(200).json({ "msg": "ok" })
}
exports.create = (req, res, next) => {
    console.log("POST create");
    res.status(200).json({ "msg": "ok" })
}
exports.update = (req, res, next) => {
    console.log("POST update");
    res.status(200).json({ "msg": "ok" })
}
exports.delete = (req, res, next) => {
    console.log("DELETE delete");
    res.status(200).json({ "msg": "ok" })
}