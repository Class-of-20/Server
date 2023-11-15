const user = require('../Model/user');

// 아이디 중복 체크 함수
async function checkDuplicateId(id) {
    try {
        const foundUser = await user.findOne({
            where: { id: id },
        });
        return foundUser;
    } catch (error) {
        console.error('find(id) 쿼리 실행 중 오류 발생:', error);
        throw error;
    }
}

// 별명 중복 체크 함수
async function checkDuplicateName(name) {
    try {
        const foundUser = await user.findOne({
            where: { name: name },
        });
        return foundUser;
    } catch (error) {
        console.error('find(name) 쿼리 실행 중 오류 발생:', error);
        throw error;
    }
}

// 회원가입 함수
async function createUser(req, res, id, password, name, address1, address2, address3, profileImage) {
    try {
        lengthId = id.length;
        lengthPassword = password.length;
        lengthName = name.length;

        // 길이 제한 체크
        if(lengthId < 5 || lengthId > 20) {
            console.log(`현재 아이디가 ${lengthId}자입니다. 아이디를 5~20자로 다시 설정하세요.`);
            return res.status(400).json({ message: '아이디를 5~20자로 다시 설정하세요.' });
        };
        if(lengthPassword < 5 || lengthPassword > 20) {
            console.log(`현재 비밀번호가 ${lengthPassword}자입니다. 비밀번호를 5~20자로 다시 설정하세요.`);
            return res.status(400).json({ message: '비밀번호를 5~20자로 다시 설정하세요.' });
        }
        if(lengthName < 2 || lengthName > 10) {
            console.log(`현재 별명이 ${lengthName}자입니다. 별명을 2~10자로 다시 설정하세요.`);
            return res.status(400).json({ message: '별명을 2~10자로 다시 설정하세요.' });
        }

        // 아이디 중복 체크
        const existingUser = await checkDuplicateId(id);
        if (existingUser) {
            console.log(`${existingUser.id} 아이디가 중복됩니다.`);
            return res.status(400).json({ message: '아이디가 중복됩니다.' });
        } else {
            console.log('사용 가능한 아이디입니다.');

            // 별명 중복 체크
            const existingName = await checkDuplicateName(name);
            if (existingName) {
                console.log(`${existingName.name} 별명이 중복됩니다.`);
                return res.status(400).json({ message: '별명이 중복됩니다.' });
            } else {
                console.log('사용 가능한 별명입니다.');

                // 회원가입
                const result = await user.create({
                    id: id,
                    password: password,
                    name: name,
                    address1: address1,
                    address2: address2,
                    address3: address3,
                    profileImage: profileImage,
                });
                console.log('회원가입 성공!');
                return res.status(200).json({ message: '회원가입 성공' });
            }
        }
    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        return res.status(400).json({ message: '회원가입 중 오류 발생' });
    }
}

// 회원가입 요청 처리
exports.postCreateUser = (req, res, next) => {
    const { id, password, name, address1, address2, address3, profileImage } = req.body;
    createUser(req, res, id, password, name, address1, address2, address3, profileImage);
};
