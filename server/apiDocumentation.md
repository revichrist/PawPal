# Movie API Documentation

## Endpoints :

List of available endpoints:

1. `POST /login`
2. `POST /register`
3. `POST /googleLogin`
4. `GET /pet`
5. `GET /pet/randomFacts`
6. `GET /pet/detail/:id`
7. `POST /pet`
8. `GET /pet/admin`
9. `PATCH /pet/:id`
10. `DELETE /pet/:id`
11. `POST /pet/adopt/:petId`

## 1. `POST /login`
Description:

- Login to the website

Request:

- body:

```json
{
  "email": STRING,
  "password": STRING
}
```

_Response (200 - OK)_

```json
{
  "access_token": STRING,
  "isAdmin": BOOLEAN
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required",

  OR

  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

## 2. `POST /register`
Description:

- Creating new account

Request:

- body:

```json
{
  "username": STRING,
  "email": STRING,
  "password": STRING,
}
```

_Response (201 - Created)_

```json
{
  "id": INTEGER,
  "username": STRING,
  "email": STRING
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required",
  
  OR

  "message": "Email must be unique",

  OR

  "message": "Invalid email format",

  OR

  "message": "Email is required",
  
  OR

  "message": "Password is required" 
}
```

## 3. `POST /googleLogin`

Description:

- Login to the website via google OAuth

Request:

- headers:

```json
{
  "google_token": STRING
}
```

_Response (200 - OK)_

```json
{
  "access_token": STRING,
  "isAdmin": BOOLEAN
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "There's an error when fetching user's token"
}
```

## 4. `GET /pet`
Description:

- Fetch all pets with status "Ready"

Request:

- query: 

```json
{
  "currentPage": INTEGER
}
```

_Response (200 - OK)_

```json
{
  "totalPage": INTEGER,
  "data": [
    {
      "id": INTEGER,
      "name": STRING,
      "type": STRING,
      "gender": STRING,
      "imageUrl": STRING,
      "weight": INTEGER,
      "isNeutered": BOOLEAN,
      "description": STRING,
      "age": INTEGER,
      "status": STRING,
      "UserId": INTEGER
    }, 

    {
      ...
    },

    ...
  ]
}
```

## 5. `GET /pet/randomFacts`
Description:

- 3rd Party API hit using axios (http://dog-api.kinduff.com/api/facts)

_Response (200 - OK)_

```json
  STRING
```

## 6. `GET /pet/detail/:id`
Description:

- Get pet details along with the submitter with id

Request:

- params:

```json
{
  "id": INTEGER
}
```

_Response (200 - OK)_

```json
{
  "id": INTEGER,
  "name": STRING,
  "type": STRING,
  "gender": STRING,
  "imageUrl": STRING,
  "weight": FLOAT,
  "isNeutered": BOOLEAN,
  "description": STRING,
  "age": INTEGER,
  "status": STRING,
  "UserId": INTEGER,
  "User": {
    "username": STRING
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Pet not found"
}
```

## 7. `POST /pet`
Description:

- Get movie data details with movie id

Request:

- body:

```json
{
  "name": STRING,
  "type": STRING,
  "gender": STRING,
  "image": FILE,
  "weight": STRING,
  "isNeutered": BOOLEAN,
  "description": STRING,
  "age": STRING,
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
{
  "message": "(Pet name) will now be in queue to be approved"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Pet image is required",

  OR

  "message": "Pet name is required",

  OR

  "message": "Pet type is required",

  OR

  "message": "Pet gender is required",

  OR

  "message": "Neuter status is required",

  OR

  "message": "Description minimum 5 words"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "You need to login before accessing even further"
}
```


## 8. `GET /pet/admin`

Description:

- Fetch all pet data based on their status (Pending and Adopted)

Request:

- query:

```json
{
  "status": STRING
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
[
 {
    "id": INTEGER,
    "name": STRING,
    "type": STRING,
    "gender": STRING,
    "imageUrl": STRING,
    "weight": INTEGER,
    "isNeutered": BOOLEAN,
    "description": STRING,
    "age": INTEGER,
    "status": STRING,
    "UserId": INTEGER
  }
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "You need to login before accessing even further"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized to do this action"
}
```

## 9. `PATCH /pet/:id`
Description:

- Edit pet status

Request:

- params:

```json
{
  "id": INTEGER
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
{
  "message": "(Pet name) is now ready to be adopted!"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "You need to login before accessing even further"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized to do this action"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Pet not found"
}
```


## 10. `DELETE /pet/:id`
Description:

- Delete pet data from database

Request:

- params:

```json
{
  "id": INTEGER
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
{
  "message": "(Pet name) with ID:(Pet id) has been removed"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "You need to login before accessing even further"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized to do this action"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Pet not found"
}
```

## 11. `POST /pet/adopt/:petId`
Description:

- Adopting pet

Request:

- params:

```json
{
  "id": INTEGER
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
{
  "message": "(Pet name) was adopted"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "You cannot adopt your own submitted pet!"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "You need to login before accessing even further"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Pet not found"
}
```

