const home = (req, res) => {
    res.status(200).json({message: "Hello World!"});
}

const game = (req, res) => {
    res.status(200).json({message: "All Games"});
}

module.exports = {
    home,
    game
};