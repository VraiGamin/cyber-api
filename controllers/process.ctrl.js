exports.getAll = (req, res, next) => {
    console.log("GET getAll");
    res.status(200).json({ "msg": "Ok" })
}
exports.getOne = (req, res, next) => {
    console.log("GET getOne");
}
exports.create = (req, res, next) => {
    console.log("POST create");
}
exports.update = (req, res, next) => {
    console.log("POST update");
}
exports.delete = (req, res, next) => {
    console.log("DELETE delete");
}