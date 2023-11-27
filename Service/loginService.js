const user = require('../Model/user');

exports.login = async(req, res, next) => {
    try{
        const { id, password } = req.body;

        // 아이디 존재 여부 확인
        let person = await user.findOne({
            where: {
                id : id
            }
        });

        // 비밀번호 검증
        const result = verifyPassword(password, result.salt, result.password);

        if (!person || !result) {
            console.log("login() 실패");
            res.status(400).json({message: '아이디 또는 비밀번호가 일치하지 않습니다.'});
            return;
        }

        console.log("login() 성공");
        return res.status(200).json({message: '로그인이 성공적으로 완료되었습니다.', name: person.name, profileImage: person.profileImage, token: '임시 토큰값'});

    } catch (error) {
        console.error('login() 오류:', error);
        return res.status(400).json({message: '로그인 중 오류 발생'});
    }
}