build:
	docker-compose build
	docker-compose exec php php composer.phar install
	docker-compose exec php vendor/bin/phinx migrate
	docker-compose exec php vendor/bin/phinx seed:run
	docker-compose exec js npm install

start:
	docker-compose up -d

.PHONY: build start
