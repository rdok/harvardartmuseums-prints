import { Stack } from "@aws-cdk/core";
import { Effect, ManagedPolicy, PolicyStatement } from "@aws-cdk/aws-iam";
import { RolePolicyProps } from "./types";

export class AppBucket {
  constructor(stack: Stack, { role, config, stackRegex }: RolePolicyProps) {
    const managedPolicy = new ManagedPolicy(stack, "AppBucket", {
      description: `Policy to manage bucket for app bundle : ${stack.stackName}`,
      roles: [role],
    });

    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:s3:::${stackRegex}`],
        actions: [
          "s3:GetBucketPolicyStatus",
          "s3:DeleteBucketWebsite",
          "s3:PutBucketWebsite",
          "s3:PutBucketAcl",
          "s3:PutBucketPolicy",
          "s3:CreateBucket",
          "s3:GetBucketAcl",
          "s3:DeleteBucketPolicy",
          "s3:DeleteBucket",
          "s3:GetBucketPolicy",
          "s3:ListBucket",
          "s3:PutObject",
          "s3:GetObject",
        ],
      })
    );
  }
}
