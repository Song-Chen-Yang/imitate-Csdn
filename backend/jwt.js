const jwt = require('jsonwebtoken')
let secret = 'song'

module.exports = {
	//生成token
	generateToken(data) {
		let token = jwt.sign(data,secret);
		return token;
	},
	//解密token
	getDecryptToken(token){
		let data = jwt.verify(token,secret);
		return data;
	}
}