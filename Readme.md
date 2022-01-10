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
