COMPOSE_FILE=docker-compose.yml

.PHONY:
	run-dev
	run-dev-build
	frontend-test

run-dev:
	docker-compose -f $(COMPOSE_FILE) up

run-dev-build:
	docker-compose -f $(COMPOSE_FILE) up --build

frontend-test:
	docker compose run --rm frontend yarn test --watchAll=false