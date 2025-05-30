# Intern proyect - Fidesol

Proyect for the creation of a React.js client, php with Laravel framework and mariaDB database for the creation of statistical data generated from `restcountries.com`.

## Requirements

- Docker
- Docker Desktop
- Having any meanings for using the `docker compose -d` command.
  
## Instalation - Using GithHub repository

```bash
git clone https://github.com/cvl0703/docker_trabajoPracticas.git
cd docker_trabajoPracticas
docker compose up -d
```

## Instalation - Using DockerHub repository

- Entry the website: [https://hub.docker.com/search?q=cvl0703](https://hub.docker.com/search?q=cvl0703)
- Pull all the repositories called: `cvl0703/clientefidesol`, `cvl0703/servidorfidesol` and `cvl0703/basedatosmariadb`.
- On the bash cmd use the `docker compose up -d` command.

## Use

- Initialice all the containers.

Access the app on [http://localhost:3000](http://localhost:3000) (React)  
Access the API on [http://localhost:80](http://localhost:80) (Laravel)

## Structure

- `/web` - Backend Laravel
- `/react` - Frontend React
