# Task 4 Submission

## Frontend Integration
Client is integrated and available through: [https://d3j5zyjcx28byh.cloudfront.net/](https://d2h462pyzn3zmo.cloudfront.net/)

## API Gateway and Lambda Functions
API URI is [https://rp0yrpnlxj.execute-api.us-east-1.amazonaws.com/prod](https://b5ej4pymjl.execute-api.us-east-1.amazonaws.com/prod/)
Endpoints are:
- `getProductList`: `/products` GET method
- `getProductById`: `/{productId}` GET method
- `createProduct`: `/products` POST method

## Create Product Paylod
In order to create a product, the following payload example can be used:
`
{
    "title": "FVP 495K6 Multi-V",
    "description": "some desc",
    "price": 34.75,
    "count": 10
}
`

## SUCCESS Response Examples
  - GET all products:
    `{
      "data": [...],
      "message": "Successfully Fetched Products",
      "success": true
    }`
  - GET Product by ID:
    `{
        "data": {
            "id": "99ff9f03-742f-4709-bb80-801bf0508f88",
            "count": "10",
            "price": "34.75",
            "title": "FVP 495K6 Multi-V",
            "description": "some desc"
        },
        "message": "Successfully fetched product with id: 99ff9f03-742f-4709-bb80-801bf0508f88 ",
        "success": true
    }`
  - POST Create Product:
    `{
        "product": {
            "id": "35e1c28e-362c-42bb-9a7d-2d5e1d697c34",
            "title": "FVP 495K6 Multi-V",
            "description": "some desc",
            "price": "34.75",
            "count": "10",
            "createdAt": "1730180793251"
        },
        "message": "Successfully Created Product",
        "success": true
    }`



## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
