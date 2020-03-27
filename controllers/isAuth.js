module.exports = (req, res, next) => {
    if (!req.session.isLoggedin) {
        return res.redirect('/user/login');
    }
    next();
}