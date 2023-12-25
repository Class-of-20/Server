const room = require('../Model/room');
const post = require('../Model/post');
const user = require('../Model/user');
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
    } else{
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
      
      //정원 수
      const postInfo = await post.findOne({where:{idx:post_idx}});
      console.log('정원 수: ', postInfo.dataValues.people);
      
      if (!postInfo) {
        console.log("해당하는 게시물이 없음");
        return res.status(404).json({ message: '해당하는 게시물이 없습니다.' });
      }    
      
      //들어갈 room 정보 받기
      const roomInfo = await room.findOne({ where: { post_idx: post_idx } });
      if (!roomInfo) {
        console.log("해당하는 방이 없음");
        return res.status(404).json({ message: '해당하는 방이 없습니다.' });
      }
  
      //check된 인원 수 불러오기
      countCheck =await room.findAll({ where: { post_idx: post_idx, check: 1} });
      console.log('check된 인원 수:', countCheck.length);
  
      const [grantCount]  = await room.update({ 
        user_idx: user_idx,
        check: check },{ 
        where: {
          post_idx: post_idx,
        },
      });
  
      if (grantCount > 0&&countCheck.length <postInfo.dataValues.people) {
        console.log("updateCheck() 성공");
        return res.status(200).json({ message: 'check 업데이트 성공' });
      } else if(countCheck.length >=postInfo.dataValues.people){
        console.log("정원 참");
        return res.status(500).json({ message: '정원 참' });
      } else {
        console.log("check update fail");
        return res.status(500).json({ message: '이미 적용이 됨' });
      }
    } catch (error) {
      console.error('updateCheck() 오류:', error);
      return res.status(500).json({ message: 'check 업데이트 중 오류 발생' });
    }
  }
}


exports.deleteRoom =async(req, res) => {
  try {
      await room.destroy({
          where: { idx: req.params.idx },
      });
      console.error('deleteRoom() 성공');
      return res.status(200).json({message: '채팅방 삭제 완료'});
  } catch (error) {
      console.log('deleteRoom() 오류:');
      return res.status(400).json({ message: '채팅방 삭제 중 오류 발생' });
  } 
};
  
  exports.countCheck= async (req, res) =>
  {
    const post_idx = req.query.post_idx; //현재 room 위치
    try{
      const countCheck =await room.findAll({ where: { post_idx: post_idx, check: 1} });
  
      if (countCheck.length>=0) {
        console.log("countCheck():",countCheck.length);
        return res.status(200).json({ message: "countCheck() 성공", count: countCheck.length })
      } else {
        console.log("check update fail");
        return res.status(500).json({ message: '이미 적용이 됨' });
      }
    }catch{
      console.error('countCheck() 오류:', error);
      return res.status(200).json({ message: "countCheck() 중 오류 발생"});
    }
  }