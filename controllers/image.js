const Clarifai = require('clarifai');

// This initializes 'app' variable and set my Clarifai Developer's API key for 
// use in the face-detection phase of this application.
const app = new Clarifai.App({
 apiKey: '68675e39654c4a868c0db4f90b5e84b4'
});

const handleApiCall = (req, res) => {
	const { input } = req.body;
	app.models
	  .predict(Clarifai.FACE_DETECT_MODEL, input)
	  .then(data => {
	    res.json(data);
	  })
	  .catch(err => {
	  	res.status(400).json('Error: Unable to work with API!');
	  });
}

const handleImagePut = (cnnPostgreSQL) => (req, res) => {
	const { id } = req.body;
	// Teachers solution
	cnnPostgreSQL('users')
		.where('id','=',id) 
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {	
				res.json(entries);
		})
		.catch(err => {
			res.status(400).json('Error updating entries!')
		})
}

module.exports = { 
	handleImagePut: handleImagePut,
	handleApiCall: handleApiCall
};

// --OR simply--
/*
module.exports = { 
	handleImagePut,
	handleApiCall
}
*/