const home = (req, res) => {
    res.status(200).send('Welcome to the home page.');
}

module.exports = {
    home
};