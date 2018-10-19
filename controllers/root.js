const handleRootGet = (cnnPostgreSQL) => (req, res) => {
	// Get the users database and send it as message to the client
	cnnPostgreSQL
		.select('*')
		.from('users')
		.then(user => {
			if (user[0]) {
				res.json(user);
			} else {
				res.status(404).json('No data to view.');
			}
		})
		.catch(err =>	res.status(400).json('Error accessing database!'))
}

module.exports = { 
	handleRootGet: handleRootGet
};