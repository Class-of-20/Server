const user = require('../Model/user');

exports.postCreateUser = (req, res, next) => {
    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;

    user.create({
        id: id,
        password : password,
        name : name,
        address : address
    })
        .then(result => {
            console.log('회원가입 성공!');
            res.status(200).json({ message: 'Create User Success!' });
        })
        .catch(err => {
            console.error('회원가입 실패:', err);
            res.status(500).json({ message: 'Create User Fail!' });
        });
};