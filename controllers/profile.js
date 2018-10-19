const handleProfileGet = (cnnPostgreSQL) => (req, res) => {
	// using destructuring
	const { id } = req.params;
	cnnPostgreSQL.select('*').from('users').where({id:id}) // OR .where({id})
		.then(user => {	
			if (user.length) { // OR if (user.length > 0)
				res.json(user[0]);
			} else {
				res.json('Sorry, user does not exist!');
			}
		})
		.catch(err => {
			res.status(400).json('Error getting user!')
		}) 
}

module.exports = { 
	handleProfileGet: handleProfileGet
};