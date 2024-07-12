const bcrypt = require('bcrypt')

// * HASH Function || Encrypt
exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

// * COMPARE || Decrypt
exports.comparePassword = (normalPassword, hashedPassword) => {
    return bcrypt.compare(normalPassword, hashedPassword);
}