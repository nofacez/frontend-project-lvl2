install: 
	npm install

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint: 
	npx eslint .

tests: 
	npm run test