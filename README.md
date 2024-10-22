# TargaCell website

## Environment
All code (front end and back end) was developed using Node js v20x.

## Frontend
The front end is a static web site using FontAwesome, jQuery.
The build tools are Sass, Twig, and custom compilation scripts that can be found in the `/scripts` folder.

### Development
The pages and components are stored in the `/src` directory. To test the site locally, run script `npm run build-site`
which will compile the src files into the `/build` directory. Then simply open the `/build/index.html` file in a browser.

### Deployment
To deploy the front end, run the `/scripts/deploySite.js` node script.

## Backend
The backend is a single lambda function + API Gateway service designed to email the contact form data to the TargaCell team.

### Development
The backend script was written in Node js v20x and can be found in the `/lambda` directory.

### Deployment
To deploy the backend, enter the lambda directory and run `sh deploy.sh`. 
This will package, upload, and deploy the contents of the `/lambda/src` directory to the AWS Lambda service.
This script requires the `aws-cli` be configured and accessible from the command line.
