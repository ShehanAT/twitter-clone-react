# Twitter Clone Application 

### Overview 
A simple Twitter clone application built using React.js, GraphQL, Node.js and MongoDB. 

## Screenshots 
Signup page:
![Signup page](/screenshots/signup_image1_new.png)

Homepage page:
![Homepage](/screenshots/homepage_image2.png)

Signup Form:
![Signup page](/screenshots/signup_image2_signupform.png)

Login Form:
![Login page](/screenshots/signup_image3_loginForm.png)

Message page:
![Message page](/screenshots/messages_image1.png)

### Live version  
Backend version: https://twitter-clone-node-app.herokuapp.com/  
Frontend version: https://gracious-khorana-ceda2c.netlify.app/  

# Getting Started
  
### Running with Docker  
To run this application using Docker just follow the steps below:
1. Clone this repo 
2. Cd into the ```{root_director}``` directory and run ```docker-compose up -d``` to 
   build the frontend and backend application Docker images 
3. Run ```docker-compose up -d``` again to start the fronted and backend application 
   Docker images
4. Navigate to ```http://localhost:3000/``` to view application 

### Running Locally 
To run this application locally just follow the steps below:
1. Clone this repo 
2. Cd into the ```{root_directory}/server``` directory and run ```npm install```
3. Cd into the ```{root_directory}/client``` directory and run ```npm install```
4. Run ```node index.js``` from ```{root_directory}/server``` directory 
5. Run ```npm start``` from ```{root_directory}/client``` 


### Prerequisites

Make sure you have the following technologies installed before running this project locally:
* Node.js
* npm package manager 
* MongoDB
* MongoDB Compass(optional)

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

- [x] Added login & registration functionality
- [x] Added 'Create Tweets' feature in homepage 
- [x] Add unit tests for Homepage and Signup page
- [ ] Add OAuth2 authentication in Signup page

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


