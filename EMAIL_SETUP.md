# Email Collection System Setup

This document explains how to set up the email collection system for the "Wanna know more" feature.

## Overview

The system includes:
- Email collection popup with validation
- Local JSON file storage for collected emails
- Automatic welcome emails using Resend
- Comprehensive welcome email template

## Setup Instructions

### 1. Configure Resend Email Service

1. **Sign up for Resend**: Go to [https://resend.com](https://resend.com) and create an account
2. **Verify your domain**: Add and verify your sending domain (e.g., mindmic.app)
3. **Create API Key**: Generate an API key from the Resend dashboard
4. **Update environment variable**: Add your API key to `.env.local`:

```bash
RESEND_APIKey=re_your_actual_api_key_here
```

### 2. Test the Email System

1. Start the development server: `npm run dev`
2. Click the "Wanna know more" button
3. Enter a test email address
4. Check if:
   - The email is saved to `data/emails.json`
   - A welcome email is received

### 3. Email Storage

Collected emails are stored in `data/emails.json` with this format:
```json
[
  {
    "email": "user@example.com",
    "timestamp": "2024-11-07T10:30:00.000Z",
    "id": "1730987400000"
  }
]
```

### 4. Production Deployment

For production deployment:

1. **Vercel**: Add the `RESEND_API_KEY` to your environment variables in the Vercel dashboard
2. **Other platforms**: Add the environment variable according to your hosting platform's instructions
3. **Domain verification**: Ensure your sending domain is properly verified in Resend

## Features

### Email Validation
- Client-side validation using regex
- Server-side validation in API route
- Duplicate email detection

### Welcome Email Template
The welcome email includes:
- Personalized greeting
- MindMic feature overview
- Call-to-action for free trial
- Professional design with responsive layout
- Privacy compliance notice

### Security Features
- Input validation and sanitization
- Rate limiting (can be added)
- CORS protection
- Error handling without exposing sensitive information

## Troubleshooting

### Email Not Sending
1. Check your Resend API key is correct
2. Verify your sending domain in Resend
3. Check the Resend dashboard for delivery status
4. Review server logs for error messages

### Emails Not Saving
1. Check if the `data/` directory has write permissions
2. Verify the server can create files
3. Check the API route logs for errors

### Form Validation Issues
1. Check browser console for JavaScript errors
2. Verify the API endpoint is responding correctly
3. Test with different email formats

## Future Enhancements

1. **Google Sheets Integration**: Replace JSON file with Google Sheets for better management
2. **Email Analytics**: Track open rates and click-through rates
3. **Advanced Segmentation**: categorize subscribers by interests
4. **Automated Follow-up**: Send series of onboarding emails
5. **Unsubscribe Management**: Add unsubscribe functionality
6. **Email Template Management**: Create multiple email templates

## API Endpoints

### POST /api/email
Subscribes an email to the newsletter.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Successfully registered for updates!",
  "success": true
}
```

### GET /api/email
Health check endpoint for the email API.

**Response:**
```json
{
  "message": "Email subscription API - Use POST to subscribe"
}
```