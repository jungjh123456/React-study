// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { readFileSync } from 'fs';
import { join } from 'path';

export default (req, res) => {
	const path = join(process.env.PWD, 'db.json');
	console.log(process.env.PWD);
	const data = JSON.parse(readFileSync(path).toString());
	res.statusCode = 200;
	res.json(data);
};
