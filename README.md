# Project Risk Analyzer

This is an AI-powered risk analysis application for project managers. It uses the Google Gemini API to analyze project details and identify potential risks, along with probability, impact, and mitigation strategies.

## Features

- AI-powered risk identification using Google Gemini API
- Risk probability and impact calculation
- Visual risk matrix representation
- Risk mitigation recommendations
- Summary reports and visualization

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project-risk-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Gemini API key to the file
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your API key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Configuration

There are two ways to configure your Google Gemini API key:

1. **Environment Variables (Recommended)**:
   - Set `GEMINI_API_KEY` and `NEXT_PUBLIC_GEMINI_API_KEY` in your `.env.local` file
   - This method is more secure and preferred for production environments

2. **In-app Configuration**:
   - In the application, click on "Configure API Key" on the homepage
   - Enter your API key and save it (stored in browser localStorage)
   - This method is convenient for development and testing

## API Key Security

- When using environment variables, your API key is not exposed to the client
- The browser localStorage option should only be used for development
- Your API key is never sent to our servers, all API calls to Gemini are made directly from your environment

## Usage

1. Navigate to the Risk Analysis page
2. Enter your project details in the form
3. Click "Analyze Risks" to generate a risk assessment
4. View the results in the Risk Matrix, Mitigations, or Summary tabs
5. Export or save your analysis for future reference

## Tech Stack

- Next.js
- Tailwind CSS
- Google Gemini API

## Project Structure

- `/src/app` - Next.js app directory
- `/src/components` - React components
- `/src/utils` - Utility functions and API clients

## License

This project is licensed under the MIT License - see the LICENSE file for details.
