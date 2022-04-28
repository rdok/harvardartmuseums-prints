import { App, Stack } from "@aws-cdk/core";
import { Config } from "../config";
import { Match, Template } from "@aws-cdk/assertions";
import { Role, User } from "@aws-cdk/aws-iam";
import { DomainPolicy } from "../domain-policy";
import { AppBucket } from "../app-bucket";

const app = new App();
const config = new Config();
const stackName = `${config.org}-${config.cicdEnvironment}-${config.name}`;
const stackProps = { env: { region: config.region, account: "123456789012" } };

const stack = new Stack(app, stackName, stackProps);
const stackRegex = `${config.org}-*-${config.name}*`;
const user = new User(stack, "CICDUser", { userName: "CICDStackName" });
const role = new Role(stack, "Role", { assumedBy: user });
new AppBucket(stack, { stackRegex, config, role });
const template = Template.fromStack(stack);

test("Authorise getting hosted zone of", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: [
            "s3:GetBucketPolicyStatus",
            "s3:DeleteBucketWebsite",
            "s3:PutBucketWebsite",
            "s3:PutBucketAcl",
            "s3:PutBucketPolicy",
            "s3:CreateBucket",
            "s3:GetBucketAcl",
            "s3:ListBucket",
            "s3:DeleteBucketPolicy",
            "s3:DeleteBucket",
            "s3:GetBucketPolicy",
            "s3:PutObject",
            "s3:GetObject",
            "s3:DeleteObject",
          ],
          Effect: "Allow",
          Resource: `arn:aws:s3:::${stackRegex}`,
        },
      ]),
    },
  });
});
