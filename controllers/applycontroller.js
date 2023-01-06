const ApplyService = require('../services/apply.service');

class ApplyController {
    applyService = new ApplyService();

    getService = async (req, res, next) => {
        try {
            const apply = await this.applyService.findOnePost(point, nickname);

            res.status(200).json({ message: "잔여포인트, 닉네임 호출"});
        } catch (err) {
            res.status(400).json({ errorMessage: "잔여포인트, 닉네임 호출 실패"});
        }
    }
}

module.exports = ApplyController;