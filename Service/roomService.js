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
