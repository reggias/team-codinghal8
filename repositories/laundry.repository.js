const { laundry, sequelize,  } = require("../models");
const { QueryTypes } = require("sequelize");

class LaundryRepository {
  findAllLaundry = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const query = `SELECT s.nickname, l.id, l.category, l.state, l.user_id FROM laundries l LEFT JOIN stores s ON l.store_id = s.id;`;
      const laundryList = await sequelize.query(query,
        {
          type: QueryTypes.SELECT,
        });
    return laundryList;
  }

  // laundrylist = async( laundry_category, laundry_state, store_nickname ) => {
  //   const laundrylistData = await user.create({ laundry_category, laundry_state, store_nickname });          
  //   return laundrylistData;     
  // }
}

module.exports = LaundryRepository;