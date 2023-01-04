const LoginService = require('../services/login.services');
const SignupService = require('../services/signup.services');

class UserController {
    loginService = new LoginService();
    signupService = new SignupService();

    createUser = async (req, res, next) => {
        const { nnickname, email, password, confirmPassword } = req.body;
        const createUserData = await this.signupService.createUser(
            nickname, 
            email, 
            password, 
            confirmPassword
        );
    
      };
    
      

}