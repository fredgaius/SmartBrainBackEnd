const handleRegister = (cnnPostgreSQL, bcrypt) => (req, res) => {
	// Using destructuring on the req.body
	// It is assumed that id, email, password, name are posted from client
	const {email, password, name} = req.body;
	if (!email || !password || !name) {
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	cnnPostgreSQL.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
				return trx('users') // OR " return trx('users')"
				.returning('*')
				.insert({
					name: name,
					email: loginEmail[0],
					joined: new Date()
				})
				.then(user => {
					// Respond by sending the last user data back to client/postman
					res.json(user[0]);
				})
				.catch(err =>	res.status(400).json('Sorry, this user cannot be registered!'))
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err =>	res.status(400).json('Sorry, this user cannot be registered!'))
}

module.exports = { 
	handleRegister: handleRegister
};