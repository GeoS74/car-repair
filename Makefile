run:
	docker run \
	--rm -d \
	--name foo \
	-p 8080:80 \
	-e BACK_PORT=3300 \
	bro
