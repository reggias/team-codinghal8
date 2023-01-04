const {User} = require('../models');

class UserRepositorys {
    createUser = async (nickname, email, password, confirmPassword ) => {
        const createUserData = await User.create({ 
            nickname,
            email,
            password,
            title,
            content,
        });
    
        return createUserData;
      };
      
}