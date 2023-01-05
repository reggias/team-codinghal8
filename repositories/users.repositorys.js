const { user } = require("../models");

class UserRepository {

    createUser = async(user_id, address, point, password) => {
        const createUserData = await user.create({ user_id, nickname, point, password });

        return createUserData;
    }

    findOne = async(user_id, password) => {
        const findUser = await user.findOne({
            where: {user_id, password}
        });

        return findUser;
    }

    findAllUser = async(name) => {
        const users = await user.findAll({
            where: { name }
        });
        return users;
    }

}

module.exports = UserRepository;