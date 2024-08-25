cd src
zip -r targacell-lambda.zip .
aws s3 cp ./targacell-lambda.zip s3://lambdadeploybucket
rm ./targacell-lambda.zip
cd ..
aws lambda update-function-code --function-name arn:aws:lambda:us-east-1:209340313050:function:targacell-backend --s3-bucket lambdadeploybucket --s3-key targacell-lambda.zip
