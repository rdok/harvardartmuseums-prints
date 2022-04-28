export AWS_DEFAULT_REGION=$(shell jq -r '.region' infrastructurerc.json)
export NAME=$(shell jq -r '.name' infrastructurerc.json)
export ORG=$(shell jq -r '.org' infrastructurerc.json)
export AWS_CICD_STACK_NAME=$(shell echo "${ORG}-cicd-${NAME}")
export AWS_PROFILE=cicd_harvardartmuseums_prints

start:
	yarn start

build-deploy-cicd:
	yarn build
	make build-sam
	AWS_ROLE_ARN=$$(aws --profile $$AWS_PROFILE \
		cloudformation describe-stacks --stack-name $$AWS_CICD_STACK_NAME \
		--query 'Stacks[0].Outputs[?OutputKey==`CICDRoleARN`].OutputValue' \
		--output text) && \
	ASSUME_ROLE=$$(aws --profile $$AWS_PROFILE --output json \
		sts assume-role --role-arn $$AWS_ROLE_ARN --role-session-name cicd-access \
		--query "Credentials") && \
	export AWS_ACCESS_KEY_ID=$$(echo $$ASSUME_ROLE | jq -r '.AccessKeyId') && \
	export AWS_SECRET_ACCESS_KEY=$$(echo $$ASSUME_ROLE | jq -r '.SecretAccessKey') && \
	export AWS_SESSION_TOKEN=$$(echo $$ASSUME_ROLE | jq -r '.SessionToken') && \
	sam deploy \
		--config-env dev \
		--stack-name "$${ORG}-dev-$${NAME}" \
		--s3-bucket "$${ORG}-cicd-$${NAME}" \
		--s3-prefix "dev" \
		--capabilities CAPABILITY_IAM \
		--no-fail-on-empty-changeset
	STATIC_ASSETS_BUCKET_NAME=$$(aws cloudformation describe-stacks \
		--stack-name "$${ORG}-dev-$${NAME}" \
		--query 'Stacks[0].Outputs[?OutputKey==`StaticAssetsBucketName`].OutputValue' \
		--output text) && \
	aws s3 sync build s3://$${STATIC_ASSETS_BUCKET_NAME}

build-sam:
	sam build --template infrastructure.yml

check:
	make build
	make test
	make prettier

test:
	export CI=true; yarn test

prettier:
	npm run prettier
prettier-fix:
	npm run prettier:fix
