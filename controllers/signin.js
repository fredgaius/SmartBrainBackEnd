const handleSignin = (cnnPostgreSQL, bcrypt) => (req, res) => {
	// Using destructuring on the req.body
	// It is assumed that id, email, password, name are posted from client
	const {email, password} = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	cnnPostgreSQL.select('email', 'hash')
		.from('login').where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				return cnnPostgreSQL.select('*').from('users')
					.where('email', '=', email)
					.then(user => {
							res.json(user[0]);
					})
					.catch(err =>	res.status(400).json('Unable to get user.'))	
			} else {
				res.json('Wrong credentials.');
			}
		})
		.catch(err =>	res.status(400).json('Wrong credentials.'))				
}

module.exports = { 
	handleSignin: handleSignin
};