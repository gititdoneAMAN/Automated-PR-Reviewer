# Automatic GitHub PR Review System

This project is an **Automatic GitHub PR Review System** that connects to GitHub, listens for new pull request (PR) events using webhooks, and automatically reviews the PR using an AI model. The review is then posted as a comment on the PR.

## Features

- **OAuth Integration**: Allows users to connect their GitHub account via OAuth.
- **Webhook for PRs**: Listens to newly created pull requests and triggers automatic review.
- **AI-Powered Review**: Utilizes an AI model to review the pull request code.
- **GitHub Integration**: Posts the AI-generated review as a comment on the PR using the GitHub API.

## System Architecture

The system consists of:

- **Frontend**: A simple UI for GitHub OAuth authorization.
- **Backend**: Services for OAuth handling, PR review, and posting reviews as comments.
- **AI Model**: An AI model (like OpenAI’s Codex) to analyze and review pull requests.
- **Database**: For storing GitHub OAuth tokens securely.
---

## Prerequisites

- **Node.js** (v14 or above)
- **MongoDB** (or another database to store tokens)
- **GitHub OAuth App**: Create a GitHub OAuth App and configure the following:
  - `Client ID`
  - `Client Secret`
  - Set the callback URL (e.g., `http://localhost:3000/auth/github/callback`)

## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/github-pr-review-system.git
   cd github-pr-review-system
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file at the root of your project and add the following:

   ```bash
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   DATABASE_URL=your_database_url
   AI_API_KEY=your_openai_api_key
   ```

4. **Set Up MongoDB**:
   Ensure MongoDB is running locally or use MongoDB Atlas and connect it via the `DATABASE_URL` environment variable.

5. **Run Locally**:

   - **Start the Backend**:

     ```bash
     npm run start:backend
     ```

   - **Start the Frontend**:
     ```bash
     npm run start:frontend
     ```

   The application will be available at `http://localhost:3000`.

---

## How to Run Locally

### Step 1: Configure GitHub OAuth

1. Navigate to the [GitHub OAuth App Settings](https://github.com/settings/developers) and register a new application.
2. Set your authorization callback URL (e.g., `http://localhost:3000/auth/github/callback`).
3. Get your **Client ID** and **Client Secret** and add them to your `.env` file.

### Step 2: Set Up Webhooks for PR Events

1. Once a user authorizes GitHub OAuth, the system will create a webhook for their repository to listen for pull request (PR) events.
2. The webhook URL (e.g., `http://localhost:3000/webhook`) will be triggered whenever a new PR is opened.

### Step 3: Start AI Review Service

1. When a PR event is triggered, the backend service will fetch the PR data.
2. The AI model will process the PR and generate a review.
3. The review is posted as a comment on the PR using the stored GitHub token.

### Step 4: Posting the Review

1. After the AI model generates the review, it will use the GitHub API to post the review as a comment on the PR.

---

## API Endpoints

- **OAuth Authorization**:
  - `GET /auth/github`: Redirects the user to GitHub for OAuth authorization.
  - `GET /auth/github/callback`: Callback URL for handling the authorization code.
- **Webhook Listener**:
  - `POST /webhook`: Receives GitHub PR events and triggers the review process.
- **PR Review**:
  - Automated process triggered by webhook, handled via the backend.

---

## Deployment

1. **Frontend**: Deploy using **Vercel** or **Netlify**.
2. **Backend**: Deploy on **AWS Lambda** using **API Gateway** or host on **Heroku** or **AWS EC2**.
3. **Database**: Use **MongoDB Atlas** for secure token storage.
4. **AI Service**: Host the AI model on a service like **AWS SageMaker** or use the **OpenAI API** for code review.

---

## Contributing

Feel free to open issues or pull requests for any improvements. Contributions are welcome!
