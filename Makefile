start-db:
	mkdir -p pgdata
	docker run -e POSTGRES_PASSWORD=pg -p 5432:5432 -v $(shell pwd)/pgdata:/var/lib/postgresql/data postgres
