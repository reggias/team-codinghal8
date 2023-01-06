const LaundryServiceRepo = require('../repositories/laundry.repository');
const { laundry, sequelize,  } = require("../models");
const { QueryTypes } = require("sequelize");

class LaundryService {
    laundryserviceRepo = new LaundryServiceRepo();

    findAllLaundry = async () => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        const laundryallService = await this.laundryserviceRepo.findAllLaundry();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    laundryallService.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
        if (laundryallService.length === 0) {
          return res
            .status(404)
            .json({ errorMessage: "신청 리스트가 존재하지 않습니다." });
        }
        return laundryallService.map(laundryservice => {
          return {
            id: laundryservice.id,
            category: laundryservice.category,
            state: laundryservice.state,
            nickname: laundryservice.nickname, // 사장님 닉네임
            user_id: laundryservice.user_id,
          }
        });
      }
}

module.exports = LaundryService;