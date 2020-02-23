# Run this project

1. npm install

2. create MongoDB

3. create .env file as below

```sh

PORT=80
JWT_KEY=somethingcomplicated
MONGODB_URL=

```

# To fix syntax and problems

npm run lint

# Test with Postman

## Create new user 

POST http://localhost/users/

raw + JSON

```json

{
	"name":"William",
	"email":"haoyang324@gmail.com",
	"password":"testpass"
}

```

## Login 

POST http://localhost/users/login

raw + JSON

```json

{
	"email":"haoyang324@gmail.com",
	"password":"testpass"
}

```

## Self info 

Authorization -> Bearer Token

GET http://localhost/users/me

## Logout 

Authorization -> Bearer Token

POST http://localhost/users/me/logout


## Logout from all devices

Authorization -> Bearer Token

POST http://localhost/users/me/logoutall
