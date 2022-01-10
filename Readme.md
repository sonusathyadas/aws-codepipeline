# Enable CI/CD using Code Pipeline


## Setting up IAM user permissions and Http Git Credentials
To perform CodeCommit operations, the IAM user requires some permissions. You also need to obtain the Git credentials (username + password)  to push the code to CodeCommit.

1) Open the AWS management console and navigate to the IAM dashboard.
2) You can create a new IAM user, or use an existing user, in your Amazon Web Services account. Make sure you have an access key ID and a secret access key associated with that IAM user. 
3) In the IAM console, in the navigation pane, choose `Users`, and then choose the IAM user you want to configure for CodeCommit access.
4) On the `Permissions` tab, choose `Add Permissions`.
5) In Grant permissions, choose `Attach existing policies directly`.
6) From the list of policies, select `AWSCodeCommitPowerUser`. After you have selected the policy you want to attach, choose `Next: Review` to review the list of policies to attach to the IAM user. If the list is correct, choose `Add permissions`.
7) Now, you need to generate Git credentials for the IAM user to push the code to CodeCommit. In the IAM console, in the navigation pane, choose `Users`, and from the list of users, choose your IAM user.
8) On the user details page, choose the `Security Credentials` tab, and in `HTTPS Git credentials for AWS CodeCommit`, choose `Generate`.
    
    ![Image1](images/image1.png)

9) Copy the user name and password that IAM generated for you, either by showing, copying, and then pasting this information into a secure file on your local computer, or by choosing `Download` credentials to download this information as a .CSV file. You need this information to connect to CodeCommit.

    ![Image2](images/image2.png)
    
10) After you have saved your credentials, choose `Close`.

## Push the code to CodeCommit repository
1) Clone the sample application - `employee-api` - to your local machine by running the following command.
    ```bash
    git clone https://github.com/sonusathyadas/aws-codepipeline.git
    cd aws-codepipeline\employee-api        
    ```
2) Initialize the git for the project. Also add all files to staging and commit locally.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
3) Now, you need to push the code to AWS code commit.For that, open browser and navigate to AWS management console. Search for `CodeCommit` and navigate to CodeCommit service console.
4) Click on the `Create repository` button. 
5) Specify the repository name as `employee-api` and provide a description. Click on `Create`.
6) Your CodeCommit repository will be created and the page will show the steps to clone the repository using Https. You have the existing project and you can push that code to the new repository. For that copy the http url of the repository from `Step 3` and run the following commands in your terminal locally.
    ```bash
    git branch -M main
    git remote add origin <http-url-of-codecommit-repository>
    git push -u origin --all
    ```
7) This will prompt for the Git credentials for your repository. Enter the Git credentials you have downloaded in the previous step. After the code is successfully pushed you can refresh the CodeCommit window to see the files.

    ![Image3](images/image3.png)

## Create a CodeBuild service role
1) Open the IAM console at [https://console.aws.amazon.com/iam/](https://console.aws.amazon.com/iam/). Login to the console with root user credentials or IAM user with Administrator access.
2) In the navigation pane, choose `Policies`. Choose `Create Policy`. On the Create Policy page, choose `JSON`.
3) Enter the following JSON code and click on `Next:Tags`.
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "CloudWatchLogsPolicy",
          "Effect": "Allow",
          "Action": [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ],
          "Resource": "*"
        },
        {
          "Sid": "CodeCommitPolicy",
          "Effect": "Allow",
          "Action": [
            "codecommit:GitPull"
          ],
          "Resource": "*"
        },
        {
          "Sid": "S3GetObjectPolicy",
          "Effect": "Allow",
          "Action": [
            "s3:GetObject",
            "s3:GetObjectVersion"
          ],
          "Resource": "*"
        },
        {
          "Sid": "S3PutObjectPolicy",
          "Effect": "Allow",
          "Action": [
            "s3:PutObject"
          ],
          "Resource": "*"
        },
        {
          "Sid": "ECRPullPolicy",
          "Effect": "Allow",
          "Action": [
            "ecr:BatchCheckLayerAvailability",
            "ecr:GetDownloadUrlForLayer",
            "ecr:BatchGetImage"
          ],
          "Resource": "*"
        },
        {
          "Sid": "ECRAuthPolicy",
          "Effect": "Allow",
          "Action": [
            "ecr:GetAuthorizationToken"
          ],
          "Resource": "*"
        },
        {
          "Sid": "S3BucketIdentity",
          "Effect": "Allow",
          "Action": [
            "s3:GetBucketAcl",
            "s3:GetBucketLocation"
          ],
          "Resource": "*"
        }
      ]
    }
    ```
4) In the tags page you can specify some tags optionally. Click on the `Next:Create` button.
5) On the Review Policy page, for Policy Name, enter a name for the policy - `Custom-CodeBuildServiceRolePolicy`, and then choose `Create policy`.
6) In the navigation pane, choose `Roles`. Then choose `Create role`.
7) On the Create role page, with AWS Service already selected, choose `CodeBuild`, and then choose `Next:Permissions`.
8) On the Attach permissions policies page, select `Custom-CodeBuildServiceRolePolicy`, and then choose `Next: Review`.
9) On the Create role and review page, for Role name, enter a name for the role such as `Custom-CodeBuildServiceRole`, and then choose `Create role`.