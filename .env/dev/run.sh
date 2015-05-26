#!/usr/bin/env bash
source /home/vagrant/.profile

# stop env
sudo service nginx stop
sudo service redis_6379 stop
sudo service mongod stop
pm2 stop /project/.env/dev/config.json

# update deps.
cd /project/api && npm install

# start project
sudo service redis_6379 start
sudo service mongod restart
sudo cp /project/.env/dev/vhost /etc/nginx/sites-available/default
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
sudo service nginx restart
cd /project/ && pm2 startOrRestart .env/dev/config.json
node /project/api/utils/db.js reset