# Dashboard Number Storage API

This is a simple Node.js application using Express and MongoDB to handle user inputs. Users can input a number between 1 and 25, which is then multiplied by 7 and stored in one of four collections based on its value. The application ensures that no new numbers can be entered once each collection has at least one entry.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/dashboard-number-storage.git
    cd dashboard-number-storage
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up MongoDB**:
    - Ensure MongoDB is installed and running on your system.
    - The application connects to a local MongoDB instance (`mongodb://localhost:27017/dashboard`).

4. **Start the server**:
    ```bash
    node app.js
    ```
