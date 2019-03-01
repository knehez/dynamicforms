export default class AuthenticationCtrl {

    //TODO: check user in database and send JWT token
    login = async (req, res) => { 
        if (req.body.username === 'user' && req.body.password === 'password') {
            return res.json({ success: true });
        }

        res.status(401).json({ success: false });
    };
}