import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email validation function
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Function to save email to local JSON file
const saveEmailToFile = async (email: string) => {
  try {
    const emailsDir = path.join(process.cwd(), 'data');
    const emailsFile = path.join(emailsDir, 'emails.json');

    // Create data directory if it doesn't exist
    if (!fs.existsSync(emailsDir)) {
      fs.mkdirSync(emailsDir, { recursive: true });
    }

    // Read existing emails or create new array
    let emails = [];
    if (fs.existsSync(emailsFile)) {
      const fileContent = fs.readFileSync(emailsFile, 'utf-8');
      emails = JSON.parse(fileContent);
    }

    // Check if email already exists
    if (emails.includes(email)) {
      return { exists: true };
    }

    // Add new email with timestamp
    emails.push({
      email,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    });

    // Save updated emails
    fs.writeFileSync(emailsFile, JSON.stringify(emails, null, 2));

    return { success: true };
  } catch (error) {
    console.error('Error saving email:', error);
    return { success: false, error: 'Failed to save email' };
  }
};

// Welcome email template
const createWelcomeEmail = (email: string) => ({
  from: 'MindMic Team <onboarding@resend.dev>',
  to: [email],
  subject: 'Welcome to MindMic! 🎉',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to MindMic!</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 32px;
          font-weight: 700;
          color: #206ce8;
          margin-bottom: 10px;
        }
        .title {
          font-size: 24px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 20px;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 30px 0;
        }
        .feature {
          padding: 20px;
          background: #f7fafc;
          border-radius: 8px;
          border-left: 4px solid #206ce8;
        }
        .feature h3 {
          margin: 0 0 10px 0;
          color: #2d3748;
          font-size: 18px;
        }
        .feature p {
          margin: 0;
          color: #4a5568;
          font-size: 14px;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #206ce8 0%, #3131f5 100%);
          color: white;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
          text-align: center;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #718096;
          font-size: 14px;
        }
        @media (max-width: 480px) {
          .feature-grid {
            grid-template-columns: 1fr;
          }
          .container {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">MindMic</div>
          <h1 class="title">Welcome to the Future of Voice Transcription! 🎉</h1>
        </div>

        <p>Hi there!</p>

        <p>Thank you for signing up to be among the first to experience MindMic! We're thrilled to have you join our community of innovators, creators, and professionals who are revolutionizing the way they work with voice content.</p>

        <p>MindMic is not just another transcription tool – it's a comprehensive voice intelligence platform that transforms how you capture, process, and utilize spoken content. Here's what makes MindMic special:</p>

        <div class="feature-grid">
          <div class="feature">
            <h3>🎯 Exceptional Accuracy</h3>
            <p>Industry-leading transcription accuracy with multiple AI providers to choose from</p>
          </div>
          <div class="feature">
            <h3>🔒 Privacy-First</h3>
            <p>Your data stays private with local processing options and end-to-end encryption</p>
          </div>
          <div class="feature">
            <h3>⚡ Power Mode</h3>
            <p>Advanced AI-powered features for summarization, analysis, and content extraction</p>
          </div>
          <div class="feature">
            <h3>🌍 Multi-Format Export</h3>
            <p>Export your transcriptions to any format you need – text, JSON, subtitles, and more</p>
          </div>
        </div>

        <p><strong>What's Next?</strong></p>
        <p>We're working hard to finalize MindMic and will be releasing updates about our launch timeline, new features, and early-bird special offers exclusively to our subscribers.</p>

        <p>In the meantime, you can:</p>
        <ul>
          <li>Try our free 7-day trial to experience MindMic's power</li>
          <li>Follow our development journey on Product Hunt</li>
          <li>Share your feedback and feature requests with us</li>
        </ul>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.producthunt.com/products/mindmic" class="cta-button">
            Try MindMic Free Trial
          </a>
        </div>

        <p>We're building MindMic for people like you who value efficiency, accuracy, and innovation. Your early interest means a lot to us, and we can't wait to show you what we've been working on.</p>

        <p>If you have any questions or want to share how you plan to use MindMic, just reply to this email – we'd love to hear from you!</p>

        <p>Best regards,<br>
        The MindMic Team</p>

        <div class="footer">
          <p>You're receiving this email because you signed up for MindMic updates. If you didn't expect this email, please disregard it.</p>
        </div>
      </div>
    </body>
    </html>
  `
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Save email to file
    const saveResult = await saveEmailToFile(email);
    if (saveResult.exists) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 200 }
      );
    }

    if (!saveResult.success) {
      return NextResponse.json(
        { error: 'Failed to save email' },
        { status: 500 }
      );
    }

    // Send welcome email using Resend
    try {
      const emailData = await resend.emails.create(createWelcomeEmail(email));
      console.log('Welcome email sent:', emailData);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Continue even if email fails - the user is still registered
    }

    return NextResponse.json(
      {
        message: 'Successfully registered for updates! Please check your email for a welcome message.',
        success: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Email subscription API - Use POST to subscribe' },
    { status: 200 }
  );
}