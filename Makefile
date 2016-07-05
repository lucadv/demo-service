default:
	./node_modules/.bin/lab -v -t 100 -a code

clean:
	rm -rf node_modules

install:
	mkdir -p logs
	npm install

test:
	./node_modules/.bin/lab -v -t 100 -a code
