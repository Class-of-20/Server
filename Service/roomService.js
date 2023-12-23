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
