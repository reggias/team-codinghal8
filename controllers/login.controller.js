const LoginService = require('../services/login.services');

class LoginController {
    loginService = new LoginService();


  createUser = async (req, res, next) => {
    const { nickname, email, password, confirmPassword} = req.body;
    const createUserData = await this.loginService.createUser(
        nickname, 
        email, 
        password, 
        confirmPassword
    );

    res.status(201).json({ data: createUserData });
    }
}