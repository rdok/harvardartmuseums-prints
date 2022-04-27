import { Stack } from "@aws-cdk/core";
import { Effect, ManagedPolicy, PolicyStatement } from "@aws-cdk/aws-iam";
import { RolePolicyProps } from "./types";

export class CloudFrontPolicy {
  constructor(stack: Stack, { role, config }: RolePolicyProps) {
    const managedPolicy = new ManagedPolicy(stack, "CloudFrontPolicy", {
      description: `Policy to manage CDN for : ${stack.stackName}`,
      roles: [role],
    });

    // TODO: limit scope of authorisation for destructive actions.
    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["*"],
        actions: [
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
      })
    );
  }
}
