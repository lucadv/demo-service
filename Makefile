SHELL=/bin/bash
default: cov lint

clean:
	rm -rf node_modules

install:
	mkdir -p logs
	npm install

cov:
	./node_modules/.bin/lab -v --leaks -t 100 -a code

lint:
	./node_modules/.bin/eslint .
