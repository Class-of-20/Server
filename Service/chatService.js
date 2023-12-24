const chat= require('../Model/chat');

exports.loadChat = async (req, res) => {
    console.log("loadChat() 입장");
    post_idx =  req.query.idx;
    try {
        const sortedChat = await chat.findAll({
            order: [['createdAt', 'ASC']]
            ,where: {post_idx: post_idx},
        });
        if (sortedChat) {
            console.log("loadChat() 성공");
            return res.status(200).json({ message: '메세지 로드 완료', sortedChat});
        }
        else {
            console.log("loadChat() 없음");
            return res.status(200).json({ message: '메세지 없음' });
        }
    } catch (error) {
        console.error('loadChat() 오류:', error);
        return res.status(500).json({ message: '메세지 로드 중 오류 발생'});
    }
};