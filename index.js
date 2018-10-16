const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
	res.send('The server is running');
});

// POST

server.post('/api/zoos', (req, res) => {
	const zoo = req.body;

	db.insert(zoo)
		.into('zoos')
		.then((ids) => {
			res.status(201).json(ids);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

server.get('/api/zoos', (req, res) => {
	db('zoos')
		.then((zoos) => {
			res.status(200).json(zoos);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

server.get('/api/zoos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const zoo = await db('zoos').where({ id });
		res.status(200).json(zoo);
	} catch (error) {
		res.status(500).json(error);
	}
});

server.delete('/api/zoos/:id', (req, res) => {
	const { id } = req.params;

	db('zoos')
		.where({ id })
		.del()
		.then((count) => {
			res.status(200).json(count);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

server.put('/api/zoos/:id', (req, res) => {
	const { id } = req.params;
	const updatedBody = req.body;

	db('zoos')
		.where({ id })
		.update(updatedBody)
		.then((count) => {
			res.status(200).json(count);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
