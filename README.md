# Basic Login api with JWT


## Basic useful feature list:

* User Registeration
* User Login 
* Token Verification


## Installation steps

	1.Run "npm install"  to install required dependencies
    2.Create ssl certificate for encription and save it as ssl.pfx in root directory
    3.create .env file in root directory and add this information
    	db_user = {username}
		db_password = {password}
		db_host = {host}
		round = {salt_rounds}
		jwt_secret = {jwt_secret_key}
		ssl_key = {ssl password}
     
    
    

## Endpoints 
- #### Registeration
	- method: POST
    - header: "Content-type":"application/json"
    - param: name, email, password
    - path: {host}/api/users/register

- #### Login
	- method: POST
    - header: "Content-type":"application/json"
    - param:  email, password
    - path: {host}/api/users/login
    
- #### Verify
	- method: GET/POST
    - header: "auth-token":{token(from user object)}
    - path: {host}/api/verify



### Note:
	All this api uses https not http.
    If you use self signed certificate make sure you disable verification on client side.