FORMAT: 1A

# EPICmail API

The Backbone of plain and simple communication

# Group Messages

Messages related resources in the API.

## Message Collection [/messages]

### Create a new message [GET]

+ Response 201 (application/json)

        [
          {
            "status":​​ 201,
            "data":​​ [​ {
              "id"​:​​ 3694498647,
              "createdOn"​: "2019-03-08T07:10:51.297Z​",
              "​subject"​:​​ "New Message",
              "message":​​ "You can only connect the dots looking backwards",
              ​"parentMessageId"​:​​ 3876518352,
              "​status":​​ "sent"​,
            }​ ]
          }
        ]