const ServiceRepository = require('../repositories/service.repository');
const { laundry, sequelize,  } = require("../models");
const { QueryTypes } = require("sequelize");

class ServiceService {
  serviceRepository = new ServiceRepository();

  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.serviceRepository.findAllPost();
    console.log("allPost", allPost);

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    })
      if (allPost.length === 0) {
        return res
          .status(404)
          .json({ errorMessage: "게시글이 존재하지 않습니다." });
      }
      return allPost.map(post => {
        return {
          id: post.id,
          nickname: post.nickname,
          address: post.address,
          img: post.img,
          memo: post.memo
        }
      });
    }

  //   // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.

  // createPost = async (nickname, password, title, content) => {
  //   // 저장소(Repository)에게 데이터를 요청합니다.
  //   const createPostData = await this.postRepository.createPost(nickname, password, title, content);

  //   // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
  //   return {
  //     postId: createPostData.null,
  //     nickname: createPostData.nickname,
  //     title: createPostData.title,
  //     content: createPostData.content,
  //     createdAt: createPostData.createdAt,
  //     updatedAt: createPostData.updatedAt,
  //   };
  // }
}

module.exports = ServiceService;