const LoginService = require('../services/login.services');

class UserController {
    loginService = new LoginService();
   
    createUser = async (req, res, next) => {
        const { nnickname, email, password, confirmPassword } = req.body;
        const createUserData = await this.signupService.createUser(
            nickname, 
            email, 
            password, 
            confirmPassword
        );
    
      };


  postLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userId = await this.loginService.findOne(email, password);

      const token = await this.loginService.issueToken(userId);

      res.cookie('token', token['token']);
      res.status(200).json({
        result: 'success',
        token: token,
        userId: userId,
      });
    } catch (err) {
      res.status(400).json({
        errorMessage: '로그인에 실패하였습니다.',
      });
    }
  };
    
      

}