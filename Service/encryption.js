const util = require("util");
const crypto = require("crypto");

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

// salt 생성 함수
const createSalt = async () => {
    const buf = await randomBytesPromise(64);
    return buf.toString("base64");
};

// 비밀번호 암호화 함수
const createHashedPassword = async (password) => {
    const salt = await createSalt();
    const key = await pbkdf2Promise(password, salt, 13191, 64, "sha512");
    const hashedPassword = key.toString("base64");

    console.log("hashedPassword:", hashedPassword);
    console.log("salt:", salt);
    return { hashedPassword, salt };
};

// 비밀번호 검증 함수 (사용자가 입력한 비밀번호, DB에 저장된 salt, DB에 저장된 hashedPassword)
const verifyPassword = async (enteredPassword, userSalt, hashedPassword) => {
    const key = await pbkdf2Promise(enteredPassword, userSalt, 13191, 64, "sha512");
    const functionPassword = key.toString("base64");

    if (functionPassword === hashedPassword) return true;
    return false;
};

module.exports = { createHashedPassword };
module.exports = { verifyPassword };