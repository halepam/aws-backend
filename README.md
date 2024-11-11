# Task 5 Submission
A continuation of the same source code of Task 4. 
Included, you will find a stack called, ImportServiceStack, that will:
- automatically upload CSV files under the folder `uploaded` using the `ImportServiceBucketDeployment`
- generate `signedUrls` for a given CSV file using the lambda function `importFileLambda`
- it will add an S3 event trigger (S3.ObjectCreated.*) to a lambda function `importFileParserLambda`


## API Gateway and Lambda Functions
API URI is https://b5ej4pymjl.execute-api.us-east-1.amazonaws.com/prod
Endpoints are:
- `getProductList`: `/products`
- `getProductById`: `/{productId}`
- `addProduct`: `/products`
- `importFile`: `/import/{filename}`

New endpoint `importFile` will return a `signedUrl`.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
