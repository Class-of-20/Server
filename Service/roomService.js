const room = require('../Model/room');
const post = require('../Model/post');
const user = require('../Model/user');
const { Sequelize } = require('sequelize');

exports.createRoom = async (req, res, next) => {
  try{
      const { user_idx, post_idx, } = req.body;

      room.create({
        user_idx: user_idx,
        post_idx: post_idx,
      });

      console.log("createRoom() 성공");
      return res.status(200).json({message: '채팅방 생성 완료'});

  } catch (error) {
      console.error('createRoom() 오류:', error);
      return res.status(400).json({message: '채팅방 생성 중 오류 발생'});
  }

};

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

exports.readRoomUser = async (req, res, next) => {
  const post_idx = req.params.post_idx;
  try {
    const readRoomUser = await room.findAll({
      attributes: ['post_idx'],
      include: [
        {
          model: user,
          attributes: ['name'],
        },
      ],
      where: {
        post_idx: post_idx,
      },
    });
    if (readRoomUser) {
        console.log("readRoomUser() 성공");
        return res.status(200).json({ message: '채팅방 유저 조회 완료', readRoomUser });
    } 
  } catch (error) {
      console.error('readRoomUser() 오류:', error);
      return res.status(500).json({ message: '채팅방 유저 조회 중 오류 발생'});
  }
};