const user = require('../Model/user');
const {verifyPassword} = require("./encryption");

exports.login = async(req, res, next) => {
    try{
        const { id, password } = req.body;

        // 아이디 존재 여부 확인
        const person = await user.findOne({
            where: {
                id : id
            }
        });

        if (!person) {
            console.log("login() 실패 - 유저 미존재");
            res.status(400).json({message: '아이디 또는 비밀번호가 일치하지 않습니다.'});
            return;
        };

        // 비밀번호 검증
        const result = await verifyPassword(password, person.salt, person.password);

        if(!result) {
            console.log("login() 실패 - 비밀번호 불일치");
            res.status(400).json({message: '아이디 또는 비밀번호가 일치하지 않습니다.'});
            return;
        };

        // 세션 설정
        req.session.idx = person.idx;

        console.log("login() 성공");
        return res.status(200).json({message: '로그인이 성공적으로 완료되었습니다.', session: req.session});

    } catch (error) {
        console.error('login() 오류:', error);
        return res.status(400).json({message: '로그인 중 오류 발생'});
    }
}