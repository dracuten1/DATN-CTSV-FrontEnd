This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# GUILDLINE

## Deployment
    Config one time:
        + Step1: Install AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html
        + Step2: 
            Login https://531817921593.signin.aws.amazon.com/console.
        + Step3: 
            Open IAM -> Users -> Select users ->Security credentials -> Create access key
        + Step4: 
            Open CMD.
            $ aws configure
            AWS Access Key ID [None]: AKIAXXUWRPQ42NAKD6D5
            AWS Secret Access Key [None]: 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
            Default region name [None]: ap-southeast-1
            Default output format [None]: ENTER

    Deploy script: npm run deploy || yarn deploy
    Open .env file and set stage before build stage = development || production || test
    URL: http://ctsvapp.s3-website-ap-southeast-1.amazonaws.com
    URL test: http://testctsvapp.s3-website-ap-southeast-1.amazonaws.com

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build-prod` || `npm run build-test`

Builds the app for production || stagging to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run deploy-prod` || `npm run deploy-test`

Deploy the app for production || stagging, synchronize `build` folder between local
and s3://ctsvapp || s3://testctsvapp.

### `npm run build-deploy-prod` || `npm run build-deploy-test`

This script is a combination between two script build and deploy.<br />