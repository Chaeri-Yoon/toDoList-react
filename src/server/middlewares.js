import routes from "./routes";

export const onlyLoggedUser = (req, res, next) => {
    if (!req.user) res.redirect(routes.main);
    else next();
}