const post = require('../Model/post');
const {Op, TIME, DATE} = require("sequelize");
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
};


exports.readPostByIdx = async (req, res, next) => {
    const idx = req.params.idx;
    try {
        const readPost = await post.findOne({
            where: {idx: idx},
        });
        if (readPost) {
            console.log("readPostByIdx() 성공");
            return res.status(200).json({ message: '게시글 조회 완료', readPost });
        } 
    } catch (error) {
        console.error('readPostByIdx() 오류:', error);
        return res.status(500).json({ message: '게시글 조회 중 오류 발생'});
    }
};


exports.sortPostByWrite = async (req, res, next) => {
    const writeDate = req.query.writeDate;
    try {
        const sortedPosts = await post.findAll({
            order: [['writeDate', 'DESC']],
        });
        if (sortedPosts) {
            console.log("sortPostByWrite() 성공");
            return res.status(200).json({ message: '게시글 기본 정렬 완료', sortedPosts });
        }
    } catch (error) {
        console.error('sortPostByWrite() 오류:', error);
        return res.status(500).json({ message: '게시글 기본 정렬 중 오류 발생'});
    }
};


exports.sortPostByMenu = async (req, res, next) => {
    const menu1 = req.query.menu1;
    const menu2 = req.query.menu2;
    try {
        const sortedPosts = await post.findAll({
            where: {
                menu1: menu1,
                menu2: menu2,
            },
            order: [['menu1', 'ASC'], ['menu2', 'ASC']],
        });
        if (sortedPosts) {
            console.log("sortPostByMenu() 성공");
            return res.status(200).json({ message: '게시글 메뉴순 정렬 완료', sortedPosts });
        }
    } catch (error) {
        console.error('sortPostByMenu() 오류:', error);
        return res.status(500).json({ message: '게시글 메뉴순 정렬 중 오류 발생'});
    }
};


exports.sortPostByMeet = async (req, res, next) => {
    const meetDate = req.query.meetDate;
    try {
        const sortedPosts = await post.findAll({
            where: { 
                meetDate: {
                    [Op.lte]: meetDate,     // 지정 날짜 이전의 게시물
                },
            },
            order: [['meetDate', 'DESC']]
        });
        if (sortedPosts) {
            console.log("sortPostByMeet() 성공");
            return res.status(200).json({ message: '게시글 날짜순 정렬 완료', sortedPosts });
        }
    } catch (error) {
        console.error('sortPostByMeet() 오류:', error);
        return res.status(500).json({ message: '게시글 날짜순 정렬 중 오류 발생'});
    }
};


exports.sortPostByPeople = async (req, res, next) => {
    const people = req.query.people;
    try {
        const sortedPosts = await post.findAll({
            where: {people: people},
        });
        if (sortedPosts) {
            console.log("sortPostByPeople() 성공");
            return res.status(200).json({ message: '게시글 인원순 정렬 완료', sortedPosts });
        }
    } catch (error) {
        console.error('sortPostByPeople() 오류:', error);
        return res.status(500).json({ message: '게시글 인원순 정렬 중 오류 발생'});
    }
};


exports.sortPostByAddress = async (req, res, next) => {
    const address2 = req.query.address2;
    const address3 = req.query.address3;
    try {
        const sortedPosts = await post.findAll({
            where: {
                address2: address2,
                address3: address3,
            },
            order: [['address2', 'ASC'], ['address3', 'ASC']],
        });
        if (sortedPosts) {
            console.log("sortPostByAddress() 성공");
            return res.status(200).json({ message: '게시글 주소순 정렬 완료', sortedPosts });
        }
    } catch (error) {
        console.error('sortPostByAddress() 오류:', error);
        return res.status(500).json({ message: '게시글 주소순 정렬 중 오류 발생'});
    }
};


exports.searchPost = async (req, res, next) => {
    const search = req.query.search;
    try {
        const foundPost = await post.findAll({
            where: {
                [Op.or]: [
                    { address2: { [Op.like]: `%${search}%` } },
                    { address3: { [Op.like]: `%${search}%` } },
                    { placeName: { [Op.like]: `%${search}%` } },
                    { title: { [Op.like]: `%${search}%` } },
                    { content: { [Op.like]: `%${search}%` } },
                    { menu1: { [Op.like]: `%${search}%` } },
                    { menu2: { [Op.like]: `%${search}%` } },
                ]
            }
        });
        if (foundPost) {
            console.log("searchPost() 성공");
            return res.status(200).json({ message: '게시글 검색 완료', foundPost });
        }
    } catch (error) {
        console.error('searchPost() 오류:', error);
        return res.status(500).json({ message: '게시글 검색 중 오류 발생'});
    }
};