# Tree Plantation | Backend API

Welcome to the Tree Plantation Platform! This project provides a platform where individuals and NGOs can come together to plant trees, either through direct contributions or by self-planting. Our goal is to encourage sustainable practices and contribute to a greener planet.

## Features

- **NGO Collaboration**: Partner with NGOs to plant trees in designated areas.
- **Self-Planting**: Individuals can register their tree plantations and track their growth.
- **Real-time Weather Data**: Get weather updates to ensure optimal planting conditions (using the OpenMeteo API).
- **User Authentication**: Secure user authentication using Firebase, with role-based access for admins, NGOs, and users.
- **Tree Plantation Tracking**: Track and manage tree plantations, with detailed data on each tree.

## API Endpoints

### Authentication
- **`/auth/register/:role`** - Register a new user with a specified role.

### NGO Routes
- **`/ngo/registerPlace`** - Register a new planting location.
- **`/ngo/addPlace`** - Add a new place to an existing location.
- **`/ngo/getPlaces`** - Retrieve a list of registered places.
- **`/ngo/getNGO`** - Get information about the NGO.

### NGO Plantation Routes
- **`/ngo/initializePlantation`** - Start a new plantation project.
- **`/ngo/startPlantation`** - Begin the plantation process.
- **`/ngo/plantTree`** - Record a tree planting event.
- **`/ngo/completePlantation`** - Mark a plantation project as completed.
- **`/ngo/getPlantations`** - Retrieve a list of plantations managed by the NGO.
- **`/ngo/getTree`** - Get details about a specific tree.

### User Routes
- **`/user/getPlantations`** - Retrieve a list of plantations by the user.
- **`/user/getTrees`** - Retrieve a list of trees planted by the user.
- **`/user/initializePlantation`** - Start a new plantation project for the user.
- **`/user/plantTree`** - Record a tree planting event by the user.
- **`/user/completePlantation`** - Mark a plantation project as completed by the user.
- **`/user/PhotoURL`** - Update or retrieve the user's photo URL.
- **`/user/plantationChat`** - Access chat related to plantations.

### Common Routes
- **`/common/getPlaces`** - Get a list of available planting places.
- **`/common/getNearbyPlaces`** - Retrieve nearby planting places.
- **`/common/getChatbotResponse`** - Get a response from the chatbot.


## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for Node.js.
- **Firebase**: User authentication and role management.
- **MongoDB**: Database for storing plantations, trees, and user data.
- **OpenMeteo API**: Weather data integration for optimal planting conditions.


## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **MongoDB**: Set up a MongoDB database.
- **Firebase**: Set up Firebase for authentication.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/OldStager01/Tree-Plantation.git
   cd Tree-Plantation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the contents from `.env.sample` file.


4. **Start the server:**

   ```bash
   npm start
   ```
   
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
