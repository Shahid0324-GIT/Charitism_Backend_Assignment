# Charitism Backend Assignment

## Creating A ToDo API With JWT authentication and CRUD API's

- Added Features:
  - Used JWT Authentication.
  - Used Bcrypt package to hash and store the password.
  - ### Crud Operaions:
    - Creating a todo for logged in user.
    - Fetching all the ToDo's of the particular logged in user.
    - Editing a particular todo by providing the appropriate ID.
    - Deleting a single or all the ToDO's of the logged In User.
  - Provided the PostMan collection.

# The Format For the request body and the response for the succesful request.

- ### SignUp:

  #### Request:

  - {
    "username" : "John Doe",
    "password": "johndoe",
    "email" : "johndoe@mail.com"
    }

  #### Response:

  - {
    "username": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDQzNzg3MTEsImV4cCI6MTcwNDQ2NTExMX0.CncnFgfRE7Gi2d5RMfXM1_I-ayu7nO4ZUJ5tpikuwSQ",
    "email": "johndoe@mail.com"
    }

- ### Login:

  #### Request:

  - {
    "password": "johndoe",
    "email" : "johndoe@mail.com"
    }

  #### Response:

  - {
    "userId": "6596c1579c807fe0b9fb0a83",
    "username": "John Doe",
    "email": "johndoe@mail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTZjMTU3OWM4MDdmZTBiOWZiMGE4MyIsImlhdCI6MTcwNDM3ODgyMiwiZXhwIjoxNzA0NDY1MjIyfQ.Lw432FlY1dJ5EfxyiFxrpeJ-qVIEnsuY_zfJfP_MA0E"
    }

- ### Creating a ToDo after a succesful login:

  #### Request:

  - {
    "userId" : "6596c1579c807fe0b9fb0a83",
    "todo" : "Bake the cake.",
    "status" : "Pending"
    }

  #### Response:

  - {
    "message": "ToDo created succesfully",
    "todo": {
    "todo": "Bake the cake.",
    "createdUser": "6596c1579c807fe0b9fb0a83",
    "createdUserName": "John Doe",
    "status": "Pending",
    "\_id": "6596c2549c807fe0b9fb0a88",
    "createdAt": "2024-01-04T14:36:04.093Z",
    "updatedAt": "2024-01-04T14:36:04.093Z",
    "\_\_v": 0
    }
    }

- ### Editing a ToDo:

  #### Request (Must Provide the appropriate todoId):

  - {
    "updatedToDo" : "Bought The cake flour",
    "status" : "done"
    }

  - ##### ToDo before Editing:

          - {
              "_id": {
                "$oid": "6596c2de9c807fe0b9fb0a8c"
              },
              "todo": "Restocking the cake flour",
              "createdUser": {
                "$oid": "6596c1579c807fe0b9fb0a83"
              },
              "createdUserName": "John Doe",
              "status": "Pending",
              "createdAt": {
                "$date": "2024-01-04T14:38:22.693Z"
              },
              "updatedAt": {
                "$date": "2024-01-04T14:38:22.693Z"
              },
              "__v": 0
            }

  #### Response:

  - {
    "message": "ToDo Updated!"
    }

  - ##### ToDo after Editing:

          - {
              "_id": {
                "$oid": "6596c2de9c807fe0b9fb0a8c"
              },
              "todo": "Bought The cake flour",
              "createdUser": {
                "$oid": "6596c1579c807fe0b9fb0a83"
              },
              "createdUserName": "John Doe",
              "status": "done",
              "createdAt": {
                "$date": "2024-01-04T14:38:22.693Z"
              },
              "updatedAt": {
                "$date": "2024-01-04T14:43:16.636Z"
              },
              "__v": 0
          }

- ### Fetching All the ToDo's of a User:

  #### Request (Must provide the userId in the request):

  - {
    "userId" : "6596c1579c807fe0b9fb0a83",
    }

  #### Response:

  - {
    "message": "All your ToDo's",
    "todos": [
    {
    "_id": "6596c2549c807fe0b9fb0a88",
    "todo": "Bake the cake."
    },
    {
    "_id": "6596c2de9c807fe0b9fb0a8c",
    "todo": "Bought The cake flour"
    },
    {
    "_id": "6596c2fd9c807fe0b9fb0a90",
    "todo": "Restocking the chici powder and vanilla essence."
    },
    {
    "_id": "6596c30d9c807fe0b9fb0a94",
    "todo": "Bringing the cake paper."
    },
    {
    "_id": "6596c31d9c807fe0b9fb0a98",
    "todo": "Gluten and cream."
    }
    ]
    }

- ### Deleting a Single ToDo:

  #### Request(Must Provide the Id of the todo as the path parameter):

  #### Response:

      - {
          "message": "ToDo Deleted Successfully!"
        }

- ### Deleting all the ToDo's of a user:

  #### Request:

  - {
    "userId": "6596c1579c807fe0b9fb0a83"
    }

  #### Response:

  - {
    "message": "All todo's have been deleted"
    }
