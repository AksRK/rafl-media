import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '');
    next();
    // if (token) {
    //     try {
    //         const decoded = jwt.verify(
    //             token.includes('Bearer')?token.split(' ')[1]:token,
    //             'secretRaflKey');
    //
    //         req.userId = decoded._id;
    //         next();
    //     }catch (err) {
    //         return res.status(401).json({
    //             message: 'Доступно после авторизации'
    //         })
    //     }
    //
    // }else {
    //     return res.status(401).json({
    //         message: 'Доступно после авторизации'
    //     })
    // }

}