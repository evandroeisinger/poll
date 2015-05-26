ssh -i .env/prod/key.pem ubuntu@52.6.170.160 <<'ENDSSH'
  # general update
  sudo apt-get update
  sudo apt-get install -y build-essential libssl-dev

  # install git
  sudo apt-get -y install git

  # install nginx
  sudo apt-get -y install nginx
  sudo apt-get -y install apache2-utils
  sudo service nginx stop

  # install node
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.1/install.sh | bash
  source $HOME/.bashrc
  nvm install v0.12.3
  nvm use v0.12.3

  # install pm2
  sudo npm install pm2 -g
  sudo pm2 startup ubuntu

  # install redis
  sudo apt-get install -y tcl8.5
  wget http://download.redis.io/redis-stable.tar.gz
  tar xvzf redis-stable.tar.gz
  cd redis-stable
  make
  sudo cp src/redis-server /usr/local/bin/
  sudo cp src/redis-cli /usr/local/bin/
  sudo mkdir /etc/redis
  sudo mkdir /var/redis
  sudo mkdir /var/redis/6379
  sudo cp utils/redis_init_script /etc/init.d/redis_6379
  # need to be manual: sudo cp /project/.env/prod/redis.conf /etc/redis/6379.conf
  sudo update-rc.d redis_6379 defaults
  sudo service redis_6379 start
  sudo service redis_6379 stop

  # install mongo
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
  echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
  sudo service mongod stop

  # install siege
  sudo apt-get install -y siege;

  # create project folder
  sudo rm -rf /project
  sudo mkdir /project
  sudo chmod 777 /project
ENDSSH