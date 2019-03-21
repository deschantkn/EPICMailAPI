FORMAT: 1A

# EPICmail API

The Backbone of plain and simple communication

# Group Auth

Signup and Login resources in the API.

## Signup [/auth/signup]

### Create an EPICmail account [POST]

You may create a new account with this action. It takes a JSON object containing the user's information

+ firstName (string) - User's first name
+ lastName (string) - User's last name
+ password (string) - User's account password
+ email (string) - User's email

+ Request (application/json)

        {
          "firstName": "John",
          "lastName": "Smith",
          "password": "SafePassword384",
          "email": "johnsmith@epic.mail"
        }

+ Response 201 (application/json)

        {
          "status": 201,
          "data": [{
            "token": "45erkjherht45495783",
          }]
        }

## Signin [/auth/signin]

### Login to an existing account [POST]

You may login to your EPICmail account with this action. It takes a JSON object containing the user's email and password

+ email (string) - User's email
+ password (string) - User's password

+ Request (application/json)

        {
          "email": "johnsmith@epic.mail",
          "password": "SafePassword384"
        }

+ Response 200 (application/json)

        {
          "status": 200,
          "data": [{
            "token": "45erkjherht45495783",
          }]
        }

# Group Messages

Messages related resources in the API.

## Messages [/messages]

### Create or send an email [POST]

+ from (string) - Message sender's email address
+ to (string) - Message receiver's email address
+ subject (string) - Message subject
+ message (string) - Message content
+ status (string) - Message status. Draft, Sent or Read
+ parentMessageId (optional, number) - ID of the message being replied to

+ Request (applicaiton/json)

        {
          "from": "sarah@epic.mail",
          "to": "johnsmith@epic.mail",
          "subject": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "status": "sent",
          "parentMessageId": 2658420254
        }

+ Response 201 (application/json)

        {
          "status":​​ 201,
          "data":​​ [​{
            "id"​:​​ 3694498647,
            "createdOn"​: "2019-03-08T07:10:51.297Z​",
            "​subject"​:​​ "New Message",
            "message":​​ "You can only connect the dots looking backwards",
            ​"parentMessageId"​:​​ 3876518352,
            "​status":​​ "sent"​,
          }​]
        }

### Fetch all received emails [GET]

+ Response 200 (application/json)

        {
          "​status":​​ 200 ,
          "​data":​​ [{
            ​"id": 6548231987,
            ​"createdOn":​​ "2019-12-08T07:10:51.297Z​",
            ​"subject": "Lorem ipsum donor"​​,
            ​"message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "senderId":​​  5124896824,
            "receiverId":​​  3269713578,
            ​"parentMessageId": 4362185985,
            "status":​​ "read",
          }, {
            "id": 6548231987,
            ​"createdOn":​​ "2019-12-08T07:10:51.297Z​",
            ​"subject": "Lorem ipsum donor"​​,
            ​"message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "senderId":​​  0241897538,
            "receiverId":​​  5824983712,
            ​"parentMessageId": 4362185985,
            "status":​​ "sent",
          }]
        }

## Unread Messages [/messages/unread]

### Unread [GET]

+ Response 200 (application/json)

        {
          "​status":​​ 200 ,
          "​data":​​ [{
            ​"id": 6548231987,
            ​"createdOn":​​ "2019-12-08T07:10:51.297Z​",
            ​"subject": "Lorem ipsum donor"​​,
            ​"message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "senderId":​​  5124896824,
            "receiverId":​​  3269713578,
            ​"parentMessageId": 4362185985,
            "status":​​ "sent",
          }, {
            "id": 6548231987,
            ​"createdOn":​​ "2019-12-08T07:10:51.297Z​",
            ​"subject": "Lorem ipsum donor"​​,
            ​"message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "senderId":​​  0241897538,
            "receiverId":​​  5824983712,
            ​"parentMessageId": 4362185985,
            "status":​​ "sent",
          }]
        }

## Sent Messages [/messages/sent]

### Sent [GET]

+ Response 200 (application/json)

        {
          "​status":​​ 200 ,
          "​data":​​ [{
            ​"id": 6548231987,
            ​"createdOn":​​ "2019-12-08T07:10:51.297Z​",
            ​"subject": "Lorem ipsum donor"​​,
            ​"message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "senderId":​​  5124896824,
            "receiverId":​​  3269713578,
            ​"parentMessageId": 4362185985,
            "status":​​ "sent",
          }, {
            "id": 6548231987,
            ​"createdOn":​​ "2019-12-08T07:10:51.297Z​",
            ​"subject": "Lorem ipsum donor"​​,
            ​"message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "senderId":​​  0241897538,
            "receiverId":​​  5824983712,
            ​"parentMessageId": 4362185985,
            "status":​​ "sent",
          }]
        }

## Message [/messages/{message_id}]

+ Parameters
    + message_id (number) - ID of the Message in the form of an Integer

### Fetch a specific email record [GET]

+ Response 200 (application/json)

        {
          "status": 200,
          "data": [{
            ​"id": 6548231987,
            ​"createdOn":​​ "2019-12-08T07:10:51.297Z​",
            ​"subject": "Lorem ipsum donor"​​,
            ​"message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "senderId":​​  5124896824,
            "receiverId":​​  3269713578,
            ​"parentMessageId": 4362185985,
            "status":​​ "sent"
          }]
        }

### Delete a specific email record [DELETE]

+ Response 200 (application/json)

        {
          "status": 200,
          "data": [{
            "message": "Email was succesfully deleted"
          }]
        }

# Group Groups

Group resources

## Groups [/groups]

### Create a new group [POST]

+ groupName (string) - The group name

+ Request (application/json)

        {
          "groupName": "Moon"
        }

+ Response 201 (application/json)

        {
          "status": 201,
          "data": [{
            "id": 2,
            "name": "Moon",
            "role": "admin"
          }]
        }