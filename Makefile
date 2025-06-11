COMPOSE_FILE=docker-compose.yml

.PHONY:
	run-dev
	run-dev-build

run-dev:
	docker-compose -f $(COMPOSE_FILE) up

run-dev-build:
	docker-compose -f $(COMPOSE_FILE) up --build