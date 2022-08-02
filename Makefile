develop:
	npx webpack serve

install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

build:
	rm -rf dist
	NODE_ENV=production npx webpack
