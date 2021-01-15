import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default (req, res) => {
	const path = join(process.env.PWD, 'db.json');
	const data = JSON.parse(readFileSync(path).toString());
	data.name = 'Mark';
	writeFileSync(path, JSON.stringify(data));
	res.statusCode = 200;
	res.json(data);
};
