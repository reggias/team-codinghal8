const { laundry, sequelize,  } = require("../models");
const { QueryTypes } = require("sequelize");

class PostRepository {
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const query = `SELECT u.nickname, l.id, l.address, l.img, l.memo FROM laundries l LEFT JOIN users u ON l.user_id = u.id;`;
      // console.log(123);
      const serviceList = await sequelize.query(query,
        {
          type: QueryTypes.SELECT,
        });
    // console.log(serviceList)
    return serviceList;
  }

  // createPost = async (nickname, password, title, content) => {
  //   // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
  //   const createPostData = await Posts.create({ nickname, password, title, content });

  //   return createPostData;
  // }
}

module.exports = PostRepository;