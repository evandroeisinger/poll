poll
=============

The main goal is to provide simple and quick way to create a poll application, also providing a dashboard to monitor the poll status.

#### pre-requisites
- [vagrant (v1.6+)](http://www.vagrantup.com/downloads.html);
- [virtual-box (v4.3+)](https://www.virtualbox.org/wiki/Downloads);

#### running

To setup the development environment and get the applications running:

```shell
make run
```

It will start the poll and dashboard applications and the poll worker:

- poll: `http://127.0.0.1:8080`;
- dashboard: `http://127.0.0.1:8080/dashboard`
**user: admin, pass: admin**;

If you need to access the virtual machine:

```shell
make ssh
```

To stop or reload all applications and worker:

```shell
make stop
make reload
```

#### production deployment

To handle with production environment, you need to create a deployment configuration file at `./env/prod/deploy.json` based on `./env/prod/sample.deploy.json`. After that you'll be able to access the production server, deploy to production and setup the production server **(already done)**:

```shell
make ssh-prod
make deploy-prod
make setup-prod # don't do it
```

#### benchmark
To perform the load tests, uncomment the desired service at makefile: **[siege v3+](https://www.joedog.org/siege-home)**

*development environment:*

- POST 280~ vote/secs
- GET 250~ poll/secs
- GET 250~ candidates/secs

**Obs**: *Requests made to the production environment are authenticated with a header token `api-access-token` and [recaptcha](https://developers.google.com/recaptcha/docs/verify). However, development environment doesn't have any authentication.*

```shell
make load-test
```

Makefile

    load-test:
      siege -b -t5s -c10 "http://127.0.0.1:8080/api/poll/current"
      #siege -b -t5s -c10 "http://127.0.0.1:8080/api/candidates"
      #...
