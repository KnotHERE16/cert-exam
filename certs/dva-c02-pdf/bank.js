window.CERTS = window.CERTS || {};
window.CERTS["dva-c02-pdf"] = {
  "code": "DVA-C02 \u00b7 PDF",
  "title": "Developer Associate \u2014 PDF export",
  "level": "Imported bank",
  "blurb": "557 questions from the downloaded PDF, with explanations.",
  "notice": "Imported 557 questions from a PDF export. Answers come from the PDF with a few manual corrections; explanations were written separately and are not AWS-verified. Topics are not classified into official exam domains. 72% is a local practice target, not a conversion to AWS scaled scoring.",
  "exam": {
    "count": 65,
    "minutes": 130,
    "pass": 72
  },
  "domains": [
    {
      "name": "Imported questions (unclassified)",
      "weight": 100
    }
  ],
  "questions": [
    {
      "d": 0,
      "q": "A company is implementing an application on Amazon EC2 instances. The application needs to process incoming transactions. When the application detects a transaction that is not valid, the application must send a chat message to the company's support team. To send the message, the application needs to retrieve the access token to authenticate by using the chat API.\nA developer needs to implement a solution to store the access token. The access token must be encrypted at rest and in transit. The access token must also be accessible from other AWS accounts.\nWhich solution will meet these requirements with the LEAST management overhead?",
      "o": [
        "Use an AWS Systems Manager Parameter Store SecureString parameter that uses an AWS Key Management Service (AWS KMS) AWS managed key to store the access token. Add a resource-based policy to the parameter to allow access from other accounts. Update the IAM role of the EC2 instances with permissions to access Parameter Store. Retrieve the token from Parameter Store with the decrypt flag enabled. Use the decrypted access token to send the message to the chat.",
        "Encrypt the access token by using an AWS Key Management Service (AWS KMS) customer managed key. Store the access token in an Amazon DynamoDB table. Update the IAM role of the EC2 instances with permissions to access DynamoDB and AWS KMS. Retrieve the token from DynamoDDecrypt the token by using AWS KMS on the EC2 instances. Use the decrypted access token to send the message to the chat.",
        "Use AWS Secrets Manager with an AWS Key Management Service (AWS KMS) customer managed key to store the access token. Add a resource-based policy to the secret to allow access from other accounts. Update the IAM role of the EC2 instances with permissions to access Secrets Manager. Retrieve the token from Secrets Manager. Use the decrypted access token to send the message to the chat.",
        "Encrypt the access token by using an AWS Key Management Service (AWS KMS) AWS managed key. Store the access token in an Amazon S3 bucket. Add a bucket policy to the S3 bucket to allow access from other accounts. Update the IAM role of the EC2 instances with permissions to access Amazon S3 and AWS KMS. Retrieve the token from the S3 bucket. Decrypt the token by using AWS KMS on the EC2 instances. Use the decrypted access token to send the massage to the chat."
      ],
      "ma": [
        2
      ],
      "e": "AWS Secrets Manager encrypts secrets at rest with KMS, is accessed over TLS, and supports resource-based policies so other accounts can read the secret. Cross-account access also requires a customer managed KMS key, because the AWS managed key's policy cannot be edited to trust other accounts. Option A fails because an AWS managed key cannot be shared across accounts and Parameter Store resource policies are limited to advanced parameters. Options B and D require building and managing your own encryption and decryption logic around DynamoDB or S3, which is far more management overhead (and D also uses an AWS managed key). Community vote: C (82%), Other (18%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 1
    },
    {
      "d": 0,
      "q": "A company is running Amazon EC2 instances in multiple AWS accounts. A developer needs to implement an application that collects all the lifecycle events of the EC2 instances. The application needs to store the lifecycle events in a single Amazon Simple Queue Service (Amazon SQS) queue in the company's main AWS account for further processing.\nWhich solution will meet these requirements?",
      "o": [
        "Configure Amazon EC2 to deliver the EC2 instance lifecycle events from all accounts to the Amazon EventBridge event bus of the main account. Add an EventBridge rule to the event bus of the main account that matches all EC2 instance lifecycle events. Add the SQS queue as a target of the rule.",
        "Use the resource policies of the SQS queue in the main account to give each account permissions to write to that SQS queue. Add to the Amazon EventBridge event bus of each account an EventBridge rule that matches all EC2 instance lifecycle events. Add the SQS queue in the main account as a target of the rule.",
        "Write an AWS Lambda function that scans through all EC2 instances in the company accounts to detect EC2 instance lifecycle changes. Configure the Lambda function to write a notification message to the SQS queue in the main account if the function detects an EC2 instance lifecycle change. Add an Amazon EventBridge scheduled rule that invokes the Lambda function every minute.",
        "Configure the permissions on the main account event bus to receive events from all accounts. Create an Amazon EventBridge rule in each account to send all the EC2 instance lifecycle events to the main account event bus. Add an EventBridge rule to the main account event bus that matches all EC2 instance lifecycle events. Set the SQS queue as a target for the rule."
      ],
      "ma": [
        3
      ],
      "e": "EventBridge can route events across accounts: the main account's event bus is configured with a resource policy that permits the other accounts, each member account has a rule that forwards EC2 instance state-change events to the main bus, and a rule on the main bus targets the SQS queue. Option A is wrong because EC2 does not deliver events to another account's bus on its own; a rule in each source account is required. Option B fails because a rule in a member account can target an SQS queue in a different account only when the Region and permissions line up, and it does not centralize events on a shared bus as intended. Option C is polling every minute, which is inefficient, costly and misses state changes. Community vote: D (75%), B (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 2
    },
    {
      "d": 0,
      "q": "An application is using Amazon Cognito user pools and identity pools for secure access. A developer wants to integrate the user-specific file upload and download features in the application with Amazon S3. The developer must ensure that the files are saved and retrieved in a secure manner and that users can access only their own files. The file sizes range from 3 KB to 300 MB.\nWhich option will meet these requirements with the HIGHEST level of security?",
      "o": [
        "Use S3 Event Notifications to validate the file upload and download requests and update the user interface (UI).",
        "Save the details of the uploaded files in a separate Amazon DynamoDB table. Filter the list of files in the user interface (UI) by comparing the current user ID with the user ID associated with the file in the table.",
        "Use Amazon API Gateway and an AWS Lambda function to upload and download files. Validate each request in the Lambda function before performing the requested operation.",
        "Use an IAM policy within the Amazon Cognito identity prefix to restrict users to use their own folders in Amazon S3."
      ],
      "ma": [
        3
      ],
      "e": "With Cognito identity pools, the authenticated role's IAM policy can use the policy variable ${cognito-identity.amazonaws.com:sub} in the S3 resource ARN so each user can only read and write objects under their own prefix. This enforces isolation inside IAM/S3 itself and lets the client use the S3 SDK directly, including multipart upload for files up to 300 MB. S3 event notifications (A) fire after the fact and cannot authorize requests. A DynamoDB filter (B) only hides files in the UI and does not stop direct access. API Gateway with Lambda (C) moves custom validation into code and hits API Gateway's 10 MB payload limit and Lambda payload limits for large files. Community vote: D (83%), Other (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 3
    },
    {
      "d": 0,
      "q": "A company is building a scalable data management solution by using AWS services to improve the speed and agility of development. The solution will ingest large volumes of data from various sources and will process this data through multiple business rules and transformations. The solution requires business rules to run in sequence and to handle reprocessing of data if errors occur when the business rules run. The company needs the solution to be scalable and to require the least possible maintenance.\nWhich AWS service should the company use to manage and automate the orchestration of the data flows to meet these requirements?",
      "o": [
        "AWS Batch",
        "AWS Step Functions",
        "AWS Glue",
        "AWS Lambda"
      ],
      "ma": [
        1
      ],
      "e": "AWS Step Functions orchestrates workflows as state machines, running steps in sequence, with built-in Retry and Catch for error handling and reprocessing, and it is serverless so there is little to maintain. AWS Batch runs batch compute jobs but is not a workflow orchestrator for business rules. AWS Glue is an ETL service and does not give general-purpose sequencing and error-handling orchestration across arbitrary services. A Lambda function alone would require you to write and maintain the orchestration, retry and state-tracking logic yourself. Community vote: B (88%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 4
    },
    {
      "d": 0,
      "q": "A developer has created an AWS Lambda function that is written in Python. The Lambda function reads data from objects in Amazon S3 and writes data to an Amazon DynamoDB table. The function is successfully invoked from an S3 event notification when an object is created. However, the function fails when it attempts to write to the DynamoDB table.\nWhat is the MOST likely cause of this issue?",
      "o": [
        "The Lambda function's concurrency limit has been exceeded.",
        "DynamoDB table requires a global secondary index (GSI) to support writes.",
        "The Lambda function does not have IAM permissions to write to DynamoDB.",
        "The DynamoDB table is not running in the same Availability Zone as the Lambda function."
      ],
      "ma": [
        2
      ],
      "e": "The function is invoked successfully by the S3 event, so the trigger and concurrency are fine; the failure happens only on the DynamoDB write, which points to the function's execution role lacking dynamodb:PutItem (or similar) permissions. Concurrency limits (A) would throttle invocation itself rather than fail a single call. DynamoDB does not need a GSI to accept writes (B). DynamoDB is a regional, Availability Zone-independent service, so the AZ placement of Lambda is irrelevant (D). Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 5
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS CloudFormation template to deploy Amazon EC2 instances across multiple AWS accounts. The developer must choose the EC2 instances from a list of approved instance types.\nHow can the developer incorporate the list of approved instance types in the CloudFormation template?",
      "o": [
        "Create a separate CloudFormation template for each EC2 instance type in the list.",
        "In the Resources section of the CloudFormation template, create resources for each EC2 instance type in the list.",
        "In the CloudFormation template, create a separate parameter for each EC2 instance type in the list.",
        "In the CloudFormation template, create a parameter with the list of EC2 instance types as AllowedValues."
      ],
      "ma": [
        3
      ],
      "e": "A CloudFormation parameter with the AllowedValues property restricts the user to selecting only from the approved list of instance types, and the same template can be reused in every account. Creating a template per instance type (A) or a resource per type (B) would deploy or duplicate instances rather than restrict a choice. A separate parameter for each type (C) does not constrain the value of the instance type used by the resource. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 6
    },
    {
      "d": 0,
      "q": "A developer has an application that makes batch requests directly to Amazon DynamoDB by using the BatchGetItem low-level API operation. The responses frequently return values in the UnprocessedKeys element.\nWhich actions should the developer take to increase the resiliency of the application when the batch response includes values in UnprocessedKeys? (Choose two.)",
      "o": [
        "Retry the batch operation immediately.",
        "Retry the batch operation with exponential backoff and randomized delay.",
        "Update the application to use an AWS software development kit (AWS SDK) to make the requests.",
        "Increase the provisioned read capacity of the DynamoDB tables that the operation accesses.",
        "Increase the provisioned write capacity of the DynamoDB tables that the operation accesses."
      ],
      "ma": [
        1,
        3
      ],
      "e": "UnprocessedKeys is returned when a BatchGetItem request exceeds the table's provisioned throughput or the response size limit, so the unprocessed keys should be retried using exponential backoff with jitter, and increasing the provisioned read capacity reduces the throttling that caused the keys to be left unprocessed. Retrying immediately (A) just adds load and will probably be throttled again. Using an SDK (C) is not required because it is the retry logic that matters, not the client library. Write capacity (E) has no effect on read operations such as BatchGetItem. Community vote: BD (63%), BC (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 7
    },
    {
      "d": 0,
      "q": "A company is running a custom application on a set of on-premises Linux servers that are accessed using Amazon API Gateway. AWS X-Ray tracing has been enabled on the API test stage.\nHow can a developer enable X-Ray tracing on the on-premises servers with the LEAST amount of configuration?",
      "o": [
        "Install and run the X-Ray SDK on the on-premises servers to capture and relay the data to the X-Ray service.",
        "Install and run the X-Ray daemon on the on-premises servers to capture and relay the data to the X-Ray service.",
        "Capture incoming requests on-premises and configure an AWS Lambda function to pull, process, and relay relevant data to X-Ray using the PutTraceSegments API call.",
        "Capture incoming requests on-premises and configure an AWS Lambda function to pull, process, and relay relevant data to X-Ray using the PutTelemetryRecords API call."
      ],
      "ma": [
        1
      ],
      "e": "The X-Ray daemon is a lightweight process that listens for trace segments from instrumented applications and relays them in batches to the X-Ray service, and it can run on on-premises Linux servers with minimal configuration (credentials and region). The X-Ray SDK alone (A) instruments the application code but still sends segments to the daemon over UDP, so the daemon is still needed. Building a Lambda function that pulls and relays data with PutTraceSegments (C) or PutTelemetryRecords (D) is custom work, and PutTelemetryRecords is used by the daemon for its own telemetry, not for traces. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 8
    },
    {
      "d": 0,
      "q": "A company wants to share information with a third party. The third party has an HTTP API endpoint that the company can use to share the information. The company has the required API key to access the HTTP API.\nThe company needs a way to manage the API key by using code. The integration of the API key with the application code cannot affect application performance.\nWhich solution will meet these requirements MOST securely?",
      "o": [
        "Store the API credentials in AWS Secrets Manager. Retrieve the API credentials at runtime by using the AWS SDK. Use the credentials to make the API call.",
        "Store the API credentials in a local code variable. Push the code to a secure Git repository. Use the local code variable at runtime to make the API call.",
        "Store the API credentials as an object in a private Amazon S3 bucket. Restrict access to the S3 object by using IAM policies. Retrieve the API credentials at runtime by using the AWS SDK. Use the credentials to make the API call.",
        "Store the API credentials in an Amazon DynamoDB table. Restrict access to the table by using resource-based policies. Retrieve the API credentials at runtime by using the AWS SDK. Use the credentials to make the API call."
      ],
      "ma": [
        0
      ],
      "e": "AWS Secrets Manager is purpose-built for storing API keys and credentials with encryption through KMS, fine-grained IAM access, auditing and optional rotation, and the secret can be retrieved at runtime with the SDK and cached to avoid affecting performance. Hardcoding the key in a code variable (B) exposes it in source control. Storing it in S3 (C) or DynamoDB (D) can work but relies on you to implement encryption, rotation and access control, so it is less secure than a managed secrets service. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 9
    },
    {
      "d": 0,
      "q": "A developer is deploying a new application to Amazon Elastic Container Service (Amazon ECS). The developer needs to securely store and retrieve different types of variables. These variables include authentication information for a remote API, the URL for the API, and credentials. The authentication information and API URL must be available to all current and future deployed versions of the application across development, testing, and production environments.\nHow should the developer retrieve the variables with the FEWEST application changes?",
      "o": [
        "Update the application to retrieve the variables from AWS Systems Manager Parameter Store. Use unique paths in Parameter Store for each variable in each environment. Store the credentials in AWS Secrets Manager in each environment.",
        "Update the application to retrieve the variables from AWS Key Management Service (AWS KMS). Store the API URL and credentials as unique keys for each environment.",
        "Update the application to retrieve the variables from an encrypted file that is stored with the application. Store the API URL and credentials in unique files for each environment.",
        "Update the application to retrieve the variables from each of the deployed environments. Define the authentication information and API URL in the ECS task definition as unique names during the deployment process."
      ],
      "ma": [
        0
      ],
      "e": "Parameter Store handles configuration values such as the API URL and authentication information, with hierarchical paths (for example /dev/app/url, /prod/app/url) to separate environments, while Secrets Manager stores the credentials securely; both are read with the SDK or injected into ECS task definitions, which requires minimal code changes. AWS KMS (B) is for managing encryption keys, not for storing application variables. An encrypted file shipped with the application (C) ties values to deployments and complicates rotation and sharing across versions. Hardcoding values in the task definition (D) does not provide secure, centrally shared storage across all versions. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 10
    },
    {
      "d": 0,
      "q": "A company is migrating legacy internal applications to AWS. Leadership wants to rewrite the internal employee directory to use native AWS services. A developer needs to create a solution for storing employee contact details and high-resolution photos for use with the new application. Which solution will enable the search and retrieval of each employee's individual details and high-resolution photos using AWS APIs?",
      "o": [
        "Encode each employee's contact information and photos using Base64. Store the information in an Amazon DynamoDB table using a sort key.",
        "Store each employee's contact information in an Amazon DynamoDB table along with the object keys for the photos stored in Amazon S3.",
        "Use Amazon Cognito user pools to implement the employee directory in a fully managed software-as-a-service (SaaS) method.",
        "Store employee contact information in an Amazon RDS DB instance with the photos stored in Amazon Elastic File System (Amazon EFS)."
      ],
      "ma": [
        1
      ],
      "e": "Contact details are small, structured items that fit well in DynamoDB, which supports fast lookups by employee key, while large high-resolution photos belong in S3 with only the object key stored in the DynamoDB item; both are accessible through AWS APIs. Base64-encoding photos into DynamoDB (A) bloats items and hits the 400 KB item size limit. Cognito user pools (C) are an authentication directory, not a store for photos and arbitrary contact data. RDS plus EFS (D) is heavier to operate, and EFS objects are not retrieved through a simple AWS API as S3 objects are. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 11
    },
    {
      "d": 0,
      "q": "A developer is creating an application that will give users the ability to store photos from their cellphones in the cloud. The application needs to support tens of thousands of users. The application uses an Amazon API Gateway REST API that is integrated with AWS Lambda functions to process the photos. The application stores details about the photos in Amazon DynamoDB.\nUsers need to create an account to access the application. In the application, users must be able to upload photos and retrieve previously uploaded photos. The photos will range in size from 300 KB to 5 MB.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Use Amazon Cognito user pools to manage user accounts. Create an Amazon Cognito user pool authorizer in API Gateway to control access to the API. Use the Lambda function to store the photos and details in the DynamoDB table. Retrieve previously uploaded photos directly from the DynamoDB table.",
        "Use Amazon Cognito user pools to manage user accounts. Create an Amazon Cognito user pool authorizer in API Gateway to control access to the API. Use the Lambda function to store the photos in Amazon S3. Store the object's S3 key as part of the photo details in the DynamoDB table. Retrieve previously uploaded photos by querying DynamoDB for the S3 key.",
        "Create an IAM user for each user of the application during the sign-up process. Use IAM authentication to access the API Gateway API. Use the Lambda function to store the photos in Amazon S3. Store the object's S3 key as part of the photo details in the DynamoDB table. Retrieve previously uploaded photos by querying DynamoDB for the S3 key.",
        "Create a users table in DynamoDB. Use the table to manage user accounts. Create a Lambda authorizer that validates user credentials against the users table. Integrate the Lambda authorizer with API Gateway to control access to the API. Use the Lambda function to store the photos in Amazon S3. Store the object's S3 key as par of the photo details in the DynamoDB table. Retrieve previously uploaded photos by querying DynamoDB for the S3 key."
      ],
      "ma": [
        1
      ],
      "e": "Cognito user pools provide managed sign-up and sign-in, and a Cognito user pool authorizer on API Gateway protects the API with no custom auth code. Photos of 300 KB to 5 MB belong in S3, with the object key stored in DynamoDB for lookup. DynamoDB items are limited to 400 KB, so option A cannot store the photos. Creating an IAM user per app user (C) does not scale to tens of thousands of users, and building a custom user table and Lambda authorizer (D) is much more operational work than the managed Cognito service. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 12
    },
    {
      "d": 0,
      "q": "A company receives food orders from multiple partners. The company has a microservices application that uses Amazon API Gateway APIs with AWS Lambda integration. Each partner sends orders by calling a customized API that is exposed through API Gateway. The API call invokes a shared Lambda function to process the orders.\nPartners need to be notified after the Lambda function processes the orders. Each partner must receive updates for only the partner's own orders. The company wants to add new partners in the future with the fewest code changes possible.\nWhich solution will meet these requirements in the MOST scalable way?",
      "o": [
        "Create a different Amazon Simple Notification Service (Amazon SNS) topic for each partner. Configure the Lambda function to publish messages for each partner to the partner's SNS topic.",
        "Create a different Lambda function for each partner. Configure the Lambda function to notify each partner's service endpoint directly.",
        "Create an Amazon Simple Notification Service (Amazon SNS) topic. Configure the Lambda function to publish messages with specific attributes to the SNS topic. Subscribe each partner to the SNS topic. Apply the appropriate filter policy to the topic subscriptions.",
        "Create one Amazon Simple Notification Service (Amazon SNS) topic. Subscribe all partners to the SNS topic."
      ],
      "ma": [
        2
      ],
      "e": "Publishing to a single SNS topic with message attributes and giving each partner subscription a filter policy delivers each partner only their own orders, and onboarding a new partner only requires adding a subscription with a filter, with no Lambda code changes. A topic per partner (A) requires code changes for every new partner. A Lambda function per partner (B) multiplies code and deployment effort. Subscribing all partners to one topic without filters (D) would send every partner everyone's orders. Community vote: C (77%), A (23%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 13
    },
    {
      "d": 0,
      "q": "A financial company must store original customer records for 10 years for legal reasons. A complete record contains personally identifiable information (PII). According to local regulations, PII is available to only certain people in the company and must not be shared with third parties. The company needs to make the records available to third-party organizations for statistical analysis without sharing the PII.\nA developer wants to store the original immutable record in Amazon S3. Depending on who accesses the S3 document, the document should be returned as is or with all the PII removed. The developer has written an AWS Lambda function to remove the PII from the document. The function is named removePii.\nWhat should the developer do so that the company can meet the PII requirements while maintaining only one copy of the document?",
      "o": [
        "Set up an S3 event notification that invokes the removePii function when an S3 GET request is made. Call Amazon S3 by using a GET request to access the object without PII.",
        "Set up an S3 event notification that invokes the removePii function when an S3 PUT request is made. Call Amazon S3 by using a PUT request to access the object without PII.",
        "Create an S3 Object Lambda access point from the S3 console. Select the removePii function. Use S3 Access Points to access the object without PII.",
        "Create an S3 access point from the S3 console. Use the access point name to call the GetObjectLegalHold S3 API function. Pass in the removePii function name to access the object without PII."
      ],
      "ma": [
        2
      ],
      "e": "S3 Object Lambda lets you attach a Lambda function (here removePii) to an Object Lambda access point so that GET requests through that access point return transformed data, while the single original object stays unchanged in the bucket. Authorized users use the regular access point to get the original and others use the Object Lambda access point. S3 event notifications (A, B) are not triggered by GET requests and cannot alter the response, and PUT events would create copies. GetObjectLegalHold (D) is about legal hold status and cannot invoke a Lambda function. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 14
    },
    {
      "d": 0,
      "q": "A developer is deploying an AWS Lambda function The developer wants the ability to return to older versions of the function quickly and seamlessly.\nHow can the developer achieve this goal with the LEAST operational overhead?",
      "o": [
        "Use AWS OpsWorks to perform blue/green deployments.",
        "Use a function alias with different versions.",
        "Maintain deployment packages for older versions in Amazon S3.",
        "Use AWS CodePipeline for deployments and rollbacks."
      ],
      "ma": [
        1
      ],
      "e": "Lambda versions are immutable snapshots of function code and configuration, and an alias points to a specific version, so rolling back is just repointing the alias to an older version with no redeployment. OpsWorks (A) is not used for Lambda blue/green deployments. Keeping packages in S3 (C) requires re-uploading and redeploying to roll back. CodePipeline (D) can orchestrate deployments but is more setup than simply using versions and aliases. Community vote: B (86%), A (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 15
    },
    {
      "d": 0,
      "q": "A developer has written an AWS Lambda function. The function is CPU-bound. The developer wants to ensure that the function returns responses quickly.\nHow can the developer improve the function's performance?",
      "o": [
        "Increase the function's CPU core count.",
        "Increase the function's memory.",
        "Increase the function's reserved concurrency.",
        "Increase the function's timeout."
      ],
      "ma": [
        1
      ],
      "e": "Lambda allocates CPU power in proportion to the configured memory, so increasing memory gives a CPU-bound function more vCPU and faster execution. Lambda does not offer a direct CPU core count setting (A). Reserved concurrency (C) controls how many instances can run in parallel, not how fast a single invocation runs. A longer timeout (D) only allows the function to run longer before being stopped and does not make it faster. Community vote: B (93%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 16
    },
    {
      "d": 0,
      "q": "For a deployment using AWS Code Deploy, what is the run order of the hooks for in-place deployments?",
      "o": [
        "BeforeInstall -> ApplicationStop -> ApplicationStart -> AfterInstall",
        "ApplicationStop -> BeforeInstall -> AfterInstall -> ApplicationStart",
        "BeforeInstall -> ApplicationStop -> ValidateService -> ApplicationStart",
        "ApplicationStop -> BeforeInstall -> ValidateService -> ApplicationStart"
      ],
      "ma": [
        1
      ],
      "e": "For an in-place deployment, CodeDeploy runs the lifecycle hooks in this order: ApplicationStop, (Download Bundle), BeforeInstall, (Install), AfterInstall, ApplicationStart, and ValidateService. So option B shows the correct sequence among the choices. The other options place BeforeInstall before ApplicationStop or put ValidateService before ApplicationStart, which does not match the CodeDeploy lifecycle. Community vote: B (83%), A (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 17
    },
    {
      "d": 0,
      "q": "A company is building a serverless application on AWS. The application uses an AWS Lambda function to process customer orders 24 hours a day, 7 days a week. The Lambda function calls an external vendor's HTTP API to process payments.\nDuring load tests, a developer discovers that the external vendor payment processing API occasionally times out and returns errors. The company expects that some payment processing API calls will return errors.\nThe company wants the support team to receive notifications in near real time only when the payment processing external API error rate exceed 5% of the total number of transactions in an hour. Developers need to use an existing Amazon Simple Notification Service (Amazon SNS) topic that is configured to notify the support team.\nWhich solution will meet these requirements?",
      "o": [
        "Write the results of payment processing API calls to Amazon CloudWatch. Use Amazon CloudWatch Logs Insights to query the CloudWatch logs. Schedule the Lambda function to check the CloudWatch logs and notify the existing SNS topic.",
        "Publish custom metrics to CloudWatch that record the failures of the external payment processing API calls. Configure a CloudWatch alarm to notify the existing SNS topic when error rate exceeds the specified rate.",
        "Publish the results of the external payment processing API calls to a new Amazon SNS topic. Subscribe the support team members to the new SNS topic.",
        "Write the results of the external payment processing API calls to Amazon S3. Schedule an Amazon Athena query to run at regular intervals. Configure Athena to send notifications to the existing SNS topic when the error rate exceeds the specified rate."
      ],
      "ma": [
        1
      ],
      "e": "Publishing custom CloudWatch metrics for the failed and total payment API calls lets you create an alarm (using metric math for the error rate) that evaluates over an hour and notifies the existing SNS topic in near real time. The log-querying approaches in A and D rely on scheduled polling, so they are not near real time and need extra components. Option C sends every result to a new SNS topic and notifies the support team for each call, rather than only when the rate exceeds 5 percent, and it does not use the existing topic. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 18
    },
    {
      "d": 0,
      "q": "A company is offering APIs as a service over the internet to provide unauthenticated read access to statistical information that is updated daily. The company uses Amazon API Gateway and AWS Lambda to develop the APIs. The service has become popular, and the company wants to enhance the responsiveness of the APIs.\nWhich action can help the company achieve this goal?",
      "o": [
        "Enable API caching in API Gateway.",
        "Configure API Gateway to use an interface VPC endpoint.",
        "Enable cross-origin resource sharing (CORS) for the APIs.",
        "Configure usage plans and API keys in API Gateway."
      ],
      "ma": [
        0
      ],
      "e": "The data is updated only daily and the access is unauthenticated read-only, so enabling API caching in API Gateway serves repeated requests from the cache with a TTL, reducing latency and Lambda invocations. An interface VPC endpoint (B) is for private APIs, not for public performance. CORS (C) controls browser cross-origin access and does not improve speed. Usage plans and API keys (D) manage throttling and quotas, not responsiveness. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 19
    },
    {
      "d": 0,
      "q": "A developer wants to store information about movies. Each movie has a title, release year, and genre. The movie information also can include additional properties about the cast and production crew. This additional information is inconsistent across movies. For example, one movie might have an assistant director, and another movie might have an animal trainer.\nThe developer needs to implement a solution to support the following use cases:\nFor a given title and release year, get all details about the movie that has that title and release year.\nFor a given title, get all details about all movies that have that title.\nFor a given genre, get all details about all movies in that genre.\nWhich data store configuration will meet these requirements?",
      "o": [
        "Create an Amazon DynamoDB table. Configure the table with a primary key that consists of the title as the partition key and the release year as the sort key. Create a global secondary index that uses the genre as the partition key and the title as the sort key.",
        "Create an Amazon DynamoDB table. Configure the table with a primary key that consists of the genre as the partition key and the release year as the sort key. Create a global secondary index that uses the title as the partition key.",
        "On an Amazon RDS DB instance, create a table that contains columns for title, release year, and genre. Configure the title as the primary key.",
        "On an Amazon RDS DB instance, create a table where the primary key is the title and all other data is encoded into JSON format as one additional column."
      ],
      "ma": [
        0
      ],
      "e": "A DynamoDB table with title as the partition key and release year as the sort key supports a GetItem for title plus year and a Query on title alone for all movies with that title, and a global secondary index with genre as the partition key supports queries by genre. DynamoDB also handles inconsistent extra attributes naturally because it is schemaless. Option B uses genre as the partition key, so a title-and-year lookup would need the GSI and does not map cleanly to the primary key design. The RDS options (C, D) need a rigid schema or JSON-encoded columns, and with title alone as primary key they cannot store multiple movies with the same title. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 20
    },
    {
      "d": 0,
      "q": "A developer maintains an Amazon API Gateway REST API. Customers use the API through a frontend UI and Amazon Cognito authentication. The developer has a new version of the API that contains new endpoints and backward-incompatible interface changes. The developer needs to provide beta access to other developers on the team without affecting customers.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Define a development stage on the API Gateway API. Instruct the other developers to point the endpoints to the development stage.",
        "Define a new API Gateway API that points to the new API application code. Instruct the other developers to point the endpoints to the new API.",
        "Implement a query parameter in the API application code that determines which code version to call.",
        "Specify new API Gateway endpoints for the API endpoints that the developer wants to add."
      ],
      "ma": [
        0
      ],
      "e": "An API Gateway stage is a named reference to a deployment of the API, so defining a development (beta) stage with its own invoke URL lets the developers test the new, backward-incompatible version without touching the production stage used by customers. A new API (B) or new endpoints in the same API (D) add unnecessary resources or risk affecting existing customers. A query parameter in application code (C) puts versioning logic in the code and adds maintenance. Community vote: A (81%), B (19%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 21
    },
    {
      "d": 0,
      "q": "A developer is creating an application that will store personal health information (PHI). The PHI needs to be encrypted at all times. An encrypted Amazon RDS for MySQL DB instance is storing the data. The developer wants to increase the performance of the application by caching frequently accessed data while adding the ability to sort or rank the cached datasets.\nWhich solution will meet these requirements?",
      "o": [
        "Create an Amazon ElastiCache for Redis instance. Enable encryption of data in transit and at rest. Store frequently accessed data in the cache.",
        "Create an Amazon ElastiCache for Memcached instance. Enable encryption of data in transit and at rest. Store frequently accessed data in the cache.",
        "Create an Amazon RDS for MySQL read replica. Connect to the read replica by using SSL. Configure the read replica to store frequently accessed data.",
        "Create an Amazon DynamoDB table and a DynamoDB Accelerator (DAX) cluster for the table. Store frequently accessed data in the DynamoDB table."
      ],
      "ma": [
        0
      ],
      "e": "ElastiCache for Redis supports data structures such as sorted sets that allow sorting and ranking of cached data, and it supports encryption in transit and at rest, which meets the PHI requirement. Memcached (B) only stores simple key-value strings and has no sorting or ranking data structures. A read replica (C) is not a cache and does not provide ranking. DAX (D) caches DynamoDB, but the data is in RDS for MySQL. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 22
    },
    {
      "d": 0,
      "q": "A company has a multi-node Windows legacy application that runs on premises. The application uses a network shared folder as a centralized configuration repository to store configuration files in .xml format. The company is migrating the application to Amazon EC2 instances. As part of the migration to AWS, a developer must identify a solution that provides high availability for the repository.\nWhich solution will meet this requirement MOST cost-effectively?",
      "o": [
        "Mount an Amazon Elastic Block Store (Amazon EBS) volume onto one of the EC2 instances. Deploy a file system on the EBS volume. Use the host operating system to share a folder. Update the application code to read and write configuration files from the shared folder.",
        "Deploy a micro EC2 instance with an instance store volume. Use the host operating system to share a folder. Update the application code to read and write configuration files from the shared folder.",
        "Create an Amazon S3 bucket to host the repository. Migrate the existing .xml files to the S3 bucket. Update the application code to use the AWS SDK to read and write configuration files from Amazon S3.",
        "Create an Amazon S3 bucket to host the repository. Migrate the existing .xml files to the S3 bucket. Mount the S3 bucket to the EC2 instances as a local volume. Update the application code to read and write configuration files from the disk."
      ],
      "ma": [
        2
      ],
      "e": "Amazon S3 is highly available and durable, very inexpensive for small XML files, and can be accessed from every EC2 instance through the AWS SDK, so it replaces the network share most cost-effectively. A single EBS volume or instance store volume shared by one EC2 instance (A, B) remains a single point of failure and is not highly available. Mounting S3 as a local volume (D) requires third-party tooling, and S3 does not natively behave as a POSIX file system. Community vote: C (77%), D (23%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 23
    },
    {
      "d": 0,
      "q": "A company wants to deploy and maintain static websites on AWS. Each website's source code is hosted in one of several version control systems, including AWS CodeCommit, Bitbucket, and GitHub.\nThe company wants to implement phased releases by using development, staging, user acceptance testing, and production environments in the AWS Cloud. Deployments to each environment must be started by code merges on the relevant Git branch. The company wants to use HTTPS for all data exchange. The company needs a solution that does not require servers to run continuously.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Host each website by using AWS Amplify with a serverless backend. Conned the repository branches that correspond to each of the desired environments. Start deployments by merging code changes to a desired branch.",
        "Host each website in AWS Elastic Beanstalk with multiple environments. Use the EB CLI to link each repository branch. Integrate AWS CodePipeline to automate deployments from version control code merges.",
        "Host each website in different Amazon S3 buckets for each environment. Configure AWS CodePipeline to pull source code from version control. Add an AWS CodeBuild stage to copy source code to Amazon S3.",
        "Host each website on its own Amazon EC2 instance. Write a custom deployment script to bundle each website's static assets. Copy the assets to Amazon EC2. Set up a workflow to run the script when code is merged."
      ],
      "ma": [
        0
      ],
      "e": "AWS Amplify Hosting provides fully managed static site hosting with HTTPS, integrates with CodeCommit, GitHub and Bitbucket, and connects each Git branch to its own environment so merging into a branch triggers a deployment, with no servers to manage. Elastic Beanstalk (B) and EC2 (D) require running servers continuously. The S3 plus CodePipeline and CodeBuild approach (C) needs substantial pipeline setup per environment and does not provide HTTPS hosting by itself. Community vote: A (75%), B (12%), C (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 24
    },
    {
      "d": 0,
      "q": "A company is migrating an on-premises database to Amazon RDS for MySQL. The company has read-heavy workloads. The company wants to refactor the code to achieve optimum read performance for queries.\nWhich solution will meet this requirement with LEAST current and future effort?",
      "o": [
        "Use a multi-AZ Amazon RDS deployment. Increase the number of connections that the code makes to the database or increase the connection pool size if a connection pool is in use.",
        "Use a multi-AZ Amazon RDS deployment. Modify the code so that queries access the secondary RDS instance.",
        "Deploy Amazon RDS with one or more read replicas. Modify the application code so that queries use the URL for the read replicas.",
        "Use open source replication software to create a copy of the MySQL database on an Amazon EC2 instance. Modify the application code so that queries use the IP address of the EC2 instance."
      ],
      "ma": [
        2
      ],
      "e": "RDS read replicas offload read traffic from the primary and scale horizontally, and the application can use the replica endpoints for read queries with only a small code change. A Multi-AZ standby (A, B) is for failover and cannot serve read traffic in standard RDS MySQL Multi-AZ. Running your own replication to an EC2 instance (D) adds the heavy operational effort of managing replication and servers. Community vote: C (95%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 25
    },
    {
      "d": 0,
      "q": "A developer is creating an application that will be deployed on IoT devices. The application will send data to a RESTful API that is deployed as an AWS Lambda function. The application will assign each API request a unique identifier. The volume of API requests from the application can randomly increase at any given time of day.\nDuring periods of request throttling, the application might need to retry requests. The API must be able to handle duplicate requests without inconsistencies or data loss.\nWhich solution will meet these requirements?",
      "o": [
        "Create an Amazon RDS for MySQL DB instance. Store the unique identifier for each request in a database table. Modify the Lambda function to check the table for the identifier before processing the request.",
        "Create an Amazon DynamoDB table. Store the unique identifier for each request in the table. Modify the Lambda function to check the table for the identifier before processing the request.",
        "Create an Amazon DynamoDB table. Store the unique identifier for each request in the table. Modify the Lambda function to return a client error response when the function receives a duplicate request.",
        "Create an Amazon ElastiCache for Memcached instance. Store the unique identifier for each request in the cache. Modify the Lambda function to check the cache for the identifier before processing the request."
      ],
      "ma": [
        1
      ],
      "e": "Storing each request's unique identifier in DynamoDB and having the Lambda function check it (ideally with a conditional write) makes the API idempotent, so retries after throttling are recognized as duplicates and return the original result without double processing; DynamoDB scales well with random traffic bursts. RDS (A) is less suited to unpredictable spikes and requires connection management from Lambda. Returning a client error for duplicates (C) makes a legitimate retry look like a failure. ElastiCache for Memcached (D) is not durable, so identifiers can be lost. Community vote: B (90%), C (10%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 26
    },
    {
      "d": 0,
      "q": "A developer wants to expand an application to run in multiple AWS Regions. The developer wants to copy Amazon Machine Images (AMIs) with the latest changes and create a new application stack in the destination Region. According to company requirements, all AMIs must be encrypted in all Regions. However, not all the AMIs that the company uses are encrypted.\nHow can the developer expand the application to run in the destination Region while meeting the encryption requirement?",
      "o": [
        "Create new AMIs, and specify encryption parameters. Copy the encrypted AMIs to the destination Region. Delete the unencrypted AMIs.",
        "Use AWS Key Management Service (AWS KMS) to enable encryption on the unencrypted AMIs. Copy the encrypted AMIs to the destination Region.",
        "Use AWS Certificate Manager (ACM) to enable encryption on the unencrypted AMIs. Copy the encrypted AMIs to the destination Region.",
        "Copy the unencrypted AMIs to the destination Region. Enable encryption by default in the destination Region."
      ],
      "ma": [
        0
      ],
      "e": "An existing unencrypted AMI cannot be turned into an encrypted one in place, but when you copy an AMI you can specify encryption, and you can create new AMIs from instances with encrypted snapshots, so creating new encrypted AMIs, copying them and deleting the unencrypted ones meets the requirement. KMS (B) cannot enable encryption on an existing AMI directly. ACM (C) manages TLS certificates, not volume encryption. Enabling encryption by default (D) only applies to new volumes and snapshots, so copying the unencrypted AMI would leave it unencrypted. Community vote: A (70%), B (30%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 27
    },
    {
      "d": 0,
      "q": "A company hosts a client-side web application for one of its subsidiaries on Amazon S3. The web application can be accessed through Amazon CloudFront from https://www.example.com. After a successful rollout, the company wants to host three more client-side web applications for its remaining subsidiaries on three separate S3 buckets.\nTo achieve this goal, a developer moves all the common JavaScript files and web fonts to a central S3 bucket that serves the web applications. However, during testing, the developer notices that the browser blocks the JavaScript files and web fonts.\nWhat should the developer do to prevent the browser from blocking the JavaScript files and web fonts?",
      "o": [
        "Create four access points that allow access to the central S3 bucket. Assign an access point to each web application bucket.",
        "Create a bucket policy that allows access to the central S3 bucket. Attach the bucket policy to the central S3 bucket",
        "Create a cross-origin resource sharing (CORS) configuration that allows access to the central S3 bucket. Add the CORS configuration to the central S3 bucket.",
        "Create a Content-MD5 header that provides a message integrity check for the central S3 bucket. Insert the Content-MD5 header for each web application request."
      ],
      "ma": [
        2
      ],
      "e": "The browser blocks the JavaScript files and fonts because they are requested cross-origin from the central bucket, which requires CORS headers. Adding a CORS configuration to the central S3 bucket that allows the web application origins resolves this. Access points (A) and bucket policies (B) control authorization, not browser cross-origin rules. Content-MD5 (D) is an integrity check and has nothing to do with CORS. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 28
    },
    {
      "d": 0,
      "q": "An application is processing clickstream data using Amazon Kinesis. The clickstream data feed into Kinesis experiences periodic spikes. The PutRecords API call occasionally fails and the logs show that the failed call returns the response shown below:\nWhich techniques will help mitigate this exception? (Choose two.)",
      "o": [
        "Implement retries with exponential backoff.",
        "Use a PutRecord API instead of PutRecords.",
        "Reduce the frequency and/or size of the requests.",
        "Use Amazon SNS instead of Kinesis.",
        "Reduce the number of KCL consumers."
      ],
      "ma": [
        0,
        2
      ],
      "e": "The response shows ProvisionedThroughputExceededException for a shard, meaning writes exceeded the shard limit during spikes. Retrying the failed records with exponential backoff gives the shard time to recover, and reducing the frequency or size of requests lowers the per-shard rate. Switching to PutRecord (B) does not change the per-shard limits. SNS (D) is a different service and not a solution to Kinesis throttling. Reducing KCL consumers (E) affects read throughput, not the write limits exceeded here. Community vote: AC (88%), BC (12%).",
      "images": [
        {
          "path": "assets/q29-s1.jpg",
          "alt": "Question 29 diagram"
        }
      ],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 29
    },
    {
      "d": 0,
      "q": "A company has an application that uses Amazon Cognito user pools as an identity provider. The company must secure access to user records. The company has set up multi-factor authentication (MFA). The company also wants to send a login activity notification by email every time a user logs in.\nWhat is the MOST operationally efficient solution that meets this requirement?",
      "o": [
        "Create an AWS Lambda function that uses Amazon Simple Email Service (Amazon SES) to send the email notification. Add an Amazon API Gateway API to invoke the function. Call the API from the client side when login confirmation is received.",
        "Create an AWS Lambda function that uses Amazon Simple Email Service (Amazon SES) to send the email notification. Add an Amazon Cognito post authentication Lambda trigger for the function.",
        "Create an AWS Lambda function that uses Amazon Simple Email Service (Amazon SES) to send the email notification. Create an Amazon CloudWatch Logs log subscription filter to invoke the function based on the login status.",
        "Configure Amazon Cognito to stream all logs to Amazon Kinesis Data Firehose. Create an AWS Lambda function to process the streamed logs and to send the email notification based on the login status of each user."
      ],
      "ma": [
        1
      ],
      "e": "Cognito user pools support Lambda triggers, and a post authentication trigger runs after a user is successfully authenticated, so it can call Amazon SES to send the login notification with no extra infrastructure. Calling an API from the client (A) can be skipped or tampered with. Cognito does not stream login events through a CloudWatch log subscription filter in a straightforward way (C), and streaming logs through Kinesis Data Firehose (D) is far more complex than using the built-in trigger. Community vote: B (88%), A (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 30
    },
    {
      "d": 0,
      "q": "A developer has an application that stores data in an Amazon S3 bucket. The application uses an HTTP API to store and retrieve objects. When the PutObject API operation adds objects to the S3 bucket the developer must encrypt these objects at rest by using server-side encryption with Amazon S3 managed keys (SSE-S3).\nWhich solution will meet this requirement?",
      "o": [
        "Create an AWS Key Management Service (AWS KMS) key. Assign the KMS key to the S3 bucket.",
        "Set the x-amz-server-side-encryption header when invoking the PutObject API operation.",
        "Provide the encryption key in the HTTP header of every request.",
        "Apply TLS to encrypt the traffic to the S3 bucket."
      ],
      "ma": [
        1
      ],
      "e": "To request SSE-S3 on an upload, the client sets the x-amz-server-side-encryption header to AES256 on the PutObject request, which tells S3 to encrypt the object with S3 managed keys. A KMS key (A) would be SSE-KMS rather than SSE-S3. Providing the encryption key in a header (C) is SSE-C, where the customer supplies the key. TLS (D) protects data in transit and does not encrypt the object at rest. Community vote: B (86%), C (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 31
    },
    {
      "d": 0,
      "q": "A developer needs to perform geographic load testing of an API. The developer must deploy resources to multiple AWS Regions to support the load testing of the API.\nHow can the developer meet these requirements without additional application code?",
      "o": [
        "Create and deploy an AWS Lambda function in each desired Region. Configure the Lambda function to create a stack from an AWS CloudFormation template in that Region when the function is invoked.",
        "Create an AWS CloudFormation template that defines the load test resources. Use the AWS CLI create-stack-set command to create a stack set in the desired Regions.",
        "Create an AWS Systems Manager document that defines the resources. Use the document to create the resources in the desired Regions.",
        "Create an AWS CloudFormation template that defines the load test resources. Use the AWS CLI deploy command to create a stack from the template in each Region."
      ],
      "ma": [
        1
      ],
      "e": "CloudFormation StackSets deploy a single template as stacks across multiple Regions (and accounts) in one operation, for example with the create-stack-set and create-stack-instances commands, so no application code is needed. Writing Lambda functions per Region (A) is custom code. A Systems Manager document (C) is for operational automation, not provisioning an infrastructure template across Regions. Using deploy in each Region separately (D) works but is manual and repeated, and is not the multi-Region mechanism designed for this. Community vote: B (86%), C (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 32
    },
    {
      "d": 0,
      "q": "A developer is creating an application that includes an Amazon API Gateway REST API in the us-east-2 Region. The developer wants to use Amazon CloudFront and a custom domain name for the API. The developer has acquired an SSL/TLS certificate for the domain from a third-party provider.\nHow should the developer configure the custom domain for the application?",
      "o": [
        "Import the SSL/TLS certificate into AWS Certificate Manager (ACM) in the same Region as the API. Create a DNS A record for the custom domain.",
        "Import the SSL/TLS certificate into CloudFront. Create a DNS CNAME record for the custom domain.",
        "Import the SSL/TLS certificate into AWS Certificate Manager (ACM) in the same Region as the API. Create a DNS CNAME record for the custom domain.",
        "Import the SSL/TLS certificate into AWS Certificate Manager (ACM) in the us-east-1 Region. Create a DNS CNAME record for the custom domain."
      ],
      "ma": [
        3
      ],
      "e": "A REST API with a CloudFront distribution is an edge-optimized endpoint, and for edge-optimized custom domains the certificate must be in AWS Certificate Manager in us-east-1, where an imported third-party certificate can be used. A DNS record (CNAME or alias) then points the custom domain to the API's CloudFront domain name. Importing into the API's own Region us-east-2 (A, C) will not work for a CloudFront-backed domain. CloudFront certificates cannot be imported directly into CloudFront for an API Gateway custom domain (B). Community vote: D (71%), C (29%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 33
    },
    {
      "d": 0,
      "q": "A developer is creating a template that uses AWS CloudFormation to deploy an application. The application is serverless and uses Amazon API Gateway, Amazon DynamoDB, and AWS Lambda.\nWhich AWS service or tool should the developer use to define serverless resources in YAML?",
      "o": [
        "CloudFormation serverless intrinsic functions",
        "AWS Elastic Beanstalk",
        "AWS Serverless Application Model (AWS SAM)",
        "AWS Cloud Development Kit (AWS CDK)"
      ],
      "ma": [
        2
      ],
      "e": "AWS SAM is an open source framework that extends CloudFormation with a shorthand syntax in YAML, such as AWS::Serverless::Function and AWS::Serverless::Api, to define Lambda, API Gateway and DynamoDB resources concisely. There is no feature called CloudFormation serverless intrinsic functions (A). Elastic Beanstalk (B) deploys web applications on managed servers. The CDK (D) defines infrastructure using programming languages and synthesizes templates rather than defining resources directly in YAML. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 34
    },
    {
      "d": 0,
      "q": "A developer wants to insert a record into an Amazon DynamoDB table as soon as a new file is added to an Amazon S3 bucket.\nWhich set of steps would be necessary to achieve this?",
      "o": [
        "Create an event with Amazon EventBridge that will monitor the S3 bucket and then insert the records into DynamoDB.",
        "Configure an S3 event to invoke an AWS Lambda function that inserts records into DynamoDB.",
        "Create an AWS Lambda function that will poll the S3 bucket and then insert the records into DynamoDB.",
        "Create a cron job that will run at a scheduled time and insert the records into DynamoDB."
      ],
      "ma": [
        1
      ],
      "e": "S3 event notifications can invoke a Lambda function directly on object creation events, and the function can then put an item into DynamoDB, which is event-driven and needs no polling. Option A is not a correct description since a simple EventBridge event alone cannot insert into DynamoDB without a target such as a function. Polling the bucket (C) or running a scheduled cron job (D) is wasteful and not triggered as soon as the file arrives. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 35
    },
    {
      "d": 0,
      "q": "A development team maintains a web application by using a single AWS CloudFormation template. The template defines web servers and an Amazon RDS database. The team uses the Cloud Formation template to deploy the Cloud Formation stack to different environments. During a recent application deployment, a developer caused the primary development database to be dropped and recreated. The result of this incident was a loss of data. The team needs to avoid accidental database deletion in the future.\nWhich solutions will meet these requirements? (Choose two.)",
      "o": [
        "Add a CloudFormation Deletion Policy attribute with the Retain value to the database resource.",
        "Update the CloudFormation stack policy to prevent updates to the database.",
        "Modify the database to use a Multi-AZ deployment.",
        "Create a CloudFormation stack set for the web application and database deployments.",
        "Add a Cloud Formation DeletionPolicy attribute with the Retain value to the stack."
      ],
      "ma": [
        0,
        1
      ],
      "e": "A DeletionPolicy of Retain on the database resource keeps the RDS instance when the resource is removed or replaced by a stack operation, and a stack policy that denies update actions on the database resource prevents CloudFormation from replacing or modifying it during updates. Multi-AZ (C) improves availability but does not prevent deletion by CloudFormation. StackSets (D) do not protect resources. DeletionPolicy is a resource attribute and cannot be set on the stack itself (E). Community vote: AB (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 36
    },
    {
      "d": 0,
      "q": "A company has an Amazon S3 bucket that contains sensitive data. The data must be encrypted in transit and at rest. The company encrypts the data in the S3 bucket by using an AWS Key Management Service (AWS KMS) key. A developer needs to grant several other AWS accounts the permission to use the S3 GetObject operation to retrieve the data from the S3 bucket.\nHow can the developer enforce that all requests to retrieve the data provide encryption in transit?",
      "o": [
        "Define a resource-based policy on the S3 bucket to deny access when a request meets the condition \u201caws:SecureTransport\u201d: \u201cfalse\u201d.",
        "Define a resource-based policy on the S3 bucket to allow access when a request meets the condition \u201caws:SecureTransport\u201d: \u201cfalse\u201d.",
        "Define a role-based policy on the other accounts' roles to deny access when a request meets the condition of \u201caws:SecureTransport\u201d: \u201cfalse\u201d.",
        "Define a resource-based policy on the KMS key to deny access when a request meets the condition of \u201caws:SecureTransport\u201d: \u201cfalse\u201d."
      ],
      "ma": [
        0
      ],
      "e": "The aws:SecureTransport condition key is false for plain HTTP requests, so a bucket policy with a Deny statement for requests where aws:SecureTransport is false forces all access, including that from other accounts, to use HTTPS. An Allow on false (B) would permit insecure requests. A policy in the other accounts' roles (C) is controlled by those accounts, so it cannot be enforced by the bucket owner. A KMS key policy (D) governs key usage, not the transport used for S3 GetObject requests. Community vote: A (86%), D (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 37
    },
    {
      "d": 0,
      "q": "An application that is hosted on an Amazon EC2 instance needs access to files that are stored in an Amazon S3 bucket. The application lists the objects that are stored in the S3 bucket and displays a table to the user. During testing, a developer discovers that the application does not show any objects in the list.\nWhat is the MOST secure way to resolve this issue?",
      "o": [
        "Update the IAM instance profile that is attached to the EC2 instance to include the S3:* permission for the S3 bucket.",
        "Update the IAM instance profile that is attached to the EC2 instance to include the S3:ListBucket permission for the S3 bucket.",
        "Update the developer's user permissions to include the S3:ListBucket permission for the S3 bucket.",
        "Update the S3 bucket policy by including the S3:ListBucket permission and by setting the Principal element to specify the account number of the EC2 instance."
      ],
      "ma": [
        1
      ],
      "e": "Listing the objects in a bucket requires the s3:ListBucket permission on the bucket, and granting it to the IAM role in the EC2 instance profile follows least privilege and uses temporary credentials. S3:* (A) gives far more permissions than needed. Granting it to the developer's user (C) does not affect the application running as the instance profile. A bucket policy naming the account number (D) would be broader than needed and is not the most secure way. Community vote: B (88%), A (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 38
    },
    {
      "d": 0,
      "q": "A company is planning to securely manage one-time fixed license keys in AWS. The company's development team needs to access the license keys in automaton scripts that run in Amazon EC2 instances and in AWS CloudFormation stacks.\nWhich solution will meet these requirements MOST cost-effectively?",
      "o": [
        "Amazon S3 with encrypted files prefixed with \u201cconfig\u201d",
        "AWS Secrets Manager secrets with a tag that is named SecretString",
        "AWS Systems Manager Parameter Store SecureString parameters",
        "CloudFormation NoEcho parameters"
      ],
      "ma": [
        2
      ],
      "e": "Systems Manager Parameter Store SecureString parameters encrypt values with KMS, can be read by scripts on EC2 and referenced from CloudFormation templates through dynamic references, and standard parameters have no additional charge, so they are the cheapest option for fixed values. Secrets Manager (B) charges per secret and is not necessary since no rotation is needed (and SecretString is not a tag). S3 files (A) are a clumsy fit. NoEcho parameters (D) only mask values in CloudFormation output and do not provide storage. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 39
    },
    {
      "d": 0,
      "q": "A company has deployed infrastructure on AWS. A development team wants to create an AWS Lambda function that will retrieve data from an Amazon Aurora database. The Amazon Aurora database is in a private subnet in company's VPC. The VPC is named VPC1. The data is relational in nature. The Lambda function needs to access the data securely.\nWhich solution will meet these requirements?",
      "o": [
        "Create the Lambda function. Configure VPC1 access for the function. Attach a security group named SG1 to both the Lambda function and the database. Configure the security group inbound and outbound rules to allow TCP traffic on Port 3306.",
        "Create and launch a Lambda function in a new public subnet that is in a new VPC named VPC2. Create a peering connection between VPC1 and VPC2.",
        "Create the Lambda function. Configure VPC1 access for the function. Assign a security group named SG1 to the Lambda function. Assign a second security group named SG2 to the database. Add an inbound rule to SG1 to allow TCP traffic from Port 3306.",
        "Export the data from the Aurora database to Amazon S3. Create and launch a Lambda function in VPC1. Configure the Lambda function query the data from Amazon S3."
      ],
      "ma": [
        0
      ],
      "e": "Attaching the Lambda function to VPC1 lets it reach the Aurora database in the private subnet, and using a security group that allows the database port (3306 for MySQL-compatible Aurora) provides secure connectivity within the VPC. Option B places the function in a different VPC with peering and a public subnet, which is unnecessary and less secure. Option C is wrong because the inbound rule must be on the database's security group, not on the function's SG1. Option D exports data to S3, which does not give access to live relational data. Community vote: A (45%), C (41%), B (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 40
    },
    {
      "d": 0,
      "q": "A developer is building a web application that uses Amazon API Gateway to expose an AWS Lambda function to process requests from clients. During testing, the developer notices that the API Gateway times out even though the Lambda function finishes under the set time limit. Which of the following API Gateway metrics in Amazon CloudWatch can help the developer troubleshoot the issue? (Choose two.)",
      "o": [
        "CacheHitCount",
        "IntegrationLatency",
        "CacheMissCount",
        "Latency",
        "Count"
      ],
      "ma": [
        1,
        3
      ],
      "e": "IntegrationLatency measures the time between API Gateway sending the request to the backend and receiving the response, while Latency measures the total time from API Gateway receiving the request to returning the response, so comparing the two shows whether the delay is in the backend or in API Gateway. CacheHitCount and CacheMissCount (A, C) only describe cache behavior, and Count (E) is just the number of requests. Community vote: BD (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 41
    },
    {
      "d": 0,
      "q": "A development team wants to build a continuous integration/continuous delivery (CI/CD) pipeline. The team is using AWS CodePipeline to automate the code build and deployment. The team wants to store the program code to prepare for the CI/CD pipeline.\nWhich AWS service should the team use to store the program code?",
      "o": [
        "AWS CodeDeploy",
        "AWS CodeArtifact",
        "AWS CodeCommit",
        "Amazon CodeGuru"
      ],
      "ma": [
        2
      ],
      "e": "AWS CodeCommit is a managed Git repository service that stores source code and integrates as a source stage in CodePipeline. CodeDeploy (A) deploys applications, CodeArtifact (B) stores software packages and dependencies, and CodeGuru (D) provides code reviews and profiling, so none of these is a code repository. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 42
    },
    {
      "d": 0,
      "q": "A developer is designing an AWS Lambda function that creates temporary files that are less than 10 MB during invocation. The temporary files will be accessed and modified multiple times during invocation. The developer has no need to save or retrieve these files in the future.\nWhere should the temporary files be stored?",
      "o": [
        "the /tmp directory",
        "Amazon Elastic File System (Amazon EFS)",
        "Amazon Elastic Block Store (Amazon EBS)",
        "Amazon S3"
      ],
      "ma": [
        0
      ],
      "e": "Each Lambda execution environment provides ephemeral storage in /tmp (512 MB by default, configurable up to 10 GB), which is fast, local and suitable for small temporary files that are modified during the invocation. EFS (B) is persistent shared storage that is unnecessary here. EBS (C) cannot be attached to Lambda functions. S3 (D) would add network latency and API calls for temporary data. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 43
    },
    {
      "d": 0,
      "q": "A developer is designing a serverless application with two AWS Lambda functions to process photos. One Lambda function stores objects in an Amazon S3 bucket and stores the associated metadata in an Amazon DynamoDB table. The other Lambda function fetches the objects from the S3 bucket by using the metadata from the DynamoDB table. Both Lambda functions use the same Python library to perform complex computations and are approaching the quota for the maximum size of zipped deployment packages.\nWhat should the developer do to reduce the size of the Lambda deployment packages with the LEAST operational overhead?",
      "o": [
        "Package each Python library in its own .zip file archive. Deploy each Lambda function with its own copy of the library.",
        "Create a Lambda layer with the required Python library. Use the Lambda layer in both Lambda functions.",
        "Combine the two Lambda functions into one Lambda function. Deploy the Lambda function as a single .zip file archive.",
        "Download the Python library to an S3 bucket. Program the Lambda functions to reference the object URLs."
      ],
      "ma": [
        1
      ],
      "e": "A Lambda layer packages shared libraries once and can be attached to multiple functions, which removes the library from each deployment package and reduces their zipped size with little operational effort. Duplicating the library in each package (A) does not reduce size. Combining the functions (C) changes the architecture and loses separation of responsibilities. Referencing libraries via S3 URLs (D) requires custom download code and increases cold start time. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 44
    },
    {
      "d": 0,
      "q": "A developer is writing an AWS Lambda function. The developer wants to log key events that occur while the Lambda function runs. The developer wants to include a unique identifier to associate the events with a specific function invocation. The developer adds the following code to the Lambda function:\nWhich solution will meet this requirement?",
      "o": [
        "Obtain the request identifier from the AWS request ID field in the context object. Configure the application to write logs to standard output.",
        "Obtain the request identifier from the AWS request ID field in the event object. Configure the application to write logs to a file.",
        "Obtain the request identifier from the AWS request ID field in the event object. Configure the application to write logs to standard output.",
        "Obtain the request identifier from the AWS request ID field in the context object. Configure the application to write logs to a file."
      ],
      "ma": [
        0
      ],
      "e": "The Lambda context object exposes the aws_request_id (awsRequestId), a unique identifier for each invocation, which can be included in log lines; the event object contains only the trigger payload. Writing to standard output sends logs to CloudWatch Logs automatically, whereas the Lambda file system is ephemeral so logs written to a file would be lost. Therefore the request ID from the context object with logging to standard output is correct, and the options using the event object or files are wrong. Community vote: A (92%), D (8%).",
      "images": [
        {
          "path": "assets/q45-s1.jpg",
          "alt": "Question 45 diagram"
        }
      ],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 45
    },
    {
      "d": 0,
      "q": "A developer is working on a serverless application that needs to process any changes to an Amazon DynamoDB table with an AWS Lambda function.\nHow should the developer configure the Lambda function to detect changes to the DynamoDB table?",
      "o": [
        "Create an Amazon Kinesis data stream, and attach it to the DynamoDB table. Create a trigger to connect the data stream to the Lambda function.",
        "Create an Amazon EventBridge rule to invoke the Lambda function on a regular schedule. Conned to the DynamoDB table from the Lambda function to detect changes.",
        "Enable DynamoDB Streams on the table. Create a trigger to connect the DynamoDB stream to the Lambda function.",
        "Create an Amazon Kinesis Data Firehose delivery stream, and attach it to the DynamoDB table. Configure the delivery stream destination as the Lambda function."
      ],
      "ma": [
        2
      ],
      "e": "DynamoDB Streams captures item-level changes in a table, and a Lambda event source mapping can poll the stream and invoke the function with batches of change records. You cannot simply attach a Kinesis data stream or Firehose delivery stream to a table in this way (A, D), since Kinesis Data Streams for DynamoDB is a separate configuration and Firehose cannot invoke Lambda as a destination. Scheduled polling with EventBridge (B) is inefficient and can miss or duplicate changes. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 46
    },
    {
      "d": 0,
      "q": "An application uses an Amazon EC2 Auto Scaling group. A developer notices that EC2 instances are taking a long time to become available during scale-out events. The UserData script is taking a long time to run.\nThe developer must implement a solution to decrease the time that elapses before an EC2 instance becomes available. The solution must make the most recent version of the application available at all times and must apply all available security updates. The solution also must minimize the number of images that are created. The images must be validated.\nWhich combination of steps should the developer take to meet these requirements? (Choose two.)",
      "o": [
        "Use EC2 Image Builder to create an Amazon Machine Image (AMI). Install all the patches and agents that are needed to manage and run the application. Update the Auto Scaling group launch configuration to use the AMI.",
        "Use EC2 Image Builder to create an Amazon Machine Image (AMI). Install the latest version of the application and all the patches and agents that are needed to manage and run the application. Update the Auto Scaling group launch configuration to use the AMI.",
        "Set up AWS CodeDeploy to deploy the most recent version of the application at runtime.",
        "Set up AWS CodePipeline to deploy the most recent version of the application at runtime.",
        "Remove any commands that perform operating system patching from the UserData script."
      ],
      "ma": [
        0,
        2
      ],
      "e": "Using EC2 Image Builder to bake the OS patches and agents into a validated AMI means instances launch with those already in place, which shortens startup, and Image Builder pipelines can test and validate images. Deploying the latest application version at runtime with CodeDeploy keeps the application current without creating a new AMI for each release, which minimizes the number of images. Option B bakes the application into the AMI, which would require a new image for every code change. CodePipeline (D) is an orchestrator and does not itself perform instance deployments, and removing patching commands from UserData (E) alone does not ensure security updates are applied. Community vote: AC (50%), BE (20%), AE (18%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 47
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Lambda function that needs credentials to connect to an Amazon RDS for MySQL database. An Amazon S3 bucket currently stores the credentials. The developer needs to improve the existing solution by implementing credential rotation and secure storage. The developer also needs to provide integration with the Lambda function.\nWhich solution should the developer use to store and retrieve the credentials with the LEAST management overhead?",
      "o": [
        "Store the credentials in AWS Systems Manager Parameter Store. Select the database that the parameter will access. Use the default AWS Key Management Service (AWS KMS) key to encrypt the parameter. Enable automatic rotation for the parameter. Use the parameter from Parameter Store on the Lambda function to connect to the database.",
        "Encrypt the credentials with the default AWS Key Management Service (AWS KMS) key. Store the credentials as environment variables for the Lambda function. Create a second Lambda function to generate new credentials and to rotate the credentials by updating the environment variables of the first Lambda function. Invoke the second Lambda function by using an Amazon EventBridge rule that runs on a schedule. Update the database to use the new credentials. On the first Lambda function, retrieve the credentials from the environment variables. Decrypt the credentials by using AWS KMS, Connect to the database.",
        "Store the credentials in AWS Secrets Manager. Set the secret type to Credentials for Amazon RDS database. Select the database that the secret will access. Use the default AWS Key Management Service (AWS KMS) key to encrypt the secret. Enable automatic rotation for the secret. Use the secret from Secrets Manager on the Lambda function to connect to the database.",
        "Encrypt the credentials by using AWS Key Management Service (AWS KMS). Store the credentials in an Amazon DynamoDB table. Create a second Lambda function to rotate the credentials. Invoke the second Lambda function by using an Amazon EventBridge rule that runs on a schedule. Update the DynamoDB table. Update the database to use the generated credentials. Retrieve the credentials from DynamoDB with the first Lambda function. Connect to the database."
      ],
      "ma": [
        2
      ],
      "e": "AWS Secrets Manager natively stores RDS database credentials, encrypts them with KMS, and provides built-in automatic rotation for RDS using managed Lambda rotation functions, and the Lambda function retrieves the secret with the SDK, so the management overhead is lowest. Parameter Store (A) does not support automatic rotation. Options B and D require building and operating your own rotation function and schedule. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 48
    },
    {
      "d": 0,
      "q": "A developer has written the following IAM policy to provide access to an Amazon S3 bucket:\nWhich access does the policy allow regarding the s3:GetObject and s3:PutObject actions?",
      "o": [
        "Access on all buckets except the \u201cDOC-EXAMPLE-BUCKET\u201d bucket",
        "Access on all buckets that start with \u201cDOC-EXAMPLE-BUCKET\u201d except the \u201cDOC-EXAMPLE-BUCKET/secrets\u201d bucket",
        "Access on all objects in the \u201cDOC-EXAMPLE-BUCKET\u201d bucket along with access to all S3 actions for objects in the \u201cDOC-EXAMPLE- BUCKET\u201d bucket that start with \u201csecrets\u201d",
        "Access on all objects in the \u201cDOC-EXAMPLE-BUCKET\u201d bucket except on objects that start with \u201csecrets\u201d"
      ],
      "ma": [
        3
      ],
      "e": "The first statement allows s3:GetObject and s3:PutObject on all objects in DOC-EXAMPLE-BUCKET, and the second statement explicitly denies all S3 actions on objects whose keys start with secrets. An explicit Deny always overrides an Allow, so access is granted to all objects except those that begin with secrets. The policy is scoped to one bucket's objects (not all buckets, as in A or B), and it does not grant any extra actions on secrets (C). Community vote: D (100%).",
      "images": [
        {
          "path": "assets/q49-s1.jpg",
          "alt": "Question 49 diagram"
        }
      ],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 49
    },
    {
      "d": 0,
      "q": "A developer is creating a mobile app that calls a backend service by using an Amazon API Gateway REST API. For integration testing during the development phase, the developer wants to simulate different backend responses without invoking the backend service.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Create an AWS Lambda function. Use API Gateway proxy integration to return constant HTTP responses.",
        "Create an Amazon EC2 instance that serves the backend REST API by using an AWS CloudFormation template.",
        "Customize the API Gateway stage to select a response type based on the request.",
        "Use a request mapping template to select the mock integration response."
      ],
      "ma": [
        3
      ],
      "e": "API Gateway mock integration returns responses without calling any backend, and a request mapping template can set the statusCode so the mock integration returns the chosen response, which gives the simulated responses with almost no extra resources. Option A needs a Lambda function, B needs an EC2 instance, and C describes stage customization that does not exist for selecting response types. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 50
    },
    {
      "d": 0,
      "q": "A developer has a legacy application that is hosted on-premises. Other applications hosted on AWS depend on the on-premises application for proper functioning. In case of any application errors, the developer wants to be able to use Amazon CloudWatch to monitor and troubleshoot all applications from one place.\nHow can the developer accomplish this?",
      "o": [
        "Install an AWS SDK on the on-premises server to automatically send logs to CloudWatch.",
        "Download the CloudWatch agent to the on-premises server. Configure the agent to use IAM user credentials with permissions for CloudWatch.",
        "Upload log files from the on-premises server to Amazon S3 and have CloudWatch read the files.",
        "Upload log files from the on-premises server to an Amazon EC2 instance and have the instance forward the logs to CloudWatch."
      ],
      "ma": [
        1
      ],
      "e": "The CloudWatch agent can be installed on on-premises servers and configured with IAM user credentials that have CloudWatch permissions, so it sends logs and metrics to CloudWatch where they can be monitored alongside the AWS applications. Installing the SDK (A) would require writing custom code to send logs. CloudWatch cannot read log files from S3 on its own (C), and forwarding via an EC2 instance (D) adds an unnecessary hop and management. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 51
    },
    {
      "d": 0,
      "q": "An Amazon Kinesis Data Firehose delivery stream is receiving customer data that contains personally identifiable information. A developer needs to remove pattern-based customer identifiers from the data and store the modified data in an Amazon S3 bucket.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Implement Kinesis Data Firehose data transformation as an AWS Lambda function. Configure the function to remove the customer identifiers. Set an Amazon S3 bucket as the destination of the delivery stream.",
        "Launch an Amazon EC2 instance. Set the EC2 instance as the destination of the delivery stream. Run an application on the EC2 instance to remove the customer identifiers. Store the transformed data in an Amazon S3 bucket.",
        "Create an Amazon OpenSearch Service instance. Set the OpenSearch Service instance as the destination of the delivery stream. Use search and replace to remove the customer identifiers. Export the data to an Amazon S3 bucket.",
        "Create an AWS Step Functions workflow to remove the customer identifiers. As the last step in the workflow, store the transformed data in an Amazon S3 bucket. Set the workflow as the destination of the delivery stream."
      ],
      "ma": [
        0
      ],
      "e": "Kinesis Data Firehose can invoke a Lambda function to transform records in flight, so a function that strips the pattern-based identifiers can feed an S3 destination with no servers to manage. EC2 (B), OpenSearch (C) and Step Functions (D) are not supported or sensible Firehose transformation mechanisms for this purpose, and would add complexity. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 52
    },
    {
      "d": 0,
      "q": "A developer is using an AWS Lambda function to generate avatars for profile pictures that are uploaded to an Amazon S3 bucket. The Lambda function is automatically invoked for profile pictures that are saved under the /original/ S3 prefix. The developer notices that some pictures cause the Lambda function to time out. The developer wants to implement a fallback mechanism by using another Lambda function that resizes the profile picture.\nWhich solution will meet these requirements with the LEAST development effort?",
      "o": [
        "Set the image resize Lambda function as a destination of the avatar generator Lambda function for the events that fail processing.",
        "Create an Amazon Simple Queue Service (Amazon SQS) queue. Set the SQS queue as a destination with an on failure condition for the avatar generator Lambda function. Configure the image resize Lambda function to poll from the SQS queue.",
        "Create an AWS Step Functions state machine that invokes the avatar generator Lambda function and uses the image resize Lambda function as a fallback. Create an Amazon EventBridge rule that matches events from the S3 bucket to invoke the state machine.",
        "Create an Amazon Simple Notification Service (Amazon SNS) topic. Set the SNS topic as a destination with an on failure condition for the avatar generator Lambda function. Subscribe the image resize Lambda function to the SNS topic."
      ],
      "ma": [
        0
      ],
      "e": "Lambda destinations for asynchronous invocation (such as S3 events) can route failed events to another Lambda function, SQS queue, SNS topic or EventBridge, so setting the resize function as the on-failure destination needs only configuration and no extra code. Option B adds an SQS queue and polling, D adds an SNS topic, and C builds a whole Step Functions workflow, all of which is more development effort. Community vote: A (58%), B (32%), C (11%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 53
    },
    {
      "d": 0,
      "q": "A developer needs to migrate an online retail application to AWS to handle an anticipated increase in traffic. The application currently runs on two servers: one server for the web application and another server for the database. The web server renders webpages and manages session state in memory. The database server hosts a MySQL database that contains order details. When traffic to the application is heavy, the memory usage for the web server approaches 100% and the application slows down considerably.\nThe developer has found that most of the memory increase and performance decrease is related to the load of managing additional user sessions. For the web server migration, the developer will use Amazon EC2 instances with an Auto Scaling group behind an Application Load Balancer.\nWhich additional set of changes should the developer make to the application to improve the application's performance?",
      "o": [
        "Use an EC2 instance to host the MySQL database. Store the session data and the application data in the MySQL database.",
        "Use Amazon ElastiCache for Memcached to store and manage the session data. Use an Amazon RDS for MySQL DB instance to store the application data.",
        "Use Amazon ElastiCache for Memcached to store and manage the session data and the application data.",
        "Use the EC2 instance store to manage the session data. Use an Amazon RDS for MySQL DB instance to store the application data."
      ],
      "ma": [
        1
      ],
      "e": "Moving session state out of web server memory into ElastiCache for Memcached allows any instance in the Auto Scaling group to access sessions and removes the memory pressure, and RDS for MySQL provides a managed database for the order data. Using a database on EC2 for sessions (A) does not improve performance. Storing application data in the cache (C) loses durable order records. Instance store (D) is local to a single instance and not shared, so sessions would be lost when scaling or on termination. Community vote: B (88%), A (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 54
    },
    {
      "d": 0,
      "q": "An application uses Lambda functions to extract metadata from files uploaded to an S3 bucket; the metadata is stored in Amazon DynamoDB. The application starts behaving unexpectedly, and the developer wants to examine the logs of the Lambda function code for errors.\nBased on this system configuration, where would the developer find the logs?",
      "o": [
        "Amazon S3",
        "AWS CloudTrail",
        "Amazon CloudWatch",
        "Amazon DynamoDB"
      ],
      "ma": [
        2
      ],
      "e": "Lambda automatically sends the function's output and log statements to Amazon CloudWatch Logs, in a log group named /aws/lambda/function-name, so that is where the developer examines errors. S3 (A) and DynamoDB (D) hold data rather than function logs, and CloudTrail (B) records API calls to AWS services, not application log output. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 55
    },
    {
      "d": 0,
      "q": "A company is using an AWS Lambda function to process records from an Amazon Kinesis data stream. The company recently observed slow processing of the records. A developer notices that the iterator age metric for the function is increasing and that the Lambda run duration is constantly above normal.\nWhich actions should the developer take to increase the processing speed? (Choose two.)",
      "o": [
        "Increase the number of shards of the Kinesis data stream.",
        "Decrease the timeout of the Lambda function.",
        "Increase the memory that is allocated to the Lambda function.",
        "Decrease the number of shards of the Kinesis data stream.",
        "Increase the timeout of the Lambda function."
      ],
      "ma": [
        0,
        2
      ],
      "e": "A rising iterator age with long run durations means the function cannot keep up with the stream. Adding shards increases parallelism because Lambda processes one batch per shard at a time (or more with a parallelization factor), and increasing memory gives the function more CPU so each batch runs faster. Decreasing the timeout (B) would cause more failures, decreasing shards (D) reduces parallelism, and increasing the timeout (E) only lets slow invocations run longer without speeding up processing. Community vote: AC (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 56
    },
    {
      "d": 0,
      "q": "A company needs to harden its container images before the images are in a running state. The company's application uses Amazon Elastic Container Registry (Amazon ECR) as an image registry. Amazon Elastic Kubernetes Service (Amazon EKS) for compute, and an AWS CodePipeline pipeline that orchestrates a continuous integration and continuous delivery (CI/CD) workflow.\nDynamic application security testing occurs in the final stage of the pipeline after a new image is deployed to a development namespace in the EKS cluster. A developer needs to place an analysis stage before this deployment to analyze the container image earlier in the CI/CD pipeline. Which solution will meet these requirements with the MOST operational efficiency?",
      "o": [
        "Build the container image and run the docker scan command locally. Mitigate any findings before pushing changes to the source code repository. Write a pre-commit hook that enforces the use of this workflow before commit.",
        "Create a new CodePipeline stage that occurs after the container image is built. Configure ECR basic image scanning to scan on image push. Use an AWS Lambda function as the action provider. Configure the Lambda function to check the scan results and to fail the pipeline if there are findings.",
        "Create a new CodePipeline stage that occurs after source code has been retrieved from its repository. Run a security scanner on the latest revision of the source code. Fail the pipeline if there are findings.",
        "Add an action to the deployment stage of the pipeline so that the action occurs before the deployment to the EKS cluster. Configure ECR basic image scanning to scan on image push. Use an AWS Lambda function as the action provider. Configure the Lambda function to check the scan results and to fail the pipeline if there are findings."
      ],
      "ma": [
        1
      ],
      "e": "Adding a CodePipeline stage right after the image build, with ECR image scanning on push and a Lambda action that checks the scan findings and fails the pipeline, analyzes the container image early and before deployment to EKS with little effort. Local docker scan with hooks (A) is not enforceable in the pipeline. Scanning source code (C) does not analyze the built image and its OS and package vulnerabilities. Option D places the check inside the deployment stage rather than as an earlier dedicated stage, which is less clean than a separate analysis stage. Community vote: B (70%), D (30%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 57
    },
    {
      "d": 0,
      "q": "A developer is testing a new file storage application that uses an Amazon CloudFront distribution to serve content from an Amazon S3 bucket. The distribution accesses the S3 bucket by using an origin access identity (OAI). The S3 bucket's permissions explicitly deny access to all other users. The application prompts users to authenticate on a login page and then uses signed cookies to allow users to access their personal storage directories. The developer has configured the distribution to use its default cache behavior with restricted viewer access and has set the origin to point to the S3 bucket. However, when the developer tries to navigate to the login page, the developer receives a 403 Forbidden error. The developer needs to implement a solution to allow unauthenticated access to the login page. The solution also must keep all private content secure.\nWhich solution will meet these requirements?",
      "o": [
        "Add a second cache behavior to the distribution with the same origin as the default cache behavior. Set the path pattern for the second cache behavior to the path of the login page, and make viewer access unrestricted. Keep the default cache behavior's settings unchanged.",
        "Add a second cache behavior to the distribution with the same origin as the default cache behavior. Set the path pattern for the second cache behavior to *, and make viewer access restricted. Change the default cache behavior's path pattern to the path of the login page, and make viewer access unrestricted.",
        "Add a second origin as a failover origin to the default cache behavior. Point the failover origin to the S3 bucket. Set the path pattern for the primary origin to *, and make viewer access restricted. Set the path pattern for the failover origin to the path of the login page, and make viewer access unrestricted.",
        "Add a bucket policy to the S3 bucket to allow read access. Set the resource on the policy to the Amazon Resource Name (ARN) of the login page object in the S3 bucket. Add a CloudFront function to the default cache behavior to redirect unauthorized requests to the login page's S3 URL."
      ],
      "ma": [
        0
      ],
      "e": "CloudFront cache behaviors are selected by path pattern, so adding a second behavior for the login page path with viewer access unrestricted (no signed cookies) lets unauthenticated users load it, while the default behavior remains restricted with signed cookies and protects all private content. Making the path pattern * restricted and moving the login page into the default behavior (B) is equivalent to the default and still breaks the structure. Origin failover (C) is for high availability, not access control. Opening S3 directly and using functions to redirect (D) breaks the OAI protection design. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 58
    },
    {
      "d": 0,
      "q": "A developer is using AWS Amplify Hosting to build and deploy an application. The developer is receiving an increased number of bug reports from users. The developer wants to add end-to-end testing to the application to eliminate as many bugs as possible before the bugs reach production. Which solution should the developer implement to meet these requirements?",
      "o": [
        "Run the amplify add test command in the Amplify CLI.",
        "Create unit tests in the application. Deploy the unit tests by using the amplify push command in the Amplify CLI.",
        "Add a test phase to the amplify.yml build settings for the application.",
        "Add a test phase to the aws-exports.js file for the application."
      ],
      "ma": [
        2
      ],
      "e": "Amplify Hosting runs the build settings in amplify.yml, and adding a test phase to it, for example to run end-to-end tests with Cypress, executes the tests during each build and can stop deployment when they fail. There is no amplify add test command (A), amplify push (B) deploys backend resources and not tests, and aws-exports.js (D) holds backend configuration and has no test phase. Community vote: C (67%), B (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 59
    },
    {
      "d": 0,
      "q": "An ecommerce company is using an AWS Lambda function behind Amazon API Gateway as its application tier. To process orders during checkout, the application calls a POST API from the frontend. The POST API invokes the Lambda function asynchronously. In rare situations, the application has not processed orders. The Lambda application logs show no errors or failures.\nWhat should a developer do to solve this problem?",
      "o": [
        "Inspect the frontend logs for API failures. Call the POST API manually by using the requests from the log file.",
        "Create and inspect the Lambda dead-letter queue. Troubleshoot the failed functions. Reprocess the events.",
        "Inspect the Lambda logs in Amazon CloudWatch for possible errors. Fix the errors.",
        "Make sure that caching is disabled for the POST API in API Gateway."
      ],
      "ma": [
        1
      ],
      "e": "API Gateway invoking Lambda asynchronously returns success to the caller as soon as the event is queued, and if Lambda later fails after its retries, the failure is not visible in the logs and the event is lost unless a dead-letter queue or on-failure destination is configured. Creating a DLQ lets the developer inspect failed events, troubleshoot and reprocess them. Inspecting frontend logs (A) or Lambda logs (C) will not reveal events that were never processed, and caching (D) does not apply to POST requests. Community vote: B (67%), A (17%), Other (16%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 60
    },
    {
      "d": 0,
      "q": "A company is building a web application on AWS. When a customer sends a request, the application will generate reports and then make the reports available to the customer within one hour. Reports should be accessible to the customer for 8 hours. Some reports are larger than 1 MB. Each report is unique to the customer. The application should delete all reports that are older than 2 days.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Generate the reports and then store the reports as Amazon DynamoDB items that have a specified TTL. Generate a URL that retrieves the reports from DynamoDB. Provide the URL to customers through the web application.",
        "Generate the reports and then store the reports in an Amazon S3 bucket that uses server-side encryption. Attach the reports to an Amazon Simple Notification Service (Amazon SNS) message. Subscribe the customer to email notifications from Amazon SNS.",
        "Generate the reports and then store the reports in an Amazon S3 bucket that uses server-side encryption. Generate a presigned URL that contains an expiration date Provide the URL to customers through the web application. Add S3 Lifecycle configuration rules to the S3 bucket to delete old reports.",
        "Generate the reports and then store the reports in an Amazon RDS database with a date stamp. Generate an URL that retrieves the reports from the RDS database. Provide the URL to customers through the web application. Schedule an hourly AWS Lambda function to delete database records that have expired date stamps."
      ],
      "ma": [
        2
      ],
      "e": "Storing the reports in S3 with server-side encryption, giving customers a presigned URL with an 8-hour expiration, and using an S3 Lifecycle rule to expire objects after 2 days meets every requirement with no custom cleanup code. DynamoDB items are limited to 400 KB (A) and reports can exceed 1 MB. Emailing reports via SNS (B) is not how reports are attached or delivered and does not meet the access window. RDS with an hourly cleanup Lambda (D) is more operational work. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 61
    },
    {
      "d": 0,
      "q": "A company has deployed an application on AWS Elastic Beanstalk. The company has configured the Auto Scaling group that is associated with the Elastic Beanstalk environment to have five Amazon EC2 instances. If the capacity is fewer than four EC2 instances during the deployment, application performance degrades. The company is using the all-at-once deployment policy.\nWhat is the MOST cost-effective way to solve the deployment issue?",
      "o": [
        "Change the Auto Scaling group to six desired instances.",
        "Change the deployment policy to traffic splitting. Specify an evaluation time of 1 hour.",
        "Change the deployment policy to rolling with additional batch. Specify a batch size of 1.",
        "Change the deployment policy to rolling. Specify a batch size of 2."
      ],
      "ma": [
        2
      ],
      "e": "Rolling with an additional batch launches an extra batch of instances first, then deploys to the existing instances in batches, so full capacity of five instances is maintained throughout and the temporary extra instance costs little. All-at-once takes every instance out of service. Rolling with batch size 2 (D) reduces capacity to three, below the required four. Traffic splitting (B) launches a full duplicate fleet and is more expensive, and adding a permanent sixth instance (A) does not fix all-at-once, which still updates all instances at once. Community vote: C (88%), D (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 62
    },
    {
      "d": 0,
      "q": "A developer is incorporating AWS X-Ray into an application that handles personal identifiable information (PII). The application is hosted on Amazon EC2 instances. The application trace messages include encrypted PII and go to Amazon CloudWatch. The developer needs to ensure that no PII goes outside of the EC2 instances.\nWhich solution will meet these requirements?",
      "o": [
        "Manually instrument the X-Ray SDK in the application code.",
        "Use the X-Ray auto-instrumentation agent.",
        "Use Amazon Macie to detect and hide PII. Call the X-Ray API from AWS Lambda.",
        "Use AWS Distro for Open Telemetry."
      ],
      "ma": [
        0
      ],
      "e": "Manually instrumenting the application with the X-Ray SDK gives the developer control over what is recorded in segments and annotations, so PII can be left out before trace data is sent to the X-Ray daemon and out of the EC2 instance. Auto-instrumentation (B) and the Distro for OpenTelemetry (D) capture data automatically and can record more than intended. Macie (C) analyzes data stored in S3 and cannot hide PII in traces. Community vote: A (69%), B (23%), D (8%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 63
    },
    {
      "d": 0,
      "q": "A developer is migrating some features from a legacy monolithic application to use AWS Lambda functions instead. The application currently stores data in an Amazon Aurora DB cluster that runs in private subnets in a VPC. The AWS account has one VPC deployed. The Lambda functions and the DB cluster are deployed in the same AWS Region in the same AWS account.\nThe developer needs to ensure that the Lambda functions can securely access the DB cluster without crossing the public internet.\nWhich solution will meet these requirements?",
      "o": [
        "Configure the DB cluster's public access setting to Yes.",
        "Configure an Amazon RDS database proxy for he Lambda functions.",
        "Configure a NAT gateway and a security group for the Lambda functions.",
        "Configure the VPC, subnets, and a security group for the Lambda functions."
      ],
      "ma": [
        3
      ],
      "e": "Configuring the Lambda functions to attach to the VPC and subnets with a security group lets them reach the Aurora cluster over private IP addresses without leaving the VPC or crossing the public internet. Making the DB publicly accessible (A) exposes it. RDS Proxy (B) manages connection pooling but still requires VPC configuration. A NAT gateway (C) is for outbound internet access, which is not needed to reach a database in the same VPC. Community vote: D (86%), C (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 64
    },
    {
      "d": 0,
      "q": "A developer is building a new application on AWS. The application uses an AWS Lambda function that retrieves information from an Amazon DynamoDB table. The developer hard coded the DynamoDB table name into the Lambda function code. The table name might change over time. The developer does not want to modify the Lambda code if the table name changes.\nWhich solution will meet these requirements MOST efficiently?",
      "o": [
        "Create a Lambda environment variable to store the table name. Use the standard method for the programming language to retrieve the variable.",
        "Store the table name in a file. Store the file in the /tmp folder. Use the SDK for the programming language to retrieve the table name.",
        "Create a file to store the table name. Zip the file and upload the file to the Lambda layer. Use the SDK for the programming language to retrieve the table name.",
        "Create a global variable that is outside the handler in the Lambda function to store the table name."
      ],
      "ma": [
        0
      ],
      "e": "A Lambda environment variable holds configuration outside the code, can be changed in the function configuration without modifying or redeploying the code, and is read with the language's standard method such as os.environ. A file in /tmp (B) is ephemeral and not persisted. A layer file (C) needs a new layer version for each change. A global variable (D) is still hardcoded in the source. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 65
    },
    {
      "d": 0,
      "q": "A company has a critical application on AWS. The application exposes an HTTP API by using Amazon API Gateway. The API is integrated with an AWS Lambda function. The application stores data in an Amazon RDS for MySQL DB instance with 2 virtual CPUs (vCPUs) and 64 GB of RAM. Customers have reported that some of the API calls return HTTP 500 Internal Server Error responses. Amazon CloudWatch Logs shows errors for \u201ctoo many connections.\u201d The errors occur during peak usage times that are unpredictable.\nThe company needs to make the application resilient. The database cannot be down outside of scheduled maintenance hours.\nWhich solution will meet these requirements?",
      "o": [
        "Decrease the number of vCPUs for the DB instance. Increase the max_connections setting.",
        "Use Amazon RDS Proxy to create a proxy that connects to the DB instance. Update the Lambda function to connect to the proxy.",
        "Add a CloudWatch alarm that changes the DB instance class when the number of connections increases to more than 1,000.",
        "Add an Amazon EventBridge rule that increases the max_connections setting of the DB instance when CPU utilization is above 75%."
      ],
      "ma": [
        1
      ],
      "e": "Lambda functions can open many concurrent database connections during traffic peaks, which exhausts the MySQL max_connections limit. RDS Proxy pools and shares connections between the functions and the database, preventing too many connections errors and keeping the database available without downtime. Reducing vCPUs and raising max_connections (A) worsens the memory and CPU limits, and alarms that change the instance class (C) or max_connections (D) would cause downtime or are not supported automatically. Community vote: B (80%), D (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 66
    },
    {
      "d": 0,
      "q": "A company has installed smart meters in all its customer locations. The smart meters measure power usage at 1-minute intervals and send the usage readings to a remote endpoint for collection. The company needs to create an endpoint that will receive the smart meter readings and store the readings in a database. The company wants to store the location ID and timestamp information.\nThe company wants to give its customers low-latency access to their current usage and historical usage on demand. The company expects demand to increase significantly. The solution must not impact performance or include downtime while scaling.\nWhich solution will meet these requirements MOST cost-effectively?",
      "o": [
        "Store the smart meter readings in an Amazon RDS database. Create an index on the location ID and timestamp columns. Use the columns to filter on the customers' data.",
        "Store the smart meter readings in an Amazon DynamoDB table. Create a composite key by using the location ID and timestamp columns. Use the columns to filter on the customers' data.",
        "Store the smart meter readings in Amazon ElastiCache for Redis. Create a SortedSet key by using the location ID and timestamp columns. Use the columns to filter on the customers' data.",
        "Store the smart meter readings in Amazon S3. Partition the data by using the location ID and timestamp columns. Use Amazon Athena to filter on the customers' data."
      ],
      "ma": [
        1
      ],
      "e": "DynamoDB with a composite key of location ID as the partition key and timestamp as the sort key supports low-latency queries of a customer's current and historical readings, scales seamlessly without downtime, and is cost-effective with on-demand or auto scaling. RDS (A) would need scaling steps that can impact performance. ElastiCache for Redis (C) is in-memory and costly for historical data. S3 with Athena (D) does not provide low-latency on-demand access. Community vote: B (83%), D (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 67
    },
    {
      "d": 0,
      "q": "A company is building a serverless application that uses AWS Lambda functions. The company needs to create a set of test events to test Lambda functions in a development environment. The test events will be created once and then will be used by all the developers in an IAM developer group. The test events must be editable by any of the IAM users in the IAM developer group.\nWhich solution will meet these requirements?",
      "o": [
        "Create and store the test events in Amazon S3 as JSON objects. Allow S3 bucket access to all IAM users.",
        "Create the test events. Configure the event sharing settings to make the test events shareable.",
        "Create and store the test events in Amazon DynamoDB. Allow access to DynamoDB by using IAM roles.",
        "Create the test events. Configure the event sharing settings to make the test events private."
      ],
      "ma": [
        1
      ],
      "e": "The Lambda console lets you create shareable test events, which are stored in the account and can be viewed and edited by IAM users who have the appropriate permissions, such as members of the developer group. Private test events (D) are visible only to their creator. Storing events in S3 (A) or DynamoDB (C) does not integrate with the Lambda console test event feature and adds custom overhead. Community vote: B (53%), A (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 68
    },
    {
      "d": 0,
      "q": "A developer is configuring an application's deployment environment in AWS CodePipeline. The application code is stored in a GitHub repository. The developer wants to ensure that the repository package's unit tests run in the new deployment environment. The developer has already set the pipeline's source provider to GitHub and has specified the repository and branch to use in the deployment.\nWhich combination of steps should the developer take next to meet these requirements with the LEAST overhead? (Choose two.)",
      "o": [
        "Create an AWS CodeCommit project. Add the repository package's build and test commands to the project's buildspec.",
        "Create an AWS CodeBuild project. Add the repository package's build and test commands to the project's buildspec.",
        "Create an AWS CodeDeploy project. Add the repository package's build and test commands to the project's buildspec.",
        "Add an action to the source stage. Specify the newly created project as the action provider. Specify the build artifact as the action's input artifact.",
        "Add a new stage to the pipeline after the source stage. Add an action to the new stage. Specify the newly created project as the action provider. Specify the source artifact as the action's input artifact."
      ],
      "ma": [
        1,
        4
      ],
      "e": "An AWS CodeBuild project with the build and test commands in its buildspec runs the repository's unit tests, and a new pipeline stage after the source stage with a CodeBuild action using the source artifact as input runs that project on each change. CodeCommit (A) and CodeDeploy (C) are not build services, and the CodeBuild action should be in a new stage taking the source artifact, not added to the source stage with a build artifact as input (D). Community vote: BE (83%), BD (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 69
    },
    {
      "d": 0,
      "q": "An engineer created an A/B test of a new feature on an Amazon CloudWatch Evidently project. The engineer configured two variations of the feature (Variation A and Variation B) for the test. The engineer wants to work exclusively with Variation A. The engineer needs to make updates so that Variation A is the only variation that appears when the engineer hits the application's endpoint.\nWhich solution will meet this requirement?",
      "o": [
        "Add an override to the feature. Set the identifier of the override to the engineer's user ID. Set the variation to Variation A.",
        "Add an override to the feature. Set the identifier of the override to Variation A. Set the variation to 100%.",
        "Add an experiment to the project. Set the identifier of the experiment to Variation B. Set the variation to 0%.",
        "Add an experiment to the project. Set the identifier of the experiment to the AWS account's account ISet the variation to Variation A."
      ],
      "ma": [
        0
      ],
      "e": "CloudWatch Evidently overrides let you force specific user sessions to a given variation, so adding an override with the engineer's user ID mapped to Variation A means the engineer always sees Variation A while other users stay in the experiment. Overrides are keyed on the entity ID (the user), not on the variation name (B). Experiment-level settings with traffic percentages or account IDs (C, D) do not pin a specific user to a variation. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 70
    },
    {
      "d": 0,
      "q": "A developer is working on an existing application that uses Amazon DynamoDB as its data store. The DynamoDB table has the following attributes: partNumber (partition key), vendor (sort key), description, productFamily, and productType. When the developer analyzes the usage patterns, the developer notices that there are application modules that frequently look for a list of products based on the productFamily and productType attributes.\nThe developer wants to make changes to the application to improve performance of the query operations.\nWhich solution will meet these requirements?",
      "o": [
        "Create a global secondary index (GSI) with productFamily as the partition key and productType as the sort key.",
        "Create a local secondary index (LSI) with productFamily as the partition key and productType as the sort key.",
        "Recreate the table. Add partNumber as the partition key and vendor as the sort key. During table creation, add a local secondary index (LSI) with productFamily as the partition key and productType as the sort key.",
        "Update the queries to use Scan operations with productFamily as the partition key and productType as the sort key."
      ],
      "ma": [
        0
      ],
      "e": "A GSI can be added to an existing table at any time and can use different partition and sort keys, so a GSI on productFamily (partition) and productType (sort) lets the application run efficient Query calls on those attributes. An LSI must share the table's partition key and can only be created at table creation, so options B and C cannot use productFamily as the partition key. Scan reads the entire table and has no partition key concept, so option D would hurt rather than improve performance. Community vote: A (86%), C (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 71
    },
    {
      "d": 0,
      "q": "A developer creates a VPC named VPC-A that has public and private subnets. The developer also creates an Amazon RDS database inside the private subnet of VPC-A. To perform some queries, the developer creates an AWS Lambda function in the default VPC. The Lambda function has code to access the RDS database. When the Lambda function runs, an error message indicates that the function cannot connect to the RDS database.\nHow can the developer solve this problem?",
      "o": [
        "Modify the RDS security group. Add a rule to allow traffic from all the ports from the VPC CIDR block.",
        "Redeploy the Lambda function in the same subnet as the RDS instance. Ensure that the RDS security group allows traffic from the Lambda function.",
        "Create a security group for the Lambda function. Add a new rule in the RDS security group to allow traffic from the new Lambda security group.",
        "Create an IAM role. Attach a policy that allows access to the RDS database. Attach the role to the Lambda function."
      ],
      "ma": [
        1
      ],
      "e": "A Lambda function running in the default VPC is in a different network than VPC-A, so it has no route to the private RDS instance. Deploying the function into VPC-A (same VPC as the database, using its subnets) and allowing the function's security group in the RDS security group gives it private connectivity. Opening ports to the VPC CIDR (A) or attaching a security group (C) does not help while the function is outside VPC-A, and an IAM role (D) governs API permissions, not network access to the database. Community vote: B (62%), C (38%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 72
    },
    {
      "d": 0,
      "q": "A company runs an application on AWS. The company deployed the application on Amazon EC2 instances. The application stores data on Amazon Aurora.\nThe application recently logged multiple application-specific custom DECRYP_ERROR errors to Amazon CloudWatch logs. The company did not detect the issue until the automated tests that run every 30 minutes failed. A developer must implement a solution that will monitor for the custom errors and alert a development team in real time when these errors occur in the production environment.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Configure the application to create a custom metric and to push the metric to CloudWatch. Create an AWS CloudTrail alarm. Configure the CloudTrail alarm to use an Amazon Simple Notification Service (Amazon SNS) topic to send notifications.",
        "Create an AWS Lambda function to run every 5 minutes to scan the CloudWatch logs for the keyword DECRYP_ERROR. Configure the Lambda function to use Amazon Simple Notification Service (Amazon SNS) to send a notification.",
        "Use Amazon CloudWatch Logs to create a metric filter that has a filter pattern for DECRYP_ERROR. Create a CloudWatch alarm on this metric for a threshold >=1. Configure the alarm to send Amazon Simple Notification Service (Amazon SNS) notifications.",
        "Install the CloudWatch unified agent on the EC2 instance. Configure the application to generate a metric for the keyword DECRYP_ERROR errors. Configure the agent to send Amazon Simple Notification Service (Amazon SNS) notifications."
      ],
      "ma": [
        2
      ],
      "e": "A CloudWatch Logs metric filter with the pattern DECRYP_ERROR turns matching log events into a metric as they are ingested, and a CloudWatch alarm with a threshold of >=1 notifies an SNS topic in near real time with no custom code or servers. CloudTrail records API activity and has no alarms on application metrics (A), a polling Lambda every 5 minutes (B) is not real time and adds code to maintain, and the CloudWatch agent does not send SNS notifications itself (D). Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 73
    },
    {
      "d": 0,
      "q": "A developer created an AWS Lambda function that accesses resources in a VPC. The Lambda function polls an Amazon Simple Queue Service (Amazon SQS) queue for new messages through a VPC endpoint. Then the function calculates a rolling average of the numeric values that are contained in the messages. After initial tests of the Lambda function, the developer found that the value of the rolling average that the function returned was not accurate.\nHow can the developer ensure that the function calculates an accurate rolling average?",
      "o": [
        "Set the function's reserved concurrency to 1. Calculate the rolling average in the function. Store the calculated rolling average in Amazon ElastiCache.",
        "Modify the function to store the values in Amazon ElastiCache. When the function initializes, use the previous values from the cache to calculate the rolling average.",
        "Set the function's provisioned concurrency to 1. Calculate the rolling average in the function. Store the calculated rolling average in Amazon ElastiCache.",
        "Modify the function to store the values in the function's layers. When the function initializes, use the previously stored values to calculate the rolling average."
      ],
      "ma": [
        0
      ],
      "e": "Lambda scales out to many concurrent execution environments, each with its own memory, so a rolling average computed in-function is inaccurate when messages are processed in parallel. Setting reserved concurrency to 1 forces a single execution at a time, and storing the calculated average in ElastiCache keeps state that survives between invocations. Provisioned concurrency of 1 (C) only pre-warms one environment and does not cap concurrency, and layers (D) are read-only deployment packages that cannot hold changing values. Option B still lets concurrent invocations race on the cache. Community vote: A (52%), B (45%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 74
    },
    {
      "d": 0,
      "q": "A developer is writing unit tests for a new application that will be deployed on AWS. The developer wants to validate all pull requests with unit tests and merge the code with the main branch only when all tests pass.\nThe developer stores the code in AWS CodeCommit and sets up AWS CodeBuild to run the unit tests. The developer creates an AWS Lambda function to start the CodeBuild task. The developer needs to identify the CodeCommit events in an Amazon EventBridge event that can invoke the Lambda function when a pull request is created or updated.\nWhich CodeCommit event will meet these requirements?",
      "o": [
        "",
        "",
        "",
        ""
      ],
      "ma": [
        2
      ],
      "e": "CodeCommit emits the pullRequestCreated event when a pull request is opened and pullRequestSourceBranchUpdated when new commits are pushed to the pull request's source branch, so matching both covers created or updated pull requests. pullRequestMergeStatusUpdated (A) fires when the pull request is merged or closed, pullRequestApprovalRuleCreated (B) fires when an approval rule is added, and option D's pullRequestSourceBranchCreated is not a pull request creation/update event for this purpose. Community vote: C (86%), D (14%).",
      "images": [],
      "optionImages": [
        [
          {
            "path": "assets/q75-A1.png",
            "alt": "Question 75 option A"
          }
        ],
        [
          {
            "path": "assets/q75-B1.png",
            "alt": "Question 75 option B"
          }
        ],
        [
          {
            "path": "assets/q75-C1.png",
            "alt": "Question 75 option C"
          }
        ],
        [
          {
            "path": "assets/q75-D1.png",
            "alt": "Question 75 option D"
          }
        ]
      ],
      "sourceNumber": 75
    },
    {
      "d": 0,
      "q": "A developer deployed an application to an Amazon EC2 instance. The application needs to know the public IPv4 address of the instance. How can the application find this information?",
      "o": [
        "Query the instance metadata from http://169.254.169.254/latest/meta-data/.",
        "Query the instance user data from http://169.254.169.254/latest/user-data/.",
        "Query the Amazon Machine Image (AMI) information from http://169.254.169.254/latest/meta-data/ami/.",
        "Check the hosts file of the operating system."
      ],
      "ma": [
        0
      ],
      "e": "The instance metadata service at http://169.254.169.254/latest/meta-data/ exposes instance attributes, including public-ipv4, which the application can read at runtime. User data (B) holds the launch script, the ami/ path (C) only returns AMI-related values such as ami-id, and the hosts file (D) does not contain the instance's public IPv4 address. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 76
    },
    {
      "d": 0,
      "q": "An application under development is required to store hundreds of video files. The data must be encrypted within the application prior to storage, with a unique key for each video file.\nHow should the developer code the application?",
      "o": [
        "Use the KMS Encrypt API to encrypt the data. Store the encrypted data key and data.",
        "Use a cryptography library to generate an encryption key for the application. Use the encryption key to encrypt the data. Store the encrypted data.",
        "Use the KMS GenerateDataKey API to get a data key. Encrypt the data with the data key. Store the encrypted data key and data.",
        "Upload the data to an S3 bucket using server side-encryption with an AWS KMS key."
      ],
      "ma": [
        2
      ],
      "e": "Envelope encryption fits this: call KMS GenerateDataKey for each video file to get a plaintext data key and an encrypted copy, encrypt the file locally with the plaintext key, then store the encrypted data key alongside the encrypted data. KMS Encrypt (A) is limited to 4 KB of data and cannot encrypt large video files, a single application-wide key (B) is not unique per file and is not managed by KMS, and S3 server-side encryption (D) happens in S3, not within the application before storage. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 77
    },
    {
      "d": 0,
      "q": "A company is planning to deploy an application on AWS behind an Elastic Load Balancer. The application uses an HTTP/HTTPS listener and must access the client IP addresses.\nWhich load-balancing solution meets these requirements?",
      "o": [
        "Use an Application Load Balancer and the X-Forwarded-For headers.",
        "Use a Network Load Balancer (NLB). Enable proxy protocol support on the NLB and the target application.",
        "Use an Application Load Balancer. Register the targets by the instance ID.",
        "Use a Network Load Balancer and the X-Forwarded-For headers."
      ],
      "ma": [
        0
      ],
      "e": "An Application Load Balancer terminates HTTP/HTTPS connections and adds the X-Forwarded-For header containing the original client IP, which the application can read. Proxy protocol on an NLB (B) is a TCP-level mechanism that the target must parse and is not needed for an HTTP/HTTPS listener, registering targets by instance ID (C) does not expose client IPs, and an NLB does not insert HTTP headers such as X-Forwarded-For (D). Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 78
    },
    {
      "d": 0,
      "q": "A developer wants to debug an application by searching and filtering log data. The application logs are stored in Amazon CloudWatch Logs. The developer creates a new metric filter to count exceptions in the application logs. However, no results are returned from the logs.\nWhat is the reason that no filtered results are being returned?",
      "o": [
        "A setup of the Amazon CloudWatch interface VPC endpoint is required for filtering the CloudWatch Logs in the VPC.",
        "CloudWatch Logs only publishes metric data for events that happen after the filter is created.",
        "The log group for CloudWatch Logs should be first streamed to Amazon OpenSearch Service before metric filtering returns the results.",
        "Metric data points for logs groups can be filtered only after they are exported to an Amazon S3 bucket."
      ],
      "ma": [
        1
      ],
      "e": "A CloudWatch Logs metric filter only evaluates log events ingested after the filter is created and does not back-fill historical data, so a new filter returns no results for earlier exceptions. No VPC endpoint, OpenSearch Service streaming, or S3 export is required to apply a metric filter to a log group, which rules out A, C and D. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 79
    },
    {
      "d": 0,
      "q": "A company is planning to use AWS CodeDeploy to deploy an application to Amazon Elastic Container Service (Amazon ECS). During the deployment of a new version of the application, the company initially must expose only 10% of live traffic to the new version of the deployed application. Then, after 15 minutes elapse, the company must route all the remaining live traffic to the new version of the deployed application. Which CodeDeploy predefined configuration will meet these requirements?",
      "o": [
        "CodeDeployDefault.ECSCanary10Percent15Minutes",
        "CodeDeployDefault.LambdaCanary10Percent5Minutes",
        "CodeDeployDefault.LambdaCanary10Percentl15Minutes",
        "CodeDeployDefault.ECSLinear10PercentEvery1Minutes"
      ],
      "ma": [
        0
      ],
      "e": "CodeDeployDefault.ECSCanary10Percent15Minutes is the predefined ECS canary configuration that shifts 10 percent of traffic to the new task set first and the remaining 90 percent after 15 minutes. The two Lambda canary configurations apply to Lambda deployments, not ECS, and ECSLinear10PercentEvery1Minutes shifts 10 percent every minute rather than waiting 15 minutes before shifting the rest. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 80
    },
    {
      "d": 0,
      "q": "A company hosts a batch processing application on AWS Elastic Beanstalk with instances that run the most recent version of Amazon Linux. The application sorts and processes large datasets.\nIn recent weeks, the application's performance has decreased significantly during a peak period for traffic. A developer suspects that the application issues are related to the memory usage. The developer checks the Elastic Beanstalk console and notices that memory usage is not being tracked.\nHow should the developer gather more information about the application performance issues?",
      "o": [
        "Configure the Amazon CloudWatch agent to push logs to Amazon CloudWatch Logs by using port 443.",
        "Configure the Elastic Beanstalk .ebextensions directory to track the memory usage of the instances.",
        "Configure the Amazon CloudWatch agent to track the memory usage of the instances.",
        "Configure an Amazon CloudWatch dashboard to track the memory usage of the instances."
      ],
      "ma": [
        2
      ],
      "e": "Elastic Beanstalk's default CloudWatch metrics do not include memory utilization because memory is a guest OS metric the hypervisor cannot see. Installing and configuring the CloudWatch agent on the instances publishes memory usage as a custom metric. Pushing logs over port 443 (A) sends logs, not memory metrics, .ebextensions (B) is just a configuration mechanism that would still need the agent, and a dashboard (D) only displays metrics that already exist. Community vote: C (71%), B (29%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 81
    },
    {
      "d": 0,
      "q": "A developer is building a highly secure healthcare application using serverless components. This application requires writing temporary data to /tmp storage on an AWS Lambda function.\nHow should the developer encrypt this data?",
      "o": [
        "Enable Amazon EBS volume encryption with an AWS KMS key in the Lambda function configuration so that all storage attached to the Lambda function is encrypted.",
        "Set up the Lambda function with a role and key policy to access an AWS KMS key. Use the key to generate a data key used to encrypt all data prior to writing to /tmp storage.",
        "Use OpenSSL to generate a symmetric encryption key on Lambda startup. Use this key to encrypt the data prior to writing to /tmp.",
        "Use an on-premises hardware security module (HSM) to generate keys, where the Lambda function requests a data key from the HSM and uses that to encrypt data on all requests to the function."
      ],
      "ma": [
        1
      ],
      "e": "Data in Lambda /tmp is not encrypted by a setting you control, so the application must encrypt it itself. Giving the function a role and key policy to use a KMS key, calling GenerateDataKey, and encrypting data with the data key before writing to /tmp is standard envelope encryption. There is no EBS encryption option in Lambda configuration (A), a key generated at startup with OpenSSL (C) is not centrally managed or auditable, and an on-premises HSM (D) adds latency and complexity without being necessary. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 82
    },
    {
      "d": 0,
      "q": "A developer has created an AWS Lambda function to provide notification through Amazon Simple Notification Service (Amazon SNS) whenever a file is uploaded to Amazon S3 that is larger than 50 MB. The developer has deployed and tested the Lambda function by using the CLI. However, when the event notification is added to the S3 bucket and a 3,000 MB file is uploaded, the Lambda function does not launch.\nWhich of the following is a possible reason for the Lambda function's inability to launch?",
      "o": [
        "The S3 event notification does not activate for files that are larger than 1,000 MB.",
        "The resource-based policy for the Lambda function does not have the required permissions to be invoked by Amazon S3.",
        "Lambda functions cannot be invoked directly from an S3 event.",
        "The S3 bucket needs to be made public."
      ],
      "ma": [
        1
      ],
      "e": "For S3 to invoke a Lambda function, the function's resource-based policy must grant lambda:InvokeFunction to the S3 service principal for that bucket. Because the function worked when tested through the CLI but not from the S3 event, the missing permission is the likely cause. S3 events fire regardless of object size (A), S3 can directly trigger Lambda (C), and the bucket does not need to be public (D). Community vote: B (80%), A (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 83
    },
    {
      "d": 0,
      "q": "A developer is creating a Ruby application and needs to automate the deployment, scaling, and management of an environment without requiring knowledge of the underlying infrastructure.\nWhich service would best accomplish this task?",
      "o": [
        "AWS CodeDeploy",
        "AWS CloudFormation",
        "AWS OpsWorks",
        "AWS Elastic Beanstalk"
      ],
      "ma": [
        3
      ],
      "e": "AWS Elastic Beanstalk lets you upload code for supported platforms such as Ruby and automatically handles provisioning, load balancing, auto scaling and health monitoring, so no knowledge of the underlying infrastructure is needed. CodeDeploy (A) only automates deployments to existing compute, CloudFormation (B) requires you to define the infrastructure in templates, and OpsWorks (C) is a Chef/Puppet configuration management service that requires more infrastructure knowledge. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 84
    },
    {
      "d": 0,
      "q": "A company has a web application that is deployed on AWS. The application uses an Amazon API Gateway API and an AWS Lambda function as its backend.\nThe application recently demonstrated unexpected behavior. A developer examines the Lambda function code, finds an error, and modifies the code to resolve the problem. Before deploying the change to production, the developer needs to run tests to validate that the application operates properly.\nThe application has only a production environment available. The developer must create a new development environment to test the code changes. The developer must also prevent other developers from overwriting these changes during the test cycle.\nWhich combination of steps will meet these requirements with the LEAST development effort? (Choose two.)",
      "o": [
        "Create a new resource in the current stage. Create a new method with Lambda proxy integration. Select the Lambda function. Add the hotfix alias. Redeploy the current stage. Test the backend.",
        "Update the Lambda function in the API Gateway API integration request to use the hotfix alias. Deploy the API Gateway API to a new stage named hotfix. Test the backend.",
        "Modify the Lambda function by fixing the code. Test the Lambda function. Create the alias hotfix. Point the alias to the $LATEST version.",
        "Modify the Lambda function by fixing the code. Test the Lambda function. When the Lambda function is working as expected, publish the Lambda function as a new version. Create the alias hotfix. Point the alias to the new version.",
        "Create a new API Gateway API for the development environment. Add a resource and method with Lambda integration. Choose the Lambda function and the hotfix alias. Deploy to a new stage. Test the backend."
      ],
      "ma": [
        1,
        3
      ],
      "e": "Fixing and testing the function, publishing a new immutable version and pointing a hotfix alias at it (D) prevents others from changing the tested code, since $LATEST is mutable and can be overwritten. Updating the API integration to use the hotfix alias and deploying to a new stage named hotfix (B) creates a separate test environment without touching production. Pointing the alias at $LATEST (C) lets other developers overwrite the code, and adding resources to the current stage (A) or building a whole new API (E) changes production or requires more effort. Community vote: BD (89%), BE (11%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 85
    },
    {
      "d": 0,
      "q": "A developer is implementing an AWS Cloud Development Kit (AWS CDK) serverless application. The developer will provision several AWS Lambda functions and Amazon API Gateway APIs during AWS CloudFormation stack creation. The developer's workstation has the AWS Serverless Application Model (AWS SAM) and the AWS CDK installed locally.\nHow can the developer test a specific Lambda function locally?",
      "o": [
        "Run the sam package and sam deploy commands. Create a Lambda test event from the AWS Management Console. Test the Lambda function.",
        "Run the cdk synth and cdk deploy commands. Create a Lambda test event from the AWS Management Console. Test the Lambda function.",
        "Run the cdk synth and sam local invoke commands with the function construct identifier and the path to the synthesized CloudFormation template.",
        "Run the cdk synth and sam local start-lambda commands with the function construct identifier and the path to the synthesized CloudFormation template."
      ],
      "ma": [
        2
      ],
      "e": "cdk synth generates a CloudFormation template (in cdk.out) from the CDK app, and sam local invoke can then run a specific function locally in a container by passing the function's construct identifier and the path to that synthesized template. Deploying with sam or cdk deploy and testing in the console (A and B) is not local testing, and sam local start-lambda (D) starts a local Lambda endpoint for SDK/CLI calls rather than directly invoking a single function. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 86
    },
    {
      "d": 0,
      "q": "A company's new mobile app uses Amazon API Gateway. As the development team completes a new release of its APIs, a developer must safely and transparently roll out the API change.\nWhat is the SIMPLEST solution for the developer to use for rolling out the new API version to a limited number of users through API Gateway?",
      "o": [
        "Create a new API in API Gateway. Direct a portion of the traffic to the new API using an Amazon Route 53 weighted routing policy.",
        "Validate the new API version and promote it to production during the window of lowest expected utilization.",
        "Implement an Amazon CloudWatch alarm to trigger a rollback if the observed HTTP 500 status code rate exceeds a predetermined threshold.",
        "Use the canary release deployment option in API Gateway. Direct a percentage of the API traffic using the canarySettings setting."
      ],
      "ma": [
        3
      ],
      "e": "API Gateway has a built-in canary release deployment option: you enable canarySettings on a stage and set the percentage of traffic that goes to the new deployment, then promote it when satisfied. This is simpler than creating a second API and using Route 53 weighted routing (A), and neither deploying in a low-traffic window (B) nor a CloudWatch rollback alarm (C) limits the rollout to a subset of users. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 87
    },
    {
      "d": 0,
      "q": "A company caches session information for a web application in an Amazon DynamoDB table. The company wants an automated way to delete old items from the table.\nWhat is the simplest way to do this?",
      "o": [
        "Write a script that deletes old records; schedule the script as a cron job on an Amazon EC2 instance.",
        "Add an attribute with the expiration time; enable the Time To Live feature based on that attribute.",
        "Each day, create a new table to hold session data; delete the previous day's table.",
        "Add an attribute with the expiration time; name the attribute ItemExpiration."
      ],
      "ma": [
        1
      ],
      "e": "DynamoDB Time To Live automatically deletes expired items at no extra write cost when you store an expiration epoch timestamp in an attribute and enable TTL on that attribute. A cron job on EC2 (A) and daily table rotation (C) require extra infrastructure or management, and merely adding an attribute named ItemExpiration (D) does nothing unless TTL is enabled for it. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 88
    },
    {
      "d": 0,
      "q": "A company is using an Amazon API Gateway REST API endpoint as a webhook to publish events from an on-premises source control management (SCM) system to Amazon EventBridge. The company has configured an EventBridge rule to listen for the events and to control application deployment in a central AWS account. The company needs to receive the same events across multiple receiver AWS accounts.\nHow can a developer meet these requirements without changing the configuration of the SCM system?",
      "o": [
        "Deploy the API Gateway REST API to all the required AWS accounts. Use the same custom domain name for all the gateway endpoints so that a single SCM webhook can be used for all events from all accounts.",
        "Deploy the API Gateway REST API to all the receiver AWS accounts. Create as many SCM webhooks as the number of AWS accounts.",
        "Grant permission to the central AWS account for EventBridge to access the receiver AWS accounts. Add an EventBridge event bus on the receiver AWS accounts as the targets to the existing EventBridge rule.",
        "Convert the API Gateway type from REST API to HTTP API."
      ],
      "ma": [
        2
      ],
      "e": "An EventBridge rule can target an event bus in another account, so granting cross-account permission and adding the receiver accounts' event buses as targets of the existing rule fans the same webhook events out to every account without touching the SCM configuration. Deploying the API to every account (A and B) would require changing the SCM to call multiple endpoints or share one domain, and switching to an HTTP API (D) does not deliver events to additional accounts. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 89
    },
    {
      "d": 0,
      "q": "A company moved some of its secure files to a private Amazon S3 bucket that has no public access. The company wants to develop a serverless application that gives its employees the ability to log in and securely share the files with other users.\nWhich AWS feature should the company use to share and access the files securely?",
      "o": [
        "Amazon Cognito user pool",
        "S3 presigned URLs",
        "S3 bucket policy",
        "Amazon Cognito identity pool"
      ],
      "ma": [
        1
      ],
      "e": "S3 presigned URLs give temporary, scoped access to specific objects in a private bucket without making it public, so an application can let signed-in employees share individual files with others for a limited time. A Cognito user pool (A) handles sign-in but does not itself grant access to S3 objects, a bucket policy (C) is not suited to per-user, per-file sharing, and an identity pool (D) issues AWS credentials but still needs a sharing mechanism. Community vote: B (64%), D (25%), A (11%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 90
    },
    {
      "d": 0,
      "q": "A company needs to develop a proof of concept for a web service application. The application will show the weather forecast for one of the company's office locations. The application will provide a REST endpoint that clients can call. Where possible, the application should use caching features provided by AWS to limit the number of requests to the backend service. The application backend will receive a small amount of traffic only during testing.\nWhich approach should the developer take to provide the REST endpoint MOST cost-effectively?",
      "o": [
        "Create a container image. Deploy the container image by using Amazon Elastic Kubernetes Service (Amazon EKS). Expose the functionality by using Amazon API Gateway.",
        "Create an AWS Lambda function by using the AWS Serverless Application Model (AWS SAM). Expose the Lambda functionality by using Amazon API Gateway.",
        "Create a container image. Deploy the container image by using Amazon Elastic Container Service (Amazon ECS). Expose the functionality by using Amazon API Gateway.",
        "Create a microservices application. Deploy the application to AWS Elastic Beanstalk. Expose the AWS Lambda functionality by using an Application Load Balancer."
      ],
      "ma": [
        1
      ],
      "e": "A Lambda function exposed through API Gateway is serverless, billed per request, and cost-effective for a proof of concept with minimal traffic, while API Gateway provides the REST endpoint and response caching. Deploying on EKS, ECS, or Elastic Beanstalk with a load balancer (A, C, D) incurs ongoing charges for clusters, instances, or load balancers even when idle. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 91
    },
    {
      "d": 0,
      "q": "An e-commerce web application that shares session state on-premises is being migrated to AWS. The application must be fault tolerant, natively highly scalable, and any service interruption should not affect the user experience.\nWhat is the best option to store the session state?",
      "o": [
        "Store the session state in Amazon ElastiCache.",
        "Store the session state in Amazon CloudFront.",
        "Store the session state in Amazon S3.",
        "Enable session stickiness using elastic load balancers."
      ],
      "ma": [
        0
      ],
      "e": "ElastiCache (Redis or Memcached) is an in-memory store commonly used for shared session state, giving low latency, horizontal scalability and, with Redis replication and Multi-AZ, fault tolerance so any application server can read the session. CloudFront (B) is a CDN and not a session store, S3 (C) has too high latency for session reads and writes, and sticky sessions (D) tie users to one instance, so an instance failure loses their session. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 92
    },
    {
      "d": 0,
      "q": "A developer is building an application that uses Amazon DynamoDB. The developer wants to retrieve multiple specific items from the database with a single API call.\nWhich DynamoDB API call will meet these requirements with the MINIMUM impact on the database?",
      "o": [
        "BatchGetItem",
        "GetItem",
        "Scan",
        "Query"
      ],
      "ma": [
        0
      ],
      "e": "BatchGetItem retrieves up to 100 specific items by primary key (across one or more tables) in a single API call, which minimizes round trips and load compared with repeated calls. GetItem (B) fetches only one item per call, Scan (C) reads the whole table, and Query (D) requires a single partition key value and cannot fetch arbitrary unrelated keys in one call. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 93
    },
    {
      "d": 0,
      "q": "A developer has written an application that runs on Amazon EC2 instances. The developer is adding functionality for the application to write objects to an Amazon S3 bucket.\nWhich policy must the developer modify to allow the instances to write these objects?",
      "o": [
        "The IAM policy that is attached to the EC2 instance profile role",
        "The session policy that is applied to the EC2 instance role session",
        "The AWS Key Management Service (AWS KMS) key policy that is attached to the EC2 instance profile role",
        "The Amazon VPC endpoint policy"
      ],
      "ma": [
        0
      ],
      "e": "EC2 instances get AWS credentials from the IAM role attached through an instance profile, so granting s3:PutObject on the bucket in the role's identity-based policy is what allows the application to write objects. A session policy (B) only restricts permissions for a role session and is not what grants them, a KMS key policy (C) is attached to the key, not the role, and a VPC endpoint policy (D) is not the place to grant the instances write permission. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 94
    },
    {
      "d": 0,
      "q": "A developer is leveraging a Border Gateway Protocol (BGP)-based AWS VPN connection to connect from on-premises to Amazon EC2 instances in the developer's account. The developer is able to access an EC2 instance in subnet A, but is unable to access an EC2 instance in subnet B in the same VPC.\nWhich logs can the developer use to verify whether the traffic is reaching subnet B?",
      "o": [
        "VPN logs",
        "BGP logs",
        "VPC Flow Logs",
        "AWS CloudTrail logs"
      ],
      "ma": [
        2
      ],
      "e": "VPC Flow Logs record accepted and rejected IP traffic at the ENI, subnet or VPC level, so enabling them on subnet B (or its instance's network interface) shows whether on-premises traffic arrives and whether security groups or network ACLs reject it. VPN logs and BGP logs (A and B) only show tunnel and route advertisement status, which is already working since subnet A is reachable, and CloudTrail (D) records API calls, not network traffic. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 95
    },
    {
      "d": 0,
      "q": "A developer is creating a service that uses an Amazon S3 bucket for image uploads. The service will use an AWS Lambda function to create a thumbnail of each image. Each time an image is uploaded, the service needs to send an email notification and create the thumbnail. The developer needs to configure the image processing and email notifications setup.\nWhich solution will meet these requirements?",
      "o": [
        "Create an Amazon Simple Notification Service (Amazon SNS) topic. Configure S3 event notifications with a destination of the SNS topic. Subscribe the Lambda function to the SNS topic. Create an email notification subscription to the SNS topic.",
        "Create an Amazon Simple Notification Service (Amazon SNS) topic. Configure S3 event notifications with a destination of the SNS topic. Subscribe the Lambda function to the SNS topic. Create an Amazon Simple Queue Service (Amazon SQS) queue. Subscribe the SQS queue to the SNS topic. Create an email notification subscription to the SQS queue.",
        "Create an Amazon Simple Queue Service (Amazon SQS) queue. Configure S3 event notifications with a destination of the SQS queue. Subscribe the Lambda function to the SQS queue. Create an email notification subscription to the SQS queue.",
        "Create an Amazon Simple Queue Service (Amazon SQS) queue. Send S3 event notifications to Amazon EventBridge. Create an EventBridge rule that runs the Lambda function when images are uploaded to the S3 bucket. Create an EventBridge rule that sends notifications to the SQS queue. Create an email notification subscription to the SQS queue."
      ],
      "ma": [
        0
      ],
      "e": "S3 event notifications can send to an SNS topic, which then fans out to multiple subscribers: the Lambda function for thumbnail creation and an email subscription for notifications. SNS supports email subscriptions directly, while SQS queues cannot have email subscriptions (B, C, D), and S3 can only send a given event to one matching destination type per prefix/suffix configuration, so fan-out through SNS is the correct design. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 96
    },
    {
      "d": 0,
      "q": "A developer has designed an application to store incoming data as JSON files in Amazon S3 objects. Custom business logic in an AWS Lambda function then transforms the objects, and the Lambda function loads the data into an Amazon DynamoDB table. Recently, the workload has experienced sudden and significant changes in traffic. The flow of data to the DynamoDB table is becoming throttled.\nThe developer needs to implement a solution to eliminate the throttling and load the data into the DynamoDB table more consistently. Which solution will meet these requirements?",
      "o": [
        "Refactor the Lambda function into two functions. Configure one function to transform the data and one function to load the data into the DynamoDB table. Create an Amazon Simple Queue Service (Amazon SQS) queue in between the functions to hold the items as messages and to invoke the second function.",
        "Turn on auto scaling for the DynamoDB table. Use Amazon CloudWatch to monitor the table's read and write capacity metrics and to track consumed capacity.",
        "Create an alias for the Lambda function. Configure provisioned concurrency for the application to use.",
        "Refactor the Lambda function into two functions. Configure one function to store the data in the DynamoDB table. Configure the second function to process the data and update the items after the data is stored in DynamoDB. Create a DynamoDB stream to invoke the second function after the data is stored."
      ],
      "ma": [
        0
      ],
      "e": "Putting an SQS queue between the transform function and the loader function buffers traffic spikes, and the Lambda event source mapping with a limited batch size and maximum concurrency controls how fast writes reach DynamoDB, smoothing the load and avoiding throttling. DynamoDB auto scaling (B) reacts too slowly to sudden spikes, provisioned concurrency (C) only reduces cold starts and does not control write rate, and a DynamoDB stream (D) triggers after the write and does not prevent write throttling. Community vote: A (48%), B (34%), D (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 97
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Lambda function in VPC mode. An Amazon S3 event will invoke the Lambda function when an object is uploaded into an S3 bucket. The Lambda function will process the object and produce some analytic results that will be recorded into a file. Each processed object will also generate a log entry that will be recorded into a file.\nOther Lambda functions, AWS services, and on-premises resources must have access to the result files and log file. Each log entry must also be appended to the same shared log file. The developer needs a solution that can share files and append results into an existing file.\nWhich solution should the developer use to meet these requirements?",
      "o": [
        "Create an Amazon Elastic File System (Amazon EFS) file system. Mount the EFS file system in Lambda. Store the result files and log file in the mount point. Append the log entries to the log file.",
        "Create an Amazon Elastic Block Store (Amazon EBS) Multi-Attach enabled volume. Attach the EBS volume to all Lambda functions. Update the Lambda function code to download the log file, append the log entries, and upload the modified log file to Amazon EBS.",
        "Create a reference to the /tmp local directory. Store the result files and log file by using the directory reference. Append the log entry to the log file.",
        "Create a reference to the /opt storage directory. Store the result files and log file by using the directory reference. Append the log entry to the log file."
      ],
      "ma": [
        0
      ],
      "e": "Lambda functions can mount an Amazon EFS file system, which provides a shared POSIX file system where multiple functions can read, write and append to the same file, and it is also accessible by other AWS services and on-premises resources through a VPC connection. EBS volumes cannot be attached to Lambda (B), /tmp (C) is local and private to each execution environment, and /opt (D) is a read-only layer directory. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 98
    },
    {
      "d": 0,
      "q": "A company has an AWS Lambda function that processes incoming requests from an Amazon API Gateway API. The API calls the Lambda function by using a Lambda alias. A developer updated the Lambda function code to handle more details related to the incoming requests. The developer wants to deploy the new Lambda function for more testing by other developers with no impact to customers that use the API.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Create a new version of the Lambda function. Create a new stage on API Gateway with integration to the new Lambda version. Use the new API Gateway stage to test the Lambda function.",
        "Update the existing Lambda alias used by API Gateway to a weighted alias. Add the new Lambda version as an additional Lambda function with a weight of 10%. Use the existing API Gateway stage for testing.",
        "Create a new version of the Lambda function. Create and deploy a second Lambda function to filter incoming requests from API Gateway. If the filtering Lambda function detects a test request, the filtering Lambda function will invoke the new Lambda version of the code. For other requests, the filtering Lambda function will invoke the old Lambda version. Update the API Gateway API to use the filtering Lambda function.",
        "Create a new version of the Lambda function. Create a new API Gateway API for testing purposes. Update the integration of the new API with the new Lambda version. Use the new API for testing."
      ],
      "ma": [
        0
      ],
      "e": "Publishing a new Lambda version and creating a separate API Gateway stage whose integration points to that version lets developers test the new code without changing the alias used by the production stage, so customers are unaffected, and it needs very little work. A weighted alias (B) would send 10 percent of real customer traffic to the new code, a request-filtering Lambda (C) adds code and risk to the production path, and a whole new API (D) takes more effort than just adding a stage. Community vote: A (83%), Other (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 99
    },
    {
      "d": 0,
      "q": "A company uses AWS Lambda functions and an Amazon S3 trigger to process images into an S3 bucket. A development team set up multiple environments in a single AWS account.\nAfter a recent production deployment, the development team observed that the development S3 buckets invoked the production environment Lambda functions. These invocations caused unwanted execution of development S3 files by using production Lambda functions. The development team must prevent these invocations. The team must follow security best practices.\nWhich solution will meet these requirements?",
      "o": [
        "Update the Lambda execution role for the production Lambda function to add a policy that allows the execution role to read from only the production environment S3 bucket.",
        "Move the development and production environments into separate AWS accounts. Add a resource policy to each Lambda function to allow only S3 buckets that are within the same account to invoke the function.",
        "Add a resource policy to the production Lambda function to allow only the production environment S3 bucket to invoke the function.",
        "Move the development and production environments into separate AWS accounts. Update the Lambda execution role for each function to add a policy that allows the execution role to read from the S3 bucket that is within the same account."
      ],
      "ma": [
        1
      ],
      "e": "In a single account, an S3 bucket can be configured to invoke any Lambda function whose resource-based policy trusts S3 broadly, which let the development buckets invoke production functions. Separating development and production into different accounts and adding a resource policy that only allows S3 buckets in the same account to invoke the function enforces isolation following security best practices. Execution role changes (A and D) only control what the function can read, not who can invoke it, and option C alone leaves both environments sharing an account without stronger account-level isolation. Community vote: B (50%), C (43%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 100
    },
    {
      "d": 0,
      "q": "A developer is creating an application. New users of the application must be able to create an account and register by using their own social media accounts.\nWhich AWS service or resource should the developer use to meet these requirements?",
      "o": [
        "IAM role",
        "Amazon Cognito identity pools",
        "Amazon Cognito user pools",
        "AWS Directory Service"
      ],
      "ma": [
        2
      ],
      "e": "Amazon Cognito user pools provide a user directory with sign-up and sign-in and support federation with social identity providers such as Google, Facebook and Amazon, so new users can register with their social accounts. Identity pools (B) provide AWS credentials for identities but are not the user directory, an IAM role (A) is not a sign-up mechanism, and AWS Directory Service (D) is for Microsoft AD-style enterprise directories. Community vote: C (58%), B (42%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 101
    },
    {
      "d": 0,
      "q": "A social media application uses the AWS SDK for JavaScript on the frontend to get user credentials from AWS Security Token Service (AWS STS). The application stores its assets in an Amazon S3 bucket. The application serves its content by using an Amazon CloudFront distribution with the origin set to the S3 bucket.\nThe credentials for the role that the application assumes to make the SDK calls are stored in plaintext in a JSON file within the application code. The developer needs to implement a solution that will allow the application to get user credentials without having any credentials hardcoded in the application code.\nWhich solution will meet these requirements?",
      "o": [
        "Add a Lambda@Edge function to the distribution. Invoke the function on viewer request. Add permissions to the function's execution role to allow the function to access AWS STS. Move all SDK calls from the frontend into the function.",
        "Add a CloudFront function to the distribution. Invoke the function on viewer request. Add permissions to the function's execution role to allow the function to access AWS STS. Move all SDK calls from the frontend into the function.",
        "Add a Lambda@Edge function to the distribution. Invoke the function on viewer request. Move the credentials from the JSON file into the function. Move all SDK calls from the frontend into the function.",
        "Add a CloudFront function to the distribution. Invoke the function on viewer request. Move the credentials from the JSON file into the function. Move all SDK calls from the frontend into the function."
      ],
      "ma": [
        0
      ],
      "e": "A Lambda@Edge function runs with an IAM execution role, so granting that role permission to call AWS STS lets the function obtain credentials at runtime without any hardcoded secrets, and the frontend SDK calls move into the function. CloudFront Functions (B and D) are lightweight JavaScript functions that cannot make network calls or use an execution role to call STS, and moving the plaintext credentials into the function (C and D) is still hardcoding credentials. Community vote: A (90%), B (10%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 102
    },
    {
      "d": 0,
      "q": "An ecommerce website uses an AWS Lambda function and an Amazon RDS for MySQL database for an order fulfillment service. The service needs to return order confirmation immediately.\nDuring a marketing campaign that caused an increase in the number of orders, the website's operations team noticed errors for \u201ctoo many connections\u201d from Amazon RDS. However, the RDS DB cluster metrics are healthy. CPU and memory capacity are still available.\nWhat should a developer do to resolve the errors?",
      "o": [
        "Initialize the database connection outside the handler function. Increase the max_user_connections value on the parameter group of the DB cluster. Restart the DB cluster.",
        "Initialize the database connection outside the handler function. Use RDS Proxy instead of connecting directly to the DB cluster.",
        "Use Amazon Simple Queue Service (Amazon SQS) FIFO queues to queue the orders. Ingest the orders into the database. Set the Lambda function's concurrency to a value that equals the number of available database connections.",
        "Use Amazon Simple Queue Service (Amazon SQS) FIFO queues to queue the orders. Ingest the orders into the database. Set the Lambda function's concurrency to a value that is less than the number of available database connections."
      ],
      "ma": [
        1
      ],
      "e": "Too many connections occurs because each concurrent Lambda environment opens its own database connection, exhausting the database limit even though CPU and memory are fine. RDS Proxy pools and shares connections so many Lambda invocations multiplex over fewer database connections, and initializing the connection outside the handler allows reuse across warm invocations. Raising max_user_connections and restarting (A) only increases the ceiling and causes downtime, and routing orders through an SQS FIFO queue (C and D) delays processing and conflicts with the requirement to return confirmation immediately. Community vote: B (89%), C (11%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 103
    },
    {
      "d": 0,
      "q": "A company stores its data in data tables in a series of Amazon S3 buckets. The company received an alert that customer credit card information might have been exposed in a data table on one of the company's public applications. A developer needs to identify all potential exposures within the application environment.\nWhich solution will meet these requirements?",
      "o": [
        "Use Amazon Athena to run a job on the S3 buckets that contain the affected data. Filter the findings by using the SensitiveData:S3Object/Personal finding type.",
        "Use Amazon Macie to run a job on the S3 buckets that contain the affected data. Filter the findings by using the SensitiveData:S3Object/Financial finding type.",
        "Use Amazon Macie to run a job on the S3 buckets that contain the affected data. Filter the findings by using the SensitiveData:S3Object/Personal finding type.",
        "Use Amazon Athena to run a job on the S3 buckets that contain the affected data. Filter the findings by using the SensitiveData:S3Object/Financial finding type."
      ],
      "ma": [
        1
      ],
      "e": "Amazon Macie discovers sensitive data in S3 by running sensitive data discovery jobs, and credit card numbers are reported under the SensitiveData:S3Object/Financial finding type, so filtering on that type identifies the exposures. Athena (A and D) is a query service and does not classify sensitive data, and the Personal finding type (C) covers personally identifiable information such as names and addresses, not financial information like credit cards. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 104
    },
    {
      "d": 0,
      "q": "A software company is launching a multimedia application. The application will allow guest users to access sample content before the users decide if they want to create an account to gain full access. The company wants to implement an authentication process that can identify users who have already created an account. The company also needs to keep track of the number of guest users who eventually create an account. Which combination of steps will meet these requirements? (Choose two.)",
      "o": [
        "Create an Amazon Cognito user pool. Configure the user pool to allow unauthenticated users. Exchange user tokens for temporary credentials that allow authenticated users to assume a role.",
        "Create an Amazon Cognito identity pool. Configure the identity pool to allow unauthenticated users. Exchange unique identity for temporary credentials that allow all users to assume a role.",
        "Create an Amazon CloudFront distribution. Configure the distribution to allow unauthenticated users. Exchange user tokens for temporary credentials that allow all users to assume a role.",
        "Create a role for authenticated users that allows access to all content. Create a role for unauthenticated users that allows access to only the sample content.",
        "Allow all users to access the sample content by default. Create a role for authenticated users that allows access to the other content."
      ],
      "ma": [
        1,
        3
      ],
      "e": "A Cognito identity pool can issue temporary AWS credentials to unauthenticated guests as well as authenticated users, and the unique identity ID lets the company track a guest who later signs up and is linked to an authenticated identity (B). Creating separate IAM roles for authenticated users (all content) and unauthenticated users (sample content only) enforces the access difference (D). A user pool (A) does not support unauthenticated access to AWS credentials, CloudFront (C) is not an identity service, and option E gives no separate guest role. Community vote: BD (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 105
    },
    {
      "d": 0,
      "q": "A company is updating an application to move the backend of the application from Amazon EC2 instances to a serverless model. The application uses an Amazon RDS for MySQL DB instance and runs in a single VPC on AWS. The application and the DB instance are deployed in a private subnet in the VPC.\nThe company needs to connect AWS Lambda functions to the DB instance.\nWhich solution will meet these requirements?",
      "o": [
        "Create Lambda functions inside the VPC with the AWSLambdaBasicExecutionRole policy attached to the Lambda execution role. Modify the RDS security group to allow inbound access from the Lambda security group.",
        "Create Lambda functions inside the VPC with the AWSLambdaVPCAccessExecutionRole policy attached to the Lambda execution role. Modify the RDS security group to allow inbound access from the Lambda security group.",
        "Create Lambda functions with the AWSLambdaBasicExecutionRole policy attached to the Lambda execution role. Create an interface VPC endpoint for the Lambda functions. Configure the interface endpoint policy to allow the lambda:InvokeFunclion action for each Lambda function's Amazon Resource Name (ARN).",
        "Create Lambda functions with the AWSLambdaVPCAccessExecutionRole policy attached to the Lambda execution role. Create an interface VPC endpoint for the Lambda functions. Configure the interface endpoint policy to allow the lambda:InvokeFunction action for each Lambda function's Amazon Resource Name (ARN)."
      ],
      "ma": [
        1
      ],
      "e": "To reach an RDS instance in a private subnet, the Lambda functions must be configured to run inside the VPC, which requires the execution role to have the AWSLambdaVPCAccessExecutionRole managed policy for creating and managing network interfaces. The RDS security group must then allow inbound traffic from the Lambda security group. AWSLambdaBasicExecutionRole (A) lacks the ENI permissions, and an interface VPC endpoint for Lambda (C and D) only helps invoke functions privately and does not connect functions to the database. Community vote: B (78%), D (22%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 106
    },
    {
      "d": 0,
      "q": "A company has a web application that runs on Amazon EC2 instances with a custom Amazon Machine Image (AMI). The company uses AWS CloudFormation to provision the application. The application runs in the us-east-1 Region, and the company needs to deploy the application to the us-west-1 Region.\nAn attempt to create the AWS CloudFormation stack in us-west-1 fails. An error message states that the AMI ID does not exist. A developer must resolve this error with a solution that uses the least amount of operational overhead.\nWhich solution meets these requirements?",
      "o": [
        "Change the AWS CloudFormation templates for us-east-1 and us-west-1 to use an AWS AMI. Relaunch the stack for both Regions.",
        "Copy the custom AMI from us-east-1 to us-west-1. Update the AWS CloudFormation template for us-west-1 to refer to AMI ID for the copied AMI. Relaunch the stack.",
        "Build the custom AMI in us-west-1. Create a new AWS CloudFormation template to launch the stack in us-west-1 with the new AMI ID.",
        "Manually deploy the application outside AWS CloudFormation in us-west-1."
      ],
      "ma": [
        1
      ],
      "e": "AMIs are regional, so the us-east-1 AMI ID does not exist in us-west-1. Copying the custom AMI to us-west-1 and referencing its new AMI ID in the us-west-1 template preserves the existing image with minimal effort. Switching to a public AWS AMI (A) would lose the custom software, rebuilding the AMI (C) takes more work than copying, and manual deployment (D) abandons the CloudFormation automation. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 107
    },
    {
      "d": 0,
      "q": "A developer is updating several AWS Lambda functions and notices that all the Lambda functions share the same custom libraries. The developer wants to centralize all the libraries, update the libraries in a convenient way, and keep the libraries versioned.\nWhich solution will meet these requirements with the LEAST development effort?",
      "o": [
        "Create an AWS CodeArtifact repository that contains all the custom libraries.",
        "Create a custom container image for the Lambda functions to save all the custom libraries.",
        "Create a Lambda layer that contains all the custom libraries.",
        "Create an Amazon Elastic File System (Amazon EFS) file system to store all the custom libraries."
      ],
      "ma": [
        2
      ],
      "e": "A Lambda layer packages shared libraries in one versioned artifact that multiple functions can reference, and publishing a new layer version updates the library with little effort. CodeArtifact (A) stores packages but still requires bundling them into each function, container images (B) require rebuilding and managing images, and an EFS file system (D) adds a VPC, mounting and infrastructure overhead. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 108
    },
    {
      "d": 0,
      "q": "A developer wants to use AWS Elastic Beanstalk to test a new version of an application in a test environment.\nWhich deployment method offers the FASTEST deployment?",
      "o": [
        "Immutable",
        "Rolling",
        "Rolling with additional batch",
        "All at once"
      ],
      "ma": [
        3
      ],
      "e": "All at once deploys the new version to every instance simultaneously, so it is the fastest Elastic Beanstalk deployment method, at the cost of brief downtime, which is acceptable in a test environment. Rolling and rolling with additional batch update in batches, and immutable launches a whole new set of instances, so all of them take longer. Community vote: D (80%), B (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 109
    },
    {
      "d": 0,
      "q": "A company is providing read access to objects in an Amazon S3 bucket for different customers. The company uses IAM permissions to restrict access to the S3 bucket. The customers can access only their own files.\nDue to a regulation requirement, the company needs to enforce encryption in transit for interactions with Amazon S3.\nWhich solution will meet these requirements?",
      "o": [
        "Add a bucket policy to the S3 bucket to deny S3 actions when the aws:SecureTransport condition is equal to false.",
        "Add a bucket policy to the S3 bucket to deny S3 actions when the s3:x-amz-acl condition is equal to public-read.",
        "Add an IAM policy to the IAM users to enforce the usage of the AWS SDK.",
        "Add an IAM policy to the IAM users that allows S3 actions when the s3:x-amz-acl condition is equal to bucket-owner-read."
      ],
      "ma": [
        0
      ],
      "e": "A bucket policy with a Deny statement for all S3 actions when the aws:SecureTransport condition is false rejects any request made over plain HTTP, enforcing encryption in transit with TLS. The s3:x-amz-acl conditions (B and D) relate to object ACLs, not transport encryption, and requiring the SDK (C) does not guarantee HTTPS. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 110
    },
    {
      "d": 0,
      "q": "A company has an image storage web application that runs on AWS. The company hosts the application on Amazon EC2 instances in an Auto Scaling group. The Auto Scaling group acts as the target group for an Application Load Balancer (ALB) and uses an Amazon S3 bucket to store the images for sale.\nThe company wants to develop a feature to test system requests. The feature will direct requests to a separate target group that hosts a new beta version of the application.\nWhich solution will meet this requirement with the LEAST effort?",
      "o": [
        "Create a new Auto Scaling group and target group for the beta version of the application. Update the ALB routing rule with a condition that looks for a cookie named version that has a value of beta. Update the test system code to use this cookie to test the beta version of the application.",
        "Create a new ALB, Auto Scaling group, and target group for the beta version of the application. Configure an alternate Amazon Route 53 record for the new ALB endpoint. Use the alternate Route 53 endpoint in the test system requests to test the beta version of the application.",
        "Create a new ALB, Auto Scaling group, and target group for the beta version of the application. Use Amazon CloudFront with Lambda@Edge to determine which specific request will go to the new ALB. Use the CloudFront endpoint to send the test system requests to test the beta version of the application.",
        "Create a new Auto Scaling group and target group for the beta version of the application. Update the ALB routing rule with a condition that looks for a cookie named version that has a value of beta. Use Amazon CloudFront with Lambda@Edge to update the test system requests to add the required cookie when the requests go to the ALB."
      ],
      "ma": [
        0
      ],
      "e": "An ALB listener rule can route requests to a different target group based on conditions such as an HTTP header or cookie, so creating a beta Auto Scaling group and target group and adding a rule that matches a cookie named version=beta, with the test system sending that cookie, requires the least work. Creating another ALB with Route 53 records (B), or adding CloudFront and Lambda@Edge (C and D), adds extra resources that are not necessary. Community vote: A (53%), B (32%), D (16%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 111
    },
    {
      "d": 0,
      "q": "A team is developing an application that is deployed on Amazon EC2 instances. During testing, the team receives an error. The EC2 instances are unable to access an Amazon S3 bucket.\nWhich steps should the team take to troubleshoot this issue? (Choose two.)",
      "o": [
        "Check whether the policy that is assigned to the IAM role that is attached to the EC2 instances grants access to Amazon S3.",
        "Check the S3 bucket policy to validate the access permissions for the S3 bucket.",
        "Check whether the policy that is assigned to the IAM user that is attached to the EC2 instances grants access to Amazon S3.",
        "Check the S3 Lifecycle policy to validate the permissions that are assigned to the S3 bucket.",
        "Check the security groups that are assigned to the EC2 instances. Make sure that a rule is not blocking the access to Amazon S3."
      ],
      "ma": [
        0,
        1
      ],
      "e": "Access from EC2 to S3 depends on both the identity-based policy of the IAM role attached to the instances (A) and the S3 bucket policy, which can deny or fail to allow the role (B). EC2 instances use IAM roles, not IAM users (C), S3 Lifecycle policies only manage object transitions and expiration and do not control permissions (D), and security groups do not need an S3-specific rule for outbound access since default egress allows it (E). Community vote: AB (88%), AE (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 112
    },
    {
      "d": 0,
      "q": "A developer is working on an ecommerce website. The developer wants to review server logs without logging in to each of the application servers individually. The website runs on multiple Amazon EC2 instances, is written in Python, and needs to be highly available.\nHow can the developer update the application to meet these requirements with MINIMUM changes?",
      "o": [
        "Rewrite the application to be cloud native and to run on AWS Lambda, where the logs can be reviewed in Amazon CloudWatch.",
        "Set up centralized logging by using Amazon OpenSearch Service, Logstash, and OpenSearch Dashboards.",
        "Scale down the application to one larger EC2 instance where only one instance is recording logs.",
        "Install the unified Amazon CloudWatch agent on the EC2 instances. Configure the agent to push the application logs to CloudWatch."
      ],
      "ma": [
        3
      ],
      "e": "Installing the unified CloudWatch agent on the instances and configuring it to ship application logs to CloudWatch Logs centralizes logs from all servers with no application code changes. Rewriting for Lambda (A) is a large change, an OpenSearch/Logstash stack (B) is heavy to set up and operate, and a single large instance (C) removes high availability. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 113
    },
    {
      "d": 0,
      "q": "A company is creating an application that processes .csv files from Amazon S3. A developer has created an S3 bucket. The developer has also created an AWS Lambda function to process the .csv files from the S3 bucket.\nWhich combination of steps will invoke the Lambda function when a .csv file is uploaded to Amazon S3? (Choose two.)",
      "o": [
        "Create an Amazon EventBridge rule. Configure the rule with a pattern to match the S3 object created event.",
        "Schedule an Amazon EventBridge rule to run a new Lambda function to scan the S3 bucket.",
        "Add a trigger to the existing Lambda function. Set the trigger type to EventBridge. Select the Amazon EventBridge rule.",
        "Create a new Lambda function to scan the S3 bucket for recently added S3 objects.",
        "Add S3 Lifecycle rules to invoke the existing Lambda function."
      ],
      "ma": [
        0,
        2
      ],
      "e": "S3 sends Object Created events to EventBridge, so an EventBridge rule with an event pattern matching S3 object created events (A), combined with adding the Lambda function as the rule's target through the trigger (C), invokes the function whenever a .csv file is uploaded. Scheduled scanning functions (B and D) are polling approaches that are not event-driven, and S3 Lifecycle rules (E) manage storage transitions and expirations and cannot invoke Lambda. Community vote: AC (75%), AE (12%) AB (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 114
    },
    {
      "d": 0,
      "q": "A developer needs to build an AWS CloudFormation template that self-populates the AWS Region variable that deploys the CloudFormation template.\nWhat is the MOST operationally efficient way to determine the Region in which the template is being deployed?",
      "o": [
        "Use the AWS::Region pseudo parameter.",
        "Require the Region as a CloudFormation parameter.",
        "Find the Region from the AWS::StackId pseudo parameter by using the Fn::Split intrinsic function.",
        "Dynamically import the Region by referencing the relevant parameter in AWS Systems Manager Parameter Store."
      ],
      "ma": [
        0
      ],
      "e": "AWS::Region is a CloudFormation pseudo parameter that resolves automatically to the Region where the stack is being created, so no input or lookup is needed. Requiring a parameter (B) needs manual input, parsing AWS::StackId with Fn::Split (C) is convoluted, and fetching from Parameter Store (D) adds an unnecessary dependency. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 115
    },
    {
      "d": 0,
      "q": "A company has hundreds of AWS Lambda functions that the company's QA team needs to test by using the Lambda function URLs. A developer needs to configure the authentication of the Lambda functions to allow access so that the QA IAM group can invoke the Lambda functions by using the public URLs.\nWhich solution will meet these requirements?",
      "o": [
        "Create a CLI script that loops on the Lambda functions to add a Lambda function URL with the AWS_IAM auth type. Run another script to create an IAM identity-based policy that allows the lambda:InvokeFunctionUrl action to all the Lambda function Amazon Resource Names (ARNs). Attach the policy to the QA IAM group.",
        "Create a CLI script that loops on the Lambda functions to add a Lambda function URL with the NONE auth type. Run another script to create an IAM resource-based policy that allows the lambda:InvokeFunctionUrl action to all the Lambda function Amazon Resource Names (ARNs). Attach the policy to the QA IAM group.",
        "Create a CLI script that loops on the Lambda functions to add a Lambda function URL with the AWS_IAM auth type. Run another script to loop on the Lambda functions to create an IAM identity-based policy that allows the lambda:InvokeFunctionUrl action from the QA IAM group's Amazon Resource Name (ARN).",
        "Create a CLI script that loops on the Lambda functions to add a Lambda function URL with the NONE auth type. Run another script to loop on the Lambda functions to create an IAM resource-based policy that allows the lambda:InvokeFunctionUrl action from the QA IAM group's Amazon Resource Name (ARN)."
      ],
      "ma": [
        0
      ],
      "e": "A function URL with the AWS_IAM auth type requires SigV4-signed requests from principals with permission, and an identity-based IAM policy allowing lambda:InvokeFunctionUrl on the functions' ARNs attached once to the QA IAM group grants the QA team access with minimal effort. The NONE auth type (B and D) makes the URL public with no IAM check, and an identity-based policy cannot specify a group as its principal, which also makes option C wrong. Community vote: A (67%), C (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 116
    },
    {
      "d": 0,
      "q": "A developer maintains a critical business application that uses Amazon DynamoDB as the primary data store. The DynamoDB table contains millions of documents and receives 30-60 requests each minute. The developer needs to perform processing in near-real time on the documents when they are added or updated in the DynamoDB table.\nHow can the developer implement this feature with the LEAST amount of change to the existing application code?",
      "o": [
        "Set up a cron job on an Amazon EC2 instance. Run a script every hour to query the table for changes and process the documents.",
        "Enable a DynamoDB stream on the table. Invoke an AWS Lambda function to process the documents.",
        "Update the application to send a PutEvents request to Amazon EventBridge. Create an EventBridge rule to invoke an AWS Lambda function to process the documents.",
        "Update the application to synchronously process the documents directly after the DynamoDB write."
      ],
      "ma": [
        1
      ],
      "e": "Enabling DynamoDB Streams captures item-level changes (inserts and updates) in near real time, and a Lambda function with the stream as an event source can process each change without modifying the existing application code. A cron job (A) is hourly and not near real time, changing the app to call EventBridge (C) or process synchronously (D) requires code changes. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 117
    },
    {
      "d": 0,
      "q": "A developer is writing an application for a company. The application will be deployed on Amazon EC2 and will use an Amazon RDS for Microsoft SQL Server database. The company's security team requires that database credentials are rotated at least weekly.\nHow should the developer configure the database credentials for this application?",
      "o": [
        "Create a database user. Store the user name and password in an AWS Systems Manager Parameter Store secure string parameter. Enable rotation of the AWS Key Management Service (AWS KMS) key that is used to encrypt the parameter.",
        "Enable IAM authentication for the database. Create a database user for use with IAM authentication. Enable password rotation.",
        "Create a database user. Store the user name and password in an AWS Secrets Manager secret that has daily rotation enabled.",
        "Use the EC2 user data to create a database user. Provide the user name and password in environment variables to the application."
      ],
      "ma": [
        2
      ],
      "e": "AWS Secrets Manager stores database credentials and supports automatic rotation on a schedule (including for RDS for SQL Server through a rotation Lambda function), so a secret with daily rotation satisfies the weekly requirement. Parameter Store has no built-in credential rotation and rotating the KMS key does not change the password (A), IAM database authentication is not supported for RDS for SQL Server (B), and putting credentials in user data or environment variables (D) is insecure and does not rotate. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 118
    },
    {
      "d": 0,
      "q": "A real-time messaging application uses Amazon API Gateway WebSocket APIs with backend HTTP service. A developer needs to build a feature in the application to identify a client that keeps connecting to and disconnecting from the WebSocket connection. The developer also needs the ability to remove the client.\nWhich combination of changes should the developer make to the application to meet these requirements? (Choose two.)",
      "o": [
        "Switch to HTTP APIs in the backend service.",
        "Switch to REST APIs in the backend service.",
        "Use the callback URL to disconnect the client from the backend service.",
        "Add code to track the client status in Amazon ElastiCache in the backend service.",
        "Implement $connect and $disconnect routes in the backend service."
      ],
      "ma": [
        2,
        4
      ],
      "e": "Implementing $connect and $disconnect routes in the backend lets the developer see each connection event and track how often a client connects and disconnects (E). The API Gateway Management API callback URL (using the connection ID with DELETE) lets the backend forcibly disconnect a misbehaving client (C). Switching to HTTP or REST APIs (A and B) does not apply to WebSocket APIs, and ElastiCache (D) is optional storage, not what is needed to detect events or remove the client. (The source PDF lists DE; corrected to CE after review.) Community vote: CE (57%), DE (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 119
    },
    {
      "d": 0,
      "q": "A developer has written code for an application and wants to share it with other developers on the team to receive feedback. The shared application code needs to be stored long-term with multiple versions and batch change tracking.\nWhich AWS service should the developer use?",
      "o": [
        "AWS CodeBuild",
        "Amazon S3",
        "AWS CodeCommit",
        "AWS Cloud9"
      ],
      "ma": [
        2
      ],
      "e": "AWS CodeCommit is a managed Git repository service that stores code long term with full version history, branching and tracking of changes in commits, and supports collaboration and feedback through pull requests. CodeBuild (A) builds and tests code, S3 (B) is object storage without Git-style change tracking, and Cloud9 (D) is a cloud IDE. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 120
    },
    {
      "d": 0,
      "q": "A company's developer is building a static website to be deployed in Amazon S3 for a production environment. The website integrates with an Amazon Aurora PostgreSQL database by using an AWS Lambda function. The website that is deployed to production will use a Lambda alias that points to a specific version of the Lambda function.\nThe company must rotate the database credentials every 2 weeks. Lambda functions that the company deployed previously must be able to use the most recent credentials.\nWhich solution will meet these requirements?",
      "o": [
        "Store the database credentials in AWS Secrets Manager. Turn on rotation. Write code in the Lambda function to retrieve the credentials from Secrets Manager.",
        "Include the database credentials as part of the Lambda function code. Update the credentials periodically and deploy the new Lambda function.",
        "Use Lambda environment variables. Update the environment variables when new credentials are available.",
        "Store the database credentials in AWS Systems Manager Parameter Store. Turn on rotation. Write code in the Lambda function to retrieve the credentials from Systems Manager Parameter Store."
      ],
      "ma": [
        0
      ],
      "e": "Secrets Manager supports built-in scheduled rotation, and the Lambda function retrieves the current secret at runtime, so every function version and alias, including previously deployed ones, always gets the most recent credentials. Hardcoding credentials in code (B) or environment variables (C) ties them to a specific version and requires redeployment, and Parameter Store (D) does not offer automatic rotation. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 121
    },
    {
      "d": 0,
      "q": "A developer is developing an application that uses signed requests (Signature Version 4) to call other AWS services. The developer has created a canonical request, has created the string to sign, and has calculated signing information.\nWhich methods could the developer use to complete a signed request? (Choose two.)",
      "o": [
        "Add the signature to an HTTP header that is named Authorization.",
        "Add the signature to a session cookie.",
        "Add the signature to an HTTP header that is named Authentication.",
        "Add the signature to a query string parameter that is named X-Amz-Signature.",
        "Add the signature to an HTTP header that is named WWW-Authenticate."
      ],
      "ma": [
        0,
        3
      ],
      "e": "With Signature Version 4, the computed signature can be added to the request either in the HTTP Authorization header (A) or as the X-Amz-Signature query string parameter for presigned-style requests (D). Authentication (C), WWW-Authenticate (E), and session cookies (B) are not valid places for a SigV4 signature. Community vote: AD (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 122
    },
    {
      "d": 0,
      "q": "A company must deploy all its Amazon RDS DB instances by using AWS CloudFormation templates as part of AWS CodePipeline continuous integration and continuous delivery (CI/CD) automation. The primary password for the DB instance must be automatically generated as part of the deployment process.\nWhich solution will meet these requirements with the LEAST development effort?",
      "o": [
        "Create an AWS Lambda-backed CloudFormation custom resource. Write Lambda code that generates a secure string. Return the value of the secure string as a data field of the custom resource response object. Use the CloudFormation Fn::GetAtt intrinsic function to get the value of the secure string. Use the value to create the DB instance.",
        "Use the AWS CodeBuild action of CodePipeline to generate a secure string by using the following AWS CLI command: aws secretsmanager get-random-password. Pass the generated secure string as a CloudFormation parameter with the NoEcho attribute set to true. Use the parameter reference to create the DB instance.",
        "Create an AWS Lambda-backed CloudFormation custom resource. Write Lambda code that generates a secure string. Return the value of the secure string as a data field of the custom resource response object. Use the CloudFormation Fn::GetAtt intrinsic function to get a value of the secure string. Create secrets in AWS Secrets Manager. Use the secretsmanager dynamic reference to use the value stored in the secret to create the DB instance.",
        "Use the AWS::SecretsManager::Secret resource to generate a secure string. Store the secure string as a secret in AWS Secrets Manager. Use the secretsmanager dynamic reference to use the value stored in the secret to create the DB instance."
      ],
      "ma": [
        3
      ],
      "e": "The AWS::SecretsManager::Secret resource can generate a random password through its GenerateSecretString property, and the DB instance resource can read it using a secretsmanager dynamic reference, so the whole flow is declarative in CloudFormation with no code. The Lambda-backed custom resources (A and C) require writing and maintaining code, and generating the password in CodeBuild and passing it as a parameter (B) adds a pipeline step and moves the secret through parameters. Community vote: D (83%), B (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 123
    },
    {
      "d": 0,
      "q": "An organization is storing large files in Amazon S3, and is writing a web application to display meta-data about the files to end-users. Based on the metadata a user selects an object to download. The organization needs a mechanism to index the files and provide single-digit millisecond latency retrieval for the metadata.\nWhat AWS service should be used to accomplish this?",
      "o": [
        "Amazon DynamoDB",
        "Amazon EC2",
        "AWS Lambda",
        "Amazon RDS"
      ],
      "ma": [
        0
      ],
      "e": "Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond latency, making it a good index for S3 object metadata (with attributes such as the object key) that a web application queries before download. EC2 (B) and Lambda (C) are compute services, and RDS (D) can store metadata but does not provide the same single-digit millisecond latency at scale as DynamoDB. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 124
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Serverless Application Model (AWS SAM) template. The AWS SAM template contains the definition of multiple AWS Lambda functions, an Amazon S3 bucket, and an Amazon CloudFront distribution. One of the Lambda functions runs on Lambda@Edge in the CloudFront distribution. The S3 bucket is configured as an origin for the CloudFront distribution.\nWhen the developer deploys the AWS SAM template in the eu-west-1 Region, the creation of the stack fails.\nWhich of the following could be the reason for this issue?",
      "o": [
        "CloudFront distributions can be created only in the us-east-1 Region.",
        "Lambda@Edge functions can be created only in the us-east-1 Region.",
        "A single AWS SAM template cannot contain multiple Lambda functions.",
        "The CloudFront distribution and the S3 bucket cannot be created in the same Region."
      ],
      "ma": [
        1
      ],
      "e": "Lambda@Edge functions must be created in the us-east-1 Region and are then replicated to edge locations, so a SAM stack in eu-west-1 that defines a Lambda@Edge function fails. CloudFront is a global service that can be managed from any Region (A), a template can contain multiple functions (C), and CloudFront and S3 origins in the same Region are fine (D). Community vote: B (88%), C (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 125
    },
    {
      "d": 0,
      "q": "A developer is integrating Amazon ElastiCache in an application. The cache will store data from a database. The cached data must populate real- time dashboards.\nWhich caching strategy will meet these requirements?",
      "o": [
        "A read-through cache",
        "A write-behind cache",
        "A lazy-loading cache",
        "A write-through cache"
      ],
      "ma": [
        3
      ],
      "e": "A write-through cache updates the cache every time the database is written, so cached data is always current, which is what real-time dashboards need. Lazy loading (C) and read-through (A) populate the cache on a miss and can serve stale data until the TTL expires, and write-behind (B) delays writes to the database and risks inconsistency. Community vote: D (86%), C (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 126
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Lambda function. The Lambda function needs an external library to connect to a third-party solution. The external library is a collection of files with a total size of 100 MB. The developer needs to make the external library available to the Lambda execution environment and reduce the Lambda package space.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Create a Lambda layer to store the external library. Configure the Lambda function to use the layer.",
        "Create an Amazon S3 bucket. Upload the external library into the S3 bucket. Mount the S3 bucket folder in the Lambda function. Import the library by using the proper folder in the mount point.",
        "Load the external library to the Lambda function's /tmp directory during deployment of the Lambda package. Import the library from the /tmp directory.",
        "Create an Amazon Elastic File System (Amazon EFS) volume. Upload the external library to the EFS volume. Mount the EFS volume in the Lambda function. Import the library by using the proper folder in the mount point."
      ],
      "ma": [
        0
      ],
      "e": "A Lambda layer holds shared libraries separately from the function code so the deployment package stays small, and a 100 MB library fits within the layer limit (250 MB unzipped total with the function). Lambda cannot directly mount S3 (B), loading files into /tmp at deployment is not possible because /tmp is empty at each new environment and would require download logic (C), and EFS (D) needs a VPC, mounts and more setup. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 127
    },
    {
      "d": 0,
      "q": "A company has a front-end application that runs on four Amazon EC2 instances behind an Elastic Load Balancer (ELB) in a production environment that is provisioned by AWS Elastic Beanstalk. A developer needs to deploy and test new application code while updating the Elastic Beanstalk platform from the current version to a newer version of Node.js. The solution must result in zero downtime for the application. Which solution meets these requirements?",
      "o": [
        "Clone the production environment to a different platform version. Deploy the new application code, and test it. Swap the environment URLs upon verification.",
        "Deploy the new application code in an all-at-once deployment to the existing EC2 instances. Test the code. Redeploy the previous code if verification fails.",
        "Perform an immutable update to deploy the new application code to new EC2 instances. Serve traffic to the new instances after they pass health checks.",
        "Use a rolling deployment for the new application code. Apply the code to a subset of EC2 instances until the tests pass. Redeploy the previous code if the tests fail."
      ],
      "ma": [
        0
      ],
      "e": "Cloning the production environment to a newer platform version creates a separate environment on the new Node.js platform that can be deployed to and tested without affecting users, and swapping the environment CNAMEs once verified switches traffic with zero downtime. Deploying in place (B, C, D) cannot change the platform version safely for production and all-at-once causes downtime, while the other in-place methods do not provide a separate test environment on the new platform. (The source PDF lists C; corrected to A after review.) Community vote: A (38%), C (38%), D (24%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 128
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Lambda function. The Lambda function will consume messages from an Amazon Simple Queue Service (Amazon SQS) queue. The developer wants to integrate unit testing as part of the function's continuous integration and continuous delivery (CI/CD) process.\nHow can the developer unit test the function?",
      "o": [
        "Create an AWS CloudFormation template that creates an SQS queue and deploys the Lambda function. Create a stack from the template during the CI/CD process. Invoke the deployed function. Verify the output.",
        "Create an SQS event for tests. Use a test that consumes messages from the SQS queue during the function's Cl/CD process.",
        "Create an SQS queue for tests. Use this SQS queue in the application's unit test. Run the unit tests during the CI/CD process.",
        "Use the aws lambda invoke command with a test event during the CIICD process."
      ],
      "ma": [
        3
      ],
      "e": "A unit test for a Lambda function should invoke it with a representative SQS-shaped test event, so running the function using aws lambda invoke with a test event in the CI/CD process validates the handler logic without relying on a live queue's behavior. Creating CloudFormation stacks (A) or actual SQS queues (B and C) makes tests slow, costly and closer to integration tests than unit tests. Community vote: D (60%), C (30%), B (10%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 129
    },
    {
      "d": 0,
      "q": "A developer is working on a web application that uses Amazon DynamoDB as its data store. The application has two DynamoDB tables: one table that is named artists and one table that is named songs. The artists table has artistName as the partition key. The songs table has songName as the partition key and artistName as the sort key.\nThe table usage patterns include the retrieval of multiple songs and artists in a single database operation from the webpage. The developer needs a way to retrieve this information with minimal network traffic and optimal application performance.\nWhich solution will meet these requirements?",
      "o": [
        "Perform a BatchGetltem operation that returns items from the two tables. Use the list of songName/artistName keys for the songs table and the list of artistName key for the artists table.",
        "Create a local secondary index (LSI) on the songs table that uses artistName as the partition key. Perform a query operation for each artistName on the songs table that filters by the list of songName. Perform a query operation for each artistName on the artists table.",
        "Perform a BatchGetitem operation on the songs table that uses the songName/artistName keys. Perform a BatchGetltem operation on the artists table that uses artistName as the key.",
        "Perform a Scan operation on each table that filters by the list of songName/artistName for the songs table and the list of artistName in the artists table."
      ],
      "ma": [
        0
      ],
      "e": "BatchGetItem can retrieve items from multiple tables in a single call by specifying the keys for each table (songName/artistName for songs, artistName for artists), minimizing network traffic. Two separate BatchGetItem calls (C) require more round trips, Query operations per artist (B) are many calls, and Scan (D) reads entire tables and is inefficient. Community vote: A (75%), C (12%), B (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 130
    },
    {
      "d": 0,
      "q": "A company is developing an ecommerce application that uses Amazon API Gateway APIs. The application uses AWS Lambda as a backend. The company needs to test the code in a dedicated, monitored test environment before the company releases the code to the production environment. Which solution will meet these requirements?",
      "o": [
        "Use a single stage in API Gateway. Create a Lambda function for each environment. Configure API clients to send a query parameter that indicates the environment and the specific Lambda function.",
        "Use multiple stages in API Gateway. Create a single Lambda function for all environments. Add different code blocks for different environments in the Lambda function based on Lambda environment variables.",
        "Use multiple stages in API Gateway. Create a Lambda function for each environment. Configure API Gateway stage variables to route traffic to the Lambda function in different environments.",
        "Use a single stage in API Gateway. Configure API clients to send a query parameter that indicates the environment. Add different code blocks for different environments in the Lambda function to match the value of the query parameter."
      ],
      "ma": [
        2
      ],
      "e": "Using multiple API Gateway stages (such as test and prod) with stage variables that point to different Lambda function aliases or functions gives each environment its own dedicated, separately monitored endpoint with the same API definition. Single-stage designs with query parameters (A and D) mix environments and cannot be monitored separately, and putting environment-specific code blocks in one function (B) mixes test and production code paths. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 131
    },
    {
      "d": 0,
      "q": "A developer creates an AWS Lambda function that retrieves and groups data from several public API endpoints. The Lambda function has been updated and configured to connect to the private subnet of a VPC. An internet gateway is attached to the VPC. The VPC uses the default network ACL and security group configurations.\nThe developer finds that the Lambda function can no longer access the public API. The developer has ensured that the public API is accessible, but the Lambda function cannot connect to the API How should the developer fix the connection issue?",
      "o": [
        "Ensure that the network ACL allows outbound traffic to the public internet.",
        "Ensure that the security group allows outbound traffic to the public internet.",
        "Ensure that outbound traffic from the private subnet is routed to a public NAT gateway.",
        "Ensure that outbound traffic from the private subnet is routed to a new internet gateway."
      ],
      "ma": [
        2
      ],
      "e": "A Lambda function attached to a VPC subnet does not receive a public IP, so even with an internet gateway in the VPC, a private subnet needs its route table to send 0.0.0.0/0 traffic to a NAT gateway located in a public subnet to reach the internet. The default network ACL and security group already allow all outbound traffic (A and B), and a second internet gateway (D) cannot be attached and would not help a function without a public IP. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 132
    },
    {
      "d": 0,
      "q": "A developer needs to store configuration variables for an application. The developer needs to set an expiration date and time for the configuration. The developer wants to receive notifications before the configuration expires.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Create a standard parameter in AWS Systems Manager Parameter Store. Set Expiration and ExpirationNotification policy types.",
        "Create a standard parameter in AWS Systems Manager Parameter Store. Create an AWS Lambda function to expire the configuration and to send Amazon Simple Notification Service (Amazon SNS) notifications.",
        "Create an advanced parameter in AWS Systems Manager Parameter Store. Set Expiration and ExpirationNotification policy types.",
        "Create an advanced parameter in AWS Systems Manager Parameter Store. Create an Amazon EC2 instance with a cron job to expire the configuration and to send notifications."
      ],
      "ma": [
        2
      ],
      "e": "Parameter Store advanced parameters support parameter policies, including Expiration to delete a parameter at a specified time and ExpirationNotification to send an EventBridge notification before it expires, so no custom code is needed. Standard parameters (A) do not support parameter policies, and building a Lambda function (B) or EC2 cron job (D) adds operational overhead. Community vote: C (67%), A (22%), B (11%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 133
    },
    {
      "d": 0,
      "q": "A company is developing a serverless application that consists of various AWS Lambda functions behind Amazon API Gateway APIs. A developer needs to automate the deployment of Lambda function code. The developer will deploy updated Lambda functions with AWS CodeDeploy. The deployment must minimize the exposure of potential errors to end users. When the application is in production, the application cannot experience downtime outside the specified maintenance window.\nWhich deployment configuration will meet these requirements with the LEAST deployment time?",
      "o": [
        "Use the AWS CodeDeploy in-place deployment configuration for the Lambda functions. Shift all traffic immediately after deployment.",
        "Use the AWS CodeDeploy linear deployment configuration to shift 10% of the traffic every minute.",
        "Use the AWS CodeDeploy all-at-once deployment configuration to shift all traffic to the updated versions immediately.",
        "Use the AWS CodeDeploy predefined canary deployment configuration to shift 10% of the traffic immediately and shift the remaining traffic after 5 minutes."
      ],
      "ma": [
        3
      ],
      "e": "A predefined canary configuration such as LambdaCanary10Percent5Minutes sends 10 percent of traffic to the new version first, limiting exposure of errors, and then shifts the rest after 5 minutes, which is faster than linear 10 percent every minute (10 minutes total) while avoiding downtime. In-place and all-at-once deployments (A and C) expose all users immediately, and in-place deployments are not a Lambda option anyway. Community vote: D (80%), A (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 134
    },
    {
      "d": 0,
      "q": "A company created four AWS Lambda functions that connect to a relational database server that runs on an Amazon RDS instance. A security team requires the company to automatically change the database password every 30 days.\nWhich solution will meet these requirements MOST securely?",
      "o": [
        "Store the database credentials in the environment variables of the Lambda function. Deploy the Lambda function with the new credentials every 30 days.",
        "Store the database credentials in AWS Secrets Manager. Configure a 30-day rotation schedule for the credentials.",
        "Store the database credentials in AWS Systems Manager Parameter Store secure strings. Configure a 30-day schedule for the secure strings.",
        "Store the database credentials in an Amazon S3 bucket that uses server-side encryption with customer-provided encryption keys (SSE-C). Configure a 30-day key rotation schedule for the customer key."
      ],
      "ma": [
        1
      ],
      "e": "AWS Secrets Manager stores credentials encrypted and supports automatic rotation on a configurable schedule (such as every 30 days) for RDS databases through a managed rotation Lambda function, while the Lambda functions retrieve the current secret at runtime. Environment variables (A) require redeployment, Parameter Store has no native rotation schedule (C), and S3 with SSE-C (D) is not a credentials-rotation solution and rotating the key does not change the database password. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 135
    },
    {
      "d": 0,
      "q": "A developer is setting up a deployment pipeline. The pipeline includes an AWS CodeBuild build stage that requires access to a database to run integration tests. The developer is using a buildspec.yml file to configure the database connection. Company policy requires automatic rotation of all database credentials.\nWhich solution will handle the database credentials MOST securely?",
      "o": [
        "Retrieve the credentials from variables that are hardcoded in the buildspec.yml file. Configure an AWS Lambda function to rotate the credentials.",
        "Retrieve the credentials from an environment variable that is linked to a SecureString parameter in AWS Systems Manager Parameter Store. Configure Parameter Store for automatic rotation.",
        "Retrieve the credentials from an environment variable that is linked to an AWS Secrets Manager secret. Configure Secrets Manager for automatic rotation.",
        "Retrieve the credentials from an environment variable that contains the connection string in plaintext. Configure an Amazon EventBridge event to rotate the credentials."
      ],
      "ma": [
        2
      ],
      "e": "CodeBuild can map an environment variable to an AWS Secrets Manager secret (secrets-manager type in the buildspec), so the build retrieves the current credentials at runtime while Secrets Manager rotates them automatically. Hardcoded or plaintext values (A and D) are insecure, and Parameter Store SecureString parameters (B) have no automatic rotation feature. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 136
    },
    {
      "d": 0,
      "q": "A company is developing a serverless multi-tier application on AWS. The company will build the serverless logic tier by using Amazon API Gateway and AWS Lambda.\nWhile the company builds the logic tier, a developer who works on the frontend of the application must develop integration tests. The tests must cover both positive and negative scenarios, depending on success and error HTTP status codes.\nWhich solution will meet these requirements with the LEAST effort?",
      "o": [
        "Set up a mock integration for API methods in API Gateway. In the integration request from Method Execution, add simple logic to return either a success or error based on HTTP status code. In the integration response, add messages that correspond to the HTTP status codes.",
        "Create two mock integration resources for API methods in API Gateway. In the integration request, return a success HTTP status code for one resource and an error HTTP status code for the other resource. In the integration response, add messages that correspond to the HTTP status codes.",
        "Create Lambda functions to perform tests. Add simple logic to return either success or error, based on the HTTP status codes. Build an API Gateway Lambda integration. Select appropriate Lambda functions that correspond to the HTTP status codes.",
        "Create a Lambda function to perform tests. Add simple logic to return either success or error-based HTTP status codes. Create a mock integration in API Gateway. Select the Lambda function that corresponds to the HTTP status codes."
      ],
      "ma": [
        0
      ],
      "e": "API Gateway mock integrations return a response directly from API Gateway without any backend, and the mapping template in the integration request can return a status code based on the request, with integration responses configured for each status code, so the frontend developer can test success and error paths with no Lambda code. Creating separate resources (B) or Lambda functions (C and D) is more work, and a mock integration cannot select a Lambda function (D). Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 137
    },
    {
      "d": 0,
      "q": "Users are reporting errors in an application. The application consists of several microservices that are deployed on Amazon Elastic Container Service (Amazon ECS) with AWS Fargate.\nWhich combination of steps should a developer take to fix the errors? (Choose two.)",
      "o": [
        "Deploy AWS X-Ray as a sidecar container to the microservices. Update the task role policy to allow access to the X-Ray API.",
        "Deploy AWS X-Ray as a daemonset to the Fargate cluster. Update the service role policy to allow access to the X-Ray API.",
        "Instrument the application by using the AWS X-Ray SDK. Update the application to use the PutXrayTrace API call to communicate with the X-Ray API.",
        "Instrument the application by using the AWS X-Ray SDK. Update the application to communicate with the X-Ray daemon.",
        "Instrument the ECS task to send the stdout and stderr output to Amazon CloudWatch Logs. Update the task role policy to allow the cloudwatch:PullLogs action."
      ],
      "ma": [
        0,
        3
      ],
      "e": "To trace errors across microservices on Fargate, run the X-Ray daemon as a sidecar container in each task and grant the task role permission to send segments to the X-Ray API (A); the application also needs to be instrumented with the X-Ray SDK so it sends trace data to the daemon (D). Daemonsets (B) are a Kubernetes concept and not applicable to ECS, there is no PutXrayTrace API (the API is PutTraceSegments) (C), and cloudwatch:PullLogs is not a real action (E). (The source PDF lists A; corrected to AD after review.) Community vote: A (40%), D (30%), C (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 138
    },
    {
      "d": 0,
      "q": "A developer is creating an application for a company. The application needs to read the file doc.txt that is placed in the root folder of an Amazon S3 bucket that is named DOC-EXAMPLE-BUCKET. The company\u2019s security team requires the principle of least privilege to be applied to the application\u2019s IAM policy.\nWhich IAM policy statement will meet these security requirements?",
      "o": [
        "",
        "",
        "",
        ""
      ],
      "ma": [
        0
      ],
      "e": "Least privilege means allowing only s3:GetObject on only the single object arn:aws:s3:::DOC-EXAMPLE-BUCKET/doc.txt, which is the statement in option A. Option C's bucket-wide /* resource allows reading every object, and options B and D allow s3:* actions, with B on all resources. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [
          {
            "path": "assets/q139-A1.png",
            "alt": "Question 139 option A"
          }
        ],
        [
          {
            "path": "assets/q139-B1.png",
            "alt": "Question 139 option B"
          }
        ],
        [
          {
            "path": "assets/q139-C1.png",
            "alt": "Question 139 option C"
          }
        ],
        [
          {
            "path": "assets/q139-D1.png",
            "alt": "Question 139 option D"
          }
        ]
      ],
      "sourceNumber": 139
    },
    {
      "d": 0,
      "q": "A company has an application that uses AWS CodePipeline to automate its continuous integration and continuous delivery (CI/CD) workflow. The application uses AWS CodeCommit for version control. A developer who was working on one of the tasks did not pull the most recent changes from the main branch. A week later, the developer noticed merge conflicts.\nHow can the developer resolve the merge conflicts in the developer's branch with the LEAST development effort?",
      "o": [
        "Clone the repository. Create a new branch. Update the branch with the changes.",
        "Create a new branch. Apply the changes from the previous branch.",
        "Use the Commit Visualizer view to compare the commits when a feature was added. Fix the merge conflicts.",
        "Stop the pull from the main branch to the feature branch. Rebase the feature branch from the main branch."
      ],
      "ma": [
        2
      ],
      "e": "The CodeCommit console lets the developer open the pull request or compare the branches (Commit Visualizer), see where the commits diverged, and resolve the merge conflicts directly, which is much less effort than re-cloning or creating new branches. Cloning and creating new branches (A and B) duplicates work, and stopping the pull and rebasing (D) is more complex and rewrites history. (The source PDF lists D; corrected to C after review.) Community vote: C (56%), D (44%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 140
    },
    {
      "d": 0,
      "q": "A developer wants to add request validation to a production environment Amazon API Gateway API. The developer needs to test the changes before the API is deployed to the production environment. For the test, the developer will send test requests to the API through a testing tool. Which solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Export the existing API to an OpenAPI file. Create a new API. Import the OpenAPI file. Modify the new API to add request validation. Perform the tests. Modify the existing API to add request validation. Deploy the existing API to production.",
        "Modify the existing API to add request validation. Deploy the updated API to a new API Gateway stage. Perform the tests. Deploy the updated API to the API Gateway production stage.",
        "Create a new API. Add the necessary resources and methods, including new request validation. Perform the tests. Modify the existing API to add request validation. Deploy the existing API to production",
        "Clone the existing API. Modify the new API to add request validation. Perform the tests. Modify the existing API to add request validation. Deploy the existing API to production."
      ],
      "ma": [
        1
      ],
      "e": "API Gateway lets you change the API definition and deploy it to a new stage, so the validation changes can be tested through that stage's invoke URL while the production stage keeps serving the old deployment. After testing, you deploy the same updated API to the production stage. Exporting, cloning or rebuilding the API (A, C, D) creates a second API and forces you to repeat the changes on the original, which adds operational work. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 141
    },
    {
      "d": 0,
      "q": "An online food company provides an Amazon API Gateway HTTP API to receive orders for partners. The API is integrated with an AWS Lambda function. The Lambda function stores the orders in an Amazon DynamoDB table.\nThe company expects to onboard additional partners. Some of the partners require additional Lambda functions to receive orders. The company has created an Amazon S3 bucket. The company needs to store all orders and updates in the S3 bucket for future analysis.\nHow can the developer ensure that all orders and updates are stored to Amazon S3 with the LEAST development effort?",
      "o": [
        "Create a new Lambda function and a new API Gateway API endpoint. Configure the new Lambda function to write to the S3 bucket. Modify the original Lambda function to post updates to the new API endpoint.",
        "Use Amazon Kinesis Data Streams to create a new data stream. Modify the Lambda function to publish orders to the data stream. Configure the data stream to write to the S3 bucket.",
        "Enable DynamoDB Streams on the DynamoDB table. Create a new Lambda function. Associate the stream\u2019s Amazon Resource Name (ARN) with the Lambda function. Configure the Lambda function to write to the S3 bucket as records appear in the table's stream.",
        "Modify the Lambda function to publish to a new Amazon Simple Notification Service (Amazon SNS) topic as the Lambda function receives orders. Subscribe a new Lambda function to the topic. Configure the new Lambda function to write to the S3 bucket as updates come through the topic."
      ],
      "ma": [
        2
      ],
      "e": "Enabling DynamoDB Streams on the table captures every insert and update regardless of which Lambda function wrote it, so partners' additional functions are covered with no code changes. A new Lambda function with the stream as an event source mapping then writes the records to S3. Options A, B and D require modifying every order-receiving function and adding new endpoints, streams or topics that each future function must also publish to. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 142
    },
    {
      "d": 0,
      "q": "A company\u2019s website runs on an Amazon EC2 instance and uses Auto Scaling to scale the environment during peak times. Website users across the world are experiencing high latency due to static content on the EC2 instance, even during non-peak hours.\nWhich combination of steps will resolve the latency issue? (Choose two.)",
      "o": [
        "Double the Auto Scaling group\u2019s maximum number of servers.",
        "Host the application code on AWS Lambda.",
        "Scale vertically by resizing the EC2 instances.",
        "Create an Amazon CloudFront distribution to cache the static content.",
        "Store the application\u2019s static content in Amazon S3."
      ],
      "ma": [
        3,
        4
      ],
      "e": "Storing the static content in Amazon S3 removes it from the EC2 instances, and a CloudFront distribution in front of it caches that content at edge locations close to users worldwide, which fixes the global latency even in non-peak hours. Adding more servers, resizing instances or moving the code to Lambda does not reduce the network distance between users and the static content. Community vote: DE (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 143
    },
    {
      "d": 0,
      "q": "A company has an Amazon S3 bucket containing premier content that it intends to make available to only paid subscribers of its website. The S3 bucket currently has default permissions of all objects being private to prevent inadvertent exposure of the premier content to non-paying website visitors.\nHow can the company limit the ability to download a premier content file in the S3 bucket to paid subscribers only?",
      "o": [
        "Apply a bucket policy that allows anonymous users to download the content from the S3 bucket.",
        "Generate a pre-signed object URL for the premier content file when a paid subscriber requests a download.",
        "Add a bucket policy that requires multi-factor authentication for requests to access the S3 bucket objects.",
        "Enable server-side encryption on the S3 bucket for data protection against the non-paying website visitors."
      ],
      "ma": [
        1
      ],
      "e": "A pre-signed URL grants time-limited access to a specific private object using the permissions of the signer, so the application can generate one only after verifying that the requester is a paid subscriber. An anonymous-access bucket policy exposes the content to everyone, an MFA bucket policy applies to IAM principals and not website visitors, and server-side encryption protects data at rest but does not control who can download it. Community vote: B (75%), C (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 144
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Lambda function that searches for items from an Amazon DynamoDB table that contains customer contact information. The DynamoDB table items have the customer\u2019s email_address as the partition key and additional properties such as customer_type, name and job_title.\nThe Lambda function runs whenever a user types a new character into the customer_type text input. The developer wants the search to return partial matches of all the email_address property of a particular customer_type. The developer does not want to recreate the DynamoDB table. What should the developer do to meet these requirements?",
      "o": [
        "Add a global secondary index (GSI) to the DynamoDB table with customer_type as the partition key and email_address as the sort key. Perform a query operation on the GSI by using the begins_with key condition expression with the email_address property.",
        "Add a global secondary index (GSI) to the DynamoDB table with email_address as the partition key and customer_type as the sort key. Perform a query operation on the GSI by using the begins_with key condition expression with the email_address property.",
        "Add a local secondary index (LSI) to the DynamoDB table with customer_type as the partition key and email_address as the sort key. Perform a query operation on the LSI by using the begins_with key condition expression with the email_address property.",
        "Add a local secondary index (LSI) to the DynamoDB table with job_title as the partition key and email_address as the sort key. Perform a query operation on the LSI by using the begins_with key condition expression with the email_address property."
      ],
      "ma": [
        0
      ],
      "e": "A global secondary index can be added to an existing table, so a GSI with customer_type as the partition key and email_address as the sort key lets you Query for a customer_type and use begins_with on email_address for partial matches. A GSI with email_address as partition key cannot do prefix matching because partition keys need equality. LSIs must be defined at table creation and must share the table's partition key, so C and D would require recreating the table. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 145
    },
    {
      "d": 0,
      "q": "A developer is building an application that uses AWS API Gateway APIs, AWS Lambda functions, and AWS DynamoDB tables. The developer uses the AWS Serverless Application Model (AWS SAM) to build and run serverless applications on AWS. Each time the developer pushes changes for only to the Lambda functions, all the artifacts in the application are rebuilt.\nThe developer wants to implement AWS SAM Accelerate by running a command to only redeploy the Lambda functions that have changed. Which command will meet these requirements?",
      "o": [
        "sam deploy --force-upload",
        "sam deploy --no-execute-changeset",
        "sam package",
        "sam sync --watch"
      ],
      "ma": [
        3
      ],
      "e": "AWS SAM Accelerate is exposed through sam sync, and the --watch option monitors the project and automatically syncs code changes, updating only the changed Lambda function code directly through service APIs instead of a full CloudFormation deployment. sam deploy variants and sam package still go through the full build, package and changeset flow. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 146
    },
    {
      "d": 0,
      "q": "A developer is building an application that gives users the ability to view bank accounts from multiple sources in a single dashboard. The developer has automated the process to retrieve API credentials for these sources. The process invokes an AWS Lambda function that is associated with an AWS CloudFormation custom resource.\nThe developer wants a solution that will store the API credentials with minimal operational overhead.\nWhich solution will meet these requirements in the MOST secure way?",
      "o": [
        "Add an AWS Secrets Manager GenerateSecretString resource to the CloudFormation template. Set the value to reference new credentials for the CloudFormation resource.",
        "Use the AWS SDK ssm:PutParameter operation in the Lambda function from the existing custom resource to store the credentials as a parameter. Set the parameter value to reference the new credentials. Set the parameter type to SecureString.",
        "Add an AWS Systems Manager Parameter Store resource to the CloudFormation template. Set the CloudFormation resource value to reference the new credentials. Set the resource NoEcho attribute to true.",
        "Use the AWS SDK ssm:PutParameter operation in the Lambda function from the existing custom resource to store the credentials as a parameter. Set the parameter value to reference the new credentials. Set the parameter NoEcho attribute to true."
      ],
      "ma": [
        1
      ],
      "e": "Calling ssm:PutParameter from the existing custom resource Lambda function and setting the parameter type to SecureString stores the credentials encrypted with KMS and needs no new infrastructure. NoEcho is a CloudFormation template parameter and resource-output attribute, not a Parameter Store feature, so C and D are invalid. Option A generates a random secret instead of storing the retrieved API credentials. Community vote: B (64%), D (21%), Other (15%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 147
    },
    {
      "d": 0,
      "q": "A developer is trying to get data from an Amazon DynamoDB table called demoman-table. The developer configured the AWS CLI to use a specific IAM user\u2019s credentials and ran the following command:\naws dynamodb get-item --table-name demoman-table --key '{\"id\": {\"N\":\"1993\"}}' The command returned errors and no rows were returned.\nWhat is the MOST likely cause of these issues?",
      "o": [
        "The command is incorrect; it should be rewritten to use put-item with a string argument.",
        "The developer needs to log a ticket with AWS Support to enable access to the demoman-table.",
        "Amazon DynamoDB cannot be accessed from the AWS CLI and needs to be called via the REST API.",
        "The IAM user needs an associated policy with read access to demoman-table."
      ],
      "ma": [
        3
      ],
      "e": "The command syntax for get-item is valid and DynamoDB is fully accessible through the AWS CLI, so the errors point to an authorization failure. The IAM user whose credentials the CLI uses needs a policy that allows dynamodb:GetItem on the demoman-table. put-item is a write operation, and enabling access is done through IAM, not by opening an AWS Support ticket. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 148
    },
    {
      "d": 0,
      "q": "An organization is using Amazon CloudFront to ensure that its users experience low-latency access to its web application. The organization has identified a need to encrypt all traffic between users and CloudFront, and all traffic between CloudFront and the web application.\nHow can these requirements be met? (Choose two.)",
      "o": [
        "Use AWS KMS to encrypt traffic between CloudFront and the web application.",
        "Set the Origin Protocol Policy to \u201cHTTPS Only\u201d.",
        "Set the Origin\u2019s HTTP Port to 443.",
        "Set the Viewer Protocol Policy to \u201cHTTPS Only\u201d or \u201cRedirect HTTP to HTTPS\u201d.",
        "Enable the CloudFront option Restrict Viewer Access."
      ],
      "ma": [
        1,
        3
      ],
      "e": "Encrypting the viewer-to-CloudFront leg requires the Viewer Protocol Policy to be HTTPS Only or Redirect HTTP to HTTPS, and encrypting the CloudFront-to-origin leg requires the Origin Protocol Policy to be HTTPS Only. KMS does not encrypt traffic in transit, changing the origin HTTP port to 443 does not make CloudFront use TLS, and Restrict Viewer Access controls who can view content through signed URLs or cookies, not encryption. Community vote: BD (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 149
    },
    {
      "d": 0,
      "q": "A developer is planning to migrate on-premises company data to Amazon S3. The data must be encrypted, and the encryption keys must support automatic annual rotation. The company must use AWS Key Management Service (AWS KMS) to encrypt the data.\nWhich type of keys should the developer use to meet these requirements?",
      "o": [
        "Amazon S3 managed keys",
        "Symmetric customer managed keys with key material that is generated by AWS",
        "Asymmetric customer managed keys with key material that is generated by AWS",
        "Symmetric customer managed keys with imported key material"
      ],
      "ma": [
        1
      ],
      "e": "Symmetric customer managed KMS keys whose key material is generated by AWS support automatic annual rotation that you can enable. S3 managed keys are not KMS keys, asymmetric KMS keys do not support automatic rotation, and keys with imported key material do not support automatic rotation, so you would have to rotate them manually. Community vote: B (70%), A (30%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 150
    },
    {
      "d": 0,
      "q": "A team of developers is using an AWS CodePipeline pipeline as a continuous integration and continuous delivery (CI/CD) mechanism for a web application. A developer has written unit tests to programmatically test the functionality of the application code. The unit tests produce a test report that shows the results of each individual check. The developer now wants to run these tests automatically during the CI/CD process. Which solution will meet this requirement with the LEAST operational effort?",
      "o": [
        "Write a Git pre-commit hook that runs the tests before every commit. Ensure that each developer who is working on the project has the pre- commit hook installed locally. Review the test report and resolve any issues before pushing changes to AWS CodeCommit.",
        "Add a new stage to the pipeline. Use AWS CodeBuild as the provider. Add the new stage after the stage that deploys code revisions to the test environment. Write a buildspec that fails the CodeBuild stage if any test does not pass. Use the test reports feature of CodeBuild to integrate the report with the CodeBuild console. View the test results in CodeBuild. Resolve any issues.",
        "Add a new stage to the pipeline. Use AWS CodeBuild as the provider. Add the new stage before the stage that deploys code revisions to the test environment. Write a buildspec that fails the CodeBuild stage if any test does not pass. Use the test reports feature of CodeBuild to integrate the report with the CodeBuild console. View the test results in CodeBuild. Resolve any issues.",
        "Add a new stage to the pipeline. Use Jenkins as the provider. Configure CodePipeline to use Jenkins to run the unit tests. Write a Jenkinsfile that fails the stage if any test does not pass. Use the test report plugin for Jenkins to integrate the report with the Jenkins dashboard. View the test results in Jenkins. Resolve any issues."
      ],
      "ma": [
        2
      ],
      "e": "Adding a CodeBuild stage whose buildspec runs the unit tests and fails on any test failure, with the CodeBuild test reports feature publishing the results, is fully managed and needs little effort. Placing the stage before the deploy-to-test stage ensures that code that fails the tests is never deployed. A local pre-commit hook relies on every developer, a stage after deployment tests too late, and Jenkins requires running and maintaining a Jenkins server. Community vote: C (80%), B (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 151
    },
    {
      "d": 0,
      "q": "A company has multiple Amazon VPC endpoints in the same VPC. A developer needs to configure an Amazon S3 bucket policy so users can access an S3 bucket only by using these VPC endpoints.\nWhich solution will meet these requirements?",
      "o": [
        "Create multiple S3 bucket polices by using each VPC endpoint ID that have the aws:SourceVpce value in the StringNotEquals condition.",
        "Create a single S3 bucket policy that has the aws:SourceVpc value and in the StringNotEquals condition to use VPC ID.",
        "Create a single S3 bucket policy that has the aws:SourceVpce value and in the StringNotEquals condition to use vpce*.",
        "Create a single S3 bucket policy that has multiple aws:sourceVpce value in the StringNotEquals condition. Repeat for all the VPC endpoint IDs."
      ],
      "ma": [
        3
      ],
      "e": "A single bucket policy with a Deny statement that uses a StringNotEquals condition on aws:SourceVpce, listing every approved VPC endpoint ID, blocks all access that does not come through one of those endpoints. A bucket has one policy, so multiple policies cannot be created. aws:SourceVpc with a VPC ID would allow any endpoint in the VPC, and StringNotEquals does not support wildcards like vpce*. Community vote: D (80%), B (10%) C (10%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 152
    },
    {
      "d": 0,
      "q": "A company uses a custom root certificate authority certificate chain (Root CA Cert) that is 10 KB in size to generate SSL certificates for its on- premises HTTPS endpoints. One of the company\u2019s cloud-based applications has hundreds of AWS Lambda functions that pull data from these endpoints. A developer updated the trust store of the Lambda execution environment to use the Root CA Cert when the Lambda execution environment is initialized. The developer bundled the Root CA Cert as a text file in the Lambda deployment bundle.\nAfter 3 months of development, the Root CA Cert is no longer valid and must be updated. The developer needs a more efficient solution to update the Root CA Cert for all deployed Lambda functions. The solution must not include rebuilding or updating all Lambda functions that use the Root CA Cert. The solution must also work for all development, testing, and production environments. Each environment is managed in a separate AWS account.\nWhich combination of steps should the developer take to meet these requirements MOST cost-effectively? (Choose two.)",
      "o": [
        "Store the Root CA Cert as a secret in AWS Secrets Manager. Create a resource-based policy. Add IAM users to allow access to the secret.",
        "Store the Root CA Cert as a SecureString parameter in AWS Systems Manager Parameter Store. Create a resource-based policy. Add IAM users to allow access to the policy.",
        "Store the Root CA Cert in an Amazon S3 bucket. Create a resource-based policy to allow access to the bucket.",
        "Refactor the Lambda code to load the Root CA Cert from the Root CA Cert\u2019s location. Modify the runtime trust store inside the Lambda function handler.",
        "Refactor the Lambda code to load the Root CA Cert from the Root CA Cert\u2019s location. Modify the runtime trust store outside the Lambda function handler."
      ],
      "ma": [
        0,
        4
      ],
      "e": "Storing the Root CA Cert as a secret in Secrets Manager, shareable across accounts through a resource-based policy, gives one central place to update the certificate without rebuilding any function. Loading the certificate and modifying the trust store outside the handler means it runs once per execution environment initialization instead of on every invocation, which is more efficient and cheaper. Doing it inside the handler repeats the retrieval on every call, and the Parameter Store and S3 options do not fit as well, since standard parameters cannot hold a 10 KB value and parameters do not take resource-based policies. Community vote: AE (37%), CE (26%), BE (21%), Other (16%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 153
    },
    {
      "d": 0,
      "q": "A developer maintains applications that store several secrets in AWS Secrets Manager. The applications use secrets that have changed over time. The developer needs to identify required secrets that are still in use. The developer does not want to cause any application downtime. What should the developer do to meet these requirements?",
      "o": [
        "Configure an AWS CloudTrail log file delivery to an Amazon S3 bucket. Create an Amazon CloudWatch alarm for the GetSecretValue Secrets Manager API operation requests.",
        "Create a secretsmanager-secret-unused AWS Config managed rule. Create an Amazon EventBridge rule to initiate notifications when the AWS Config managed rule is met.",
        "Deactivate the applications secrets and monitor the applications error logs temporarily.",
        "Configure AWS X-Ray for the applications. Create a sampling rule to match the GetSecretValue Secrets Manager API operation requests."
      ],
      "ma": [
        1
      ],
      "e": "The AWS Config managed rule secretsmanager-secret-unused flags secrets that have not been accessed within a set number of days, and an EventBridge rule can notify the developer, all without touching the applications. Deactivating secrets risks downtime, X-Ray sampling rules do not filter on Secrets Manager API calls in this way, and CloudWatch alarms on CloudTrail GetSecretValue requests do not identify which secrets are unused. Community vote: B (60%), A (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 154
    },
    {
      "d": 0,
      "q": "A developer is writing a serverless application that requires an AWS Lambda function to be invoked every 10 minutes.\nWhat is an automated and serverless way to invoke the function?",
      "o": [
        "Deploy an Amazon EC2 instance based on Linux, and edit its /etc/crontab file by adding a command to periodically invoke the Lambda function.",
        "Configure an environment variable named PERIOD for the Lambda function. Set the value to 600.",
        "Create an Amazon EventBridge rule that runs on a regular schedule to invoke the Lambda function.",
        "Create an Amazon Simple Notification Service (Amazon SNS) topic that has a subscription to the Lambda function with a 600-second timer."
      ],
      "ma": [
        2
      ],
      "e": "An Amazon EventBridge scheduled rule with a rate(10 minutes) expression invokes the Lambda function on a schedule with no servers to manage. An EC2 cron job is not serverless, a Lambda environment variable is just a value and triggers nothing, and SNS subscriptions have no timer feature. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 155
    },
    {
      "d": 0,
      "q": "A company is using Amazon OpenSearch Service to implement an audit monitoring system. A developer needs to create an AWS CloudFormation custom resource that is associated with an AWS Lambda function to configure the OpenSearch Service domain. The Lambda function must access the OpenSearch Service domain by using OpenSearch Service internal master user credentials.\nWhat is the MOST secure way to pass these credentials to the Lambda function?",
      "o": [
        "Use a CloudFormation parameter to pass the master user credentials at deployment to the OpenSearch Service domain\u2019s MasterUserOptions and the Lambda function\u2019s environment variable. Set the NoEcho attribute to true.",
        "Use a CloudFormation parameter to pass the master user credentials at deployment to the OpenSearch Service domain\u2019s MasterUserOptions and to create a parameter in AWS Systems Manager Parameter Store. Set the NoEcho attribute to true. Create an IAM role that has the ssm:GetParameter permission. Assign the role to the Lambda function. Store the parameter name as the Lambda function\u2019s environment variable. Resolve the parameter\u2019s value at runtime.",
        "Use a CloudFormation parameter to pass the master user credentials at deployment to the OpenSearch Service domain\u2019s MasterUserOptions and the Lambda function\u2019s environment variable. Encrypt the parameter\u2019s value by using the AWS Key Management Service (AWS KMS) encrypt command.",
        "Use CloudFormation to create an AWS Secrets Manager secret. Use a CloudFormation dynamic reference to retrieve the secret\u2019s value for the OpenSearch Service domain\u2019s MasterUserOptions. Create an IAM role that has the secretsmanager:GetSecretValue permission. Assign the role to the Lambda function. Store the secret\u2019s name as the Lambda function\u2019s environment variable. Resolve the secret\u2019s value at runtime."
      ],
      "ma": [
        3
      ],
      "e": "Creating the secret in Secrets Manager and referencing it with a CloudFormation dynamic reference means the password is never exposed in the template, parameters or console. The Lambda function then gets secretsmanager:GetSecretValue through its role and resolves the secret at runtime using only the secret name from its environment variable. The other options place the plaintext credentials in CloudFormation parameters or Lambda environment variables. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 156
    },
    {
      "d": 0,
      "q": "An application runs on multiple EC2 instances behind an ELB.\nWhere is the session data best written so that it can be served reliably across multiple requests?",
      "o": [
        "Write data to Amazon ElastiCache.",
        "Write data to Amazon Elastic Block Store.",
        "Write data to Amazon EC2 Instance Store.",
        "Write data to the root filesystem."
      ],
      "ma": [
        0
      ],
      "e": "Session data must be stored outside the individual instances so that any instance behind the load balancer can serve a user's next request, and ElastiCache provides a fast shared in-memory store for that. EBS volumes attach to a single instance, and instance store and the root filesystem are local and lost when the instance stops or is replaced by Auto Scaling. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 157
    },
    {
      "d": 0,
      "q": "An ecommerce application is running behind an Application Load Balancer. A developer observes some unexpected load on the application during non-peak hours. The developer wants to analyze patterns for the client IP addresses that use the application.\nWhich HTTP header should the developer use for this analysis?",
      "o": [
        "The X-Forwarded-Proto header",
        "The X-Forwarded-Host header",
        "The X-Forwarded-For header",
        "The X-Forwarded-Port header"
      ],
      "ma": [
        2
      ],
      "e": "An Application Load Balancer terminates the client connection, so the target sees the load balancer's IP, and the ALB adds the original client IP address to the X-Forwarded-For header. X-Forwarded-Proto carries the protocol, X-Forwarded-Port the port, and X-Forwarded-Host the host the client requested, none of which identify the client. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 158
    },
    {
      "d": 0,
      "q": "A developer migrated a legacy application to an AWS Lambda function. The function uses a third-party service to pull data with a series of API calls at the end of each month. The function then processes the data to generate the monthly reports. The function has been working with no issues so far.\nThe third-party service recently issued a restriction to allow a fixed number of API calls each minute and each day. If the API calls exceed the limit for each minute or each day, then the service will produce errors. The API also provides the minute limit and daily limit in the response header. This restriction might extend the overall process to multiple days because the process is consuming more API calls than the available limit. What is the MOST operationally efficient way to refactor the serverless application to accommodate this change?",
      "o": [
        "Use an AWS Step Functions state machine to monitor API failures. Use the Wait state to delay calling the Lambda function.",
        "Use an Amazon Simple Queue Service (Amazon SQS) queue to hold the API calls. Configure the Lambda function to poll the queue within the API threshold limits.",
        "Use an Amazon CloudWatch Logs metric to count the number of API calls. Configure an Amazon CloudWatch alarm that stops the currently running instance of the Lambda function when the metric exceeds the API threshold limits.",
        "Use Amazon Kinesis Data Firehose to batch the API calls and deliver them to an Amazon S3 bucket with an event notification to invoke the Lambda function."
      ],
      "ma": [
        0
      ],
      "e": "A Step Functions state machine can orchestrate the long-running monthly process, handle the API throttling errors, and use Wait states to pause for the time indicated in the rate-limit response headers before continuing, with state kept across days. SQS polling by Lambda cannot be tuned to a per-minute and per-day quota that easily, a CloudWatch alarm that stops Lambda loses work, and Firehose batching to S3 does not control the API call rate. Community vote: A (53%), B (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 159
    },
    {
      "d": 0,
      "q": "A developer must analyze performance issues with production-distributed applications written as AWS Lambda functions. These distributed Lambda applications invoke other components that make up the applications.\nHow should the developer identify and troubleshoot the root cause of the performance issues in production?",
      "o": [
        "Add logging statements to the Lambda functions, then use Amazon CloudWatch to view the logs.",
        "Use AWS CloudTrail and then examine the logs.",
        "Use AWS X-Ray, then examine the segments and errors.",
        "Run Amazon Inspector agents and then analyze performance."
      ],
      "ma": [
        2
      ],
      "e": "AWS X-Ray traces requests as they flow through Lambda functions and the downstream services they call, producing a service map with segments and subsegments that show latency and errors per component, so it pinpoints the root cause of performance problems in distributed applications. CloudWatch logs lack end-to-end correlation, CloudTrail records API activity for auditing, and Inspector assesses security vulnerabilities. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 160
    },
    {
      "d": 0,
      "q": "A developer wants to deploy a new version of an AWS Elastic Beanstalk application. During deployment, the application must maintain full capacity and avoid service interruption. Additionally, the developer must minimize the cost of additional resources that support the deployment. Which deployment method should the developer use to meet these requirements?",
      "o": [
        "All at once",
        "Rolling with additional batch",
        "Blue/green",
        "Immutable"
      ],
      "ma": [
        1
      ],
      "e": "Rolling with additional batch launches an extra batch of instances first and then updates the existing ones in batches, so full capacity is kept throughout and only one extra batch is paid for. All at once causes downtime, while immutable and blue/green keep full capacity but launch an entire second set of instances, which costs more. Community vote: B (40%), D (40%), C (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 161
    },
    {
      "d": 0,
      "q": "A developer has observed an increase in bugs in the AWS Lambda functions that a development team has deployed in its Node.js application. To minimize these bugs, the developer wants to implement automated testing of Lambda functions in an environment that closely simulates the Lambda environment.\nThe developer needs to give other developers the ability to run the tests locally. The developer also needs to integrate the tests into the team\u2019s continuous integration and continuous delivery (CI/CD) pipeline before the AWS Cloud Development Kit (AWS CDK) deployment.\nWhich solution will meet these requirements?",
      "o": [
        "Create sample events based on the Lambda documentation. Create automated test scripts that use the cdk local invoke command to invoke the Lambda functions. Check the response. Document the test scripts for the other developers on the team. Update the CI/CD pipeline to run the test scripts.",
        "Install a unit testing framework that reproduces the Lambda execution environment. Create sample events based on the Lambda documentation. Invoke the handler function by using a unit testing framework. Check the response. Document how to run the unit testing framework for the other developers on the team. Update the CI/CD pipeline to run the unit testing framework.",
        "Install the AWS Serverless Application Model (AWS SAM) CLI tool. Use the sam local generate-event command to generate sample events for the automated tests. Create automated test scripts that use the sam local invoke command to invoke the Lambda functions. Check the response. Document the test scripts for the other developers on the team. Update the CI/CD pipeline to run the test scripts.",
        "Create sample events based on the Lambda documentation. Create a Docker container from the Node.js base image to invoke the Lambda functions. Check the response. Document how to run the Docker container for the other developers on the team. Update the CI/CD pipeline to run the Docker container."
      ],
      "ma": [
        2
      ],
      "e": "The AWS SAM CLI runs Lambda functions locally in a container that emulates the Lambda environment: sam local generate-event produces sample events and sam local invoke runs the function against them, so developers can run the tests locally and the same scripts can run in the CI/CD pipeline before the CDK deployment. There is no cdk local invoke command, and a generic unit test framework or custom Node.js Docker container does not reproduce the Lambda environment as closely. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 162
    },
    {
      "d": 0,
      "q": "A developer is troubleshooting an application that uses Amazon DynamoDB in the us-west-2 Region. The application is deployed to an Amazon EC2 instance. The application requires read-only permissions to a table that is named Cars. The EC2 instance has an attached IAM role that contains the following IAM policy:\nWhen the application tries to read from the Cars table, an Access Denied error occurs.\nHow can the developer resolve this error?",
      "o": [
        "Modify the IAM policy resource to be \u201carn:aws:dynamodb:us-west-2:account-id:table/*\u201d.",
        "Modify the IAM policy to include the dynamodb:* action.",
        "Create a trust policy that specifies the EC2 service principal. Associate the role with the policy.",
        "Create a trust relationship between the role and dynamodb.amazonaws.com."
      ],
      "ma": [
        2
      ],
      "e": "The permissions policy already allows read actions on the Cars table in us-west-2, so the Access Denied error means the EC2 instance cannot assume the role. The role needs a trust policy naming the EC2 service principal (ec2.amazonaws.com) so that the instance profile can supply the role credentials. Widening the resource or adding dynamodb:* does not fix an assume-role problem, and the trust relationship should be with EC2, not dynamodb.amazonaws.com. Community vote: C (67%), A (17%), D (17%).",
      "images": [
        {
          "path": "assets/q163-s1.png",
          "alt": "Question 163 diagram"
        }
      ],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 163
    },
    {
      "d": 0,
      "q": "When using the AWS Encryption SDK, how does the developer keep track of the data encryption keys used to encrypt data?",
      "o": [
        "The developer must manually keep track of the data encryption keys used for each data object.",
        "The SDK encrypts the data encryption key and stores it (encrypted) as part of the returned ciphertext.",
        "The SDK stores the data encryption keys automatically in Amazon S3.",
        "The data encryption key is stored in the Userdata for the EC2 instance."
      ],
      "ma": [
        1
      ],
      "e": "The AWS Encryption SDK uses envelope encryption and stores the encrypted data key in the encryption message it returns together with the ciphertext, so it can later decrypt the data key through the master key provider, such as KMS, without the developer tracking anything. It does not store the keys in S3 or EC2 user data, and manual tracking is unnecessary. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 164
    },
    {
      "d": 0,
      "q": "An application that runs on AWS Lambda requires access to specific highly confidential objects in an Amazon S3 bucket. In accordance with the principle of least privilege, a company grants access to the S3 bucket by using only temporary credentials.\nHow can a developer configure access to the S3 bucket in the MOST secure way?",
      "o": [
        "Hardcode the credentials that are required to access the S3 objects in the application code. Use the credentials to access the required S3 objects.",
        "Create a secret access key and access key ID with permission to access the S3 bucket. Store the key and key ID in AWS Secrets Manager. Configure the application to retrieve the Secrets Manager secret and use the credentials to access the S3 objects.",
        "Create a Lambda function execution role. Attach a policy to the role that grants access to specific objects in the S3 bucket.",
        "Create a secret access key and access key ID with permission to access the S3 bucket. Store the key and key ID as environment variables in Lambda. Use the environment variables to access the required S3 objects."
      ],
      "ma": [
        2
      ],
      "e": "A Lambda execution role is assumed by the function and supplies temporary credentials that rotate automatically, and a policy scoped to the specific S3 objects satisfies least privilege. Hardcoded keys, keys in Secrets Manager and keys in environment variables are all long-term credentials that must be managed and can leak. Community vote: C (80%), B (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 165
    },
    {
      "d": 0,
      "q": "A developer has code that is stored in an Amazon S3 bucket. The code must be deployed as an AWS Lambda function across multiple accounts in the same AWS Region as the S3 bucket. An AWS CloudFormation template that runs for each account will deploy the Lambda function. What is the MOST secure way to allow CloudFormation to access the Lambda code in the S3 bucket?",
      "o": [
        "Grant the CloudFormation service role the S3 ListBucket and GetObject permissions. Add a bucket policy to Amazon S3 with the principal of \u201cAWS\u201d: [account numbers].",
        "Grant the CloudFormation service role the S3 GetObject permission. Add a bucket policy to Amazon S3 with the principal of \u201c*\u201d.",
        "Use a service-based link to grant the Lambda function the S3 ListBucket and GetObject permissions by explicitly adding the S3 bucket\u2019s account number in the resource.",
        "Use a service-based link to grant the Lambda function the S3 GetObject permission. Add a resource of \u201c*\u201d to allow access to the S3 bucket."
      ],
      "ma": [
        0
      ],
      "e": "Granting the CloudFormation service role in each account s3:GetObject and s3:ListBucket, and adding a bucket policy that trusts only the specific account numbers as principals, gives cross-account access limited to the intended accounts. A principal of \"*\" opens the bucket to everyone, and Lambda service-linked roles are not how CloudFormation retrieves the code during stack creation. Community vote: A (80%), B (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 166
    },
    {
      "d": 0,
      "q": "A developer at a company needs to create a small application that makes the same API call once each day at a designated time. The company does not have infrastructure in the AWS Cloud yet, but the company wants to implement this functionality on AWS.\nWhich solution meets these requirements in the MOST operationally efficient manner?",
      "o": [
        "Use a Kubernetes cron job that runs on Amazon Elastic Kubernetes Service (Amazon EKS).",
        "Use an Amazon Linux crontab scheduled job that runs on Amazon EC2.",
        "Use an AWS Lambda function that is invoked by an Amazon EventBridge scheduled event.",
        "Use an AWS Batch job that is submitted to an AWS Batch job queue."
      ],
      "ma": [
        2
      ],
      "e": "An Amazon EventBridge scheduled rule that invokes a Lambda function once a day requires no servers, no cluster and no infrastructure management, so it is the most operationally efficient for a small daily task in a new AWS environment. EKS, EC2 with crontab and AWS Batch all require provisioning and maintaining compute infrastructure. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 167
    },
    {
      "d": 0,
      "q": "A developer is building a serverless application that is based on AWS Lambda. The developer initializes the AWS software development kit (SDK) outside of the Lambda handler function.\nWhat is the PRIMARY benefit of this action?",
      "o": [
        "Improves legibility and stylistic convention",
        "Takes advantage of runtime environment reuse",
        "Provides better error handling",
        "Creates a new SDK instance for each invocation"
      ],
      "ma": [
        1
      ],
      "e": "Code outside the handler runs during the execution environment's init phase and is retained when the environment is reused for later invocations, so SDK clients and connections are created once instead of on every invocation, reducing duration and cost. It is a performance benefit, not a style or error handling feature, and initializing outside the handler does the opposite of creating a new SDK instance per invocation. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 168
    },
    {
      "d": 0,
      "q": "A company is using Amazon RDS as the backend database for its application. After a recent marketing campaign, a surge of read requests to the database increased the latency of data retrieval from the database. The company has decided to implement a caching layer in front of the database. The cached content must be encrypted and must be highly available.\nWhich solution will meet these requirements?",
      "o": [
        "Amazon CloudFront",
        "Amazon ElastiCache for Memcached",
        "Amazon ElastiCache for Redis in cluster mode",
        "Amazon DynamoDB Accelerator (DAX)"
      ],
      "ma": [
        2
      ],
      "e": "ElastiCache for Redis in cluster mode supports encryption at rest and in transit, and replicas with Multi-AZ automatic failover for high availability, so it works as a cache in front of RDS. Memcached has no replication, so it is not highly available and lacks the same encryption support, CloudFront caches HTTP content and not database queries, and DAX only works with DynamoDB. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 169
    },
    {
      "d": 0,
      "q": "A developer at a company recently created a serverless application to process and show data from business reports. The application\u2019s user interface (UI) allows users to select and start processing the files. The UI displays a message when the result is available to view. The application uses AWS Step Functions with AWS Lambda functions to process the files. The developer used Amazon API Gateway and Lambda functions to create an API to support the UI.\nThe company\u2019s UI team reports that the request to process a file is often returning timeout errors because of the size or complexity of the files. The UI team wants the API to provide an immediate response so that the UI can display a message while the files are being processed. The backend process that is invoked by the API needs to send an email message when the report processing is complete.\nWhat should the developer do to configure the API to meet these requirements?",
      "o": [
        "Change the API Gateway route to add an X-Amz-Invocation-Type header with a static value of \u2018Event\u2019 in the integration request. Deploy the API Gateway stage to apply the changes.",
        "Change the configuration of the Lambda function that implements the request to process a file. Configure the maximum age of the event so that the Lambda function will run asynchronously.",
        "Change the API Gateway timeout value to match the Lambda function timeout value. Deploy the API Gateway stage to apply the changes.",
        "Change the API Gateway route to add an X-Amz-Target header with a static value of \u2018Async\u2019 in the integration request. Deploy the API Gateway stage to apply the changes."
      ],
      "ma": [
        0
      ],
      "e": "Adding the X-Amz-Invocation-Type header with the static value Event to the API Gateway integration request makes API Gateway invoke the Lambda function asynchronously, so it returns an immediate 202 response and the function continues processing and can send the email when done. Maximum event age is an async invocation setting that does not change how the API invokes the function, raising the API Gateway timeout still makes the client wait, and X-Amz-Target with Async is not a valid mechanism. Community vote: A (70%), D (30%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 170
    },
    {
      "d": 0,
      "q": "A developer has an application that is composed of many different AWS Lambda functions. The Lambda functions all use some of the same dependencies. To avoid security issues, the developer is constantly updating the dependencies of all of the Lambda functions. The result is duplicated effort for each function.\nHow can the developer keep the dependencies of the Lambda functions up to date with the LEAST additional complexity?",
      "o": [
        "Define a maintenance window for the Lambda functions to ensure that the functions get updated copies of the dependencies.",
        "Upgrade the Lambda functions to the most recent runtime version.",
        "Define a Lambda layer that contains all of the shared dependencies.",
        "Use an AWS CodeCommit repository to host the dependencies in a centralized location."
      ],
      "ma": [
        2
      ],
      "e": "A Lambda layer packages shared libraries once so that all the functions can reference the same layer version, and updating the dependencies means publishing a new layer version instead of repackaging each function. Maintenance windows, runtime upgrades and hosting the dependencies in CodeCommit do not share dependencies among functions. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 171
    },
    {
      "d": 0,
      "q": "A mobile app stores blog posts in an Amazon DynamoDB table. Millions of posts are added every day, and each post represents a single item in the table. The mobile app requires only recent posts. Any post that is older than 48 hours can be removed.\nWhat is the MOST cost-effective way to delete posts that are older than 48 hours?",
      "o": [
        "For each item, add a new attribute of type String that has a timestamp that is set to the blog post creation time. Create a script to find old posts with a table scan and remove posts that are older than 48 hours by using the BatchWriteItem API operation. Schedule a cron job on an Amazon EC2 instance once an hour to start the script.",
        "For each item, add a new attribute of type String that has a timestamp that is set to the blog post creation time. Create a script to find old posts with a table scan and remove posts that are older than 48 hours by using the BatchWriteItem API operation. Place the script in a container image. Schedule an Amazon Elastic Container Service (Amazon ECS) task on AWS Fargate that invokes the container every 5 minutes.",
        "For each item, add a new attribute of type Date that has a timestamp that is set to 48 hours after the blog post creation time. Create a global secondary index (GSI) that uses the new attribute as a sort key. Create an AWS Lambda function that references the GSI and removes expired items by using the BatchWriteItem API operation. Schedule the function with an Amazon CloudWatch event every minute.",
        "For each item, add a new attribute of type Number that has a timestamp that is set to 48 hours after the blog post creation time. Configure the DynamoDB table with a TTL that references the new attribute."
      ],
      "ma": [
        3
      ],
      "e": "DynamoDB Time to Live deletes expired items automatically and at no cost for the deletes when a Number attribute holds the expiry time as an epoch timestamp, so setting it to 48 hours after creation handles removal with no code or infrastructure. A String or Date attribute is not valid for TTL, and the script and scan-based options consume read and write capacity and compute resources. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 172
    },
    {
      "d": 0,
      "q": "A developer is modifying an existing AWS Lambda function. While checking the code, the developer notices hardcoded parameter values for an Amazon RDS for SQL Server user name, password, database, host, and port. There are also hardcoded parameter values for an Amazon DynamoDB table, an Amazon S3 bucket, and an Amazon Simple Notification Service (Amazon SNS) topic.\nThe developer wants to securely store the parameter values outside the code in an encrypted format and wants to turn on rotation for the credentials. The developer also wants to be able to reuse the parameter values from other applications and to update the parameter values without modifying code.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Create an RDS database secret in AWS Secrets Manager. Set the user name, password, database, host, and port. Turn on secret rotation. Create encrypted Lambda environment variables for the DynamoDB table, S3 bucket, and SNS topic.",
        "Create an RDS database secret in AWS Secrets Manager. Set the user name, password, database, host, and port. Turn on secret rotation. Create SecureString parameters in AWS Systems Manager Parameter Store for the DynamoDB table, S3 bucket, and SNS topic.",
        "Create RDS database parameters in AWS Systems Manager Parameter Store for the user name, password, database, host, and port. Create encrypted Lambda environment variables for the DynamoDB table, S3 bucket, and SNS topic. Create a Lambda function and set the logic for the credentials rotation task. Schedule the credentials rotation task in Amazon EventBridge.",
        "Create RDS database parameters in AWS Systems Manager Parameter Store for the user name, password, database, host, and port. Store the DynamoDB table, S3 bucket, and SNS topic in Amazon S3. Create a Lambda function and set the logic for the credentials rotation. Invoke the Lambda function on a schedule."
      ],
      "ma": [
        1
      ],
      "e": "A Secrets Manager RDS database secret stores the credentials encrypted and has built-in managed rotation for RDS, including SQL Server, with no custom code. Non-secret settings such as the table, bucket and topic names go into Parameter Store SecureString parameters, which can be reused by other applications and updated without code changes. Lambda environment variables are tied to one function, and building custom rotation Lambda functions adds operational overhead. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 173
    },
    {
      "d": 0,
      "q": "A developer accesses AWS CodeCommit over SSH. The SSH keys configured to access AWS CodeCommit are tied to a user with the following permissions:\nThe developer needs to create/delete branches.\nWhich specific IAM permissions need to be added, based on the principle of least privilege?",
      "o": [
        "\"codecommit:CreateBranch\" \"codecommit:DeleteBranch\"",
        "\"codecommit:Put*\"",
        "\"codecommit:Update*\"",
        "\"codecommit:*\""
      ],
      "ma": [
        0
      ],
      "e": "The existing policy only allows read operations, so adding only codecommit:CreateBranch and codecommit:DeleteBranch gives the developer exactly the permissions needed to create and delete branches. Put*, Update* and codecommit:* grant far more than required and violate least privilege. Community vote: A (100%).",
      "images": [
        {
          "path": "assets/q174-s1.png",
          "alt": "Question 174 diagram"
        }
      ],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 174
    },
    {
      "d": 0,
      "q": "An application that is deployed to Amazon EC2 is using Amazon DynamoDB. The application calls the DynamoDB REST API. Periodically, the application receives a ProvisionedThroughputExceededException error when the application writes to a DynamoDB table.\nWhich solutions will mitigate this error MOST cost-effectively? (Choose two.)",
      "o": [
        "Modify the application code to perform exponential backoff when the error is received.",
        "Modify the application to use the AWS SDKs for DynamoDB.",
        "Increase the read and write throughput of the DynamoDB table.",
        "Create a DynamoDB Accelerator (DAX) cluster for the DynamoDB table.",
        "Create a second DynamoDB table. Distribute the reads and writes between the two tables."
      ],
      "ma": [
        0,
        1
      ],
      "e": "ProvisionedThroughputExceededException is a throttling error, so the application should retry with exponential backoff, and using the AWS SDKs gives that retry-with-backoff behavior built in, unlike hand-built REST API calls. Both are free fixes. Raising throughput, adding DAX, or splitting data across two tables costs more and does not address transient throttling, and DAX helps with reads, not writes. Community vote: AB (71%), BC (14%), AC (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 175
    },
    {
      "d": 0,
      "q": "When a developer tries to run an AWS CodeBuild project, it raises an error because the length of all environment variables exceeds the limit for the combined maximum of characters.\nWhat is the recommended solution?",
      "o": [
        "Add the export LC_ALL=\"en_US.utf8\" command to the pre_build section to ensure POSIX localization.",
        "Use Amazon Cognito to store key-value pairs for large numbers of environment variables.",
        "Update the settings for the build project to use an Amazon S3 bucket for large numbers of environment variables.",
        "Use AWS Systems Manager Parameter Store to store large numbers of environment variables."
      ],
      "ma": [
        3
      ],
      "e": "CodeBuild limits the combined size of environment variables, and the recommended fix is to store the values in Systems Manager Parameter Store (or Secrets Manager) and reference them through the parameter-store section of the buildspec, which fetches them at build time. Cognito, S3 settings for environment variables and the LC_ALL locale export are not features that solve this. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 176
    },
    {
      "d": 0,
      "q": "A company is expanding the compatibility of its photo-sharing mobile app to hundreds of additional devices with unique screen dimensions and resolutions. Photos are stored in Amazon S3 in their original format and resolution. The company uses an Amazon CloudFront distribution to serve the photos. The app includes the dimension and resolution of the display as GET parameters with every request.\nA developer needs to implement a solution that optimizes the photos that are served to each device to reduce load time and increase photo quality.\nWhich solution will meet these requirements MOST cost-effectively?",
      "o": [
        "Use S3 Batch Operations to invoke an AWS Lambda function to create new variants of the photos with the required dimensions and resolutions. Create a dynamic CloudFront origin that automatically maps the request of each device to the corresponding photo variant.",
        "Use S3 Batch Operations to invoke an AWS Lambda function to create new variants of the photos with the required dimensions and resolutions. Create a Lambda@Edge function to route requests to the corresponding photo variant by using request headers.",
        "Create a Lambda@Edge function that optimizes the photos upon request and returns the photos as a response. Change the CloudFront TTL cache policy to the maximum value possible.",
        "Create a Lambda@Edge function that optimizes the photos upon request and returns the photos as a response. In the same function, store a copy of the processed photos on Amazon S3 for subsequent requests."
      ],
      "ma": [
        3
      ],
      "e": "A Lambda@Edge function can read the dimension and resolution query parameters, resize the original photo on demand, and store the result in S3 so later requests for the same variant are served without reprocessing, and CloudFront caches the responses. Pregenerating variants for hundreds of device sizes with S3 Batch Operations is costly and wasteful, and option C reprocesses images each time they fall out of cache without storing the results. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 177
    },
    {
      "d": 0,
      "q": "A company is building an application for stock trading. The application needs sub-millisecond latency for processing trade requests. The company uses Amazon DynamoDB to store all the trading data that is used to process each trading request.\nA development team performs load testing on the application and finds that the data retrieval time is higher than expected. The development team needs a solution that reduces the data retrieval time with the least possible effort.\nWhich solution meets these requirements?",
      "o": [
        "Add local secondary indexes (LSIs) for the trading data.",
        "Store the trading data in Amazon S3, and use S3 Transfer Acceleration.",
        "Add retries with exponential backoff for DynamoDB queries.",
        "Use DynamoDB Accelerator (DAX) to cache the trading data."
      ],
      "ma": [
        3
      ],
      "e": "DynamoDB Accelerator (DAX) is a fully managed in-memory cache for DynamoDB that reduces read latency from milliseconds to microseconds with only a small change of the endpoint in the application. LSIs do not speed up reads of the same data, S3 Transfer Acceleration is for uploads over distance, and retries with backoff handle throttling instead of lowering latency. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 178
    },
    {
      "d": 0,
      "q": "A developer is working on a Python application that runs on Amazon EC2 instances. The developer wants to enable tracing of application requests to debug performance issues in the code.\nWhich combination of actions should the developer take to achieve this goal? (Choose two.)",
      "o": [
        "Install the Amazon CloudWatch agent on the EC2 instances.",
        "Install the AWS X-Ray daemon on the EC2 instances.",
        "Configure the application to write JSON-formatted logs to /var/log/cloudwatch.",
        "Configure the application to write trace data to /var/log/xray.",
        "Install and configure the AWS X-Ray SDK for Python in the application."
      ],
      "ma": [
        1,
        4
      ],
      "e": "To trace requests from an EC2-hosted application, install and configure the AWS X-Ray SDK for Python so the application generates trace segments, and run the X-Ray daemon on the instances to batch and forward those segments to the X-Ray service. The CloudWatch agent and writing logs to arbitrary directories do not produce X-Ray traces. Community vote: BE (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 179
    },
    {
      "d": 0,
      "q": "A company has an application that runs as a series of AWS Lambda functions. Each Lambda function receives data from an Amazon Simple Notification Service (Amazon SNS) topic and writes the data to an Amazon Aurora DB instance.\nTo comply with an information security policy, the company must ensure that the Lambda functions all use a single securely encrypted database connection string to access Aurora.\nWhich solution will meet these requirements?",
      "o": [
        "Use IAM database authentication for Aurora to enable secure database connections for all the Lambda functions.",
        "Store the credentials and read the credentials from an encrypted Amazon RDS DB instance.",
        "Store the credentials in AWS Systems Manager Parameter Store as a secure string parameter.",
        "Use Lambda environment variables with a shared AWS Key Management Service (AWS KMS) key for encryption."
      ],
      "ma": [
        2
      ],
      "e": "Storing the connection credentials once as a SecureString parameter in Systems Manager Parameter Store, encrypted with KMS, gives all the Lambda functions a single central encrypted source that they read at runtime. IAM database authentication generates per-connection tokens instead of one shared connection string, an RDS instance is not a credentials store, and per-function environment variables do not give a single shared source. Community vote: C (50%), A (38%), D (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 180
    },
    {
      "d": 0,
      "q": "A developer is troubleshooting an Amazon API Gateway API. Clients are receiving HTTP 400 response errors when the clients try to access an endpoint of the API.\nHow can the developer determine the cause of these errors?",
      "o": [
        "Create an Amazon Kinesis Data Firehose delivery stream to receive API call logs from API Gateway. Configure Amazon CloudWatch Logs as the delivery stream\u2019s destination.",
        "Turn on AWS CloudTrail Insights and create a trail. Specify the Amazon Resource Name (ARN) of the trail for the stage of the API.",
        "Turn on AWS X-Ray for the API stage. Create an Amazon CloudWatch Logs log group. Specify the Amazon Resource Name (ARN) of the log group for the API stage.",
        "Turn on execution logging and access logging in Amazon CloudWatch Logs for the API stage. Create a CloudWatch Logs log group. Specify the Amazon Resource Name (ARN) of the log group for the API stage."
      ],
      "ma": [
        3
      ],
      "e": "Turning on execution logging and access logging for the API stage and pointing it at a CloudWatch Logs log group records request details and the reason API Gateway returned the 400 response, such as validation or mapping failures. CloudTrail records management API calls and not client requests, X-Ray traces latency, and Firehose is not how API Gateway delivers logs. Community vote: D (62%), B (25%), C (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 181
    },
    {
      "d": 0,
      "q": "A company developed an API application on AWS by using Amazon CloudFront, Amazon API Gateway, and AWS Lambda. The API has a minimum of four requests every second. A developer notices that many API users run the same query by using the POST method. The developer wants to cache the POST request to optimize the API resources.\nWhich solution will meet these requirements?",
      "o": [
        "Configure the CloudFront cache. Update the application to return cached content based upon the default request headers.",
        "Override the cache method in the selected stage of API Gateway. Select the POST method.",
        "Save the latest request response in Lambda /tmp directory. Update the Lambda function to check the /tmp directory.",
        "Save the latest request in AWS Systems Manager Parameter Store. Modify the Lambda function to take the latest request response from Parameter Store."
      ],
      "ma": [
        1
      ],
      "e": "API Gateway stage-level caching can be overridden per method, so you can enable caching for the POST method in the selected stage, and identical requests are then served from the cache using the configured cache keys. The default CloudFront behavior does not cache POST responses, and storing results in the Lambda /tmp directory or Parameter Store is not a proper shared cache. Community vote: B (88%), A (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 182
    },
    {
      "d": 0,
      "q": "A company is building a microservices application that consists of many AWS Lambda functions. The development team wants to use AWS Serverless Application Model (AWS SAM) templates to automatically test the Lambda functions. The development team plans to test a small percentage of traffic that is directed to new updates before the team commits to a full deployment of the application.\nWhich combination of steps will meet these requirements in the MOST operationally efficient way? (Choose two.)",
      "o": [
        "Use AWS SAM CLI commands in AWS CodeDeploy to invoke the Lambda functions to test the deployment.",
        "Declare the EventInvokeConfig on the Lambda functions in the AWS SAM templates with OnSuccess and OnFailure configurations.",
        "Enable gradual deployments through AWS SAM templates.",
        "Set the deployment preference type to Canary10Percent30Minutes. Use hooks to test the deployment.",
        "Set the deployment preference type to Linear10PercentEvery10Minutes. Use hooks to test the deployment."
      ],
      "ma": [
        2,
        3
      ],
      "e": "Enabling gradual deployments in the SAM template uses AWS CodeDeploy to shift traffic to the new Lambda version through an alias. Choosing a Canary10Percent30Minutes deployment preference sends only 10 percent of traffic to the new version for 30 minutes before shifting the rest, and pre-traffic and post-traffic hooks run automated tests. A linear preference shifts all traffic in increments rather than testing a small percentage first, and EventInvokeConfig only configures asynchronous destinations. Community vote: CD (60%), AD (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 183
    },
    {
      "d": 0,
      "q": "A company is using AWS CloudFormation to deploy a two-tier application. The application will use Amazon RDS as its backend database. The company wants a solution that will randomly generate the database password during deployment. The solution also must automatically rotate the database password without requiring changes to the application.\nWhat is the MOST operationally efficient solution that meets these requirements?",
      "o": [
        "Use an AWS Lambda function as a CloudFormation custom resource to generate and rotate the password.",
        "Use an AWS Systems Manager Parameter Store resource with the SecureString data type to generate and rotate the password.",
        "Use a cron daemon on the application\u2019s host to generate and rotate the password.",
        "Use an AWS Secrets Manager resource to generate and rotate the password."
      ],
      "ma": [
        3
      ],
      "e": "A Secrets Manager secret defined in the CloudFormation template can generate a random password with GenerateSecretString, and a rotation schedule attached to the secret provides automatic rotation, with the application fetching the current value from Secrets Manager. Parameter Store does not generate or rotate passwords, and a custom Lambda resource or cron daemon would need custom code. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 184
    },
    {
      "d": 0,
      "q": "A developer has been asked to create an AWS Lambda function that is invoked any time updates are made to items in an Amazon DynamoDB table. The function has been created, and appropriate permissions have been added to the Lambda execution role. Amazon DynamoDB streams have been enabled for the table, but the function is still not being invoked.\nWhich option would enable DynamoDB table updates to invoke the Lambda function?",
      "o": [
        "Change the StreamViewType parameter value to NEW_AND_OLD_IMAGES for the DynamoDB table.",
        "Configure event source mapping for the Lambda function.",
        "Map an Amazon Simple Notification Service (Amazon SNS) topic to the DynamoDB streams.",
        "Increase the maximum runtime (timeout) setting of the Lambda function."
      ],
      "ma": [
        1
      ],
      "e": "A Lambda function is not triggered by a DynamoDB stream until an event source mapping connects the stream to the function, which makes Lambda poll the stream and invoke the function with batches of records. Changing the stream view type, mapping SNS to the stream or raising the function timeout do not create that connection. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 185
    },
    {
      "d": 0,
      "q": "A developer needs to deploy an application running on AWS Fargate using Amazon ECS. The application has environment variables that must be passed to a container for the application to initialize.\nHow should the environment variables be passed to the container?",
      "o": [
        "Define an array that includes the environment variables under the environment parameter within the service definition.",
        "Define an array that includes the environment variables under the environment parameter within the task definition.",
        "Define an array that includes the environment variables under the entryPoint parameter within the task definition.",
        "Define an array that includes the environment variables under the entryPoint parameter within the service definition."
      ],
      "ma": [
        1
      ],
      "e": "For ECS on Fargate, container environment variables are defined in the environment array of the container definition inside the task definition. The service definition does not contain container settings, and entryPoint specifies the executable to run, not environment variables. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 186
    },
    {
      "d": 0,
      "q": "A development team maintains a web application by using a single AWS RDS, template. The template defines web servers and an Amazon RDS database. The team uses the CloudFormation template to deploy the CloudFormation stack to different environments.\nDuring a recent application deployment, a developer caused the primary development database to be dropped and recreated. The result of this incident was a loss of data. The team needs to avoid accidental database deletion in the future.\nWhich solutions will meet these requirements? (Choose two.)",
      "o": [
        "Add a CloudFormation DeletionPolicy attribute with the Retain value to the database resource.",
        "Update the CloudFormation stack policy to prevent updates to the database.",
        "Modify the database to use a Multi-AZ deployment.",
        "Create a CloudFormation stack set for the web application and database deployments.",
        "Add a CloudFormation DeletionPolicy attribute with the Retain value to the stack."
      ],
      "ma": [
        0,
        1
      ],
      "e": "A DeletionPolicy of Retain on the database resource keeps the database when the resource is removed from the stack or the stack is deleted, and a stack policy that denies updates to the database prevents CloudFormation from replacing it during stack updates. Multi-AZ provides availability and not protection from deletion, StackSets are for multi-account deployment, and DeletionPolicy is a resource attribute that cannot be applied to a stack. Community vote: AB (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 187
    },
    {
      "d": 0,
      "q": "A developer is storing sensitive data generated by an application in Amazon S3. The developer wants to encrypt the data at rest. A company policy requires an audit trail of when the AWS Key Management Service (AWS KMS) key was used and by whom.\nWhich encryption option will meet these requirements?",
      "o": [
        "Server-side encryption with Amazon S3 managed keys (SSE-S3)",
        "Server-side encryption with AWS KMS managed keys (SSE-KMS)",
        "Server-side encryption with customer-provided keys (SSE-C)",
        "Server-side encryption with self-managed keys"
      ],
      "ma": [
        1
      ],
      "e": "SSE-KMS encrypts S3 objects with a KMS key, and every use of the key is logged in AWS CloudTrail showing which principal used the key and when, which gives the required audit trail. SSE-S3 uses S3-managed keys with no key-use auditing, and SSE-C and self-managed keys do not use KMS at all. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 188
    },
    {
      "d": 0,
      "q": "A company has an ecommerce application. To track product reviews, the company\u2019s development team uses an Amazon DynamoDB table. Every record includes the following:\n\u2022 A Review ID, a 16-digit universally unique identifier (UUID)\n\u2022 A Product ID and User ID, 16-digit UUIDs that reference other tables \u2022 A Product Rating on a scale of 1-5 \u2022 An optional comment from the user The table partition key is the Review ID. The most performed query against the table is to find the 10 reviews with the highest rating for a given product.\nWhich index will provide the FASTEST response for this query?",
      "o": [
        "A global secondary index (GSI) with Product ID as the partition key and Product Rating as the sort key",
        "A global secondary index (GSI) with Product ID as the partition key and Review ID as the sort key",
        "A local secondary index (LSI) with Product ID as the partition key and Product Rating as the sort key",
        "A local secondary index (LSI) with Review ID as the partition key and Product ID as the sort key"
      ],
      "ma": [
        0
      ],
      "e": "A GSI with Product ID as the partition key and Product Rating as the sort key lets you Query for one product with ScanIndexForward set to false and a limit of 10, returning the top-rated reviews directly. An LSI must share the table's partition key (Review ID) and can only be created at table creation, so C and D are invalid, and sorting by Review ID in B does not order by rating. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 189
    },
    {
      "d": 0,
      "q": "A company needs to distribute firmware updates to its customers around the world.\nWhich service will allow easy and secure control of the access to the downloads at the lowest cost?",
      "o": [
        "Use Amazon CloudFront with signed URLs for Amazon S3.",
        "Create a dedicated Amazon CloudFront Distribution for each customer.",
        "Use Amazon CloudFront with AWS Lambda@Edge.",
        "Use Amazon API Gateway and AWS Lambda to control access to an S3 bucket."
      ],
      "ma": [
        0
      ],
      "e": "CloudFront serving firmware from S3 gives low-cost global distribution with edge caching, and signed URLs restrict downloads to authorized customers for a limited time. A separate distribution per customer, Lambda@Edge, or API Gateway and Lambda in front of S3 each add complexity and cost. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 190
    },
    {
      "d": 0,
      "q": "A developer is testing an application that invokes an AWS Lambda function asynchronously. During the testing phase, the Lambda function fails to process after two retries.\nHow can the developer troubleshoot the failure?",
      "o": [
        "Configure AWS CloudTrail logging to investigate the invocation failures.",
        "Configure Dead Letter Queues by sending events to Amazon SQS for investigation.",
        "Configure Amazon Simple Workflow Service to process any direct unprocessed events.",
        "Configure AWS Config to process any direct unprocessed events."
      ],
      "ma": [
        1
      ],
      "e": "For asynchronous Lambda invocations, events that still fail after the configured retries can be sent to a dead-letter queue (SQS or SNS) or an on-failure destination, which preserves the failed event and error context for investigation. CloudTrail does not capture function failure payloads, and SWF and AWS Config are not used to handle unprocessed Lambda events. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 191
    },
    {
      "d": 0,
      "q": "A company is migrating its PostgreSQL database into the AWS Cloud. The company wants to use a database that will secure and regularly rotate database credentials. The company wants a solution that does not require additional programming overhead.\nWhich solution will meet these requirements?",
      "o": [
        "Use Amazon Aurora PostgreSQL for the database. Store the database credentials in AWS Systems Manager Parameter Store. Turn on rotation.",
        "Use Amazon Aurora PostgreSQL for the database. Store the database credentials in AWS Secrets Manager. Turn on rotation.",
        "Use Amazon DynamoDB for the database. Store the database credentials in AWS Systems Manager Parameter Store. Turn on rotation.",
        "Use Amazon DynamoDB for the database. Store the database credentials in AWS Secrets Manager. Turn on rotation."
      ],
      "ma": [
        1
      ],
      "e": "Aurora PostgreSQL is a PostgreSQL-compatible database, and Secrets Manager has built-in managed rotation for Aurora credentials, so rotation is turned on without writing code. Parameter Store does not offer rotation, and DynamoDB is not PostgreSQL and uses IAM rather than database credentials. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 192
    },
    {
      "d": 0,
      "q": "A developer is creating a mobile application that will not require users to log in.\nWhat is the MOST efficient method to grant users access to AWS resources?",
      "o": [
        "Use an identity provider to securely authenticate with the application.",
        "Create an AWS Lambda function to create an IAM user when a user accesses the application.",
        "Create credentials using AWS KMS and apply these credentials to users when using the application.",
        "Use Amazon Cognito to associate unauthenticated users with an IAM role that has limited access to resources."
      ],
      "ma": [
        3
      ],
      "e": "Amazon Cognito identity pools can issue temporary AWS credentials to unauthenticated guest users mapped to an IAM role with limited permissions, so no login or user management is needed. Creating IAM users per visitor or distributing KMS-created credentials is insecure and operationally heavy, and an identity provider requires users to authenticate. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 193
    },
    {
      "d": 0,
      "q": "A company has developed a new serverless application using AWS Lambda functions that will be deployed using the AWS Serverless Application Model (AWS SAM) CLI.\nWhich step should the developer complete prior to deploying the application?",
      "o": [
        "Compress the application to a .zip file and upload it into AWS Lambda.",
        "Test the new AWS Lambda function by first tracing it in AWS X-Ray.",
        "Bundle the serverless application using a SAM package.",
        "Create the application environment using the eb create my-env command."
      ],
      "ma": [
        2
      ],
      "e": "Before sam deploy, the application must be packaged, in which the code is bundled and uploaded to S3 and the template is transformed to reference it (sam package, or the packaging that sam deploy performs). Manually zipping and uploading to Lambda, testing with X-Ray and using eb create (an Elastic Beanstalk command) are not SAM deployment steps. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 194
    },
    {
      "d": 0,
      "q": "A company wants to automate part of its deployment process. A developer needs to automate the process of checking for and deleting unused resources that supported previously deployed stacks but that are no longer used.\nThe company has a central application that uses the AWS Cloud Development Kit (AWS CDK) to manage all deployment stacks. The stacks are spread out across multiple accounts. The developer\u2019s solution must integrate as seamlessly as possible within the current deployment process. Which solution will meet these requirements with the LEAST amount of configuration?",
      "o": [
        "In the central AWS CDK application, write a handler function in the code that uses AWS SDK calls to check for and delete unused resources. Create an AWS CloudFormation template from a JSON file. Use the template to attach the function code to an AWS Lambda function and to invoke the Lambda function when the deployment stack runs.",
        "In the central AWS CDK application, write a handler function in the code that uses AWS SDK calls to check for and delete unused resources. Create an AWS CDK custom resource. Use the custom resource to attach the function code to an AWS Lambda function and to invoke the Lambda function when the deployment stack runs.",
        "In the central AWS CDK, write a handler function in the code that uses AWS SDK calls to check for and delete unused resources. Create an API in AWS Amplify. Use the API to attach the function code to an AWS Lambda function and to invoke the Lambda function when the deployment stack runs.",
        "In the AWS Lambda console, write a handler function in the code that uses AWS SDK calls to check for and delete unused resources. Create an AWS CDK custom resource. Use the custom resource to import the Lambda function into the stack and to invoke the Lambda function when the deployment stack runs."
      ],
      "ma": [
        1
      ],
      "e": "In the CDK app, the cleanup handler code can be wrapped in a CDK custom resource, which provisions the Lambda function and invokes it as part of stack deployment, so it fits into the existing deployment process with the least configuration. Writing raw CloudFormation JSON, using Amplify APIs, or writing the function in the console and importing it break the integrated CDK flow. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 195
    },
    {
      "d": 0,
      "q": "A company built a new application in the AWS Cloud. The company automated the bootstrapping of new resources with an Auto Scaling group by using AWS CloudFormation templates. The bootstrap scripts contain sensitive data.\nThe company needs a solution that is integrated with CloudFormation to manage the sensitive data in the bootstrap scripts.\nWhich solution will meet these requirements in the MOST secure way?",
      "o": [
        "Put the sensitive data into a CloudFormation parameter. Encrypt the CloudFormation templates by using an AWS Key Management Service (AWS KMS) key.",
        "Put the sensitive data into an Amazon S3 bucket. Update the CloudFormation templates to download the object from Amazon S3 during bootstrap.",
        "Put the sensitive data into AWS Systems Manager Parameter Store as a secure string parameter. Update the CloudFormation templates to use dynamic references to specify template values.",
        "Put the sensitive data into Amazon Elastic File System (Amazon EFS). Enforce EFS encryption after file system creation. Update the CloudFormation templates to retrieve data from Amazon EFS."
      ],
      "ma": [
        2
      ],
      "e": "Storing the sensitive data as a SecureString parameter in Systems Manager Parameter Store and referencing it with CloudFormation dynamic references keeps the plaintext out of the template, and the value is encrypted with KMS and resolved at deployment. A template parameter would expose the data, and encrypting the template with KMS does not protect parameter values. S3 and EFS storage are not integrated with CloudFormation for this purpose. Community vote: C (83%), A (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 196
    },
    {
      "d": 0,
      "q": "A company needs to set up secure database credentials for all its AWS Cloud resources. The company\u2019s resources include Amazon RDS DB instances, Amazon DocumentDB clusters, and Amazon Aurora DB instances. The company\u2019s security policy mandates that database credentials be encrypted at rest and rotated at a regular interval.\nWhich solution will meet these requirements MOST securely?",
      "o": [
        "Set up IAM database authentication for token-based access. Generate user tokens to provide centralized access to RDS DB instances, Amazon DocumentDB clusters, and Aurora DB instances.",
        "Create parameters for the database credentials in AWS Systems Manager Parameter Store. Set the Type parameter to SecureString. Set up automatic rotation on the parameters.",
        "Store the database access credentials as an encrypted Amazon S3 object in an S3 bucket. Block all public access on the S3 bucket. Use S3 server-side encryption to set up automatic rotation on the encryption key.",
        "Create an AWS Lambda function by using the SecretsManagerRotationTemplate template in the AWS Secrets Manager console. Create secrets for the database credentials in Secrets Manager. Set up secrets rotation on a schedule."
      ],
      "ma": [
        3
      ],
      "e": "Secrets Manager stores credentials encrypted with KMS and supports automatic rotation on a schedule for RDS, Aurora and DocumentDB, using rotation Lambda functions based on the AWS rotation templates. Parameter Store has no native automatic rotation, IAM database authentication does not cover DocumentDB the same way and does not provide credential rotation, and S3 server-side encryption key rotation does not rotate database passwords. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 197
    },
    {
      "d": 0,
      "q": "A developer has created an AWS Lambda function that makes queries to an Amazon Aurora MySQL DB instance. When the developer performs a test, the DB instance shows an error for too many connections.\nWhich solution will meet these requirements with the LEAST operational effort?",
      "o": [
        "Create a read replica for the DB instance. Query the replica DB instance instead of the primary DB instance.",
        "Migrate the data to an Amazon DynamoDB database.",
        "Configure the Amazon Aurora MySQL DB instance for Multi-AZ deployment.",
        "Create a proxy in Amazon RDS Proxy. Query the proxy instead of the DB instance."
      ],
      "ma": [
        3
      ],
      "e": "Lambda scaling opens many database connections and exhausts the Aurora connection limit, and Amazon RDS Proxy pools and shares connections so many Lambda invocations use far fewer database connections. A read replica or Multi-AZ does not solve connection exhaustion on the instance being used, and migrating to DynamoDB is a big redesign. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 198
    },
    {
      "d": 0,
      "q": "A developer is creating a new REST API by using Amazon API Gateway and AWS Lambda. The development team tests the API and validates responses for the known use cases before deploying the API to the production environment.\nThe developer wants to make the REST API available for testing by using API Gateway locally.\nWhich AWS Serverless Application Model Command Line Interface (AWS SAM CLI) subcommand will meet these requirements?",
      "o": [
        "Sam local invoke",
        "Sam local generate-event",
        "Sam local start-lambda",
        "Sam local start-api"
      ],
      "ma": [
        3
      ],
      "e": "sam local start-api runs a local HTTP server that emulates API Gateway and invokes the Lambda functions locally, so the REST API can be tested locally. sam local invoke runs a single function once, start-lambda emulates the Lambda service endpoint, and generate-event only produces sample event payloads. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 199
    },
    {
      "d": 0,
      "q": "A company has a serverless application on AWS that uses a fleet of AWS Lambda functions that have aliases. The company regularly publishes new Lambda function by using an in-house deployment solution. The company wants to improve the release process and to use traffic shifting. A newly published function version should initially make available only to a fixed percentage of production users.\nWhich solution will meet these requirements?",
      "o": [
        "Configure routing on the alias of the new function by using a weighted alias.",
        "Configure a canary deployment type for Lambda.",
        "Configure routing on the new versions by using environment variables.",
        "Configure a linear deployment type for Lambda."
      ],
      "ma": [
        0
      ],
      "e": "A Lambda alias can use weighted routing configuration to send a fixed percentage of traffic to a second function version, so the new version is initially available only to that percentage of production users. Canary and linear deployment types are CodeDeploy deployment configurations and not part of the in-house deployment solution, and environment variables cannot route traffic between versions. Community vote: A (75%), B (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 200
    },
    {
      "d": 0,
      "q": "A company has an application that stores data in Amazon RDS instances. The application periodically experiences surges of high traffic that cause performance problems. During periods of peak traffic, a developer notices a reduction in query speed in all database queries.\nThe team\u2019s technical lead determines that a multi-threaded and scalable caching solution should be used to offload the heavy read traffic. The solution needs to improve performance.\nWhich solution will meet these requirements with the LEAST complexity?",
      "o": [
        "Use Amazon ElastiCache for Memcached to offload read requests from the main database.",
        "Replicate the data to Amazon DynamoDSet up a DynamoDB Accelerator (DAX) cluster.",
        "Configure the Amazon RDS instances to use Multi-AZ deployment with one standby instance. Offload read requests from the main database to the standby instance.",
        "Use Amazon ElastiCache for Redis to offload read requests from the main database."
      ],
      "ma": [
        0
      ],
      "e": "ElastiCache for Memcached is a multi-threaded, horizontally scalable caching engine that can offload read traffic from RDS and fits the stated multi-threaded requirement. Redis is single-threaded for command execution, DAX only works with DynamoDB, and the standby instance of a Multi-AZ RDS deployment cannot serve read traffic. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 201
    },
    {
      "d": 0,
      "q": "A developer must provide an API key to an AWS Lambda function to authenticate with a third-party system. The Lambda function will run on a schedule. The developer needs to ensure that the API key remains encrypted at rest.\nWhich solution will meet these requirements?",
      "o": [
        "Store the API key as a Lambda environment variable by using an AWS Key Management Service (AWS KMS) customer managed key.",
        "Configure the application to prompt the user to provide the password to the Lambda function on the first run.",
        "Store the API key as a value in the application code.",
        "Use Lambda@Edge and only communicate over the HTTPS protocol."
      ],
      "ma": [
        0
      ],
      "e": "Lambda environment variables are encrypted at rest, and using a KMS customer managed key keeps the API key encrypted at rest with controlled access to the key. Prompting a user fails for a scheduled function, hardcoding the key in code leaves it in plaintext, and Lambda@Edge with HTTPS does not address encryption at rest. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 202
    },
    {
      "d": 0,
      "q": "An IT department uses Amazon S3 to store sensitive images. After more than 1 year, the company moves the images into archival storage. The company rarely accesses the images, but the company wants a storage solution that maximizes resiliency. The IT department needs access to the images that have been moved to archival storage within 24 hours.\nWhich solution will meet these requirements MOST cost-effectively?",
      "o": [
        "Use S3 Standard-Infrequent Access (S3 Standard-IA) to store the images. Use S3 Glacier Deep Archive with standard retrieval to store and retrieve archived images.",
        "Use S3 Standard-Infrequent Access (S3 Standard-IA) to store the images. Use S3 Glacier Deep Archive with bulk retrieval to store and retrieve archived images.",
        "Use S3 Intelligent-Tiering to store the images. Use S3 Glacier Deep Archive with standard retrieval to store and retrieve archived images.",
        "Use S3 One Zone-Infrequent Access (S3 One Zone-IA) to store the images. Use S3 Glacier Deep Archive with bulk retrieval to store and retrieve archived images."
      ],
      "ma": [
        0
      ],
      "e": "S3 Standard-IA stores data across multiple Availability Zones for resiliency at a lower cost than Standard, and Glacier Deep Archive standard retrieval completes within 12 hours, which meets the 24-hour requirement. Bulk retrieval from Deep Archive takes up to 48 hours, which is too slow, and One Zone-IA stores in a single AZ, which lowers resiliency. Intelligent-Tiering has monitoring fees that are not worthwhile for rarely accessed data. Community vote: A (53%), B (27%), C (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 203
    },
    {
      "d": 0,
      "q": "A developer is building a serverless application by using the AWS Serverless Application Model (AWS SAM). The developer is currently testing the application in a development environment. When the application is nearly finished, the developer will need to set up additional testing and staging environments for a quality assurance team.\nThe developer wants to use a feature of the AWS SAM to set up deployments to multiple environments.\nWhich solution will meet these requirements with the LEAST development effort?",
      "o": [
        "Add a configuration file in TOML format to group configuration entries to every environment. Add a table for each testing and staging environment. Deploy updates to the environments by using the sam deploy command and the --config-env flag that corresponds to each environment.",
        "Create additional AWS SAM templates for each testing and staging environment. Write a custom shell script that uses the sam deploy command and the --template-file flag to deploy updates to the environments.",
        "Create one AWS SAM configuration file that has default parameters. Perform updates to the testing and staging environments by using the - -parameter-overrides flag in the AWS SAM CLI and the parameters that the updates will override.",
        "Use the existing AWS SAM template. Add additional parameters to configure specific attributes for the serverless function and database table resources that are in each environment. Deploy updates to the testing and staging environments by using the sam deploy command."
      ],
      "ma": [
        0
      ],
      "e": "The SAM CLI configuration file (samconfig.toml) can contain a separate table for each environment, and sam deploy --config-env selects the environment's parameters, so one template deploys to dev, test and staging with minimal effort. Maintaining multiple templates or custom scripts is more work, and parameter overrides alone do not capture the full per-environment configuration. Community vote: C (50%), A (43%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 204
    },
    {
      "d": 0,
      "q": "A developer is working on an application that processes operating data from IoT devices. Each IoT device uploads a data file once every hour to an Amazon S3 bucket. The developer wants to immediately process each data file when the data file is uploaded to Amazon S3.\nThe developer will use an AWS Lambda function to process the data files from Amazon S3. The Lambda function is configured with the S3 bucket information where the files are uploaded. The developer wants to configure the Lambda function to immediately invoke after each data file is uploaded.\nWhich solution will meet these requirements?",
      "o": [
        "Add an asynchronous invocation to the Lambda function. Select the S3 bucket as the source.",
        "Add an Amazon EventBridge event to the Lambda function. Select the S3 bucket as the source.",
        "Add a trigger to the Lambda function. Select the S3 bucket as the source.",
        "Add a layer to the Lambda function. Select the S3 bucket as the source."
      ],
      "ma": [
        2
      ],
      "e": "Adding an S3 trigger to the Lambda function configures an S3 event notification for object-created events on the bucket, which invokes the function immediately after each upload. Asynchronous invocation is an invocation type and not a source, EventBridge is not how the trigger is added here, and a layer only packages libraries and code. Community vote: C (60%), B (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 205
    },
    {
      "d": 0,
      "q": "A developer is setting up infrastructure by using AWS CloudFormation. If an error occurs when the resources described in the Cloud Formation template are provisioned, successfully provisioned resources must be preserved. The developer must provision and update the CloudFormation stack by using the AWS CLI.\nWhich solution will meet these requirements?",
      "o": [
        "Add an --enable-termination-protection command line option to the create-stack command and the update-stack command.",
        "Add a --disable-rollback command line option to the create-stack command and the update-stack command.",
        "Add a --parameters ParameterKey=PreserveResources,ParameterValue=True command line option to the create-stack command and the update-stack command.",
        "Add a --tags Key=PreserveResources,Value=True command line option to the create-stack command and the update-stack command."
      ],
      "ma": [
        1
      ],
      "e": "By default CloudFormation rolls back and deletes resources created so far when a create fails. The --disable-rollback option on create-stack and update-stack keeps the successfully provisioned resources for troubleshooting. Termination protection prevents stack deletion, and parameters or tags named PreserveResources have no effect on rollback behavior. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 206
    },
    {
      "d": 0,
      "q": "A developer is building a serverless application that connects to an Amazon Aurora PostgreSQL database. The serverless application consists of hundreds of AWS Lambda functions. During every Lambda function scale out, a new database connection is made that increases database resource consumption.\nThe developer needs to decrease the number of connections made to the database. The solution must not impact the scalability of the Lambda functions.\nWhich solution will meet these requirements?",
      "o": [
        "Configure provisioned concurrency for each Lambda function by setting the ProvisionedConcurrentExecutions parameter to 10.",
        "Enable cluster cache management for Aurora PostgreSQL. Change the connection string of each Lambda function to point to cluster cache management.",
        "Use Amazon RDS Proxy to create a connection pool to manage the database connections. Change the connection string of each Lambda function to reference the proxy.",
        "Configure reserved concurrency for each Lambda function by setting the ReservedConcurrentExecutions parameter to 10."
      ],
      "ma": [
        2
      ],
      "e": "Amazon RDS Proxy maintains a pool of database connections and multiplexes the connections from many Lambda invocations onto it, reducing database load without limiting Lambda scaling. Provisioned and reserved concurrency control Lambda concurrency and either keep functions warm or cap scaling, and Aurora cluster cache management is a failover cache feature and is not a connection endpoint. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 207
    },
    {
      "d": 0,
      "q": "A developer is preparing to begin development of a new version of an application. The previous version of the application is deployed in a production environment. The developer needs to deploy fixes and updates to the current version during the development of the new version of the application. The code for the new version of the application is stored in AWS CodeCommit.\nWhich solution will meet these requirements?",
      "o": [
        "From the main branch, create a feature branch for production bug fixes. Create a second feature branch from the main branch for development of the new version.",
        "Create a Git tag of the code that is currently deployed in production. Create a Git tag for the development of the new version. Push the two tags to the CodeCommit repository.",
        "From the main branch, create a branch of the code that is currently deployed in production. Apply an IAM policy that ensures no other users can push or merge to the branch.",
        "Create a new CodeCommit repository for development of the new version of the application. Create a Git tag for the development of the new version."
      ],
      "ma": [
        0
      ],
      "e": "Branching from main into one branch for production bug fixes and another for the new version's development lets both lines of work proceed independently and be merged later, which is the standard Git workflow in CodeCommit. Tags are fixed pointers and not places to commit ongoing work, a separate repository fragments the history, and an IAM policy that blocks pushes to the production branch would prevent the fixes the developer needs to deploy. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 208
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS CloudFormation stack. The stack contains IAM resources with custom names. When the developer tries to deploy the stack, they receive an InsufficientCapabilities error.\nWhat should the developer do to resolve this issue?",
      "o": [
        "Specify the CAPABILITY_AUTO_EXPAND capability in the CloudFormation stack.",
        "Use an administrators role to deploy IAM resources with CloudFormation.",
        "Specify the CAPABILITY_IAM capability in the CloudFormation stack.",
        "Specify the CAPABILITY_NAMED_IAM capability in the CloudFormation stack."
      ],
      "ma": [
        3
      ],
      "e": "When a template creates IAM resources with custom names, CloudFormation requires acknowledgment through the CAPABILITY_NAMED_IAM capability. CAPABILITY_IAM only covers IAM resources without custom names, and CAPABILITY_AUTO_EXPAND is for templates with macros or nested stacks. Using an administrator role does not remove the capability acknowledgment requirement. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 209
    },
    {
      "d": 0,
      "q": "A company uses Amazon API Gateway to expose a set of APIs to customers. The APIs have caching enabled in API Gateway. Customers need a way to invalidate the cache for each API when they test the API.\nWhat should a developer do to give customers the ability to invalidate the API cache?",
      "o": [
        "Ask the customers to use AWS credentials to call the InvalidateCache API operation.",
        "Attach an InvalidateCache policy to the IAM execution role that the customers use to invoke the API. Ask the customers to send a request that contains the Cache-Control:max-age=0 HTTP header when they make an API call.",
        "Ask the customers to use the AWS SDK API Gateway class to invoke the InvalidateCache API operation.",
        "Attach an InvalidateCache policy to the IAM execution role that the customers use to invoke the API. Ask the customers to add the INVALIDATE_CACHE query string parameter when they make an API call."
      ],
      "ma": [
        1
      ],
      "e": "A client can invalidate an API Gateway cache entry by sending a request with the Cache-Control: max-age=0 header, provided the caller's IAM policy grants execute-api:InvalidateCache on the API. The InvalidateCache permission is attached to the identity that calls the API, which lets customers invalidate the cache during testing without the account's management credentials. InvalidateCache is not a management API operation customers call, and INVALIDATE_CACHE is not a valid query string parameter. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 210
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Lambda function that will generate and export a file. The function requires 100 MB of temporary storage for temporary files while running. These files will not be needed after the function is complete.\nHow can the developer MOST efficiently handle the temporary files?",
      "o": [
        "Store the files in Amazon Elastic Block Store (Amazon EBS) and delete the files at the end of the Lambda function.",
        "Copy the files to Amazon Elastic File System (Amazon EFS) and delete the files at the end of the Lambda function.",
        "Store the files in the /tmp directory and delete the files at the end of the Lambda function.",
        "Copy the files to an Amazon S3 bucket with a lifecycle policy to delete the files."
      ],
      "ma": [
        2
      ],
      "e": "Every Lambda function gets ephemeral storage in the /tmp directory (512 MB by default, configurable up to 10,240 MB), which is more than enough for 100 MB and is scoped to the execution environment, so it needs no extra service or cost. EBS volumes cannot be attached to Lambda functions, EFS adds a VPC, mount target and cost for data that is not needed after the run, and S3 with a lifecycle policy adds network calls and a delay before deletion. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 211
    },
    {
      "d": 0,
      "q": "A company uses Amazon DynamoDB as a data store for its order management system. The company frontend application stores orders in a DynamoDB table. The DynamoDB table is configured to send change events to a DynamoDB stream. The company uses an AWS Lambda function to log and process the incoming orders based on data from the DynamoDB stream.\nAn operational review reveals that the order quantity of incoming orders is sometimes set to 0. A developer needs to create a dashboard that will show how many unique customers this problem affects each day.\nWhat should the developer do to implement the dashboard?",
      "o": [
        "Grant the Lambda function\u2019s execution role permissions to upload logs to Amazon CloudWatch Logs. Implement a CloudWatch Logs Insights query that selects the number of unique customers for orders with order quantity equal to 0 and groups the results in 1-day periods. Add the CloudWatch Logs Insights query to a CloudWatch dashboard.",
        "Use Amazon Athena to query AWS CloudTrail API logs for API calls. Implement an Athena query that selects the number of unique customers for orders with order quantity equal to 0 and groups the results in 1-day periods. Add the Athena query to an Amazon CloudWatch dashboard.",
        "Configure the Lambda function to send events to Amazon EventBridge. Create an EventBridge rule that groups the number of unique customers for orders with order quantity equal to 0 in 1-day periods. Add a CloudWatch dashboard as the target of the rule.",
        "Turn on custom Amazon CloudWatch metrics for the DynamoDB stream of the DynamoDB table. Create a CloudWatch alarm that groups the number of unique customers for orders with order quantity equal to 0 in 1-day periods. Add the CloudWatch alarm to a CloudWatch dashboard."
      ],
      "ma": [
        0
      ],
      "e": "The Lambda function already processes the stream records, so once its execution role can write to CloudWatch Logs (AWSLambdaBasicExecutionRole) the logged orders can be analyzed with a CloudWatch Logs Insights query that filters quantity = 0, uses count_distinct(customerId) and bins by 1d. Logs Insights queries can be added as a widget to a CloudWatch dashboard. CloudTrail does not record application data such as order quantity, Lambda cannot send EventBridge events by configuration alone and a rule cannot target a dashboard, and DynamoDB streams have no custom metrics or per-customer unique counts that an alarm could use. Community vote: A (75%), D (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 212
    },
    {
      "d": 0,
      "q": "A developer needs to troubleshoot an AWS Lambda function in a development environment. The Lambda function is configured in VPC mode and needs to connect to an existing Amazon RDS for SQL Server DB instance. The DB instance is deployed in a private subnet and accepts connections by using port 1433.\nWhen the developer tests the function, the function reports an error when it tries to connect to the database.\nWhich combination of steps should the developer take to diagnose this issue? (Choose two.)",
      "o": [
        "Check that the function\u2019s security group has outbound access on port 1433 to the DB instance\u2019s security group. Check that the DB instance\u2019s security group has inbound access on port 1433 from the function\u2019s security group.",
        "Check that the function\u2019s security group has inbound access on port 1433 from the DB instance\u2019s security group. Check that the DB instance\u2019s security group has outbound access on port 1433 to the function\u2019s security group.",
        "Check that the VPC is set up for a NAT gateway. Check that the DB instance has the public access option turned on.",
        "Check that the function\u2019s execution role permissions include rds:DescribeDBInstances, rds:ModifyDBInstance. and rds:DescribeDBSecurityGroups for the DB instance.",
        "Check that the function\u2019s execution role permissions include ec2:CreateNetworkInterface, ec2:DescribeNetworkInterfaces, and ec2:DeleteNetworkInterface."
      ],
      "ma": [
        0,
        4
      ],
      "e": "Security groups are stateful and the connection is initiated by the function, so the function's security group needs outbound access on port 1433 to the database and the DB instance's security group needs inbound access on 1433 from the function's security group. A VPC-attached Lambda function also needs the ec2:CreateNetworkInterface, ec2:DescribeNetworkInterfaces and ec2:DeleteNetworkInterface permissions (included in AWSLambdaVPCAccessExecutionRole) to create the ENIs it uses to reach the private subnet. Option B reverses the traffic direction, option C is unnecessary because the database sits in a private subnet reachable inside the VPC, and option D lists RDS management permissions that are not needed to open a database connection. Community vote: AE (70%), AD (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 213
    },
    {
      "d": 0,
      "q": "A developer needs to launch a new Amazon EC2 instance by using the AWS CLI.\nWhich AWS CLI command should the developer use to meet this requirement?",
      "o": [
        "aws ec2 bundle-instance",
        "aws ec2 start-instances",
        "aws ec2 confirm-product-instance",
        "aws ec2 run-instances"
      ],
      "ma": [
        3
      ],
      "e": "aws ec2 run-instances launches new EC2 instances from an AMI with the specified instance type, key pair and networking. start-instances only restarts an existing stopped instance, bundle-instance is a legacy command for creating an instance-store AMI from a Windows instance, and confirm-product-instance checks whether a product code is attached to an instance. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 214
    },
    {
      "d": 0,
      "q": "A developer needs to manage AWS infrastructure as code and must be able to deploy multiple identical copies of the infrastructure, stage changes, and revert to previous versions.\nWhich approach addresses these requirements?",
      "o": [
        "Use cost allocation reports and AWS OpsWorks to deploy and manage the infrastructure.",
        "Use Amazon CloudWatch metrics and alerts along with resource tagging to deploy and manage the infrastructure.",
        "Use AWS Elastic Beanstalk and AWS CodeCommit to deploy and manage the infrastructure.",
        "Use AWS CloudFormation and AWS CodeCommit to deploy and manage the infrastructure."
      ],
      "ma": [
        3
      ],
      "e": "AWS CloudFormation lets you define infrastructure as templates, deploy the same template repeatedly to create identical stacks, preview changes with change sets, and roll back to a previous state. Storing those templates in AWS CodeCommit gives version control so earlier versions can be restored. OpsWorks with cost reports, CloudWatch metrics with tagging, and Elastic Beanstalk do not provide repeatable, versioned, stageable infrastructure definitions across arbitrary AWS resources. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 215
    },
    {
      "d": 0,
      "q": "A developer is working on an AWS Lambda function that accesses Amazon DynamoDB. The Lambda function must retrieve an item and update some of its attributes, or create the item if it does not exist. The Lambda function has access to the primary key.\nWhich IAM permissions should the developer request for the Lambda function to achieve this functionality?",
      "o": [
        "dynamodb:DeleleItem dynamodb:GetItem dynamodb:PutItem",
        "dynamodb:UpdateItem dynamodb:GetItem dynamodb:DescribeTable",
        "dynamodb:GetRecords dynamodb:PutItem dynamodb:UpdateTable",
        "dynamodb:UpdateItem dynamodb:GetItem dynamodb:PutItem"
      ],
      "ma": [
        3
      ],
      "e": "UpdateItem is an upsert in DynamoDB: it modifies the specified attributes of an existing item and creates the item if the key does not exist, GetItem retrieves the item, and PutItem allows creating or replacing it. UpdateItem, GetItem and PutItem together cover the retrieve, update and create behavior. The other sets include DeleteItem, DescribeTable, UpdateTable (which changes table settings) or GetRecords (a stream/Kinesis API), and none of them supply UpdateItem for partial attribute changes. Community vote: D (80%), B (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 216
    },
    {
      "d": 0,
      "q": "A developer has built a market application that stores pricing data in Amazon DynamoDB with Amazon ElastiCache in front. The prices of items in the market change frequently. Sellers have begun complaining that, after they update the price of an item, the price does not actually change in the product listing.\nWhat could be causing this issue?",
      "o": [
        "The cache is not being invalidated when the price of the item is changed.",
        "The price of the item is being retrieved using a write-through ElastiCache cluster.",
        "The DynamoDB table was provisioned with insufficient read capacity.",
        "The DynamoDB table was provisioned with insufficient write capacity."
      ],
      "ma": [
        0
      ],
      "e": "With a cache placed in front of DynamoDB, a lazy-loading (cache-aside) pattern keeps serving the cached price until the entry expires or is explicitly invalidated, so updates written to DynamoDB are not visible. Invalidating or updating the cache entry when the price changes, or using a short TTL, fixes this. A write-through cache would actually keep the cache current, and insufficient read or write capacity would cause throttling errors rather than stale-but-successful reads. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 217
    },
    {
      "d": 0,
      "q": "A company requires that all applications running on Amazon EC2 use IAM roles to gain access to AWS services. A developer is modifying an application that currently relies on IAM user access keys stored in environment variables to access Amazon DynamoDB tables using boto, the AWS SDK for Python.\nThe developer associated a role with the same permissions as the IAM user to the EC2 instance, then deleted the IAM user. When the application was restarted, the AWS AccessDeniedException messages started appearing in the application logs. The developer was able to use their personal account on the server to run DynamoDB API commands using the AWS CLI.\nWhat is the MOST likely cause of the exception?",
      "o": [
        "IAM policies might take a few minutes to propagate to resources.",
        "Disabled environment variable credentials are still being used by the application.",
        "The AWS SDK does not support credentials obtained using an instance role.",
        "The instance\u2019s security group does not allow access to http://169.254.169.254."
      ],
      "ma": [
        1
      ],
      "e": "The AWS SDK default credential provider chain checks environment variables before the instance profile credentials from the instance metadata service. The application still has the old access key variables set, belonging to the deleted IAM user, so the SDK uses them and DynamoDB rejects the calls. Removing the environment variables lets the SDK fall through to the role credentials. The SDK fully supports instance roles, a security group does not filter calls to the link-local metadata address, and IAM changes propagate within seconds, not a long time. The CLI works because the developer uses personal credentials. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 218
    },
    {
      "d": 0,
      "q": "A company has an existing application that has hardcoded database credentials. A developer needs to modify the existing application. The application is deployed in two AWS Regions with an active-passive failover configuration to meet company\u2019s disaster recovery strategy. The developer needs a solution to store the credentials outside the code. The solution must comply with the company\u2019s disaster recovery strategy. Which solution will meet these requirements in the MOST secure way?",
      "o": [
        "Store the credentials in AWS Secrets Manager in the primary Region. Enable secret replication to the secondary Region. Update the application to use the Amazon Resource Name (ARN) based on the Region.",
        "Store credentials in AWS Systems Manager Parameter Store in the primary Region. Enable parameter replication to the secondary Region. Update the application to use the Amazon Resource Name (ARN) based on the Region.",
        "Store credentials in a config file. Upload the config file to an S3 bucket in the primary Region. Enable Cross-Region Replication (CRR) to an S3 bucket in the secondary region. Update the application to access the config file from the S3 bucket, based on the Region.",
        "Store credentials in a config file. Upload the config file to an Amazon Elastic File System (Amazon EFS) file system. Update the application to use the Amazon EFS file system Regional endpoints to access the config file in the primary and secondary Regions."
      ],
      "ma": [
        0
      ],
      "e": "AWS Secrets Manager supports multi-Region secret replication, which keeps a read-only replica of the secret (encrypted with a KMS key in the target Region) in the secondary Region so the application can fetch it by Region-specific ARN during failover, and it removes hardcoded credentials securely. Parameter Store has no built-in cross-Region replication, and plaintext config files in S3 with CRR or on EFS keep credentials in files that are less secure and not designed for secret management. Community vote: A (67%), B (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 219
    },
    {
      "d": 0,
      "q": "A developer is receiving HTTP 400: ThrottlingException errors intermittently when calling the Amazon CloudWatch API. When a call fails, no data is retrieved.\nWhat best practice should first be applied to address this issue?",
      "o": [
        "Contact AWS Support for a limit increase.",
        "Use the AWS CLI to get the metrics.",
        "Analyze the applications and remove the API call.",
        "Retry the call with exponential backoff."
      ],
      "ma": [
        3
      ],
      "e": "A ThrottlingException from the CloudWatch API means the request rate exceeded the API limits for the account, and the standard best practice is to retry with exponential backoff (with jitter), which the AWS SDKs support natively. Calls are intermittent so backing off will let later retries succeed. Asking for a limit increase is not the first step, the CLI is subject to the same API throttling, and removing the call would lose the data the application needs. Community vote: D (75%), A (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 220
    },
    {
      "d": 0,
      "q": "An application needs to use the IP address of the client in its processing. The application has been moved into AWS and has been placed behind an Application Load Balancer (ALB). However, all the client IP addresses now appear to be the same. The application must maintain the ability to scale horizontally.\nBased on this scenario, what is the MOST cost-effective solution to this problem?",
      "o": [
        "Remove the application from the ALB. Delete the ALB and change Amazon Route 53 to direct traffic to the instance running the application.",
        "Remove the application from the ALCreate a Classic Load Balancer in its place. Direct traffic to the application using the HTTP protocol.",
        "Alter the application code to inspect the X-Forwarded-For header. Ensure that the code can work properly if a list of IP addresses is passed in the header.",
        "Alter the application code to inspect a custom header. Alter the client code to pass the IP address in the custom header."
      ],
      "ma": [
        2
      ],
      "e": "An Application Load Balancer terminates the client connection and opens a new one to the target, so the application sees the ALB's address as the source. The ALB adds an X-Forwarded-For header containing the original client IP (and any proxy IPs appended in a comma-separated list), so changing the application to parse that header keeps horizontal scaling at the lowest cost. Removing the load balancer gives up scaling, a Classic Load Balancer is not needed because the header solves the problem, and requiring clients to send a custom header is unreliable and spoofable. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 221
    },
    {
      "d": 0,
      "q": "A developer is designing a serverless application that customers use to select seats for a concert venue. Customers send the ticket requests to an Amazon API Gateway API with an AWS Lambda function that acknowledges the order and generates an order ID. The application includes two additional Lambda functions: one for inventory management and one for payment processing. These two Lambda functions run in parallel and write the order to an Amazon Dynamo DB table.\nThe application must provide seats to customers according to the following requirements. If a seat is accidently sold more than once, the first order that the application received must get the seat. In these cases, the application must process the payment for only the first order. However, if the first order is rejected during payment processing, the second order must get the seat. In these cases, the application must process the payment for the second order.\nWhich solution will meet these requirements?",
      "o": [
        "Send the order ID to an Amazon Simple Notification Service (Amazon SNS) FIFO topic that fans out to one Amazon Simple Queue Service (Amazon SQS) FIFO queue for inventory management and another SQS FIFO queue for payment processing.",
        "Change the Lambda function that generates the order ID to initiate the Lambda function for inventory management. Then initiate the Lambda function for payment processing.",
        "Send the order ID to an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe the Lambda functions for inventory management and payment processing to the topic.",
        "Deliver the order ID to an Amazon Simple Queue Service (Amazon SQS) queue. Configure the Lambda functions for inventory management and payment processing to poll the queue."
      ],
      "ma": [
        0
      ],
      "e": "An SNS FIFO topic fanning out to SQS FIFO queues preserves ordering and deduplicates by message group, so both the inventory and payment consumers see orders in the order they were received, which lets the first order claim the seat and a rejected payment pass the seat to the next order. Standard SNS topics and standard SQS queues give only best-effort ordering and at-least-once delivery. Chaining the Lambda functions sequentially removes the parallel processing and does not provide ordering across concurrent requests. Community vote: A (67%), B (17%), D (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 222
    },
    {
      "d": 0,
      "q": "An application uses AWS X-Ray to generate a large amount of trace data on an hourly basis. A developer wants to use filter expressions to limit the returned results through user-specified custom attributes.\nHow should the developer use filter expressions to filter the results in X-Ray?",
      "o": [
        "Add custom attributes as annotations in the segment document.",
        "Add custom attributes as metadata in the segment document.",
        "Add custom attributes as new segment fields in the segment document.",
        "Create new sampling rules that are based on custom attributes."
      ],
      "ma": [
        0
      ],
      "e": "In AWS X-Ray, annotations are key-value pairs that are indexed, so they can be used in filter expressions and groups to search traces by custom attributes. Metadata is not indexed and cannot be used in filter expressions, arbitrary new segment fields are not allowed by the segment document schema, and sampling rules control how many requests are traced by service, URL, or method, not how results are filtered afterwards. Community vote: A (89%), B (11%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 223
    },
    {
      "d": 0,
      "q": "A web application is using Amazon Kinesis Data Streams for clickstream data that may not be consumed for up to 12 hours.\nHow can the developer implement encryption at rest for data within the Kinesis Data Streams?",
      "o": [
        "Enable SSL connections to Kinesis.",
        "Use Amazon Kinesis Consumer Library.",
        "Encrypt the data once it is at rest with a Lambda function.",
        "Enable server-side encryption in Kinesis Data Streams."
      ],
      "ma": [
        3
      ],
      "e": "Kinesis Data Streams supports server-side encryption using AWS KMS, which encrypts data before it is stored in the stream's storage layer and decrypts it when consumers read, so records are protected at rest for the retention period. SSL/TLS only protects data in transit, the Kinesis Client Library does not encrypt stored data, and a Lambda function could only encrypt after the data is already stored unencrypted. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 224
    },
    {
      "d": 0,
      "q": "An application is real-time processing millions of events that are received through an API.\nWhat service could be used to allow multiple consumers to process the data concurrently and MOST cost-effectively?",
      "o": [
        "Amazon SNS with fanout to an SQS queue for each application",
        "Amazon SNS with fanout to an SQS FIFO (first-in, first-out) queue for each application",
        "Amazon Kinesis Firehose",
        "Amazon Kinesis Data Streams"
      ],
      "ma": [
        3
      ],
      "e": "Kinesis Data Streams is built for real-time ingestion of very high volumes of events and lets multiple consumers read the same shards concurrently (shared throughput or enhanced fan-out), and it is the cheapest way to handle millions of events per day with several consumers. SNS with SQS queues per application (standard or FIFO) multiplies per-message charges and FIFO throughput is limited, and Kinesis Data Firehose is a delivery service to destinations such as S3 and is not intended for multiple custom consumers processing the data in real time. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 225
    },
    {
      "d": 0,
      "q": "Given the following AWS CloudFormation template:\nWhat is the MOST efficient way to reference the new Amazon S3 bucket from another AWS CloudFormation template?",
      "o": [
        "Add an Export declaration to the Outputs section of the original template and use ImportValue in other templates.",
        "Add Exported: true to the Content.Bucket in the original template and use ImportResource in other templates.",
        "Create a custom AWS CloudFormation resource that gets the bucket name from the ContentBucket resource of the first stack.",
        "Use Fn::Include to include the existing template in other templates and use the ContentBucket resource directly."
      ],
      "ma": [
        0
      ],
      "e": "The template defines a bucket and an output with a !Ref to it. To share the bucket name with other stacks, add an Export name to the output in the Outputs section and reference it from other templates with the Fn::ImportValue intrinsic function, which is the native cross-stack reference mechanism. There is no Exported property on resources or an ImportResource function, Fn::Include is not a way to reuse resources from another stack, and a custom resource would add needless complexity. Community vote: A (100%).",
      "images": [
        {
          "path": "assets/q226-s1.png",
          "alt": "Question 226 diagram"
        }
      ],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 226
    },
    {
      "d": 0,
      "q": "A developer has built an application that inserts data into an Amazon DynamoDB table. The table is configured to use provisioned capacity. The application is deployed on a burstable nano Amazon EC2 instance. The application logs show that the application has been failing because of a ProvisionedThroughputExceededException error.\nWhich actions should the developer take to resolve this issue? (Choose two.)",
      "o": [
        "Move the application to a larger EC2 instance.",
        "Increase the number of read capacity units (RCUs) that are provisioned for the DynamoDB table.",
        "Reduce the frequency of requests to DynamoDB by implementing exponential backoff.",
        "Increase the frequency of requests to DynamoDB by decreasing the retry delay.",
        "Change the capacity mode of the DynamoDB table from provisioned to on-demand."
      ],
      "ma": [
        2,
        4
      ],
      "e": "ProvisionedThroughputExceededException on writes means the table's write capacity is too low for the burst of requests, so switching the table to on-demand capacity mode removes the need to size throughput in advance and absorbs the traffic. The application should also retry with exponential backoff, which reduces the request rate during throttling and is the recommended practice that the SDK follows. Increasing RCUs does not help writes, a larger instance would only send more requests faster, and shortening the retry delay makes throttling worse. Community vote: CE (60%), BC (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 227
    },
    {
      "d": 0,
      "q": "A company is hosting a workshop for external users and wants to share the reference documents with the external users for 7 days. The company stores the reference documents in an Amazon S3 bucket that the company owns.\nWhat is the MOST secure way to share the documents with the external users?",
      "o": [
        "Use S3 presigned URLs to share the documents with the external users. Set an expiration time of 7 days.",
        "Move the documents to an Amazon WorkDocs folder. Share the links of the WorkDocs folder with the external users.",
        "Create temporary IAM users that have read-only access to the S3 bucket. Share the access keys with the external users. Expire the credentials after 7 days.",
        "Create a role that has read-only access to the S3 bucket. Share the Amazon Resource Name (ARN) of this role with the external users."
      ],
      "ma": [
        0
      ],
      "e": "An S3 presigned URL grants time-limited access to a specific object without sharing credentials or making the bucket public, and a URL signed with IAM user credentials can be valid for up to 7 days (604,800 seconds), which matches the workshop window. WorkDocs would require moving the files and managing external accounts, sharing access keys for temporary IAM users exposes long-lived secrets, and a role ARN cannot be used by external people to access the bucket without them having an AWS principal to assume it. Community vote: A (75%), B (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 228
    },
    {
      "d": 0,
      "q": "A developer is planning to use an Amazon API Gateway and AWS Lambda to provide a REST API. The developer will have three distinct environments to manage: development, test, and production.\nHow should the application be deployed while minimizing the number of resources to manage?",
      "o": [
        "Create a separate API Gateway and separate Lambda function for each environment in the same Region.",
        "Assign a Region for each environment and deploy API Gateway and Lambda to each Region.",
        "Create one API Gateway with multiple stages with one Lambda function with multiple aliases.",
        "Create one API Gateway and one Lambda function, and use a REST parameter to identify the environment."
      ],
      "ma": [
        2
      ],
      "e": "A single API Gateway REST API supports multiple stages (dev, test, prod) with stage variables, and each stage can point to a different Lambda alias of one Lambda function (for example dev, test, prod aliases mapped to versions). This keeps only one API and one function to manage. Separate APIs and functions per environment or per Region multiply the resources, and passing the environment in a REST parameter is insecure and does not isolate the environments. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 229
    },
    {
      "d": 0,
      "q": "A developer registered an AWS Lambda function as a target for an Application Load Balancer (ALB) using a CLI command. However, the Lambda function is not being invoked when the client sends requests through the ALB.\nWhy is the Lambda function not being invoked?",
      "o": [
        "A Lambda function cannot be registered as a target for an ALB.",
        "A Lambda function can be registered with an ALB using AWS Management Console only.",
        "The permissions to invoke the Lambda function are missing.",
        "Cross-zone is not enabled on the ALB."
      ],
      "ma": [
        2
      ],
      "e": "When a Lambda function is registered as an ALB target, the ALB needs a resource-based policy on the function that lets elasticloadbalancing.amazonaws.com invoke it. The console adds this permission automatically, but with the CLI the developer must run aws lambda add-permission, so a missing invoke permission is why the function is never called. Lambda can be an ALB target through both the console and CLI, and cross-zone load balancing is irrelevant to Lambda targets. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 230
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Lambda function that will connect to an Amazon RDS for MySQL instance. The developer wants to store the database credentials. The database credentials need to be encrypted and the database password needs to be automatically rotated. Which solution will meet these requirements?",
      "o": [
        "Store the database credentials as environment variables for the Lambda function. Set the environment variables to rotate automatically.",
        "Store the database credentials in AWS Secrets Manager. Set up managed rotation on the database credentials.",
        "Store the database credentials in AWS Systems Manager Parameter Store as secure string parameters. Set up managed rotation on the parameters.",
        "Store the database credentials in the X-Amz-Security-Token parameter. Set up managed rotation on the parameter."
      ],
      "ma": [
        1
      ],
      "e": "AWS Secrets Manager stores secrets encrypted with AWS KMS and has built-in managed rotation for Amazon RDS credentials, using a rotation Lambda function that updates both the secret and the database password on a schedule. Lambda environment variables cannot rotate automatically, Parameter Store SecureString parameters do not offer managed rotation, and X-Amz-Security-Token is the header for STS session tokens, not a place to keep database credentials. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 231
    },
    {
      "d": 0,
      "q": "A developer wants to reduce risk when deploying a new version of an existing AWS Lambda function. To test the Lambda function, the developer needs to split the traffic between the existing version and the new version of the Lambda function.\nWhich solution will meet these requirements?",
      "o": [
        "Configure a weighted routing policy in Amazon Route 53. Associate the versions of the Lambda function with the weighted routing policy.",
        "Create a function alias. Configure the alias to split the traffic between the two versions of the Lambda function.",
        "Create an Application Load Balancer (ALB) that uses the Lambda function as a target. Configure the ALB to split the traffic between the two versions of the Lambda function.",
        "Create the new version of the Lambda function as a Lambda layer on the existing version. Configure the function to split the traffic between the two layers."
      ],
      "ma": [
        1
      ],
      "e": "A Lambda alias can point to two function versions and split invocation traffic between them by weight (for example 90 percent to the current version and 10 percent to the new one), which gives a controlled canary-style test of the new version. Route 53 weighted routing works on DNS records and not Lambda versions, an ALB target group pointing at a function cannot split between versions, and a layer is a package of libraries and not a deployable version of the function. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 232
    },
    {
      "d": 0,
      "q": "A developer has created a large AWS Lambda function. Deployment of the function is failing because of an InvalidParameterValueException error. The error message indicates that the unzipped size of the function exceeds the maximum supported value.\nWhich actions can the developer take to resolve this error? (Choose two.)",
      "o": [
        "Submit a quota increase request to AWS Support to increase the function to the required size.",
        "Use a compression algorithm that is more efficient than ZIP.",
        "Break up the function into multiple smaller functions.",
        "Zip the .zip file twice to compress the file more.",
        "Move common libraries, function dependencies, and custom runtimes into Lambda layers."
      ],
      "ma": [
        2,
        4
      ],
      "e": "Lambda limits the unzipped deployment package to 250 MB including layers, and this is a hard limit that cannot be raised with a quota request. The developer can move shared libraries, dependencies and custom runtimes into Lambda layers (while keeping the combined unzipped size within 250 MB), and can split the function into several smaller functions that each have a smaller package. Zipping repeatedly or using a different compression algorithm does not change the unzipped size, and the limit is not adjustable through Support. Community vote: CE (67%), AD (17%), AE (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 233
    },
    {
      "d": 0,
      "q": "A developer is troubleshooting an application in an integration environment. In the application, an Amazon Simple Queue Service (Amazon SQS) queue consumes messages and then an AWS Lambda function processes the messages. The Lambda function transforms the messages and makes an API call to a third-party service.\nThere has been an increase in application usage. The third-party API frequently returns an HTTP 429 Too Many Requests error message. The error message prevents a significant number of messages from being processed successfully.\nHow can the developer resolve this issue?",
      "o": [
        "Increase the SQS event source\u2019s batch size setting.",
        "Configure provisioned concurrency for the Lambda function based on the third-party API\u2019s documented rate limits.",
        "Increase the retry attempts and maximum event age in the Lambda function\u2019s asynchronous configuration.",
        "Configure maximum concurrency on the SQS event source based on the third-party service\u2019s documented rate limits."
      ],
      "ma": [
        3
      ],
      "e": "Setting maximum concurrency on the SQS event source mapping limits how many concurrent Lambda invocations are made from the queue, so the rate of calls to the third-party API can be kept under its documented limit and messages are not rejected with 429 errors. Increasing the batch size increases the work per invocation without reducing request rate, provisioned concurrency only pre-warms environments and does not limit concurrency, and asynchronous invocation retry settings do not apply to SQS event source mappings. Community vote: D (45%), B (36%), C (18%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 234
    },
    {
      "d": 0,
      "q": "A company has a three-tier application that is deployed in Amazon Elastic Container Service (Amazon ECS). The application is using an Amazon RDS for MySQL DB instance. The application performs more database reads than writes.\nDuring times of peak usage, the application\u2019s performance degrades. When this performance degradation occurs, the DB instance\u2019s ReadLatency metric in Amazon CloudWatch increases suddenly.\nHow should a developer modify the application to improve performance?",
      "o": [
        "Use Amazon ElastiCache to cache query results.",
        "Scale the ECS cluster to contain more ECS instances.",
        "Add read capacity units (RCUs) to the DB instance.",
        "Modify the ECS task definition to increase the task memory."
      ],
      "ma": [
        0
      ],
      "e": "The workload is read heavy and the RDS instance's read latency is rising at peak, so caching frequently read query results in Amazon ElastiCache (Redis or Memcached) offloads reads from the database and reduces latency. Adding ECS instances or task memory scales the application tier but the bottleneck is the database, and RCUs are a DynamoDB concept that does not exist for RDS instances. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 235
    },
    {
      "d": 0,
      "q": "A company has an online web application that includes a product catalog. The catalog is stored in an Amazon S3 bucket that is named DOC- EXAMPLE-BUCKET. The application must be able to list the objects in the S3 bucket and must be able to download objects through an IAM policy. Which policy allows MINIMUM access to meet these requirements?",
      "o": [
        "",
        "",
        "",
        ""
      ],
      "ma": [
        0
      ],
      "e": "The application needs only to list the bucket and download objects, so the policy should allow s3:ListBucket on the bucket ARN (arn:aws:s3:::DOC-EXAMPLE-BUCKET) and s3:GetObject on the object ARN (DOC-EXAMPLE-BUCKET/*), which is exactly option A. Option B grants s3:* on objects, option C also allows PutObject and DeleteObject, and option D denies GetObject, which would block the downloads. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [
          {
            "path": "assets/q236-A1.png",
            "alt": "Question 236 option A"
          }
        ],
        [
          {
            "path": "assets/q236-B1.png",
            "alt": "Question 236 option B"
          }
        ],
        [
          {
            "path": "assets/q236-C1.png",
            "alt": "Question 236 option C"
          }
        ],
        [
          {
            "path": "assets/q236-D1.png",
            "alt": "Question 236 option D"
          }
        ]
      ],
      "sourceNumber": 236
    },
    {
      "d": 0,
      "q": "A developer is writing an application to encrypt files outside of AWS before uploading the files to an Amazon S3 bucket. The encryption must be symmetric and must be performed inside the application.\nHow can the developer implement the encryption in the application to meet these requirements?",
      "o": [
        "Create a data key in AWS Key Management Service (AWS KMS). Use the AWS Encryption SDK to encrypt the files.",
        "Create a Hash-Based Message Authentication Code (HMAC) key in AWS Key Management Service (AWS KMS). Use the AWS Encryption SDK to encrypt the files.",
        "Create a data key pair in AWS Key Management Service (AWS KMS). Use the AWS CLI to encrypt the files.",
        "Create a data key in AWS Key Management Service (AWS KMS). Use the AWS CLI to encrypt the files."
      ],
      "ma": [
        0
      ],
      "e": "Creating a data key in AWS KMS gives a plaintext key for local symmetric encryption and an encrypted copy to store with the file, and the AWS Encryption SDK implements envelope encryption on the client side with these keys, so encryption happens inside the application before upload. An HMAC key is used to generate and verify message authentication codes and not to encrypt, a data key pair is asymmetric, and the AWS CLI cannot perform client-side encryption of files inside the application with a KMS data key. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 237
    },
    {
      "d": 0,
      "q": "A developer is working on an application that is deployed on an Amazon EC2 instance. The developer needs a solution that will securely transfer files from the application to an Amazon S3 bucket.\nWhat should the developer do to meet these requirements in the MOST secure way?",
      "o": [
        "Create an IAM user. Create an access key for the IAM user. Store the access key in the application\u2019s environment variables.",
        "Create an IAM role. Create an access key for the IAM role. Store the access key in the application\u2019s environment variables.",
        "Create an IAM role. Configure the IAM role to access the specific Amazon S3 API calls the application requires. Associate the IAM role with the EC2 instance.",
        "Configure an S3 bucket policy for the S3 bucket. Configure the S3 bucket policy to allow access for the EC2 instance ID."
      ],
      "ma": [
        2
      ],
      "e": "An IAM role with a least-privilege policy for the specific S3 actions, attached to the EC2 instance through an instance profile, gives the application temporary credentials that are rotated automatically and never stored on disk. IAM user access keys in environment variables are long-lived secrets, roles do not have access keys, and an S3 bucket policy cannot grant access based on an EC2 instance ID. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 238
    },
    {
      "d": 0,
      "q": "A developer created a web API that receives requests by using an internet-facing Application Load Balancer (ALB) with an HTTPS listener. The developer configures an Amazon Cognito user pool and wants to ensure that every request to the API is authenticated through Amazon Cognito. What should the developer do to meet this requirement?",
      "o": [
        "Add a listener rule to the listener to return a fixed response if the Authorization header is missing. Set the fixed response to 401 Unauthorized.",
        "Create an authentication action for the listener rules of the ALSet the rule action type to authenticate-cognito. Set the OnUnauthenticatedRequest field to \u201cdeny.\u201d",
        "Create an Amazon API Gateway API. Configure all API methods to be forwarded to the ALB endpoint. Create an authorizer of the COGNITO_USER_POOLS type. Configure every API method to use that authorizer.",
        "Create a new target group that includes an AWS Lambda function target that validates the Authorization header by using Amazon Cognito. Associate the target group with the listener."
      ],
      "ma": [
        1
      ],
      "e": "An Application Load Balancer HTTPS listener supports a built-in authenticate-cognito action in listener rules, which redirects unauthenticated users to the Cognito user pool, and setting OnUnauthenticatedRequest to deny rejects requests that are not authenticated with an HTTP 401. This enforces authentication with no code. Checking only for a missing Authorization header does not validate it, adding API Gateway in front of the ALB is extra infrastructure, and a Lambda target group would not sit in front of the existing targets to validate tokens. Community vote: B (70%), C (30%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 239
    },
    {
      "d": 0,
      "q": "A company recently deployed an AWS Lambda function. A developer notices an increase in the function throttle metrics in Amazon CloudWatch. What are the MOST operationally efficient solutions to reduce the function throttling? (Choose two.)",
      "o": [
        "Migrate the function to Amazon Elastic Kubernetes Service (Amazon EKS).",
        "Increase the maximum age of events in Lambda.",
        "Increase the function\u2019s reserved concurrency.",
        "Add the lambda:GetFunctionConcurrency action to the execution role.",
        "Request a service quota change for increased concurrency."
      ],
      "ma": [
        2,
        4
      ],
      "e": "Throttling happens when a function reaches its concurrency limit, so raising the function's reserved concurrency (provided unreserved account concurrency is available) guarantees more concurrent executions for that function, and requesting an account-level concurrency quota increase raises the total pool available. Migrating to EKS is a major change, increasing the maximum event age only affects how long asynchronous events are retried, and the lambda:GetFunctionConcurrency permission only lets someone read the setting. Community vote: CE (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 240
    },
    {
      "d": 0,
      "q": "A company is creating a REST service using an Amazon API Gateway with AWS Lambda integration. The service must run different versions for testing purposes.\nWhat would be the BEST way to accomplish this?",
      "o": [
        "Use an X-Version header to denote which version is being called and pass that header to the Lambda function(s).",
        "Create an API Gateway Lambda authorizer to route API clients to the correct API version.",
        "Create an API Gateway resource policy to isolate versions and provide context to the Lambda function(s).",
        "Deploy the API versions as unique stages with unique endpoints and use stage variables to provide further context."
      ],
      "ma": [
        3
      ],
      "e": "API Gateway stages are designed for multiple deployments of the same API, each stage with its own invoke URL, and stage variables can pass the version or Lambda alias context to the backend. This provides clean separation of the versions for testing. Passing a custom header means the same endpoint serves every version and needs custom routing logic, Lambda authorizers are for authentication and authorization, and a resource policy controls who can call the API and not which version they hit. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 241
    },
    {
      "d": 0,
      "q": "A company is using AWS CodePipeline to deliver one of its applications. The delivery pipeline is triggered by changes to the main branch of an AWS CodeCommit repository and uses AWS CodeBuild to implement the test and build stages of the process and AWS CodeDeploy to deploy the application.\nThe pipeline has been operating successfully for several months and there have been no modifications. Following a recent change to the application\u2019s source code, AWS CodeDeploy has not deployed the updated application as expected.\nWhat are the possible causes? (Choose two.)",
      "o": [
        "The change was not made in the main branch of the AWS CodeCommit repository.",
        "One of the earlier stages in the pipeline failed and the pipeline has terminated.",
        "One of the Amazon EC2 instances in the company\u2019s AWS CodePipeline cluster is inactive.",
        "The AWS CodePipeline is incorrectly configured and is not invoking AWS CodeDeploy.",
        "AWS CodePipeline does not have permissions to access AWS CodeCommit."
      ],
      "ma": [
        0,
        1
      ],
      "e": "The pipeline ran successfully for months, so the likely causes are about this change: the pipeline source is the main branch of the CodeCommit repository, so a commit to another branch never triggers it, and if an earlier stage such as the CodeBuild test or build action failed, the pipeline stops and never reaches the CodeDeploy stage. The pipeline had no modifications, so a misconfigured deploy action or a lost CodeCommit permission is unlikely, and CodePipeline does not run on a cluster of EC2 instances you manage. Community vote: AB (67%), BC (17%), BD (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 242
    },
    {
      "d": 0,
      "q": "A developer is building a serverless application by using AWS Serverless Application Model (AWS SAM) on multiple AWS Lambda functions. When the application is deployed, the developer wants to shift 10% of the traffic to the new deployment of the application for the first 10 minutes after deployment. If there are no issues, all traffic must switch over to the new version.\nWhich change to the AWS SAM template will meet these requirements?",
      "o": [
        "Set the Deployment Preference Type to Canary10Percent10Minutes. Set the AutoPublishAlias property to the Lambda alias.",
        "Set the Deployment Preference Type to Linear10PercentEvery10Minutes. Set AutoPublishAlias property to the Lambda alias.",
        "Set the Deployment Preference Type to Canary10Percent10Minutes. Set the PreTraffic and PostTraffic properties to the Lambda alias.",
        "Set the Deployment Preference Type to Linear10PercentEvery10Minutes. Set PreTraffic and PostTraffic properties to the Lambda alias."
      ],
      "ma": [
        0
      ],
      "e": "In AWS SAM, the DeploymentPreference property with Type Canary10Percent10Minutes shifts 10 percent of traffic to the new version for 10 minutes and then moves the remaining 90 percent, matching the requirement, and AutoPublishAlias is required so SAM publishes a new version and creates the alias that CodeDeploy shifts traffic on. The Linear10PercentEvery10Minutes type shifts 10 percent every 10 minutes gradually and does not switch all at once, and PreTraffic and PostTraffic are hook functions for validation and not alias settings. Community vote: A (83%), C (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 243
    },
    {
      "d": 0,
      "q": "An AWS Lambda function is running in a company\u2019s shared AWS account. The function needs to perform an additional ec2:DescribeInstances action that is directed at the company\u2019s development accounts. A developer must configure the required permissions across the accounts. How should the developer configure the permissions to adhere to the principle of least privilege?",
      "o": [
        "Create an IAM role in the shared account. Add the ec2:DescribeInstances permission to the role. Establish a trust relationship between the development accounts for this role. Update the Lambda function IAM role in the shared account by adding the ec2:DescribeInstances permission to the role.",
        "Create an IAM role in the development accounts. Add the ec2:DescribeInstances permission to the role. Establish a trust relationship with the shared account for this role. Update the Lambda function IAM role in the shared account by adding the iam:AssumeRole permissions.",
        "Create an IAM role in the shared account. Add the ec2:DescribeInstances permission to the role. Establish a trust relationship between the development accounts for this role. Update the Lambda function IAM role in the shared account by adding the iam:AssumeRole permissions.",
        "Create an IAM role in the development accounts. Add the ec2:DescribeInstances permission to the role. Establish a trust relationship with the shared account for this role. Update the Lambda function IAM role in the shared account by adding the ec2:DescribeInstances permission to the role."
      ],
      "ma": [
        1
      ],
      "e": "For cross-account access, the role that holds the ec2:DescribeInstances permission must be created in each development account with a trust policy that trusts the shared account, and the Lambda function's execution role in the shared account is given sts:AssumeRole permission for those roles. This follows least privilege because the function receives temporary credentials only for the needed action in the target accounts. Creating the role in the shared account cannot grant access to resources in the development accounts, and adding ec2:DescribeInstances only to the Lambda role in the shared account would let it describe instances in the shared account. Community vote: B (67%), C (17%), A (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 244
    },
    {
      "d": 0,
      "q": "A developer is building a new application that will be deployed on AWS. The developer has created an AWS CodeCommit repository for the application. The developer has initialized a new project for the application by invoking the AWS Cloud Development Kit (AWS CDK) cdk init command.\nThe developer must write unit tests for the infrastructure as code (IaC) templates that the AWS CDK generates. The developer also must run a validation tool across all constructs in the CDK application to ensure that critical security configurations are activated.\nWhich combination of actions will meet these requirements with the LEAST development overhead? (Choose two.)",
      "o": [
        "Use a unit testing framework to write custom unit tests against the cdk.out file that the AWS CDK generates. Run the unit tests in a continuous integration and continuous delivery (CI/CD) pipeline that is invoked after any commit to the repository.",
        "Use the CDK assertions module to integrate unit tests with the application. Run the unit tests in a continuous integration and continuous delivery (CI/CD) pipeline that is invoked after any commit to the repository.",
        "Use the CDK runtime context to set key-value pairs that must be present in the cdk.out file that the AWS CDK generates. Fail the stack synthesis if any violations are present.",
        "Write a script that searches the application for specific key configuration strings. Configure the script to produce a report of any security violations.",
        "Use the CDK Aspects class to create custom rules to apply to the CDK application. Fall the stack synthesis if any violations are present."
      ],
      "ma": [
        1,
        4
      ],
      "e": "The CDK assertions module (aws-cdk-lib/assertions) provides fine-grained and snapshot assertions against synthesized CloudFormation templates and plugs into standard test frameworks, so unit tests can be written with little effort and run in a CI/CD pipeline. CDK Aspects visit every construct in the app during synthesis, which makes them the right way to apply rules that enforce security settings and fail synthesis when a construct violates them. Testing the cdk.out file by hand, using runtime context, or writing search scripts requires more custom work and does not evaluate constructs. Community vote: BE (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 245
    },
    {
      "d": 0,
      "q": "An online sales company is developing a serverless application that runs on AWS. The application uses an AWS Lambda function that calculates order success rates and stores the data in an Amazon DynamoDB table. A developer wants an efficient way to invoke the Lambda function every 15 minutes.\nWhich solution will meet this requirement with the LEAST development effort?",
      "o": [
        "Create an Amazon EventBridge rule that has a rate expression that will run the rule every 15 minutes. Add the Lambda function as the target of the EventBridge rule.",
        "Create an AWS Systems Manager document that has a script that will invoke the Lambda function on Amazon EC2. Use a Systems Manager Run Command task to run the shell script every 15 minutes.",
        "Create an AWS Step Functions state machine. Configure the state machine to invoke the Lambda function execution role at a specified interval by using a Wait state. Set the interval to 15 minutes.",
        "Provision a small Amazon EC2 instance. Set up a cron job that invokes the Lambda function every 15 minutes."
      ],
      "ma": [
        0
      ],
      "e": "An Amazon EventBridge rule with a schedule (rate(15 minutes)) that targets the Lambda function invokes it on a schedule with no servers or code to maintain, and it takes only a few minutes to configure. Systems Manager Run Command, an EC2 cron job, and a Step Functions Wait loop all require building and maintaining extra infrastructure or logic, and a Step Functions state machine invokes the function itself and not its execution role. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 246
    },
    {
      "d": 0,
      "q": "A company deploys a photo-processing application to an Amazon EC2 instance. The application needs to process each photo in less than 5 seconds. If processing takes longer than 5 seconds, the company\u2019s development team must receive a notification.\nHow can a developer implement the required time measurement and notification with the LEAST operational overhead?",
      "o": [
        "Create an Amazon CloudWatch custom metric. Each time a photo is processed, publish the processing time as a metric value. Create a CloudWatch alarm that is based on a static threshold of 5 seconds. Notify the development team by using an Amazon Simple Notification Service (Amazon SNS) topic.",
        "Create an Amazon Simple Queue Service (Amazon SQS) queue. Each time a photo is processed, publish the processing time to the queue. Create an application to consume from the queue and to determine whether any values are more than 5 seconds. Notify the development team by using an Amazon Simple Notification Service (Amazon SNS) topic.",
        "Create an Amazon CloudWatch custom metric. Each time a photo is processed, publish the processing time as a metric value. Create a CloudWatch alarm that enters ALARM state if the average of values is greater than 5 seconds. Notify the development team by sending an Amazon Simple Email Service (Amazon SES) message.",
        "Create an Amazon Kinesis data stream. Each time a photo is processed, publish the processing time to the data stream. Create an Amazon CloudWatch alarm that enters ALARM state if any values are more than 5 seconds. Notify the development team by using an Amazon Simple Notification Service (Amazon SNS) topic."
      ],
      "ma": [
        0
      ],
      "e": "Publishing the processing time as a CloudWatch custom metric (for example with PutMetricData or the embedded metric format) and creating a CloudWatch alarm with a static threshold of 5 seconds that notifies an SNS topic needs no extra infrastructure to run. The alarm in option C uses the average, which could hide individual slow photos, and CloudWatch alarms notify through SNS and not SES. Using SQS or Kinesis requires building and operating a consumer application, and CloudWatch alarms cannot read directly from a Kinesis stream. Community vote: A (75%), C (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 247
    },
    {
      "d": 0,
      "q": "A company is using AWS Elastic Beanstalk to manage web applications that are running on Amazon EC2 instances. A developer needs to make configuration changes. The developer must deploy the changes to new instances only.\nWhich types of deployment can the developer use to meet this requirement? (Choose two.)",
      "o": [
        "All at once",
        "Immutable",
        "Rolling",
        "Blue/green",
        "Rolling with additional batch"
      ],
      "ma": [
        1,
        3
      ],
      "e": "Immutable deployments launch a full new set of instances in a separate Auto Scaling group with the new configuration and then replace the old ones, and blue/green deployments create a completely new environment and swap the CNAMEs, so both apply changes only to new instances. All at once and rolling deployments update the existing instances in place, and rolling with additional batch also updates existing instances in batches after launching an extra batch. Community vote: BD (71%), BE (29%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 248
    },
    {
      "d": 0,
      "q": "A developer needs to use Amazon DynamoDB to store customer orders. The developer\u2019s company requires all customer data to be encrypted at rest with a key that the company generates.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Create the DynamoDB table with encryption set to None. Code the application to use the key to decrypt the data when the application reads from the table. Code the application to use the key to encrypt the data when the application writes to the table.",
        "Store the key by using AWS Key Management Service (AWS KMS). Choose an AWS KMS customer managed key during creation of the DynamoDB table. Provide the Amazon Resource Name (ARN) of the AWS KMS key.",
        "Store the key by using AWS Key Management Service (AWS KMS). Create the DynamoDB table with default encryption. Include the kms:Encrypt parameter with the Amazon Resource Name (ARN) of the AWS KMS key when using the DynamoDB software development kit (SDK).",
        "Store the key by using AWS Key Management Service (AWS KMS). Choose an AWS KMS AWS managed key during creation of the DynamoDB table. Provide the Amazon Resource Name (ARN) of the AWS KMS key."
      ],
      "ma": [
        1
      ],
      "e": "DynamoDB encrypts all tables at rest, and to use a key the company generates, the key can be stored or imported in AWS KMS as a customer managed key and selected when the table is created by providing its ARN, so DynamoDB uses it for server-side encryption. Encrypting in the application with encryption set to None adds code and the table would not be encrypted by DynamoDB, the default encryption uses an AWS owned key, and an AWS managed key is generated and controlled by AWS and not by the company. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 249
    },
    {
      "d": 0,
      "q": "A company uses AWS CloudFormation to deploy an application that uses an Amazon API Gateway REST API with AWS Lambda function integration. The application uses Amazon DynamoDB for data persistence. The application has three stages: development, testing, and production. Each stage uses its own DynamoDB table.\nThe company has encountered unexpected issues when promoting changes to the production stage. The changes were successful in the development and testing stages. A developer needs to route 20% of the traffic to the new production stage API with the next production release. The developer needs to route the remaining 80% of the traffic to the existing production stage. The solution must minimize the number of errors that any single customer experiences.\nWhich approach should the developer take to meet these requirements?",
      "o": [
        "Update 20% of the planned changes to the production stage. Deploy the new production stage. Monitor the results. Repeat this process five times to test all planned changes.",
        "Update the Amazon Route 53 DNS record entry for the production stage API to use a weighted routing policy. Set the weight to a value of 80. Add a second record for the production domain name. Change the second routing policy to a weighted routing policy. Set the weight of the second policy to a value of 20. Change the alias of the second policy to use the testing stage API.",
        "Deploy an Application Load Balancer (ALB) in front of the REST API. Change the production API Amazon Route 53 record to point traffic to the ALB. Register the production and testing stages as targets of the ALB with weights of 80% and 20%, respectively.",
        "Configure canary settings for the production stage API. Change the percentage of traffic directed to canary deployment to 20%. Make the planned updates to the production stage. Deploy the changes"
      ],
      "ma": [
        3
      ],
      "e": "API Gateway canary release settings on the production stage let you direct a configurable percentage of traffic (here 20 percent) to a canary deployment while the remaining traffic stays on the existing stage deployment, and API Gateway keeps each client on a consistent path in each request. This gives a gradual rollout with the same stage URL and lets the canary be promoted or rolled back. Updating pieces of the changes repeatedly, using Route 53 weighted records to a testing stage, or putting an ALB in front of API Gateway stages do not provide a controlled production canary of the new release. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 250
    },
    {
      "d": 0,
      "q": "A developer has created a data collection application that uses Amazon API Gateway, AWS Lambda, and Amazon S3. The application\u2019s users periodically upload data files and wait for the validation status to be reflected on a processing dashboard. The validation process is complex and time-consuming for large files.\nSome users are uploading dozens of large files and have to wait and refresh the processing dashboard to see if the files have been validated. The developer must refactor the application to immediately update the validation result on the user\u2019s dashboard without reloading the full dashboard. What is the MOST operationally efficient solution that meets these requirements?",
      "o": [
        "Integrate the client with an API Gateway WebSocket API. Save the user-uploaded files with the WebSocket connection ID. Push the validation status to the connection ID when the processing is complete to initiate an update of the user interface.",
        "Launch an Amazon EC2 micro instance, and set up a WebSocket server. Send the user-uploaded file and user detail to the EC2 instance after the user uploads the file. Use the WebSocket server to send updates to the user interface when the uploaded file is processed.",
        "Save the user\u2019s email address along with the user-uploaded file. When the validation process is complete, send an email notification through Amazon Simple Notification Service (Amazon SNS) to the user who uploaded the file.",
        "Save the user-uploaded file and user detail to Amazon DynamoDB. Use Amazon DynamoDB Streams with Amazon Simple Notification Service (Amazon SNS) push notifications to send updates to the browser to update the user interface."
      ],
      "ma": [
        0
      ],
      "e": "An API Gateway WebSocket API provides a persistent two-way connection with the browser, so when the validation Lambda function finishes it can post the result to the stored connection ID through the connections API and the UI updates immediately without reloading, and everything is fully managed. Running a WebSocket server on EC2 requires managing the instance, email via SNS does not update the dashboard, and SNS cannot push updates directly to a browser UI the way DynamoDB Streams would imply. Community vote: A (75%), D (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 251
    },
    {
      "d": 0,
      "q": "A company\u2019s developer is creating an application that uses Amazon API Gateway. The company wants to ensure that only users in the Sales department can use the application. The users authenticate to the application by using federated credentials from a third-party identity provider (IdP) through Amazon Cognito. The developer has set up an attribute mapping to map an attribute that is named Department and to pass the attribute to a custom AWS Lambda authorizer.\nTo test the access limitation, the developer sets their department to Engineering in the IdP and attempts to log in to the application. The developer is denied access. The developer then updates their department to Sales in the IdP and attempts to log in. Again, the developer is denied access. The developer checks the logs and discovers that access is being denied because the developer\u2019s access token has a department value of Engineering.\nWhich of the following is a possible reason that the developer\u2019s department is still being reported as Engineering instead of Sales?",
      "o": [
        "Authorization caching is enabled in the custom Lambda authorizer.",
        "Authorization caching is enabled on the Amazon Cognito user pool.",
        "The IAM role for the custom Lambda authorizer does not have a Department tag.",
        "The IAM role for the Amazon Cognito user pool does not have a Department tag."
      ],
      "ma": [
        0
      ],
      "e": "A custom Lambda authorizer in API Gateway can cache the authorizer result (policy) for the configured TTL, keyed by the identity source such as the token, so after the department changed in the IdP the cached result with the old Department value continues to be returned until the cache expires. Cognito user pools do not have an authorization caching setting, and IAM role tags are not where the Department claim comes from. Community vote: A (80%), D (10%) B (10%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 252
    },
    {
      "d": 0,
      "q": "A company has migrated an application to Amazon EC2 instances. Automatic scaling is working well for the application user interface. However, the process to deliver shipping requests to the company\u2019s warehouse staff is encountering issues. Duplicate shipping requests are arriving, and some requests are lost or arrive out of order.\nThe company must avoid duplicate shipping requests and must process the requests in the order that the requests arrive. Requests are never more than 250 KB in size and take 5-10 minutes to process. A developer needs to rearchitect the application to improve the reliability of the delivery and processing of the requests.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Create an Amazon Kinesis Data Firehose delivery stream to process the requests. Create an Amazon Kinesis data stream. Modify the application to write the requests to the Kinesis data stream.",
        "Create an AWS Lambda function to process the requests. Create an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe the Lambda function to the SNS topic. Modify the application to write the requests to the SNS topic.",
        "Create an AWS Lambda function to process the requests. Create an Amazon Simple Queue Service (Amazon SQS) standard queue. Set the SQS queue as an event source for the Lambda function. Modify the application to write the requests to the SQS queue.",
        "Create an AWS Lambda function to process the requests. Create an Amazon Simple Queue Service (Amazon SQS) FIFO queue. Set the SQS queue as an event source for the Lambda function. Modify the application to write the requests to the SQS queue."
      ],
      "ma": [
        3
      ],
      "e": "An SQS FIFO queue guarantees first-in-first-out ordering and exactly-once processing within a message group, with deduplication using a deduplication ID, which addresses the duplicates, losses and out-of-order delivery. Processing takes 5 to 10 minutes, though, and Lambda has a 15-minute maximum, so the function fits within its timeout when the queue is the event source. A standard SQS queue and an SNS topic can deliver duplicates and out of order, and Kinesis Data Firehose is a delivery stream to storage destinations and not a worker queue. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 253
    },
    {
      "d": 0,
      "q": "A developer is creating a machine learning (ML) pipeline in AWS Step Functions that contains AWS Lambda functions. The developer has configured an Amazon Simple Queue Service (Amazon SQS) queue to deliver ML model parameters to the ML pipeline to train ML models. The developer uploads the trained models are uploaded to an Amazon S3 bucket.\nThe developer needs a solution that can locally test the ML pipeline without making service integration calls to Amazon SQS and Amazon S3. Which solution will meet these requirements?",
      "o": [
        "Use the Amazon CodeGuru Profiler to analyze the Lambda functions used in the AWS Step Functions pipeline.",
        "Use the AWS Step Functions Local Docker Image to run and locally test the Lambda functions.",
        "Use the AWS Serverless Application Model (AWS SAM) CLI to run and locally test the Lambda functions.",
        "Use AWS Step Functions Local with mocked service integrations."
      ],
      "ma": [
        3
      ],
      "e": "AWS Step Functions Local is a downloadable version of the service for testing state machines on your own machine, and it supports mocked service integrations, so the state machine can be tested with predefined responses and without calling SQS or S3. The Docker image alone still makes real integration calls, SAM CLI tests individual Lambda functions and not the state machine flow, and CodeGuru Profiler analyzes runtime performance and not functional behavior. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 254
    },
    {
      "d": 0,
      "q": "A company runs a batch processing application by using AWS Lambda functions and Amazon API Gateway APIs with deployment stages for development, user acceptance testing, and production. A development team needs to configure the APIs in the deployment stages to connect to third-party service endpoints.\nWhich solution will meet this requirement?",
      "o": [
        "Store the third-party service endpoints in Lambda layers that correspond to the stage.",
        "Store the third-party service endpoints in API Gateway stage variables that correspond to the stage.",
        "Encode the third-party service endpoints as query parameters in the API Gateway request URL.",
        "Store the third-party service endpoint for each environment in AWS AppConfig."
      ],
      "ma": [
        1
      ],
      "e": "API Gateway stage variables act like environment variables for a stage, so the integration endpoint URL can be written as a reference such as https://${stageVariables.endpoint} with a different value in the development, user acceptance testing and production stages. Lambda layers hold code and libraries and are not tied to stages, query parameters in the request URL would expose and depend on the client, and AppConfig is for application configuration retrieved by code and is not how API Gateway selects an integration endpoint. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 255
    },
    {
      "d": 0,
      "q": "A developer is building a serverless application that runs on AWS. The developer wants to create an accelerated development workflow that deploys incremental changes to AWS for testing. The developer wants to deploy the incremental changes but does not want to fully deploy the entire application to AWS for every code commit.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Use the AWS Serverless Application Model (AWS SAM) to build the application. Use the sam sync command to deploy the incremental changes.",
        "Use the AWS Serverless Application Model (AWS SAM) to build the application. Use the sam init command to deploy the incremental changes.",
        "Use the AWS Cloud Development Kit (AWS CDK) to build the application. Use the cdk synth command to deploy the incremental changes.",
        "Use the AWS Cloud Development Kit (AWS CDK) to build the application. Use the cdk bootstrap command to deploy the incremental changes."
      ],
      "ma": [
        0
      ],
      "e": "AWS SAM Accelerate, the sam sync command, deploys code and resource changes directly to the cloud (for example updating Lambda code through the service APIs) without a full CloudFormation deployment each time, and with --watch it syncs automatically on local changes. sam init only creates a new project from a template, cdk synth only generates the CloudFormation template, and cdk bootstrap prepares the environment with resources the CDK needs and does not deploy application changes. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 256
    },
    {
      "d": 0,
      "q": "A developer is building an application that will use an Amazon API Gateway API with an AWS Lambda backend. The team that will develop the frontend requires immediate access to the API endpoints to build the UI. To prepare the backend application for integration, the developer needs to set up endpoints. The endpoints need to return predefined HTTP status codes and JSON responses for the frontend team. The developer creates a method for an API resource.\nWhich solution will meet these requirements?",
      "o": [
        "Set the integration type to AWS_PROXY. Provision Lambda functions to return hardcoded JSON data.",
        "Set the integration type to MOCK. Configure the method's integration request and integration response to associate a JSON responses with specific HTTP status codes.",
        "Set the integration type to HTTP_PROXY. Configure API Gateway to pass all requests to an external placeholder API. which the team will build.",
        "Set the integration type to MOCK. Use a method request to define HTTP status codes. Use an integration request to define JSON responses."
      ],
      "ma": [
        1
      ],
      "e": "A MOCK integration makes API Gateway return a response itself without a backend: in the integration request a mapping template returns a statusCode, and in the integration response a body mapping template defines the JSON that is associated with each HTTP status code. This gives the frontend team immediate predefined responses with no Lambda functions or servers to build. AWS_PROXY and HTTP_PROXY require a real backend, and in option D the method request does not define the response status codes and the integration request does not define the JSON response body. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 257
    },
    {
      "d": 0,
      "q": "A developer is migrating an application to Amazon Elastic Kubernetes Service (Amazon EKS). The developer migrates the application to Amazon Elastic Container Registry (Amazon ECR) with an EKS cluster. As part of the application migration to a new backend, the developer creates a new AWS account. The developer makes configuration changes to the application to point the application to the new AWS account and to use new backend resources. The developer successfully tests the changes within the application by deploying the pipeline.\nThe Docker image build and the pipeline deployment are successful, but the application is still connecting to the old backend. The developer finds that the application's configuration is still referencing the original EKS cluster and not referencing the new backend resources.\nWhich reason can explain why the application is not connecting to the new resources?",
      "o": [
        "The developer did not successfully create the new AWS account.",
        "The developer added a new tag to the Docker image.",
        "The developer did not update the Docker image tag to a new version.",
        "The developer pushed the changes to a new Docker image tag."
      ],
      "ma": [
        2
      ],
      "e": "Kubernetes pulls the image referenced by the pod specification, and if the same tag (such as latest) is reused, an already-running or cached deployment may keep running the old image, so the new application configuration is not picked up. The developer needs to push the build with a new unique image tag and update the deployment to use it. Creating a new tag is the recommended practice and would not cause this problem, and creating a new AWS account is not the reason the image content would not change. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 258
    },
    {
      "d": 0,
      "q": "A developer is creating an application that reads and writes to multiple Amazon S3 buckets. The application will be deployed to an Amazon EC2 instance. The developer wants to make secure API requests from the EC2 instances without the need to manage the security credentials for the application. The developer needs to apply the principle of least privilege.\nWhich solution will meet these requirements?",
      "o": [
        "Create an IAM user. Create access keys and secret keys for the user. Associate the user with an IAM policy that allows s3:* permissions.",
        "Associate the EC2 instance with an IAM role that has an IAM policy that allows s3:ListBucket and s3:*Object permissions for specific S3 buckets.",
        "Associate the EC2 instance with an IAM role that has an AmazonS3FullAccess AWS managed policy.",
        "Create a bucket policy on the S3 bucket that allows s3:ListBucket and s3:*Object permissions to the EC2 instance."
      ],
      "ma": [
        1
      ],
      "e": "An IAM role associated with the EC2 instance through an instance profile provides temporary credentials that the SDK obtains automatically from the instance metadata, so there are no credentials to manage, and scoping the policy to s3:ListBucket and object actions on the specific buckets applies least privilege. An IAM user with access keys needs stored credentials and s3:* is too broad, AmazonS3FullAccess grants access to every bucket, and a bucket policy alone does not give the application credentials and applies to only one bucket. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 259
    },
    {
      "d": 0,
      "q": "A developer is writing an application that will retrieve sensitive data from a third-party system. The application will format the data into a PDF file. The PDF file could be more than 1 MB. The application will encrypt the data to disk by using AWS Key Management Service (AWS KMS). The application will decrypt the file when a user requests to download it. The retrieval and formatting portions of the application are complete. The developer needs to use the GenerateDataKey API to encrypt the PDF file so that the PDF file can be decrypted later. The developer needs to use an AWS KMS symmetric customer managed key for encryption.\nWhich solutions will meet these requirements?",
      "o": [
        "Write the encrypted key from the GenerateDataKey API to disk for later use. Use the plaintext key from the GenerateDataKey API and a symmetric encryption algorithm to encrypt the file.",
        "Write the plain text key from the GenerateDataKey API to disk for later use. Use the encrypted key from the GenerateDataKey API and a symmetric encryption algorithm to encrypt the file.",
        "Write the encrypted key from the GenerateDataKey API to disk for later use. Use the plaintext key from the GenerateDataKey API to encrypt the file by using the KMS Encrypt API.",
        "Write the plain text key from the GenerateDataKey API to disk for later use. Use the encrypted key from the GenerateDataKey API to encrypt the file by using the KMS Encrypt API."
      ],
      "ma": [
        0
      ],
      "e": "GenerateDataKey returns a plaintext data key and a copy of the same key encrypted under the KMS key. The application uses the plaintext key with a local symmetric algorithm such as AES-GCM to encrypt the large file (KMS Encrypt only handles up to 4 KB), discards the plaintext key, and stores the encrypted key on disk next to the file so that Decrypt can recover the data key later. Storing the plaintext key defeats the purpose of encryption, and the encrypted key cannot be used directly to encrypt data. Community vote: A (50%), C (40%), D (10%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 260
    },
    {
      "d": 0,
      "q": "A company runs an application on Amazon EC2 instances. The EC2 instances open connections to an Amazon RDS for SQL Server database. A developer needs to store and access the credentials and wants to automatically rotate the credentials. The developer does not want to store the credentials for the database in the code.\nWhich solution will meet these requirements in the MOST secure way?",
      "o": [
        "Create an IAM role that has permissions to access the database. Attach the IAM role to the EC2 instances.",
        "Store the credentials as secrets in AWS Secrets Manager. Create an AWS Lambda function to update the secrets and the database. Retrieve the credentials from Secrets Manager as needed.",
        "Store the credentials in an encrypted text file in an Amazon S3 bucket. Configure the EC2 instance launch template to download the credentials from Amazon S3 as the instance launches. Create an AWS Lambda function to update the secrets and the database.",
        "Store the credentials in an Amazon DynamoDB table. Configure an Amazon CloudWatch Events rule to invoke an AWS Lambda function to periodically update the secrets and database."
      ],
      "ma": [
        1
      ],
      "e": "AWS Secrets Manager stores the database credentials encrypted with KMS, provides managed automatic rotation for RDS databases including SQL Server using a rotation Lambda function that updates the secret and the database password, and the application retrieves the current secret at runtime with IAM permissions. An IAM role cannot authenticate to RDS for SQL Server, and keeping credentials in S3 or DynamoDB and writing custom rotation Lambda functions is less secure and requires more effort. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 261
    },
    {
      "d": 0,
      "q": "A company wants to test its web application more frequently. The company deploys the application by using a separate AWS CloudFormation stack for each environment. The company deploys the same CloudFormation template to each stack as the application progresses through the development lifecycle.\nA developer needs to build in notifications for the quality assurance (QA) team. The developer wants the notifications to occur for new deployments in the final preproduction environment.\nWhich solution will meet these requirements?",
      "o": [
        "Create an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe the QA team to the Amazon SNS topic. Update the CloudFormation stack options to point to the SNS topic in the pre-production environment.",
        "Create an AWS Lambda function that notifies the QA team. Create an Amazon EventBridge rule to invoke the Lambda function on the default event bus. Filter the events on the CloudFormation service and on the CloudFormation stack Amazon Resource Name (ARN).",
        "Create an Amazon CloudWatch alarm that monitors the metrics from CloudFormation. Filter the metrics on the stack name and the stack status. Configure the CloudWatch alarm to notify the QA team.",
        "Create an AWS Lambda function that notifies the QA team. Configure the event source mapping to receive events from CloudFormation. Specify the filtering values to limit invocations to the desired CloudFormation stack."
      ],
      "ma": [
        0
      ],
      "e": "CloudFormation stack options include notification ARNs, which send stack events (such as CREATE_COMPLETE or UPDATE_COMPLETE) to an SNS topic, so creating an SNS topic, subscribing the QA team and setting the notification ARN only on the pre-production stack gives notifications for new deployments with no code. Because all environments use the same template, the configuration is done on the stack and not in the template. CloudFormation does not publish stack metrics for alarms, and Lambda event source mappings cannot receive events from CloudFormation. The EventBridge option works but needs a custom Lambda function. Community vote: B (70%), A (30%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 262
    },
    {
      "d": 0,
      "q": "A developer manages three AWS accounts. Each account contains an Amazon RDS DB instance in a private subnet. The developer needs to define users in each database in a consistent way. The developer must ensure that the same users are created and updated later in all three accounts. Which solution will meet these requirements with the MOST operational efficiency?",
      "o": [
        "Create an AWS CloudFormation template. Declare the users in the template. Attach the users to the database. Deploy the template in each account.",
        "Create an AWS CloudFormation template that contains a custom resource to create the users in the database. Deploy the template in each account.",
        "Write a script that creates the users. Deploy an Amazon EC2 instance in each account to run the script on the databases. Run the script in each account.",
        "Implement an AWS Lambda function that creates the users in the database. Provide the function with the details of all three accounts."
      ],
      "ma": [
        1
      ],
      "e": "Database users are not CloudFormation resources, so a CloudFormation custom resource backed by a Lambda function (running in the VPC to reach the private subnet) can run the SQL to create or update the users, and deploying the same template in each account keeps them consistent and repeatable on updates. A template cannot declare database users directly, and scripts on EC2 instances or a single Lambda function holding details of all three accounts are manual and less maintainable. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 263
    },
    {
      "d": 0,
      "q": "A company is building a new application that runs on AWS and uses Amazon API Gateway to expose APIs. Teams of developers are working on separate components of the application in parallel. The company wants to publish an API without an integrated backend so that teams that depend on the application backend can continue the development work before the API backend development is complete.\nWhich solution will meet these requirements?",
      "o": [
        "Create API Gateway resources and set the integration type value to MOCK. Configure the method integration request and integration response to associate a response with an HTTP status code. Create an API Gateway stage and deploy the API.",
        "Create an AWS Lambda function that returns mocked responses and various HTTP status codes. Create API Gateway resources and set the integration type value to AWS_PROXY. Deploy the API.",
        "Create an EC2 application that returns mocked HTTP responses. Create API Gateway resources and set the integration type value to AWS. Create an API Gateway stage and deploy the API.",
        "Create API Gateway resources and set the integration type value set to HTTP_PROXY. Add mapping templates and deploy the API. Create an AWS Lambda layer that returns various HTTP status codes. Associate the Lambda layer with the API deployment."
      ],
      "ma": [
        0
      ],
      "e": "An API Gateway MOCK integration returns a response without any backend, and by configuring the method's integration request and integration response to map a static body to a status code, then deploying the API to a stage, dependent teams can start development immediately. Lambda, EC2 and HTTP_PROXY options all require building a backend, and Lambda layers cannot be associated with an API deployment to return status codes. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 264
    },
    {
      "d": 0,
      "q": "An application that runs on AWS receives messages from an Amazon Simple Queue Service (Amazon SQS) queue and processes the messages in batches. The application sends the data to another SQS queue to be consumed by another legacy application. The legacy system can take up to 5 minutes to process some transaction data.\nA developer wants to ensure that there are no out-of-order updates in the legacy system. The developer cannot alter the behavior of the legacy system.\nWhich solution will meet these requirements?",
      "o": [
        "Use an SQS FIFO queue. Configure the visibility timeout value.",
        "Use an SQS standard queue with a SendMessageBatchRequestEntry data type. Configure the DelaySeconds values.",
        "Use an SQS standard queue with a SendMessageBatchRequestEntry data type. Configure the visibility timeout value.",
        "Use an SQS FIFO queue. Configure the DelaySeconds value."
      ],
      "ma": [
        0
      ],
      "e": "A FIFO queue preserves message order within a message group, so the legacy consumer does not receive out-of-order updates. Because the legacy system can take up to 5 minutes, the visibility timeout must be set long enough that a message in progress is not made visible and delivered again, which could break ordering. Standard queues do not guarantee order, and DelaySeconds only postpones when messages first become visible and does not cover processing time. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 265
    },
    {
      "d": 0,
      "q": "A company is building a compute-intensive application that will run on a fleet of Amazon EC2 instances. The application uses attached Amazon Elastic Block Store (Amazon EBS) volumes for storing data. The Amazon EBS volumes will be created at time of initial deployment. The application will process sensitive information. All of the data must be encrypted. The solution should not impact the application's performance. Which solution will meet these requirements?",
      "o": [
        "Configure the fleet of EC2 instances to use encrypted EBS volumes to store data.",
        "Configure the application to write all data to an encrypted Amazon S3 bucket.",
        "Configure a custom encryption algorithm for the application that will encrypt and decrypt all data.",
        "Configure an Amazon Machine Image (AMI) that has an encrypted root volume and store the data to ephemeral disks."
      ],
      "ma": [
        0
      ],
      "e": "Encrypted EBS volumes encrypt data at rest, data in transit between the instance and the volume, and snapshots using AWS KMS, with the encryption handled by the Nitro/EC2 hardware, so there is minimal impact on the performance of the application. Writing everything to S3 changes the architecture, a custom encryption algorithm would consume CPU and is risky, and instance store ephemeral disks lose data and are not what the application uses for EBS storage. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 266
    },
    {
      "d": 0,
      "q": "A developer is updating the production version of an AWS Lambda function to fix a defect. The developer has tested the updated code in a test environment. The developer wants to slowly roll out the updates to a small subset of production users before rolling out the changes to all users. Only 10% of the users should be initially exposed to the new code in production.\nWhich solution will meet these requirements?",
      "o": [
        "Update the Lambda code and create a new version of the Lambda function. Create a Lambda function trigger. Configure the traffic weights in the trigger between the two Lambda function versions. Send 90% of the traffic to the production version, and send 10% of the traffic to the new version.",
        "Create a new Lambda function that uses the updated code. Create a Lambda alias for the production Lambda function. Configure the Lambda alias to send 90% of the traffic to the production Lambda function, and send 10% of the traffic to the test Lambda function.",
        "Update the Lambda code and create a new version of the Lambda function. Create a Lambda proxy integration. Configure the Lambda proxy to split traffic between the two Lambda function versions. Send 90% of the traffic to the production version, and send 10% of the traffic to the new version.",
        "Update the Lambda code and create a new version of the Lambda function. Create a Lambda function alias. Configure the traffic weights in the Lambda alias between the two Lambda function versions. Send 90% of the traffic to the production version, and send 10% of the traffic to the new version."
      ],
      "ma": [
        3
      ],
      "e": "A Lambda function alias can be configured with weighted routing between two published versions, so after publishing a new version a developer can point the alias at the production version with 90 percent and the new version with 10 percent, and callers keep using the alias ARN. Lambda has no traffic-weighted triggers or proxy integration for version splitting, and a separate function is not a version of the production function, so an alias cannot split between them. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 267
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Lambda function that consumes messages from an Amazon Simple Queue Service (Amazon SQS) standard queue. The developer notices that the Lambda function processes some messages multiple times.\nHow should developer resolve this issue MOST cost-effectively?",
      "o": [
        "Change the Amazon SQS standard queue to an Amazon SQS FIFO queue by using the Amazon SQS message deduplication ID.",
        "Set up a dead-letter queue.",
        "Set the maximum concurrency limit of the AWS Lambda function to 1.",
        "Change the message processing to use Amazon Kinesis Data Streams instead of Amazon SQS."
      ],
      "ma": [
        0
      ],
      "e": "Standard SQS queues provide at-least-once delivery, which means a message can be delivered more than once, so a FIFO queue with a message deduplication ID prevents duplicates within the 5-minute deduplication interval and gives exactly-once processing. A dead-letter queue only collects messages that repeatedly fail, limiting Lambda concurrency to 1 does not prevent redelivery after a visibility timeout, and moving to Kinesis Data Streams is a bigger and more expensive change. Community vote: A (60%), C (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 268
    },
    {
      "d": 0,
      "q": "A developer is optimizing an AWS Lambda function and wants to test the changes in production on a small percentage of all traffic. The Lambda function serves requests to a RE ST API in Amazon API Gateway. The developer needs to deploy their changes and perform a test in production without changing the API Gateway URL.\nWhich solution will meet these requirements?",
      "o": [
        "Define a function version for the currently deployed production Lambda function. Update the API Gateway endpoint to reference the new Lambda function version. Upload and publish the optimized Lambda function code. On the production API Gateway stage, define a canary release and set the percentage of traffic to direct to the canary release. Update the API Gateway endpoint to use the $LATEST version of the Lambda function. Publish the API to the canary stage.",
        "Define a function version for the currently deployed production Lambda function. Update the API Gateway endpoint to reference the new Lambda function version. Upload and publish the optimized Lambda function code. Update the API Gateway endpoint to use the $LATEST version of the Lambda function. Deploy a new API Gateway stage.",
        "Define an alias on the $LATEST version of the Lambda function. Update the API Gateway endpoint to reference the new Lambda function alias. Upload and publish the optimized Lambda function code. On the production API Gateway stage, define a canary release and set the percentage of traffic to direct to the canary release. Update the API Gateway endpoint to use the $LATEST version of the Lambda function. Publish to the canary stage.",
        "Define a function version for the currently deployed production Lambda function. Update the API Gateway endpoint to reference the new Lambda function version. Upload and publish the optimized Lambda function code. Update the API Gateway endpoint to use the $LATEST version of the Lambda function. Deploy the API to the production API Gateway stage."
      ],
      "ma": [
        0
      ],
      "e": "API Gateway canary release on the production stage routes a configured percentage of traffic to the canary deployment while the stage URL stays the same, so the developer can point the canary at the new Lambda version or $LATEST and test with a small share of production traffic. Option A publishes the optimized code, sets the canary percentage and deploys to the canary, keeping the existing endpoint. The other options deploy a new stage with a new URL or push the change to the whole production stage. (The source PDF lists C; corrected to A after review.) Community vote: A (60%), C (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 269
    },
    {
      "d": 0,
      "q": "A company notices that credentials that the company uses to connect to an external software as a service (SaaS) vendor are stored in a configuration file as plaintext.\nThe developer needs to secure the API credentials and enforce automatic credentials rotation on a quarterly basis.\nWhich solution will meet these requirements MOST securely?",
      "o": [
        "Use AWS Key Management Service (AWS KMS) to encrypt the configuration file. Decrypt the configuration file when users make API calls to the SaaS vendor. Enable rotation.",
        "Retrieve temporary credentials from AWS Security Token Service (AWS STS) every 15 minutes. Use the temporary credentials when users make API calls to the SaaS vendor.",
        "Store the credentials in AWS Secrets Manager and enable rotation. Configure the API to have Secrets Manager access.",
        "Store the credentials in AWS Systems Manager Parameter Store and enable rotation. Retrieve the credentials when users make API calls to the SaaS vendor."
      ],
      "ma": [
        2
      ],
      "e": "AWS Secrets Manager stores secrets encrypted with KMS and supports automatic rotation on a schedule, such as every 90 days with a rotation Lambda function that can be customized for a third-party SaaS vendor, and the application is given IAM permission to retrieve the secret. KMS key rotation does not rotate the credentials in a file, STS temporary credentials cannot be used for an external SaaS API, and Parameter Store does not provide automatic rotation. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 270
    },
    {
      "d": 0,
      "q": "A company has an application that is hosted on Amazon EC2 instances. The application stores objects in an Amazon S3 bucket and allows users to download objects from the S3 bucket. A developer turns on S3 Block Public Access for the S3 bucket. After this change, users report errors when they attempt to download objects. The developer needs to implement a solution so that only users who are signed in to the application can access objects in the S3 bucket.\nWhich combination of steps will meet these requirements in the MOST secure way? (Choose two.)",
      "o": [
        "Create an EC2 instance profile and role with an appropriate policy. Associate the role with the EC2 instances.",
        "Create an IAM user with an appropriate policy. Store the access key ID and secret access key on the EC2 instances.",
        "Modify the application to use the S3 GeneratePresignedUrl API call.",
        "Modify the application to use the S3 GetObject API call and to return the object handle to the user.",
        "Modify the application to delegate requests to the S3 bucket."
      ],
      "ma": [
        0,
        2
      ],
      "e": "With Block Public Access on, the bucket cannot be read anonymously, so the EC2 instances need an IAM role through an instance profile to access S3 with temporary credentials instead of stored access keys, and the application should generate presigned URLs with the GeneratePresignedUrl call for signed-in users so they can download objects directly for a limited time. An IAM user with stored keys is less secure, and returning a GetObject handle or delegating requests to the bucket does not provide secure, authenticated download links to the users. Community vote: AC (67%), CE (17%), BC (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 271
    },
    {
      "d": 0,
      "q": "An Amazon Simple Queue Service (Amazon SQS) queue serves as an event source for an AWS Lambda function. In the SQS queue, each item corresponds to a video file that the Lambda function must convert to a smaller resolution. The Lambda function is timing out on longer video files, but the Lambda function's timeout is already configured to its maximum value.\nWhat should a developer do to avoid the timeouts without additional code changes?",
      "o": [
        "Increase the memory configuration of the Lambda function.",
        "Increase the visibility timeout on the SQS queue.",
        "Increase the instance size of the host that runs the Lambda function.",
        "Use multi-threading for the conversion."
      ],
      "ma": [
        0
      ],
      "e": "Lambda allocates CPU power proportionally to the configured memory, so increasing the memory also increases CPU and speeds up the video conversion with no code changes, which can bring the processing under the 15-minute maximum timeout. Raising the SQS visibility timeout does not make the function run faster, you cannot choose the instance size of the host running Lambda, and multi-threading requires code changes. Community vote: A (80%), B (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 272
    },
    {
      "d": 0,
      "q": "A company is building an application on AWS. The application's backend includes an Amazon API Gateway REST API. The company's frontend application developers cannot continue work until the backend API is ready for integration. The company needs a solution that will allow the frontend application developers to continue their work.\nWhich solution will meet these requirements in the MOST operationally efficient way?",
      "o": [
        "Configure mock integrations for API Gateway API methods.",
        "Integrate a Lambda function with API Gateway and return a mocked response.",
        "Add new API endpoints to the API Gateway stage and returns a mocked response.",
        "Configure a proxy resource for API Gateway API methods."
      ],
      "ma": [
        0
      ],
      "e": "API Gateway mock integrations return a response straight from API Gateway with configured status codes and bodies, without any backend, so the frontend developers can code against the API immediately and the mock can later be replaced with a real integration. A Lambda function needs to be written and deployed, simply adding endpoints with a mocked response describes the same idea without the mechanism, and a proxy resource passes requests to a backend that does not exist yet. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 273
    },
    {
      "d": 0,
      "q": "A company is preparing to migrate an application to the company's first AWS environment. Before this migration, a developer is creating a proof- of-concept application to validate a model for building and deploying container-based applications on AWS.\nWhich combination of steps should the developer take to deploy the containerized proof-of-concept application with the LEAST operational effort? (Choose two.)",
      "o": [
        "Package the application into a .zip file by using a command line tool. Upload the package to Amazon S3.",
        "Package the application into a container image by using the Docker CLI. Upload the image to Amazon Elastic Container Registry (Amazon ECR).",
        "Deploy the application to an Amazon EC2 instance by using AWS CodeDeploy.",
        "Deploy the application to Amazon Elastic Kubernetes Service (Amazon EKS) on AWS Fargate.",
        "Deploy the application to Amazon Elastic Container Service (Amazon ECS) on AWS Fargate."
      ],
      "ma": [
        1,
        4
      ],
      "e": "For a containerized proof of concept with little operational work, the developer builds a container image with the Docker CLI and pushes it to Amazon ECR, then runs it on Amazon ECS with AWS Fargate, which removes the need to provision and manage servers or clusters of instances and is simpler to start than Kubernetes. A .zip package is not a container image, CodeDeploy to EC2 means managing instances, and EKS on Fargate requires more setup than ECS. Community vote: BE (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 274
    },
    {
      "d": 0,
      "q": "A developer supports an application that accesses data in an Amazon DynamoDB table. One of the item attributes is expirationDate in the timestamp format. The application uses this attribute to find items, archive them, and remove them from the table based on the timestamp value. The application will be decommissioned soon, and the developer must find another way to implement this functionality. The developer needs a solution that will require the least amount of code to write.\nWhich solution will meet these requirements?",
      "o": [
        "Enable TTL on the expirationDate attribute in the table. Create a DynamoDB stream. Create an AWS Lambda function to process the deleted items. Create a DynamoDB trigger for the Lambda function.",
        "Create two AWS Lambda functions: one to delete the items and one to process the items. Create a DynamoDB stream. Use the DeleteItem API operation to delete the items based on the expirationDate attribute. Use the GetRecords API operation to get the items from the DynamoDB stream and process them.",
        "Create two AWS Lambda functions: one to delete the items and one to process the items. Create an Amazon EventBridge scheduled rule to invoke the Lambda functions. Use the DeleteItem API operation to delete the items based on the expirationDate attribute. Use the GetRecords API operation to get the items from the DynamoDB table and process them.",
        "Enable TTL on the expirationDate attribute in the table. Specify an Amazon Simple Queue Service (Amazon SQS) dead-letter queue as the target to delete the items. Create an AWS Lambda function to process the items."
      ],
      "ma": [
        0
      ],
      "e": "DynamoDB Time to Live (TTL) on the expirationDate attribute deletes expired items automatically at no write cost, and the deletions appear in the DynamoDB stream as REMOVE records marked as TTL deletions, so a Lambda function triggered by the stream can archive the items with very little code. Writing separate Lambda functions for deleting and processing, scheduled with EventBridge, requires more code, and TTL has no option to specify an SQS dead-letter queue as a target. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 275
    },
    {
      "d": 0,
      "q": "A developer needs to implement a custom machine learning (ML) library in an application. The size of the library is 15 GB. The size of the library is increasing. The application uses AWS Lambda functions. All the Lambda functions must have access to the library.\nWhich solution will meet these requirements?",
      "o": [
        "Save the library in Lambda layers. Attach the layers to all Lambda functions.",
        "Save the library in Amazon S3. Download the library from Amazon S3 inside the Lambda function.",
        "Save the library as a Lambda container image. Redeploy the Lambda functions with the new image.",
        "Save the library in an Amazon Elastic File System (Amazon EFS) file system. Mount the EFS file system in all the Lambda functions."
      ],
      "ma": [
        3
      ],
      "e": "Amazon EFS can be mounted into Lambda functions and holds data up to petabyte scale, so a 15 GB and growing library can be shared by all the functions. Lambda layers are limited to 250 MB unzipped including the function, container images are limited to 10 GB, and downloading a 15 GB library from S3 into /tmp (maximum 10 GB) on each invocation is impossible and slow. Community vote: D (78%), A (22%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 276
    },
    {
      "d": 0,
      "q": "A developer is designing a serverless application for a game in which users register and log in through a web browser. The application makes requests on behalf of users to a set of AWS Lambda functions that run behind an Amazon API Gateway HTTP API.\nThe developer needs to implement a solution to register and log in users on the application's sign-in page. The solution must minimize operational overhead and must minimize ongoing management of user identities.\nWhich solution will meet these requirements?",
      "o": [
        "Create Amazon Cognito user pools for external social identity providers. Configure IAM roles for the identity pools.",
        "Program the sign-in page to create users' IAM groups with the IAM roles attached to the groups.",
        "Create an Amazon RDS for SQL Server DB instance to store the users and manage the permissions to the backend resources in AWS.",
        "Configure the sign-in page to register and store the users and their passwords in an Amazon DynamoDB table with an attached IAM policy."
      ],
      "ma": [
        0
      ],
      "e": "Amazon Cognito user pools provide a managed sign-up and sign-in service, including hosted UI and federation with social identity providers, and identity pools can then exchange tokens for IAM roles, so user identities do not have to be managed. API Gateway HTTP APIs can use the user pool tokens through a JWT authorizer. Creating IAM groups per user, storing users in RDS, or storing passwords in DynamoDB means building and operating your own identity system, which is insecure and high effort. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 277
    },
    {
      "d": 0,
      "q": "A company has a web application that is hosted on Amazon EC2 instances. The EC2 instances are configured to stream logs to Amazon CloudWatch Logs. The company needs to receive an Amazon Simple Notification Service (Amazon SNS) notification when the number of application error messages exceeds a defined threshold within a 5-minute period.\nWhich solution will meet these requirements?",
      "o": [
        "Rewrite the application code to stream application logs to Amazon SNS. Configure an SNS topic to send a notification when the number of errors exceeds the defined threshold within a 5-minute period.",
        "Configure a subscription filter on the CloudWatch Logs log group. Configure the filter to send an SNS notification when the number of errors exceeds the defined threshold within a 5-minute period.",
        "Install and configure the Amazon Inspector agent on the EC2 instances to monitor for errors. Configure Amazon Inspector to send an SNS notification when the number of errors exceeds the defined threshold within a 5-minute period.",
        "Create a CloudWatch metric filter to match the application error pattern in the log data. Set up a CloudWatch alarm based on the new custom metric. Configure the alarm to send an SNS notification when the number of errors exceeds the defined threshold within a 5-minute period."
      ],
      "ma": [
        3
      ],
      "e": "A CloudWatch Logs metric filter turns matching log events (the application error pattern) into a custom metric, and a CloudWatch alarm on that metric with a 5-minute period and a threshold can publish to an SNS topic when the count is exceeded. Subscription filters send log data to Kinesis, Lambda or Firehose and cannot send SNS notifications on thresholds, SNS does not evaluate error counts over a period, and Amazon Inspector is a vulnerability scanning service that does not monitor application logs. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 278
    },
    {
      "d": 0,
      "q": "A photo sharing application uses Amazon S3 to store image files. All user images are manually audited for inappropriate content by a third-party company. The audits are completed 1-24 hours after user upload and the results are written to an Amazon DynamoDB table, which uses the S3 object key as a primary key. The database items can be queried by using a REST API created by the third-party company.\nAn application developer needs to implement an automated process to tag all S3 objects with the results of the content audit.\nWhat should the developer do to meet these requirements in the MOST operationally efficient way?",
      "o": [
        "Create an AWS Lambda function to run in response to the s3:ObjectCreated event type. Write the S3 key to an Amazon Simple Queue Service (Amazon SQS) queue with a visibility timeout of 24 hours. Create and configure a second Lambda function to read items from the queue. Retrieve the results for each item from the DynamoDB table. Tag each S3 object accordingly.",
        "Create an AWS Lambda function to run in response to the s3:ObjectCreated event type. Integrate the function into an AWS Step Functions standard workflow. Define an AWS Step Functions Wait state and set the value to 24 hours. Create and configure a second Lambda function to retrieve the audit results and tag the S3 objects accordingly after the Wait state is over.",
        "Create an AWS Lambda function to load all untagged S3 objects. Retrieve the results for each item from the REST API and tag each S3 object accordingly. Create and configure an Amazon EventBridge rule to run at regular intervals. Set the Lambda function as a target for the EventBridge rule.",
        "Launch an Amazon EC2 instance. Deploy a script to the EC2 instance to use the external database results to tag the S3 objects accordingly. Configure a crontab file to run the script at regular intervals."
      ],
      "ma": [
        1
      ],
      "e": "Audit results arrive between 1 and 24 hours after upload, so a Step Functions standard workflow, which can run for up to a year, is started by the S3 ObjectCreated event Lambda function, waits with a Wait state, and then calls a second Lambda function to read the DynamoDB or REST API results and tag the object. This is event driven and serverless. SQS has a maximum visibility timeout of 12 hours, so 24 hours cannot be set, a scheduled function that scans for untagged objects is inefficient, and an EC2 instance with cron requires server maintenance. Community vote: C (53%), B (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 279
    },
    {
      "d": 0,
      "q": "A company has built an AWS Lambda function to convert large image files into output files that can be used in a third-party viewer application. The company recently added a new module to the function to improve the output of the generated files. However, the new module has increased the bundle size and has increased the time that is needed to deploy changes to the function code.\nHow can a developer increase the speed of the Lambda function deployment?",
      "o": [
        "Use AWS CodeDeploy to deploy the function code.",
        "Use Lambda layers to package and load dependencies.",
        "Increase the memory size of the function.",
        "Use Amazon S3 to host the function dependencies."
      ],
      "ma": [
        1
      ],
      "e": "Putting dependencies such as the new module in Lambda layers means the layer is published and cached separately, so deployments of the function code package only upload the small function code and not the large dependency bundle, which makes deployments faster. CodeDeploy controls traffic shifting and does not speed up package upload, memory size affects runtime performance, and hosting dependencies in S3 would still require them to be downloaded and loaded by the function. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 280
    },
    {
      "d": 0,
      "q": "A developer creates a static website for their department. The developer deploys the static assets for the website to an Amazon S3 bucket and serves the assets with Amazon CloudFront. The developer uses origin access control (OAC) on the CloudFront distribution to access the S3 bucket.\nThe developer notices users can access the root URL and specific pages but cannot access directories without specifying a file name. For example, /products/index.html works, but /products/ returns an error. The developer needs to enable accessing directories without specifying a file name without exposing the S3 bucket publicly.\nWhich solution will meet these requirements?",
      "o": [
        "Update the CloudFront distribution's settings to index.html as the default root object is set.",
        "Update the Amazon S3 bucket settings and enable static website hosting. Specify index.html as the Index document. Update the S3 bucket policy to enable access. Update the CloudFront distribution's origin to use the S3 website endpoint.",
        "Create a CloudFront function that examines the request URL and appends index.html when directories are being accessed. Add the function as a viewer request CloudFront function to the CloudFront distribution's behavior.",
        "Create a custom error response on the CloudFront distribution with the HTTP error code set to the HTTP 404 Not Found response code and the response page path to /index.html. Set the HTTP response code to the HTTP 200 OK response code."
      ],
      "ma": [
        2
      ],
      "e": "A viewer-request CloudFront Function can inspect the URI and append index.html when the path ends in / or has no file extension, so /products/ is rewritten to /products/index.html before CloudFront fetches it from S3 through OAC, and the bucket stays private. The default root object only applies to the distribution root, not to subdirectories. Using the S3 website endpoint requires a publicly readable bucket and cannot use OAC. A custom 404 error response returning /index.html serves the wrong page for every missing path and does not map directories to their own index files. Community vote: C (57%), B (29%), A (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 281
    },
    {
      "d": 0,
      "q": "A developer is testing a RESTful application that is deployed by using Amazon API Gateway and AWS Lambda. When the developer tests the user login by using credentials that are not valid, the developer receives an HTTP 405: METHOD_NOT_ALLOWED error. The developer has verified that the test is sending the correct request for the resource.\nWhich HTTP error should the application return in response to the request?",
      "o": [
        "HTTP 401",
        "HTTP 404",
        "HTTP 503",
        "HTTP 505"
      ],
      "ma": [
        0
      ],
      "e": "HTTP 401 Unauthorized is the correct status for a request that fails authentication, such as invalid login credentials, so the application (the Lambda function behind API Gateway) should return it. The 405 error means the HTTP method is not allowed for the resource, which is a different problem. A 404 means the resource was not found, 503 means the service is unavailable, and 505 means the HTTP version is not supported, and none of those describe a credential failure. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 282
    },
    {
      "d": 0,
      "q": "A developer must use multi-factor authentication (MFA) to access data in an Amazon S3 bucket that is in another AWS account.\nWhich AWS Security Token Service (AWS STS) API operation should the developer use with the MFA information to meet this requirement?",
      "o": [
        "AssumeRoleWithWebIdentity",
        "GetFederationToken",
        "AssumeRoleWithSAML",
        "AssumeRole"
      ],
      "ma": [
        3
      ],
      "e": "AssumeRole accepts the SerialNumber and TokenCode parameters, so a user can supply MFA information when assuming a cross-account role that the role's trust policy protects with an aws:MultiFactorAuthPresent condition. AssumeRoleWithWebIdentity and AssumeRoleWithSAML are for federated identities authenticated by a web identity provider or SAML IdP and do not take MFA parameters. GetFederationToken is called with IAM user credentials to create a federated user session and cannot assume a role in another account. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 283
    },
    {
      "d": 0,
      "q": "A developer designed an application on an Amazon EC2 instance. The application makes API requests to objects in an Amazon S3 bucket. Which combination of steps will ensure that the application makes the API requests in the MOST secure manner? (Choose two.)",
      "o": [
        "Create an IAM user that has permissions to the S3 bucket. Add the user to an IAM group.",
        "Create an IAM role that has permissions to the S3 bucket.",
        "Add the IAM role to an instance profile. Attach the instance profile to the EC2 instance.",
        "Create an IAM role that has permissions to the S3 bucket. Assign the role to an IAM group.",
        "Store the credentials of the IAM user in the environment variables on the EC2 instance."
      ],
      "ma": [
        1,
        2
      ],
      "e": "The most secure way for code on EC2 to call S3 is to create an IAM role with the required S3 permissions (B) and place it in an instance profile attached to the instance (C), so the SDK gets automatically rotated temporary credentials from the instance metadata service. IAM users and groups (A) involve long-term access keys, and storing those keys in environment variables (E) exposes them. Roles cannot be assigned to IAM groups (D), because groups only contain users. Community vote: BC (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 284
    },
    {
      "d": 0,
      "q": "An AWS Lambda function requires read access to an Amazon S3 bucket and requires read/write access to an Amazon DynamoDB table. The correct IAM policy already exists.\nWhat is the MOST secure way to grant the Lambda function access to the S3 bucket and the DynamoDB table?",
      "o": [
        "Attach the existing IAM policy to the Lambda function.",
        "Create an IAM role for the Lambda function. Attach the existing IAM policy to the role. Attach the role to the Lambda function.",
        "Create an IAM user with programmatic access. Attach the existing IAM policy to the user. Add the user access key ID and secret access key as environment variables in the Lambda function.",
        "Add the AWS account root user access key ID and secret access key as encrypted environment variables in the Lambda function."
      ],
      "ma": [
        1
      ],
      "e": "Lambda functions get permissions through an execution role, so the secure approach is to create an IAM role that Lambda can assume, attach the existing policy to it, and set it as the function's execution role. Policies cannot be attached directly to a Lambda function for this purpose. Embedding IAM user access keys or root user keys in environment variables relies on long-term credentials that can leak and violates least privilege. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 285
    },
    {
      "d": 0,
      "q": "A developer is using AWS Step Functions to automate a workflow. The workflow defines each step as an AWS Lambda function task. The developer notices that runs of the Step Functions state machine fail in the GetResource task with either an IllegalArgumentException error or a TooManyRequestsException error.\nThe developer wants the state machine to stop running when the state machine encounters an IllegalArgumentException error. The state machine needs to retry the GetResource task one additional time after 10 seconds if the state machine encounters a TooManyRequestsException error. If the second attempt fails, the developer wants the state machine to stop running.\nHow can the developer implement the Lambda retry functionality without adding unnecessary complexity to the state machine?",
      "o": [
        "Add a Delay task after the GetResource task. Add a catcher to the GetResource task. Configure the catcher with an error type of TooManyRequestsException. Configure the next step to be the Delay task. Configure the Delay task to wait for an interval of 10 seconds. Configure the next step to be the GetResource task.",
        "Add a catcher to the GetResource task. Configure the catcher with an error type of TooManyRequestsException, an interval of 10 seconds, and a maximum attempts value of 1. Configure the next step to be the GetResource task.",
        "Add a retrier to the GetResource task. Configure the retrier with an error type of TooManyRequestsException, an interval of 10 seconds, and a maximum attempts value of 1.",
        "Duplicate the GetResource task. Rename the new GetResource task to TryAgain. Add a catcher to the original GetResource task. Configure the catcher with an error type of TooManyRequestsException. Configure the next step to be TryAgain."
      ],
      "ma": [
        2
      ],
      "e": "A Retry field (retrier) on the GetResource task is the built-in Step Functions way to handle this: configure ErrorEquals TooManyRequestsException, IntervalSeconds 10 and MaxAttempts 1, and leave IllegalArgumentException unmatched so the state machine fails immediately. If the retry also fails, the error propagates and the execution stops. Catchers do not have interval or attempt settings, and building the retry with Delay states or duplicate tasks adds unnecessary complexity. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 286
    },
    {
      "d": 0,
      "q": "A developer is creating a serverless application that uses an AWS Lambda function. The developer will use AWS CloudFormation to deploy the application. The application will write logs to Amazon CloudWatch Logs. The developer has created a log group in a CloudFormation template for the application to use. The developer needs to modify the CloudFormation template to make the name of the log group available to the application at runtime.\nWhich solution will meet this requirement?",
      "o": [
        "Use the AWS::Include transform in CloudFormation to provide the log group's name to the application.",
        "Pass the log group's name to the application in the user data section of the CloudFormation template.",
        "Use the CloudFormation template's Mappings section to specify the log group's name for the application.",
        "Pass the log group's Amazon Resource Name (ARN) as an environment variable to the Lambda function."
      ],
      "ma": [
        3
      ],
      "e": "Within the template, the Lambda function's Environment Variables property can reference the log group resource (for example with Ref for the name or GetAtt for the ARN), and CloudFormation fills in the value at deploy time so the function can read it at runtime. AWS::Include only pulls in template snippets from S3, Mappings are static lookup tables that cannot hold a generated resource name, and user data applies to EC2 instances rather than Lambda functions. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 287
    },
    {
      "d": 0,
      "q": "A developer is creating an Amazon DynamoDB table by using the AWS CLI. The DynamoDB table must use server-side encryption with an AWS owned encryption key.\nHow should the developer create the DynamoDB table to meet these requirements?",
      "o": [
        "Create an AWS Key Management Service (AWS KMS) customer managed key. Provide the key's Amazon Resource Name (ARN) in the KMSMasterKeyId parameter during creation of the DynamoDB table.",
        "Create an AWS Key Management Service (AWS KMS) AWS managed key. Provide the key's Amazon Resource Name (ARN) in the KMSMasterKeyId parameter during creation of the DynamoDB table.",
        "Create an AWS owned key. Provide the key's Amazon Resource Name (ARN) in the KMSMasterKeyId parameter during creation of the DynamoDB table.",
        "Create the DynamoDB table with the default encryption options."
      ],
      "ma": [
        3
      ],
      "e": "DynamoDB always encrypts tables at rest, and the default is an AWS owned key that you do not create, see, or manage. Creating the table with default encryption options (no SSESpecification) therefore satisfies the requirement. Specifying KMSMasterKeyId implies SSE with a KMS key, either AWS managed or customer managed, and an AWS owned key has no ARN you can supply. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 288
    },
    {
      "d": 0,
      "q": "A company has an application that runs across multiple AWS Regions. The application is experiencing performance issues at irregular intervals. A developer must use AWS X-Ray to implement distributed tracing for the application to troubleshoot the root cause of the performance issues. What should the developer do to meet this requirement?",
      "o": [
        "Use the X-Ray console to add annotations for AWS services and user-defined services.",
        "Use Region annotation that X-Ray adds automatically for AWS services. Add Region annotation for user-defined services.",
        "Use the X-Ray daemon to add annotations for AWS services and user-defined services.",
        "Use Region annotation that X-Ray adds automatically for user-defined services. Configure X-Ray to add Region annotation for AWS services."
      ],
      "ma": [
        1
      ],
      "e": "X-Ray automatically records the Region for AWS service calls made through an instrumented SDK, but for user-defined services (your own application components) you must add the Region annotation yourself so traces can be filtered and correlated across Regions. The X-Ray console and the daemon do not add annotations; annotations are added in code through the SDK. X-Ray does not add Region annotations automatically for user-defined services. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 289
    },
    {
      "d": 0,
      "q": "A company runs an application on AWS. The application uses an AWS Lambda function that is configured with an Amazon Simple Queue Service (Amazon SQS) queue called high priority queue as the event source. A developer is updating the Lambda function with another SQS queue called low priority queue as the event source. The Lambda function must always read up to 10 simultaneous messages from the high priority queue before processing messages from low priority queue. The Lambda function must be limited to 100 simultaneous invocations.\nWhich solution will meet these requirements?",
      "o": [
        "Set the event source mapping batch size to 10 for the high priority queue and to 90 for the low priority queue.",
        "Set the delivery delay to 0 seconds for the high priority queue and to 10 seconds for the low priority queue.",
        "Set the event source mapping maximum concurrency to 10 for the high priority queue and to 90 for the low priority queue.",
        "Set the event source mapping batch window to 10 for the high priority queue and to 90 for the low priority queue."
      ],
      "ma": [
        2
      ],
      "e": "The SQS event source mapping setting for maximum concurrency caps how many concurrent invocations each mapping can drive, so setting 10 on the high-priority queue mapping and 90 on the low-priority one keeps the function within 100 total concurrent invocations while reserving capacity for the high-priority queue. Batch size controls messages per invocation and batch window controls how long to buffer messages, neither of which limits concurrency. Delivery delay only postpones message visibility and does not prioritize one queue over another. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 290
    },
    {
      "d": 0,
      "q": "A data visualization company wants to strengthen the security of its core applications. The applications are deployed on AWS across its development, staging, pre-production, and production environments. The company needs to encrypt all of its stored sensitive credentials. The sensitive credentials need to be automatically rotated. A version of the sensitive credentials need to be stored for each environment. Which solution will meet these requirements in the MOST operationally efficient way?",
      "o": [
        "Configure AWS Secrets Manager versions to store different copies of the same credentials across multiple environments.",
        "Create a new parameter version in AWS Systems Manager Parameter Store for each environment. Store the environment-specific credentials in the parameter version.",
        "Configure the environment variables in the application code. Use different names for each environment type.",
        "Configure AWS Secrets Manager to create a new secret for each environment type. Store the environment-specific credentials in the secret."
      ],
      "ma": [
        3
      ],
      "e": "Secrets Manager encrypts secrets with KMS and supports built-in automatic rotation, so it satisfies the encryption and rotation requirements with the least operational work. Creating a separate secret per environment (dev, staging, pre-production, production) keeps each environment's credentials isolated and independently rotated. Secret versions are for staging labels of a single secret's history, not for separate environments. Parameter Store versions cannot be rotated automatically, and putting credentials in environment variables in code is neither encrypted nor rotated. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 291
    },
    {
      "d": 0,
      "q": "A developer is investigating an issue in part of a company's application. In the application, messages are sent to an Amazon Simple Queue Service (Amazon SQS) queue. The AWS Lambda function polls messages from the SQS queue and sends email messages by using Amazon Simple Email Service (Amazon SES). Users have been receiving duplicate email messages during periods of high traffic.\nWhich reasons could explain the duplicate email messages? (Choose two.)",
      "o": [
        "Standard SQS queues support at-least-once message delivery.",
        "Standard SQS queues support exactly-once processing, so the duplicate email messages are because of user error.",
        "Amazon SES has the DomainKeys Identified Mail (DKIM) authentication incorrectly configured.",
        "The SQS queue's visibility timeout is lower than or the same as the Lambda function's timeout.",
        "The Amazon SES bounce rate metric is too high."
      ],
      "ma": [
        0,
        3
      ],
      "e": "Standard SQS queues guarantee at-least-once delivery, so the same message can occasionally be delivered more than once (A). During high traffic, if the queue's visibility timeout is less than or equal to the Lambda function's timeout, a message can become visible again before the function finishes, and another invocation processes it and sends a second email (D). Standard queues do not provide exactly-once processing, and DKIM configuration or SES bounce rate affect deliverability and sending reputation, not duplication. Community vote: AD (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 292
    },
    {
      "d": 0,
      "q": "A developer is deploying a company's application to Amazon EC2 instances. The application generates gigabytes of data files each day. The files are rarely accessed, but the files must be available to the application's users within minutes of a request during the first year of storage. The company must retain the files for 7 years.\nHow can the developer implement the application to meet these requirements MOST cost-effectively?",
      "o": [
        "Store the files in an Amazon S3 bucket. Use the S3 Glacier Instant Retrieval storage class. Create an S3 Lifecycle policy to transition the files to the S3 Glacier Deep Archive storage class after 1 year.",
        "Store the files in an Amazon S3 bucket. Use the S3 Standard storage class. Create an S3 Lifecycle policy to transition the files to the S3 Glacier Flexible Retrieval storage class after 1 year.",
        "Store the files on an Amazon Elastic Block Store (Amazon EBS) volume. Use Amazon Data Lifecycle Manager (Amazon DLM) to create snapshots of the EBS volumes and to store those snapshots in Amazon S3.",
        "Store the files on an Amazon Elastic File System (Amazon EFS) mount. Configure EFS lifecycle management to transition the files to the EFS Standard- Infrequent Access (Standard-IA) storage class after 1 year."
      ],
      "ma": [
        0
      ],
      "e": "S3 Glacier Instant Retrieval is built for rarely accessed data that needs millisecond retrieval and costs much less than S3 Standard for storage, which covers the first-year requirement of access within minutes. A lifecycle rule then moves the files to S3 Glacier Deep Archive after one year for the cheapest long-term retention through year 7. S3 Standard for the first year costs more, EBS snapshots and EFS are far more expensive for gigabytes per day of rarely used data, and EFS Standard-IA would be applied too late and costs more than Glacier classes. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 293
    },
    {
      "d": 0,
      "q": "A company's developer has deployed an application in AWS by using AWS CloudFormation. The CloudFormation stack includes parameters in AWS Systems Manager Parameter Store that the application uses as configuration settings. The application can modify the parameter values. When the developer updated the stack to create additional resources with tags, the developer noted that the parameter values were reset and that the values ignored the latest changes made by the application. The developer needs to change the way the company deploys the CloudFormation stack. The developer also needs to avoid resetting the parameter values outside the stack.\nWhich solution will meet these requirements with the LEAST development effort?",
      "o": [
        "Modify the CloudFormation stack to set the deletion policy to Retain for the Parameter Store parameters.",
        "Create an Amazon DynamoDB table as a resource in the CloudFormation stack to hold configuration data for the application. Migrate the parameters that the application is modifying from Parameter Store to the DynamoDB table.",
        "Create an Amazon RDS DB instance as a resource in the CloudFormation stack. Create a table in the database for parameter configuration. Migrate the parameters that the application is modifying from Parameter Store to the configuration table.",
        "Modify the CloudFormation stack policy to deny updates on Parameter Store parameters."
      ],
      "ma": [
        3
      ],
      "e": "A CloudFormation stack policy that denies Update actions on the Parameter Store parameter resources prevents stack updates from modifying or replacing them, so values changed by the application are not reset to the template defaults. This is a small change to the stack with no migration. A Retain deletion policy only affects what happens when a resource is deleted, not updates. Moving the settings to DynamoDB or RDS requires rewriting the application and adds a lot of development effort. Community vote: D (47%), A (47%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 294
    },
    {
      "d": 0,
      "q": "A company has a social media application that receives large amounts of traffic. User posts and interactions are continuously updated in an Amazon RDS database. The data changes frequently, and the data types can be complex. The application must serve read requests with minimal latency.\nThe application's current architecture struggles to deliver these rapid data updates efficiently. The company needs a solution to improve the application's performance.\nWhich solution will meet these requirements?",
      "o": [
        "Use Amazon DynamoDB Accelerator (DAX) in front of the RDS database to provide a caching layer for the high volume of rapidly changing data.",
        "Set up Amazon S3 Transfer Acceleration on the RDS database to enhance the speed of data transfer from the databases to the application.",
        "Add an Amazon CloudFront distribution in front of the RDS database to provide a caching layer for the high volume of rapidly changing data.",
        "Create an Amazon ElastiCache for Redis cluster. Update the application code to use a write-through caching strategy and read the data from Redis."
      ],
      "ma": [
        3
      ],
      "e": "ElastiCache for Redis supports complex data structures and sub-millisecond reads, and a write-through strategy updates the cache whenever the RDS data is written so reads always see fresh data even when it changes frequently. DAX only caches DynamoDB and cannot sit in front of RDS. S3 Transfer Acceleration is an S3 upload feature that does not apply to RDS. CloudFront caches HTTP content at the edge and cannot front an RDS database, and it would serve stale data for rapidly changing content. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 295
    },
    {
      "d": 0,
      "q": "A developer created an AWS Lambda function that performs a series of operations that involve multiple AWS services. The function's duration time is higher than normal. To determine the cause of the issue, the developer must investigate traffic between the services without changing the function code.\nWhich solution will meet these requirements?",
      "o": [
        "Enable AWS X-Ray active tracing in the Lambda function. Review the logs in X-Ray.",
        "Configure AWS CloudTrail. View the trail logs that are associated with the Lambda function.",
        "Review the AWS Config logs in Amazon CloudWatch.",
        "Review the Amazon CloudWatch logs that are associated with the Lambda function."
      ],
      "ma": [
        0
      ],
      "e": "Enabling X-Ray active tracing is a configuration change on the Lambda function that needs no code change, and it generates trace segments and a service map showing the time spent in the function and in downstream calls to other AWS services, which pinpoints where the duration is going. CloudTrail records API calls for auditing and not latency, AWS Config tracks resource configuration changes, and CloudWatch Logs only show what the function writes and do not break out the time spent per service call. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 296
    },
    {
      "d": 0,
      "q": "A company has on-premises data centers that run an image processing service. The service consists of containerized applications that run on Kubernetes clusters. All the applications have access to the same NFS share for files and data storage.\nThe company is running out of NFS capacity in the data centers and needs to migrate to AWS as soon as possible. The Kubernetes clusters must be highly available on AWS.\nWhich combination of actions will meet these requirements? (Choose two.)",
      "o": [
        "Transfer the information that is in the NFS share to an Amazon Elastic Block Store (Amazon EBS) volume. Upload the container images to Amazon Elastic Container Registry (Amazon ECR).",
        "Transfer the information that is in the NFS share to an Amazon Elastic File System (Amazon EFS) volume. Upload the container images to Amazon Elastic Container Registry (Amazon ECR).",
        "Create an Amazon Elastic Container Service (Amazon ECS) cluster to run the applications. Configure each node of the cluster to mount the Amazon Elastic Block Store (Amazon EBS) volume at the required path for the container images.",
        "Create an Amazon Elastic Kubernetes Service (Amazon EKS) cluster to run the applications. Configure each node of the cluster to mount the Amazon Elastic Block Store (Amazon EBS) volume at the required path for the container images.",
        "Create an Amazon Elastic Kubernetes Service (Amazon EKS) cluster to run the applications. Configure each node of the cluster to mount the Amazon Elastic File System (Amazon EFS) volume at the required path for the container images."
      ],
      "ma": [
        1,
        4
      ],
      "e": "Amazon EFS provides a shared NFS file system that many pods can mount at once, so it is the direct replacement for the on-premises NFS share, and the container images go to Amazon ECR (B). An Amazon EKS cluster runs the existing Kubernetes workloads across multiple Availability Zones for high availability and can mount the EFS volume at the required path (E). EBS volumes attach to one instance in one AZ at a time and cannot serve as a shared NFS-style store, and ECS is not Kubernetes, so options A, C and D fail. Community vote: BE (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 297
    },
    {
      "d": 0,
      "q": "A company has an analytics application that uses an AWS Lambda function to process transaction data asynchronously. A developer notices that asynchronous invocations of the Lambda function sometimes fail. When failed Lambda function invocations occur, the developer wants to invoke a second Lambda function to handle errors and log details.\nWhich solution will meet these requirements?",
      "o": [
        "Configure a Lambda function destination with a failure condition. Specify Lambda function as the destination type. Specify the error- handling Lambda function's Amazon Resource Name (ARN) as the resource.",
        "Enable AWS X-Ray active tracing on the initial Lambda function. Configure X-Ray to capture stack traces of the failed invocations. Invoke the error-handling Lambda function by including the stack traces in the event object.",
        "Configure a Lambda function trigger with a failure condition. Specify Lambda function as the destination type. Specify the error-handling Lambda function's Amazon Resource Name (ARN) as the resource.",
        "Create a status check alarm on the initial Lambda function. Configure the alarm to invoke the error-handling Lambda function when the alarm is initiated. Ensure that the alarm passes the stack trace in the event object."
      ],
      "ma": [
        0
      ],
      "e": "For asynchronous invocations, a Lambda destination configured with an On failure condition can send the invocation record to another Lambda function, SQS queue, SNS topic or EventBridge bus, so choosing the error-handling Lambda function's ARN as the failure destination invokes it with details about the failed event. Triggers are event sources and have no failure condition or destination type, X-Ray tracing does not invoke functions, and a CloudWatch status check alarm is not a Lambda feature and does not carry the event payload. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 298
    },
    {
      "d": 0,
      "q": "A company introduced a new feature that should be accessible to only a specific group of premium customers. A developer needs the ability to turn the feature on and off in response to performance and feedback. The developer needs a solution to validate and deploy these configurations quickly without causing any disruptions.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Use AWS AppConfig to manage the feature configuration and to validate and deploy changes. Use feature flags to turn the feature on and off.",
        "Use AWS Secrets Manager to securely manage and validate the feature configurations. Enable lifecycle rules to turn the feature on and off.",
        "Use AWS Config to manage the feature configuration and validation. Set up AWS Config rules to turn the feature on and off based on predefined conditions.",
        "Use AWS Systems Manager Parameter Store to store and validate the configuration settings for the feature. Enable lifecycle rules to turn the feature on and off."
      ],
      "ma": [
        0
      ],
      "e": "AWS AppConfig is designed for feature flags and dynamic configuration: it supports validators to check configuration before deployment, gradual deployment strategies with automatic rollback, and turning a flag on or off without redeploying code, including targeting for particular user segments. Secrets Manager and Parameter Store hold secrets and parameters and have no feature flag or lifecycle-based toggling. AWS Config evaluates resource compliance and does not manage application feature configuration. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 299
    },
    {
      "d": 0,
      "q": "A developer needs approval from a product owner before the developer can deploy code for an application to production. The developer uses AWS CodePipeline to deploy the application. The developer configures an Amazon Simple Notification Service (Amazon SNS) topic to send notifications to the product owner.\nWhich solution is the MOST operationally efficient way for the developer to receive approval from the product owner?",
      "o": [
        "Add a new stage to CodePipeline before the production deployment. Add a manual approval action to the new stage. Add a new notification rule in the pipeline settings. Specify manual approval as the event that initiates the notification. Specify the SNS topic's Amazon Resource Name (ARN) to notify the product owner.",
        "Develop an AWS Step Functions state machine that sends a notification to the product owner and accepts an approval. Add a new stage to CodePipeline before the production deployment. Add the state machine as a Step Functions action to the new stage.",
        "Add a manual approval action to the existing production deployment stage in CodePipeline. Specify the SNS topic's Amazon Resource Name (ARN) while configuring the new manual approval action.",
        "Edit the settings in CodePipeline. Create a new notification rule. Specify manual approval as the event that initiates the notification. Create a new notification target. Specify the SNS topic to notify the product owner. Save the notification rule."
      ],
      "ma": [
        0
      ],
      "e": "Adding a separate stage before production with a manual approval action pauses the pipeline until the product owner approves, and a notification rule in the pipeline settings that targets the SNS topic for the manual approval event sends the request to the product owner. This uses native CodePipeline features with no custom code. A Step Functions approval workflow is unnecessary complexity, and a notification rule alone (without an approval action) does not stop the deployment or capture an approval. Community vote: A (50%), C (38%), B (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 300
    },
    {
      "d": 0,
      "q": "A developer is building a serverless application on AWS for a workflow that processes high volumes of data. In the workflow, an AWS Step Functions state machine invokes several AWS Lambda functions.\nOne of the Lambda functions occasionally fails because of timeout errors during periods of high demand. The developer must ensure that the workflow automatically retries the failed function invocation if a timeout error occurs.\nWhich solution will meet this requirement?",
      "o": [
        "Add a Retry field in the Step Functions state machine definition. Configure the state machine with the maximum number of retry attempts and the timeout error type to retry on.",
        "Add a Timeout field in the Step Functions state machine definition. Configure the state machine with the maximum number of retry attempts.",
        "Add a Fail state to the Step Functions state machine definition. Configure the state machine with the maximum number of retry attempts.",
        "Update the Step Functions state machine to pass the invocation request to an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe a Lambda function to the SNS topic. Configure the Lambda function with the maximum number of retry attempts for a timeout error type."
      ],
      "ma": [
        0
      ],
      "e": "Step Functions task states support a Retry field in the state machine definition where you set ErrorEquals (for example States.Timeout or Lambda.Timeout-related errors), IntervalSeconds, BackoffRate and MaxAttempts, so a failed Lambda invocation is retried automatically. The Timeout field only sets how long a state may run and does not retry, a Fail state simply ends the execution, and routing through SNS to another Lambda function adds needless complexity and does not retry the original task. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 301
    },
    {
      "d": 0,
      "q": "A company runs a serverless application on AWS. The application includes an AWS Lambda function. The Lambda function processes data and stores the data in an Amazon RDS for PostgreSQL database. A developer created a user credentials in the database for the application. The developer needs to use AWS Secrets Manager to manage the user credentials. The password must to be rotated on a regular basis. The solution needs to ensure that there is high availability and no downtime for the application during secret rotation.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Configure managed rotation with the single user rotation strategy.",
        "Configure managed rotation with the alternating users rotation strategy.",
        "Configure automatic rotation with the single user rotation strategy.",
        "Configure automatic rotation with the alternating users rotation strategy."
      ],
      "ma": [
        3
      ],
      "e": "Secrets Manager's automatic rotation for RDS with the alternating users strategy keeps two database users and rotates the password of the inactive one, then switches the secret to it, so the credentials the application is currently using remain valid throughout the rotation and there is no downtime. The single user strategy changes the password of the one user in place, which can briefly break active connections. Managed rotation applies to secrets owned by other AWS services rather than to a user the developer created. Community vote: B (69%), D (31%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 302
    },
    {
      "d": 0,
      "q": "A company runs an application on AWS. The application consists of a static website that is hosted on Amazon S3. The application includes Amazon API Gateway APIs that invoke AWS Lambda functions. During a period of high traffic on the application, application users reported that the application was slow at irregular intervals. There were no failed requests.\nA developer needs to find the slow executions across all the Lambda functions.\nWhich solution will meet these requirements?",
      "o": [
        "Perform a query across all the Lambda function log groups by using Amazon CloudWatch Logs Insights. Filter on type of report and sort descending by Lambda function execution duration.",
        "Enable AWS CloudTrail Insights on the account where the Lambda functions are running. After CloudTrail Insights has finished processing, review CloudTrail Insights to find the anomalous functions.",
        "Enable AWS X-Ray for all the Lambda functions. Configure an X-Ray insight on a new group that includes all the Lambda functions. After the X-Ray insight has finished processing, review the X-Ray logs.",
        "Set up AWS Glue to crawl through the logs in Amazon CloudWatch Logs for the Lambda functions. Configure an AWS Glue job to transform the logs into a structured format and to output the logs into Amazon S3. Use the Amazon CloudWatch dashboard to visualize the slowest functions based on the duration."
      ],
      "ma": [
        0
      ],
      "e": "Lambda writes a REPORT line for every invocation containing the duration, so a CloudWatch Logs Insights query across all the functions' log groups that filters on @type = REPORT and sorts by @duration descending lists the slowest executions across all functions with no extra setup. CloudTrail Insights detects unusual API call volume and not slow execution. X-Ray insights need instrumentation and are a heavier approach, and Glue crawlers and jobs for log analysis are far more work than a single Insights query. (The source PDF lists C; corrected to A after review.) Community vote: A (50%), C (50%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 303
    },
    {
      "d": 0,
      "q": "A company is building a serverless application on AWS. The application uses Amazon API Gateway and AWS Lambda. The company wants to deploy the application to its development, test, and production environments.\nWhich solution will meet these requirements with the LEAST development effort?",
      "o": [
        "Use API Gateway stage variables and create Lambda aliases to reference environment-specific resources.",
        "Use Amazon Elastic Container Service (Amazon ECS) to deploy the application to the environments.",
        "Duplicate the code for each environment. Deploy the code to a separate API Gateway stage.",
        "Use AWS Elastic Beanstalk to deploy the application to the environments."
      ],
      "ma": [
        0
      ],
      "e": "API Gateway stages represent environments, and stage variables can hold the Lambda alias name (for example dev, test, prod) used in the integration URI, with Lambda aliases pointing to the matching function versions. One API and one codebase then serve all three environments with minimal effort. ECS and Elastic Beanstalk would require moving off the serverless architecture, and duplicating code per environment is hard to maintain. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 304
    },
    {
      "d": 0,
      "q": "A developer uses AWS CloudFormation to deploy an Amazon API Gateway API and an AWS Step Functions state machine. The state machine must reference the API Gateway API after the CloudFormation template is deployed. The developer needs a solution that uses the state machine to reference the API Gateway endpoint.\nWhich solution will meet these requirements MOST cost-effectively?",
      "o": [
        "Configure the CloudFormation template to reference the API endpoint in the DefinitionSubstitutions property for the AWS::StepFunctions::StateMachine resource.",
        "Configure the CloudFormation template to store the API endpoint in an environment variable for the AWS::StepFunctions::StateMachine resource. Configure the state machine to reference the environment variable.",
        "Configure the CloudFormation template to store the API endpoint in a standard AWS::SecretsManager::Secret resource. Configure the state machine to reference the resource.",
        "Configure the CloudFormation template to store the API endpoint in a standard AWS::AppConfig::ConfigurationProfile resource. Configure the state machine to reference the resource."
      ],
      "ma": [
        0
      ],
      "e": "The AWS::StepFunctions::StateMachine resource has a DefinitionSubstitutions property that replaces placeholders in the state machine definition with values from the template, such as the API Gateway endpoint obtained via Ref or GetAtt/Fn::Sub, so the state machine references the endpoint at no extra cost. State machines have no environment variables, and storing the endpoint in Secrets Manager or AppConfig adds cost and extra service calls and permissions for something that is not a secret. Community vote: A (86%), B (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 305
    },
    {
      "d": 0,
      "q": "A developer is building an application on AWS. The application includes an AWS Lambda function that processes messages from an Amazon Simple Queue Service (Amazon SQS) queue.\nThe Lambda function sometimes fails or times out. The developer needs to figure out why the Lambda function fails to process some messages. Which solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Increase the maximum timeout of the Lambda function to 15 minutes. Check the AWS CloudTrail event history for error details.",
        "Increase the visibility timeout of the SQS queue. Check logs in Amazon CloudWatch Logs for error details.",
        "Create a dead-letter queue. Configure the Lambda function to send the failed messages to the dead-letter queue.",
        "Create an Amazon DynamoDB table. Update the Lambda function to send the failed messages to the DynamoDB table."
      ],
      "ma": [
        2
      ],
      "e": "A dead-letter queue captures messages that fail processing after the configured number of receive attempts, which keeps the failed messages available for inspection so the developer can see why they fail, with only configuration to set up. Increasing the timeout or visibility timeout and reading CloudTrail event history does not show the failed message content, since CloudTrail records API calls and not function errors. Writing failed messages to a DynamoDB table requires extra code and a new table. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 306
    },
    {
      "d": 0,
      "q": "A developer needs to deploy an application in three AWS Regions by using AWS CloudFormation. Each Region will use an AWS Elastic Beanstalk environment with an Application Load Balancer (ALB). The developer wants to use AWS Certificate Manager (ACM) to deploy SSL certificates to each ALB.\nWhich solution will meet these requirements?",
      "o": [
        "Create a certificate in ACM in any one of the Regions. Import the certificate into the ALB that is in each Region.",
        "Create a global certificate in ACM. Update the CloudFormation template to deploy the global certificate to each ALB.",
        "Create a certificate in ACM in each Region. Import the certificate into the ALB for each Region.",
        "Create a certificate in ACM in the us-east-1 Region. Update the CloudFormation template to deploy the certificate to each ALB."
      ],
      "ma": [
        2
      ],
      "e": "ACM certificates are Regional resources and cannot be used in another Region, so a certificate must be requested in ACM in each of the three Regions and associated with the ALB listener there. There is no global ACM certificate for ALBs, a certificate from one Region cannot be imported or attached to an ALB in another, and us-east-1 is special only for CloudFront, not for ALBs. Community vote: C (86%), D (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 307
    },
    {
      "d": 0,
      "q": "A company needs to deploy all its cloud resources by using AWS CloudFormation templates. A developer must create an Amazon Simple Notification Service (Amazon SNS) automatic notification to help enforce this rule. The developer creates an SNS topic and subscribes the email address of the company's security team to the SNS topic.\nThe security team must receive a notification immediately if an IAM role is created without the use of CloudFormation.\nWhich solution will meet this requirement?",
      "o": [
        "Create an AWS Lambda function to filter events from CloudTrail if a role was created without CloudFormation. Configure the Lambda function to publish to the SNS topic. Create an Amazon EventBridge schedule to invoke the Lambda function every 15 minutes.",
        "Create an AWS Fargate task in Amazon Elastic Container Service (Amazon ECS) to filter events from CloudTrail if a role was created without CloudFormation. Configure the Fargate task to publish to the SNS topic. Create an Amazon EventBridge schedule to run the Fargate task every 15 minutes.",
        "Launch an Amazon EC2 instance that includes a script to filter events from CloudTrail if a role was created without CloudFormation. Configure the script to publish to the SNS topic. Create a cron job to run the script on tile EC2 instance every 15 minutes.",
        "Create an Amazon EventBridge rule to filter events from CloudTrail if a role was created without CloudFormation. Specify the SNS topic as the target of the EventBridge rule."
      ],
      "ma": [
        3
      ],
      "e": "CloudTrail records IAM CreateRole calls as events that EventBridge receives in near real time, so an EventBridge rule with an event pattern for CreateRole where the caller is not CloudFormation (for example, based on the invoked-by or user agent field) can target the SNS topic directly and notify the security team immediately. Scheduled Lambda, Fargate or EC2 polling every 15 minutes is not immediate and requires more infrastructure and operational work. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 308
    },
    {
      "d": 0,
      "q": "A company is adopting serverless computing for some of its new services. A development team needs to create a serverless infrastructure by using AWS Serverless Application Model (AWS SAM). All infrastructure must be deployed by using AWS CloudFormation templates.\nWhat should the development team do to meet these requirements?",
      "o": [
        "Add a Resources section to the CloudFormation templates that contains AWS::Lambda::Function resources.",
        "Add a Mappings section to the CloudFormation templates that contains AWS::Serverless::Function and AWS::Serverless::API.",
        "Add a Transform section to the CloudFormation templates. Use the AWS SAM syntax to define the resources.",
        "Add a Parameters section to the CloudFormation templates that specifies the relevant AWS SAM Globals section."
      ],
      "ma": [
        2
      ],
      "e": "AWS SAM is an extension of CloudFormation. Adding the Transform: AWS::Serverless-2016-10-31 section to the template lets CloudFormation expand SAM syntax such as AWS::Serverless::Function and AWS::Serverless::Api into standard resources at deploy time. Plain AWS::Lambda::Function resources are not SAM, Mappings is for static lookup tables and not for declaring resources, and Parameters does not define SAM Globals, which belong in their own Globals section. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 309
    },
    {
      "d": 0,
      "q": "A developer is building an application that invokes AWS Lambda functions asynchronously to process events. The developer notices that a Lambda function fails to process some events at random times. The developer needs to investigate the failed events and capture the events that the Lambda function fails to process.\nWhich solution will meet these requirements?",
      "o": [
        "Add an Amazon EventBridge rule for the Lambda function. Configure the EventBridge rule to react to failed events and to store the events in an Amazon DynamoDB table.",
        "Configure the Lambda function with a dead-letter queue based in Amazon Kinesis. Update the Lambda function's execution role with the required permissions.",
        "Configure the Lambda function with an Amazon Simple Queue Service (Amazon SQS) dead-letter queue. Update the Lambda function's execution role with the required permissions.",
        "Configure the Lambda function with an Amazon Simple Queue Service (Amazon SQS) FIFO dead-letter queue. Update the Lambda function's execution role with the required permissions."
      ],
      "ma": [
        2
      ],
      "e": "For asynchronous invocations, Lambda can send events that fail all retry attempts to a dead-letter queue, which must be an SQS standard queue or an SNS topic, and the function's execution role needs sqs:SendMessage permission on it. This captures the failed events for investigation. Kinesis is not a supported DLQ target, SQS FIFO queues are not supported as Lambda DLQs, and an EventBridge rule cannot react to Lambda function failures in this way to store the events. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 310
    },
    {
      "d": 0,
      "q": "A company has built a serverless application for its ecommerce website. The application includes a REST API in Amazon API Gateway that invokes an AWS Lambda function. The Lambda function processes data and stores the data in Amazon DynamoDB table. The Lambda function calls a third-party stock application API to process the order. After the ordered is processed, the Lambda function returns an HTTP 200 status code with no body to the client.\nDuring peak usage when the API calls exceeds a certain threshold, the third-party stock application sometimes fails to process the data and responds with error messages. The company needs a solution that will not overwhelm the third-party stock application.\nWhich solution will meet these requirements?",
      "o": [
        "Configure the REST API in API Gateway to write the requests directly into DynamoDB. Configure a DynamoDB intrinsic function to perform the transformation. Set up a DynamoDB stream to call the third-party stock application API with each new row. Delete the Lambda function.",
        "Configure the REST API in API Gateway to write the requests directly into an Amazon Simple Queue Service (Amazon SQS) queue. Configure the Lambda function with a reserved concurrency equal to the third-party stock application's threshold. Set Lambda function to process the messages from the SQS queue.",
        "Configure the REST API in API Gateway to write the requests directly into an Amazon Simple Notification Service (Amazon SNS) topic. Configure the Lambda function with a provisioned concurrency equal to the third-party stock application's threshold. Set the Lambda function to process the messages from the SNS topic.",
        "Configure the REST API in API Gateway to write the requests directly into Amazon Athena. Configure the transformation of the data by using SQL with multiple query result locations set up to point to the DynamoDB table and the third-party stock fulfilment application API. Delete the Lambda function."
      ],
      "ma": [
        1
      ],
      "e": "Putting an SQS queue between API Gateway and Lambda buffers the traffic spikes, and setting the Lambda function's reserved concurrency to the third-party API's threshold limits how many invocations run in parallel, so the stock application is not overwhelmed while no requests are lost. SNS pushes messages straight to subscribers with no buffering, and provisioned concurrency only pre-warms instances and does not cap concurrency. API Gateway cannot write to Athena, and DynamoDB streams do not throttle calls to an external API. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 311
    },
    {
      "d": 0,
      "q": "A company hosts its application on AWS. The application runs on an Amazon Elastic Container Service (Amazon ECS) cluster that uses AWS Fargate. The cluster runs behind an Application Load Balancer. The application stores data in an Amazon Aurora database. A developer encrypts and manages database credentials inside the application.\nThe company wants to use a more secure credential storage method and implement periodic credential rotation.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Migrate the secret credentials to Amazon RDS parameter groups. Encrypt the parameter by using an AWS Key Management Service (AWS KMS) key. Turn on secret rotation. Use IAM policies and roles to grant AWS KMS permissions to access Amazon RDS.",
        "Migrate the credentials to AWS Systems Manager Parameter Store. Encrypt the parameter by using an AWS Key Management Service (AWS KMS) key. Turn on secret rotation. Use IAM policies and roles to grant Amazon ECS Fargate permissions to access to AWS Secrets Manager.",
        "Migrate the credentials to ECS Fargate environment variables. Encrypt the credentials by using an AWS Key Management Service (AWS KMS) key. Turn on secret rotation. Use IAM policies and roles to grant Amazon ECS Fargate permissions to access to AWS Secrets Manager.",
        "Migrate the credentials to AWS Secrets Manager. Encrypt the credentials by using an AWS Key Management Service (AWS KMS) key. Turn on secret rotation. Use IAM policies and roles to grant Amazon ECS Fargate permissions to access to AWS Secrets Manager by using keys."
      ],
      "ma": [
        3
      ],
      "e": "AWS Secrets Manager stores the Aurora credentials encrypted with KMS, has built-in managed rotation for RDS and Aurora with Lambda rotation functions, and the ECS task role grants the Fargate tasks permission to read the secret. That removes the encryption and rotation code from the application with the least operational effort. Parameter Store does not rotate secrets natively, RDS parameter groups are for database engine settings and not for credentials, and environment variables expose plaintext secrets and do not rotate. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 312
    },
    {
      "d": 0,
      "q": "A company has a mobile app. The app includes an Amazon API Gateway REST API that invokes AWS Lambda functions. The Lambda functions process data from the app.\nThe company needs to test updated Lambda functions that have new features. The company must conduct these tests with a subset of users before deployment. The tests must not affect other users of the app.\nWhich solution will meet these requirements with the LEAST amount of operational effort?",
      "o": [
        "Create a new version of each Lambda function with a weighted alias. Configure a weight value for each version of the Lambda function. Update the new weighted alias Amazon Resource Name (ARN) in the REST API.",
        "Create a new REST API in API Gateway. Set up a Lambda proxy integration to connect to multiple Lambda functions. Enable canary settings on the deployment stage. Specify a smaller percentage of API traffic to go to the new version of the Lambda function.",
        "Create a new version of each Lambda function. Integrate a predefined canary deployment in AWS CodeDeploy to slowly shift the traffic to the new versions automatically.",
        "Create a new REST API in API Gateway. Set up a Lambda non-proxy integration to connect to multiple Lambda functions. Specify the necessary parameters and properties in API Gateway. Enable canary settings on the deployment stage. Specify a smaller percentage of API traffic to go to the new version of the Lambda function."
      ],
      "ma": [
        0
      ],
      "e": "Publishing a new Lambda version and pointing a weighted alias at both the old and new versions lets a configured percentage of traffic go to the new version, and the API Gateway integration simply references the alias ARN, so only a subset of users hit the new code with minimal setup. Creating a new REST API with canary settings or building a CodeDeploy pipeline involves more configuration and in the API Gateway canary case does not change which Lambda version is invoked. Community vote: A (56%), B (38%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 313
    },
    {
      "d": 0,
      "q": "A developer works for a company that only has a single pre-production AWS account with an AWS CloudFormation AWS Serverless Application Model (AWS SAM) stack. The developer made changes to an existing AWS Lambda function specified in the AWS SAM template and additional Amazon Simple Notification service (Amazon SNS) topics.\nThe developer wants to do a one-time deploy of the changes to test if the changes are working. The developer does not want to impact the existing pre-production application that is currently being used by other team members as part of the release pipeline.\nWhich solution will meet these requirements?",
      "o": [
        "Use the AWS SAM CLI to package and deploy the SAM application to the pre-production AWS account. Specify the debug parameter.",
        "Use the AWS SAM CLI to package and create a change set against the pre-production AWS account. Execute the change set in a new AWS account designated for a development environment.",
        "Use the AWS SAM CLI to package and deploy the SAM application to a new AWS account designated for a development environment.",
        "Update the CloudFormation stack in the pre-production account. Add a separate stage that points to a new AWS account designated for a development environment."
      ],
      "ma": [
        2
      ],
      "e": "Deploying the SAM application with the SAM CLI (sam package and sam deploy) into a separate AWS account for development creates an independent CloudFormation stack, so the one-time test cannot affect the shared pre-production stack that the release pipeline is using. The debug flag only adds logging and still updates the pre-production stack. A change set is created in and executed against the stack's own account, so it cannot be executed in another account, and adding a pipeline stage is unnecessary for a one-time test. Community vote: C (80%), B (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 314
    },
    {
      "d": 0,
      "q": "A company built an online event platform. For each event, the company organizes quizzes and generates leaderboards that are based on the quiz scores. The company stores the leaderboard data in Amazon DynamoDB and retains the data for 30 days after an event is complete. The company then uses a scheduled job to delete the old leaderboard data.\nThe DynamoDB table is configured with a fixed write capacity. During the months when many events occur, the DynamoDB write API requests are throttled when the scheduled delete job runs.\nA developer must create a long-term solution that deletes the old leaderboard data and optimizes write throughput.\nWhich solution meets these requirements?",
      "o": [
        "Configure a TTL attribute for the leaderboard data.",
        "Use DynamoDB Streams to schedule and delete the leaderboard data.",
        "Use AWS Step Functions to schedule and delete the leaderboard data.",
        "Set a higher write capacity when the scheduled delete job runs."
      ],
      "ma": [
        0
      ],
      "e": "DynamoDB Time to Live (TTL) deletes expired items in the background based on a timestamp attribute, and the deletions do not consume provisioned write capacity, so the throttling from the scheduled delete job goes away. Streams, Step Functions or a higher write capacity during the job all still perform deletes that consume write capacity units and add cost or complexity. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 315
    },
    {
      "d": 0,
      "q": "A company uses an AWS Lambda function that reads messages from an Amazon Simple Queue Service (Amazon SQS) standard queue. The Lambda function makes an HTTP call to a third-party API for each message. The company wants to ensure that the Lambda function does not overwhelm the third-party API with more than two concurrent requests.\nWhich solution will meet these requirements?",
      "o": [
        "Configure a provisioned concurrency of two on the Lambda function.",
        "Configure a batch size of two on the Amazon SQS event source mapping for the Lambda function.",
        "Configure Lambda event filtering to process two messages from Amazon SQS at every invocations.",
        "Configure a maximum concurrency of two on the Amazon SQS event source mapping for the Lambda function."
      ],
      "ma": [
        3
      ],
      "e": "The SQS event source mapping has a maximum concurrency setting (minimum value 2) that limits how many concurrent invocations the mapping will drive, so setting it to 2 ensures that no more than two function instances, and therefore two concurrent calls, hit the third-party API. Provisioned concurrency pre-initializes execution environments and does not cap invocations. Batch size controls how many messages each invocation receives, and event filtering selects which messages are processed and has no concurrency role. Community vote: D (75%), A (12%), B (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 316
    },
    {
      "d": 0,
      "q": "A company is using Amazon API Gateway to develop an API for its application on AWS. A developer needs to test and generate API responses. Other teams are required to test the API immediately.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Set up a mock integration request in API Gateway. Configure the method's integration request and integration response to associate a response with a given status code.",
        "Set up the request validators in the API's OpenAPI definition file. Import the OpenAPI definitions into API Gateway to test the API.",
        "Set up a gateway response for the API in API Gateway. Configure response headers with hardcoded HTTP status codes and responses.",
        "Set up a request parameter-based Lambda authorizer to control access to the API. Configure the Lambda function with the necessary mapping template."
      ],
      "ma": [
        0
      ],
      "e": "A mock integration in API Gateway returns responses directly from the gateway without any backend, and you configure the method's integration request and integration response to return a given status code and body. Other teams can therefore test the API immediately before the backend exists. Request validators only check incoming requests, gateway responses customize error responses, and a Lambda authorizer controls access and does not generate API responses. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 317
    },
    {
      "d": 0,
      "q": "A company is releasing a new feature. Users can request early access to the new feature by using an application form. The company expects a surge of requests when the application form becomes available. Each request will be stored as an item in an Amazon DynamoDB table. Each item will contain the user's username, the submission date, and a validation status of UNVALIDATED. VALID, or NOT VALID. Each item also will contain the user's rating of the process on a scale of 1 to 5.\nEach user can submit one request. For the DynamoDB table, the developer must choose a partition key that will give the workload well-distributed records across partitions.\nWhich DynamoDB attribute will meet these requirements?",
      "o": [
        "Username",
        "Submission date",
        "Validation status",
        "Rating of the process on a scale of 1 to 5"
      ],
      "ma": [
        0
      ],
      "e": "Username is unique per user and has high cardinality, which spreads items evenly across partitions even during a surge of submissions, and it also fits the rule of one request per user. Submission date, validation status (three values) and rating (five values) have few distinct values or cluster around the same values, which creates hot partitions and uneven distribution. Community vote: A (86%), B (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 318
    },
    {
      "d": 0,
      "q": "A developer is creating a publicly accessible enterprise website consisting of only static assets. The developer is hosting the website in Amazon S3 and serving the website to users through an Amazon CloudFront distribution. The users of this application must not be able to access the application content directly from an S3 bucket. All content must be served through the Amazon CloudFront distribution.\nWhich solution will meet these requirements?",
      "o": [
        "Create a new origin access control (OAC) in CloudFront. Configure the CloudFront distribution's origin to use the new OAC. Update the S3 bucket policy to allow CloudFront OAC with read and write access to access Amazon S3 as the origin.",
        "Update the S3 bucket settings. Enable the block all public access setting in Amazon S3. Configure the CloudFront distribution's with Amazon S3 as the origin. Update the S3 bucket policy to allow CloudFront write access.",
        "Update the S3 bucket's static website settings. Enable static website hosting and specifying index and error documents. Update the CloudFront origin to use the S3 bucket's website endpoint.",
        "Update the CloudFront distribution's origin to send a custom header. Update the S3 bucket policy with a condition by using the aws:RequestTag/tag-key key. Configure the tag-key as the custom header name, and the value being matched is the header's value."
      ],
      "ma": [
        0
      ],
      "e": "Origin access control (OAC) lets CloudFront sign requests to the S3 bucket using SigV4, and a bucket policy that allows only the CloudFront service principal for the distribution, with read access for objects, blocks direct access to the bucket while the content is still served through CloudFront. The S3 website endpoint requires public access and does not support OAC. The write access in option B is unnecessary, and a custom-header check using aws:RequestTag is wrong because request tags are not HTTP headers. Community vote: A (71%), B (14%), C (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 319
    },
    {
      "d": 0,
      "q": "A developer built an application that calls an external API to obtain data, processes the data, and saves the result to Amazon S3. The developer built a container image with all of the necessary dependencies to run the application as a container.\nThe application runs locally and requires minimal CPU and RAM resources. The developer has created an Amazon ECS cluster. The developer needs to run the application hourly in Amazon Elastic Container Service (Amazon ECS).\nWhich solution will meet these requirements with the LEAST amount of infrastructure management overhead?",
      "o": [
        "Add a capacity provider to manage instances.",
        "Add an Amazon EC2 instance that runs the application.",
        "Define a task definition with an AWS Fargate launch type.",
        "Create an Amazon ECS cluster and add the managed node groups feature to run the application."
      ],
      "ma": [
        2
      ],
      "e": "Defining a task definition with the Fargate launch type runs the container serverlessly on the existing ECS cluster, with no instances to provision, patch or scale, and an hourly schedule can launch it. A capacity provider, an EC2 instance, or managed node groups (an EKS concept) all require managing EC2 capacity, which is more overhead for a small job that runs briefly each hour. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 320
    },
    {
      "d": 0,
      "q": "A company runs its website on AWS. The company posts daily polls on its website and publishes the poll results next day. The website stores user responses in an Amazon DynamoDB table. After the poll results are published, the company does not need to keep the user responses. A developer needs to implement a solution that will automatically remove old user responses from the DynamoDB table. The developer adds a new expiration_date attribute to the DynamoDB table. The developer plans to use the expiration_date attribute for the automation.\nWhich solution will meet these requirements with the LEAST development effort?",
      "o": [
        "Create an AWS Lambda function to delete old user responses based on the expiration_date attribute. Create an Amazon EventBridge schedule to run the Lambda function daily.",
        "Create an AWS Fargate task in Amazon Elastic Container Service (Amazon ECS) to delete old user responses based on the expiration_date attribute. Create an Amazon EventBridge schedule to run the Fargate task daily.",
        "Create an AWS Glue job to delete old user responses based on the expiration_date attribute. Create an AWS Glue trigger schedule to run the job daily.",
        "Enable TTL on the DynamoDB table and specify the expiration_date attribute. Expire old user responses by using DynamoDB TTL."
      ],
      "ma": [
        3
      ],
      "e": "DynamoDB Time to Live can be enabled on the table with expiration_date as the TTL attribute (a Unix epoch timestamp in seconds), and DynamoDB then deletes expired items automatically in the background at no extra write cost. That needs no code. A scheduled Lambda function, Fargate task or Glue job all require writing and operating deletion logic and consume write capacity. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 321
    },
    {
      "d": 0,
      "q": "A developer is creating a simple proof-of-concept demo by using AWS CloudFormation and AWS Lambda functions. The demo will use a CloudFormation template to deploy an existing Lambda function. The Lambda function uses deployment packages and dependencies stored in Amazon S3. The developer defined an AWS::Lambda::Function resource in a CloudFormation template. The developer needs to add the S3 bucket to the CloudFormation template.\nWhat should the developer do to meet these requirements with the LEAST development effort?",
      "o": [
        "Add the function code in the CloudFormation template inline as the code property.",
        "Add the function code in the CloudFormation template as the ZipFile property.",
        "Find the S3 key for the Lambda function. Add the S3 key as the ZipFile property in the CloudFormation template.",
        "Add the relevant key and bucket to the S3Bucket and S3Key properties in the CloudFormation template."
      ],
      "ma": [
        3
      ],
      "e": "The AWS::Lambda::Function Code property accepts S3Bucket and S3Key (and optionally S3ObjectVersion) pointing at the existing deployment package, so adding the bucket name and key is all that is needed. ZipFile is only for inline source code, which is limited to small Node.js or Python snippets and cannot take an S3 key or reference dependencies stored in S3. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 322
    },
    {
      "d": 0,
      "q": "A developer is building a microservices-based application by using Python on AWS and several AWS services. The developer must use AWS X-Ray. The developer views the service map by using the console to view the service dependencies. During testing, the developer notices that some services are missing from the service map.\nWhat can the developer do to ensure that all services appear in the X-Ray service map?",
      "o": [
        "Modify the X-Ray Python agent configuration in each service to increase the sampling rate.",
        "Instrument the application by using the X-Ray SDK for Python. Install the X-Ray SDK for all the services that the application uses.",
        "Enable X-Ray data aggregation in Amazon CloudWatch Logs for all the services that the application uses.",
        "Increase the X-Ray service map timeout value in the X-Ray console."
      ],
      "ma": [
        1
      ],
      "e": "A service appears in the X-Ray service map only if it sends trace segments to X-Ray, so each service must be instrumented with the X-Ray SDK for Python (with the daemon or an AWS-managed integration receiving the data). Sampling rate changes only how many requests are traced and do not add uninstrumented services. X-Ray has no CloudWatch Logs data aggregation setting for this and no service map timeout value. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 323
    },
    {
      "d": 0,
      "q": "A developer is building a containerized application on AWS. The application communicates with a third-party service by using API keys. The developer needs a secure way to store the API keys and pass the API keys to the containerized application.\nWhich solutions will meet these requirements? (Choose two.)",
      "o": [
        "Store the API keys as a SecureString parameter in AWS Systems Manager Parameter Store. Grant the application access to retrieve the value from Parameter Store.",
        "Store the API keys in AWS CloudFormation templates by using base64 encoding. Pass the API keys to the application through container definition environment variables.",
        "Add a new AWS CloudFormation parameter to the CloudFormation template. Pass the API keys to the application by using the container definition environment variables.",
        "Embed the API keys in the application. Build the container image on-premises. Upload the container image to Amazon Elastic Container Registry (Amazon ECR).",
        "Store the API keys as a SecretString parameter in AWS Secrets Manager. Grant the application access to retrieve the value from Secrets Manager."
      ],
      "ma": [
        0,
        4
      ],
      "e": "A SecureString parameter in Systems Manager Parameter Store is encrypted with KMS and can be retrieved by the application, or injected into the container definition, when it is granted permission (A). A secret in AWS Secrets Manager is also encrypted at rest and can be retrieved at runtime or injected through the ECS secrets field (E). Base64 encoding is not encryption, passing the key as a plain CloudFormation parameter or environment variable exposes it in the console and templates, and embedding keys in the container image makes them extractable. Community vote: AE (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 324
    },
    {
      "d": 0,
      "q": "A company runs an application on AWS. The application stores data in an Amazon DynamoDB table. Some queries are taking a long time to run. These slow queries involve an attribute that is not the table's partition key or sort key.\nThe amount of data that the application stores in the DynamoDB table is expected to increase significantly. A developer must increase the performance of the queries.\nWhich solution will meet these requirements?",
      "o": [
        "Increase the page size for each request by setting the Limit parameter to be higher than the default value. Configure the application to retry any request that exceeds the provisioned throughput.",
        "Create a global secondary index (GSI). Set query attribute to be the partition key of the index.",
        "Perform a parallel scan operation by issuing individual scan requests. In the parameters, specify the segment for the scan requests and the total number of segments for the parallel scan.",
        "Turn on read capacity auto scaling for the DynamoDB table. Increase the maximum read capacity units (RCUs)."
      ],
      "ma": [
        1
      ],
      "e": "Queries on an attribute that is not the table's partition or sort key would otherwise need a scan, so creating a global secondary index with that attribute as its partition key turns them into efficient queries that keep working as the table grows. Raising Limit, parallel scans and increasing read capacity still read the whole table and become more expensive and slower as data volume increases. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 325
    },
    {
      "d": 0,
      "q": "A company runs a payment application on Amazon EC2 instances behind an Application Load Balance. The EC2 instances run in an Auto Scaling group across multiple Availability Zones. The application needs to retrieve application secrets during the application startup and export the secrets as environment variables. These secrets must be encrypted at rest and need to be rotated every month.\nWhich solution will meet these requirements with the LEAST development effort?",
      "o": [
        "Save the secrets in a text file and store the text file in Amazon S3. Provision a customer managed key. Use the key for secret encryption in Amazon S3. Read the contents of the text file and read the export as environment variables. Configure S3 Object Lambda to rotate the text file every month.",
        "Save the secrets as strings in AWS Systems Manager Parameter Store and use the default AWS Key Management Service (AWS KMS) key. Configure an Amazon EC2 user data script to retrieve the secrets during the startup and export as environment variables. Configure an AWS Lambda function to rotate the secrets in Parameter Store every month.",
        "Save the secrets as base64 encoded environment variables in the application properties. Retrieve the secrets during the application startup. Reference the secrets in the application code. Write a script to rotate the secrets saved as environment variables.",
        "Store the secrets in AWS Secrets Manager. Provision a new customer master key. Use the key to encrypt the secrets. Enable automatic rotation. Configure an Amazon EC2 user data script to programmatically retrieve the secrets during the startup and export as environment variables."
      ],
      "ma": [
        3
      ],
      "e": "AWS Secrets Manager provides encryption at rest with a KMS key and native automatic rotation on a schedule such as every 30 days, and the instance user data script can fetch the secret at startup with the AWS CLI or SDK and export it as environment variables, so very little custom code is needed. Parameter Store does not rotate automatically, so a rotation Lambda function would need to be built. Storing secrets in S3 or in base64 environment variables requires custom rotation scripts and gives weak protection. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 326
    },
    {
      "d": 0,
      "q": "A company is using Amazon API Gateway to invoke a new AWS Lambda function. The company has Lambda function versions in its PROD and DEV environments. In each environment, there is a Lambda function alias pointing to the corresponding Lambda function version. API Gateway has one stage that is configured to point at the PROD alias.\nThe company wants to configure API Gateway to enable the PROD and DEV Lambda function versions to be simultaneously and distinctly available.\nWhich solution will meet these requirements?",
      "o": [
        "Enable a Lambda authorizer for the Lambda function alias in API Gateway. Republish PROD and create a new stage for DEV. Create API Gateway stage variables for the PROD and DEV stages. Point each stage variable to the PROD Lambda authorizer to the DEV Lambda authorizer.",
        "Set up a gateway response in API Gateway for the Lambda function alias. Republish PROD and create a new stage for DEV. Create gateway responses in API Gateway for PROD and DEV Lambda aliases.",
        "Use an environment variable for the Lambda function alias in API Gateway. Republish PROD and create a new stage for development. Create API gateway environment variables for PROD and DEV stages. Point each stage variable to the PROD Lambda function alias to the DEV Lambda function alias.",
        "Use an API Gateway stage variable to configure the Lambda function alias. Republish PROD and create a new stage for development. Create API Gateway stage variables for PROD and DEV stages. Point each stage variable to the PROD Lambda function alias and to the DEV Lambda function alias."
      ],
      "ma": [
        3
      ],
      "e": "API Gateway stage variables act like per-stage environment variables, so the Lambda integration can reference the alias through a stage variable (for example function:${stageVariables.alias}). Creating a second stage for development and setting the variable to the PROD alias in one stage and the DEV alias in the other makes both versions available at the same time under different stage URLs. Gateway responses only customize error responses, Lambda authorizers handle access control, and API Gateway has no concept of environment variables. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 327
    },
    {
      "d": 0,
      "q": "A developer is working on an ecommerce platform that communicates with several third-party payment processing APIs. The third-party payment services do not provide a test environment.\nThe developer needs to validate the ecommerce platform's integration with the third-party payment processing APIs. The developer must test the API integration code without invoking the third-party payment processing APIs.\nWhich solution will meet these requirements?",
      "o": [
        "Set up an Amazon API Gateway REST API with a gateway response configured for status code 200. Add response templates that contain sample responses captured from the real third-party API.",
        "Set up an AWS AppSync GraphQL API with a data source configured for each third-party API. Specify an integration type of Mock. Configure integration responses by using sample responses captured from the real third-party API.",
        "Create an AWS Lambda function for each third-party API. Embed responses captured from the real third-party API. Configure Amazon Route 53 Resolver with an inbound endpoint for each Lambda function's Amazon Resource Name (ARN).",
        "Set up an Amazon API Gateway REST API for each third-party API. Specify an integration request type of Mock. Configure integration responses by using sample responses captured from the real third-party API."
      ],
      "ma": [
        3
      ],
      "e": "A mock integration in an API Gateway REST API returns configured integration responses without calling any backend, so creating a REST API per third-party API that returns sample responses captured from the real service lets the developer test integration code without invoking the actual payment APIs. A gateway response only customizes API Gateway error responses, AppSync does not have a Mock integration type for data sources like this, and Route 53 Resolver inbound endpoints cannot route requests to Lambda ARNs. Community vote: D (80%), A (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 328
    },
    {
      "d": 0,
      "q": "A developer is storing many objects in a single Amazon S3 bucket. The developer needs to optimize the S3 bucket for high request rates. How should the developer store the objects to meet this requirement?",
      "o": [
        "Store the objects by using S3 Intelligent-Tiering.",
        "Store the objects at the root of the S3 bucket.",
        "Store the objects by using object key names distributed across multiple prefixes.",
        "Store each object with an object tag named \"prefix\" that contains a unique value."
      ],
      "ma": [
        2
      ],
      "e": "S3 request rate limits (at least 3,500 PUT/COPY/POST/DELETE and 5,500 GET/HEAD requests per second) apply per prefix, so spreading object keys across multiple prefixes scales the aggregate request rate in the bucket. Storage class such as Intelligent-Tiering affects cost and not request rates, keeping everything at the bucket root uses a single prefix, and an object tag is not part of the key and does not partition the request load. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 329
    },
    {
      "d": 0,
      "q": "A company deploys a new application to AWS. The company is streaming application logs to Amazon CloudWatch Logs. The company's development team must receive notification by email when the word \"ERROR\" appears in any log lines. A developer sets up an Amazon Simple Notification Service (Amazon SNS) topic and subscribes the development team to the topic.\nWhat should the developer do next to meet the requirements?",
      "o": [
        "Select the appropriate log group. Create a CloudWatch metric filter with \"ERROR\" as the search term. Create an alarm on this metric that notifies the SNS topic when the metric is 1 or higher.",
        "In CloudWatch Logs Insights, select the appropriate log group. Create a metric query to search for the term \"ERROR\" in the logs. Create an alarm on this metric that notifies the SNS topic when the metric is 1 or higher.",
        "Select the appropriate log group. Create an SNS subscription filter with \"ERROR\" as the filter pattern. Select the SNS topic as the destination.",
        "Create a CloudWatch alarm that includes \"ERROR\" as a filter pattern, a log group dimension that defines the appropriate log group, and a destination that notifies the SNS topic."
      ],
      "ma": [
        0
      ],
      "e": "A CloudWatch Logs metric filter on the log group with the term ERROR turns matching log lines into a metric, and a CloudWatch alarm on that metric (threshold 1 or higher) can notify the SNS topic, which emails the team. Logs Insights queries cannot be turned directly into alarms this way, there is no SNS subscription filter for log groups (subscription filters deliver to Kinesis, Firehose or Lambda), and alarms do not take filter patterns directly. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 330
    },
    {
      "d": 0,
      "q": "A company uses Amazon Simple Queue Service (Amazon SQS) to decouple its microservices architecture. Some messages in an SQS queue contain sensitive information. A developer must implement a solution that encrypts all the data at rest.\nWhich solution will meet this requirement?",
      "o": [
        "Enable server-side encryption for the SQS queue by using an SQS managed encryption key (SSE-SQS).",
        "Use the aws:SecureTransport condition in the queue policy to ensure that only HTTPS (TLS) is used for all requests to the SQS queue.",
        "Use AWS Certificate Manager (ACM) to generate an SSL/TLS certificate. Reference the certificate when messages are sent to the queue.",
        "Set a message attribute in the SQS SendMessage request for messages that are sent to the queue. Set the Name to ENCRYPT. Set the Value to TRUE."
      ],
      "ma": [
        0
      ],
      "e": "Enabling server-side encryption on the queue with SSE-SQS (or SSE-KMS) encrypts the message bodies at rest as soon as they are sent to SQS, with no changes to application code. The aws:SecureTransport condition only enforces encryption in transit, and ACM certificates are not used to encrypt SQS messages. An ENCRYPT message attribute is just ordinary metadata and does not trigger any encryption. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 331
    },
    {
      "d": 0,
      "q": "A company recently deployed a new serverless user portal. Users have reported that part of the portal is slow. The initial analysis found a single Amazon API Gateway endpoint that is responsible for the performance issues. The endpoint integrates with an AWS Lambda function. However, the Lambda function interacts with other APIs and AWS services.\nHow can a developer find the source of the increased response time by using operational best practices?",
      "o": [
        "Update the Lambda function by adding logging statements with high-precision timestamps before and after each external request. Deploy the updated Lambda function. After accumulating enough usage data, examine the Amazon CloudWatch logs for the Lambda function to determine the likely sources for the increased response time.",
        "Instrument the Lambda function with the AWS X-Ray SDK. Add HTTP and HTTPS interceptors and SDK client handlers. Deploy the updated Lambda function. Turn on X-Ray tracing. After accumulating enough usage data, use the X-Ray service map to examine the average response times to determine the likely sources.",
        "Review the Lambda function's Amazon CloudWatch metrics by using the metrics explorer. Apply anomaly detection to the Duration metric and the Throttles metric. Review the anomalies to determine the likely sources.",
        "Use Amazon CloudWatch Synthetics to create a new canary. Turn on AWS X-Ray tracing on the canary. Configure the canary to scan the user portal. After accumulating enough usage data, use the CloudWatch Synthetics canary dashboard to view the metrics from the canary."
      ],
      "ma": [
        1
      ],
      "e": "Instrumenting the Lambda function with the AWS X-Ray SDK, adding HTTP/HTTPS interceptors and SDK client handlers, and enabling tracing records subsegments for every downstream API and AWS service call, and the X-Ray service map then shows average latency per dependency to pinpoint the slow one. Adding manual timing logs is more work and less structured, CloudWatch metric anomaly detection on Duration shows only that the function is slow and not which dependency, and Synthetics canaries show the user-facing symptom and not the internal cause. Community vote: B (83%), D (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 332
    },
    {
      "d": 0,
      "q": "A developer is building an event-driven application by using AWS Lambda and Amazon EventBridge. The Lambda function needs to push events to an EventBridge event bus. The developer uses an SDK to run the PutEvents EventBridge action and specifies no credentials in the code. After deploying the Lambda function, the developer notices that the function is failing and there are AccessDeniedException errors in the logs. How should the developer resolve this issue?",
      "o": [
        "Configure a VPC peering connection between the Lambda function and EventBridge.",
        "Modify their AWS credentials to include permissions for the PutEvents EventBridge action.",
        "Modify the Lambda function execution role to include permissions for the PutEvents EventBridge action.",
        "Add a resource-based policy to the Lambda function to include permissions for the PutEvents EventBridge action."
      ],
      "ma": [
        2
      ],
      "e": "The Lambda function calls PutEvents with credentials from its execution role, which is what the SDK uses when no credentials are specified in code, so an AccessDeniedException means the role lacks the events:PutEvents permission. Adding that permission to the execution role resolves it. VPC peering with EventBridge is not a thing, there are no separate developer credentials in play, and a resource-based policy on the function controls who can invoke the function and not what the function can call. Community vote: C (80%), D (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 333
    },
    {
      "d": 0,
      "q": "A company's application has an AWS Lambda function that processes messages from IoT devices. The company wants to monitor the Lambda function to ensure that the Lambda function is meeting its required service level agreement (SLA).\nA developer must implement a solution to determine the application's throughput in near real time. The throughput must be based on the number of messages that the Lambda function receives and processes in a given time period. The Lambda function performs initialization and post- processing steps that must not factor into the throughput measurement.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Use the Lambda function's ConcurrentExecutions metric in Amazon CloudWatch to measure the throughput.",
        "Modify the application to log the calculated throughput to Amazon CloudWatch Logs. Use Amazon EventBridge to invoke a separate Lambda function to process the logs on a schedule.",
        "Modify the application to publish custom Amazon CloudWatch metrics when the Lambda function receives and processes each message. Use the metrics to calculate the throughput.",
        "Use the Lambda function's Invocations metric and Duration metric to calculate the throughput in Amazon CloudWatch."
      ],
      "ma": [
        2
      ],
      "e": "Publishing custom CloudWatch metrics from the application code at the points where a message is received and processed measures exactly the messages handled, excluding initialization and post-processing time, and CloudWatch makes them available in near real time for throughput calculations. ConcurrentExecutions, Invocations and Duration metrics include the whole invocation and do not count the messages, and writing logs processed by a scheduled Lambda function is not near real time. Community vote: C (86%), A (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 334
    },
    {
      "d": 0,
      "q": "A developer is using an AWS CodePipeline pipeline to provide continuous integration and continuous delivery (CI/CD) support for a Java application. The developer needs to update the pipeline to support the introduction of a new application dependency .jar file. The pipeline must start a build when a new version of the .jar file becomes available.\nWhich solution will meet these requirements?",
      "o": [
        "Create an Amazon S3 bucket to store the dependency .jar file. Publish the dependency .jar file to the S3 bucket. Use an Amazon Simple Notification Service (Amazon SNS) notification to start a CodePipeline pipeline build.",
        "Create an Amazon Elastic Container Registry (Amazon ECR) private repository. Publish the dependency .jar file to the repository. Use an ECR source action to start a CodePipeline pipeline build.",
        "Create an Amazon Elastic Container Registry (Amazon ECR) private repository. Publish the dependency .jar file to the repository. Use an Amazon Simple Notification Service (Amazon SNS) notification to start a CodePipeline pipeline build.",
        "Create an AWS CodeArtifact repository. Publish the dependency .jar file to the repository. Use an Amazon EventBridge rule to start a CodePipeline pipeline build."
      ],
      "ma": [
        3
      ],
      "e": "AWS CodeArtifact is an artifact repository that supports Maven and other package formats for Java .jar dependencies, and it emits events when a new package version is published, which an Amazon EventBridge rule can use to start the CodePipeline pipeline. ECR stores container images and not .jar files, and CodePipeline's S3 source plus SNS option does not match because SNS is not how a pipeline is triggered by a new S3 object. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 335
    },
    {
      "d": 0,
      "q": "A company with multiple branch locations has an analytics and reporting application. Each branch office pushes a sales report to a shared Amazon S3 bucket at a predefined time each day. The company has developed an AWS Lambda function that analyzes the reports from all branch offices in a single pass. The Lambda function stores the results in a database.\nThe company needs to start the analysis once each day at a specific time.\nWhich solution will meet these requirements MOST cost-effectively?",
      "o": [
        "Configure an S3 event notification to invoke the Lambda function when a branch office uploads a sales report.",
        "Create an AWS Step Functions state machine that invokes the Lambda function once each day at the predefined time.",
        "Configure the Lambda function to run continuously and to begin analysis only at the predefined time each day.",
        "Create an Amazon EventBridge scheduled rule that invokes the Lambda function once each day at the predefined time."
      ],
      "ma": [
        3
      ],
      "e": "An Amazon EventBridge scheduled rule (cron expression) invokes the Lambda function once per day at the specified time, and you pay only for that single invocation, which is the cheapest way to run the analysis at a set time. An S3 event notification would trigger the function for each branch upload instead of once after all reports arrive, a Step Functions state machine still needs a trigger, and a continuously running Lambda function is not possible and would be wasteful. Community vote: D (83%), A (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 336
    },
    {
      "d": 0,
      "q": "A developer has an application that asynchronously invokes an AWS Lambda function. The developer wants to store messages that resulted in failed invocations of the Lambda function so that the application can retry the call later.\nWhat should the developer do to accomplish this goal with the LEAST operational overhead?",
      "o": [
        "Set up Amazon CloudWatch Logs log groups to filter and store the messages in an Amazon S3 bucket. Import the messages in Lambda. Run the Lambda function again.",
        "Configure Amazon EventBridge to send the messages to Amazon Simple Notification Service (Amazon SNS) to initiate the Lambda function again.",
        "Implement a dead-letter queue for discarded messages. Set the dead-letter queue as an event source for the Lambda function.",
        "Send Amazon EventBridge events to an Amazon Simple Queue Service (Amazon SQS) queue. Configure the Lambda function to pull messages from the SQS queue. Run the Lambda function again."
      ],
      "ma": [
        2
      ],
      "e": "For asynchronous invocations, configuring an SQS dead-letter queue on the Lambda function sends events that fail after the retry attempts into the queue with no custom code, and the application can later reprocess them from the queue, for example by using it as an event source. The other options need extra log processing, EventBridge routing or SNS plumbing that adds components and operational overhead. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 337
    },
    {
      "d": 0,
      "q": "A company is using AWS CloudFormation templates to deploy AWS resources. The company needs to update one of its AWS CloudFormation stacks.\nWhat can the company do to find out how the changes will impact the resources that are running?",
      "o": [
        "Investigate the change sets.",
        "Investigate the stack policies.",
        "Investigate the Metadata section.",
        "Investigate the Resources section."
      ],
      "ma": [
        0
      ],
      "e": "CloudFormation change sets let you preview the changes a stack update will make, including which resources will be added, modified, replaced or deleted, before you execute the update. Stack policies only prevent updates to specified resources, and the Metadata and Resources sections describe the template contents and do not show the impact of a proposed change on running resources. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 338
    },
    {
      "d": 0,
      "q": "A company stores all personally identifiable information (PII) in an Amazon DynamoDB table named PII in Account A. Developers are working on an application that is running on Amazon EC2 instances in Account B. The application in Account B requires access to the PII table.\nAn administrator in Account A creates an IAM role named AccessPII that has permission to access the PII table. The administrator also creates a trust policy that specifies Account B as a principal that can assume the role.\nWhich combination of steps should the developers take in Account B to allow their application to access the PII table? (Choose two.)",
      "o": [
        "Allow the EC2 IAM role the permission to assume the AccessPII role.",
        "Allow the EC2 IAM role the permission to access the PII table.",
        "Include the AWS API in the application code logic to obtain temporary credentials from the EC2 IAM role to access the PII table.",
        "Include the AssumeRole API operation in the application code logic to obtain temporary credentials to access the PII table.",
        "Include the GetSessionToken API operation in the application code logic to obtain temporary credentials to access the PII table."
      ],
      "ma": [
        0,
        3
      ],
      "e": "For cross-account access, the EC2 instance's IAM role in Account B needs an identity policy allowing sts:AssumeRole on the AccessPII role in Account A (A), and the application code must call the AssumeRole API to get temporary credentials for that role, and then use them to access the PII table (D). The EC2 role does not itself have direct permission to the table in Account A (B), instance role credentials only apply to Account B, and GetSessionToken returns credentials for the same identity and cannot assume a role. Community vote: AD (80%), BD (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 339
    },
    {
      "d": 0,
      "q": "A gaming website gives users the ability to trade game items with each other on the platform. The platform requires both users' records to be updated and persisted in one transaction. If any update fails, the transaction must roll back.\nWhich AWS solutions can provide the transactional capability that is required for this feature? (Choose two.)",
      "o": [
        "Amazon DynamoDB with operations made with the ConsistentRead parameter set to true",
        "Amazon ElastiCache for Memcached with operations made within a transaction block",
        "Amazon DynamoDB with reads and writes made by using Transact* operations",
        "Amazon Aurora MySQL with operations made within a transaction block",
        "Amazon Athena with operations made within a transaction block"
      ],
      "ma": [
        2,
        3
      ],
      "e": "DynamoDB TransactWriteItems and TransactGetItems (Transact* operations) provide all-or-nothing ACID transactions across multiple items, so both users' records are updated together or not at all (C). Amazon Aurora MySQL is a relational database that supports standard transactions with commit and rollback (D). Consistent reads do not provide transactions, ElastiCache for Memcached has no transaction blocks, and Athena is a query service that does not support transactional updates in this way. Community vote: CD (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 340
    },
    {
      "d": 0,
      "q": "A developer is deploying an application in the AWS Cloud by using AWS CloudFormation. The application will connect to an existing Amazon RDS database. The hostname of the RDS database is stored in AWS Systems Manager Parameter Store as a plaintext value. The developer needs to incorporate the database hostname into the CloudFormation template to initialize the application when the stack is created.\nHow should the developer reference the parameter that contains the database hostname?",
      "o": [
        "Use the ssm dynamic reference.",
        "Use the Ref intrinsic function.",
        "Use the Fn::ImportValue intrinsic function.",
        "Use the ssm-secure dynamic reference."
      ],
      "ma": [
        0
      ],
      "e": "CloudFormation dynamic references use the {{resolve:ssm:parameter-name}} syntax to retrieve a plaintext String parameter from Systems Manager Parameter Store when the stack is created or updated. The ssm-secure reference is for SecureString parameters, Ref returns the logical resource or parameter value from within the template and cannot read Parameter Store directly, and Fn::ImportValue imports exports from other stacks. Community vote: A (83%), D (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 341
    },
    {
      "d": 0,
      "q": "A company uses an AWS Lambda function to call a third-party service. The third-party service has a limit of requests each minute. If the number of requests exceeds the limit, the third-party service returns rate-limiting errors.\nA developer needs to configure the Lambda function to avoid receiving rate limiting errors from the third-party service.\nWhich solution will meet these requirements?",
      "o": [
        "Set the reserved concurrency on the Lambda function to match the number of concurrent requests that the third-party service allows.",
        "Decrease the memory that is allocated to the Lambda function.",
        "Set the provisioned concurrency on the Lambda function to match the number of concurrent requests that the third-party service allows.",
        "Increase the timeout value that is specified on the Lambda function."
      ],
      "ma": [
        0
      ],
      "e": "Setting the function's reserved concurrency to the number of concurrent requests the third-party service allows caps how many instances of the function can run at the same time, which limits the call rate to the service. Provisioned concurrency only keeps environments warm and does not cap invocations beyond that number. Changing memory or the timeout does not limit how many requests are sent. Community vote: A (75%), D (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 342
    },
    {
      "d": 0,
      "q": "A developer is building a new containerized application by using AWS Copilot. The developer uses the AWS Copilot command line interface (CLI) to deploy the application during development. The developer committed the application code to a new AWS CodeCommit repository. The developer must create an automated deployment process before releasing the new application to production.\nWhat should the developer do to meet these requirements in the MOST operationally efficient way?",
      "o": [
        "Create a buildspec file that invokes the AWS Copilot CLI commands to build and deploy the application. Use the AWS Copilot CLI to create an AWS CodePipeline that uses the CodeCommit repository in the source stage and AWS CodeBuild in the build stage.",
        "Use the AWS Serverless Application Model (AWS SAM) CLI to bootstrap and initialize an AWS CodePipeline configuration. Use the CodeCommit repository as the source. Invoke the AWS Copilot CLI to build and deploy the application.",
        "Use the AWS Copilot CLI to define the AWS Copilot pipeline and to deploy the AWS CodePipeline. Select CodeCommit as the source for the AWS CodePipeline.",
        "Define an AWS CloudFormation template for an AWS CodePipeline with CodeCommit as the source. Configure the template as an AWS Copilot CLI add-on. Use the AWS Copilot CLI to deploy the application."
      ],
      "ma": [
        2
      ],
      "e": "AWS Copilot has built-in pipeline commands (copilot pipeline init and copilot pipeline deploy) that generate and deploy an AWS CodePipeline with CodeCommit as the source and CodeBuild stages to build and deploy the application for each environment, so this is the most operationally efficient approach. Writing a custom buildspec and pipeline, using SAM CLI (for serverless applications), or hand-writing a CloudFormation add-on all involve more manual work. Community vote: C (75%), A (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 343
    },
    {
      "d": 0,
      "q": "A developer is creating a new application for a pet store. The application will manage customer rewards points. The developer will use Amazon DynamoDB to store the data for the application. The developer needs to optimize query performance and limit partition overload before actual performance analysis.\nWhich option should the developer use for a partition key to meet these requirements?",
      "o": [
        "A randomly generated universally unique identifier (UUID)",
        "The customer's full name",
        "The date when the customer signed up for the rewards program",
        "The name of the customer's pet"
      ],
      "ma": [
        0
      ],
      "e": "A randomly generated UUID has very high cardinality and is evenly distributed, so items spread uniformly across partitions and no single partition becomes hot, even before any access pattern analysis. A customer's full name, a signup date, and a pet's name can repeat or cluster, which risks uneven distribution and hot partitions. Community vote: A (75%), C (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 344
    },
    {
      "d": 0,
      "q": "A developer uses AWS IAM Identity Center (AWS Single Sign-On) to interact with the AWS CLI and AWS SDKs on a local workstation. API calls to AWS services were working when the SSO access was first configured. However, the developer is now receiving Access Denied errors. The developer has not changed any configuration files or scripts that were previously working on the workstation.\nWhat is the MOST likely cause of the developer's access issue?",
      "o": [
        "The access permissions to the developer's AWS CLI binary file have changed.",
        "The permission set that is assumed by IAM Identity Center does not have the necessary permissions to complete the API call.",
        "The credentials from the IAM Identity Center federated role have expired.",
        "The developer is attempting to make API calls to the incorrect AWS account."
      ],
      "ma": [
        2
      ],
      "e": "IAM Identity Center issues temporary credentials for the CLI and SDKs, and the SSO session and role credentials expire (the CLI session lasts a limited time, commonly up to 8 hours), after which calls fail with access errors until the developer runs aws sso login again. Nothing was changed in configuration, which rules out changes to permission sets, the target account, or file permissions on the CLI binary, and the same setup worked at the start. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 345
    },
    {
      "d": 0,
      "q": "A company is building a serverless application. The application uses an API key to authenticate with a third-party application. The company wants to store the external API key as a part of an AWS Lambda configuration. The company needs to have full control over the AWS Key Management Service (AWS KMS) keys that will encrypt the API key and should be visible only to authorized entities.\nWhich solution will meet these requirements?",
      "o": [
        "Store the API key in AWS Systems Manager Parameter Store as a string parameter. Use the default AWS KMS key that AWS provides to encrypt the API key.",
        "Store the API key in AWS Lambda environment variables. Create an AWS KMS customer managed key to encrypt the API key.",
        "Store the API key in the code repository. Use an AWS managed key to encrypt the code repository.",
        "Store the API key as an Amazon DynamoDB table record. Use an AWS managed key to encrypt the API key."
      ],
      "ma": [
        1
      ],
      "e": "Lambda environment variables are encrypted at rest by default, and you can configure a KMS customer managed key to encrypt them, which gives the company full control over the key policy so that only authorized entities can use the key and see the value. The default Parameter Store key and AWS managed keys do not give that level of control, and storing the key in a code repository or DynamoDB item does not satisfy the requirement of keeping it in the Lambda configuration. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 346
    },
    {
      "d": 0,
      "q": "A developer is writing an application to analyze the traffic to a fleet of Amazon EC2 instances. The EC2 instances run behind a public Application Load Balancer (ALB). An HTTP server runs on each of the EC2 instances, logging all requests to a log file.\nThe developer wants to capture the client public IP addresses. The developer analyzes the log files and notices only the IP address of the ALB. What must the developer do to capture the client public IP addresses in the log file?",
      "o": [
        "Add a Host header to the HTTP server log configuration file.",
        "Install the Amazon CloudWatch Logs agent on each EC2 instance. Configure the agent to write to the log file.",
        "Install the AWS X-Ray daemon on each EC2 instance. Configure the daemon to write to the log file.",
        "Add an X-Forwarded-For header to the HTTP server log configuration file."
      ],
      "ma": [
        3
      ],
      "e": "An ALB terminates the client connection and opens a new one to the instance, so the instance sees the ALB's IP address. The ALB adds the client's IP address in the X-Forwarded-For request header, so the HTTP server's log format must be configured to log that header to capture client public IPs. A Host header carries the requested domain name, and the CloudWatch Logs agent and X-Ray daemon only ship logs and traces, and do not change what the HTTP server writes into its log. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 347
    },
    {
      "d": 0,
      "q": "A company is developing a serverless application by using AWS Lambda functions. One of the Lambda functions needs to access an Amazon RDS DB instance. The DB instance is in a private subnet inside a VPC.\nThe company creates a role that includes the necessary permissions to access the DB instance. The company then assigns the role to the Lambda function. A developer must take additional action to give the Lambda function access to the DB instance.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Assign a public IP address to the DB instance. Modify the security group of the DB instance to allow inbound traffic from the IP address of the Lambda function.",
        "Set up an AWS Direct Connect connection between the Lambda function and the DB instance.",
        "Configure an Amazon CloudFront distribution to create a secure connection between the Lambda function and the DB instance.",
        "Configure the Lambda function to connect to the private subnets in the VPC. Add security group rules to allow traffic to the DB instance from the Lambda function."
      ],
      "ma": [
        3
      ],
      "e": "To reach a database in private subnets, the Lambda function must be configured with VPC access (subnets and security groups) so its network interfaces are in the VPC, and the DB instance's security group must allow inbound traffic from the function's security group on the database port. A public IP address on the DB would expose it, and Direct Connect and CloudFront are not used to connect Lambda to an RDS instance. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 348
    },
    {
      "d": 0,
      "q": "A developer needs temporary access to resources in a second account.\nWhat is the MOST secure way to achieve this?",
      "o": [
        "Use the Amazon Cognito user pools to get short-lived credentials for the second account.",
        "Create a dedicated IAM access key for the second account, and send it by mail.",
        "Create a cross-account access role, and use sts:AssumeRole API to get short-lived credentials.",
        "Establish trust, and add an SSH key for the second account to the IAM user."
      ],
      "ma": [
        2
      ],
      "e": "Creating an IAM role in the second account with a trust policy for the developer's account and calling sts:AssumeRole returns temporary, automatically expiring credentials, and no long-term keys are shared, which is the standard secure approach for cross-account access. Emailing access keys or adding SSH keys involves long-term credentials, and Cognito user pools authenticate application users and do not issue credentials for another AWS account's resources. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 349
    },
    {
      "d": 0,
      "q": "A company wants to migrate applications from its on-premises servers to AWS. As a first step, the company is modifying and migrating a non- critical application to a single Amazon EC2 instance. The application will store information in an Amazon S3 bucket. The company needs to follow security best practices when deploying the application on AWS.\nWhich approach should the company take to allow the application to interact with Amazon S3?",
      "o": [
        "Create an IAM role that has administrative access to AWS. Attach the role to the EC2 instance.",
        "Create an IAM user. Attach the AdministratorAccess policy. Copy the generated access key and secret key. Within the application code, use the access key and secret key along with the AWS SDK to communicate with Amazon S3.",
        "Create an IAM role that has the necessary access to Amazon S3. Attach the role to the EC2 instance.",
        "Create an IAM user. Attach a policy that provides the necessary access to Amazon S3. Copy the generated access key and secret key. Within the application code, use the access key and secret key along with the AWS SDK to communicate with Amazon S3."
      ],
      "ma": [
        2
      ],
      "e": "An IAM role with only the S3 permissions that the application needs, attached to the EC2 instance through an instance profile, gives the application temporary credentials that are rotated automatically and follow the principle of least privilege. IAM users with access keys embedded in code risk leaking long-term credentials, and an administrator role or AdministratorAccess policy grants far more permissions than the application needs. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 350
    },
    {
      "d": 0,
      "q": "A company has an internal website that contains sensitive data. The company wants to make the website public. The company must ensure that only employees who authenticate through the company's OpenID Connect (OIDC) identity provider (IdP) can access the website. A developer needs to implement authentication without editing the website.\nWhich combination of steps will meet these requirements? (Choose two.)",
      "o": [
        "Create a public Network Load Balancer.",
        "Create a public Application Load Balancer.",
        "Configure a listener for the load balancer that listens on HTTPS port 443. Add a default authenticate action providing the OIDC IdP configuration.",
        "Configure a listener for the load balancer that listens on HTTP port 80. Add a default authenticate action providing the OIDC IdP configuration.",
        "Configure a listener for the load balancer that listens on HTTPS port 443. Add a default AWS Lambda action providing an Amazon Resource Name (ARN) to a Lambda authentication function."
      ],
      "ma": [
        1,
        2
      ],
      "e": "An Application Load Balancer supports built-in authentication actions on HTTPS listeners, so a public ALB listening on port 443 with a default authenticate-oidc action authenticates users against the OIDC IdP before forwarding to the unchanged website. A Network Load Balancer operates at layer 4 and has no authentication actions. An authenticate action requires HTTPS, so the HTTP port 80 listener fails, and a Lambda action would require writing and maintaining custom authentication code. Community vote: BC (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 351
    },
    {
      "d": 0,
      "q": "A developer is working on a web application that requires selective activation of specific features. The developer wants to keep the features hidden from end users until the features are ready for public access.\nWhich solution will meet these requirements?",
      "o": [
        "Create a feature flag configuration profile in AWS AppSync. Store the feature flag values in the configuration profile. Activate and deactivate feature flags as needed.",
        "Store prerelease data in an Amazon DynamoDB table. Enable Amazon DynamoDB Streams in the table. Toggle between hidden and visible states by using DynamoDB Streams.",
        "Create a feature flag configuration profile in AWS AppConfig. Store the feature flag values in the configuration profile. Activate and deactivate feature flags as needed.",
        "Store prerelease data in AWS Amplify DataStore. Toggle between hidden and visible states by using Amplify DataStore cloud synchronization."
      ],
      "ma": [
        2
      ],
      "e": "AWS AppConfig supports feature flag configuration profiles that let you store flag values and turn features on or off, with controlled deployment strategies, without redeploying the application. AWS AppSync is a GraphQL service with no feature flag profiles. A DynamoDB table with Streams or Amplify DataStore synchronization is a data store or sync mechanism, not a purpose-built feature toggle system. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 352
    },
    {
      "d": 0,
      "q": "A developer at a company writes an AWS CloudFormation template. The template refers to subnets that were created by a separate AWS CloudFormation template that the company's network team wrote. When the developer attempts to launch the stack for the first time, the launch fails.\nWhich template coding mistakes could have caused this failure? (Choose two.)",
      "o": [
        "The developer's template does not use the Ref intrinsic function to refer to the subnets.",
        "The developer's template does not use the ImportValue intrinsic function to refer to the subnets.",
        "The Mappings section of the developer's template does not refer to the subnets.",
        "The network team's template does not export the subnets in the Outputs section.",
        "The network team's template does not export the subnets in the Mappings section."
      ],
      "ma": [
        1,
        3
      ],
      "e": "To share subnets across stacks, the network team's template must export the subnet IDs in its Outputs section with an Export name, and the developer's template must consume them with the Fn::ImportValue intrinsic function. Missing either side makes the stack launch fail. Ref only references resources in the same template, and the Mappings section is a static lookup table that has no role in cross-stack exports. Community vote: BD (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 353
    },
    {
      "d": 0,
      "q": "A developer is running an application on an Amazon EC2 instance. When the application tries to read an Amazon S3 bucket, the application fails. The developer notices that the associated IAM role is missing the S3 read permission. The developer needs to give the application the ability to read the S3 bucket.\nWhich solution will meet this requirement with the LEAST application disruption?",
      "o": [
        "Add the permission to the role. Terminate the existing EC2 instance. Launch a new EC2 instance.",
        "Add the permission to the role so that the change will take effect automatically.",
        "Add the permission to the role. Hibernate and restart the existing EC2 instance.",
        "Add the permission to the S3 bucket. Restart the EC2 instance."
      ],
      "ma": [
        1
      ],
      "e": "IAM policy changes on a role are applied to the role directly, and the temporary credentials the instance profile supplies pick up the new permissions without any restart, so adding the permission to the role is enough. Terminating, hibernating, or restarting the instance causes needless disruption. The failure is a missing identity-based permission on the role, so editing the bucket policy and restarting does not address it. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 354
    },
    {
      "d": 0,
      "q": "A developer is writing a web application that is deployed on Amazon EC2 instances behind an internet-facing Application Load Balancer (ALB). The developer must add an Amazon CloudFront distribution in front of the ALB. The developer also must ensure that customer data from outside the VPC is encrypted in transit.\nWhich combination of CloudFront configuration settings should the developer use to meet these requirements? (Choose two.)",
      "o": [
        "Restrict viewer access by using signed URLs.",
        "Set the Origin Protocol Policy setting to Match Viewer.",
        "Enable field-level encryption.",
        "Enable automatic object compression.",
        "Set the Viewer Protocol Policy setting to Redirect HTTP to HTTPS."
      ],
      "ma": [
        1,
        4
      ],
      "e": "Setting the Origin Protocol Policy to Match Viewer makes CloudFront connect to the ALB over HTTPS when the viewer used HTTPS, and setting the Viewer Protocol Policy to Redirect HTTP to HTTPS forces viewers onto HTTPS, so traffic is encrypted both from the client to CloudFront and from CloudFront to the origin. Signed URLs restrict access but do not encrypt. Field-level encryption protects specific POST fields rather than the whole connection, and compression only affects performance. Community vote: BE (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 355
    },
    {
      "d": 0,
      "q": "A developer is implementing an AWS Lambda function that will be invoked when an object is uploaded to Amazon S3. The developer wants to test the Lambda function in a local development machine before publishing the function to a production AWS account.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Upload an object to Amazon S3 by using the aws s3api put-object CLI command. Wait for the local Lambda invocation from the S3 event.",
        "Create a sample JSON text file for a put object S3 event. Invoke the Lambda function locally. Use the aws lambda invoke CLI command with the JSON file and Lambda function name as arguments.",
        "Use the sam local start-lambda CLI command to start Lambda. Use the sam local generate-event s3 put CLI command to create the Lambda test JSON file. Use the sam local invoke CLI command with the JSON file as the argument to invoke the Lambda function.",
        "Create a JSON string for the put object S3 event. In the AWS Management Console, use the JSON string to create a test event for the local Lambda function. Perform the test."
      ],
      "ma": [
        2
      ],
      "e": "The AWS SAM CLI is built for local testing: sam local generate-event s3 put produces a realistic S3 put event JSON, and sam local invoke runs the function locally with that event, giving the least setup. Uploading to S3 does not trigger a local function, and aws lambda invoke calls the deployed function in AWS rather than a local copy. The console test event also targets the cloud function, not a local one. Community vote: C (80%), D (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 356
    },
    {
      "d": 0,
      "q": "A developer is publishing critical log data to a log group in Amazon CloudWatch Logs. The log group was created 2 months ago. The developer must encrypt the log data by using an AWS Key Management Service (AWS KMS) key so that future data can be encrypted to comply with the company's security policy.\nWhich solution will meet this requirement with the LEAST effort?",
      "o": [
        "Use the AWS Encryption SDK for encryption and decryption of the data before writing to the log group.",
        "Use the AWS KMS console to associate the KMS key with the log group.",
        "Use the AWS CLI aws logs create-log-group command, and specify the key Amazon Resource Name (ARN).",
        "Use the AWS CLI aws logs associate-kms-key command, and specify the key Amazon Resource Name (ARN)."
      ],
      "ma": [
        3
      ],
      "e": "An existing CloudWatch Logs log group can be encrypted by running aws logs associate-kms-key with the KMS key ARN, and the key then encrypts newly ingested data. Creating the log group with the key (create-log-group) only works at creation time, and this log group already exists. Client-side encryption with the Encryption SDK requires code changes, and associating a key is not done from the KMS console for log groups. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 357
    },
    {
      "d": 0,
      "q": "A developer is working on an app for a company that uses an Amazon DynamoDB table named Orders to store customer orders. The table uses OrderID as the partition key and there is no sort key. The table contains more than 100,000 records. The developer needs to add a functionality that will retrieve all Orders records that contain an OrderSource attribute with the MobileApp value.\nWhich solution will improve the user experience in the MOST efficient way?",
      "o": [
        "Perform a Scan operation on the Orders table. Provide a QueryFilter condition to filter to only the items where the OrderSource attribute is equal to the MobileApp value.",
        "Create a local secondary index (LSI) with OrderSource as the partition key. Perform a Query operation by using MobileApp as the key.",
        "Create a global secondary index (GSI) with OrderSource as the sort key. Perform a Query operation by using MobileApp as the key.",
        "Create a global secondary index (GSI) with OrderSource as the partition key. Perform a Query operation by using MobileApp as the key."
      ],
      "ma": [
        3
      ],
      "e": "The table key is OrderID only, so finding items by OrderSource needs an index with OrderSource as the partition key. A GSI can be added to an existing table and then queried by MobileApp, which avoids scanning 100,000+ records. A LSI must be created at table creation time and must share the table's partition key, a GSI with OrderSource as sort key still needs a partition key to query, and Scan reads the whole table and applies the filter afterward (QueryFilter is also not a Scan parameter). Community vote: C (50%), D (50%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 358
    },
    {
      "d": 0,
      "q": "A company has an application that uses an AWS Lambda function to process data. A developer must implement encryption in transit for all sensitive configuration data, such as API keys, that is stored in the application. The developer creates an AWS Key Management Service (AWS KMS) customer managed key.\nWhat should the developer do next to meet the encryption requirement?",
      "o": [
        "Create parameters of the String type in AWS Systems Manager Parameter Store. For each parameter, specify the KMS key ID to encrypt the parameter in transit. Reference the GetParameter API call in the Lambda environment variables.",
        "Create secrets in AWS Secrets Manager by using the customer managed KMS key. Create a new Lambda function and set up a Lambda layer. Configure the Lambda layer to retrieve the values from Secrets Manager.",
        "Create objects in Amazon S3 for each sensitive data field. Specify the customer managed KMS key to encrypt the object. Configure the Lambda function to retrieve the objects from Amazon S3 during data processing.",
        "Create encrypted Lambda environment variables. Specify the customer managed KMS key to encrypt the variables. Enable encryption helpers for encryption in transit. Grant permission to the Lambda function's execution role to access the KMS key."
      ],
      "ma": [
        3
      ],
      "e": "Lambda environment variables can be encrypted with a customer managed KMS key, and enabling encryption helpers makes the console encrypt the values client-side before they are stored so they are also protected in transit, with the execution role granted kms:Decrypt on the key. Parameter Store String type parameters are not encrypted at all, and S3 objects or a Secrets Manager layer add unnecessary components and do not provide the encryption helper behavior the question targets. Community vote: B (50%), D (38%), A (12%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 359
    },
    {
      "d": 0,
      "q": "A developer is building an ecommerce application. When there is a sale event, the application needs to concurrently call three third-party systems to record the sale. The developer wrote three AWS Lambda functions. There is one Lambda function for each third-party system, which contains complex integration logic.\nThese Lambda functions are all independent. The developer needs to design the application so each Lambda function will run regardless of others' success or failure.\nWhich solution will meet these requirements?",
      "o": [
        "Publish the sale event from the application to an Amazon Simple Queue Service (Amazon SQS) queue. Configure the three Lambda functions to poll the queue.",
        "Publish the sale event from the application to an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe the three Lambda functions to be triggered by the SNS topic.",
        "Publish the sale event from the application to an Application Load Balancer (ALB). Add the three Lambda functions as ALB targets.",
        "Publish the sale event from the application to an AWS Step Functions state machine. Move the logic from the three Lambda functions into the Step Functions state machine."
      ],
      "ma": [
        1
      ],
      "e": "Publishing to an SNS topic with all three Lambda functions subscribed fans the event out so each function is invoked independently, and one function failing does not affect the others. With SQS, the three functions would compete for the same messages so each message would be processed by only one function. An ALB sends each request to a single target, and moving the logic into Step Functions couples the three tasks into one workflow rather than isolating them. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 360
    },
    {
      "d": 0,
      "q": "A developer is writing an application, which stores data in an Amazon DynamoDB table. The developer wants to query the DynamoDB table by using the partition key and a different sort key value. The developer needs the latest data with all recent write operations.\nHow should the developer write the DynamoDB query?",
      "o": [
        "Add a local secondary index (LSI) during table creation. Query the LSI by using eventually consistent reads.",
        "Add a local secondary index (LSI) during table creation. Query the LSI by using strongly consistent reads.",
        "Add a global secondary index (GSI) during table creation. Query the GSI by using eventually consistent reads.",
        "Add a global secondary index (GSI) during table creation. Query the GSI by using strongly consistent reads."
      ],
      "ma": [
        1
      ],
      "e": "A local secondary index shares the table's partition key and offers an alternate sort key, and it is the only index type that supports strongly consistent reads, so the query returns all recent writes. LSIs must be defined at table creation, which the option does. GSIs support only eventually consistent reads, so the GSI options cannot guarantee the latest data, and an eventually consistent LSI query would not either. Community vote: D (67%), B (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 361
    },
    {
      "d": 0,
      "q": "A developer manages an application that writes customer orders to an Amazon DynamoDB table. The orders use customer_id as the partition key, order_id as the sort key, and order_date as an attribute. A new access pattern requires accessing data by order_date and order_id. The developer needs to implement a new AWS Lambda function to support the new access pattern.\nHow should the developer support the new access pattern in the MOST operationally efficient way?",
      "o": [
        "Add a new local secondary index (LSI) to the DynamoDB table that specifies order_date as the partition key and order_id as the sort key. Write the new Lambda function to query the new LSI index.",
        "Write the new Lambda function to scan the DynamoDB table. In the Lambda function, write a method to retrieve and combine results by order_date and order_id.",
        "Add a new global secondary index (GSI) to the DynamoDB table that specifies order_date as the partition key and order_id as the sort key. Write the new Lambda function to query the new GSI index.",
        "Enable DynamoDB Streams on the table. Choose the new and old images information to write to the DynamoDB stream. Write the new Lambda function to query the DynamoDB stream"
      ],
      "ma": [
        2
      ],
      "e": "Adding a global secondary index with order_date as the partition key and order_id as the sort key lets the Lambda function Query by those attributes, and a GSI can be added to an existing table. A LSI cannot be added after table creation and must keep the table's partition key (customer_id), so it cannot use order_date as partition key. A Scan is inefficient and costly, and DynamoDB Streams is a change log that cannot be queried. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 362
    },
    {
      "d": 0,
      "q": "A developer is creating a web application for a school that stores data in Amazon DynamoDB. The ExamScores table has the following attributes: student_id, subject_name, and top_score.\nEach item in the ExamScores table is identified with student_id as the partition key and subject_name as the sort key. The web application needs to display the student _id for the top scores for each school subject. The developer needs to increase the speed of the queries to retrieve the student_id for the top scorer for each school subject.\nWhich solution will meet these requirements?",
      "o": [
        "Create a local secondary index (LSI) with subject_name as the partition key and top_score as the sort key.",
        "Create a local secondary index (LSI) with top_score as the partition key and student_id as the sort key.",
        "Create a global secondary index (GSI) with subject_name as the partition key and top_score as the sort key.",
        "Create a global secondary index (GSI) with subject_name as the partition key and student_id as the sort key."
      ],
      "ma": [
        2
      ],
      "e": "A GSI with subject_name as the partition key and top_score as the sort key groups items by subject and sorts them by score, so a Query with ScanIndexForward false and Limit 1 returns the top scorer's student_id, which is projected from the table key. A LSI must use the table's partition key student_id, so options A and B are invalid designs, and a GSI sorted by student_id gives no ordering by score. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 363
    },
    {
      "d": 0,
      "q": "A developer wrote an application that uses an AWS Lambda function to asynchronously generate short videos based on requests from customers. This video generation can take up to 10 minutes. After the video is generated, a URL to download the video is pushed to the customer's web browser. The customer should be able to access these videos for at least 3 hours after generation.\nWhich solution will meet these requirements?",
      "o": [
        "Store the video in the /tmp folder within the Lambda execution environment. Push a Lambda function URL to the customer.",
        "Store the video in an Amazon Elastic File System (Amazon EFS) file system attached to the function. Generate a pre-signed URL for the video object and push the URL to the customer.",
        "Store the video in Amazon S3. Generate a pre-signed URL for the video object and push the URL to the customer.",
        "Store the video in an Amazon CloudFront distribution. Generate a pre-signed URL for the video object and push the URL to the customer."
      ],
      "ma": [
        2
      ],
      "e": "Storing the generated video in Amazon S3 and creating a pre-signed URL with an expiration of at least 3 hours gives customers durable, time-limited access. Lambda /tmp is ephemeral and local to one execution environment, and a Lambda function URL does not serve files from it. EFS objects cannot be shared with S3 pre-signed URLs, and you do not store objects directly in a CloudFront distribution, which needs an origin such as S3. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 364
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Lambda function that is invoked by messages to an Amazon Simple Notification Service (Amazon SNS) topic. The messages represent customer data updates from a customer relationship management (CRM) system The developer wants the Lambda function to process only the messages that pertain to email address changes. Additional subscribers to the SNS topic will process any other messages.\nWhich solution will meet these requirements in the LEAST development effort?",
      "o": [
        "Use Lambda event filtering to allow only messages that are related to email address changes to invoke the Lambda function.",
        "Use an SNS filter policy on the Lambda function subscription to allow only messages that are related to email address changes to invoke the Lambda function.",
        "Subscribe an Amazon Simple Queue Service (Amazon SQS) queue to the SNS topic. Configure the SQS queue with a filter policy to allow only messages that are related to email address changes. Connect the SQS queue to the Lambda function.",
        "Configure the Lambda code to check the received message. If the message is not related to an email address change, configure the Lambda function to publish the message back to the SNS topic for the other subscribers to process."
      ],
      "ma": [
        1
      ],
      "e": "An SNS subscription filter policy applied to the Lambda subscription delivers only matching messages to that subscriber, while other subscribers still receive the rest of the messages, and it requires only configuration with no code. Lambda event filtering does not apply to SNS-triggered invocations, adding an SQS queue adds extra components, and having the function republish messages to the topic would cause loops and extra development. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 365
    },
    {
      "d": 0,
      "q": "A developer is designing a fault-tolerant environment where client sessions will be saved.\nHow can the developer ensure that no sessions are lost if an Amazon EC2 instance fails?",
      "o": [
        "Use sticky sessions with an Elastic Load Balancer target group.",
        "Use Amazon SQS to save session data.",
        "Use Amazon DynamoDB to perform scalable session handling.",
        "Use Elastic Load Balancer connection draining to stop sending requests to failing instances."
      ],
      "ma": [
        2
      ],
      "e": "Storing session data in a durable external store such as Amazon DynamoDB keeps sessions available independently of any single EC2 instance, so a failed instance loses nothing. Sticky sessions pin users to an instance and lose the session if that instance fails. SQS is a message queue, not a session store, and connection draining only finishes in-flight requests when instances deregister without preserving session state. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 366
    },
    {
      "d": 0,
      "q": "A developer is creating AWS CloudFormation templates to manage an application's deployment in Amazon Elastic Container Service (Amazon ECS) through AWS CodeDeploy. The developer wants to automatically deploy new versions of the application to a percentage of users before the new version becomes available for all users.\nHow should the developer manage the deployment of the new version?",
      "o": [
        "Modify the CloudFormation template to include a Transform section and the AWS::CodeDeploy::BlueGreen hook.",
        "Deploy the new version in a new CloudFormation stack. After testing is complete, update the application's DNS records for the new stack.",
        "Run CloudFormation stack updates on the application stack to deploy new application versions when they are available.",
        "Create a nested stack for the new version. Include a Transform section and the AWS::CodeDeploy::BlueGreen hook."
      ],
      "ma": [
        0
      ],
      "e": "For ECS blue/green deployments managed through CloudFormation and CodeDeploy, the template uses a Transform section with the AWS::CodeDeploy::BlueGreen hook, which lets CodeDeploy shift traffic gradually using canary or linear configurations before cutting over fully. Deploying a separate stack and flipping DNS or doing plain stack updates gives no percentage-based traffic shifting. A nested stack for the new version does not by itself define the blue/green hook behavior on the application stack. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 367
    },
    {
      "d": 0,
      "q": "A developer has written a distributed application that uses microservices. The microservices are running on Amazon EC2 instances. Because of message volume, the developer is unable to match log output from each microservice to a specific transaction. The developer needs to analyze the message flow to debug the application.\nWhich combination of steps should the developer take to meet this requirement? (Choose two.)",
      "o": [
        "Download the AWS X-Ray daemon. Install the daemon on an EC2 instance. Ensure that the EC2 instance allows UDP traffic on port 2000.",
        "Configure an interface VPC endpoint to allow traffic to reach the global AWS X-Ray daemon on TCP port 2000.",
        "Enable AWS X-Ray. Configure Amazon CloudWatch to push logs to X-Ray.",
        "Add the AWS X-Ray software development kit (SDK) to the microservices. Use X-Ray to trace requests that each microservice makes.",
        "Set up Amazon CloudWatch metric streams to collect streaming data from the microservices."
      ],
      "ma": [
        0,
        3
      ],
      "e": "Tracing a request across microservices is done with AWS X-Ray: the X-Ray SDK in each microservice records segments and propagates the trace header, and the X-Ray daemon running on the EC2 instance listens on UDP port 2000 and relays the segments to the X-Ray service. X-Ray does not ingest CloudWatch Logs, the daemon uses UDP rather than a TCP interface endpoint on port 2000, and CloudWatch metric streams deliver metrics, not request traces. Community vote: AD (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 368
    },
    {
      "d": 0,
      "q": "A company is working on a new serverless application. A developer needs to find an automated way to deploy AWS Lambda functions and the dependent infrastructure with minimum coding effort. The application also needs to be reliable.\nWhich method will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Build the application by using shell scripts to create .zip files for each Lambda function. Manually upload the .zip files to the AWS Management Console.",
        "Build the application by using the AWS Serverless Application Model (AWS SAM). Use a continuous integration and continuous delivery (CI/CD) pipeline and the SAM CLI to deploy the Lambda functions.",
        "Build the application by using shell scripts to create .zip files for each Lambda function. Upload the .zip files. Deploy the .zip files as Lambda functions by using the AWS CLI in a continuous integration and continuous delivery (CI/CD) pipeline.",
        "Build a container for each Lambda function. Store the container images in AWS CodeArtifact. Deploy the containers as Lambda functions by using the AWS CLI in a continuous integration and continuous delivery (CI/CD) pipeline."
      ],
      "ma": [
        1
      ],
      "e": "AWS SAM provides shorthand resource types for Lambda functions and related infrastructure, and the SAM CLI (sam build and sam deploy, which uses CloudFormation) can be run in a CI/CD pipeline for repeatable, reliable deployments with minimal code. Scripting zip files by hand, with manual console uploads or custom CLI deployments, requires far more effort and is error prone. CodeArtifact stores software packages, not container images (that is ECR). Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 369
    },
    {
      "d": 0,
      "q": "A developer needs to modify an application architecture to meet new functional requirements. Application data is stored in Amazon DynamoDB and processed for analysis in a nightly batch. The system analysts do not want to wait until the next day to view the processed data and have asked to have it available in near-real time.\nWhich application architecture pattern would enable the data to be processed as it is received?",
      "o": [
        "Event driven",
        "Client-server driven",
        "Fan-out driven",
        "Schedule driven"
      ],
      "ma": [
        0
      ],
      "e": "An event-driven architecture reacts to each change as it occurs, for example by using DynamoDB Streams to trigger processing as items are written, which delivers near-real-time results instead of a nightly batch. Schedule-driven is the batch pattern the analysts want to leave behind. Client-server describes request and response communication, and fan-out distributes one message to many consumers but does not by itself process data as it arrives. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 370
    },
    {
      "d": 0,
      "q": "A company hosts its application in the us-west-1 Region. The company wants to add redundancy in the us-east-1 Region.\nThe application secrets are stored in AWS Secrets Manager in us-west-1. A developer needs to replicate the secrets to us-east-1.\nWhich solution will meet this requirement?",
      "o": [
        "Configure secret replication for each secret. Add us-east-1 as a replication Region. Choose an AWS Key Management Service (AWS KMS) key in us-east-1 to encrypt the replicated secrets.",
        "Create a new secret in us-east-1 for each secret. Configure secret replication in us-east-1. Set the source to be the corresponding secret in us-west-1. Choose an AWS Key Management Service (AWS KMS) key in us-west-1 to encrypt the replicated secrets.",
        "Create a replication rule for each secret. Set us-east-1 as the destination Region. Configure the rule to run during secret rotation. Choose an AWS Key Management Service (AWS KMS) key in us-east-1 to encrypt the replicated secrets.",
        "Create a Secrets Manager lifecycle rule to replicate each secret to a new Amazon S3 bucket in us-west-1. Configure an S3 replication rule to replicate the secrets to us-east-1."
      ],
      "ma": [
        0
      ],
      "e": "Secrets Manager has built-in multi-Region secret replication: on the source secret you add us-east-1 as a replica Region and choose a KMS key in that Region to encrypt the replica, and the replica is kept in sync automatically. Replication is configured on the source secret, not by creating a new secret in the destination, and there is no replication rule tied to rotation. Lifecycle rules to S3 do not exist for Secrets Manager. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 371
    },
    {
      "d": 0,
      "q": "A company runs an ecommerce application on AWS. The application stores data in an Amazon Aurora database.\nA developer is adding a caching layer to the application. The caching strategy must ensure that the application always uses the most recent value for each data item.\nWhich caching strategy will meet these requirements?",
      "o": [
        "Implement a TTL strategy for every item that is saved in the cache.",
        "Implement a write-through strategy for every item that is created and updated.",
        "Implement a lazy loading strategy for every item that is loaded.",
        "Implement a read-through strategy for every item that is loaded."
      ],
      "ma": [
        1
      ],
      "e": "A write-through strategy updates the cache at the same time the database is written, so cached items always reflect the latest value. TTL and lazy loading can serve stale data until the item expires or is reloaded. Read-through populates the cache on a miss but does not update existing cached entries when the data changes, so it can also return stale values. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 372
    },
    {
      "d": 0,
      "q": "A company has a serverless application that uses Amazon API Gateway backed by AWS Lambda proxy integration. The company is developing several backend APIs. The company needs a landing page to provide an overview of navigation to the APIs.\nA developer creates a new/LandingPage resource and a new GET method that uses mock integration.\nWhat should the developer do next to meet these requirements?",
      "o": [
        "Configure the integration request mapping template with Content-Type of text/html and statusCode of 200. Configure the integration response mapping template with Content-Type of application/json. In the integration response mapping template, include the LandingPage HTML code that references the APIs.",
        "Configure the integration request mapping template with Content-Type of application/json. In the integration request mapping template, include the LandingPage HMTL code that references the APIs. Configure the integration response mapping template with Content-Type of text/html and statusCode of 200.",
        "Configure the integration request mapping template with Content-Type of application/json and statusCode of 200. Configure the integration response mapping template with Content-Type of text/html. In the integration response mapping template, include the LandingPage HTML code that references the APIs.",
        "Configure the integration request mapping template with Content-Type of text/html. In the integration request mapping template, include the LandingPage HTML code that references the APIs. Configure the integration response mapping template with Content-Type of application/json and statusCode of 200."
      ],
      "ma": [
        2
      ],
      "e": "For a mock integration, the integration request mapping template must return a JSON status code such as {statusCode: 200} so API Gateway can choose the response, and the integration response mapping template with Content-Type text/html then contains the HTML for the landing page. The HTML belongs in the integration response, not the request, and the response content type must be text/html rather than application/json for browsers to render the page. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 373
    },
    {
      "d": 0,
      "q": "A developer creates an AWS Lambda function that is written in Java. During testing, the Lambda function does not work how the developer expected. The developer wants to use tracing capabilities to troubleshoot the problem.\nWhich AWS service should the developer use to accomplish this goal?",
      "o": [
        "AWS Trusted Advisor",
        "Amazon CloudWatch",
        "AWS X-Ray",
        "AWS CloudTrail"
      ],
      "ma": [
        2
      ],
      "e": "AWS X-Ray provides tracing for Lambda functions, including Java functions via the X-Ray SDK or active tracing, showing segments, subsegments, and downstream calls to help find where behavior goes wrong. CloudWatch offers logs and metrics but not request tracing, CloudTrail records API calls for auditing, and Trusted Advisor gives account best-practice checks. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 374
    },
    {
      "d": 0,
      "q": "A company is developing an application that will be accessed through the Amazon API Gateway REST API. Registered users should be the only ones who can access certain resources of this API. The token being used should expire automatically and needs to be refreshed periodically. How can a developer meet these requirements?",
      "o": [
        "Create an Amazon Cognito identity pool, configure the Amazon Cognito Authorizer in API Gateway, and use the temporary credentials generated by the identity pool.",
        "Create and maintain a database record for each user with a corresponding token and use an AWS Lambda authorizer in API Gateway.",
        "Create an Amazon Cognito user pool, configure the Cognito Authorizer in API Gateway, and use the identity or access token.",
        "Create an IAM user for each API user, attach an invoke permissions policy to the API, and use an IAM authorizer in API Gateway."
      ],
      "ma": [
        2
      ],
      "e": "A Cognito user pool authenticates registered users and issues ID and access tokens that expire and can be renewed with a refresh token, and API Gateway's Cognito user pool authorizer validates those tokens. An identity pool issues AWS credentials and is not used with the Cognito authorizer, a custom Lambda authorizer with database-stored tokens requires building token expiry and refresh yourself, and creating an IAM user per API user does not scale or provide expiring tokens. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 375
    },
    {
      "d": 0,
      "q": "A company used AWS to develop an application for customers. The application includes an Amazon API Gateway API that invokes AWS Lambda functions. The Lambda functions process data and store the data in Amazon DynamoDB tables.\nThe company must monitor the entire application to identify potential bottlenecks in the architecture that can negatively affect customers. Which solution will meet this requirement with the LEAST development effort?",
      "o": [
        "Instrument the application with AWS X-Ray. Inspect the service map to identify errors and issues.",
        "Configure Lambda exceptions and additional logging to Amazon CloudWatch. Use CloudWatch Logs Insights to query the logs.",
        "Configure API Gateway to log responses to Amazon CloudWatch. Create a metric filter for the TooManyRequestsException error message.",
        "Use Amazon CloudWatch metrics for the DynamoDB tables to identify all the ProvisionedThroughputExceededException error messages."
      ],
      "ma": [
        0
      ],
      "e": "AWS X-Ray traces requests end to end across API Gateway, Lambda, and DynamoDB, and its service map shows latency, errors, and throttling per component, which makes it the quickest way to locate bottlenecks in the architecture with little code (enable tracing and add the SDK). Logs Insights, a metric filter on one error, or DynamoDB metrics each look at a single component and require more effort to correlate. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 376
    },
    {
      "d": 0,
      "q": "A company launched an online portal to announce a new product that the company will release in 6 months. The portal requests that users enter an email address to receive communications about the product. The company needs to create a REST API that will store the email addresses in Amazon DynamoDB.\nA developer has created an AWS Lambda function that can store the email addresses. The developer will deploy the Lambda function by using the AWS Serverless Application Model (AWS SAM). The developer must provide access to the Lambda function over HTTP.\nWhich solutions will meet these requirements with the LEAST additional configuration? (Choose two.)",
      "o": [
        "Expose the Lambda function by using function URLs.",
        "Expose the Lambda function by using a Gateway Load Balancer.",
        "Expose the Lambda function by using a Network Load Balancer.",
        "Expose the Lambda function by using AWS Global Accelerator.",
        "Expose the Lambda function by using Amazon API Gateway."
      ],
      "ma": [
        0,
        4
      ],
      "e": "Lambda function URLs give a function a dedicated HTTPS endpoint with almost no configuration, and Amazon API Gateway integrates directly with Lambda and is supported by AWS SAM through the Api or HttpApi event types, so both expose the function over HTTP with minimal setup. Gateway Load Balancer is for network appliances, Network Load Balancer operates at layer 4 and cannot target Lambda, and Global Accelerator does not front Lambda functions directly. Community vote: AE (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 377
    },
    {
      "d": 0,
      "q": "A company has a website that displays a daily newsletter. When a user visits the website, an AWS Lambda function processes the browser's request and queries the company's on-premises database to obtain the current newsletter. The newsletters are stored in English. The Lambda function uses the Amazon Translate TranslateText API operation to translate the newsletters, and the translation is displayed to the user. Due to an increase in popularity, the website's response time has slowed. The database is overloaded. The company cannot change the database and needs a solution that improves the response time of the Lambda function.\nWhich solution meets these requirements?",
      "o": [
        "Change to asynchronous Lambda function invocation.",
        "Cache the translated newsletters in the Lambda/tmp directory.",
        "Enable TranslateText API caching.",
        "Change the Lambda function to use parallel processing."
      ],
      "ma": [
        1
      ],
      "e": "Because the newsletter is the same daily content, the Lambda function can cache the database result and the translated output in the /tmp directory, which persists across invocations within a warm execution environment, so repeat requests avoid the database call and another Amazon Translate call. Amazon Translate has no TranslateText API caching feature. Asynchronous invocation does not reduce the work per request, and parallel processing does not fix the overloaded database. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 378
    },
    {
      "d": 0,
      "q": "A developer is monitoring an application that runs on an Amazon EC2 instance. The developer has configured a custom Amazon CloudWatch metric with data granularity of 1 second. If any issues occur, the developer wants to be notified within 30 seconds by Amazon Simple Notification Service (Amazon SNS).\nWhat should the developer do to meet this requirement?",
      "o": [
        "Configure a high-resolution CloudWatch alarm.",
        "Set up a custom CloudWatch dashboard.",
        "Use Amazon CloudWatch Logs Insights.",
        "Change to a default CloudWatch metric."
      ],
      "ma": [
        0
      ],
      "e": "High-resolution custom metrics (1-second granularity) can be monitored by a high-resolution alarm, which evaluates at periods of 10 or 30 seconds and can send an SNS notification within the required window. Standard alarms evaluate at 1-minute minimum periods. Dashboards and Logs Insights only display or query data, and default metrics have coarser granularity so they cannot meet the 30-second need. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 379
    },
    {
      "d": 0,
      "q": "A company has a web application that contains an Amazon API Gateway REST API. A developer has created an AWS CloudFormation template for the initial deployment of the application. The developer has deployed the application successfully as part of an AWS CodePipeline continuous integration and continuous delivery (CI/CD) process. All resources and methods are available through the deployed stage endpoint.\nThe CloudFormation template contains the following resource types:\n\u2022 AWS::ApiGateway::RestApi \u2022 AWS::ApiGateway::Resource \u2022 AWS::ApiGateway::Method \u2022 AWS::ApiGateway::Stage \u2022 AWS::ApiGateway::Deployment The developer adds a new resource to the REST API with additional methods and redeploys the template. CloudFormation reports that the deployment is successful and that the stack is in the UPDATE_COMPLETE state. However, calls to all new methods are returning 404 (Not Found) errors.\nWhat should the developer do to make the new methods available?",
      "o": [
        "Specify the disable-rollback option during the update-stack operation.",
        "Unset the CloudFormation stack failure options.",
        "Add an AWS CodeBuild stage to CodePipeline to run the aws apigateway create-deployment AWS CLI command.",
        "Add an action to CodePipeline to run the aws cloudfront create-invalidation AWS CLI command."
      ],
      "ma": [
        2
      ],
      "e": "API Gateway changes to resources and methods only take effect once the API is deployed to a stage, and a CloudFormation AWS::ApiGateway::Deployment resource is not recreated when the template changes unless something forces it, so the new methods are not live and return 404. Running aws apigateway create-deployment from a CodeBuild stage redeploys the API to the stage. Rollback settings concern stack failures, and CloudFront invalidation is irrelevant to an API Gateway stage endpoint. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 380
    },
    {
      "d": 0,
      "q": "A developer updates an AWS Lambda function that an Amazon API Gateway API uses. The API is the backend for a web application.\nThe developer needs to test the updated Lambda function before deploying the Lambda function to production. The testing must not affect any production users of the web application.\nWhich solution will meet these requirements in the MOST operationally efficient way?",
      "o": [
        "Create a canary release deployment for the existing API stage. Deploy the API to the existing stage. Test the updated Lambda function by using the existing URL.",
        "Update the API Gateway API endpoint type to private. Deploy the changes to the existing API stage. Test the API by using the existing URL.",
        "Create a new test API stage in API Gateway. Add stage variables to deploy the updated Lambda function to only the test stage. Test the updated Lambda function by using the new stage URL.",
        "Create a new AWS CloudFormation stack to deploy a copy of the entire production API and Lambda function. Use the stack's API URL to test the updated Lambda function."
      ],
      "ma": [
        2
      ],
      "e": "Creating a separate test stage and using stage variables to point the integration at a Lambda alias for the updated function lets the developer test through the test stage URL without touching the production stage or users. A canary release on the existing stage sends part of production traffic to the new code, so users are affected. Changing the endpoint to private would break production access, and duplicating the whole stack is far more work. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 381
    },
    {
      "d": 0,
      "q": "A developer wants the ability to roll back to a previous version of an AWS Lambda function in the event of errors caused by a new deployment. How can the developer achieve this with MINIMAL impact on users?",
      "o": [
        "Change the application to use an alias that points to the current version. Deploy the new version of the code. Update the alias to use the newly deployed version. If too many errors are encountered, point the alias back to the previous version.",
        "Change the application to use an alias that points to the current version. Deploy the new version of the code. Update the alias to direct 10% of users to the newly deployed version. If too many errors are encountered, send 100% of traffic to the previous version.",
        "Do not make any changes to the application. Deploy the new version of the code. If too many errors are encountered, point the application back to the previous version using the version number in the Amazon Resource Name (ARN).",
        "Create three aliases: new, existing, and router. Point the existing alias to the current version. Have the router alias direct 100% of users to the existing alias. Update the application to use the router alias. Deploy the new version of the code. Point the new alias to this version. Update the router alias to direct 10% of users to the new alias. If too many errors are encountered, send 100% of traffic to the existing alias."
      ],
      "ma": [
        1
      ],
      "e": "Using a Lambda alias that the application invokes and shifting a weighted portion (for example 10 percent) of traffic to the new version limits the blast radius, and if errors appear the alias can be pointed fully back to the previous version immediately. Moving the whole alias at once exposes all users to a bad version, invoking by version number requires changing the application, and the three-alias design is not possible because an alias can only split between function versions, not other aliases. Community vote: B (71%), A (29%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 382
    },
    {
      "d": 0,
      "q": "A company maintains a REST service using Amazon API Gateway and the API Gateway native API key validation. The company recently launched a new registration page, which allows users to sign up for the service. The registration page creates a new API key using CreateApiKey and sends the new key to the user. When the user attempts to call the API using this key, the user receives a 403 Forbidden error. Existing users are unaffected and can still call the API.\nWhat code updates will grant these new users access to the API?",
      "o": [
        "The createDeployment method must be called so the API can be redeployed to include the newly created API key.",
        "The updateAuthorizer method must be called to update the API's authorizer to include the newly created API key.",
        "The importApiKeys method must be called to import all newly created API keys into the current stage of the API.",
        "The createUsagePlanKey method must be called to associate the newly created API key with the correct usage plan."
      ],
      "ma": [
        3
      ],
      "e": "In API Gateway, an API key only grants access when it is associated with a usage plan that is linked to the API stage, and CreateApiKey alone does not do that, so calls return 403 Forbidden. Calling CreateUsagePlanKey associates the new key with the correct usage plan. Redeploying the API, updating an authorizer, or importing keys does not make an existing key part of a usage plan. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 383
    },
    {
      "d": 0,
      "q": "A company uses an AWS CloudFormation template to deploy and manage its AWS infrastructure. The CloudFormation template creates Amazon VPC security groups and Amazon EC2 security groups.\nA manager finds out that some engineers modified the security groups of a few EC2 instances for testing purposes. A developer needs to determine what modifications occurred.\nWhich solution will meet this requirement?",
      "o": [
        "Add a Conditions section statement in the source YAML file of the template. Run the CloudFormation stack.",
        "Perform a drift detection operation on the CloudFormation stack.",
        "Execute a change set for the CloudFormation stack.",
        "Use Amazon Detective to detect the modifications."
      ],
      "ma": [
        1
      ],
      "e": "CloudFormation drift detection compares the actual configuration of stack resources with the template and reports which resources and properties were changed outside CloudFormation, which is exactly what is needed for the modified security groups. A Conditions statement and change set only affect how templates are deployed, and change sets preview template changes rather than detecting manual changes. Amazon Detective investigates security findings and does not show CloudFormation configuration drift. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 384
    },
    {
      "d": 0,
      "q": "An IAM role is attached to an Amazon EC2 instance that explicitly denies access to all Amazon S3 API actions. The EC2 instance credentials file specifies the IAM access key and secret access key, which allow full administrative access.\nGiven that multiple modes of IAM access are present for this EC2 instance, which of the following is correct?",
      "o": [
        "The EC2 instance will only be able to list the S3 buckets.",
        "The EC2 instance will only be able to list the contents of one S3 bucket at a time.",
        "The EC2 instance will be able to perform all actions on any S3 bucket.",
        "The EC2 instance will not be able to perform any S3 action on any S3 bucket."
      ],
      "ma": [
        2
      ],
      "e": "The AWS SDK and CLI credential provider chain checks the shared credentials file before the instance profile, so the application uses the admin access key from the credentials file and never uses the role that denies S3. The explicit deny applies only to the role identity, not to the IAM user whose keys are in use, so the instance can perform all actions on any S3 bucket. The other options assume the role's deny takes effect or invent partial access. (The source PDF lists D; corrected to C after review.) Community vote: C (60%), D (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 385
    },
    {
      "d": 0,
      "q": "A company uses an AWS Lambda function to transfer files from an Amazon S3 bucket to the company's SFTP server. The Lambda function connects to the SFTP server by using credentials such as username and password. The company uses Lambda environment variables to store these credentials.\nA developer needs to implement encrypted username and password credentials.\nWhich solution will meet these requirements?",
      "o": [
        "Remove the user credentials from the Lambda environment. Implement IAM database authentication.",
        "Move the user credentials from Lambda environment variables to AWS Systems Manager Parameter Store.",
        "Move the user credentials from Lambda environment variables to AWS Key Management Service (AWS KMS).",
        "Move the user credentials from the Lambda environment to an encrypted .txt file. Store the file in an S3 bucket."
      ],
      "ma": [
        1
      ],
      "e": "AWS Systems Manager Parameter Store can hold the credentials as SecureString parameters encrypted with KMS, and the Lambda function retrieves them at runtime with ssm:GetParameter, removing plaintext secrets from the environment. IAM database authentication applies to databases, not SFTP. KMS stores keys rather than arbitrary secrets, and an encrypted file in S3 requires extra custom code to manage and decrypt. Community vote: B (83%), D (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 386
    },
    {
      "d": 0,
      "q": "A developer is creating a new batch application that will run on an Amazon EC2 instance. The application requires read access to an Amazon S3 bucket. The developer needs to follow security best practices to grant S3 read access to the application.\nWhich solution meets these requirements?",
      "o": [
        "Add the permissions to an IAM policy. Attach the policy to a role. Attach the role to the EC2 instance profile.",
        "Add the permissions inline to an IAM group. Attach the group to the EC2 instance profile.",
        "Add the permissions to an IAM policy. Attach the policy to a user. Attach the user to the EC2 instance profile.",
        "Add the permissions to an IAM policy. Use IAM web identity federation to access the S3 bucket with the policy."
      ],
      "ma": [
        0
      ],
      "e": "The security best practice for applications on EC2 is to put the S3 read permissions in an IAM policy, attach it to an IAM role, and associate the role with the instance through an instance profile, so the application receives short-lived temporary credentials. Groups and users cannot be attached to an instance profile, and web identity federation is for external identity providers such as mobile or web sign-in, not for EC2 workloads. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 387
    },
    {
      "d": 0,
      "q": "A company has an application that receives batches of orders from partners every day. The application uses an AWS Lambda function to process the batches.\nIf a batch contains no orders, the Lambda function must publish to an Amazon Simple Notification Service (Amazon SNS) topic as soon as possible.\nWhich combination of steps will meet this requirement with the LEAST implementation effort? (Choose two.)",
      "o": [
        "Update the existing Lambda function's code to send an Amazon CloudWatch custom metric for the number of orders in a batch for each partner.",
        "Create a new Lambda function as an Amazon Kinesis data stream consumer. Configure the new Lambda function to track orders and to publish to the SNS topic when a batch contains no orders.",
        "Set up an Amazon CloudWatch alarm that will send a notification to the SNS topic when the value of the custom metric is 0.",
        "Schedule a new Lambda function to analyze Amazon CloudWatch metrics every 24 hours to identify batches that contain no orders. Configure the Lambda function to publish to the SNS topic.",
        "Modify the existing Lambda function to log orders to an Amazon Kinesis data stream."
      ],
      "ma": [
        0,
        2
      ],
      "e": "Having the existing Lambda function publish a custom CloudWatch metric with the number of orders per batch, and creating a CloudWatch alarm that notifies the SNS topic when the metric is 0, alerts promptly with little extra code. Adding Kinesis streams and an extra consumer Lambda function takes much more implementation effort, and a scheduled function that checks metrics every 24 hours does not notify as soon as possible. Community vote: AC (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 388
    },
    {
      "d": 0,
      "q": "A developer has an application that uses an Amazon DynamoDB table with a configured local secondary index (LSI). During application testing, the DynamoDB table metrics report a ProvisionedThroughputExceededException error message. The number of requests made by the test suite did not exceed the table's provisioned capacity limits.\nWhat is the cause of this issue?",
      "o": [
        "The data in the table's partition key column is not evenly distributed.",
        "The LSI's capacity is different from the table's capacity.",
        "The application is not implementing exponential backoff retry logic while interacting with the DynamoDB API.",
        "The application has the IAM permission to query the DynamoDB table but not to query the LSI."
      ],
      "ma": [
        0
      ],
      "e": "A table with a local secondary index stores all items that share a partition key value, including their index entries, in one item collection, and writes to the table and LSI consume the same provisioned capacity, so an uneven distribution of partition key values creates a hot partition that throttles even when total capacity is not exceeded. An LSI shares the table's capacity rather than having its own, backoff logic would not remove the throttling cause, and missing IAM permission would produce an access denied error, not a throughput exception. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 389
    },
    {
      "d": 0,
      "q": "A developer manages a website that distributes its content by using Amazon CloudFront. The website's static artifacts are stored in an Amazon S3 bucket.\nThe developer deploys some changes and can see the new artifacts in the S3 bucket. However, the changes do not appear on the webpage that the CloudFront distribution delivers.\nHow should the developer resolve this issue?",
      "o": [
        "Configure S3 Object Lock to update to the latest version of the files every time an S3 object is updated.",
        "Configure the S3 bucket to clear all old objects from the bucket before new artifacts are uploaded.",
        "Set CloudFront to invalidate the cache after the artifacts have been deployed to Amazon S3.",
        "Set CloudFront to modify the distribution origin after the artifacts have been deployed to Amazon S3."
      ],
      "ma": [
        2
      ],
      "e": "CloudFront caches objects at edge locations until their TTL expires, so updated S3 objects keep being served from cache until the cache is refreshed. Creating a CloudFront invalidation after deployment removes the cached copies so the new artifacts are fetched from S3. S3 Object Lock only prevents deletion, clearing the bucket does not clear edge caches, and changing the origin does not invalidate cached objects. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 390
    },
    {
      "d": 0,
      "q": "A company has a development team that uses AWS CodeCommit for version control. The development team has CodeCommit repositories in multiple AWS accounts. The team is expanding to include developers who work in various locations.\nThe company must ensure that the developers have secure access to the repositories.\nWhich solution will meet these requirements in the MOST operationally efficient way?",
      "o": [
        "Configure IAM roles for each developer and grant access individually.",
        "Configure permission sets in AWS IAM Identity Center to grant access to the accounts.",
        "Share AWS access keys with the development team for direct repository access.",
        "Use public SSH keys for authentication to the CodeCommit repositories."
      ],
      "ma": [
        1
      ],
      "e": "AWS IAM Identity Center with permission sets provides centralized single sign-on across multiple AWS accounts and issues temporary credentials, which scales to distributed developers and is the most operationally efficient. Managing IAM roles per developer individually is high effort, sharing access keys is insecure long-term credential use, and SSH keys per user are harder to govern across multiple accounts. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 391
    },
    {
      "d": 0,
      "q": "A developer received the following error message during an AWS CloudFormation deployment:\nDELETE_FAILED (The following resource(s) failed to delete: [ASGInstanceRole12345678].)\nWhich action should the developer take to resolve this error?",
      "o": [
        "Contact AWS Support to report an issue with the Auto Scaling Groups (ASG) service.",
        "Add a DependsOn attribute to the ASGInstanceRole12345678 resource in the CloudFormation template. Then delete the stack.",
        "Modify the CloudFormation template to retain the ASGInstanceRole12345678 resource. Then manually delete the resource after deployment.",
        "Add a force parameter when calling CloudFormation with the role-arn of ASGInstanceRole12345678."
      ],
      "ma": [
        2
      ],
      "e": "A DELETE_FAILED on a resource such as an IAM role usually means the resource cannot be deleted, for example because it is still in use or has attached items. The reliable fix is to update the template so the resource has a DeletionPolicy of Retain, so the stack deletion can finish, and then manually delete the role afterward. DependsOn only changes ordering, there is no force option with a role-arn parameter in CloudFormation, and this is not a service fault requiring Support. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 392
    },
    {
      "d": 0,
      "q": "A company runs a critical application on Amazon Elastic Container Service (Amazon ECS) by using Amazon EC2 instances. The company needs to migrate the application to Amazon ECS on AWS Fargate. A developer is configuring Fargate and the ECS capacity providers to make the change. Which solution will meet these requirements with the LEAST downtime during migration?",
      "o": [
        "Use the PutClusterCapacityProviders API operation to associate the ECS cluster with the FARGATE and FARGATE_SPOT capacity provider strategies. Use FARGATE as Provider 1 with a base value. Use FARGATE_SPOT as Provider 2 for failover.",
        "Use the CreateCapacityProvider API operation to associate the ECS cluster with the FARGATE and FARGATE_SPOT capacity provider strategies. Use FARGATE as Provider 1 with a base value. Use FARGATE_SPOT as Provider 2 for failover.",
        "Use the PutClusterCapacityProviders API operation to associate the ECS cluster with the FARGATE and FARGATE_SPOT capacity provider strategies. Use FARGATE_SPOT as Provider 1 with a base value. Use FARGATE as Provider 2 for failover.",
        "Use the CreateCapacityProvider API operation to associate the ECS cluster with the FARGATE and FARGATE_SPOT capacity provider strategies. Use FARGATE_SPOT as Provider 1 with a base value. Use FARGATE as Provider 2 for failover."
      ],
      "ma": [
        0
      ],
      "e": "The PutClusterCapacityProviders API associates the existing cluster with the FARGATE and FARGATE_SPOT capacity providers, which are built in and do not need to be created. Using FARGATE as the primary provider with a base value ensures a reliable baseline of tasks, which minimizes downtime, with FARGATE_SPOT as a secondary option. CreateCapacityProvider is for Auto Scaling group capacity providers, and putting FARGATE_SPOT first risks interruptions for a critical application. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 393
    },
    {
      "d": 0,
      "q": "A company has a web application that is hosted on AWS. The application is behind an Amazon CloudFront distribution. A developer needs a dashboard to monitor error rates and anomalies of the CloudFront distribution as frequently as possible.\nWhich combination of steps should the developer take to meet these requirements? (Choose two.)",
      "o": [
        "Stream the CloudFront distribution logs to an Amazon S3 bucket. Detect anomalies and error rates by using Amazon Athena.",
        "Enable real-time logs on the CloudFront distribution. Create a data stream in Amazon Kinesis Data Streams.",
        "Set up Amazon Kinesis Data Streams to send the logs to Amazon OpenSearch Service by using an AWS Lambda function. Make a dashboard in OpenSearch Dashboards.",
        "Stream the CloudFront distribution logs to Amazon Kinesis Data Firehose.",
        "Set up Amazon Kinesis Data Firehose to send the logs to AWS CloudTrail. Create CloudTrail metrics, alarms, and dashboards."
      ],
      "ma": [
        1,
        2
      ],
      "e": "CloudFront real-time logs can be enabled and delivered with very low latency to a Kinesis data stream, and a Lambda function can then forward the records to Amazon OpenSearch Service where OpenSearch Dashboards visualizes error rates and anomalies close to real time. Standard logs delivered to S3 and queried by Athena are delayed, Firehose by itself does not provide the dashboard, and CloudTrail does not ingest CloudFront access logs. Community vote: BC (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 394
    },
    {
      "d": 0,
      "q": "A developer creates an Amazon DynamoDB table. The table has OrderID as the partition key and NumberOfItemsPurchased as the sort key. The data type of the partition key and the sort key is Number.\nWhen the developer queries the table, the results are sorted by NumberOfItemsPurchased in ascending order. The developer needs the query results to be sorted by NumberOfItemsPurchased in descending order.\nWhich solution will meet this requirement?",
      "o": [
        "Create a local secondary index (LSI) on the NumberOfItemsPurchased sort key.",
        "Change the sort key from NumberOfItemsPurchased to NumberOfItemsPurchasedDescending.",
        "In the Query operation, set the ScanIndexForward parameter to false.",
        "In the Query operation, set the KeyConditionExpression parameter to false."
      ],
      "ma": [
        2
      ],
      "e": "The DynamoDB Query operation returns items sorted by the sort key in ascending order by default, and setting the ScanIndexForward parameter to false reverses this to descending order. Creating a LSI on the same sort key, renaming the key, or setting KeyConditionExpression to false do nothing for ordering, and the key schema of an existing table cannot be changed. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 395
    },
    {
      "d": 0,
      "q": "A developer needs to use a code template to create an automated deployment of an application onto Amazon EC2 instances. The template must be configured to repeat deployment, installation, and updates of resources for the application. The template must be able to create identical environments and roll back to previous versions.\nWhich solution will meet these requirements?",
      "o": [
        "Use AWS Amplify for automatic deployment templates. Use a traffic-splitting deployment to copy any deployments. Modify any resources created by Amplify, if necessary.",
        "Use AWS CodeBuild for automatic deployment. Upload the required AppSpec file template. Save the appspec.yml file in the root directory folder of the revision. Specify the deployment group that includes the EC2 instances for the deployment.",
        "Use AWS CloudFormation to create an infrastructure template in JSON format to deploy the EC2 instances. Use CloudFormation helper scripts to install the necessary software and to start the application. Call the scripts directly from the template.",
        "Use AWS AppSync to deploy the application. Upload the template as a GraphQL schema. Specify the EC2 instances for deployment of the application. Use resolvers as a version control mechanism and to make any updates to the deployments."
      ],
      "ma": [
        2
      ],
      "e": "AWS CloudFormation templates describe the infrastructure as code so the same stack can be created repeatedly for identical environments, and stack updates can roll back automatically on failure. The cfn-init and other helper scripts called from the template install software and start the application on EC2. Amplify and AppSync are not EC2 deployment tools, and CodeBuild does not run AppSpec-based deployments, which are a CodeDeploy feature. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 396
    },
    {
      "d": 0,
      "q": "A developer has a continuous integration and continuous delivery (CI/CD) pipeline that uses AWS CodeArtifact and AWS CodeBuild. The build artifacts are between 0.5 GB and 1.5 GB in size. The builds happen frequently and retrieve many dependencies from CodeArtifact each time. The builds have been slow because of the time it takes to transfer dependencies. The developer needs to improve build performance by reducing the number of dependencies that are retrieved for each build.\nWhich solution will meet this requirement?",
      "o": [
        "Specify an Amazon S3 cache in CodeBuild. Add the S3 cache folder path to the buildspec.yaml file for the build project.",
        "Specify a local cache in CodeBuild. Add the CodeArtifact repository name to the buildspec.yaml file for the build project.",
        "Specify a local cache in CodeBuild. Add the cache folder path to the buildspec.yaml file for the build project.",
        "Retrieve the buildspec.yaml file directly from CodeArtifact. Add the CodeArtifact repository name to the buildspec.yaml file for the build project."
      ],
      "ma": [
        2
      ],
      "e": "CodeBuild local caching keeps files on the build host between builds, so specifying a local cache and listing the dependency folder path in the buildspec cache paths avoids re-downloading dependencies from CodeArtifact on each build. Adding the repository name in the buildspec does not configure a cache. An S3 cache would still need to download the files from S3 each time, and buildspec files are not retrieved from CodeArtifact. Community vote: C (75%), B (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 397
    },
    {
      "d": 0,
      "q": "A company that has large online business uses an Amazon DynamoDB table to store sales data. The company enabled Amazon DynamoDB Streams on the table. The transaction status of each sale is stored in a TransactionStatus attribute in the table. The value of the TransactionStatus attribute must be either failed, pending, or completed.\nThe company wants to be notified of failed sales where the Price attribute is above a specific threshold. A developer needs to set up notification for the failed sales.\nWhich solution will meet these requirements with the LEAST development effort?",
      "o": [
        "Create an event source mapping between DynamoDB Streams and an AWS Lambda function. Use Lambda event filtering to trigger the Lambda function only if sales fail when the price is above the specified threshold. Configure the Lambda function to publish the data to an Amazon Simple Notification Service (Amazon SNS) topic.",
        "Create an event source mapping between DynamoDB Streams and an AWS Lambda function. Configure the Lambda function handler code to publish to an Amazon Simple Notification Service (Amazon SNS) topic if sales fail when price is above the specified threshold.",
        "Create an event source mapping between DynamoDB Streams and an Amazon Simple Notification Service (Amazon SNS) topic. Use event filtering to publish to the SNS topic if sales fail when the price is above the specified threshold.",
        "Create an Amazon CloudWatch alarm to monitor the DynamoDB Streams sales data. Configure the alarm to publish to an Amazon Simple Notification Service (Amazon SNS) topic if sales fail due when price is above the specified threshold."
      ],
      "ma": [
        0
      ],
      "e": "Lambda event source mappings for DynamoDB Streams support event filtering, so a filter pattern on TransactionStatus equal to failed and Price above the threshold invokes the function only for matching records, and the function simply publishes to SNS. This requires the least code. Doing the check in handler code takes more development, DynamoDB Streams cannot map directly to SNS, and CloudWatch alarms cannot evaluate item attributes in a stream. Community vote: A (80%), C (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 398
    },
    {
      "d": 0,
      "q": "An AWS Lambda function is invoked asynchronously to process events. Occasionally, the Lambda function falls to process events. A developer needs to collect and analyze these failed events to fix the issue.\nWhat should the developer do to meet these requirements with the LEAST development effort?",
      "o": [
        "Add logging statements for all events in the Lambda function. Filter AWS CloudTrail logs for errors.",
        "Configure the Lambda function to start an AWS Step Functions workflow with retries for failed events.",
        "Add a dead-letter queue to send messages to an Amazon Simple Queue Service (Amazon SQS) standard queue.",
        "Add a dead-letter queue to send messages to an Amazon Simple Notification Service (Amazon SNS) FIFO topic."
      ],
      "ma": [
        2
      ],
      "e": "For asynchronous Lambda invocations, a dead-letter queue configured on the function receives events that fail after retries, so adding an SQS standard queue as the DLQ captures the failed events for analysis with just configuration. SNS FIFO topics are not supported as Lambda dead-letter targets (only SQS standard queues and SNS standard topics). Logging and CloudTrail do not capture event payloads, and Step Functions adds unnecessary workflow development. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 399
    },
    {
      "d": 0,
      "q": "A company has an application that uses an Amazon S3 bucket for object storage. A developer needs to configure in-transit encryption for the S3 bucket. All the S3 objects containing personal data needs to be encrypted at rest with AWS Key Management Service (AWS KMS) keys, which can be rotated on demand.\nWhich combination of steps will meet these requirements? (Choose two.)",
      "o": [
        "Write an S3 bucket policy to allow only encrypted connections over HTTPS by using permissions boundary.",
        "Configure an S3 bucket policy to enable client-side encryption for the objects containing personal data by using an AWS KMS customer managed key.",
        "Configure the application to encrypt the objects by using an AWS KMS customer managed key before uploading the objects containing personal data to Amazon S3.",
        "Write an S3 bucket policy to allow only encrypted connections over HTTPS by using the aws:SecureTransport condition.",
        "Configure S3 Block Public Access settings for the S3 bucket to allow only encrypted connections over HTTPS."
      ],
      "ma": [
        2,
        3
      ],
      "e": "A bucket policy that denies requests when aws:SecureTransport is false enforces in-transit encryption over HTTPS, and encrypting the personal data with a customer managed KMS key in the application before uploading satisfies encryption with KMS keys that can be rotated on demand. Permissions boundaries apply to IAM principals, not bucket policies, a bucket policy cannot enable client-side encryption, and Block Public Access has no setting that enforces HTTPS. Community vote: CD (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 400
    },
    {
      "d": 0,
      "q": "A company has a monolithic desktop-based application that processes images. A developer is converting the application into an AWS Lambda function by using Python. Currently, the desktop application runs every 5 minutes to process the latest image from an Amazon S3 bucket. The desktop application completes the image processing task within 1 minute.\nDuring testing on AWS, the developer notices that the Lambda function runs at the specified 5-minute interval. However, the Lambda function takes more than 2 minutes to complete the image processing task. The developer needs a solution that will improve the Lambda function's performance.\nWhich solution will meet this requirement?",
      "o": [
        "Update the instance type of the Lambda function to a compute optimized instance with at least eight virtual CPU (vCPU).",
        "Update the configuration of the Lambda function to use the latest Python runtime.",
        "Increase the memory that is allocated to the Lambda function.",
        "Configure a reserved concurrency on the Lambda function."
      ],
      "ma": [
        2
      ],
      "e": "Lambda allocates CPU power in proportion to configured memory, so increasing the memory setting also increases vCPU and network performance and typically shortens a compute-heavy image processing task. You cannot choose an instance type for Lambda. A newer runtime does not meaningfully change processing time, and reserved concurrency controls scaling limits rather than speed. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 401
    },
    {
      "d": 0,
      "q": "A company uses AWS CloudFormation templates to manage infrastructure for a public-facing application in its development, pre-production, and production environments. The company needs to scale for increasing customer demand. A developer must upgrade the Amazon RDS DB instance type to a larger instance.\nThe developer deploys an update to the CloudFormation stack with the instance size change in the pre-production environment. The developer notices that the stack is in an UPDATE_ROLLBACK_FAILED slate in CloudFormation.\nWhich option is the cause of this issue?",
      "o": [
        "The new instance type specified in the CloudFormation template is invalid",
        "The database was deleted or modified manually outside of the CloudFormation stack",
        "There is a syntax error in the CloudFormation template",
        "The developer has insufficient IAM permissions to provision an instance of the specified type"
      ],
      "ma": [
        1
      ],
      "e": "UPDATE_ROLLBACK_FAILED occurs when CloudFormation tries to roll back a failed update but cannot return a resource to its previous state, commonly because the resource, here the RDS DB instance, was deleted or changed manually outside the stack. An invalid instance type, a template syntax error, or insufficient permissions would cause the original update to fail and normally roll back cleanly, rather than leaving the stack in a failed rollback state. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 402
    },
    {
      "d": 0,
      "q": "A developer needs to store files in an Amazon S3 bucket for a company's application. Each S3 object can have multiple versions. The objects must be permanently removed 1 year after object creation.\nThe developer creates an S3 bucket that has versioning enabled.\nWhat should the developer do next to meet the data retention requirements?",
      "o": [
        "Create an S3 Lifecycle rule on the S3 bucket. Configure the rule to expire current versions of objects and permanently delete noncurrent versions 1 year after object creation.",
        "Create an event notification for all object creation events in the S3 bucket. Configure the event notification to invoke an AWS Lambda function. Program the Lambda function to check the object creation date and to delete the object if the object is older than 1 year.",
        "Create an event notification for all object removal events in the S3 bucket. Configure the event notification to invoke an AWS Lambda function. Program the Lambda function to check the object creation date and to delete the object if the object is older than 1 year.",
        "Create an S3 Lifecycle rule on the S3 bucket. Configure the rule to delete expired object delete markers and permanently delete noncurrent versions 1 year after object creation."
      ],
      "ma": [
        0
      ],
      "e": "With versioning enabled, a lifecycle rule must handle both the current and noncurrent versions: expiring current versions 1 year after creation adds a delete marker, and the noncurrent version expiration permanently removes the older versions. A rule that only deletes expired delete markers and noncurrent versions would never expire the current version. Custom Lambda functions driven by event notifications are unnecessary operational overhead compared with native lifecycle rules. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 403
    },
    {
      "d": 0,
      "q": "A company uses AWS X-Ray to monitor a serverless application. The components of the application have different request rates. The user interactions and transactions are important to trace, but they are low in volume. The background processes such as application health checks, polling, and connection maintenance generate high volumes of read-only requests.\nCurrently, the default X-Ray sampling rules are universal for all requests. Only the first request per second and some additional requests are recorded. This setup is not helping the company review the requests based on service or request type.\nA developer must configure rules to trace requests based on service or request properties. The developer must trace the user interactions and transactions without wasting effort recording minor background tasks.\nWhich solution will meet these requirements?",
      "o": [
        "Disable sampling for high-volume read-only requests. Sample at a lower rate for all requests that handle user interactions or transactions.",
        "Disable sampling and trace all requests for requests that handle user interactions or transactions. Sample high-volume read-only requests at a higher rate.",
        "Disable sampling and trace all requests for requests that handle user interactions or transactions. Sample high-volume read-only requests at a lower rate.",
        "Disable sampling for high-volume read-only requests. Sample at a higher rate for all requests that handle user interactions or transactions."
      ],
      "ma": [
        2
      ],
      "e": "X-Ray sampling rules can match on service name, URL path, HTTP method, and other attributes, so a rule that sets the reservoir and fixed rate to trace 100 percent of user interactions and transactions, together with a low-rate rule for high-volume read-only background requests, captures what matters without wasting effort. The other options either sample important traffic at lower rates or sample noisy background traffic at higher rates or disable it entirely, which gets the priorities backwards. Community vote: D (50%), C (50%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 404
    },
    {
      "d": 0,
      "q": "A developer uses an AWS Lambda function in an application to edit users' uploaded photos. The developer needs to update the Lambda function code and needs to test the updates.\nFor testing, the developer must divide the user traffic between the original version of the Lambda function and the new version of the Lambda function.\nWhich combination of steps will meet these requirements? (Choose two.)",
      "o": [
        "Publish a version of the original Lambda function. Make the necessary changes to the Lambda code. Publish a new version of the Lambda function.",
        "Use AWS CodeBuild to detect updates to the Lambda function. Configure CodeBuild to incrementally shift traffic from the original version of the Lambda function to the new version of the Lambda function.",
        "Update the original version of the Lambda function to add a function URL. Make the necessary changes to the Lambda code. Publish another function URL for the updated Lambda code.",
        "Create an alias that points to the original version of the Lambda function. Configure the alias to be a weighted alias that also includes the new version of the Lambda function. Divide traffic between the two versions.",
        "Create an alias that points to the original function URL. Configure the alias to be a weighted alias that also includes the additional function URL. Divide traffic between the two function URLs."
      ],
      "ma": [
        0,
        3
      ],
      "e": "Publishing a version of the original function and a new version after the code change produces immutable versions that can be targeted, and creating an alias that points to the original version with a weighted routing configuration to the new version splits traffic between them. CodeBuild does not shift Lambda traffic, and function URLs cannot be given weights because aliases route between function versions, not URLs. Community vote: AD (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 405
    },
    {
      "d": 0,
      "q": "A company had an Amazon RDS for MySQL DB instance that was named mysql-db. The DB instance was deleted within the past 90 days. A developer needs to find which IAM user or role deleted the DB instance in the AWS environment.\nWhich solution will provide this information?",
      "o": [
        "Retrieve the AWS CloudTrail events for the resource mysql-db where the event name is DeleteDBInstance. Inspect each event.",
        "Retrieve the Amazon CloudWatch log events from the most recent log stream within the rds/mysql-db log group. Inspect the log events.",
        "Retrieve the AWS X-Ray trace summaries. Filter by services with the name mysql-db. Inspect the ErrorRootCauses values within each summary.",
        "Retrieve the AWS Systems Manager deletions inventory. Filter the inventory by deletions that have a TypeName value of RDS. Inspect the deletion details."
      ],
      "ma": [
        0
      ],
      "e": "AWS CloudTrail records RDS management API calls, including DeleteDBInstance, along with the IAM identity that made the call, and event history keeps 90 days of management events. Filtering the events for the mysql-db resource and inspecting them shows who deleted it. RDS CloudWatch logs hold database engine logs, X-Ray traces application requests, and Systems Manager has no deletions inventory. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 406
    },
    {
      "d": 0,
      "q": "A company has an ecommerce web application that uses an on-premises MySQL database as a data store. The company migrates the on- premises MySQL database to Amazon RDS for MySQL.\nA developer needs to configure the application's access to the RDS for MySQL database. The developer's solution must not use long term credentials.\nWhich solution will meet these requirements?",
      "o": [
        "Enable IAM database authentication on the RDS for MySQL DB instance. Create an IAM role that has the minimum required permissions. Assign the role to the application.",
        "Store the MySQL credentials as secrets in AWS Secrets Manager. Create an IAM role that has the minimum required permissions to retrieve the secrets. Assign the role to the application.",
        "Configure the MySQL credentials as environment variables that are available at runtime for the application.",
        "Store the MySQL credentials as SecureString parameters in AWS Systems Manager Parameter Store. Create an IAM role that has the minimum required permissions to retrieve the parameters. Assign the role to the application."
      ],
      "ma": [
        0
      ],
      "e": "IAM database authentication lets the application use its IAM role to generate short-lived authentication tokens for RDS for MySQL, so no long-term database password is stored anywhere. Secrets Manager, Parameter Store, and environment variables all still rely on a stored database password, which is a long-term credential, even if retrieved through a role. Community vote: A (83%), B (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 407
    },
    {
      "d": 0,
      "q": "A developer is creating an application that must transfer expired items from Amazon DynamoDB to Amazon S3. The developer sets up the DynamoDB table to automatically delete items after a specific TTL. The application must process the items in DynamoDB and then must store the expired items in Amazon S3. The entire process, including item processing and storage in Amazon S3, will take 5 minutes.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Configure DynamoDB Accelerator (DAX) to query for expired items based on the TTL. Save the results to Amazon S3.",
        "Configure DynamoDB Streams to invoke an AWS Lambda function. Program the Lambda function to process the items and to store the expired items in Amazon S3.",
        "Deploy a custom application on an Amazon Elastic Container Service (Amazon ECS) cluster on Amazon EC2 instances. Program the custom application to process the items and to store the expired items in Amazon S3.",
        "Create an Amazon EventBridge rule to invoke an AWS Lambda function. Program the Lambda function to process the items and to store the expired items in Amazon S3."
      ],
      "ma": [
        1
      ],
      "e": "When DynamoDB TTL deletes an item, the deletion is recorded in DynamoDB Streams as a REMOVE record performed by the DynamoDB service principal, so an event source mapping invokes a Lambda function that processes the expired item and writes it to S3, with no servers to manage. The 5-minute run fits within Lambda's 15-minute limit. DAX is a cache and cannot query for expired items, EventBridge rules do not react to TTL deletions, and an ECS cluster adds operational overhead. Community vote: B (80%), A (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 408
    },
    {
      "d": 0,
      "q": "A developer has an application that uses WebSocket APIs in Amazon API Gateway. The developer wants to use an API Gateway Lambda authorizer to control access to the application.\nThe developer needs to add credential caching and reduce repeated usage of secret keys and authorization tokens on every request. Which combination of steps should the developer take to meet these requirements? (Choose two.)",
      "o": [
        "Use a token-based Lambda authorizer.",
        "Use a request parameter-based Lambda authorizer.",
        "Configure an integration request mapping template to reference the context map from the APIGateway Lambda authorizer.",
        "Configure an integration request mapping template to reference the identity API key value from the API Gateway Lambda authorizer.",
        "Use VPC endpoint policies for the WebSocket APIs."
      ],
      "ma": [
        1,
        2
      ],
      "e": "WebSocket APIs in API Gateway support only request parameter-based Lambda authorizers, which can use header, query string, or stage variable values as the identity source and cache the authorization result based on them. The authorizer's returned context map can then be referenced in an integration request mapping template so downstream integrations do not need to repeat secrets or tokens. Token-based authorizers are not supported for WebSocket APIs, and VPC endpoint policies do not relate to authorizer caching. (The source PDF lists AC; corrected to BC after review.) Community vote: BC (60%), AC (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 409
    },
    {
      "d": 0,
      "q": "A developer builds a serverless application on AWS by using Amazon API Gateway, AWS Lambda functions, and Amazon Route 53. During testing, the developer notices errors but cannot immediately locate the root cause.\nTo identify the errors, the developer needs to search all the application's logs.\nWhat should the developer do to meet these requirements with the LEAST operational overhead?",
      "o": [
        "Set up API Gateway health checks to monitor the application's availability. Use the Amazon CloudWatch PutMetricData API operation to publish the logs to CloudWatch. Search and query the logs by using Amazon Athena.",
        "Set up Route 53 health checks to monitor the application's availability. Turn on AWS CloudTrail logs for all the AWS services that the application uses. Send the logs to a specified Amazon S3 bucket. Use Amazon Athena to query the log files directly from Amazon S3.",
        "Configure all the application's AWS services to publish a real-time feed of log events to an Amazon Kinesis Data Firehose delivery stream. Configure the delivery stream to publish all the logs to an Amazon S3 bucket. Use Amazon OpenSearch Service to search and analyze the logs.",
        "Set up Route 53 health checks to monitor the application's availability. Turn on Amazon CloudWatch Logs for the API Gateway stages to log API requests with a JSON log format. Use CloudWatch Logs Insights to search and analyze the logs from the AWS services that the application uses."
      ],
      "ma": [
        3
      ],
      "e": "Turning on CloudWatch Logs for the API Gateway stages (JSON format) and using Lambda's built-in CloudWatch logging lets the developer search all application logs with CloudWatch Logs Insights with little setup, and Route 53 health checks monitor availability. CloudTrail records API activity rather than application logs, PutMetricData publishes metrics rather than logs, and the Firehose, S3, and OpenSearch pipeline requires much more operational effort. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 410
    },
    {
      "d": 0,
      "q": "A developer needs to freeze changes to an AWS CodeCommit repository before a production release. The developer will work on new features while a quality assurance (QA) team tests the release.\nThe QA testing and all bug fixes must take place in isolation from the main branch. After the release, the developer must integrate all bug fixes into the main branch.\nWhich solution will meet these requirements?",
      "o": [
        "Create a release branch from the latest Git commit that will be in the release. Apply fixes to the release branch. Continue developing new features, and merge the features into the main branch. Merge the release branch into the main branch after the release.",
        "Create a Git tag on the latest Git commit that will be in the release. Continue developing new features, and merge the features into the main branch. Apply fixes to the main branch. Update the Git tag for the release to be on the latest commit on the main branch.",
        "Create a release branch from the latest Git commit that will be in the release. Apply fixes to the release branch. Continue developing new features, and merge the features into the main branch. Rebase the main branch onto the release branch after the release.",
        "Create a Git tag on the latest Git commit that will be in the release. Continue developing new features, and merge the features into the main branch. Apply the Git commits for fixes to the Git tag for the release."
      ],
      "ma": [
        0
      ],
      "e": "Creating a release branch from the latest commit to be released freezes the release content so QA and bug fixes happen in isolation, while new feature work continues on main. After the release, merging the release branch into main brings all fixes back. Tags are fixed pointers to commits and cannot take new commits or be used for isolated fix work, and rebasing main onto the release branch rewrites history and would risk losing the new feature work. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 411
    },
    {
      "d": 0,
      "q": "A developer is setting up AWS CodePipeline for a new application. During each build, the developer must generate a test report.\nWhich solution will meet this requirement?",
      "o": [
        "Create an AWS CodeBuild build project that runs tests. Configure the buildspec file with the test report information.",
        "Create an AWS CodeDeploy deployment that runs tests. Configure the AppSpec file with the test report information.",
        "Run the builds on an Amazon EC2 instance that has AWS Systems Manager Agent (SSM Agent) installed and activated.",
        "Create a repository in AWS CodeArtifact. Select the test report template."
      ],
      "ma": [
        0
      ],
      "e": "AWS CodeBuild supports test reports natively: in the buildspec file the developer defines a reports section that points to the test result files, and CodeBuild generates report groups for each build run in the pipeline. CodeDeploy AppSpec files define deployment lifecycle hooks, not test reports, SSM Agent does not produce test reports, and CodeArtifact is a package repository with no test report templates. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 412
    },
    {
      "d": 0,
      "q": "A developer built an application by using multiple AWS Lambda functions. The Lambda functions must access dynamic configuration data at runtime. The data is maintained as a 6 KB JSON document in AWS AppConfig. The configuration data needs to be updated without requiring the redeployment of the application.\nThe developer needs a solution that will give the Lambda functions access to the dynamic configuration data.\nWhat should the developer do to meet these requirements with the LEAST development effort?",
      "o": [
        "Migrate the document from AWS AppConfig to a Lambda environment variable. Read the document at the runtime.",
        "Configure the AWS AppConfig Agent Lambda extension. Access the dynamic configuration data by calling the extension on a local host.",
        "Use the AWS X-Ray SDK to call the AWS AppConfig APIs. Retrieve the configuration file at runtime.",
        "Migrate the configuration file to a Lambda deployment package. Read the file from the file system at runtime."
      ],
      "ma": [
        1
      ],
      "e": "The AWS AppConfig Agent Lambda extension runs alongside the function, retrieves and caches the configuration, and serves it through a local HTTP endpoint on localhost, so the function reads dynamic configuration with minimal code and gets updates without redeployment. Environment variables and deployment packages require redeploying to change values, and building AppConfig API calls with the X-Ray SDK is both the wrong tool and more effort. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 413
    },
    {
      "d": 0,
      "q": "A developer has AWS Lambda functions that need to access a company's internal data science libraries and reference data. Separate teams manage the libraries and the data. The teams must be able to update and upload new data independently. The Lambda functions are connected to the company's central VPC.\nWhich solution will provide the Lambda functions with access to the libraries and data?",
      "o": [
        "Attach an Amazon Elastic Block Store (Amazon EBS) volume to the Lambda functions by using EBS Multi-Attach in the central VPC. Update the Lambda function execution roles to give the functions to access the EBS volume. Update the Lambda function code to reference the files in the EBS volume.",
        "Compress the libraries and reference data in a Lambda /tmp folder. Update the Lambda function code to reference the files in the /tmp folder.",
        "Set up an Amazon Elastic File System (Amazon EFS) file system with mount targets in the central VPConfigure the Lambda functions to mount the EFS file system. Update the Lambda function execution roles to give the functions to access the EFS file system.",
        "Set up an Amazon FSx for Windows File Server file system with mount targets in the central VPC. Configure the Lambda functions to mount the Amazon FSx file system. Update the Lambda function execution roles to give the functions to access the Amazon FSx file system."
      ],
      "ma": [
        2
      ],
      "e": "Amazon EFS file systems can be mounted by VPC-connected Lambda functions through an access point and mount targets, and separate teams can independently update the libraries and data on the shared file system. EBS volumes cannot be attached to Lambda functions, /tmp is ephemeral and per execution environment, and Lambda does not support mounting Amazon FSx for Windows File Server. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 414
    },
    {
      "d": 0,
      "q": "A company has an application that uses an AWS Lambda function to consume messages from an Amazon Simple Queue Service (Amazon SQS) queue. The SQS queue is configured with a dead-letter queue. Due to a defect in the application, AWS Lambda failed to process some messages. A developer fixed the bug and wants to process the failed messages again.\nHow should the developer resolve this issue?",
      "o": [
        "Use the SendMessageBatch API to send messages from the dead-letter queue to the original SQS queue.",
        "Use the ChangeMessageVisibility API to configure messages in the dead-letter queue to be visible in the original SQS queue.",
        "Use the StartMessageMoveTask API to move messages from the dead-letter queue to the original SQS queue.",
        "Use the PurgeQueue API to remove messages from the dead-letter queue and return the messages to the original SQS queue."
      ],
      "ma": [
        2
      ],
      "e": "SQS supports dead-letter queue redrive, and the StartMessageMoveTask API moves messages from the dead-letter queue back to the source queue (or another destination) after the bug is fixed, with no custom code. SendMessageBatch would require writing code to read, resend, and delete messages. ChangeMessageVisibility only changes the visibility timeout within the same queue, and PurgeQueue permanently deletes messages. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 415
    },
    {
      "d": 0,
      "q": "A developer is working on an application that will be deployed on AWS. The developer needs to test and debug the code locally. The code is packaged and stored in an Amazon S3 bucket.\nHow can the developer test and debug the code locally with the LEAST amount of configuration?",
      "o": [
        "Create an application and a deployment group in AWS CodeDeploy. For the compute platform, specify the local machine as the individual instance for the deployment. For the repository type, specify that the application is stored in Amazon S3. Start the deployment to test on the local machine.",
        "Create a repository in AWS CodeArtifact. Publish the application code package to the repository. Before deployment, create an upstream repository to test and validate the code.",
        "Create a build project in AWS CodeBuild. In AWS CodePipeline, add a CodeBuild test action by adding a stage and an action. For the action provider, specify a CodeBuild test and the build project. View the build log to see the test results.",
        "Install the AWS CodeDeploy agent locally to validate the deployment package. Run the codedeploy-local command. Specify the S3 bucket where the code package is located by using the --bundle-location option."
      ],
      "ma": [
        3
      ],
      "e": "The CodeDeploy agent can be installed on the local machine, and the codedeploy-local command deploys a bundle from a local directory or an S3 location specified with the --bundle-location option, which lets the developer test and debug locally with minimal configuration and without creating deployment groups. CodeDeploy deployments to a local machine as an instance are not set up that way, and CodeArtifact and CodeBuild with CodePipeline run in the cloud rather than locally. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 416
    },
    {
      "d": 0,
      "q": "A developer is creating an application on Amazon Elastic Container Service (Amazon ECS). The developer needs to configure the application parameters. The developer must configure limits for the application's maximum number of simultaneous connections and maximum number of transactions per second.\nThe maximum number of connections and transactions can change in the future. The developer needs a solution that can automatically deploy these changes to the application, as needed, without causing downtime.\nWhich solution will meet these requirements?",
      "o": [
        "Make the configuration changes for the application. Use AWS CodeDeploy to create a deployment configuration. Specify an in-place deployment to deploy the changes.",
        "Bootstrap the application to use the AWS Cloud Development Kit (AWS CDK) and make the configuration changes. Specify the ECSCanary10Percent15Minutes launch type in the properties section of the ECS resource. Deploy the application by using the AWS CDK to implement the changes.",
        "Install the AWS AppConfig agent on Amazon ECS. Configure an IAM role with access to AWS AppConfig. Make the deployment changes by using AWS AppConfig. Specify Canary10Percent20Minutes as the deployment strategy.",
        "Create an AWS Lambda function to make the configuration changes. Create an Amazon CloudWatch alarm that monitors the Lambda function every 5 minutes to check if the Lambda function has been updated. When the Lambda function is updated, deploy the changes by using AWS CodeDeploy."
      ],
      "ma": [
        2
      ],
      "e": "AWS AppConfig manages and deploys application configuration such as connection and transaction limits without code redeployment, and the AppConfig agent on ECS fetches updates at runtime. A deployment strategy such as Canary10Percent20Minutes rolls the change out gradually with monitoring and rollback, avoiding downtime. CodeDeploy in-place deployments and CDK deployments redeploy the application itself, and the Lambda plus CloudWatch alarm polling design is convoluted. Community vote: C (60%), D (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 417
    },
    {
      "d": 0,
      "q": "A developer has built an application running on AWS Lambda using AWS Serverless Application Model (AWS SAM).\nWhat is the correct sequence of steps to successfully deploy the application?",
      "o": [
        "1. Build the SAM template in Amazon EC2. 2. Package the SAM template to Amazon EBS storage. 3. Deploy the SAM template from Amazon EBS.",
        "1. Build the SAM template locally. 2. Package the SAM template onto Amazon S3. 3. Deploy the SAM template from Amazon S3.",
        "1. Build the SAM template locally. 2. Deploy the SAM template from Amazon S3. 3. Package the SAM template for use.",
        "1. Build the SAM template locally. 2. Package the SAM template from AWS CodeCommit. 3. Deploy the SAM template to CodeCommit."
      ],
      "ma": [
        1
      ],
      "e": "The SAM workflow is to build the application locally (sam build), package it by uploading the artifacts to Amazon S3 and producing a transformed template (sam package), and then deploy the packaged template through CloudFormation (sam deploy), which reads the artifacts from S3. EBS and CodeCommit are not used as SAM package targets, and deploying before packaging reverses the required order. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 418
    },
    {
      "d": 0,
      "q": "A developer needs to deploy the code for a new application on an AWS Lambda function. The application needs a dependency file that is 500 MB to run the business logic.\nWhich solution will meet these requirements?",
      "o": [
        "Compress the application code and dependencies into a .zip file. Directly upload the .zip file as a deployment package for the Lambda function instead of copying the code.",
        "Compress the application code and dependencies into a .zip file. Upload the .zip file to an Amazon S3 bucket. Configure the Lambda function to run the code from the .zip file in the S3 bucket.",
        "Package the application code and dependencies into a container image. Upload the image to an Amazon S3 bucket. Configure the Lambda function to run the code in the image.",
        "Package the application code and dependencies into a container image. Push the image to an Amazon Elastic Container Registry (Amazon ECR) repository. Deploy the image to the Lambda function."
      ],
      "ma": [
        3
      ],
      "e": "A zip deployment package is limited to 250 MB unzipped, so a 500 MB dependency does not fit, but Lambda container images support up to 10 GB. The image must be pushed to Amazon ECR, which is the only registry Lambda can pull images from. Zip packages, whether uploaded directly or from S3, are bound by the 250 MB limit, and S3 cannot be the source for a container image. Community vote: B (67%), D (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 419
    },
    {
      "d": 0,
      "q": "A company is developing a publicly accessible single-page application. The application makes calls from a client web browser to backend services to provide a user interface to customers. The application depends on a third-party web service exposed as an HTTP API. The web client must provide an API key to the third-party web service by using the HTTP header as part of the HTTP request. The company's API key must not be exposed to the users of the web application.\nWhich solution will meet these requirements MOST cost-effectively?",
      "o": [
        "Use Amazon API Gateway to create a private REST API. Create an HTTP integration to integrate with the third-party HTTP API. Add the company\u2019s API key to the HTTP headers list of the integration request configuration.",
        "Use Amazon API Gateway to create a private REST API. Create an AWS Lambda proxy integration. Make calls to the third-party HTTP API from the Lambda function. Pass the company's API key as an HTTP request header.",
        "Use Amazon API Gateway to create a REST API. Create an HTTP integration to integrate with the third-party HTTP API. Add the company's API key to the HTTP headers list of the integration request configuration.",
        "Use Amazon API Gateway to create a REST API. Create an AWS Lambda proxy integration. Make calls to the third-party HTTP API from the Lambda function. Pass the company's API key as an HTTP request header."
      ],
      "ma": [
        2
      ],
      "e": "A public API Gateway REST API with an HTTP integration can add the third-party API key as a header in the integration request, so the key stays server-side and never reaches the browser, and it avoids paying for and maintaining Lambda invocations. A private REST API is reachable only from inside a VPC, so a public browser application cannot call it. The Lambda proxy options also work but add Lambda cost and code, making them less cost-effective. Community vote: C (40%), D (40%), A (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 420
    },
    {
      "d": 0,
      "q": "A developer is setting up the deployment of application stacks to new test environments by using the AWS Cloud Development Kit (AWS CDK). The application contains the code for several AWS Lambda functions that will be deployed as assets. Each Lambda function is defined by using the AWS CDK Lambda construct library.\nThe developer has already successfully deployed the application stacks to the alpha environment in the first account by using the AWS CDK CLI's cdk deploy command. The developer is preparing to deploy to the beta environment in a second account for the first time. The developer makes no significant changes to the CDK code between deployments, but the initial deployment in the second account is unsuccessful and returns a NoSuchBucket error.\nWhich command should the developer run before redeployment to resolve this error?",
      "o": [
        "cdk synth",
        "cdk bootstrap",
        "cdk init",
        "cdk destroy"
      ],
      "ma": [
        1
      ],
      "e": "The first cdk deploy in a new account and Region needs the CDK bootstrap resources, including the staging S3 bucket that holds Lambda assets, and the NoSuchBucket error means that bucket does not exist in the second account. Running cdk bootstrap against the beta account and Region creates the CDKToolkit stack with the asset bucket and deployment roles. cdk synth only produces the CloudFormation template, cdk init scaffolds a new project, and cdk destroy deletes stacks. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 421
    },
    {
      "d": 0,
      "q": "A developer is automating a new application deployment with AWS Serverless Application Model (AWS SAM). The new application has one AWS Lambda function and one Amazon S3 bucket. The Lambda function must access the S3 bucket to only read objects.\nHow should the developer configure AWS SAM to grant the necessary read privilege to the S3 bucket?",
      "o": [
        "Reference a second Lambda authorizer function.",
        "Add a custom S3 bucket policy to the Lambda function.",
        "Create an Amazon Simple Queue Service (SQS) topic for only S3 object reads. Reference the topic in the template.",
        "Add the S3ReadPolicy template to the Lambda function's execution role."
      ],
      "ma": [
        3
      ],
      "e": "AWS SAM provides policy templates such as S3ReadPolicy that expand into a least-privilege IAM policy and are attached to the function's execution role through the Policies property, scoped to the named bucket. A Lambda authorizer is for API Gateway authentication and has nothing to do with S3 permissions. A bucket policy is not added to a Lambda function, and SQS is a queue service that does not grant S3 read access (and SQS has queues, not topics). Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 422
    },
    {
      "d": 0,
      "q": "A development team wants to immediately build and deploy an application whenever there is a change to the source code.\nWhich approaches could be used to trigger the deployment? (Choose two.)",
      "o": [
        "Store the source code in an Amazon S3 bucket. Configure AWS CodePipeline to start whenever a file in the bucket changes.",
        "Store the source code in an encrypted Amazon EBS volume. Configure AWS CodePipeline to start whenever a file in the volume changes.",
        "Store the source code in an AWS CodeCommit repository. Configure AWS CodePipeline to start whenever a change is committed to the repository.",
        "Store the source code in an Amazon S3 bucket. Configure AWS CodePipeline to start every 15 minutes.",
        "Store the source code in an Amazon EC2 instance\u2019s ephemeral storage. Configure the instance to start AWS CodePipeline whenever there are changes to the source code."
      ],
      "ma": [
        0,
        2
      ],
      "e": "CodePipeline can start immediately on change from an S3 source (via S3 event notifications/EventBridge with versioning enabled) and from a CodeCommit repository (via an EventBridge rule on repository changes), so A and C trigger a deployment whenever the source changes. Option D only polls on a schedule, so it is not immediate. CodePipeline cannot use an EBS volume or EC2 ephemeral storage as a source. Community vote: AC (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 423
    },
    {
      "d": 0,
      "q": "A developer is building an application integrating an Amazon API Gateway with an AWS Lambda function. When calling the API, the developer receives the following error:\nWed Nov 08 01:13:00 UTC 2017 : Method completed with status: 502 What should the developer do to resolve the error?",
      "o": [
        "Change the HTTP endpoint of the API to an HTTPS endpoint.",
        "Change the format of the payload sent to the API Gateway.",
        "Change the format of the Lambda function response to the API call.",
        "Change the authorization header in the API call to access the Lambda function."
      ],
      "ma": [
        2
      ],
      "e": "A 502 Bad Gateway from API Gateway with Lambda proxy integration means the Lambda function returned a malformed response. The function must return a JSON object with statusCode, headers and a string body, so changing the response format resolves it. HTTP versus HTTPS, the request payload and the authorization header would produce 4xx errors rather than a 502 from a malformed integration response. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 424
    },
    {
      "d": 0,
      "q": "A developer is building various microservices for an application that will run on Amazon EC2 instances. The developer needs to monitor the end- to-end view of the requests between the microservices and debug any issues in the various microservices.\nWhat should the developer do to accomplish these tasks?",
      "o": [
        "Use Amazon CloudWatch to aggregate the microservices' logs and metrics, and build the monitoring dashboard.",
        "Use AWS CloudTrail to aggregate the microservices' logs and metrics, and build the monitoring dashboard.",
        "Use the AWS X-Ray SDK to add instrumentation in all the microservices, and monitor using the X-Ray service map.",
        "Use AWS Health to monitor the health of all the microservices."
      ],
      "ma": [
        2
      ],
      "e": "The AWS X-Ray SDK instruments each microservice to emit trace segments, and X-Ray builds a service map and end-to-end traces that show request flow and where errors or latency occur. CloudWatch gives logs and metrics per component but not a request-level end-to-end trace. CloudTrail records API calls for auditing, and AWS Health reports AWS service health events, not application request tracing. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 425
    },
    {
      "d": 0,
      "q": "A developer is building a microservice that uses AWS Lambda to process messages from an Amazon Simple Queue Service (Amazon SQS) standard queue. The Lambda function calls external APIs to enrich the SQS message data before loading the data into an Amazon Redshift data warehouse. The SQS queue must handle a maximum of 1,000 messages per second.\nDuring initial testing, the Lambda function repeatedly inserted duplicate data into the Amazon Redshift table. The duplicate data led to a problem with data analysis. All duplicate messages were submitted to the queue within 1 minute of each other.\nHow should the developer resolve this issue?",
      "o": [
        "Create an SQS FIFO queue. Enable message deduplication on the SQS FIFO queue.",
        "Reduce the maximum Lambda concurrency that the SQS queue can invoke.",
        "Use Lambda's temporary storage to keep track of processed message identifiers",
        "Configure a message group ID for every sent message. Enable message deduplication on the SQS standard queue."
      ],
      "ma": [
        0
      ],
      "e": "SQS standard queues provide at-least-once delivery, so duplicates are possible, while a FIFO queue with message deduplication drops messages with the same deduplication ID sent within the 5-minute deduplication interval, which covers duplicates submitted within 1 minute. Lowering Lambda concurrency does not prevent duplicate messages, Lambda temporary storage is not shared across execution environments, and standard queues do not support message deduplication or message group IDs. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 426
    },
    {
      "d": 0,
      "q": "A company has an application that uses an Amazon API Gateway API to invoke an AWS Lambda function. The application is latency sensitive. A developer needs to configure the Lambda function to reduce the cold start time that is associated with default scaling.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Publish a new version of the Lambda function. Configure provisioned concurrency. Set the provisioned concurrency limit to meet the company requirements.",
        "Increase the Lambda function's memory to the maximum amount. Increase the Lambda function's reserved concurrency limit.",
        "Increase the reserved concurrency of the Lambda function to a number that matches the current production load.",
        "Use Service Quotas to request an increase in the Lambda function's concurrency limit for the AWS account where the function is deployed."
      ],
      "ma": [
        0
      ],
      "e": "Provisioned concurrency keeps a configured number of execution environments initialized and ready, which removes cold starts for latency-sensitive traffic; it must be configured on a published version or alias. Reserved concurrency only caps and guarantees capacity without pre-warming, more memory does not eliminate cold starts, and an account concurrency quota increase just raises the scaling ceiling. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 427
    },
    {
      "d": 0,
      "q": "A developer is deploying an application on Amazon EC2 instances that run in Account A. The application needs to read data from an existing Amazon Kinesis data stream in Account B.\nWhich actions should the developer take to provide the application with access to the stream? (Choose two.)",
      "o": [
        "Update the instance profile role in Account A with stream read permissions.",
        "Create an IAM role with stream read permissions in Account B.",
        "Add a trust policy to the instance profile role and IAM role in Account B to allow the instance profile role to assume the IAM role.",
        "Add a trust policy to the instance profile role and IAM role in Account B to allow reads from the stream.",
        "Add a resource-based policy in Account B to allow read access from the instance profile role."
      ],
      "ma": [
        1,
        2
      ],
      "e": "Cross-account access to Kinesis Data Streams uses role assumption: create an IAM role in Account B with read permissions on the stream (B), and give it a trust policy that lets the instance profile role from Account A call sts:AssumeRole, with Account A's role also permitted to assume it (C). Granting read permissions only on the Account A role (A) is not enough because Kinesis Data Streams does not allow cross-account access via identity policy alone, a trust policy controls who may assume a role rather than allowing stream reads (D), and Kinesis Data Streams resource-based policies are not the mechanism intended here (E). Community vote: BC (57%), AE (29%), BE (14%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 428
    },
    {
      "d": 0,
      "q": "An ecommerce startup is preparing for an annual sales event. As the traffic to the company's application increases, the development team wants to be notified when the Amazon EC2 instance's CPU utilization exceeds 80%.\nWhich solution will meet this requirement?",
      "o": [
        "Create a custom Amazon CloudWatch alarm that sends a notification to an Amazon SNS topic when the CPU utilization exceeds 80%.",
        "Create a custom AWS CloudTrail alarm that sends a notification to an Amazon SNS topic when the CPU utilization exceeds 80%.",
        "Create a cron job on the EC2 instance that invokes the --describe-instance-information command on the host instance every 15 minutes and sends the results to an Amazon SNS topic.",
        "Create an AWS Lambda function that queries the AWS CloudTrail logs for the CPUUtilization metric every 15 minutes and sends a notification to an Amazon SNS topic when the CPU utilization exceeds 80%."
      ],
      "ma": [
        0
      ],
      "e": "EC2 publishes CPUUtilization to CloudWatch, so a CloudWatch alarm with an 80% threshold can notify an Amazon SNS topic automatically. CloudTrail records API activity and does not hold CPU metrics or support metric alarms, so B and D cannot work. A cron job calling describe commands every 15 minutes is custom, delayed and does not return CPU utilization. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 429
    },
    {
      "d": 0,
      "q": "A company has an application that is deployed on AWS Elastic Beanstalk. The application generates user-specific PDFs and stores the PDFs in an Amazon S3 bucket. The application then uses Amazon Simple Email Service (Amazon SES) to send the PDFs by email to subscribers. Users no longer access the PDFs 90 days after the PDFs are generated. The S3 bucket is not versioned and contains many obsolete PDFs. A developer must reduce the number of files in the S3 bucket by removing PDFs that are older than 90 days.\nWhich solution will meet this requirement with the LEAST development effort?",
      "o": [
        "Update the application code. In the code, add a rule to scan all the objects in the S3 bucket every day and to delete objects after 90 days.",
        "Create an AWS Lambda function. Program the Lambda function to scan all the objects in the S3 bucket every day and to delete objects after 90 days.",
        "Create an S3 Lifecycle rule for the S3 bucket to expire objects after 90 days.",
        "Partition the S3 objects with a // key prefix. Create an AWS Lambda function to remove objects that have prefixes that have reached the expiration date."
      ],
      "ma": [
        2
      ],
      "e": "An S3 Lifecycle expiration rule that expires objects 90 days after creation deletes the PDFs automatically with no code, infrastructure or scheduling. Application code, a scheduled Lambda scanning every object, or a prefix-partitioning scheme with a Lambda all require building and maintaining custom logic for something S3 does natively. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 430
    },
    {
      "d": 0,
      "q": "A developer is troubleshooting an application. The application includes several AWS Lambda functions that invoke an Amazon API Gateway API. The API Gateway's method request is set up to use an Amazon Cognito authorizer for authentication.\nAll the Lambda functions pass the user ID as part of the Authorization header to the API Gateway API. The API Gateway API returns a 403 status code for all GET requests.\nHow should the developer resolve this issue?",
      "o": [
        "Modify the client GET request to include a valid API key in the Authorization header.",
        "Modify the client GET request to include a valid token in the Authorization header.",
        "Update the resource policy for the API Gateway API to allow the execute-api:Invoke action.",
        "Modify the client to send an OPTIONS preflight request before the GET request."
      ],
      "ma": [
        1
      ],
      "e": "With a Cognito user pool authorizer, API Gateway expects a valid ID or access token issued by the user pool in the Authorization header, and a raw user ID is not a valid token so the request is rejected. The Lambda functions must obtain a token from Cognito and send it. API keys are used with usage plans and not for Cognito authorization, a resource policy is not what the Cognito authorizer checks, and an OPTIONS preflight is a CORS browser concern that does not authenticate calls. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 431
    },
    {
      "d": 0,
      "q": "A company processes incoming documents from an Amazon S3 bucket. Users upload documents to an S3 bucket using a web user interface. Upon receiving files in S3, an AWS Lambda function is invoked to process the files, but the Lambda function times out intermittently. If the Lambda function is configured with the default settings, what will happen to the S3 event when there is a timeout exception?",
      "o": [
        "Notification of a failed S3 event is sent as an email through Amazon SNS.",
        "The S3 event is sent to the default Dead Letter Queue.",
        "The S3 event is processed until it is successful.",
        "The S3 event is discarded after the event is retried twice."
      ],
      "ma": [
        3
      ],
      "e": "S3 invokes Lambda asynchronously, and for asynchronous invocations Lambda by default retries a failed or timed-out function twice (three attempts total) and then discards the event unless an on-failure destination or dead-letter queue is configured. There is no default DLQ and no default SNS email notification, and Lambda does not retry until success.",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 432
    },
    {
      "d": 0,
      "q": "A developer uses Amazon S3 Event Notifications to invoke AWS Lambda functions. The Lambda functions process images after the images are uploaded to S3 buckets. The developer has set up a development S3 bucket, a production S3 bucket, a development Lambda function, and a production Lambda function in the same AWS account.\nThe developer notices that uploads to the development S3 bucket wrongly invoke the production Lambda function. The developer must prevent development data from affecting the production Lambda function.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Update the execution role for the production Lambda function. Add a policy that allows the execution role to read from only the production S3 bucket.",
        "Update the S3 bucket policy for the production S3 bucket to invoke the production Lambda function. Update the S3 bucket policy for the development S3 bucket to invoke the development Lambda function.",
        "Separate the development environment and the production environment into their own AWS accounts. Update the execution role for each Lambda function. Add a policy that allows the execution role to read from only the S3 bucket that is in the same account.",
        "Separate the development environment and the production environment into their own AWS accounts. Add a resource policy to the Lambda functions to allow only S3 bucket events in the same account to invoke the functions."
      ],
      "ma": [
        3
      ],
      "e": "Separating development and production into different AWS accounts and adding a resource-based policy on each Lambda function that allows only S3 events from the same account's bucket (using the SourceAccount/SourceArn conditions) ensures a dev bucket cannot invoke the production function. Restricting the execution role only limits what the function can read, not who can invoke it. S3 bucket policies do not control which Lambda function a bucket notification invokes; that permission is set on the function's resource policy. Community vote: D (80%), B (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 433
    },
    {
      "d": 0,
      "q": "A developer is writing an application that will run on Amazon EC2 instances in an Auto Scaling group. The developer wants to externalize the session state to support the application.\nWhich AWS services or resources can the developer use to meet these requirements? (Choose two.)",
      "o": [
        "Amazon DynamoDB",
        "Amazon Cognito",
        "Amazon ElastiCache",
        "Application Load Balancer",
        "Amazon Simple Queue Service (Amazon SQS)"
      ],
      "ma": [
        0,
        2
      ],
      "e": "Session state can be externalized to a low-latency shared store: DynamoDB (with TTL for expiry) or ElastiCache (Redis or Memcached), so any instance in the Auto Scaling group can serve any user. Cognito handles authentication and identity rather than arbitrary application session state, an ALB only offers sticky sessions that tie a user to one instance, and SQS is a message queue that is not suited to storing session data. Community vote: AC (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 434
    },
    {
      "d": 0,
      "q": "A company has a serverless application that uses an Amazon API Gateway API to invoke an AWS Lambda function. A developer creates a fix for a defect in the Lambda function code. The developer wants to deploy this fix to the production environment.\nTo test the changes, the developer needs to send 10% of the live production traffic to the updated Lambda function version.\nWhich combination of steps will meet these requirements? (Choose two.)",
      "o": [
        "Publish a new version of the Lambda function that contains the updated code.",
        "Set up a new stage in API Gateway with a new Lambda function version. Enable weighted routing in API Gateway stages.",
        "Create an alias for the Lambda function. Configure weighted routing on the alias. Specify a 10% weight for the new Lambda function version.",
        "Set up a routing policy on a Network Load Balancer. Configure 10% of the traffic to go to the new Lambda function version.",
        "Set up a weighted routing policy by using Amazon Route 53. Configure 10% of the traffic to go to the new Lambda function version."
      ],
      "ma": [
        0,
        2
      ],
      "e": "Publish a new Lambda version containing the fix (A), then create an alias that points to the current version with weighted alias routing sending 10% of invocations to the new version (C); API Gateway invokes the alias so production traffic is split without changing the API. Creating a new API Gateway stage does not provide weighted routing between stages, and Network Load Balancers and Route 53 weighted records do not route to specific Lambda function versions in this setup. Community vote: AC (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 435
    },
    {
      "d": 0,
      "q": "A developer is creating a video search application for a global company. The video files have an average size of 2.5 TB. The video storage system must provide instant access to the video files for the first 90 days. After the first 90 days, the video files can take more than 10 minutes to load. Which solution will meet these requirements MOST cost-effectively?",
      "o": [
        "Upload the video files to the Amazon Elastic File System (Amazon EFS) Standard storage class for the first 90 days. After 90 days, transition the video files to the EFS Standard-Infrequent Access (Standard-IA) storage class.",
        "Upload the video files to Amazon S3. Use the S3 Glacier Deep Archive storage class for the first 90 days. After 90 days, transition the video file to the S3 Glacier Flexible Retrieval storage class.",
        "Use Amazon Elastic Block Store (Amazon EBS) to store the video files for the first 90 days. After 90 days, transition the video files to the Amazon S3 Glacier Deep Archive storage class.",
        "Upload the video files to Amazon S3. Use the S3 Glacier Instant Retrieval storage class for the first 90 days. After 90 days, transition the video files to the S3 Glacier Flexible Retrieval storage class."
      ],
      "ma": [
        3
      ],
      "e": "S3 Glacier Instant Retrieval provides millisecond access for the first 90 days at a lower storage cost than S3 Standard, and after 90 days a lifecycle transition to S3 Glacier Flexible Retrieval is cheaper while retrieval times in minutes to hours are acceptable. Glacier Deep Archive and Flexible Retrieval cannot give instant access in the first 90 days, and EFS and EBS are far more expensive for 2.5 TB video files and EBS cannot transition to Glacier. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 436
    },
    {
      "d": 0,
      "q": "A company has an ecommerce platform. A developer is designing an Amazon DynamoDB table to store customer order data for the platform. The table uses the order ID as the partition key.\nThe developer needs to modify the table to get all order IDs that are associated with a given customer email address in a single query. The solution must give the developer the ability to query order IDs by other item attributes in the future.\nWhich solution will meet these requirements?",
      "o": [
        "Configure the partition key to use the customer email address as the sort key.",
        "Update the table to use the customer email address as the partition key.",
        "Create a local secondary index (LSI) with the customer email address as the sort key.",
        "Create a global secondary index (GSI) with the customer email address as the partition key."
      ],
      "ma": [
        3
      ],
      "e": "A global secondary index with customer email as the partition key allows a single Query to return all orders for an email and can be added to an existing table, and other GSIs can be added later for other attributes. A table's primary key cannot be changed after creation, so options A and B are not possible, and a local secondary index must be defined at table creation and shares the table's partition key (order ID), so it cannot query by email across orders. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 437
    },
    {
      "d": 0,
      "q": "A company has a virtual reality (VR) game. The game has a serverless backend that consists of Amazon API Gateway, AWS Lambda, and Amazon DynamoDB. Recently, the company noticed a sudden increase of new users globally. The company also noticed delays in the retrieval of user data. Which AWS service or feature can the company use to reduce the database response time to microseconds?",
      "o": [
        "Amazon ElastiCache",
        "DynamoDB Accelerator (DAX)",
        "DynamoDB auto scaling",
        "Amazon CloudFront"
      ],
      "ma": [
        1
      ],
      "e": "DynamoDB Accelerator (DAX) is a fully managed in-memory cache built for DynamoDB that reduces read response times from milliseconds to microseconds and needs minimal code change using the DAX client. ElastiCache would require custom caching logic, DynamoDB auto scaling adjusts throughput capacity and does not reduce latency, and CloudFront caches content at the edge but does not accelerate DynamoDB queries. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 438
    },
    {
      "d": 0,
      "q": "A developer is creating a solution to track an account's Amazon S3 buckets over time. The developer has created an AWS Lambda function that will run on a schedule. The function will list the account's S3 buckets and will store the list in an Amazon DynamoDB table. The developer receives a permissions error when the developer runs the function with the AWSLambdaBasicExecutionRole AWS managed policy.\nWhich combination of permissions should the developer use to resolve this error? (Choose two.)",
      "o": [
        "Cross-account IAM role",
        "Permission for the Lambda function to list buckets in Amazon S3",
        "Permission for the Lambda function to write in DynamoDB",
        "Permission for Amazon S3 to invoke the Lambda function",
        "Permission for DynamoDB to invoke the Lambda function"
      ],
      "ma": [
        1,
        2
      ],
      "e": "AWSLambdaBasicExecutionRole only grants CloudWatch Logs permissions, so the function's execution role also needs s3:ListAllMyBuckets to list the buckets (B) and dynamodb:PutItem or similar write permissions on the table (C). Cross-account roles are unnecessary because everything is in one account, and permissions for S3 or DynamoDB to invoke the function (D, E) are invocation permissions for event-source triggers, while here the function is scheduled and calls the services itself. Community vote: BC (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 439
    },
    {
      "d": 0,
      "q": "A company uses AWS to run its learning management system (LMS) application. The application runs on Amazon EC2 instances behind an Application Load Balancer (ALB). The application's domain name is managed in Amazon Route 53. The application is deployed in a single AWS Region, but the company wants to improve application performance for users all over the world.\nWhich solution will improve global performance with the LEAST operational overhead?",
      "o": [
        "Set up an Amazon CloudFront distribution that uses the ALB as the origin server. Configure Route 53 to create a DNS alias record that points the application's domain name to the CloudFront distribution URL.",
        "Launch more EC2 instances behind the ALConfigure the ALB to use session affinity (sticky sessions). Create a Route 53 alias record for the ALB by using a geolocation routing policy.",
        "Create an AWS Client VPN endpoint in the VPInstruct users to connect to the VPN to access the application. Create a Route 53 alias record for the VPN endpoint. Configure Route 53 to use a geolocation routing policy.",
        "Deploy the application to multiple Regions across the world. Create a Route 53 alias record for the ALB by using a latency-based routing policy."
      ],
      "ma": [
        0
      ],
      "e": "Putting a CloudFront distribution in front of the ALB caches content and uses the AWS global edge network and optimized backbone connections to the origin, improving performance worldwide, and a Route 53 alias record points the domain at the distribution with almost no operational work. Deploying to multiple Regions is much more overhead, adding instances in one Region does not reduce geographic latency, and Client VPN is meant for private network access rather than public global performance. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 440
    },
    {
      "d": 0,
      "q": "A developer hosts a static website on Amazon S3 and connects the website to an Amazon CloudFront distribution. The website uses a custom domain name that points to the CloudFront URL.\nThe developer has set up a continuous integration and continuous delivery (CI/CD) pipeline. The pipeline automatically runs when changes occur in an AWS CodeCommit repository. The pipeline has a source stage and then a build stage. The build stage invokes an AWS CodeBuild project that references a buildspec.yml file. The buildspec.yml file builds the code and deploys the static files to the S3 bucket.\nThe pipeline runs successfully, and the latest website files are visible in the S3 bucket and at the S3 website URL. However, when the developer accesses the website through the CloudFront domain, the updates are not reflected on the website.\nWhat should the developer configure the buildspec.yml file to do to resolve this issue?",
      "o": [
        "Properly synchronize the objects in the S3 bucket with new files from the source stage.",
        "Delete the previous website files in the S3 bucket and redeploy the website files.",
        "Invalidate the file caches for the primary CloudFront distribution.",
        "Modify the cross-origin resource sharing (CORS) policy of the S3 bucket and redeploy the website files."
      ],
      "ma": [
        2
      ],
      "e": "CloudFront serves cached copies of objects until they expire, so even though the new files are in the S3 bucket, the edge locations keep returning stale content. Adding a CloudFront invalidation (aws cloudfront create-invalidation) to the buildspec after the S3 sync clears the cached objects. The S3 content is already correct, so re-syncing or deleting and redeploying files and changing the CORS policy do not affect the CloudFront cache. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 441
    },
    {
      "d": 0,
      "q": "A developer is working on an ecommerce application that stores data in an Amazon RDS for MySQL cluster. The developer needs to implement a caching layer for the application to retrieve information about the most viewed products.\nWhich solution will meet these requirements?",
      "o": [
        "Edit the RDS for MySQL cluster by adding a cache node. Configure the cache endpoint instead of the cluster endpoint in the application.",
        "Create an Amazon ElastiCache for Redis cluster. Update the application code to use the ElastiCache for Redis cluster endpoint.",
        "Create an Amazon DynamoDB Accelerator (DAX) cluster in front of the RDS for MySQL cluster. Configure the application to connect to the DAX endpoint instead of the RDS endpoint.",
        "Configure the RDS for MySQL cluster to add a standby instance in a different Availability Zone. Configure the application to read the data from the standby instance."
      ],
      "ma": [
        1
      ],
      "e": "ElastiCache for Redis is a managed in-memory cache that the application queries first for frequently viewed products before falling back to RDS, which offloads read traffic from MySQL. RDS for MySQL has no cache node to add, DAX works only with DynamoDB, and an RDS Multi-AZ standby instance cannot serve reads and exists only for failover. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 442
    },
    {
      "d": 0,
      "q": "A gaming application stores scores for players in an Amazon DynamoDB table that has four attributes: user_id, user_name, user_score, and user_rank. The users are allowed to update their names only. A user is authenticated by web identity federation.\nWhich set of conditions should be added in the policy attached to the role for the dynamodb:PutItem API call?",
      "o": [
        "",
        "",
        "",
        ""
      ],
      "ma": [
        0
      ],
      "e": "To let users update only their own record and only the user_name attribute, the policy uses dynamodb:LeadingKeys equal to the federated identity variable ${www.amazon.com:user_id} (so the partition key must match the caller) and dynamodb:Attributes restricted to user_name with ForAllValues:StringEquals. The other options restrict leading keys to user_name, which is not the key, or allow user_id and other attributes to be written. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [
          {
            "path": "assets/q443-A1.png",
            "alt": "Question 443 option A"
          }
        ],
        [
          {
            "path": "assets/q443-B1.png",
            "alt": "Question 443 option B"
          }
        ],
        [
          {
            "path": "assets/q443-C1.png",
            "alt": "Question 443 option C"
          }
        ],
        [
          {
            "path": "assets/q443-D1.png",
            "alt": "Question 443 option D"
          }
        ]
      ],
      "sourceNumber": 443
    },
    {
      "d": 0,
      "q": "A developer is creating a database of products. Queries for frequently accessed products must have retrieval times of microseconds. To ensure data consistency, the application cache must be updated whenever products are added, changed, or deleted.\nWhich solution will meet these requirements?",
      "o": [
        "Set up an Amazon DynamoDB database and a DynamoDB Accelerator (DAX) cluster.",
        "Set up an Amazon RDS database and an Amazon ElastiCache for Redis cluster. Implement a lazy loading caching strategy with ElastiCache.",
        "Setup an Amazon DynamoDB database that has an in-memory cache. Implement a lazy loading caching strategy in the application.",
        "Set up an Amazon RDS database and an Amazon DynamoDB Accelerator (DAX) cluster. Specify a TTL setting for the DAX cluster."
      ],
      "ma": [
        0
      ],
      "e": "DynamoDB with DAX gives microsecond reads for cached items, and DAX is a write-through cache: writes made through the DAX client update the item cache as well as the table, so the cache is kept consistent when products are added, changed or deleted. Lazy loading with ElastiCache can serve stale data until TTL expiry unless the application updates the cache explicitly, DynamoDB has no built-in in-memory cache, and DAX does not work with RDS. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 444
    },
    {
      "d": 0,
      "q": "A developer is creating a script to automate the deployment process for a serverless application. The developer wants to use an existing AWS Serverless Application Model (AWS SAM) template for the application.\nWhat should the developer use for the project? (Choose two.)",
      "o": [
        "Call aws cloudformation package to create the deployment package. Call aws cloudformation deploy to deploy the package afterward.",
        "Call sam package to create the deployment package. Call sam deploy to deploy the package afterward.",
        "Call aws s3 cp to upload the AWS SAM template to Amazon S3. Call aws lambda update-function-code to create the application.",
        "Create a ZIP package locally and call aws serverlessrepo create-applicatiion to create the application.",
        "Create a ZIP package and upload it to Amazon S3. Call aws cloudformation create-stack to create the application."
      ],
      "ma": [
        0,
        1
      ],
      "e": "An AWS SAM template can be deployed with either the SAM CLI (sam package then sam deploy) or the equivalent CloudFormation CLI commands (aws cloudformation package then aws cloudformation deploy), because package uploads the code to S3 and transforms the template and deploy creates and executes the change set. Uploading only the template with aws s3 cp and update-function-code skips the SAM transform, the Serverless Application Repository is for publishing apps, and calling create-stack with a raw SAM template and manual zip lacks the packaging and transform handling. Community vote: BE (50%), CE (25%), AB (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 445
    },
    {
      "d": 0,
      "q": "A developer adds new dependencies to an existing AWS Lambda function. The developer cannot deploy the Lambda function because the unzipped deployment package exceeds the maximum size quota for the Lambda function. The instruction set architecture of the Lambda function is x86_64.\nThe developer must implement a solution to deploy the Lambda function with the new dependencies.\nWhich solution will meet these requirements?",
      "o": [
        "Create a snapshot of all the dependencies. Configure the Lambda function to use the snapshot.",
        "Change the instruction set architecture of the Lambda function to use an arm64 architecture.",
        "Associate an Amazon Elastic Block Store (Amazon EBS) volume with the Lambda function. Store all the dependencies on the EBS volume.",
        "Create and deploy a Lambda container image with all the dependencies."
      ],
      "ma": [
        3
      ],
      "e": "Lambda limits the unzipped .zip deployment package to 250 MB, but a container image can be up to 10 GB, so packaging the function and its dependencies as a container image stored in Amazon ECR resolves the limit. Lambda has no dependency snapshot feature for this, switching to arm64 does not change the package size quota, and Lambda cannot attach EBS volumes (EFS can be mounted, but EBS cannot). Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 446
    },
    {
      "d": 0,
      "q": "A developer is working on a project that requires regular updates to a web application\u2019s backend code. The code is stored in AWS CodeCommit. Company policy states that all code must have complete unit testing and that the test results must be available for access.\nThe developer needs to implement a solution that will take each change to the code repository, build the code, and run unit tests. The solution also must provide a detailed report of the test results.\nWhich solution will meet these requirements?",
      "o": [
        "Configure AWS CodeDeploy to deploy code from CodeCommit and to run unit tests. Send the test results to Amazon CloudWatch metrics to view reports.",
        "Configure Amazon CodeWhisperer to create the code and to run unit tests. Save the test results in an Amazon S3 bucket to generate reports.",
        "Configure AWS CodeBuild to build the code and to run unit tests. Use test reporting in CodeBuild to generate and view reports.",
        "Create AWS Lambda functions that run when changes are made in CodeCommit. Program the Lambda functions to build the code, run unit tests, and save the test results to a Lambda layer."
      ],
      "ma": [
        2
      ],
      "e": "AWS CodeBuild can pull code from CodeCommit on each change, build it, and run unit tests defined in buildspec.yml, and its test reporting feature produces detailed test reports viewable in the console. CodeDeploy deploys applications and does not run builds or tests, CodeWhisperer generates code suggestions and does not run tests, and storing results in a Lambda layer is not a reporting solution. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 447
    },
    {
      "d": 0,
      "q": "A developer is building an application on AWS. The application has an Amazon API Gateway API that sends requests to an AWS Lambda function. The API is experiencing increased latency because the Lambda function has limited available CPU to fulfill the requests.\nBefore the developer deploys the API into production, the developer must configure the Lambda function to have more CPU.\nWhich solution will meet this requirement?",
      "o": [
        "Increase the virtual CPU (vCPU) cores quota of the Lambda function.",
        "Increase the amount of memory that is allocated to the Lambda function.",
        "Increase the ephemeral storage size of the Lambda function.",
        "Increase the timeout value of the Lambda function."
      ],
      "ma": [
        1
      ],
      "e": "In Lambda, CPU power is allocated proportionally to the configured memory, so increasing the memory setting increases the available vCPU. There is no separate vCPU quota to configure, ephemeral storage only adds /tmp disk space, and a longer timeout only lets the function run longer without adding CPU. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 448
    },
    {
      "d": 0,
      "q": "A developer is creating a web application to upload and store private data. The application will encrypt private data and then will upload the data to an Amazon S3 bucket.\nThe developer needs to implement a solution to automatically find any unencrypted private data in the S3 bucket. The solution must monitor the security and access control of the S3 bucket and must provide a notification if there are any security issues.\nWhich solution will meet these requirements?",
      "o": [
        "Use AWS Step Functions to run Amazon Athena queries. Configure Athena to find unencrypted private data and to monitor for security issues in the S3 bucket. Start the queries when new objects are added to the S3 bucket. Configure Athena to provide a notification if security issues are detected.",
        "Enable Amazon Macie for the S3 bucket. Set up custom criteria to find unencrypted private data in the S3 bucket. Set up AWS User Notifications to provide a notification when Macie detects security issues.",
        "Enable Amazon Inspector for the AWS account. Use Amazon Inspector to scan the S3 bucket to find unencrypted private data and to monitor for security issues. Set up Amazon EventBridge to provide a notification when Amazon Inspector detects security issues.",
        "Create an Amazon Kinesis data stream. Configure Amazon S3 to send new object notifications to the stream. Create an AWS Lambda function that runs every 10 minutes to check the stream for unencrypted private data and to monitor for security issues. Program the Lambda function to provide a notification when security issues are detected."
      ],
      "ma": [
        1
      ],
      "e": "Amazon Macie uses machine learning and pattern matching to discover sensitive data in S3, and it evaluates bucket security and access controls, including whether bucket encryption is missing, producing findings that can be sent as notifications through EventBridge or AWS User Notifications. Athena queries data you already have but is not a sensitive-data discovery or monitoring service, Inspector scans compute and container workloads for software vulnerabilities rather than S3 data, and a Kinesis plus Lambda design would be custom-built. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 449
    },
    {
      "d": 0,
      "q": "A developer has an application that uses AWS Lambda functions and AWS CloudFormation templates. Usage of the application has increased. As a result, the Lambda functions are encountering rate limit errors when they retrieve data.\nThe Lambda functions retrieve an advanced parameter from AWS Systems Manager Parameter Store on every call. The parameter changes only during new deployments. Because the application\u2019s usage is unpredictable, the developer needs a way to avoid the rate limiting.\nWhich solution will meet these requirements MOST cost-effectively?",
      "o": [
        "Configure the Lambda functions to use reserved concurrency that is equal to the last month\u2019s average number of concurrent invocations.",
        "Add a retry mechanism with exponential backoff to the call to Parameter Store.",
        "Request a service quota increase for Parameter Store GetParameter API operations to match the expected usage of the Lambda functions.",
        "Add an SSM dynamic reference as an environment variable to the Lambda functions resource in the CloudFormation templates."
      ],
      "ma": [
        3
      ],
      "e": "Resolving an SSM parameter with a CloudFormation dynamic reference (ssm or ssm-secure) in the Lambda environment variable fetches the value once at deployment time, so the functions no longer call Parameter Store on every invocation and cannot be rate limited; this works because the parameter only changes with deployments. Reserved concurrency, retries with backoff and quota increases (advanced parameters have higher throughput costs) either do not remove the calls or add cost and complexity. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 450
    },
    {
      "d": 0,
      "q": "A developer is using an AWS Lambda function to process data. The developer needs to extract custom metrics about processing times from the Lambda logs. The developer needs to analyze the metrics, set alarms, and detect issues in real time.\nWhich solution will meet these requirements?",
      "o": [
        "Publish custom metric data to AWS CloudTrail by using the PutMetricData API operation. Classify and collect the metrics. Create graphs and alarms in CloudTrail for the custom metrics.",
        "Use the open source client libraries provided by Amazon to generate the logs in the Amazon CloudWatch embedded metric format. Use CloudWatch to create the required graphs and alarms for the custom metrics.",
        "Use Amazon CloudWatch Logs Insights to create custom metrics by querying the logs that come from the Lambda function. Use CloudWatch to create the required graphs and alarms for the custom metrics.",
        "Create an Amazon Kinesis data stream to stream log events in real time from Lambda. Specify an Amazon S3 bucket as the destination for the Kinesis data stream. Use Amazon CloudWatch to visualize the log data and to set alarms."
      ],
      "ma": [
        1
      ],
      "e": "The CloudWatch embedded metric format lets Lambda write structured log lines that CloudWatch automatically extracts into custom metrics, with open source client libraries available, and then graphs and alarms are created on those metrics in near real time. PutMetricData is a CloudWatch API and not a CloudTrail feature, Logs Insights queries are not turned into alarmable metrics, and the Kinesis to S3 design does not provide CloudWatch metric alarms. Community vote: A (33%), C (33%), B (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 451
    },
    {
      "d": 0,
      "q": "A developer needs to fix an AWS CodeDeploy deployment that failed. During the failed deployment, the developer received the following error message:\n\u201cThe overall deployment failed because too many individual instances failed deployment, too few healthy instances are available for deployment, or some instances in your deployment group are experiencing problems. (Error code: HEALTH-CONSTRAINTS)\u201d What are the possible causes of the failed deployment? (Choose two.)",
      "o": [
        "The CodeDeploy agent was not running on the instances that CodeDeploy was trying to deploy to.",
        "The unified Amazon CloudWatch agent was not running on the instances that CodeDeploy was trying to deploy to.",
        "The developer\u2019s IAM role did not have the necessary permissions to perform code deployment to the instances.",
        "CodeDeploy was trying to deploy to instances that were attached to an IAM instance profile that did not have the required permissions.",
        "CodeDeploy was trying to deploy to instances that were not set up with correct CodeDeploy health checks."
      ],
      "ma": [
        0,
        4
      ],
      "e": "The HEALTH-CONSTRAINTS error means CodeDeploy could not keep the minimum number of healthy instances during the deployment. If the CodeDeploy agent is not running on the instances (A), those instances fail, and if instances are not configured with correct health checks/health status for the deployment group (E), the deployment constraints cannot be met. The CloudWatch agent is not part of deployment, and the developer's IAM role or instance profile permission problems would produce different access errors rather than this health constraint failure. Community vote: AE (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 452
    },
    {
      "d": 0,
      "q": "A company is developing a serverless application that requires storage of sensitive API keys as environment variables for various services. The application requires the automatic rotation of the encryption keys every year.\nWhich solution will meet these requirements with no development effort?",
      "o": [
        "Encrypt the environment variables by using AWS Secrets Manager. Set up automatic rotation in Secrets Manager.",
        "Encrypt the environment variables by using AWS Key Management Service (AWS KMS) customer managed keys. Enable automatic key rotation.",
        "Encrypt the environment variables by using AWS Key Management Service (AWS KMS) AWS managed keys. Configure a custom AWS Lambda function to automate key rotation.",
        "Encrypt the environment variables by using AWS Systems Manager Parameter Store. Set up automatic rotation in Parameter Store."
      ],
      "ma": [
        1
      ],
      "e": "Encrypting Lambda environment variables with an AWS KMS customer managed key and enabling automatic key rotation rotates the key material every year with no development work. Secrets Manager rotates secret values rather than rotating the encryption key used for environment variables, AWS managed keys rotate on their own schedule that cannot be configured and a custom Lambda for rotation adds development effort, and Parameter Store has no automatic rotation. Community vote: B (50%), A (33%), D (17%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 453
    },
    {
      "d": 0,
      "q": "A developer built an application that uses AWS Lambda functions to process images. The developer wants to improve image processing times throughout the day.\nThe developer needs to create an Amazon CloudWatch Logs Insights query that shows the average, slowest, and fastest processing time in 1- minute intervals.\nWhich query will meet these requirements?",
      "o": [
        "",
        "",
        "",
        ""
      ],
      "ma": [
        0
      ],
      "e": "Lambda writes a REPORT log line at the end of every invocation containing the @duration field, so filtering on @type = REPORT and using stats avg, max and min of @duration with bin(1m) gives per-minute averages, slowest and fastest times. The other queries filter on message types that do not exist (DISPLAY, STATS, PATTERN) or use a 5 minute bin rather than 1 minute. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [
          {
            "path": "assets/q454-A1.png",
            "alt": "Question 454 option A"
          }
        ],
        [
          {
            "path": "assets/q454-B1.png",
            "alt": "Question 454 option B"
          }
        ],
        [
          {
            "path": "assets/q454-C1.png",
            "alt": "Question 454 option C"
          }
        ],
        [
          {
            "path": "assets/q454-D1.png",
            "alt": "Question 454 option D"
          }
        ]
      ],
      "sourceNumber": 454
    },
    {
      "d": 0,
      "q": "An application stores user data in Amazon S3 buckets in multiple AWS Regions. A developer needs to implement a solution that analyzes the user data in the S3 buckets to find sensitive information. The analysis findings from all the S3 buckets must be available in the eu-west-2 Region. Which solution will meet these requirements with the LEAST development effort?",
      "o": [
        "Create an AWS Lambda function to generate findings. Program the Lambda function to send the findings to another S3 bucket in eu-west-2.",
        "Configure Amazon Macie to generate findings. Use Amazon EventBridge to create rules that copy the findings to eu-west-2.",
        "Configure Amazon Inspector to generate findings. Use Amazon EventBridge to create rules that copy the findings to eu-west-2.",
        "Configure Amazon Macie to generate findings and to publish the findings to AWS CloudTrail. Use a CloudTrail trail to copy the results to eu- west-2."
      ],
      "ma": [
        1
      ],
      "e": "Amazon Macie discovers sensitive data in S3 and publishes findings to EventBridge in each Region, so EventBridge rules can forward the findings to an event bus in eu-west-2 with no custom code (Macie can also use a delegated administrator for aggregation). A Lambda function would need to be written and maintained, Inspector scans for software vulnerabilities rather than sensitive data in S3, and Macie does not publish findings to CloudTrail for copying. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 455
    },
    {
      "d": 0,
      "q": "An application ingests data from an Amazon Kinesis data stream. The shards in the data stream are set for normal traffic.\nDuring tests for peak traffic, the application ingests data slowly. A developer needs to adjust the data stream to handle the peak traffic. What should the developer do to meet this requirement MOST cost-effectively?",
      "o": [
        "Install the Kinesis Producer Library (KPL) to ingest data into the data stream.",
        "Switch to on-demand capacity mode for the data stream. Specify a partition key when writing data to the data stream.",
        "Decrease the amount of time that data is kept in the data stream by using the DecreaseStreamRetentionPeriod API operation.",
        "Increase the shard count in the data stream by using the UpdateShardCount API operation."
      ],
      "ma": [
        3
      ],
      "e": "A Kinesis data stream's throughput is determined by its shard count (1 MB/s or 1000 records/s write per shard), so increasing the shard count with UpdateShardCount provides more capacity for peak traffic and is cost effective because you can scale back afterwards. The KPL improves producer efficiency but does not add stream capacity, on-demand mode costs more for predictable peaks, and reducing retention does not increase throughput. Community vote: D (67%), B (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 456
    },
    {
      "d": 0,
      "q": "A developer is building an application that uses an AWS Lambda function to process data. The application requires minimum latency. The Lambda function must have predictable function start times. All setup activities for the execution environment must happen before invocation of the Lambda function.\nWhich solution will meet these requirements?",
      "o": [
        "Increase the memory of the Lambda function to the maximum amount. Configure an Amazon EventBridge rule to schedule invocations of the Lambda function every minute to keep the execution environment active.",
        "Optimize the static initialization code that runs when a new execution environment is prepared for the first time. Decrease and compress the size of the Lambda function package and the imported libraries and dependencies.",
        "Increase the reserved concurrency of the Lambda function to the maximum value for unreserved account concurrency. Run any setup activities manually before the initial invocation of the Lambda function.",
        "Publish a new version of the Lambda function. Configure provisioned concurrency for the Lambda function with the required minimum number of execution environments."
      ],
      "ma": [
        3
      ],
      "e": "Provisioned concurrency initializes the requested number of execution environments in advance, running all setup and init code before any invocation, so start times are predictable and cold starts are avoided; it is configured on a published version or alias. Scheduled pings only keep a few environments warm and cannot cover concurrent scale-out, optimizing init code only reduces cold start time, and reserved concurrency does not pre-initialize environments. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 457
    },
    {
      "d": 0,
      "q": "A company has implemented a pipeline in AWS CodePipeline. The company is using a single AWS account and does not use AWS Organizations. The company needs to test its AWS CloudFormation templates in its primary AWS Region and a disaster recovery Region.\nWhich solution will meet these requirements with the MOST operational efficiency?",
      "o": [
        "In the CodePipeline pipeline, implement an AWS CodeDeploy action for each Region to deploy and test the CloudFormation templates. Update CodePipeline and AWS CodeBuild with appropriate permissions.",
        "Configure CodePipeline to deploy and test the CloudFormation templates. Use CloudFormation StackSets to start deployment across both Regions.",
        "Configure CodePipeline to invoke AWS CodeBuild to deploy and test the CloudFormation templates in each Region. Update CodeBuild and CloudFormation with appropriate permissions.",
        "Use the Snyk action in CodePipeline to deploy and test the CloudFormation templates in each Region."
      ],
      "ma": [
        1
      ],
      "e": "CloudFormation StackSets can deploy the same template to multiple Regions (and accounts) in one operation, and CodePipeline has a native CloudFormation StackSets action, so this is the most operationally efficient way to test in the primary and DR Regions. CodeDeploy deploys to compute platforms and does not deploy CloudFormation templates, CodeBuild approaches require custom scripts per Region, and Snyk is a security scanning integration and not a deployment mechanism. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 458
    },
    {
      "d": 0,
      "q": "A company has an Amazon API Gateway REST API that integrates with an AWS Lambda function. The API\u2019s development stage references a development alias of the Lambda function named dev.\nA developer needs make a production alias of the Lambda function named prod available through the API.\nWhich solution meets these requirements?",
      "o": [
        "Create a new method on the API. Name the method production. Configure the method to include a stage variable that points to the prod Lambda function alias.",
        "Create a new method on the API. Name the method production. Configure an integration request on the API\u2019s development stage that points to the prod Lambda function alias.",
        "Deploy the API to a new stage named production. Configure the stage to include a stage variable that points to the prod Lambda function alias.",
        "Deploy the API to a new stage named production. Configure an integration request on the API\u2019s production stage that points to the prod Lambda function alias."
      ],
      "ma": [
        2
      ],
      "e": "Deploying the API to a new stage named production and using a stage variable for the Lambda alias in the integration (for example function:${stageVariables.lambdaAlias}) lets the same API definition call the dev alias in the development stage and the prod alias in the production stage. Adding a new method for production does not model environments, and the integration request configured on a stage rather than through stage variables is not how stage-specific values are set. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 459
    },
    {
      "d": 0,
      "q": "A developer is implementing a serverless application by using AWS CloudFormation to provision Amazon S3 web hosting. Amazon API Gateway, and AWS Lambda functions. The Lambda function source code is zipped and uploaded to an S3 bucket. The S3 object key of the zipped source code is specified in the Lambda resource in the CloudFormation template.\nThe developer notices that there are no changes in the Lambda function every time the CloudFormation stack is updated.\nHow can the developer resolve this issue?",
      "o": [
        "Create a new Lambda function alias before updating the CloudFormation stack.",
        "Change the S3 object key or the S3 version in the CloudFormation template before updating the CloudFormation stack.",
        "Upload the zipped source code to another S3 bucket before updating the CioudFormation stack.",
        "Associate a cade signing configuration with the Lambda function before updating the CloudFormation stack."
      ],
      "ma": [
        1
      ],
      "e": "CloudFormation only updates a Lambda function when a property in the template changes, and an updated zip with the same S3 bucket and key looks like no change. Changing the S3 key or using the S3ObjectVersion property (with bucket versioning) makes CloudFormation detect the change and deploy the new code. A new alias, another bucket with the same key, or a code signing configuration does not by itself trigger a code update. Community vote: B (75%), A (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 460
    },
    {
      "d": 0,
      "q": "A developer published a change to a new version of an AWS Lambda function. To test the change, the developer must route 50% of the traffic to the new version and 60% of the traffic to the current version.\nWhat is the MOST operationally efficient way to meet this requirement?",
      "o": [
        "Create two Amazon Route 53 records that use a simple routing policy to route traffic to the different versions of the Lambda function. Create another Route 53 record that uses a weighted routing policy to route 50% of the traffic to each simple routing record. Test the Lambda function by using the weighted routing record.",
        "Create an Amazon API Gateway API with a POST method that is integrated with the Lambda function. Add a stage variable that includes the version of the Lambda function. Add a canary release that will override the version variable 50% of the time. Deploy and test the Lambda function through the API Gateway stage.",
        "Create a Lambda function alias. Set the weight to 50% for the current version and 50% for the new version. Set the event source mappings for the Lambda function to point to the alias.",
        "Update the event source mappings for the Lambda function. In the mappings, set the weight to 50% for the current version and 50% for the new version."
      ],
      "ma": [
        2
      ],
      "e": "A Lambda alias supports weighted routing between two function versions, so you point the alias at the current version and put a weight on the new version, and have event sources (such as the event source mappings) invoke the alias, which is the least effort option. Route 53 cannot route to Lambda versions directly, an API Gateway canary adds a stage and more configuration, and event source mappings have no weight setting. The question text says 60% for the current version, but the intent is a split between two versions via alias weights. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 461
    },
    {
      "d": 0,
      "q": "A developer is building an application that processes a stream of user-supplied data. The data stream must be consumed by multiple Amazon EC2 based processing applications in parallel and in real time. Each processor must be able to resume without losing data if there is a service interruption. The application architect plans to add other processors in the near future, and wants to minimize the amount of data duplication involved.\nWhich solution will satisfy these requirements?",
      "o": [
        "Publish the data to Amazon Simple Queue Service (Amazon SQS).",
        "Publish the data to Amazon Data Firehose.",
        "Publish the data to Amazon EventBridge.",
        "Publish the data to Amazon Kinesis Data Streams."
      ],
      "ma": [
        3
      ],
      "e": "Kinesis Data Streams supports multiple consumers reading the same ordered stream in parallel in real time, each tracking its own position with checkpoints so it can resume after an interruption, and new consumers can be added without duplicating the data. SQS messages are removed after one consumer processes them, so each added processor would need its own copy, Firehose only delivers to destinations like S3 and does not serve custom consumers, and EventBridge is for event routing without replayable consumer checkpoints. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 462
    },
    {
      "d": 0,
      "q": "An application is experiencing performance issues based on increased demand. This increased demand is on read-only historical records pulled from an Amazon RDS-hosted database with custom views and queries. A developer must improve performance without changing the database structure.\nWhich approach will improve performance and MINIMIZE management overhead?",
      "o": [
        "Deploy Amazon DynamoDB, move all the data, and point to DynamoDB.",
        "Deploy Amazon ElastiCache (Redis OSS) and cache the data for the application.",
        "Deploy Memcached on Amazon EC2 and cache the data for the application.",
        "Deploy Amazon DynamoDB Accelerator (DAX) on Amazon RDS to improve cache performance."
      ],
      "ma": [
        1
      ],
      "e": "ElastiCache for Redis is a managed in-memory cache that can hold results of the existing custom views and queries so read-only requests skip the database, with no schema changes and little management. Moving to DynamoDB changes the database structure, running Memcached on EC2 means managing the servers yourself, and DAX works only with DynamoDB, not RDS. Community vote: C (67%), B (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 463
    },
    {
      "d": 0,
      "q": "A developer is using AWS CloudFormation to deploy an AWS Lambda function. The developer needs to set the Lambda function's timeout value based on the environment parameter of the template. The template contains mappings of EnvironmentData for each environment's timeout value. The environment parameter and EnvironmentData mappings are as follows:\nEnvironment parameter:\nEnvironmentData mappings:\nWhich statement will meet these requirements?",
      "o": [
        "Timeout: !GetAtt [EnvironmentData, !Ref Environment, Timeout]",
        "Timeout: !FindInMap [EnvironmentData, !Ref Environment, Timeout]",
        "Timeout: !Select [EnvironmentData, !Ref Environment, Timeout]",
        "Timeout: !ForEach[EnvironmentData, !Ref Environment, Timeout]"
      ],
      "ma": [
        1
      ],
      "e": "The Fn::FindInMap function (!FindInMap) looks up a value in the Mappings section using a map name, a top-level key and a second-level key, so !FindInMap [EnvironmentData, !Ref Environment, Timeout] returns 30, 60 or 90 for the chosen environment. GetAtt retrieves resource attributes, Select picks an item from a list by index, and ForEach is the Fn::ForEach macro-like transform and does not look up mappings. Community vote: B (100%).",
      "images": [
        {
          "path": "assets/q464-s1.png",
          "alt": "Question 464 diagram"
        },
        {
          "path": "assets/q464-s2.png",
          "alt": "Question 464 diagram"
        }
      ],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 464
    },
    {
      "d": 0,
      "q": "A company\u2019s AWS accounts are in an organization in AWS Organizations. An application in Account A uses environment variables that are stored as parameters in AWS Systems Manager Parameter Store. A developer is creating a new application in Account B that needs to use the same environment variables.\nThe application in Account B needs access to the parameters in Account A without duplicating the parameters into Account B.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Configure the application in Account B to use credentials for an IAM user in AccountA that has access to the parameters.",
        "Create an assumable IAM role in Account A. Grant the role the permission to access the parameters.",
        "Configure cross-account resource sharing for the parameters by using AWS Resource Access Manager (AWS RAM).",
        "Write a script that stores the parameter values in a private Amazon S3 bucket that both accounts can access."
      ],
      "ma": [
        2
      ],
      "e": "AWS Resource Access Manager can share Systems Manager Parameter Store advanced parameters across accounts in an organization, so Account B can reference the parameters in place with no duplication and almost no ongoing work. IAM users with long-term credentials are a security risk, an assumable role works but requires the application to handle role assumption, and copying values to S3 with a script duplicates the data and adds maintenance. Community vote: B (50%), C (50%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 465
    },
    {
      "d": 0,
      "q": "In a move toward using microservices, a company\u2019s management team has asked all development teams to build their services so that API requests depend only on that service\u2019s data store. One team is building a Payments service which has its own database; the service needs data that originates in the Accounts database. Both are using Amazon DynamoDB.\nWhat approach will result in the simplest, decoupled, and reliable method to get near-real time updates from the Accounts database?",
      "o": [
        "Use AWS Glue to perform frequent ETL updates from the Accounts database to the Payments database.",
        "Use Amazon ElastiCache in Payments, with the cache updated by triggers in the Accounts database.",
        "Use Amazon Data Firehose to deliver all changes from the Accounts database to the Payments database.",
        "Use Amazon DynamoDB Streams to deliver all changes from the Accounts database to the Payments database."
      ],
      "ma": [
        3
      ],
      "e": "DynamoDB Streams captures item-level changes in the Accounts table in near real time, and a consumer such as a Lambda function can apply them to the Payments data store, giving a simple, decoupled and reliable integration. Glue ETL jobs are batch oriented and not near real time, ElastiCache triggers in DynamoDB do not exist, and Firehose delivers to destinations such as S3 or Redshift and not into DynamoDB tables. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 466
    },
    {
      "d": 0,
      "q": "A developer compiles an AWS Lambda function and packages the result as a .zip file. The developer uses the Functions page on the Lambda console to attempt to upload the local packaged .zip file. When pushing the package ta Lambda, the console returns the following error: Which solutions can the developer use to publish the code? (Choose two.)",
      "o": [
        "Upload the package to Amazon 3. Use the Functions page on the Lambda console to upload the package from the S3 location.",
        "Create an AWS Support ticket to increase the maximum package size.",
        "Use the update-function-code AWS CLI command. Pass the --publish parameter.",
        "Repackage the Lambda function as a Docker container image. Upload the image to Amazon Elastic Container Registry (Amazon ECR). Create a new Lambda function by using the Lambda console. Reference the image that is deployed to Amazon ECR.",
        "Sign the .zip file digitally. Create a new Lambda function by using the Lambda console. Update the configuration of the new Lambda function to include the Amazon Resource Name (ARN) of the code signing configuration."
      ],
      "ma": [
        0,
        3
      ],
      "e": "The RequestEntityTooLargeException means the .zip exceeds the limit for direct console upload (50 MB zipped), but uploading the package to S3 and referencing it from the console supports up to 250 MB unzipped (A), and a container image up to 10 GB stored in ECR avoids the zip limit entirely (D). Lambda package size quotas cannot be raised through a support ticket, update-function-code with --publish does not change the upload size limit, and code signing is for integrity, not size. Community vote: AD (100%).",
      "images": [
        {
          "path": "assets/q467-s1.png",
          "alt": "Question 467 diagram"
        }
      ],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 467
    },
    {
      "d": 0,
      "q": "A company runs an application on Amazon EC2 instances in an Auto Scaling group. The application experiences variable loads throughout each day.\nThe company needs to collect detailed metrics from the EC2 instances to right-size the instances. The company also wants to monitor custom application metrics to ensure the application is performing efficiently.\nWhich solution will meet these requirements?",
      "o": [
        "Install the AWS X-Ray agent on the instances. Configure the agent to collect the EC2 instance metrics and the custom application metrics.",
        "Install the Amazon CloudWatch agent on the instances. Configure the agent to collect the EC2 instance metrics and the custom application metrics.",
        "Install the AWS SDK in the application\u2019s cade. Update the application to use the AWS SDK to collect and publish the EC2 instance metrics and the custom application metrics.",
        "Configure AWS CloudTrail to capture and analyze the EC2 instance metrics and the custom application metrics."
      ],
      "ma": [
        1
      ],
      "e": "The unified CloudWatch agent collects detailed system-level metrics from EC2 instances (memory, disk, and more) and can also receive custom application metrics via StatsD or collectd, publishing them all to CloudWatch for right-sizing and monitoring. The X-Ray agent only sends trace data, using the SDK in application code to publish instance metrics is custom work, and CloudTrail records API calls, not metrics. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 468
    },
    {
      "d": 0,
      "q": "A developer is creating an application that uses an Amazon DynamoDB table. The developer needs to develop code that reads all records that were added to the table during the previous day, creates HTML reports, and pushes the reports into third-party storage. The item size varies from 1 KB to 4 KB, and the index structure is defined with the date. The developer needs to minimize the read capacity that the application requires from the DynamoDB table.\nWhich DynamoDB API operation should the developer use in the code to meet these requirements?",
      "o": [
        "Query",
        "Scan",
        "BatchGetItem",
        "GetItem"
      ],
      "ma": [
        0
      ],
      "e": "Because the table has an index defined on the date, a Query against that index with the previous day's date as the key condition reads only the matching items and consumes the least read capacity. Scan reads the entire table and then filters, while GetItem and BatchGetItem need the full primary keys of each item and cannot retrieve items by date range. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 469
    },
    {
      "d": 0,
      "q": "A company is launching a feature that uses an HTTP API built with Amazon API Gateway and AWS Lambda. An API Gateway endpoint performs several independent tasks that run in a Lambda function. The independent tasks can take up to 10 minutes in total to finish running.\nUsers report that the endpoint sometimes returns an HTTP 604 status code. The Lambda function invocations are successful.\nWhich solution will stop the endpoint from returning the HTTP 504 status cade?",
      "o": [
        "Increase the Lambda function\u2019s timeout value.",
        "Increase the reserved concurrency of the Lambda function.",
        "Increase the memory that is available to the Lambda function.",
        "Refactor the Lambda function to start an AWS Step Functions state machine."
      ],
      "ma": [
        3
      ],
      "e": "API Gateway has a maximum integration timeout of 29 seconds, so a synchronous request that takes up to 10 minutes returns a 504 even if the Lambda invocation succeeds. Refactoring to start an AWS Step Functions state machine (an asynchronous workflow) lets the API return quickly while the independent tasks run. Increasing the Lambda timeout, concurrency or memory does not change the API Gateway integration timeout. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 470
    },
    {
      "d": 0,
      "q": "A company has an application that uses an Amazon Cognito user pool for authentication. A developer needs to add a new REST API that will use the user pool to authenticate requests.\nWhich solution will meet this requirement with the LEAST development effort?",
      "o": [
        "Create a new API key and a new usage plan. Associate the API key and the REST API with the usage plan.",
        "Create a Cognito authorizer for the correct user pool. Reference the header that contains the Cognito token.",
        "Create an AWS Lambda token authorizer. Reference the authorization token in the event payload. Authenticate requests based on the token value.",
        "Create an AWS Lambda request authorizer. Reference the authorization header in the event payload. Authenticate requests by using the header value in a request to the Cognito API."
      ],
      "ma": [
        1
      ],
      "e": "An API Gateway Cognito user pool authorizer is built in: you point it at the user pool and identify the header that carries the token, and API Gateway validates it without any code. API keys and usage plans are for throttling and metering, not authentication, and Lambda token or request authorizers require writing and maintaining custom code to call Cognito. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 471
    },
    {
      "d": 0,
      "q": "A developer is testing an AWS Lambda function that has an event source of an Amazon Simple Queue Service (Amazon SQS) queue. The developer notices that some of the messages the Lambda function processes re-appear in the queue while the messages are being processed. The developer must correct this behavior.\nWhich solution will meet this requirement?",
      "o": [
        "Increase the timeout of the Lambda function.",
        "Increase the visibility timeout of the SQS queue.",
        "Increase the memory allocation of the Lambda function.",
        "Increase the batch size in the event source mapping."
      ],
      "ma": [
        1
      ],
      "e": "When Lambda polls SQS, each message becomes invisible for the queue's visibility timeout, and if processing takes longer than that the message becomes visible again and is delivered again. Increasing the queue's visibility timeout (AWS recommends at least six times the function timeout) prevents messages from reappearing during processing. Lambda timeout, memory and batch size changes do not stop the message from reappearing and a larger batch makes processing longer. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 472
    },
    {
      "d": 0,
      "q": "A developer created reusable code that several AWS Lambda functions need to use. The developer bundled the code into a zip archive. The developer needs to deploy the code to AWS and update the Lambda functions to use the code.\nWhich solution will meet this requirement in the MOST operationally efficient way?",
      "o": [
        "Upload the zip archive to Amazon S3. Configure an import path on the Lambda functions to point to the zip archive.",
        "Create a new Lambda function that contains and runs the shared code. Update the existing Lambda functions to invoke the new Lambda function synchronously.",
        "Create a Lambda layer that contains the zip archive. Attach the Lambda layer to the Lambda functions.",
        "Create a Lambda container image that includes the shared code. Use the container image as a Lambda base image for all the functions."
      ],
      "ma": [
        2
      ],
      "e": "A Lambda layer is the mechanism for sharing reusable code and libraries across multiple functions, and updating the layer version and attaching it to the functions is simple and operationally efficient. Lambda has no import path setting for a zip in S3, invoking a separate function for shared code adds latency and cost, and a container image forces all functions to be repackaged as container images. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 473
    },
    {
      "d": 0,
      "q": "A team has an Amazon API Gateway REST API that consists of a single resource and a GET method that is backed by an AWS Lambda integration. A developer makes a change to the Lambda function and deploys the function as a new version. The developer needs to set up a process to test the new version of the function before using the new version in production. The tests must not affect the production REST API.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Create a new resource in the REST API. Add a GET method to the new resource, and add a Lambda integration to the updated version of the Lambda function. Deploy the new version.",
        "Create a new stage for the REST API. Create a stage variable. Assign the stage variable to the Lambda function. Set the API Gateway integrated Lambda function name to the stage variable. Deploy the new version.",
        "Create a new REST API. Add a resource that has a single GET method that is integrated with the updated version of the Lambda function.",
        "Update the Lambda integration of the existing GET method to point to the updated version of the Lambda function. Deploy the new version."
      ],
      "ma": [
        1
      ],
      "e": "Creating a new API Gateway stage with a stage variable for the Lambda function name or alias lets the new stage call the new version while the existing production stage stays unchanged, with a separate invoke URL for testing and little configuration. Changing the existing integration would affect production, and adding a new resource or an entirely new REST API adds more overhead and still risks mixing environments. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 474
    },
    {
      "d": 0,
      "q": "A developer manages encryption keys in AWS Key Management Service (AWS KMS). The developer must ensure that all encryption keys can be deleted immediately when the keys are no longer required. The developer wants a solution that is highly available and does not require manual management for compute infrastructure.\nWhich solution will meet these requirements?",
      "o": [
        "Use AWS KMS managed keys. When the keys are no longer required, schedule the keys for immediate deletion.",
        "Use customer managed keys with imported key material. When the keys are no longer required, delete the imported key material.",
        "Use customer managed keys. When the keys are no longer required, delete the key material.",
        "Use customer managed keys and an AWS CloudHSM key store. When the keys are no longer required, schedule the keys for immediate deletion."
      ],
      "ma": [
        1
      ],
      "e": "For a customer managed key with imported key material, you can delete the imported key material immediately, which makes the key unusable right away, whereas deleting a KMS key itself has a mandatory waiting period of 7 to 30 days. AWS managed keys cannot be deleted, you cannot delete key material of KMS-generated keys, and a CloudHSM key store requires managing a CloudHSM cluster and still has the deletion waiting period. Community vote: B (75%), A (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 475
    },
    {
      "d": 0,
      "q": "A company has an ecommerce application. The application's API sends order data to an Amazon Simple Queue Service (Amazon SOS) queue. A developer needs to modify the application to enrich the order data before the application sends the order data to a fulfillment system. Which solution will meet this requirement with the LEAST development effort?",
      "o": [
        "Create an AWS Lambda function to poll the SOS queue. enrich the message data, and send the enriched data to the fulfilment system, Create an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe the Lambda function to the SNS topic.",
        "Create an AWS Step Functions state machine. Configure an Amazon EventBridge rule to run the state machine when an order is published to the SQS queue. Map the orders to an AWS Lambda function. Program the Lambda function to perform the data enrichment and to invoke the state machine. Configure the last step of the state machine to send the enriched data to the fulfilment system,",
        "Create an Amazon EMR cluster to read messages from the SQS queue. Configure an EMR job to enrich the order data. Create and configure an Amazon S3 bucket as the output location. Adjust the order fulfilment system to retrieve the enriched files from the S3 bucket.",
        "Create an Amazon EventBridge pipe that uses event enrichment. Configure the SQS queue as a source for the pipe. Set the fulfillment system as the target of the pipe."
      ],
      "ma": [
        3
      ],
      "e": "Amazon EventBridge Pipes can take an SQS queue as the source, enrich events (through a Lambda function, API destination, API Gateway or Step Functions) and deliver them to a target, so it provides the point-to-point integration with the least code. Option A subscribes a function to SNS rather than SQS, the Step Functions design is overly complicated, and EMR is a big data platform that is far too heavy for per-message enrichment. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 476
    },
    {
      "d": 0,
      "q": "An application interacts with Amazon Aurora to store and track customer information. The primary database is set up with multiple read replicas for improving the performance of the read queries. However, one of the Aurora replicas is receiving most or all of the traffic, while the other Aurora replica remains idle.\nHow can this issue be resolved?",
      "o": [
        "Disable application-level DNS caching.",
        "Enable application-level DNS caching.",
        "Enable application pooling",
        "Disable application pooling"
      ],
      "ma": [
        0
      ],
      "e": "Aurora reader endpoint load balances connections using DNS round robin among the replicas, so if the application caches DNS results the connections keep going to the same replica. Disabling application-level DNS caching (or using a short TTL) lets each new connection resolve to a different replica. Enabling caching would worsen the skew, and connection pooling reuses existing connections, which keeps traffic on the same replica. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 477
    },
    {
      "d": 0,
      "q": "A company runs continuous integration/continuous delivery (CI/CD) pipelines for its application on AWS CodePipeline. A developer must write unit tests and run them as part of the pipelines before staging the artifacts for testing.\nHow should the developer incorporate unit tests as part of CI/CD pipelines?",
      "o": [
        "Create a separate CodePipeline pipeline to run unit tests.",
        "Update the AWS CodeBuild build specification to include a phase for running unit tests.",
        "Install the AWS CodeDeploy agent on an Amazon EC2 instance to run unit tests.",
        "Create a testing branch in a git repository for the pipelines to run unit tests."
      ],
      "ma": [
        1
      ],
      "e": "AWS CodeBuild is used as the build and test stage in CodePipeline, and adding a phase (for example in the build or test phase of buildspec.yml) to run unit tests makes the stage fail if tests fail before artifacts move on. A separate pipeline, a CodeDeploy agent on EC2, or a testing branch do not integrate tests into the same pipeline run before staging. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 478
    },
    {
      "d": 0,
      "q": "A developer is troubleshooting a three-tier application, which is deployed on Amazon EC2 instances. There is a connectivity problem between the application servers and the database servers.\nWhich AWS services or tools should be used to identity the faulty component? (Choose two.)",
      "o": [
        "AWS CloudTrail",
        "AWS Trusted Advisor",
        "Amazon VPC Flow Logs",
        "Network access control lists",
        "AWS Config rules"
      ],
      "ma": [
        2,
        3
      ],
      "e": "Connectivity problems between tiers usually come from network filtering, so VPC Flow Logs show accepted and rejected traffic between the application and database network interfaces (C), and network ACLs (D), along with security groups, are where the rules blocking traffic are checked. CloudTrail records API calls, Trusted Advisor provides general best-practice checks, and AWS Config rules evaluate resource configuration compliance rather than diagnosing network traffic. Community vote: CD (50%), CE (50%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 479
    },
    {
      "d": 0,
      "q": "A company runs a new application on AWS Elastic Beanstalk. The company needs to deploy updates to the application. The updates must not cause any downtime for application users.\nThe deployment must forward a specified percentage of incoming client traffic to a new application version during an evaluation period. Which deployment type will meet these requirements?",
      "o": [
        "rolling",
        "traffic-splitting",
        "in-place",
        "immutable"
      ],
      "ma": [
        1
      ],
      "e": "The Elastic Beanstalk traffic-splitting deployment launches a full set of new instances in the environment and forwards a specified percentage of incoming client traffic to the new version for an evaluation period, with no downtime. Rolling and in-place deployments update existing instances in batches (in-place can cause downtime), and immutable deployments replace instances with new ones but do not send a chosen percentage of traffic during evaluation. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 480
    },
    {
      "d": 0,
      "q": "A developer is making changes to a custom application that uses AWS Elastic Beanstalk.\nWhich solutions will update the Elastic Beanstalk environment with the new application version after the developer completes the changes? (Choose two.)",
      "o": [
        "Package the application code into a zip file. Use the AWS Management Console to upload the .zip file and deploy the packaged application.",
        "Package the application code into a .tar file. Use the AWS Management Console to create a new application version from the .tar file. Update the environment by using the AWS CLI.",
        "Package the application code into a .tar file. Use the AWS Management Console to upload the .tar file and deploy the packaged application.",
        "Package the application code into a .zip file. Use the AWS CL to create a new application version from the .zip file and to update the environment.",
        "Package the application code into a .zip file. Use the AWS Management Console to create a new application version from the .zip file. Rebuild the environment by using the AWS CLI."
      ],
      "ma": [
        0,
        3
      ],
      "e": "Elastic Beanstalk accepts source bundles as .zip (or .war) files, so packaging the code as a .zip and uploading and deploying it through the console (A) or using the AWS CLI to create an application version and update the environment (D) both deploy the new version. .tar files are not a supported source bundle format, and rebuilding the environment (E) recreates it rather than deploying the new application version. Community vote: AD (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 481
    },
    {
      "d": 0,
      "q": "A developer needs to write an AWS CloudFormation template on a local machine and deploy a CloudFormation stack to AWS.\nWhat must the developer do to complete these tasks?",
      "o": [
        "Install the AWS CLI. Configure the AWS CLI by using an IAM user name and password.",
        "Install the AWS CLI. Configure the AWS CLI by using an SSH key.",
        "Install the AWS CLI, Configure the AWS CLI by using an IAM user access key and secret key.",
        "Install an AWS software development kit (SDK). Configure the SDK by using an X.509 certificate."
      ],
      "ma": [
        2
      ],
      "e": "The developer can write the template locally and deploy it with the AWS CLI, which authenticates with an IAM user's access key ID and secret access key (aws configure). IAM user passwords are for console sign-in, SSH keys are for instance access, and X.509 certificates are not used to configure an SDK for API calls. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 482
    },
    {
      "d": 0,
      "q": "A developer is updating an Amazon API Gateway REST API to have a mock endpoint. The developer wants to update the integration request mapping template so the endpoint will respond to mock integration requests with specific HTTP status codes based on various conditions. Which statement will meet these requirements?",
      "o": [
        "",
        "",
        "",
        ""
      ],
      "ma": [
        1
      ],
      "e": "API Gateway mock integrations use a Velocity Template Language mapping template in the integration request that returns a JSON object containing statusCode, and conditions use #if with $input.params() to read request parameters, with #else and #end to close the block. The marked option has syntactically valid VTL with a proper #if{ } condition on $input.params('scope') and returns 200 or 500, while the other options either use invalid syntax or an incorrect function such as $input.path() with no comparison or unbalanced parentheses. Community vote: B (67%), C (33%).",
      "images": [],
      "optionImages": [
        [
          {
            "path": "assets/q483-A1.png",
            "alt": "Question 483 option A"
          }
        ],
        [
          {
            "path": "assets/q483-B1.png",
            "alt": "Question 483 option B"
          }
        ],
        [
          {
            "path": "assets/q483-C1.png",
            "alt": "Question 483 option C"
          }
        ],
        [
          {
            "path": "assets/q483-D1.png",
            "alt": "Question 483 option D"
          }
        ]
      ],
      "sourceNumber": 483
    },
    {
      "d": 0,
      "q": "A large company has its application components distributed across multiple AWS accounts. The company needs to collect and visualize trace data across these accounts.\nWhat should be used to meet these requirements?",
      "o": [
        "AWS X-Ray",
        "Amazon CloudWatch",
        "Amazon VPC flow logs",
        "Amazon OpenSearch Service"
      ],
      "ma": [
        0
      ],
      "e": "AWS X-Ray collects and visualizes trace data and supports cross-account tracing through CloudWatch cross-account observability, giving a single service map and traces across multiple accounts. CloudWatch alone is for metrics and logs, VPC flow logs capture network traffic information only, and OpenSearch Service is a search and analytics engine and not a tracing service. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 484
    },
    {
      "d": 0,
      "q": "A developer must cache dependent artifacts from Maven Central, a public package repository, as part of an application\u2019s build pipeline. The build pipeline has an AWS CodeArtifact repository where artifacts of the build are published. The developer needs a solution that requires minimum changes to the build pipeline.\nWhich solution meets these requirements?",
      "o": [
        "Modify the existing CodeAriifact repository to associate an upstream repository with the public package repository.",
        "Create a new CodeAtfact repository that has an external connection to the public package repository.",
        "Create a new CodeAifact domain that contains a new repository that has an external connection to the public package repository.",
        "Modify the CodeAnifact repository resource policy to allow artifacts to be fetched from the public package repository."
      ],
      "ma": [
        0
      ],
      "e": "Adding an upstream repository with an external connection to Maven Central to the existing CodeArtifact repository means the existing repository will fetch and cache packages from Maven Central on demand, so the build pipeline keeps using the same repository endpoint with minimal change. Creating a new repository or domain changes the endpoint the pipeline uses, and a repository resource policy controls access permissions and cannot allow fetching from a public repository. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 485
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Step Functions state machine to handle an order processing workflow. When the state machine receives an order, the state machine pauses until the order has been confirmed. A record that is added to an Amazon DynamoDB table by another service confirms each order.\nThe developer must complete the order processing workflow.\nWhich solution will meet this requirement?",
      "o": [
        "Update the state machine to query the DynamoDB table by using the DynamoDB GetItem state to determine whether a record exists. If the record does exist, continue to the next state. If the record does not exist, wait 5 minutes and check again.",
        "Subscribe an AWS Lambda function to a DynamoDB table stream. Configure the Lambda function to run when a new record is added to the table. When the Lambda function receives the appropriate record, run the redrive execution command on the running state machine.",
        "Subscribe an AWS Lambda function to the DynamoDB table stream. Configure the Lambda function to run when a new record is added to the table. When the Lambda function receives the appropriate record, stop the current state machine invocation and start a new invocation.",
        "Invoke an AWS Lambda function from the state machine. Configure the Lambda function to continuously poll the DynamoDB table for the appropriate record and to return when a record exists. Continue the state machine invocation when the Lambda function returns. If the Lambda function times out, then fail the state machine."
      ],
      "ma": [
        0
      ],
      "e": "Step Functions can call DynamoDB GetItem directly with an optimized service integration, followed by a Choice state and a Wait state to loop until the confirmation record exists, which needs no extra code. Redriving applies to failed executions and cannot resume a running one, stopping and restarting an execution loses state, and a Lambda function that continuously polls can hit its timeout and adds cost and custom code. Community vote: A (67%), B (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 486
    },
    {
      "d": 0,
      "q": "A developer is writing a web application that must share secure documents with end users. The documents are stored in a private Amazon S3 bucket. The application must allow only authenticated users to download specific documents when requested, and only for a duration of 15 minutes.\nHow can the developer meet these requirements?",
      "o": [
        "Copy the documents to a separate S3 bucket that has a lifecycle policy for deletion after 15 minutes.",
        "Create a presigned S3 URL using the AWS SDK with an expiration time of 15 minutes.",
        "Use server-side encryption with AWS KMS managed keys (SSE-KMS) and download the documents using HTTPS.",
        "Modify the S3 bucket policy to only allow specific users to download the documents. Revert the change after 15 minutes."
      ],
      "ma": [
        1
      ],
      "e": "A presigned S3 URL generated with the SDK gives temporary access to a specific object in a private bucket and expires after the configured time, here 15 minutes. Copying documents with a lifecycle rule cannot expire at minute granularity (lifecycle works in days), SSE-KMS and HTTPS protect data but do not limit access duration, and editing the bucket policy by hand and reverting is manual and affects all users. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 487
    },
    {
      "d": 0,
      "q": "A company is developing a set of AWS Lambda functions to process data. The Lambda functions need to use a common third-party library as a dependency. The library is frequently updated with new features and bug fixes. The company wants to ensure that the Lambda functions always use the latest version of the library.\nWhich solution will meet these requirements in the MOST operationally efficient way?",
      "o": [
        "Store the dependency and the function code in an Amazon S3 bucket.",
        "Create a Lambda layer that includes the library. Attach the layer to each Lambda function.",
        "Install the dependency in an Amazon Elastic File System (Amazon EFS) file system. Attach the file system to each Lambda function.",
        "Create a new Lambda function to load the library. Configure the existing Lambda functions to invoke the new Lambda function when the existing functions need to use the library."
      ],
      "ma": [
        1
      ],
      "e": "A Lambda layer holds shared libraries that can be attached to multiple functions, so the library is maintained in one place and updating the layer and function configuration brings in a new version across the functions with little effort. Storing dependencies in S3 still requires repackaging each function, EFS adds mounting and VPC complexity, and invoking another Lambda function to load the library adds latency and cost. Community vote: B (60%), C (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 488
    },
    {
      "d": 0,
      "q": "A company\u2019s application includes an Amazon DynamoDB table for product orders. The table has a primary partition key of orderId and has no sort key. The company is adding a new feature that requires the application to query the table by using the customerId attribute.\nWhich solution will provide this query functionality?",
      "o": [
        "Change the existing primary key by setting customerId as the sort key.",
        "Create a new global secondary index (GSI) on the table with a partition key of customerId.",
        "Create a new local secondary index (LSI) on the table with a partition key of customerId.",
        "Create a new local secondary index (LSI) on the table with a partition key of orderId and a sort key of customerId."
      ],
      "ma": [
        1
      ],
      "e": "A global secondary index with customerId as its partition key can be created on an existing table and supports queries by customerId. The primary key cannot be changed after the table is created, and a local secondary index can only be created at table creation and must use the same partition key as the table (orderId), so it cannot have customerId as its partition key. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 489
    },
    {
      "d": 0,
      "q": "A company hosts applications on premises. The on-premises servers generate audit logs that are available through an HTTP endpoint. The company needs an automated solution to regularly ingest and store large volumes of audit data from the on-premises servers. The company also needs to perform queries on the audit data.\nWhich solution will meet these requirements in the MOST operationally efficient way?",
      "o": [
        "Export the audit logs. Upload the logs to Amazon S3. Import the logs to an Amazon RDS DB instance.",
        "Create an AWS Lambda function to call the HTTP endpoint to fetch audit logs. Configure an Amazon EventBridge scheduled rule to invoke the Lambda function. Configure the Lambda function to push the logs to AWS CloudTrail Lake.",
        "Use AWS DataSync to transfer audit logs to an Amazon S3 bucket. Load the logs into an Amazon S3 bucket. Use Amazon Athena to query the bucket.",
        "Install the Amazon CloudWatch agent on the on-premises servers. Give the agent the ability to push audit logs to CloudWatch. Use CloudWatch Insights to query the logs."
      ],
      "ma": [
        1
      ],
      "e": "A scheduled EventBridge rule invoking a Lambda function to pull logs from the HTTP endpoint and push them into CloudTrail Lake (which ingests events from outside AWS through a channel and lets you run SQL queries) is fully serverless, automated and queryable. Manual export and import to RDS is not automated, DataSync transfers files between storage systems and cannot pull from an HTTP endpoint, and the CloudWatch agent does not read audit logs from an HTTP endpoint. (The source PDF lists C; corrected to B after review.) Community vote: D (33%), C (33%), B (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 490
    },
    {
      "d": 0,
      "q": "A developer is building an application that includes an AWS Lambda function that is written in .NET Core. The Lambda function\u2019s code needs to interact with Amazon DynamoDB tables and Amazon S3 buckets. The developer must minimize the Lambda function\u2019s deployment time and invocation duration.\nWhich solution will meet these requirements?",
      "o": [
        "Increase the Lambda function\u2019s memory.",
        "Include the entire AWS SDK for .NET in the Lambda function\u2019s deployment package.",
        "Include only the AWS SDK for .NET modules for DynamoDB and Amazon S3 in the Lambda function\u2019s deployment package.",
        "Configure the Lambda function to download the AWS SDK for .NET from an S3 bucket at runtime."
      ],
      "ma": [
        2
      ],
      "e": "Lambda deployment time and cold-start duration both grow with package size, so packaging only the AWSSDK.DynamoDBv2 and AWSSDK.S3 NuGet packages keeps the deployment small and speeds up download and assembly loading. Bundling the entire AWS SDK for .NET (B) inflates the package and slows both. Increasing memory (A) does not reduce deployment time, and downloading the SDK from S3 at runtime (D) adds network latency to every cold start. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 491
    },
    {
      "d": 0,
      "q": "A development team has an Amazon API Gateway REST API that is backed by an AWS Lambda function.\nUsers have reported performance issues for the Lambda function. The development team identified the source of the issues as a cold start of the Lambda function. The development team needs to reduce the time needed for the Lambda function to initialize.\nWhich solution will meet this requirement?",
      "o": [
        "Change the Lambda concurrency to reserved concurrency.",
        "Increase the timeout of the Lambda function.",
        "Increase the memory allocation of the Lambda function.",
        "Configure provisioned concurrency for the Lambda function."
      ],
      "ma": [
        3
      ],
      "e": "Provisioned concurrency keeps a configured number of execution environments initialized and ready, so requests do not wait for the init phase and cold starts are eliminated. Reserved concurrency (A) only guarantees or caps capacity and does not pre-initialize environments. A longer timeout (B) does nothing for init time, and more memory (C) may speed up execution somewhat but does not remove the cold start. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 492
    },
    {
      "d": 0,
      "q": "A video streaming company has a pipe in Amazon EventBridge Pipes that uses an Amazon Simple Queue Service (Amazon SQS) queue as an event source. The pipe publishes all source events to a target EventBridge event bus. Before events are published, the pipe uses an AWS Lambda function to retrieve the stream status of each event from a database and adds the stream status to each source event.\nThe company wants the pipe to publish events to the event bus only if the video stream has a status of ready.\nWhich solution will meet these requirements?",
      "o": [
        "Add a filter step to the pipe that will match on a stream status of ready.",
        "Update the Lambda function to return only video streams that have a status of ready.",
        "Include a filter for a status of ready in all EventBridge rules that subscribe to the event bus.",
        "Add an input transformer to the pipe output that filters streams that have a status of ready."
      ],
      "ma": [
        1
      ],
      "e": "In EventBridge Pipes the filter step runs before enrichment, so it cannot see the stream status that the Lambda enrichment adds. The enrichment function itself must therefore drop non-ready streams by returning only the ready events, so only those reach the target event bus. A filter step (A) is evaluated on the original SQS events, and an input transformer (D) only reshapes the payload and cannot drop events. Filtering in every EventBridge rule (C) still publishes all events to the bus. (The source PDF lists A; corrected to B after review.) Community vote: B (50%), A (50%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 493
    },
    {
      "d": 0,
      "q": "A developer needs to build a workflow to handle messages that are sent to an Amazon Simple Queue Service (Amazon SQS) queue. When a message reaches the queue, the workflow must implement a delay before invoking an AWS Lambda function to process the message. Which solution will meet this requirement in the MOST operationally efficient way?",
      "o": [
        "Create an AWS Step Functions state machine to process the SQS queue. Use a Wait state to delay the Lambda function\u2019s processing for the required number of seconds after message delivery to the SQS queue. Use Amazon EventBridge to invoke the state machine every 5 minutes.",
        "Configure the Lambda function to poll the SQS queue. Update the Lambda code to republish each message with a custom attribute that contains a future time when the message should be fully processed. Update the Lambda code to fully process messages when the custom attribute\u2019s future time has passed.",
        "Set the DelaySeconds value of the SQS queue to be the number of seconds required to delay delivery of the messages. Add an event source mapping for the Lambda function. Specify the SQS queue as a source.",
        "Set the Visibility Timeout value of the SQS queue to be the number of seconds required to delay delivery of the messages. Add an event source mapping for the Lambda function. Specify the SQS queue as a source."
      ],
      "ma": [
        2
      ],
      "e": "Setting DelaySeconds on the SQS queue (up to 900 seconds) keeps each new message invisible to consumers for that period, and a Lambda event source mapping then polls the queue and invokes the function with no custom code. Visibility timeout (D) only hides a message after it has been received, so it does not delay first delivery. The Step Functions Wait state with a 5-minute schedule (A) and the republish-with-timestamp code (B) add needless moving parts and cost. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 494
    },
    {
      "d": 0,
      "q": "A company is building an application to accept data from customers. The data must be encrypted at rest and in transit.\nThe application uses an Amazon API Gateway API that resolves to AWS Lambda functions. The Lambda functions store the data in an Amazon Aurora MySQL DB cluster. The application worked properly during testing.\nA developer configured an Amazon CloudFront distribution with field-level encryption that uses an AWS Key Management Service (AWS KMS) key. After the configuration of the distribution, the application behaved unexpectedly. All the data in the database changed from plaintext to ciphertext. The developer must ensure that the data is not stored in the database as the ciphertext from the CloudFront field-level encryption.\nWhich solution will meet this requirement?",
      "o": [
        "Change the CloudFront Viewer protocol policy from \u201cHTTP and HTTPS\u201d to \u201cHTTPS only.\u201d",
        "Add a Lambda function that uses the KMS key to decrypt the data fields before saving the data to the database.",
        "Enable encryption on the DB cluster by using the same KMS key that is used in CloudFront.",
        "Request and deploy a new SSL certificate to use with the CloudFront distribution."
      ],
      "ma": [
        1
      ],
      "e": "CloudFront field-level encryption encrypts the selected fields with a public key at the edge, and the data stays ciphertext until a component holding the private key decrypts it. Because the Lambda functions wrote the received ciphertext straight into Aurora, a Lambda function must call KMS to decrypt those fields before storing them. Switching to HTTPS only (A) or a new SSL certificate (D) concerns transport encryption and does not change field-level encryption. Encrypting the DB cluster with the same key (C) encrypts storage at rest but does not decrypt the already encrypted field values. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 495
    },
    {
      "d": 0,
      "q": "A company offers a business-to-business software service that runs on dedicated infrastructure deployed in each customer\u2019s AWS account. Before a feature release, the company needs to run integration tests on real AWS test infrastructure. The test infrastructure consists of Amazon EC2 instances and an Amazon RDS database.\nA developer must set up a continuous delivery process that will provision the test infrastructure across the different AWS accounts. The developer then must run the integration tests.\nWhich solution will meet these requirements with the LEAST administrative effort?",
      "o": [
        "Use AWS CodeDeploy with AWS CloudFormation StackSets to deploy the infrastructure. Use Amazon CodeGuru to run the tests.",
        "Use AWS CodePipeline with AWS CloudFormation StackSets to deploy the infrastructure. Use AWS CodeBuild to run the tests.",
        "Use AWS CodePipeline with AWS CloudFormation change sets to deploy the infrastructure. Use a CloudFormation custom resource to run the tests.",
        "Use AWS Serverless Application Model (AWS SAM) templates with AWS CloudFormation change sets to deploy the infrastructure. Use AWS CodeDeploy to run the tests."
      ],
      "ma": [
        1
      ],
      "e": "CodePipeline orchestrates the continuous delivery flow, CloudFormation StackSets deploy the same EC2 and RDS template across many target accounts with one operation, and a CodeBuild action can run the integration tests. CodeDeploy (A, D) deploys application code to compute and is not an infrastructure provisioner or test runner, and Amazon CodeGuru does code review and profiling, not integration tests. Change sets (C, D) work within a single account and region, and running tests from a CloudFormation custom resource is an awkward misuse. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 496
    },
    {
      "d": 0,
      "q": "A developer is creating an application that uses an AWS Lambda function to transform and load data from an Amazon S3 bucket. When the developer tests the application, the developer finds that some invocations of the Lambda function are slower than others.\nThe developer needs to update the Lambda function to have predictable invocation durations that run with low latency. Any initialization activities, such as loading libraries and instantiating clients, must run during allocation time rather than during actual function invocations.\nWhich combination of steps will meet these requirements? (Choose two.)",
      "o": [
        "Create a schedule group in Amazon EventBridge Scheduler to invoke the Lambda function.",
        "Configure provisioned concurrency for the Lambda function to have the necessary number of execution environments.",
        "Use the $LATEST version of the Lambda function.",
        "Configure reserved concurrency for the Lambda function to have the necessary number of execution environments.",
        "Deploy changes, and publish a new version of the Lambda function."
      ],
      "ma": [
        1,
        4
      ],
      "e": "Provisioned concurrency pre-initializes the requested number of execution environments, so library loading and client creation happen at allocation time and invocations get consistent low latency. Provisioned concurrency can only be set on a published version or alias and not on $LATEST, so the changes must be deployed and published as a new version. Reserved concurrency (D) only guarantees or limits capacity and does not pre-warm environments, a scheduled EventBridge invocation (A) is unreliable warming, and $LATEST (C) cannot have provisioned concurrency. Community vote: BE (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 497
    },
    {
      "d": 0,
      "q": "A developer created an AWS Lambda function named ProcessMessages. The Lambda function is invoked asynchronously when a message is published to an Amazon Simple Notification Service (Amazon SNS) topic named InputTopic. The developer uses a second SNS topic named ErrorTopic to handle alerts of failures for other services.\nThe developer wants to receive notifications from the ErrorTopic SNS topic when the ProcessMessages Lambda function fails to process a message.\nWhich solution will meet this requirement?",
      "o": [
        "Configure a subscription for the ErrorTopic SNS topic. Configure a filter policy for failures. Specify the ProcessMessages Lambda function as the endpoint.",
        "Configure a failure destination for the ProcessMessages Lambda function. Specify the Amazon Resource Name (ARN) of the ErrorTopic SNS topic as the destination ARN.",
        "Configure a trigger for the ProcessMessages Lambda function. Specify the ErrorTopic SNS topic as the trigger topic. Configure a filter policy on the topic for failures",
        "Configure a delivery policy on the ErrorTopic SNS topic. Configure a filter policy for failures. Specify the Lambda function as the input endpoint."
      ],
      "ma": [
        1
      ],
      "e": "For asynchronous invocations, Lambda supports an on-failure destination, and an SNS topic can be configured as that destination by specifying the ErrorTopic ARN. When ProcessMessages fails after its retries, Lambda publishes the failure record to ErrorTopic and the subscribers are notified. Subscribing the function to ErrorTopic (A, C) would invoke the function on error messages instead of notifying people, and an SNS delivery policy (D) only controls retry behavior for deliveries. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 498
    },
    {
      "d": 0,
      "q": "A company is developing a new application that uses Amazon EC2, Amazon S3, and AWS Lambda resources. The company wants to allow employees to access the AWS Management Console by using existing credentials that the company stores and manages in an on-premises Microsoft Active Directory. Each employee must have a specific level of access to the AWS resources that is based on the employee\u2019s role. Which solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Configure AWS Directory Service to create an Active Directory in AWS Directory Service for Microsoft Active Directory. Establish a trust relationship with the on-premises Active Directory. Configure IAM roles and trust policies to give the employees access to the AWS resources.",
        "Use LDAP to directly integrate the on-premises Active Directory with AWS Identity and Access Management (IAM). Map Active Directory groups to IAM roles to control access to AWS resources.",
        "Implement a custom identity broker to authenticate users into the on-premises Active Directory. Configure the identity broker to use AWS Security Token Service (AWS STS) to grant authorized users IAM role based access to the AWS resources.",
        "Configure Amazon Cognito to federate users into the on-premises Active Directory. Use Cognito user pools to manage user identities and to manage user access to the AWS resources."
      ],
      "ma": [
        0
      ],
      "e": "AWS Managed Microsoft AD with a trust relationship to the on-premises Active Directory lets employees sign in with existing credentials, and IAM roles mapped to directory groups give role-based console access with little custom code to run. IAM has no direct LDAP integration (B), so that option cannot work. A custom identity broker (C) works but means building and operating your own service, and Cognito user pools (D) manage app users and do not grant console access based on on-premises AD roles. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 499
    },
    {
      "d": 0,
      "q": "A company has an Amazon DynamoDB table that contains records of users that have signed up for a trial of the company\u2019s product. The company is using a spreadsheet to track data about the product trial. The company needs to ensure the spreadsheet is automatically updated with the latest information when individual trials begin, are updated, or finish.\nWhich solution will meet these requirements?",
      "o": [
        "Create a DynamoDB Accelerator (DAX) cluster from the table. Set the view type to old image. Create an AWS Lambda function that uses the cluster data to update the spreadsheet. Subscribe the Lambda function to the cluster.",
        "Create a DynamoDB Accelerator (DAX) cluster from the table. Set the view type to new image. Create an AWS Lambda function that uses the cluster data to update the spreadsheet. Subscribe the Lambda function to the cluster.",
        "Enable a DynamoDB stream for the table. Set the view type to new image. Create an AWS Lambda function that uses the stream data to update the spreadsheet. Subscribe the Lambda function to the stream.",
        "Enable a DynamoDB stream for the table. Set the view type to old image. Create an AWS Lambda function that uses the stream data to update the spreadsheet. Subscribe the Lambda function to the stream."
      ],
      "ma": [
        2
      ],
      "e": "A DynamoDB stream captures item-level changes for inserts, updates and deletes, and a Lambda function subscribed to the stream can update the spreadsheet whenever a trial begins, changes or finishes. The NEW_IMAGE view type provides the latest item state, which is what the spreadsheet needs; OLD_IMAGE (D) would give only the stale data. DAX (A, B) is a read-through cache and has no stream or view type that can trigger Lambda. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 500
    },
    {
      "d": 0,
      "q": "A developer is launching a global application that delivers content to multiple countries. The developer needs to serve specific content based on the country of each user and each user\u2019s primary language. The developer must ensure that content is served reliably and with low latency. Which solution will meet these requirements?",
      "o": [
        "Create an Amazon API Gateway REST API. Create an AWS Global Accelerator standard accelerator to resolve requests to the API. Configure endpoint groups on the accelerator. Attach listeners for each country and language.",
        "Store the content in a centralized Amazon S3 bucket. Enable S3 Transfer Acceleration on the bucket. Create an Amazon Route 53 hosted zone that includes the endpoint for the S3 bucket. Create records in Route 53 that use geoproximity and geolocation routing policies.",
        "Create an Amazon API Gateway REST API. Connect the REST API to AWS WAF. Use geo match statements and regex match statements to allow or deny requests based on the labels returned from web request evaluations.",
        "Configure an Amazon CloudFront distribution that uses the application as an origin. Configure the distribution to forward the Accept- Language header and the CloudFront-Viewer-Country header to the origin."
      ],
      "ma": [
        3
      ],
      "e": "A CloudFront distribution caches content at edge locations for low latency and reliability, and forwarding or caching on the CloudFront-Viewer-Country and Accept-Language headers lets the origin serve content specific to each viewer's country and language. Global Accelerator (A) routes TCP/UDP traffic to endpoints but has no listeners per country or language. S3 Transfer Acceleration with Route 53 geo records (B) is for uploads and cannot vary content by language, and AWS WAF (C) only allows or blocks requests and does not serve localized content. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 501
    },
    {
      "d": 0,
      "q": "A company generates SSL certificates from a third-party provider. The company imports the certificates into AWS Certificate Manager (ACM) to use with public web applications.\nA developer must implement a solution to notify the company\u2019s security team 90 days before an imported certificate expires. The company already has configured an Amazon Simple Queue Service (Amazon SQS) queue. The company also has configured an Amazon Simple Notification Service (Amazon SNS) topic that has the security team\u2019s email address as a subscriber.\nWhich solution will provide the security team with the required notification about certificates?",
      "o": [
        "Create an Amazon EventBridge rule that specifies the ACM Certificate Approaching Expiration event type. Set the SNS topic as the EventBridge rule\u2019s target.",
        "Create an AWS Lambda function to search for all certificates that are expiring within 90 days. Program the Lambda function to send each identified certificate\u2019s Amazon Resource Name (ARN) in a message to the SQS queue.",
        "Create an AWS Step Functions workflow that is invoked by each certificate\u2019s expiration notification from AWS CloudTrail. Create an AWS Lambda function to send each certificate's Amazon Resource Name (ARN) in a message to the SQS queue.",
        "Configure AWS Config with the acm-certificate-expiration-check managed rule to run every 24 hours. Create an Amazon EventBridge rule that includes an event pattern that specifies the Config Rules Compliance Change detail type and the configured rule. Set the SNS topic as the EventBridge rule\u2019s target."
      ],
      "ma": [
        3
      ],
      "e": "ACM's own expiration events for imported certificates start at 45 days by default and the lead time cannot be set to 90 days. The AWS Config managed rule acm-certificate-expiration-check lets you set daysToExpiration to 90, runs on a schedule, and emits a Config Rules Compliance Change event that an EventBridge rule can send to the SNS topic. The ACM approaching-expiration event (A) cannot be configured to 90 days, and CloudTrail does not record certificate expiration notifications (C). A Lambda function that writes to SQS (B) notifies no one and the security team is subscribed only to the SNS topic. Community vote: D (57%), A (43%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 502
    },
    {
      "d": 0,
      "q": "A developer has an AWS Lambda function that needs to access an Amazon DynamoDB table named DailyOrders. The Lambda function must be able to perform read operations on the table. The Lambda function must not be able to perform write operations on the table.\nThe developer needs to create an IAM policy to associate with the Lambda function's execution role.\nWhich IAM policy statement will meet these requirements?",
      "o": [
        "",
        "",
        "",
        ""
      ],
      "ma": [
        3
      ],
      "e": "The policy must allow only read actions on the DailyOrders table, such as BatchGetItem, GetItem, Query and Scan, with no write actions like PutItem, UpdateItem or BatchWriteItem. Only the option allowing exactly BatchGetItem, GetItem, Query and Scan on the table ARN satisfies this. One option also allows PutItem, another allows batch and single writes, and the Deny statement that lists Query and Scan would block reads while leaving write actions un-denied. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [
          {
            "path": "assets/q503-A1.png",
            "alt": "Question 503 option A"
          }
        ],
        [
          {
            "path": "assets/q503-B1.png",
            "alt": "Question 503 option B"
          }
        ],
        [
          {
            "path": "assets/q503-C1.png",
            "alt": "Question 503 option C"
          }
        ],
        [
          {
            "path": "assets/q503-D1.png",
            "alt": "Question 503 option D"
          }
        ]
      ],
      "sourceNumber": 503
    },
    {
      "d": 0,
      "q": "A developer is working on a new authorization mechanism for an application. The developer must create an Amazon API Gateway API and must test JSON Web Token (JWT) authorization on the API.\nThe developer must use the built-in authorizer and must avoid managing the code with custom logic. The developer needs to define an API route that is available at /auth to test the authorizer configuration.\nWhich solution will meet these requirements?",
      "o": [
        "Create a WebSocket API and the /auth route. Configure and attach the JWT authorizer to the API. Deploy the API.",
        "Create a WebSocket API and the /auth route. Create and configure an AWS Lambda authorizer. Attach the Lambda authorizer to the API. Deploy the API.",
        "Create an HTTP API and the /auth route. Create and configure an AWS Lambda authorizer. Attach the Lambda authorizer to the /auth route. Deploy the API.",
        "Create an HTTP API and the /auth route. Configure the JWT authorizer. Attach the JWT authorizer to the /auth route. Deploy the API."
      ],
      "ma": [
        3
      ],
      "e": "The built-in JWT authorizer is a feature of API Gateway HTTP APIs, which validate tokens from an OIDC or OAuth 2.0 issuer and can be attached directly to a route such as /auth with no custom code. WebSocket APIs (A, B) do not support JWT authorizers. A Lambda authorizer (B, C) requires writing and managing custom function code, which the developer wants to avoid. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 504
    },
    {
      "d": 0,
      "q": "A company is creating a new application that gives users the ability to upload and share short video files. The average size of the video files is 10 MB. After a user uploads a file, a message needs to be placed into an Amazon Simple Queue Service (Amazon SQS) queue so the file can be processed. The files need to be accessible for processing within 5 minutes.\nWhich solution will meet these requirements MOST cost-effectively?",
      "o": [
        "Write the files to Amazon S3 Glacier Deep Archive. Add the S3 location of the files to the SQS queue.",
        "Write the files to Amazon S3 Standard. Add the S3 location of the files to the SQS queue.",
        "Write the files to an Amazon Elastic Block Store (Amazon EBS) General Purpose SSD volume. Add the EBS location of the files to the SQS queue.",
        "Write messages that contain the contents of the uploaded files to the SQS queue."
      ],
      "ma": [
        1
      ],
      "e": "S3 Standard gives immediate access and low cost for 10 MB files, and passing only the S3 location in the SQS message keeps messages small. Glacier Deep Archive (A) has retrieval times of hours, far beyond 5 minutes. SQS messages are limited to 256 KB, so storing file contents in them (D) is impossible for 10 MB videos, and EBS (C) is attached to a single instance and costs more per GB than S3. Community vote: B (80%), C (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 505
    },
    {
      "d": 0,
      "q": "A developer is updating the code for an AWS Lambda function to add new capabilities. The Lambda function has version aliases for production and development environments that run separate versions of the function. The developer needs to configure a staging environment for the Lambda function to handle invocations to both the development version and the production version.\nWhich solution will meet these requirements?",
      "o": [
        "Create a weighted alias that references the production version of the function and the updated version of the function.",
        "Add a Network Load Balancer. Add the production version of the function and updated version of the function as targets.",
        "Use AWS CodeDeploy to create a linear traffic shifting deployment",
        "Create a tag for the Lambda function that contains the production version and updated version of the code."
      ],
      "ma": [
        0
      ],
      "e": "A Lambda alias can route traffic between two function versions by weight (routing configuration), so a staging alias can send invocations to both the production version and the updated version. Network Load Balancers (B) cannot target Lambda functions, and CodeDeploy linear deployments (C) shift traffic gradually over time but do not create a standing staging environment. Tags (D) are only metadata and do not route traffic. Community vote: A (67%), C (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 506
    },
    {
      "d": 0,
      "q": "A developer has implemented an AWS Lambda function that inserts new customers into an Amazon RDS database. The function is expected to run hundreds of times each hour. The function and RDS database are in the same VPC. The function is configured to use 512 MB of RAM and is based on the following pseudo code:\nAfter successfully testing the function multiple times, the developer notices that the execution time is longer than expected.\nWhat should the developer do to improve performance?",
      "o": [
        "Increase the reserved concurrency of the Lambda function.",
        "Increase the size of the RDS database to facilitate an increased number of database connections each hour.",
        "Move the database connection and close statement out of the handler. Place the connection in the global space.",
        "Replace Amazon RDS with Amazon DynamoDB to implement control over the number of writes per second."
      ],
      "ma": [
        2
      ],
      "e": "The handler opens a new database connection on every invocation and closes it at the end, so each run pays connection setup time. Creating the connection outside the handler in global scope lets warm execution environments reuse it across invocations, cutting duration. Reserved concurrency (A) only affects scaling, a bigger RDS instance (B) does not remove per-invocation connect time, and moving to DynamoDB (D) is an unnecessary redesign. Community vote: C (75%), A (25%).",
      "images": [
        {
          "path": "assets/q507-s1.png",
          "alt": "Question 507 diagram"
        }
      ],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 507
    },
    {
      "d": 0,
      "q": "A developer is troubleshooting the permissions of an application that needs to make changes to an Amazon RDS database. The developer has access to the IAM role that the application is using.\nWhich command structure should the developer use to test the role permissions?",
      "o": [
        "aws sts assume-role",
        "aws iam attach-role-policy",
        "aws ssm resume-session",
        "aws rds add-role-to-db-cluster"
      ],
      "ma": [
        0
      ],
      "e": "The aws sts assume-role command returns temporary credentials for the role, and using them for CLI calls shows whether the role's permissions actually allow the RDS operations. The other commands change configuration instead of testing it: attach-role-policy modifies the role, add-role-to-db-cluster associates an IAM role with a DB cluster, and ssm resume-session reconnects a Session Manager session. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 508
    },
    {
      "d": 0,
      "q": "A gaming company has deployed a web portal on AWS Elastic Beanstalk. The company sometimes needs to deploy new versions three or four times in a day. The company needs to deploy new features for all users as quickly as possible. The solution must minimize performance impact and must maximize availability.\nWhat solution will meet these requirements?",
      "o": [
        "Use a rolling deployment policy to deploy to Amazon EC2 instances.",
        "Use an immutable deployment policy to deploy to Amazon EC2 instances.",
        "Use an all-at-once deployment policy to deploy to Amazon EC2 instances.",
        "Use a-canary deployment strategy to deploy changes to Amazon EC2 instances."
      ],
      "ma": [
        1
      ],
      "e": "Immutable deployments launch a full new set of instances in a temporary Auto Scaling group and swap them in only when healthy, so the existing fleet keeps serving at full capacity with no performance hit and an easy rollback. All-at-once (C) causes downtime, and rolling (A) reduces capacity while each batch updates. Canary is a traffic-splitting strategy and is not an Elastic Beanstalk deployment policy for EC2 environments. Community vote: B (67%), D (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 509
    },
    {
      "d": 0,
      "q": "An AWS Lambda function generates a 3 MB JSON file and then uploads it to an Amazon S3 bucket daily. The file contains sensitive information, so the developer must ensure that it is encrypted before uploading to the bucket.\nWhich of the following modifications should the developer make to ensure that the data is encrypted before uploading it to the bucket?",
      "o": [
        "Use the default AWS Key Management Service (AWS KMS) key for Amazon S3 in the Lambda function code.",
        "Use the S3 managed key and call the GenerateDataKey API to encrypt the file.",
        "Use the GenerateDataKey API, then use that data key to encrypt the file in the Lambda function code.",
        "Use an AWS Key Management Service (AWS KMS) customer managed key for Amazon S3 in the Lambda function code."
      ],
      "ma": [
        2
      ],
      "e": "To encrypt the file before upload, the function should call KMS GenerateDataKey and use the returned plaintext data key to encrypt the 3 MB file locally (envelope encryption), then upload the ciphertext with the encrypted data key. KMS Encrypt/direct key use is limited to 4 KB of data, and simply specifying a KMS key for S3 (A, D) triggers server-side encryption after the data reaches S3, not encryption before upload. S3 managed keys cannot be used with GenerateDataKey (B). Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 510
    },
    {
      "d": 0,
      "q": "A company is building a social media application. A developer is modifying an AWS Lambda function that updates a database with data that tracks each user's online activity. A web application server uses the AWS SDK to invoke the Lambda function.\nThe developer has tested the new Lambda code and is ready to deploy the code into production. However, the developer wants to allow only a small percentage of the invocations from the AWS SDK to call the new code.\nWhich solution will meet these requirements?",
      "o": [
        "Configure a Lambda version that has a specific weight value for the updated Lambda function.",
        "Create an alias for the Lambda function. Configure a specific weight value for the updated version.",
        "Create an Application Load Balancer. Specify weighted target groups for the original Lambda function and the updated Lambda function.",
        "Create a Network Load Balancer. Specify weighted target groups for the original Lambda function and the updated Lambda function."
      ],
      "ma": [
        1
      ],
      "e": "A Lambda alias can point to two versions with a weighted routing configuration, so assigning a small percentage to the updated version sends only that share of invocations from the SDK to the new code. The caller invokes the alias ARN and no other changes are needed. A version has no weight setting of its own (A), and the Network Load Balancer cannot target Lambda functions (D). An ALB (C) would work technically, but the SDK invokes Lambda directly rather than through a load balancer. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 511
    },
    {
      "d": 0,
      "q": "An Amazon Data Firehose delivery stream is receiving customer data that contains personally identifiable information. A developer needs to remove pattern-based customer identifiers from the data and store the modified data in an Amazon S3 bucket.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Implement Firehose data transformation as an AWS Lambda function. Configure the function to remove the customer identifiers. Set an Amazon S3 bucket as the destination of the delivery stream.",
        "Launch an Amazon EC2 instance. Set the EC2 instance as the destination of the delivery stream. Run an application on the EC2 instance to remove the customer identifiers. Store the transformed data in an Amazon S3 bucket.",
        "Create an Amazon OpenSearch Service instance. Set the OpenSearch Service instance as the destination of the delivery stream. Use search and replace to remove the customer identifiers. Export the data to an Amazon S3 bucket.",
        "Create an AWS Step Functions workflow to remove the customer identifiers. As the last step in the workflow, store the transformed data in an Amazon S3 bucket. Set the workflow as the destination of the delivery stream."
      ],
      "ma": [
        0
      ],
      "e": "Amazon Data Firehose supports data transformation with a Lambda function, which receives batches of records, can strip pattern-based identifiers, and returns the modified records for delivery to the S3 destination. Firehose cannot use an EC2 instance (B) or a Step Functions workflow (D) as a destination, and sending data to OpenSearch Service (C) and exporting it is cumbersome and does not guarantee PII is removed before storage. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 512
    },
    {
      "d": 0,
      "q": "A developer is building a three-tier web application that should be able to handle a minimum of 5000 requests per minute. Requirements state that the web tier should be completely stateless while the application maintains session state for the users.\nHow can session data be externalized, keeping latency at the LOWEST possible value?",
      "o": [
        "Create an Amazon RDS instance, then implement session handling at the application level to leverage a database inside the RDS database instance for session data storage.",
        "Implement a shared file system solution across the underlying Amazon EC2 instances, then implement session handling at the application level to leverage the shared file system for session data storage.",
        "Create an Amazon ElastiCache (Memcached) cluster, then implement session handling at the application level to leverage the cluster for session data storage.",
        "Create an Amazon DynamoDB table, then implement session handling at the application level to leverage the table for session data storage."
      ],
      "ma": [
        2
      ],
      "e": "Amazon ElastiCache for Memcached keeps session data in memory, providing sub-millisecond reads and writes and scaling easily beyond 5000 requests per minute, which gives the lowest latency while keeping the web tier stateless. RDS (A) and a shared file system (B) have higher latency and scaling limits. DynamoDB (D) is a good session store but single-digit-millisecond latency is higher than in-memory caching. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 513
    },
    {
      "d": 0,
      "q": "A developer has deployed an AWS Lambda function that is subscribed to an Amazon Simple Notification Service (Amazon SNS) topic. The developer must implement a solution to add a record of each Lambda function invocation to an Amazon Simple Queue Service (Amazon SQS) queue.\nWhich solution will meet this requirement?",
      "o": [
        "Configure the SQS queue as a dead-letter queue for the Lambda function.",
        "Create code that uses the AWS SDK to call the SQS SendMessage operation to add the invocation details to the SQS queue. Add the code to the end of the Lambda function.",
        "Add two asynchronous invocation destinations to the Lambda function: one destination for successful invocations and one destination for failed invocations. Configure the SQS queue as the destination for each type. Create an Amazon CloudWatch alarm based on the DestinationDeliveryFailures metric to catch any message that cannot be delivered.",
        "Add a single asynchronous invocation destination to the Lambda function to capture successful invocations. Configure the SQS queue as the destination. Create an Amazon CloudWatch alarm based on the DestinationDeliveryFailures metric to catch any message that cannot be delivered."
      ],
      "ma": [
        2
      ],
      "e": "Lambda asynchronous invocation destinations can send a record for both successful and failed invocations to an SQS queue, so configuring one destination for success and one for failure captures every invocation, and the DestinationDeliveryFailures metric reveals any record that could not be delivered. A dead-letter queue (A) captures only failed events, a single success destination (D) misses failures, and custom SendMessage code at the end of the function (B) does not run when the function fails or times out. Community vote: C (38%), B (38%), D (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 514
    },
    {
      "d": 0,
      "q": "An AWS Lambda function that handles application requests uses the default Lambda logging mechanism to log the timestamp, processing time, and status of requests.\nA developer needs to create Amazon CloudWatch metrics based on the logs. The developer needs to write the metrics to a custom CloudWatch metrics namespace.\nWhich solution will meet these requirements?",
      "o": [
        "Use Amazon CloudWatch Logs Insights to generate custom metrics from the logs by using CloudWatch embedded metric format (EMF).",
        "Use Amazon CloudWatch RUM to generate custom metrics from the logs by using CloudWatch embedded metric format (EMF).",
        "Use Amazon CloudWatch Logs Insights to generate custom metrics from the logs by using JSON format.",
        "Use the CloudWatch embedded metric format (EMF) for the structure of the log statements to generate custom CloudWatch metrics."
      ],
      "ma": [
        3
      ],
      "e": "Writing the function's logs in CloudWatch embedded metric format (EMF) lets CloudWatch extract custom metrics from the log events automatically and publish them to a namespace specified in the EMF structure. CloudWatch Logs Insights (A, C) queries logs and does not create metrics, and CloudWatch RUM (B) monitors browser web applications and has nothing to do with Lambda logs. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 515
    },
    {
      "d": 0,
      "q": "A developer needs to configure an AWS Lambda function to make HTTP POST requests to an internal application. The application is in the same AWS account that hosts the function. The internal application runs on Amazon EC2 instances in a private subnet within a VPC.\nWhich solution will meet these requirements?",
      "o": [
        "Configure a VPC endpoint to connect to the private subnet. Attach the endpoint to the Lambda function.",
        "Attach the Lambda function to the VPC and to the private subnet.",
        "Configure a VPN connection between the Lambda function and the private subnet. Attach the VPN to the Lambda function.",
        "Configure the VPC route table to include the Lambda function\u2019s IP address."
      ],
      "ma": [
        1
      ],
      "e": "To reach resources in a private subnet, the Lambda function is configured with the VPC, subnets and security groups, which creates elastic network interfaces in that VPC so it can reach the EC2 instances over private IPs. A VPC endpoint (A) provides private access to AWS services and is not attached to a function to reach EC2 instances, a VPN (C) is for connecting external networks, and route tables (D) cannot reference a Lambda function's IP address. Community vote: B (67%), D (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 516
    },
    {
      "d": 0,
      "q": "A company has an application that processes audio files for different departments. When audio files are saved to an Amazon S3 bucket, an AWS Lambda function receives an event notification and processes the audio input.\nA developer needs to update the solution so that the application can process the audio files for each department independently. The application must publish the audio file location for each department to each department's existing Amazon Simple Queue Service (Amazon SQS) queue. Which solution will meet these requirements with no changes to the Lambda function code?",
      "o": [
        "Configure the S3 bucket to send the event notifications to an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe each department\u2019s SQS queue to the SNS topic. Configure subscription filter policies.",
        "Update the Lambda function to write the file location to a single shared SQS queue. Configure the shared SQS queue to send the file reference to each department\u2019s SQS queue.",
        "Update the Lambda function to send the file location to each department\u2019s SQS queue.",
        "Configure the S3 bucket to send the event notifications to each department\u2019s SQS queue."
      ],
      "ma": [
        0
      ],
      "e": "Having S3 publish event notifications to an SNS topic, with each department's SQS queue subscribed using a filter policy, fans the event out to the right queues with no Lambda code changes. An S3 event notification can target a given prefix or SQS queue but overlapping notification rules for one event type are not allowed, so sending to every department queue directly (D) is not possible. Options B and C require changing the Lambda function code. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 517
    },
    {
      "d": 0,
      "q": "Two containerized microservices are hosted on Amazon EC2 ECS. The first microservice reads an Amazon RDS Aurora database instance, and the second microservice reads an Amazon DynamoDB table.\nHow can each microservice be granted the minimum privileges?",
      "o": [
        "Set ECS_ENABLE_TASK_IAM_ROLE to false on EC2 instance boot in ECS agent configuration file. Run the first microservice with an IAM role for ECS tasks with read-only access for the Aurora database. Run the second microservice with an IAM role for ECS tasks with read-only access to DynamoDB.",
        "Set ECS_ENABLE_TASK_IAM ROLE to false on EC2 instance boot in the ECS agent configuration file. Grant the instance profile role read-only access to the Aurora database and DynamoDB.",
        "Set ECS_ENABLE_TASK_IAM ROLE to true on EC2 instance boot in the ECS agent configuration file. Run the first microservice with an IAM role for ECS tasks with read-only access for the Aurora database. Run the second microservice with an IAM role for ECS tasks with read-only access to DynamoDB.",
        "Set ECS_ENABLE_TASK_IAM_ROLE to true on EC2 instance boot in the ECS agent configuration file. Grant the instance profile role read-only access to the Aurora database and DynamoDB."
      ],
      "ma": [
        2
      ],
      "e": "Enabling ECS_ENABLE_TASK_IAM_ROLE in the ECS agent configuration turns on IAM roles for tasks, so each task definition can have its own task role. Giving the Aurora microservice a read-only role for its database and the DynamoDB microservice a read-only role for DynamoDB gives each only the minimum privilege. Setting the flag to false (A, B) disables task roles, and granting both services' permissions to the instance profile (D) gives every container on the instance access to both. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 518
    },
    {
      "d": 0,
      "q": "A developer is writing a mobile application that allows users to view images from an S3 bucket. The users must be able to log in with their Amazon login, as well as supported social media accounts.\nHow can the developer provide this authentication functionality?",
      "o": [
        "Use Amazon Cognito with web identity federation.",
        "Use Amazon Cognito with SAML-based identity federation.",
        "Use IAM access keys and secret keys in the application code to allow Get* on the S3 bucket.",
        "Use AWS STS AssumeRole in the application code and assume a role with Get* permissions on the S3 bucket."
      ],
      "ma": [
        0
      ],
      "e": "Amazon Cognito identity pools support web identity federation, letting users sign in with Login with Amazon and social providers such as Google and Facebook and exchange the token for temporary AWS credentials to read from S3. SAML federation (B) is for enterprise identity providers, not social logins. Embedding access keys in the app (C) is insecure, and calling AssumeRole from the app code (D) requires already having AWS credentials. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 519
    },
    {
      "d": 0,
      "q": "An application that is running on Amazon EC2 instances stores data in an Amazon S3 bucket. All the data must be encrypted in transit. How can a developer ensure that all traffic to the S3 bucket is encrypted?",
      "o": [
        "Install certificates on the EC2 instances.",
        "Create a private VPC endpoint.",
        "Configure the S3 bucket with server-side encryption with AWS KMS managed encryption keys (SSE-KMS).",
        "Create an S3 bucket policy that denies traffic when the value for the aws:SecureTransport condition key is false."
      ],
      "ma": [
        3
      ],
      "e": "An S3 bucket policy that denies requests when aws:SecureTransport is false forces all access to use HTTPS, so any unencrypted request is rejected. Installing certificates on EC2 (A) does not stop clients from using HTTP, a VPC endpoint (B) controls the network path and not the protocol, and SSE-KMS (C) encrypts data at rest and not in transit. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 520
    },
    {
      "d": 0,
      "q": "A company is hosting an Amazon AP! Gateway REST API that calls a single AWS Lambda function. The function is infrequently invoked by multiple clients at the same time.\nThe code performance is optimal, but the company wants to optimize the startup time of the function What can a developer do to optimize the initialization of the function?",
      "o": [
        "Enable API Gateway caching for the REST API.",
        "Configure provisioned concurrency for the Lambda function.",
        "Use Lambda proxy integration for the REST API.",
        "Configure AWS Global Accelerator for the Lambda function."
      ],
      "ma": [
        1
      ],
      "e": "Provisioned concurrency keeps execution environments initialized and ready, so infrequent invocations do not hit a cold start and the function's startup time is optimized. API Gateway caching (A) only avoids calling the function for repeated identical requests, and Lambda proxy integration (C) changes how the request and response are mapped. Global Accelerator (D) cannot front a Lambda function and does not change initialization. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 521
    },
    {
      "d": 0,
      "q": "A developer is building a three-tier application with an Application Load Balancer (ALB), Amazon EC2 instances, and Amazon RDS. There is an alias record in Amazon Route 53 that points to the ALB. When the developer tries to access the ALB from a laptop, the request times out. Which logs should the developer investigate to verify that the request is reaching the AWS network?",
      "o": [
        "VPC Flow Logs",
        "Amazon Route 53 logs",
        "AWS Systems Manager Agent logs",
        "Amazon CloudWatch agent logs"
      ],
      "ma": [
        0
      ],
      "e": "VPC Flow Logs record accepted and rejected traffic at the ENIs of the ALB, so they show whether the laptop's request actually reaches the VPC and whether security groups or network ACLs are rejecting it. Route 53 logs (B) only show DNS queries, and Systems Manager Agent logs (C) and CloudWatch agent logs (D) come from the instances and say nothing about traffic arriving at the ALB. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 522
    },
    {
      "d": 0,
      "q": "A developer has an application that uses AWS Security Token Service (AWS STS). The application calls the STS AssumeRole API operation to provide trusted users with temporary security credentials. The application calls AWS STS at the service's default endpoint:\nhttps://sts.amazonaws.com.\nThe application is deployed in an Asia Pacific AWS Region. The application is experiencing errors that are related to intermittent latency when the application calls AWS STS.\nWhat should the developer do to resolve this issue?",
      "o": [
        "Update the application to use the GetSessionToken API operation.",
        "Update the application to use the AssumeRoleWithSAML API operation.",
        "Update the application to use a Regional STS endpoint that is closer to the application deployment.",
        "Update the application to use the AssumeRoleWithWebldentity API operation. Move the STS endpoint to a global endpoint."
      ],
      "ma": [
        2
      ],
      "e": "The default sts.amazonaws.com endpoint is a single global endpoint hosted in us-east-1, so calls from Asia Pacific incur extra latency and can fail intermittently. Pointing the SDK at the nearest Regional STS endpoint, such as sts.ap-southeast-1.amazonaws.com, reduces latency and improves reliability. Changing to GetSessionToken, AssumeRoleWithSAML or AssumeRoleWithWebIdentity (A, B, D) alters the credential type or federation flow and does not address endpoint location. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 523
    },
    {
      "d": 0,
      "q": "A company is launching a photo sharing application on AWS. Users use the application to upload images to an Amazon S3 bucket. When users upload images, an AWS Lambda function creates thumbnail versions of the images and stores the thumbnail versions in another S3 bucket. During development, a developer notices that the Lambda function takes more than 2 minutes to complete the thumbnail process. The company needs alll images to be processed in less than 30 seconds.\nWhat should the developer do to meet these requirements?",
      "o": [
        "Increase the virtual CPUs (vCPUs) for the Lambda function to use 10 vCPUs.",
        "Change Lambda function instance type to use m6a.4xlarge.",
        "Configure the Lambda function to increase the amount of memory.",
        "Configure burstable performance for the Lambda function."
      ],
      "ma": [
        2
      ],
      "e": "Lambda allocates CPU power, network bandwidth and other resources in proportion to configured memory, so increasing memory (up to 10,240 MB) speeds up CPU-intensive image processing. Lambda does not let you set vCPUs directly (A), choose an EC2 instance type (B), or configure burstable performance (D). Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 524
    },
    {
      "d": 0,
      "q": "A development team is designing a mobile app that requires multi-factor authentication.\nWhich steps should be taken to achieve this? (Choose two.)",
      "o": [
        "Use Amazon Cognito to create a user pool and create users in the user pool.",
        "Send multi-factor authentication text codes to users with the Amazon SNS Publish API call in the app code.",
        "Enable multi-factor authentication for the Amazon Cognito user pool.",
        "Use AWS IAM to create IAM users.",
        "Enable multifactor authentication for the users created in AWS IAM."
      ],
      "ma": [
        0,
        2
      ],
      "e": "An Amazon Cognito user pool provides the sign-up and sign-in directory for the mobile app, and MFA can be enabled on that user pool (SMS or TOTP) so users must provide a second factor. Sending your own codes with SNS Publish (B) means building the MFA flow yourself, and IAM users (D, E) are meant for administrators and workloads, not for app end users. Community vote: AC (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 525
    },
    {
      "d": 0,
      "q": "A developer is building an application that will process messages from an Amazon Simple Queue Service (Amazon SQS) standard queue. The application needs to process the messages in an Amazon Elastic Container Service (Amazon ECS) task.\nWhich actions will result in the MOST cost-effective processing of the messages? (Choose two.)",
      "o": [
        "Use long polling to query the queue for new messages.",
        "Use short polling to query the queue for new messages.",
        "Use message batching to retrieve messages from the queue.",
        "Use Amazon ElastiCache to cache messages in the queue.",
        "Use an SQS FIFO queue to manage the messages."
      ],
      "ma": [
        0,
        2
      ],
      "e": "Long polling (WaitTimeSeconds greater than zero) cuts down empty responses and the number of ReceiveMessage requests, lowering SQS cost. Retrieving up to 10 messages per request with batching further reduces request count. Short polling (B) generates many empty responses, ElastiCache (D) cannot cache queue messages, and a FIFO queue (E) costs more and is not needed for cost efficiency. Community vote: AC (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 526
    },
    {
      "d": 0,
      "q": "A developer is writing an application in AWS Lambda. To simplify testing and deployments, the developer needs the database connection string to be easily changed without modifying the Lambda code.\nHow can this requirement be met?",
      "o": [
        "Store the connection string as a secret in AWS Secrets Manager.",
        "Store the connection string in an IAM user account.",
        "Store the connection string in AWS KMS.",
        "Store the connection string as a Lambda layer."
      ],
      "ma": [
        0
      ],
      "e": "Storing the connection string as a secret in AWS Secrets Manager lets the function retrieve it at runtime, so it can be changed per environment or rotated without modifying the Lambda code. An IAM user (B) is not a configuration store, KMS (C) manages encryption keys and not arbitrary strings, and a Lambda layer (D) is part of the deployed artifact and would require redeployment to change. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 527
    },
    {
      "d": 0,
      "q": "A developer is building an ecommerce application that uses multiple AWS Lambda functions. Each function performs a specific step in a customer order workflow, such as order processing and inventory management.\nThe developer must ensure that the Lambda functions run in a specific order.\nWhich solution will meet this requirement with the LEAST operational overhead?",
      "o": [
        "Configure an Amazon Simple Queue Service (Amazon SQS) queue to contain messages about each step a function must perform. Configure the Lambda functions to run sequentially based on the order of messages in the SQS queue.",
        "Configure an Amazon Simple Notification Service (Amazon SNS) topic to contain notifications about each step a function must perform. Subscribe the Lambda functions to the SNS topic. Use subscription filters based on the step each function must perform.",
        "Configure an AWS Step Functions state machine to invoke the Lambda functions in a specific order.",
        "Configure Amazon EventBridge Scheduler schedules to invoke the Lambda functions in a specific order."
      ],
      "ma": [
        2
      ],
      "e": "AWS Step Functions state machines define a workflow that invokes Lambda functions in a specified order, with built-in retries and error handling, and need no custom infrastructure. SQS ordering (A) is unreliable on standard queues and still needs orchestration code, SNS with filters (B) does not guarantee ordering between functions, and EventBridge Scheduler (D) runs on time schedules and cannot enforce step dependencies. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 528
    },
    {
      "d": 0,
      "q": "A developer is building an image-processing application that includes an AWS Lambda function. The Lambda function moves images from one AWS service to another AWS service for image processing. For images that are larger than 2 MB, the Lambda function returns the following error: \u201cTask timed out after 3.01 seconds.\u201d The developer needs to resolve the error without modifying the Lambda function code.\nWhich solution will meet these requirements?",
      "o": [
        "Increase the Lambda function\u2019s timeout value.",
        "Configure the Lambda function to not move images that are larger than 2 MB.",
        "Request a concurrency quota increase for the Lambda function.",
        "Configure provisioned concurrency for the Lambda function."
      ],
      "ma": [
        0
      ],
      "e": "The message \"Task timed out after 3.01 seconds\" means the function reached its configured timeout, and 3 seconds is the default. Raising the timeout setting (up to 900 seconds) lets larger images finish without any code change. Skipping larger images (B) would need a code change and drops work, and concurrency quotas or provisioned concurrency (C, D) address scaling and cold starts rather than execution time. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 529
    },
    {
      "d": 0,
      "q": "A developer has an application container, an AWS Lambda function, and an Amazon Simple Queue Service (Amazon SQS) queue. The Lambda function uses the SQS queue as an event source. The Lambda function makes a call to a third-party machine learning API when the function is invoked. The response from the third-party API can take up to 60 seconds to return.\nThe Lambda function's timeout value is currently 65 seconds. The developer has noticed that the Lambda function sometimes processes duplicate messages from the SQS queue.\nWhat should the developer do to ensure that the Lambda function does not process duplicate messages?",
      "o": [
        "Configure the Lambda function with a larger amount of memory.",
        "Configure an increase in the Lambda function\u2019s timeout value.",
        "Configure the SQS queue\u2019s delivery delay value to be greater than the maximum time it takes to call the third-party API.",
        "Configure the SQS queue\u2019s visibility timeout value to be greater than the maximum time it takes to call the third-party API."
      ],
      "ma": [
        3
      ],
      "e": "When a Lambda function polls an SQS queue, the message becomes invisible for the visibility timeout; if processing takes longer than that, the message reappears and is processed again. Setting the queue visibility timeout greater than the maximum time of the third-party call (and AWS recommends at least six times the function timeout) prevents the duplicate deliveries. Increasing memory or function timeout (A, B) does not change the visibility timeout, and delivery delay (C) only postpones when new messages first become visible. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 530
    },
    {
      "d": 0,
      "q": "A company has an application that runs on Amazon EC2 instances. The application needs to use dynamic feature flags that will be shared with other applications. The application must poll on an interval for new feature flag values. The values must be cached when they are retrieved. Which solution will meet these requirements in the MOST operationally efficient way?",
      "o": [
        "Store the feature flag values in AWS Secrets Manager. Configure an Amazon ElastiCache node to cache the values by using a lazy loading strategy in the application. Update the application to poll for the values on an interval from ElastiCache.",
        "Store the feature flag values in an Amazon DynamoDB table. Configure DynamoDB Accelerator (DAX) to cache the values by using a lazy loading strategy in the application. Update the application to poll for the values on an interval from DynamoDB.",
        "Store the feature flag values in AWS AppConfig. Configure AWS AppConfig Agent on the EC2 instances to poll for the values on an interval. Update the application to retrieve the values from the AppConfig Agent localhost endpoint.",
        "Store the feature flag values in AWS Systems Manager Parameter Store. Configure the application to poll on an interval. Configure the application to use the AWS SDK to retrieve the values from Parameter Store and to store the values in memory."
      ],
      "ma": [
        2
      ],
      "e": "AWS AppConfig is designed for feature flags that are shared among applications, and the AppConfig Agent on the EC2 instances polls for updates on an interval, caches the configuration locally and serves it from a localhost endpoint. This requires almost no custom code. Secrets Manager with ElastiCache (A) and DynamoDB with DAX (B) require building and operating caching layers, and Parameter Store with the SDK (D) needs custom polling and caching code and is not feature-flag aware. Community vote: C (67%), B (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 531
    },
    {
      "d": 0,
      "q": "A team deploys an AWS CloudFormation template to update a stack that already included an Amazon DynamoDB table. However, before the deployment of the update, the team changed the name of the DynamoDB table on the template by mistake. The DeletionPolicy attribute for all resources has the default value.\nWhat will be the result of this mistake?",
      "o": [
        "CloudFormation will create a new table and will delete the existing table.",
        "CloudFormation will create a new table and will keep the existing table.",
        "CloudFormation will overwrite the existing table and will rename the existing table.",
        "CloudFormation will keep the existing table and will not create a new table."
      ],
      "ma": [
        0
      ],
      "e": "A DynamoDB table name is an immutable property, so changing the TableName in the template requires replacement. CloudFormation creates the new table first and then deletes the old one during update cleanup, because DeletionPolicy defaults to Delete and the table is no longer part of the stack. It does not keep the old table (B, D) or rename or overwrite it (C). Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 532
    },
    {
      "d": 0,
      "q": "A developer is deploying an application on an Amazon Elastic Container Service (Amazon ECS) cluster that uses AWS Fargate. The developer is using a Docker container with an Ubuntu image.\nThe developer needs to implement a solution to store application data that is available from multiple ECS tasks. The application data must remain accessible after the container is terminated.\nWhich solution will meet these requirements?",
      "o": [
        "Attach an Amazon FSx for Windows File Server volume to the container definition.",
        "Specify the DockerVolumeConfiguration parameter in the ECS task definition to attach a Docker volume.",
        "Create an Amazon Elastic File System (Amazon EFS) file system. Specify the mountPoints attribute and the efsVolumeConfiguration attribute in the ECS task definition.",
        "Create an Amazon Elastic Block Store (Amazon EBS) volume. Specify the mount point configuration in the ECS task definition."
      ],
      "ma": [
        2
      ],
      "e": "Fargate tasks can mount Amazon EFS file systems, configured with the efsVolumeConfiguration in the task volume and a mountPoints entry in the container definition. The data is shared among many tasks and persists after containers stop. FSx for Windows File Server (A) is not supported for Linux (Ubuntu) containers on Fargate, Docker volumes (B) are not supported on Fargate, and an EBS volume (D) attaches to a single task and is not shared among tasks. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 533
    },
    {
      "d": 0,
      "q": "A developer is creating an AWS Lambda function that needs network access to private resources in a VPC.\nWhich solution will provide this access with the LEAST operational overhead?",
      "o": [
        "Attach the Lambda function to the VPC through private subnets. Create a security group that allows network access to the private resources. Associate the security group with the Lambda function.",
        "Configure the Lambda function to route traffic through a VPN connection. Create a security group that allows network access to the private resources. Associate the security group with the Lambda function.",
        "Configure a VPC endpoint connection for the Lambda function. Set up the VPC endpoint to route traffic through a NAT gateway.",
        "Configure an AWS PrivateLink endpoint for the private resources. Configure the Lambda function to reference the PrivateLink endpoint."
      ],
      "ma": [
        0
      ],
      "e": "Configuring the Lambda function with VPC private subnets and a security group creates the network interfaces it needs to reach private resources, using only built-in configuration. A VPN (B) is not something you attach to a Lambda function, a VPC endpoint routed through a NAT gateway (C) does not give the function VPC access, and PrivateLink for the resources (D) adds extra infrastructure that is not needed. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 534
    },
    {
      "d": 0,
      "q": "A developer needs to automate deployments for a serverless, event-based workload. The developer needs to create standardized templates to define the infrastructure and to test the functionality of the workload locally before deployment The developer already uses a pipeline in AWS CodePipeline. The developer needs to incorporate any other infrastructure changes into the existing pipeline.\nWhich solution will meet these requirements?",
      "o": [
        "Create an AWS Serverless Application Model (AWS SAM) template. Configure the pipeline stages in CodePipeline to run the necessary AWS SAM CLI commands to deploy the serverless workload.",
        "Create an AWS Step Functions workflow template based on the infrastructure by using the Amazon States Language. Start the Step Functions state machine from the existing pipeline.",
        "Create an AWS CloudFormation template. Use the existing pipeline workflow to build a pipeline for AWS CloudFormation stacks.",
        "Create an AWS Serverless Application Model (AWS SAM) template. Use an automated script to deploy the serverless workload by using the AWS SAM CLI deploy command."
      ],
      "ma": [
        0
      ],
      "e": "AWS SAM provides standardized templates for serverless infrastructure and the SAM CLI (sam local invoke, sam local start-api) for testing functions locally before deployment. The existing CodePipeline stages can run SAM CLI build and deploy commands to incorporate infrastructure changes. Step Functions (B) is an orchestration service and not an infrastructure template, plain CloudFormation (C) lacks local testing, and a separate deploy script (D) bypasses the existing pipeline. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 535
    },
    {
      "d": 0,
      "q": "A developer is creating a stock trading application. The developer needs a solution to send text messages to application users to confirmation when a trade has been completed.\nThe solution must deliver messages in the order a user makes stock trades. The solution must not send duplicate messages.\nWhich solution will meet these requirements?",
      "o": [
        "Configure the application to publish messages to an Amazon Data Firehose delivery stream. Configure the delivery stream to have a destination of each user\u2019s mobile phone number that is passed in the trade confirmation message.",
        "Create an Amazon Simple Queue Service (Amazon SQS) FIFO queue. Use the SendMessageIn API call to send the trade confirmation messages to the queue. Use the SendMessageOut API to send the messages to users by using the information provided in the trade confirmation message.",
        "Configure a pipe in Amazon EventBridge Pipes. Connect the application to the pipe as a source. Configure the pipe to use each user\u2019s mobile phone number as a target. Configure the pipe to send incoming events to the users.",
        "Create an Amazon Simple Notification Service (SNS) FIFO topic. Configure the application to use the AWS SDK to publish notifications to the SNS topic to send SMS messages to the users."
      ],
      "ma": [
        3
      ],
      "e": "An SNS FIFO topic preserves message ordering and provides deduplication, and SNS can send SMS text messages directly to phone numbers. Data Firehose (A) cannot deliver to phone numbers, and an SQS FIFO queue (B) with its invented SendMessageIn and SendMessageOut calls cannot send text messages, since SQS cannot deliver SMS. EventBridge Pipes (C) cannot target a phone number directly and provide no ordering or deduplication guarantee for SMS. Community vote: D (60%), B (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 536
    },
    {
      "d": 0,
      "q": "A developer is deploying a new Node.js AWS Lambda function that is not connected to a VPC. The Lambda function needs to connect to and query an Amazon Aurora database that is not publicly accessible. The developer is expecting unpredictable surges in database traffic. What should the developer do to give the Lambda function access to the database?",
      "o": [
        "Configure the Lambda function to use an Amazon RDS proxy.",
        "Configure a NAT gateway. Attach the NAT gateway to the Lambda function.",
        "Enable public access on the Aurora database. Configure a security group on the database to allow outbound access for the database engine\u2019s port.",
        "Enable VPC access for the Lambda function. Attach the Lambda function to a new security group that does not have rules."
      ],
      "ma": [
        0
      ],
      "e": "Because the Lambda function can see connection surges, RDS Proxy pools and shares database connections so the Aurora database is not exhausted by unpredictable spikes in concurrent invocations. A proxy is the option intended to let the function handle bursts of connections. Making the database public (C) is insecure and the NAT gateway (B) cannot be attached to a function. A VPC-attached function with an empty security group (D) can reach nothing useful and does nothing for connection spikes. Community vote: A (60%), D (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 537
    },
    {
      "d": 0,
      "q": "A company generates SSL certificates from a third-party provider. The company imports the certificates into AWS Certificate Manager (ACM) to use with public web applications.\nA developer must implement a solution to notify the company\u2019s security team 90 days before an imported certificate expires. The company already has configured an Amazon Simple Queue Service (Amazon SQS) queue. The company also has configured an Amazon Simple Notification Service (Amazon SNS) topic that has the security team\u2019s email address as a subscriber.\nWhich solution will provide the security team with the required notification about certificates?",
      "o": [
        "Create an Amazon EventBridge rule that specifies the ACM Certificate Approaching Expiration event type. Set the SNS topic as the EventBridge rule\u2019s target.",
        "Create an AWS Lambda function to search for all certificates that are expiring within 90 days. Program the Lambda function to send each identified certificate\u2019s Amazon Resource Name (ARN) in a message to the SQS queue.",
        "Create an AWS Step Functions workflow that is invoked by each certificate\u2019s expiration notification from AWS CloudTrail. Create an AWS Lambda function to send each certificate's Amazon Resource Name (ARN) in a message to the SQS queue.",
        "Configure AWS Config with the acm-certificate-expiration-check managed rule to run every 24 hours. Create an Amazon EventBridge rule that includes an event pattern that specifies the Config Rules Compliance Change detail type and the configured rule. Set the SNS topic as the EventBridge rule\u2019s target."
      ],
      "ma": [
        3
      ],
      "e": "ACM's own expiration events for imported certificates start at 45 days by default and the lead time cannot be set to 90 days. The AWS Config managed rule acm-certificate-expiration-check lets you set daysToExpiration to 90, runs on a schedule, and emits a Config Rules Compliance Change event that an EventBridge rule can send to the SNS topic. The ACM approaching-expiration event (A) cannot be configured to 90 days, and CloudTrail does not record certificate expiration notifications (C). A Lambda function that writes to SQS (B) notifies no one and the security team is subscribed only to the SNS topic. Community vote: A (60%), D (40%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 538
    },
    {
      "d": 0,
      "q": "A company uses two AWS accounts: production and development. The company stores data in an Amazon S3 bucket that is in the production account. The data is encrypted with an AWS Key Management Service (AWS KMS) customer managed key. The company plans to copy the data to another S3 bucket that is in the development account.\nA developer needs to use a KMS key to encrypt the data in the S3 bucket that is in the development account. The KMS key in the development account must be accessible from the production account, Which solution will meet these requirements?",
      "o": [
        "Replicate the customer managed KMS key from the production account to the development account. Specify the production account in the key policy.",
        "Create a new customer managed KMS key in the development account. Specify the production account in the key policy.",
        "Create a new AWS managed KMS key for Amazon S3 in the development account. Specify the production account in the key policy.",
        "Replicate the default AWS managed KMS key for Amazon S3 from the production account to the development account. Specify the production account in the key policy."
      ],
      "ma": [
        1
      ],
      "e": "S3 encryption in the development account needs a key that account controls, and a customer managed KMS key can have a key policy that grants the production account access. A new customer managed key in the development account with the production account in its key policy meets the requirement. KMS keys cannot be copied between accounts (A, D), and AWS managed keys (C) have key policies that you cannot edit, so you cannot grant cross-account access to them. Community vote: B (75%), C (25%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 539
    },
    {
      "d": 0,
      "q": "A developer is using AWS CodeDeploy to launch an application onto Amazon EC2 instances. The application deployment fails during testing. The developer notices an IAM_ROLE_PERMISSIONS error code in Amazon CloudWatch logs.\nWhat should the developer do to resolve the error?",
      "o": [
        "Ensure that the deployment group is using the correct role name for the CodeDeploy service role.",
        "Attach the AWSCodeDeployRoleECS policy to the CodeDeploy service role.",
        "Attach the AWSCodeDeployRole policy to the CodeDeploy service role.",
        "Ensure the CodeDeploy agent is installed and running on all instances in the deployment group."
      ],
      "ma": [
        2
      ],
      "e": "The IAM_ROLE_PERMISSIONS error means the CodeDeploy service role lacks the permissions CodeDeploy needs, such as describing EC2 instances and Auto Scaling groups. Attaching the AWSCodeDeployRole managed policy to the service role grants those permissions. AWSCodeDeployRoleECS (B) is for ECS deployments, and an agent that is not installed or running (D) produces different errors. The role name in the deployment group (A) matters only if it points to a role without the policy. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 540
    },
    {
      "d": 0,
      "q": "A company wants to send notifications to customers to advertise a sale on the company\u2019s products. The company needs to use Amazon Simple Notification Service (Amazon SNS) FIFO topics.\nThe company needs to examine the rate at which the topics send notifications and the latency with which the topics send notifications. Which solution will meet these requirements with the MOST operational efficiency?",
      "o": [
        "Use AWS X-Ray. Enable active tracing for Amazon SNS.",
        "Use the Amazon CloudWatch NumberOfNotificationsFailed metric.",
        "Use AWS CloudTrail to log all Amazon SNS API calls.",
        "Use Amazon GuardDuty. Enable runtime monitoring."
      ],
      "ma": [
        0
      ],
      "e": "SNS supports active tracing with AWS X-Ray, which provides trace maps and latency data for message publishing and delivery, and it works with FIFO topics. That gives the message rate and latency with only a configuration change. The NumberOfNotificationsFailed metric (B) shows only failures, CloudTrail (C) logs API calls and not latency, and GuardDuty runtime monitoring (D) is a security threat detection feature. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 541
    },
    {
      "d": 0,
      "q": "A cloud-based video surveillance company is developing an application that analyzes video files. After the application analyzes the files, the company can discard the files.\nThe company stores the files in an Amazon S3 bucket. The files are 1 GB in size on average. No file is larger than 2 GB. An AWS Lambda function will run one time for each video file that is processed. The processing is very I/O intensive, and the application must read each file multiple times. Which solution will meet these requirements in the MOST performance-optimized way?",
      "o": [
        "Attach an Amazon Elastic Block Store (Amazon EBS) volume that is larger than 1 GB to the Lambda function. Copy the files from the S3 bucket to the EBS volume.",
        "Attach an Elastic Network Adapter (ENA) to the Lambda function. Use the ENA to read the video files from the S3 bucket.",
        "Increase the ephemeral storage size to 2 GB. Copy the files from the S3 bucket to the /tmp directory of the Lambda function.",
        "Configure the Lambda function code to read the video files directly from the S3 bucket."
      ],
      "ma": [
        2
      ],
      "e": "Lambda ephemeral storage (/tmp) can be configured up to 10 GB and is local, fast storage, so copying the up-to-2 GB file once and reading it repeatedly from /tmp is the most performant for I/O-heavy processing. Lambda functions cannot attach EBS volumes (A) or an ENA (B), and reading directly from S3 repeatedly (D) adds network latency for each read. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 542
    },
    {
      "d": 0,
      "q": "A company has an AWS Step Functions state machine named myStateMachine. The company configured a service role for Step Functions. The developer must ensure that only the myStateMachine state machine can assume the service role.\nWhich statement should the developer add to the trust policy to meet this requirement?",
      "o": [
        "",
        "",
        "",
        ""
      ],
      "ma": [
        0
      ],
      "e": "Adding an aws:SourceArn condition with ArnLike set to the exact state machine ARN, including the account ID 111111111111, restricts the trust policy so that only myStateMachine can assume the role. Using a wildcard in the account position would allow a state machine with the same name in any account, a condition on aws:SourceAccount alone allows every state machine in the account, and StringNotEquals would exclude myStateMachine instead of allowing it. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [
          {
            "path": "assets/q543-A1.png",
            "alt": "Question 543 option A"
          }
        ],
        [
          {
            "path": "assets/q543-B1.png",
            "alt": "Question 543 option B"
          }
        ],
        [
          {
            "path": "assets/q543-C1.png",
            "alt": "Question 543 option C"
          }
        ],
        [
          {
            "path": "assets/q543-D1.png",
            "alt": "Question 543 option D"
          }
        ]
      ],
      "sourceNumber": 543
    },
    {
      "d": 0,
      "q": "A company stores customer credit reports in an Amazon S3 bucket. An analytics service uses standard Amazon S3 GET requests to access the reports.\nA developer must implement a solution to redact personally identifiable information (PII) from the reports before the reports reach the analytics service.\nWhich solution will meet this requirement with the MOST operational efficiency?",
      "o": [
        "Load the S3 objects into Amazon Redshift by using a COPY command. Implement dynamic data masking. Refactor the analytics service to read from Amazon Redshift.",
        "Set up an S3 Object Lambda function. Attach the function to an S3 Object Lambda Access Point. Program the function to call a PII redaction API.",
        "Use AWS Key Management Service (AWS KMS) to implement encryption in the S3 bucket. Re-upload all the existing S3 objects. Give the kms:Decrypt permission to the analytics service.",
        "Create an Amazon Simple Notification Service (Amazon SNS) topic. Implement message data protection. Refactor the analytics service to publish data access requests to the SNS topic."
      ],
      "ma": [
        1
      ],
      "e": "S3 Object Lambda attaches a Lambda function to an Object Lambda Access Point and transforms the object on the fly as it is retrieved with standard GET requests, so the function can call a PII redaction API before the analytics service receives the data. Loading data into Redshift (A) and publishing through SNS data protection (D) require refactoring the analytics service, and KMS encryption (C) controls access to data and does not redact PII. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 544
    },
    {
      "d": 0,
      "q": "A company is using the AWS Serverless Application Model (AWS SAM) to develop a social media application. A developer needs a quick way to test AWS Lambda functions locally by using test event payloads. The developer needs the structure of these test event payloads to match the actual events that AWS services create.\nWhich solution will meet these requirements with the LEAST development effort?",
      "o": [
        "Create shareable test Lambda events. Use these test Lambda events for local testing.",
        "Store manually created test event payloads locally. Use the sam local invoke command with the file path to the payloads.",
        "Store manually created test event payloads in an Amazon S3 bucket. Use the sam local invoke command with the S3 path to the payloads.",
        "Use the sam local generate-event command to create test payloads for local testing."
      ],
      "ma": [
        3
      ],
      "e": "The sam local generate-event command produces sample event payloads that match the real structure of events from services such as S3, SNS and API Gateway, and these can be piped into sam local invoke. This requires almost no effort. Hand-built payloads stored locally (B) or in S3 (C) must be written and kept accurate manually, and shareable test events (A) are a Lambda console feature and not part of local testing with SAM. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 545
    },
    {
      "d": 0,
      "q": "A developer is building the authentication mechanism for a new mobile app. Users need to be able to sign up, sign in, and access secured backend AWS resources.\nWhich solution will meet these requirements?",
      "o": [
        "Use AWS Identity and Access Management Access Analyzer to generate IAM policies. Create an IAM role. Attach the policies to the role. Integrate the IAM role with an identity provider that the mobile app uses.",
        "Create an IAM policy that grants access to the backend resources. Create an IAM role. Attach the policy to the role. Create an Amazon API Gateway endpoint. Attach the role to the endpoint. Integrate the endpoint with the mobile app.",
        "Create an Amazon Cognito identity pool. Configure permissions by choosing a default IAM role for authenticated users or guest users in the identity pool. Associate the identity pool with an identity provider. Integrate the identity pool with the mobile app.",
        "Create an Amazon Cognito user pool. Configure the security requirements by choosing a password policy, multi-factor authentication (MFA) requirements, and user account recovery options. Create an app client. Integrate the app client with the mobile app."
      ],
      "ma": [
        3
      ],
      "e": "An Amazon Cognito user pool provides the sign-up and sign-in directory with a hosted or custom UI, password policy, MFA and account recovery, and the app client lets the mobile app authenticate users and obtain tokens for securing backend resources. The IAM-based options (A, B) have no user registration or sign-in, and an identity pool alone (C) exchanges tokens for AWS credentials but is not a user directory for sign-up and sign-in. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 546
    },
    {
      "d": 0,
      "q": "A developer is designing an event-driven architecture. An AWS Lambda function that processes data needs to push processed data to a subset of four consumer Lambda functions. The data must be routed based on the value of one field in the data.\nWhich solution will meet these requirements with the LEAST operational overhead?",
      "o": [
        "Create an Amazon Simple Queue Service (Amazon SQS) queue and event source mapping for each consumer Lambda function. Add message routing logic to the data-processing Lambda function.",
        "Create an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe the four consumer Lambda functions to the topic. Add message filtering logic to each consumer Lambda function. Subscribe the data-processing Lambda function to the SNS topic.",
        "Create a separate Amazon Simple Notification Service (Amazon SNS) topic and subscription for each consumer Lambda function. Add message routing logic to the data-processing Lambda function to publish to the appropriate topic.",
        "Create a single Amazon Simple Notification Service (Amazon SNS) topic. Subscribe the four consumer Lambda functions to the topic. Add SNS subscription filter policies to each subscription. Configure the data-processing Lambda function to publish to the topic."
      ],
      "ma": [
        3
      ],
      "e": "A single SNS topic with each consumer Lambda function subscribed and a filter policy on the subscription lets SNS route messages by an attribute or body field, so the producer only publishes once and filtering needs no code. Routing logic in the producer (A, C) adds code and, for C, one topic per consumer. Filtering logic inside each consumer (B) invokes all four functions for every message, which wastes invocations. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 547
    },
    {
      "d": 0,
      "q": "A developer is creating a new application that will give users the ability to upload documents to Amazon S3. The contents of the documents must not be accessible to any third party.\nWhich type of encryption will meet this requirement?",
      "o": [
        "Client-side encryption by using the S3 Encryption Client with a Raw RSA wrapping key that is stored on the user\u2019s device",
        "Server-side encryption with S3 managed keys (SSE-S3)",
        "Server-side encryption with AWS KMS keys (SSE-KMS)",
        "Dual-layer server-side encryption with AWS KMS keys (DSSE-KMS)"
      ],
      "ma": [
        2
      ],
      "e": "SSE-KMS encrypts each object at rest with a KMS key whose key policy and grants you control, so only principals you authorize to use the key can read the contents, and every use is logged in CloudTrail. SSE-S3 (B) uses keys that S3 manages entirely, so there is no key-level access control or audit. DSSE-KMS (D) applies two layers of encryption for compliance needs that are not required here, and client-side encryption with a raw RSA key kept on the user's device (A) places key management on every user and risks losing the data. Community vote: C (57%), A (43%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 548
    },
    {
      "d": 0,
      "q": "A developer is building an application that consists of many AWS Lambda functions. The Lambda functions connect to a single Amazon RDS database.\nThe developer needs to implement a solution to store the database credentials securely. When the credentials are updated, the Lambda functions must be able to use the new credentials without requiring a code update or a configuration update.\nWhich solution will meet these requirements?",
      "o": [
        "Store the credentials as a secret in AWS Secrets Manager. Access the secret at runtime from within the Lambda functions.",
        "Store the credentials as a secret in AWS Secrets Manager. Access the credentials in environment variables by using the containerDefinitions and valueFrom elements in reference to the secret value.",
        "Store the credentials as a SecureString parameter in AWS Systems Manager Parameter Store. Add a trigger to pass the credentials to the Lambda functions when the Lambda functions run.",
        "Store the credentials as a SecureString parameter in AWS Systems Manager Parameter Store. Add a reference to the parameter in an environment variable in the Lambda functions."
      ],
      "ma": [
        0
      ],
      "e": "Storing the credentials in Secrets Manager and fetching the secret at runtime from the Lambda function means a rotated or updated secret is picked up on the next fetch, with no code or configuration update. Environment variable references to a secret (B, D) are resolved at deploy or cold-start time and need a configuration update to refresh, containerDefinitions and valueFrom apply to ECS and not Lambda, and a trigger cannot inject Parameter Store values into a function (C). Community vote: A (67%), D (33%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 549
    },
    {
      "d": 0,
      "q": "A developer is building an application that stores sensitive user data. The application includes an Amazon CloudFront distribution and multiple AWS Lambda functions that handle user requests.\nThe user requests contain over 20 data fields. Each application transaction contains sensitive data that must be encrypted. Only specific parts of the application need to have the ability to decrypt the data.\nWhich solution will meet these requirements?",
      "o": [
        "Associate the CloudFront distribution with a Lambda@Edge function. Configure the function to perform field-level asymmetric encryption by using a user-defined RSA public key that is stored in AWS Key Management Service (AWS KMS).",
        "Integrate AWS WAF with CloudFront to protect the sensitive data. Use a Lambda function and self-managed keys to perform the encryption and decryption processes.",
        "Configure the CloudFront distribution to use WebSockets by forwarding all viewer request headers to the origin. Create an asymmetric AWS KMS key. Configure the CloudFront distribution to use field-level encryption. Use the AWS KMS key.",
        "Configure the cache behavior in the CloudFront distribution to require HTTPS for communication between viewers and CloudFront. Configure GoudFront to require users to access the files by using either signed URLs or signed cookies."
      ],
      "ma": [
        0
      ],
      "e": "A Lambda@Edge function on the CloudFront distribution can encrypt individual fields at the edge with an RSA public key, so that only backend components that hold the private key can decrypt them, which meets the requirement for many fields and selective decryption. AWS WAF (B) filters requests and does not encrypt, WebSockets with forwarded headers (C) does not apply, and HTTPS with signed URLs or cookies (D) secures transport and access to content but does not encrypt the sensitive fields. Community vote: A (60%), C (20%), D (20%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 550
    },
    {
      "d": 0,
      "q": "An application includes an Amazon DynamoDB table that is named orders. The table has a primary partition key of id and a global secondary index (GSI) that is named an accountIndex. The GSI has a partition key of accountId and a sort key of orderDateTime.\nA developer needs to create an AWS Lambda function to retrieve the orders that have an accountId of 100.\nWhich solution will meet this requirement by using the LEAST read capacity?",
      "o": [
        "Define a DynamoDB API request for the GetItem action with the following parameters:",
        "Define a DynamoDB API request for the BatchGetItem action with the following parameters:",
        "Define a DynamoDB API request for the Scan action with the following parameters:",
        "Define a DynamoDB API request for the Query action with the following parameters:"
      ],
      "ma": [
        3
      ],
      "e": "A Query against the accountIndex GSI with a KeyConditionExpression on accountId reads only the items for that partition key, consuming the least read capacity. Scan with a FilterExpression (C) reads the whole index and filters afterward, so it consumes capacity for every item. GetItem and BatchGetItem (A, B) require the table's primary key (id) and do not accept a GSI key. Community vote: D (100%).",
      "images": [],
      "optionImages": [
        [
          {
            "path": "assets/q551-A1.png",
            "alt": "Question 551 option A"
          }
        ],
        [
          {
            "path": "assets/q551-B1.png",
            "alt": "Question 551 option B"
          }
        ],
        [
          {
            "path": "assets/q551-C1.png",
            "alt": "Question 551 option C"
          }
        ],
        [
          {
            "path": "assets/q551-D1.png",
            "alt": "Question 551 option D"
          }
        ]
      ],
      "sourceNumber": 551
    },
    {
      "d": 0,
      "q": "A company stores data in an Amazon S3 bucket. The data is updated multiple times every day from an application that runs on a server in the company\u2019s on-premises data center.\nThe company enables S3 Versioning on the S3 bucket. After some time, the company observes multiple versions of the same objects in the S3 bucket.\nThe company needs the S3 bucket to keep the current version of each object and the version immediately previous to the current version. Which solution will meet these requirements?",
      "o": [
        "Configure an S3 bucket policy to retain one newer noncurrent version of the objects.",
        "Configure an S3 Lifecycle rule to retain one newer noncurrent version of the objects.",
        "Enable S3 Object Lock. Configure an S3 Object Lock policy to retain one newer noncurrent version of the objects.",
        "Suspend S3 Versioning. Modify the application code to check the number of object versions before updating the objects."
      ],
      "ma": [
        1
      ],
      "e": "An S3 Lifecycle rule for noncurrent versions can specify the number of newer noncurrent versions to retain (NewerNoncurrentVersions) together with an expiration, so only the current version plus one previous version are kept and older ones are removed. A bucket policy (A) cannot manage version retention, S3 Object Lock (C) prevents deletion rather than limiting versions, and suspending versioning (D) loses the previous version and requires code changes. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 552
    },
    {
      "d": 0,
      "q": "A company is creating a new feature for existing software. Before the company fully releases a new version of the software, the company wants to test the feature.\nThe company needs to gather feedback about the feature from a small group of users while the current software version remains deployed. If the testing validates the feature, the company needs to deploy the new software version to all other users at the same time.\nWhich deployment strategy will meet these requirements?",
      "o": [
        "All-at-once deployment",
        "Canary deployment",
        "In-place deployment",
        "Linear deployment"
      ],
      "ma": [
        1
      ],
      "e": "A canary deployment sends a small percentage of traffic or users to the new version first, keeping the current version for everyone else, and after validation shifts all the remaining traffic at once. Linear deployment (D) shifts traffic in equal increments over time, all-at-once (A) releases to everyone immediately, and an in-place deployment (C) replaces the application on existing instances without a small test group. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 553
    },
    {
      "d": 0,
      "q": "A developer has an application that runs in AWS Account A. The application must retrieve an AWS Secrets Manager secret that is encrypted by an AWS Key Management Service (AWS KMS) key from AWS Account B. The application\u2019s role has permissions to access the secret in Account B. The developer must add a statement to the KMS key\u2019s key policy to allow the role in Account A to use the KMS key in Account B. The permissions must grant least privilege access to the role.\nWhich permissions will meet these requirements?",
      "o": [
        "kms:Decrypt and kms:DescribeKey",
        "secretsmanager:DescribeSecret and secretsmanager:GetSecretValue",
        "kms:*",
        "secretsmanager:*"
      ],
      "ma": [
        0
      ],
      "e": "When a role uses a Secrets Manager secret encrypted with a KMS key in another account, the key policy must allow the role to call kms:Decrypt, which Secrets Manager uses to decrypt the secret value, and kms:DescribeKey. That is the least privilege set for the key policy. The secretsmanager permissions (B, D) belong on the secret's resource policy or the role's identity policy and not the KMS key policy, and kms:* (C) is far broader than needed. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 554
    },
    {
      "d": 0,
      "q": "A developer created several AWS Lambda functions that write data to a single Amazon S3 bucket. The developer configured all the Lambda functions to send logs and metrics to Amazon CloudWatch.\nThe developer receives reports that one of the Lambda functions writes data to the bucket very slowly. The developer needs to measure the latency between the problematic Lambda function and the S3 bucket.\nWhich solution will meet this requirement?",
      "o": [
        "Enable AWS X-Ray on the Lambda function. In the generated trace map, select the line between Lambda and Amazon S3.",
        "Query the Lambda function\u2019s log file in Amazon CloudWatch Logs Insights. Return the average of the auto-discovered @duration field.",
        "Enable CloudWatch Lambda Insights on the function. View the latency graph that CloudWatch Lambda Insights provides.",
        "Enable AWS X-Ray on the Lambda function. Select Amazon S3 in the latency graph to view the latency histogram."
      ],
      "ma": [
        0
      ],
      "e": "With X-Ray active tracing on the Lambda function, the service map shows edges between the function and downstream services, and selecting the edge between Lambda and Amazon S3 shows latency and response information for those calls specifically. Logs Insights duration (B) and Lambda Insights latency (C) measure the whole function and not the S3 call, and selecting the S3 node (D) shows the latency of S3 across everything rather than the edge from this function. Community vote: A (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 555
    },
    {
      "d": 0,
      "q": "A company\u2019s developer needs to activate Amazon CloudWatch Logs Insights for an application\u2019s AWS Lambda functions. The company uses an AWS Serverless Application Model (AWS SAM) template to deploy the application. The SAM template includes a logical resource that is named CloudWatchLogGroup.\nHow should the developer modify the SAM template to activate CloudWatch Logs Insights for the Lambda functions?",
      "o": [
        "Add an output named CloudWatchinsightRule that contains a value of the Amazon Resource Name (ARN) for the CloudWatchLogGroup resource.",
        "Add a parameter named CloudWatchLogGroupNamePrefix that contains a value of the application name. Reference the new parameter in the CloudWatchLogGroup resource.",
        "For each Lambda function, add the layer for the Lambda Insights extension and the CloudWatchLambdaInsightsExecutionRolePolicy AWS managed policy.",
        "For each Lambda function, set Tracing mode to Active and add the CloudWatchLambdaInsightsExecutionRolePolicy AWS managed policy."
      ],
      "ma": [
        2
      ],
      "e": "CloudWatch Lambda Insights is enabled by adding the Lambda Insights extension layer to each function and attaching the CloudWatchLambdaInsightsExecutionRolePolicy managed policy so the extension can publish its metrics and logs. Adding a stack output (A) or a log group name parameter (B) does not turn on monitoring, and setting Tracing to Active (D) enables X-Ray rather than Lambda Insights. Community vote: C (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 556
    },
    {
      "d": 0,
      "q": "A developer is designing a game that stores data in an Amazon DynamoDB table. The partition key of the table is the country of the player. After a sudden increase in the number of players in a specific country, the developer notices ProvisionedThroughputExceededException errors. What should the developer do to resolve these errors?",
      "o": [
        "Use strongly consistent table reads.",
        "Revise the primary key to use more unique identifiers.",
        "Use pagination to reduce the size of the items that the queries return.",
        "Use the Scan operation to retrieve the data."
      ],
      "ma": [
        1
      ],
      "e": "Using country as the partition key concentrates traffic on one partition when players surge in a single country, creating a hot partition and throttling that exceeds the partition's capacity. Revising the key to use more unique, high-cardinality values (for example a player ID) spreads requests evenly across partitions. Strongly consistent reads (A) use twice the read capacity, pagination (C) does not reduce consumed capacity, and Scan (D) consumes even more. Community vote: B (100%).",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 557
    }
  ]
};
