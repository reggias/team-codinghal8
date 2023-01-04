const ServiceService = require('../services/service.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class ServiceController {
  serviceService = new ServiceService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getService = async (req, res, next) => {
    try {
      const service = await this.serviceService.findAllPost();

      
      res.status(200).json({ service });
    } catch (err) {
      // console.log(err);
      res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다." });
    }
  }};

// async (req, res, next) => {
//     // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
//     const service = await this.serviceService.findAllPost();

//     res.status(200).json({ data: posts })
//   }
module.exports = ServiceController;