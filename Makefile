install:
	docker-compose run --rm php php composer.phar install
	docker-compose run --rm --entrypoint=npm js install

start:
	docker-compose up -d

seed:
	docker-compose exec php vendor/bin/phinx migrate
	docker-compose exec php vendor/bin/phinx seed:run

logs:
	docker-compose logs -f

test: test\:client

test\:client:
	docker-compose exec js npm test

# Usage: `sudo make clean` (files created by Docker are owned by root user)
clean:
	rm -rf server/public/vendor client/node_modules client/dist docker-cache

.PHONY: install start seed logs test test\:client clean
