import { App, Stack } from "@aws-cdk/core";
import { Config } from "../config";
import { Match, Template } from "@aws-cdk/assertions";
import { Role, User } from "@aws-cdk/aws-iam";
import { CloudFrontPolicy } from "../cloud-front-policy";

const app = new App();
const config = new Config();
const stackName = `${config.org}-${config.cicdEnvironment}-${config.name}`;
const stackProps = { env: { region: config.region, account: "123456789012" } };

const stack = new Stack(app, stackName, stackProps);
const stackRegex = `${config.org}-*-${config.name}*`;
const user = new User(stack, "CICDUser", { userName: "CICDStackName" });
const role = new Role(stack, "Role", { assumedBy: user });
new CloudFrontPolicy(stack, { stackRegex, config, role });
const template = Template.fromStack(stack);

test("Authorise managing CDN", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: [
            "cloudfront:GetCloudFrontOriginAccessIdentityConfig",
            "cloudfront:ListCloudFrontOriginAccessIdentities",
            "cloudfront:TagResource",
            "cloudfront:DeleteCloudFrontOriginAccessIdentity",
            "cloudfront:CreateDistributionWithTags",
            "cloudfront:CreateDistribution",
            "cloudfront:CreateInvalidation",
            "cloudfront:CreateCloudFrontOriginAccessIdentity",
            "cloudfront:GetDistribution",
            "cloudfront:GetCloudFrontOriginAccessIdentity",
            "cloudfront:UpdateDistribution",
            "cloudfront:UpdateCloudFrontOriginAccessIdentity",
            "cloudfront:UntagResource",
            "cloudfront:DeleteDistribution",
          ],
          Effect: "Allow",
          Resource: "*",
        },
      ]),
    },
  });
});
