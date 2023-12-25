const room = require('../Model/room');
const user = require('../Model/user');
const post = require('../Model/post');

exports.readRoom = async (req, res, next) => {
    const useridx = req.params.user_idx;
    try {
        const readRoom = await room.findAll({
            attributes: ['idx'],
            include: [
                {
                  model: post,
                  attributes: [],
                  where: {
                    writer: useridx,
                  },
                },
                {
                  model: user,
                  attributes: [],
                },
              ],
        });
        if (readRoom) {
            console.log("readRoom() 성공");
            return res.status(200).json({ message: '채팅방 조회 완료', readRoom });
        } 
    } catch (error) {
        console.error('readRoom() 오류:', error);
        return res.status(500).json({ message: '채팅방 조회 중 오류 발생'});
    }
};

exports.searchPost = async (req, res) => {
  const searchKeyword = req.query.keyword; // 검색 키워드
  try {
      const searchResult = await post.findAll({
          attributes: ["idx", "writer", "address2", "address3", "placeName", "meetDate", "meetTime",
              "people", "title", "content", "menu1", "menu2", "profileImage", "createdAt"],
          where: {
              [Sequelize.Op.or]: [
                  { writer: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
                  { address2: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
                  { address3: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
                  { placeName: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
                  { meetDate: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
                  { meetTime: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
                  { people: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
                  { title: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
                  { content: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
                  { menu1: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
                  { menu2: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
                  { profileImage: { [Sequelize.Op.like]: `%${searchKeyword}%` } },
              ],
          },
          order: [['createdAt', 'DESC']], // 작성일 기준 내림차순 정렬
          limit: 10,
      });

      // 검색 결과가 있을 경우
      if (searchResult && searchResult.length > 0) {
          console.log("searchPost() 성공");
          return res.status(200).json({ message: '게시글 검색 완료', searchResult });
      } else {
          console.log("searchPost() 결과 없음");
          return res.status(404).json({ message: '검색 결과가 없습니다.' });
      }
  } catch (error) {
      console.error('searchPost() 오류:', error);
      return res.status(500).json({ message: '게시글 검색 중 오류 발생' });
  }
};

exports.joinRoom = async (req, res) => {
  const post_idx = req.query.post_idx;
  const user_idx = req.query.user_idx;

  try {
      const foundRoom = await room.findAll({
          where: {
              post_idx: post_idx,
              user_idx: user_idx
          }   
      });  
      if (foundRoom.length === 0) { //데이터 베이스에서 조회된 결과가 없다면,
          console.log(`${user_idx}가 참여하였습니다.`);
          await room.create({
          post_idx: post_idx,
          user_idx: user_idx,
          check: '0'
          });
          return res.status(200).json({ message: '참여하였습니다.' });
      } else {
          console.log(`${user_idx}는 이미 참여하였습니다.`);
          return res.status(200).json({ message: '이미 참여한 유저입니다.' });
      }
  } catch (error) {
      console.error('joinRoom() 오류:', error);
      return res.status(500).json({ message: '채팅방 참여 오류 발생' });
  }
};

exports.checkPermission = async (req, res, next) => {
  const post_idx = req.query.post_idx;
  const user_idx = req.query.user_idx;
  try {
    const FindWriter = await post.findOne({
      where: { idx: post_idx },
    });
    console.log('FindWriter:',FindWriter.writer);
    if (!FindWriter) {
      console.log("해당하는 방 없음");
      return res.status(404).json({ message: '해당하는 방이 없습니다.' });
    }

    if (FindWriter.writer != user_idx ) {
      console.log("작성자 외의 접근 시도");
      return res.status(403).json({ message: '작성자만이 권한이 있습니다.' });
    }
  } catch (error) {
    console.error('checkPermission() 오류:', error);
    return res.status(500).json({ message: '채팅방 체크 권한 오류 발생'});
  }
};

//사용자가 writer일 때만 사용할 수 있다는 가정
exports.grantCheck = async (req, res) => {
    const post_idx = req.query.post_idx; //현재 room 위치
    const user_idx = req.query.user_idx; //바꿀 user의 idx
    const check = req.query.check;//바꿀 room의 check
  try {
      console.log('post_idx: ',post_idx);
      const roomInfo = await room.findOne({ where: { post_idx: post_idx } });
      if (!roomInfo) {
          console.log("해당하는 방이 없음");
          return res.status(404).json({ message: '해당하는 방이 없습니다.' });
      }
      const [grantCount]  = await room.update({ 
          user_idx: user_idx,
          check: check },{ 
          where: {
              post_idx: post_idx,
          },
    });
    console.log('grantCount: ',grantCount);
    if (grantCount > 0) {
      console.log("updateCheck() 성공");
      return res.status(200).json({ message: 'check 업데이트 성공' });
    }
    else {
      console.log("check update fail");
      return res.status(500).json({ message: 'check 업데이트 실패' });
    }
  } catch (error) {
    console.error('updateCheck() 오류:', error);
    return res.status(500).json({ message: 'check 업데이트 중 오류 발생' });
  }
}
exports.joinRoom = async (req, res) => {
  const post_idx = req.query.post_idx;
  const user_idx = req.query.user_idx;

  try {
      const foundRoom = await room.findAll({
          where: {
              post_idx: post_idx,
              user_idx: user_idx
          }   
      });  
      if (foundRoom.length === 0) { //데이터 베이스에서 조회된 결과가 없다면,
          console.log(`${user_idx}가 참여하였습니다.`);
          await room.create({
          post_idx: post_idx,
          user_idx: user_idx,
          check: '0'
          });
          return res.status(200).json({ message: '참여하였습니다.' });
      } else {
          console.log(`${user_idx}는 이미 참여하였습니다.`);
          return res.status(200).json({ message: '이미 참여한 유저입니다.' });
      }
  } catch (error) {
      console.error('joinRoom() 오류:', error);
      return res.status(500).json({ message: '채팅방 참여 오류 발생' });
  }
};

exports.checkPermission = async (req, res, next) => {
  const post_idx = req.query.post_idx;
  const user_idx = req.query.user_idx;
  try {
    const FindWriter = await post.findOne({
      where: { idx: post_idx },
    });
    console.log('FindWriter:',FindWriter.writer);
    if (!FindWriter) {
      console.log("해당하는 방 없음");
      return res.status(404).json({ message: '해당하는 방이 없습니다.' });
    }

    if (FindWriter.writer != user_idx ) {
      console.log("작성자 외의 접근 시도");
      return res.status(403).json({ message: '작성자만이 권한이 있습니다.' });
    }
    else{
      return res.status(200).json({ message: '권한을 가지고 있습니다.' });
    }
  } catch (error) {
    console.error('checkPermission() 오류:', error);
    return res.status(500).json({ message: '채팅방 체크 권한 오류 발생'});
  }
};

//사용자가 writer일 때만 사용할 수 있다는 가정
exports.grantCheck = async (req, res) => {
    const post_idx = req.query.post_idx; //현재 room 위치
    const user_idx = req.query.user_idx; //바꿀 user의 idx
    const check = req.query.check;//바꿀 room의 check
  try {
      console.log('post_idx: ',post_idx);
      const roomInfo = await room.findOne({ where: { post_idx: post_idx } });
      if (!roomInfo) {
          console.log("해당하는 방이 없음");
          return res.status(404).json({ message: '해당하는 방이 없습니다.' });
      }
      const [grantCount]  = await room.update({ 
          user_idx: user_idx,
          check: check },{ 
          where: {
              post_idx: post_idx,
          },
    });
    console.log('grantCount: ',grantCount);
    if (grantCount > 0) {
      console.log("updateCheck() 성공");
      return res.status(200).json({ message: 'check 업데이트 성공' });
    }
    else {
      console.log("check update fail");
      return res.status(500).json({ message: 'check 업데이트 실패' });
    }
  } catch (error) {
    console.error('updateCheck() 오류:', error);
    return res.status(500).json({ message: 'check 업데이트 중 오류 발생' });
  }
}