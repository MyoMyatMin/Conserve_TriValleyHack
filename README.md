
### Inspiration for CONSERVE

The idea for CONSERVE emerged from our experience in a sustainability and carbon footprint course. As students with a technological background, we wanted to use our skills to positively impact the world. During our research, we discovered that existing apps and websites for tracking carbon footprints were often complex and difficult to use daily. This insight led to the creation of CONSERVE—a user-friendly app designed to help people progressively reduce their carbon emissions day by day, month by month, and year by year.

### Objective of CONSERVE

To encourage the users of CONSERVE to make environmentally consicious choices based on their carbon emission.

### Functionality of CONSERVE

**Daily Interaction and Tracking:**
- CONSERVE sends daily notifications (morning, afternoon, or night) prompting users to answer questions about their daily activities.
- The questions cover transportation used for commuting, food consumption, and plastic waste generated.
- Based on the responses, CONSERVE calculates the user's carbon emissions and informs them if they've reached their limit, encouraging environmentally conscious choices like reducing food consumption or opting for public transportation.

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

### Tech Stack for CONSERVE

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

### Conclusion for Tech Stack

By leveraging a comprehensive tech stack that includes Express, Node.js, React Native, and Expo, along with various supportive libraries and tools, CONSERVE is designed to deliver a robust, user-friendly, and scalable solution for tracking and reducing carbon footprints. This tech stack not only facilitates efficient development and deployment but also ensures a seamless and engaging user experience.


### Challenges We Faced

- First-time mobile development experience using React Native and Expo Go.
- Started development a month late.
- Unfamiliarity with the hackathon environment.
- Challenges in deploying the backend on a server.
- Difficulty in finding specific data to calculate carbon emissions.
- First-time usage of project management tools.

### Accomplishments We Are Proud Of

- Successfully completed the app within the given time frame, despite being our first project using new technologies.
- Developed a satisfying UI.
- Demonstrated excellent teamwork and communication throughout the hackathon.
- Gained significant learning and recognized areas for further improvement.
- Fostered a responsible and contributive mindset among all team members.
- Solved problems through inclusive decision-making.

### Lessons Learned

- The complete process of building an app from scratch, including R&D, UI, frontend, backend, database, cloud hosting, deployment, and creating a landing page.
- Familiarization with real-life work scenarios such as using Git, conducting meetings, and project management.
- The importance of participating in hackathons.
- The critical role of UI/UX design in making user-friendly applications.

### Future Plans for CONSERVE

- Launch the app on both iOS and Android platforms.
- Partner with NGOs and environmental groups to plant trees based on users' achievements.
- Integrate social features to allow users to share progress.
- Add new features such as news and articles related to the environment.
- Enhance the codebase with a robust architecture.
- Promote CONSERVE on social media and collaborate with nonprofit environmental organizations.
- Explore business opportunities, including partnerships with environmentally friendly companies for advertising.

By focusing on these areas, CONSERVE aims to become a comprehensive platform for environmental sustainability, encouraging and enabling users to make greener choices effortlessly.
