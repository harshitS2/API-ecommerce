export const adminMiddleware = async (req, res, next) => {
    const user = req.user;
    if(!user) 
        res.status(401).json({message: "User is not authorized"});
    if(!user.isAdmin)
        res.status(403).json({message: "Access denied"});
    next();
}