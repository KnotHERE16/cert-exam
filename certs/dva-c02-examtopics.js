window.CERTS = window.CERTS || {};
window.CERTS["dva-c02-examtopics"] = {
  "code": "DVA-C02 \u00b7 ExamTopics",
  "title": "Developer Associate \u2014 ExamTopics",
  "level": "Imported bank",
  "blurb": "Partial download: 10/557 questions. Unverified answers.",
  "notice": "Partial import: 10/557 questions. Uses ExamTopics stated answers, not independently verified. Community votes may disagree. Source topics are not official exam domains. 72% is a local practice target, not a conversion to AWS scaled scoring.",
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
      "q": "A company is implementing an application on Amazon EC2 instances. The application needs to process incoming transactions. When the application detects a transaction that is not valid, the application must send a chat message to the company's support team. To send the message, the application needs to retrieve the access token to authenticate by using the chat API.\n\nA developer needs to implement a solution to store the access token. The access token must be encrypted at rest and in transit. The access token must also be accessible from other AWS accounts.\n\nWhich solution will meet these requirements with the LEAST management overhead?",
      "o": [
        "Use an AWS Systems Manager Parameter Store SecureString parameter that uses an AWS Key Management Service (AWS KMS) AWS managed key to store the access token. Add a resource-based policy to the parameter to allow access from other accounts. Update the IAM role of the EC2 instances with permissions to access Parameter Store. Retrieve the token from Parameter Store with the decrypt flag enabled. Use the decrypted access token to send the message to the chat.",
        "Encrypt the access token by using an AWS Key Management Service (AWS KMS) customer managed key. Store the access token in an Amazon DynamoDB table. Update the IAM role of the EC2 instances with permissions to access DynamoDB and AWS KMS. Retrieve the token from DynamoDDecrypt the token by using AWS KMS on the EC2 instances. Use the decrypted access token to send the message to the chat.",
        "Use AWS Secrets Manager with an AWS Key Management Service (AWS KMS) customer managed key to store the access token. Add a resource-based policy to the secret to allow access from other accounts. Update the IAM role of the EC2 instances with permissions to access Secrets Manager. Retrieve the token from Secrets Manager. Use the decrypted access token to send the message to the chat.",
        "Encrypt the access token by using an AWS Key Management Service (AWS KMS) AWS managed key. Store the access token in an Amazon S3 bucket. Add a bucket policy to the S3 bucket to allow access from other accounts. Update the IAM role of the EC2 instances with permissions to access Amazon S3 and AWS KMS. Retrieve the token from the S3 bucket. Decrypt the token by using AWS KMS on the EC2 instances. Use the decrypted access token to send the massage to the chat."
      ],
      "ma": [
        2
      ],
      "e": "ExamTopics stated answer (original option labels): C. Not independently verified. Community-supported answer: C. No editorial explanation was provided on the source page. Source question #1.",
      "sourceUrl": "https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/#qqq1",
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
      "q": "A company is running Amazon EC2 instances in multiple AWS accounts. A developer needs to implement an application that collects all the lifecycle events of the EC2 instances. The application needs to store the lifecycle events in a single Amazon Simple Queue Service (Amazon SQS) queue in the company's main AWS account for further processing.\n\nWhich solution will meet these requirements?",
      "o": [
        "Configure Amazon EC2 to deliver the EC2 instance lifecycle events from all accounts to the Amazon EventBridge event bus of the main account. Add an EventBridge rule to the event bus of the main account that matches all EC2 instance lifecycle events. Add the SQS queue as a target of the rule.",
        "Use the resource policies of the SQS queue in the main account to give each account permissions to write to that SQS queue. Add to the Amazon EventBridge event bus of each account an EventBridge rule that matches all EC2 instance lifecycle events. Add the SQS queue in the main account as a target of the rule.",
        "Write an AWS Lambda function that scans through all EC2 instances in the company accounts to detect EC2 instance lifecycle changes. Configure the Lambda function to write a notification message to the SQS queue in the main account if the function detects an EC2 instance lifecycle change. Add an Amazon EventBridge scheduled rule that invokes the Lambda function every minute.",
        "Configure the permissions on the main account event bus to receive events from all accounts. Create an Amazon EventBridge rule in each account to send all the EC2 instance lifecycle events to the main account event bus. Add an EventBridge rule to the main account event bus that matches all EC2 instance lifecycle events. Set the SQS queue as a target for the rule."
      ],
      "ma": [
        3
      ],
      "e": "ExamTopics stated answer (original option labels): D. Not independently verified. Community-supported answer: D. No editorial explanation was provided on the source page. Source question #2.",
      "sourceUrl": "https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/#qqq2",
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
      "q": "An application is using Amazon Cognito user pools and identity pools for secure access. A developer wants to integrate the user-specific file upload and download features in the application with Amazon S3. The developer must ensure that the files are saved and retrieved in a secure manner and that users can access only their own files. The file sizes range from 3 KB to 300 MB.\n\nWhich option will meet these requirements with the HIGHEST level of security?",
      "o": [
        "Use S3 Event Notifications to validate the file upload and download requests and update the user interface (UI).",
        "Save the details of the uploaded files in a separate Amazon DynamoDB table. Filter the list of files in the user interface (UI) by comparing the current user ID with the user ID associated with the file in the table.",
        "Use Amazon API Gateway and an AWS Lambda function to upload and download files. Validate each request in the Lambda function before performing the requested operation.",
        "Use an IAM policy within the Amazon Cognito identity prefix to restrict users to use their own folders in Amazon S3."
      ],
      "ma": [
        3
      ],
      "e": "ExamTopics stated answer (original option labels): D. Not independently verified. Community-supported answer: D. No editorial explanation was provided on the source page. Source question #3.",
      "sourceUrl": "https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/#qqq3",
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
      "q": "A company is building a scalable data management solution by using AWS services to improve the speed and agility of development. The solution will ingest large volumes of data from various sources and will process this data through multiple business rules and transformations.\n\nThe solution requires business rules to run in sequence and to handle reprocessing of data if errors occur when the business rules run. The company needs the solution to be scalable and to require the least possible maintenance.\n\nWhich AWS service should the company use to manage and automate the orchestration of the data flows to meet these requirements?",
      "o": [
        "AWS Batch",
        "AWS Step Functions",
        "AWS Glue",
        "AWS Lambda"
      ],
      "ma": [
        1
      ],
      "e": "ExamTopics stated answer (original option labels): B. Not independently verified. Community-supported answer: B. No editorial explanation was provided on the source page. Source question #4.",
      "sourceUrl": "https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/#qqq4",
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
      "q": "A developer has created an AWS Lambda function that is written in Python. The Lambda function reads data from objects in Amazon S3 and writes data to an Amazon DynamoDB table. The function is successfully invoked from an S3 event notification when an object is created. However, the function fails when it attempts to write to the DynamoDB table.\n\nWhat is the MOST likely cause of this issue?",
      "o": [
        "The Lambda function's concurrency limit has been exceeded.",
        "DynamoDB table requires a global secondary index (GSI) to support writes.",
        "The Lambda function does not have IAM permissions to write to DynamoDB.",
        "The DynamoDB table is not running in the same Availability Zone as the Lambda function."
      ],
      "ma": [
        2
      ],
      "e": "ExamTopics stated answer (original option labels): C. Not independently verified. Community-supported answer: C. No editorial explanation was provided on the source page. Source question #5.",
      "sourceUrl": "https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/#qqq5",
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
      "q": "A developer is creating an AWS CloudFormation template to deploy Amazon EC2 instances across multiple AWS accounts. The developer must choose the EC2 instances from a list of approved instance types.\n\nHow can the developer incorporate the list of approved instance types in the CloudFormation template?",
      "o": [
        "Create a separate CloudFormation template for each EC2 instance type in the list.",
        "In the Resources section of the CloudFormation template, create resources for each EC2 instance type in the list.",
        "In the CloudFormation template, create a separate parameter for each EC2 instance type in the list.",
        "In the CloudFormation template, create a parameter with the list of EC2 instance types as AllowedValues."
      ],
      "ma": [
        3
      ],
      "e": "ExamTopics stated answer (original option labels): D. Not independently verified. Community-supported answer: D. No editorial explanation was provided on the source page. Source question #6.",
      "sourceUrl": "https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/#qqq6",
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
      "q": "A developer has an application that makes batch requests directly to Amazon DynamoDB by using the BatchGetItem low-level API operation. The responses frequently return values in the UnprocessedKeys element.\n\nWhich actions should the developer take to increase the resiliency of the application when the batch response includes values in UnprocessedKeys? (Choose two.)",
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
      "e": "ExamTopics stated answer (original option labels): BD. Not independently verified. Community-supported answer: BD. No editorial explanation was provided on the source page. Source question #7.",
      "sourceUrl": "https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/#qqq7",
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
      "q": "A company is running a custom application on a set of on-premises Linux servers that are accessed using Amazon API Gateway. AWS X-Ray tracing has been enabled on the API test stage.\n\nHow can a developer enable X-Ray tracing on the on-premises servers with the LEAST amount of configuration?",
      "o": [
        "Install and run the X-Ray SDK on the on-premises servers to capture and relay the data to the X-Ray service.",
        "Install and run the X-Ray daemon on the on-premises servers to capture and relay the data to the X-Ray service.",
        "Capture incoming requests on-premises and configure an AWS Lambda function to pull, process, and relay relevant data to X-Ray using the PutTraceSegments API call.",
        "Capture incoming requests on-premises and configure an AWS Lambda function to pull, process, and relay relevant data to X-Ray using the PutTelemetryRecords API call."
      ],
      "ma": [
        1
      ],
      "e": "ExamTopics stated answer (original option labels): B. Not independently verified. Community-supported answer: B. No editorial explanation was provided on the source page. Source question #8.",
      "sourceUrl": "https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/#qqq8",
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
      "q": "A company wants to share information with a third party. The third party has an HTTP API endpoint that the company can use to share the information. The company has the required API key to access the HTTP API.\n\nThe company needs a way to manage the API key by using code. The integration of the API key with the application code cannot affect application performance.\n\nWhich solution will meet these requirements MOST securely?",
      "o": [
        "Store the API credentials in AWS Secrets Manager. Retrieve the API credentials at runtime by using the AWS SDK. Use the credentials to make the API call.",
        "Store the API credentials in a local code variable. Push the code to a secure Git repository. Use the local code variable at runtime to make the API call.",
        "Store the API credentials as an object in a private Amazon S3 bucket. Restrict access to the S3 object by using IAM policies. Retrieve the API credentials at runtime by using the AWS SDK. Use the credentials to make the API call.",
        "Store the API credentials in an Amazon DynamoDB table. Restrict access to the table by using resource-based policies. Retrieve the API credentials at runtime by using the AWS SDK. Use the credentials to make the API call."
      ],
      "ma": [
        0
      ],
      "e": "ExamTopics stated answer (original option labels): A. Not independently verified. Community-supported answer: A. No editorial explanation was provided on the source page. Source question #9.",
      "sourceUrl": "https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/#qqq9",
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
      "q": "A developer is deploying a new application to Amazon Elastic Container Service (Amazon ECS). The developer needs to securely store and retrieve different types of variables. These variables include authentication information for a remote API, the URL for the API, and credentials. The authentication information and API URL must be available to all current and future deployed versions of the application across development, testing, and production environments.\n\nHow should the developer retrieve the variables with the FEWEST application changes?",
      "o": [
        "Update the application to retrieve the variables from AWS Systems Manager Parameter Store. Use unique paths in Parameter Store for each variable in each environment. Store the credentials in AWS Secrets Manager in each environment.",
        "Update the application to retrieve the variables from AWS Key Management Service (AWS KMS). Store the API URL and credentials as unique keys for each environment.",
        "Update the application to retrieve the variables from an encrypted file that is stored with the application. Store the API URL and credentials in unique files for each environment.",
        "Update the application to retrieve the variables from each of the deployed environments. Define the authentication information and API URL in the ECS task definition as unique names during the deployment process."
      ],
      "ma": [
        0
      ],
      "e": "ExamTopics stated answer (original option labels): A. Not independently verified. Community-supported answer: A. No editorial explanation was provided on the source page. Source question #10.",
      "sourceUrl": "https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/#qqq10",
      "images": [],
      "optionImages": [
        [],
        [],
        [],
        []
      ],
      "sourceNumber": 10
    }
  ]
};
