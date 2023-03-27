# Oren Backend Technical Assesment


Prerequisites:
- Node Version 14 and above
- PostgreSQL
- Postman

## Setting Up

#### Steps:
1. Create an `.env` file in the project directory. You can reference the provided `.env.example` file
2. Create a database in PostgreSQL and name it the same as specified in the `.env` file.
3. Inside the project directory, create data folder if it does not exist already. It must be created beside the src folder.
4. Run `npm i` to install the packages
5. Run `npm run migrate up` to run database migrations
6. Run `npm run build` to build the project to the `dist/` directory
   
#### Running the application:
1. Run `node dist/index.js`.
2. You can also run the command `npm run dev` to start a development server if you have `nodemon` installed globally
3. Navigate to `localhost:3000` ( or whatever port you set in the `.env` file).
### API:

- Frontend API
  1. `/auth`
  2. `/auth/signin`
  3. `/auth/register`
  4. `/`
  5. `/response`
  6. `/response/file/`
<br />

- Postman API
  1. `/api/auth/signin`
  2. `/api/auth/register`
  3. `/api/users/get/:filter`
  4. `/api/questions/get/:filter`
  5. `/api/responses/get/:userId`
  6. `/api/responses/get/pretty/:userId`
  7. `/api/response/file/:uuid`

<br />
<br />

## API Details
#### `/api/auth/signin`:

Method: **POST**<br/>
Body: 
```
{
    "name": "a@example.com",
    "password": "tUcFPR3FBCZPNu9"
}
```
<br />

Response:

```
{
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb2hhbnNoLmxrb0BnbWFpbC5jb20iLCJpYXQiOjE2Nzk4ODc0NTF9.FX1LwdgrazMkrK290ForCi-Euku7MDmP_MW-8ACLFzg"
}
```
<br />

####  `/api/auth/register`:

Method: **POST**<br/>
Body: 
```
{
    "name": "a@example.com",
    "password": "tUcFPR3FBCZPNu9"
}
```
Response:

```
200
```
<br/>

#### `/api/users/get/:filter`:

Parameter:

Possible Options:
- all -> gets all users
- id -> gets the user with the given id

Example:
`/api/users/get/all`
`/api/users/get/3`

Method: **GET**<br/>
Response:
```
[
    {
        "id": 3,
        "name": "rohansh.lko@gmail.com",
        "password": "$2b$10$/YBzHBWOWljKSb1LbU2OT.VOAZEBaipRXAqiyh/IMGNokFurIiErC",
        "createdAt": "2023-03-25T13:38:53.263Z"
    },
    {
        "id": 4,
        "name": "a@example.com",
        "password": "$2b$10$IuDnHKgTeEX/sl1FI3VQ1.wXvsJdv1sH4YzM5ZrEFVr6mbUkO1szC",
        "createdAt": "2023-03-26T09:29:40.702Z"
    },
    {
        "id": 5,
        "name": "b@example.com",
        "password": "$2b$10$6P3RnIPyBVQFlB0XabVQxeiTQa1.dDpeSfhA278zuu2/Nh0yOmwxK",
        "createdAt": "2023-03-26T14:52:48.496Z"
    }
]
```

<br />

#### `/api/questions/get/:filter`:

Parameter:

Possible Options:
- all -> gets all questions
- id -> gets the question with the given id

Example:
`/api/questions/get/all`
`/api/questions/get/3`

Method: **GET**<br/>
Response:
```
[
   [
    {
        "id": 1,
        "data": {
            "type": 1,
            "content": "Corporate Identity Number of the Listed Entity"
        },
        "inputType": "number",
        "title": null,
        "createdAt": "2023-03-25T13:46:18.640Z"
    },
    {
        "id": 2,
        "data": {
            "type": 1,
            "content": "Name of Listed Entity"
        },
        "inputType": "string",
        "title": null,
        "createdAt": "2023-03-25T13:50:01.636Z"
    },
    {
        "id": 3,
        "data": {
            "type": 1,
            "content": "Year Of Incorporation"
        },
        "inputType": "number",
        "title": null,
        "createdAt": "2023-03-25T14:13:23.604Z"
    },
    {
        "id": 4,
        "data": {
            "type": 1,
            "content": "Registered Office Address"
        },
        "inputType": "string\n",
        "title": null,
        "createdAt": "2023-03-25T14:13:23.604Z"
    },
    {
        "id": 5,
        "data": {
            "type": 1,
            "content": "Email"
        },
        "inputType": "string",
        "title": null,
        "createdAt": "2023-03-25T14:13:23.604Z"
    },
    {
        "id": 6,
        "data": {
            "type": 1,
            "content": "Name and contact details of the person who may be contacted in case of any queries on the BSBR report"
        },
        "inputType": "string",
        "title": null,
        "createdAt": "2023-03-25T14:13:23.604Z"
    }
]
```

<br />


#### `/api/responses/get/:userId`:

Parameter:

Possible Options:
- userId -> gets the raw response of the user with the supplied id

Example:
`/api/responses/get/4`

Method: **GET**<br/>
Response:
```
[
    {
        "id": 15,
        "user_id": 4,
        "data": {
            "1": "3293429231",
            "2": "Microsoft",
            "3": "1994",
            "4": "New Jersey",
            "5": "microsoft.com",
            "6": "Rishabh Singh\n84002739472",
            "7": [
                "29",
                "57",
                "58",
                "15"
            ],
            "8": [
                "Enterprise",
                "Personal"
            ],
            "9": [
                "No",
                "",
                "Yes",
                "",
                "N/A",
                "",
                "Yes",
                ""
            ],
            "10": [
                [
                    "2",
                    "7",
                    "9",
                    "4",
                    "7",
                    "2",
                    "1",
                    "8",
                    "0",
                    "4",
                    "2",
                    "8"
                ],
                [
                    "4",
                    "7",
                    "2",
                    "1",
                    "8",
                    "4",
                    "6",
                    "0",
                    "3",
                    "8",
                    "2",
                    "9"
                ]
            ]
        },
        "createdAt": "2023-03-26T09:33:15.319Z"
    }
]
```

<br />


#### `/api/responses/get/pretty/:userId`:

Parameter:

Possible Options:
- userId -> gets the prettified response of the user with the supplied id

Example:
`/api/responses/get/pretty/4`

Method: **GET**<br/>
Response:
```
{
    "questions": {
        "Corporate Identity Number of the Listed Entity": "1837438",
        "Name of Listed Entity": "Google",
        "Year Of Incorporation": "1998",
        "Registered Office Address": "CA, USA",
        "Email": "support@google.com",
        "Name and contact details of the person who may be contacted in case of any queries on the BSBR report": "Rohan Sharma\n84949472283",
        "Locations": {
            "Number of plants": {
                "National": "83",
                "International": "36"
            },
            "Number of offices": {
                "National": "36",
                "International": "85"
            }
        },
        "Types Of Customers": [
            "Regular",
            "Government",
            "Military"
        ],
        "Employees": {
            "Male": {
                "Permanent Employees(D)": "6",
                "Other Than Permanent Employees(E)": "8",
                "Total Employees(D+E)": "3",
                "Permanent Workers(F)": "6",
                "Other Than Permanent Wokers(G)": "8",
                "Total Employees(F+G)": "6"
            },
            "Female": {
                "Permanent Employees(D)": "4",
                "Other Than Permanent Employees(E)": "5",
                "Total Employees(D+E)": "7",
                "Permanent Workers(F)": "5",
                "Other Than Permanent Wokers(G)": "3",
                "Total Employees(F+G)": "5"
            }
        },
        "Differently Abled Employees And Workers": {
            "Male": {
                "Permanent Employees(D)": "8",
                "Other Than Permanent Employees(E)": "5",
                "Total Employees(D+E)": "3",
                "Permanent Workers(F)": "5",
                "Other Than Permanent Wokers(G)": "7",
                "Total Employees(F+G)": "6"
            },
            "Female": {
                "Permanent Employees(D)": "9",
                "Other Than Permanent Employees(E)": "3",
                "Total Employees(D+E)": "9",
                "Permanent Workers(F)": "4",
                "Other Than Permanent Wokers(G)": "4",
                "Total Employees(F+G)": "0"
            }
        }
    },
    "attachments": {
        "Locations": {
            "uuid": "X-aUB-NJ",
            "name": "hrrecords.png"
        },
        "Employee Count": {
            "uuid": "UaCx4pAS",
            "name": "list.png"
        }
    }
}
```

<br />


#### `/responses/file/:uuid`:

Parameter:

Possible Options:
- uuid -> downloads the file with the given uuid that belong to this user

Example:
`/responses/file/:uuid`

Method: **GET**<br/>
Response: Downloads the attachment
