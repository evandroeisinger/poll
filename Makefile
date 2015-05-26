run:
	vagrant up
stop:
	vagrant halt
reload:
	vagrant reload
ssh:
	vagrant ssh

# production
ssh-prod:
	chmod 400 .env/prod/key.pem
	ssh -i .env/prod/key.pem ubuntu@52.6.170.160
setup-prod:
	chmod 400 .env/prod/key.pem
	chmod 766 .env/prod/setup.sh && .env/prod/setup.sh
	pm2 deploy .env/prod/deploy.json production setup
deploy-prod:
	pm2 deploy .env/prod/deploy.json production update

# env tasks
run-prod:
	-cd api && npm install
	-sudo service redis_6379 start
	-sudo service mongod restart
	-sudo cp .env/prod/vhost /etc/nginx/sites-available/default
	-sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
	-sudo service nginx restart
	pm2 startOrRestart .env/prod/config.json
stop-prod:
	-sudo service nginx stop
	-sudo service redis_6379 stop
	-sudo service mongod stop
	pm2 delete .env/prod/config.json

# load tests
load-test:
	# siege -b -t5s -c10 "127.0.0.1:8080/api/poll/current";
	# siege -b -t5s -c10 "127.0.0.1:8080/api/candidates";
	# siege -b -t5s -c10 "127.0.0.1:8080/api/polls/ended";
	# siege -b -t5s -c10 "127.0.0.1:8080/api/poll/result/{poll-id}";
	# siege -b -t5s -c10 -H 'Content-Type: application/json' "127.0.0.1:8080/api/poll POST {\"candidates\":[\"{candidate-id}\",\"{candidate-id}\"]}"
	# siege -b -t5s -c10 "127.0.0.1:8080/api/vote/{poll-id}/{candidate-id} POST"