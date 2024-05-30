# CONSERVE X TriValley Summer Long Hackathon
Repository of CONSERVE - submission for DEVPOST - TriValley Summer Long Hackathon

## Table of contents

- [Inspiration for CONSERVE](#inspiration-for-conserve)
- [Objective of CONSERVE](#objective-of-conserve)
- [What it does](#what-it-does)
- [User Flow in CONSERVE](#user-flow-in-conserve)
- [How we built it](#how-we-built-it)
- [Tech Stack for CONSERVE](#tech-stack-for-conserve)
- [Challenges we ran into](#challenges-we-ran-into)
- [Accomplishments that we're proud of](#accomplishments-that-were-proud-of)
- [What we learned](#what-we-learned)
- [What's next for CONSERVE](#whats-next-for-conserve)
- [Additional project resources](#additional-project-resources)
- [Installation Manual](#Installation-Manual)
- [Credits and acknowledgements](#credits-and-acknowledgements)
- [Contributors](##contributors)
- [Call to Action](##call-to-action)

  
## Inspiration for CONSERVE

The idea for CONSERVE emerged from our experience in a sustainability and carbon footprint course. As students with a technological background, we wanted to use our skills to positively impact the world. During our research, we discovered that existing apps and websites for tracking carbon footprints were often complex and difficult to use daily. This insight led to the creation of CONSERVE—a user-friendly app designed to help people progressively reduce their carbon emissions day by day, month by month, and year by year.

## Objective of CONSERVE

- To encourage the users of CONSERVE to make environmentally consicious choices based on their carbon emission.

## What it does

**Daily Interaction and Tracking:**
- CONSERVE sends daily notifications (morning, afternoon, or night) prompting users to answer questions about their daily activities.
- The questions cover transportation used for commuting, food consumption, and plastic waste generated.
- Based on the responses, CONSERVE calculates the user's carbon emissions and informs them if they've reached their limit, encouraging sustainable choices like reducing food consumption or opting for public transportation.

**User Flow in CONSERVE:**
1. **Splash Screen & Authentication:**
   - Users are greeted with a splash screen upon opening the app.
   - If not logged in, users are directed to the sign-in/sign-up page for authentication and account creation.
2. **Home Page:**
   - Post-login, users land on the home page displaying their daily, weekly, and monthly records.
   - Users can view detailed stats and numbers by tapping on each record button (daily, weekly, monthly).
3. **Profile Management:**
   - Users can update their profile information, such as profile picture and name.
   - The profile page also shows current streaks, account age, and highest streaks.
4. **Daily Surveys:**
   - Users are prompted to complete daily surveys if not already done.
   - The survey page allows users to take morning, afternoon, and night surveys focused on transportation, food, and recycling.
5. **Insights & Achievements:**
   - The insights tab leads to a page displaying achievements in terms of badges and tree progress.

## How we built it
**Backend:**

The backend of CONSERVE is built with Express and Node.js, utilizing various libraries and tools to ensure robust and secure API development. 

**Frontend:**

The frontend of CONSERVE is powered by React Native and Expo, using several libraries and tools to enhance the development process and user experience.

## Tech Stack for CONSERVE

**Backend:**

The backend of CONSERVE is built with Express and Node.js, utilizing various libraries and tools to ensure robust and secure API development. The key components include:

- **Express:** Used for building the API server, providing a flexible framework for creating RESTful services.
- **Mongoose:** Used for MongoDB object modeling and validation, allowing for efficient database interactions.
- **bcryptjs:** Utilized for hashing passwords, ensuring user password security.
- **jsonwebtoken:** Used for generating and verifying JWTs for authentication, enabling secure user sessions.
- **cloudinary:** Employed for media storage and management, offering scalable solutions for handling images and videos.
- **dotenv:** Used for loading environment variables from a .env file, making configuration management straightforward.
- **cookie-parser:** For parsing and managing cookies, facilitating secure and easy cookie handling.
- **nodemon:** Utilized for automatically restarting the server during development, improving the development workflow.
- **@faker-js/faker:** Used for generating fake data during testing, assisting in creating realistic test scenarios.

The backend is hosted on Render, providing a scalable and reliable environment for API services.

**Frontend:**

The frontend of CONSERVE is powered by React Native and Expo, using several libraries and tools to enhance the development process and user experience. Key components include:

- **React Native:** For building the mobile application, offering a robust framework for cross-platform development.
- **Expo:** Used for development, build, and deployment, streamlining the development workflow.
- **expo-constants:** Provides access to system constants, helping in environment-specific configurations.
- **expo-image-picker:** For image picking functionalities, allowing users to upload images.
- **expo-linking:** For deep linking capabilities, facilitating navigation between different parts of the app.
- **expo-notifications:** For handling notifications, enabling user engagement through alerts.
- **expo-router:** Used for routing and navigation, managing the app's navigation flow.
- **expo-status-bar:** For managing the status bar, ensuring a consistent user interface.
- **@react-native-async-storage/async-storage:** Provides persistent storage solutions, essential for saving user data locally.
- **React Navigation:** Used for handling navigation in the app, offering a seamless user experience.
- **react-native-dotenv:** For managing environment variables, simplifying configuration management.
- **react-native-gifted-charts:** Used for displaying charts and graphs, visualizing user data effectively.
- **react-native-linear-gradient:** For creating linear gradient backgrounds, enhancing the app's visual appeal.
- **react-native-loading-modal:** For displaying loading modals, improving user experience during data fetching.
- **react-native-safe-area-context:** For handling safe area views, ensuring content is displayed correctly on different devices.
- **react-native-screens:** For native screen transitions, providing a smooth user experience.
- **react-native-svg:** For rendering SVG images, supporting scalable graphics.
- **nativewind:** For utility-first styling, simplifying the styling process.
- **moment:** For date and time manipulation, making it easier to handle date-related functionalities.
- **tailwindcss:** For utility-first CSS, promoting a clean and efficient styling approach.

The frontend application is hosted on the Expo Store for Android, ensuring seamless distribution and updates.

## Conclusion for Tech Stack

By leveraging a comprehensive tech stack that includes Express, Node.js, React Native, and Expo, along with various supportive libraries and tools, CONSERVE is designed to deliver a robust, user-friendly, and scalable solution for tracking and reducing carbon footprints. This tech stack not only facilitates efficient development and deployment but also ensures a seamless and engaging user experience.


## Challenges we ran into

- First-time mobile development experience using React Native and Expo Go.
- Started development a month late.
- Unfamiliarity with the hackathon environment.
- Challenges in deploying the backend on a server.
- Difficulty in finding specific data to calculate carbon emissions.
- First-time usage of project management tools.

## Accomplishments that we're proud of

- Successfully completed the app within the given time frame, despite being our first project using new technologies.
- Developed a satisfying UI.
- Demonstrated excellent teamwork and communication throughout the hackathon.
- Gained significant learning and recognized areas for further improvement.
- Fostered a responsible and contributive mindset among all team members.
- Solved problems through inclusive decision-making.

## What we learned

- The complete process of building an app from scratch, including R&D, UI, frontend, backend, database, cloud hosting, deployment, and creating a landing page.
- Familiarization with real-life work scenarios such as using Git, conducting meetings, and project management.
- The importance of participating in hackathons.
- The critical role of UI/UX design in making user-friendly applications.

## What's next for CONSERVE

- Improve QandA session with more accurate, more detailed and inclusive questions and data.
- Launch the app on both iOS and Android platforms.
- Partner with NGOs and environmental groups to plant trees based on users' achievements.
- Integrate social features to allow users to share progress.
- Add new features such as news and articles related to the environment.
- Enhance the codebase with a robust architecture.
- Promote CONSERVE on social media and collaborate with nonprofit environmental organizations.
- Explore business opportunities, including partnerships with environmentally friendly companies for advertising.

By focusing on these areas, CONSERVE aims to become a comprehensive platform for environmental sustainability, encouraging and enabling users to make greener choices effortlessly.

## Additional project resources
- [Figma](https://www.figma.com/design/R5zoG0VakWzIeMa8Oi6Trj/TriVal-Hack---FIGMA?node-id=433-18&t=Vp9nDTiadINt1aNJ-1)
- [Trello](https://trello.com/invite/b/X5bDfT93/ATTIfaf4a1241ff3cd0b2e8560304c0473cd3329437A/trivalley-hacks)

## Installation Manual

- [Testing with Android Phone or Expo Orbit](#testing-with-android-phone-or-expo-orbit)
- [Cloning the Repository and Testing](#cloning-the-repository-and-testing)
- [Testing with Localhost](#testing-with-localhost)
- [Additional Resources](#additional-resources)

## Testing with Android Phone or Expo Orbit

If you have an Android phone or Expo Orbit, you can try the application via this link: [Expo Build](https://expo.dev/accounts/conserve/projects/reactnative/builds/6bb2d168-cbc1-4b9f-9c44-9addc15f99f0).

### For Android
- Click the link to download the app and test using the following credentials:
  - **Email**: testing123@gmail.com
  - **Password**: 1234

### For Expo Orbit
- Choose the Android emulator (iOS won't work since the deployment version is with an Android build).

**Note**: This link will expire on June 12th, 2024.

## Cloning the Repository and Testing

1. Clone the repository:
    ```sh
    git clone https://github.com/MyoMyatMin/Conserve_TriValleyHack/tree/0475841472acb838f6ae7239e6f2ecd5a05229e4
    ```

2. Navigate to the `reactnative` directory:
    ```sh
    cd reactnative
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Start the Expo server:
    ```sh
    npx expo start -c
    ```

5. A QR code will be generated. Scan it with the Expo Go app (available on both Play Store and App Store).

## Testing with Localhost

1. Clone the repository:
    ```sh
    git clone https://github.com/MyoMyatMin/Conserve_TriValleyHack/tree/0475841472acb838f6ae7239e6f2ecd5a05229e4
    ```

2. Navigate to the `reactnative` directory and create an `.env` file:
    ```sh
    cd reactnative
    touch .env
    ```

3. Add the following line to the `.env` file, replacing `Your IP address` with your actual IP address:
    ```sh
    EXPO_PUBLIC_API_URL="Your IP address"
    ```

4. Install the dependencies:
    ```sh
    npm install
    ```

5. Navigate to the `backend` directory and create an `.env` file:
    ```sh
    cd ../backend
    touch .env
    ```

6. Create an account in [MongoDB Atlas](https://cloud.mongodb.com) and set up a cluster. Obtain the username, password, and connection URI.

7. Add the following lines to the backend `.env` file, replacing placeholders with actual values:
    ```env
    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your-db-name
    PORT=3000
    JWT_SECRET=your-secret
    CLOUDINARY_CLOUD_NAME=your-cloud-name
    CLOUDINARY_API_KEY=your-api-key
    CLOUDINARY_API_SECRET=your-api-secret
    ```

8. Install the backend dependencies:
    ```sh
    npm install
    ```

9. Start the backend server:
    ```sh
    npm start
    ```

10. In the `reactnative` directory, start the Expo server:
    ```sh
    cd ../reactnative
    npx expo start -c
    ```

11. Scan the generated QR code with the Expo Go app to test the application.

## Additional Resources

- [YouTube Video for MongoDB Setup](https://youtu.be/s0anSjEeua8?si=npslm_EYsi6LRcIZ)
- [Cloudinary Dashboard](https://cloudinary.com/)

This completes the installation and setup process. If you encounter any issues, refer to the respective documentation or support resources.


## Credits and acknowledgements

- [React Native Development lessons](https://youtu.be/ZBCUegTZF7M?si=4PJ2sJkgL6MlSLZx)
- [Landing Page Reference](https://www.youtube.com/watch?v=wXnlHIvKnTM&list=PL07efmqYWHZ8jroJAkkFB2s4ZKpVNCOQa&index=1)
- [Image resources - vecteezy](https://www.vecteezy.com/)
- [Image resources - shutterstock](https://www.shutterstock.com/th/)
- [Image resources - gencraft](https://gencraft.com/)
- [Resource research links](https://www.carbontrust.com/en-as)
- [Resource research links](https://e360.yale.edu/features/what_is_the_carbon_limit_that_depends_who_you_ask)
- [Resource research links](https://www.pawprint.eco/eco-blog/average-carbon-footprint-globally#:~:text=How%20can%20you%20reduce%20your%20carbon%20footprint%3F%20To,total%20of%205%20tonnes%20of%20CO2e%20per%20year.)
- [Resource research links](https://www.bbc.co.uk/food/articles/carbon)
- [Resource research links](https://www.bbc.com/news/science-environment-46459714)
- [Resource research links](https://ourworldindata.org/food-choice-vs-eating-local)
- [Resource research links](https://www.linkedin.com/advice/3/how-do-you-calculate-transportation-carbon)
- [Resource research links](https://www.nationalgeographic.com/environment/article/plastic-pollution)
- [Resource research links](https://www.carbontrust.com/en-as)
- [Resource research links](https://ourworldindata.org/food-choice-vs-eating-local)
- [ChatGPT](https://chatgpt.com/)

## Contributors
- [Myo Myat Min](https://github.com/MyoMyatMin)
- [Bhone Pyae Kyaw](https://github.com/BhonePyae-Kyaw)
- [Noel Paing Oak Soe](https://github.com/NoelPOS)
- [Moe Myint Moe San](https://github.com/Lucassan4225)
- [Kyaw Ye Lwin @ Anmol](https://github.com/MarioK404)

## Call to Action

If you find this project interesting, please consider:

- ⭐ Starring the repository to show your support.
- 🐛 Reporting any issues or bugs in the [issues section](https://github.com/MyoMyatMin/CONSERVE/issues).
- 📥 Forking the project to contribute.

Thank you for checking out CONSERVE! Let's make a positive impact on our environment together.
  







