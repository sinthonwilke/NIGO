const home = (req, res) => {
    res.status(200).json({message: "Hello World!"});
}

module.exports = {
    home
};