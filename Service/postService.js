const post = require('../Model/post');
const {TIME, DATE} = require("sequelize");
const {now} = require("sequelize/lib/utils");

exports.createPost = (req, res, next) => {
    try{
        const { writer, address2, address3, placeName, meetDate, meetTime,
            people, title, content, menu1, menu2, image } = req.body;

        post.create({
            writer: writer,
            address2: address2,
            address3: address3,
            placeName: placeName,
            meetDate: meetDate,
            meetTime: meetTime,
            people: people,
            title: title,
            content: content,
            menu1: menu1,
            menu2: menu2,
            image: image,

            // 그 외
            //writeDate: new Date(now.getDate()),
            //writeTime: new DATE(now.getTime()),
        });

        console.log("createPost() 성공");
        return res.status(200).json({message: '게시글 작성 완료'});

    } catch (error) {
        console.error('createPost() 오류:', error);
        return res.status(400).json({message: '게시글 작성 중 오류 발생'});
    }
}


exports.deletePost =async(req, res) => {
   
    try {
        await post.destroy({
            where: { idx: req.params.idx },
        });
        console.error('deletePost() 성공');
        return res.status(200).json({message: '게시글 삭제 완료'});
    } catch (error) {
        console.log('deletePost() 오류:');
        return res.status(400).json({ message: '게시물 삭제 중 오류 발생' });
    }









































    
};
