const ServiceRepository = require('../repositories/service.repository');
const { laundry, sequelize,  } = require("../models");
const { QueryTypes } = require("sequelize");

class ServiceService {
  serviceRepository = new ServiceRepository();

  findAllService = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allService = await this.serviceRepository.findAllService();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allService.sort((a, b) => {
      return b.createdAt - a.createdAt;
    })
      if (allService.length === 0) {
        return res
          .status(404)
          .json({ errorMessage: "신청 리스트가 존재하지 않습니다." });
      }
      return allService.map(service => {
        return {
          id: service.id,
          nickname: service.nickname,
          address: service.address,
          img: service.img,
          memo: service.memo,
          store_id: service.store_id,
          state: service.state,
          phone: service.phone
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