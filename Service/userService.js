const user = require('../Model/user');
const {createHashedPassword} = require("./encryption");

// 아이디 중복 체크 함수
exports.checkDuplicateId = async (req, res, next) => {
    const id = req.body.id;

    try {
        const foundUser = await user.findOne({
            where: {id: id},
        });
        if (foundUser) {
            console.log(`${id}는 이미 사용 중인 아이디입니다.`);
            return res.status(200).json({message: '이미 사용 중인 아이디입니다.'});
        } else {
            console.log(`${id}는 사용 가능한 아이디입니다.`);
            return res.status(200).json({message: '사용 가능한 아이디입니다.'});
        }
    } catch (error) {
        console.error('find(id) 쿼리 실행 중 오류 발생:', error);
        throw error;
    }
};

// 별명 중복 체크 함수
exports.checkDuplicateName = async (req, res, next) => {
    const name = req.body.name;

    try {
        const foundUser = await user.findOne({
            where: { name: name },
        });
        if (foundUser) {
            console.log(`${name}는 이미 사용 중인 별명입니다.`);
            return res.status(200).json({ message: '이미 사용 중인 별명입니다.' });
        }
        else{
            console.log(`${name}는 사용 가능한 별명입니다.`);
            return res.status(200).json({ message: '사용 가능한 별명입니다.' });
        }
    } catch (error) {
        console.error('find(name) 쿼리 실행 중 오류 발생:', error);
        throw error;
    }
}

// 회원가입 함수
async function createUser(req, res) {
    try {
        const { id, password, name, address1, address2, address3, profileImage } = req.body;

        // 비밀번호 암호화
        const {hashedPassword, salt} = await createHashedPassword(password);

        console.log("2. hashedPassword:", hashedPassword);
        console.log("2. salt:", salt);

        // 회원가입
        const result = await user.create({
            id: id,
            password: hashedPassword,
            name: name,
            address1: address1,
            address2: address2,
            address3: address3,
            profileImage: profileImage,
            salt: salt,
        });
        console.log('회원가입 성공!');
        return res.status(200).json({ message: '회원가입 성공' });

    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        return res.status(400).json({ message: '회원가입 중 오류 발생' });
    }
}

// 회원가입 요청 처리
exports.postCreateUser = (req, res, next) => {
    createUser(req, res);
};

// 회원탈퇴
exports.postDestroyUser = (req, res, next) => {
    const idx = req.body.idx;
    
    user.destroy({
         where : { idx: idx }
    })
        .then(result => {
            console.log('회원탈퇴 완료');
            res.status(200).json({ message: 'Destroy User Success!' });
        })
        .catch(err => {
            console.error('회원탈퇴 실패:', err);
            res.status(500).json({ message: 'Destroy User Fail!' });
        });

};