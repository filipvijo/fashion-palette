# Grok-2-Vision1212 API Setup

This application uses the Grok-2-Vision1212 API for analyzing images and providing color suggestions. Follow these steps to set up the API key:

## Setting up the API Key

1. Create a `.env.local` file in the root directory of the project (if it doesn't already exist)
2. Add your Grok API key to the file:
   ```
   REACT_APP_GROK_API_KEY=your_grok_api_key_here
   ```
3. Replace `your_grok_api_key_here` with your actual Grok API key
4. Save the file

## How it works

The application will use the Grok-2-Vision1212 API to:
1. Analyze uploaded photos
2. Determine the user's seasonal color palette
3. Provide specific color recommendations with hex codes
4. Generate a text explanation of why these colors would suit the user

If the API key is not configured or if there's an error with the API call, the application will fall back to a random color palette selection.

## Troubleshooting

If you encounter issues with the API:
1. Verify that your API key is correct
2. Check that the `.env.local` file is in the root directory
3. Restart the development server after making changes to the `.env.local` file
4. Check the browser console for any error messages

## Security Note

Never commit your API key to version control. The `.env.local` file is included in `.gitignore` to prevent accidental commits.
