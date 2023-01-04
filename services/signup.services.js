const UserRepository = require('../repositories/users.repositorys');

class loginServices {
    userRepository = new UserRepository();

    createUser = async (nickname, email, password, confirmPassword) => {
        const { email, nickname, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            res.status(400).send({
                errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
            });
            return;
        }

        // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
        const existsUsers = await User.findAll({
            where: {
                [Op.or]: [{ email }, { nickname }],
            },
        });
        if (existsUsers.length) {
            res.status(400).send({
                errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
            });
            return;
        }

        await User.create({ email, nickname, password, confirmPassword });
    };
}