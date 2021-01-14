import path from 'path';

const getFixturePath = (filename, format = '') => console.log(path.normalize(path.join('__fixtures__', format, filename)));

getFixturePath('file1.json', 'json');
