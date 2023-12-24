const room = require('../Model/room');
const post = require('../Model/post');
const { Sequelize } = require('sequelize');

exports.readRoom = async (req, res, next) => {
    const user_idx = req.params.user_idx;
    try {
        const readRoom = await room.findAll({
          attributes: ['idx', 'user_idx', 'post_idx', 'check'],
          include: [
            {
              model: post,
              attributes: [],
              where: {
                writer: user_idx
              },
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