import nodemailer from 'nodemailer';

// Check if email credentials are configured
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ EMAIL_USER or EMAIL_PASS is missing from .env file');
} else {
  // Mask email for security (show first 3 chars and domain)
  const emailMask = process.env.EMAIL_USER.replace(/(.{3})(.*)(@.*)/, '$1***$3');
  const passLength = process.env.EMAIL_PASS.length;
  console.log(`📧 Email configured: ${emailMask} (password length: ${passLength} chars)`);
  
  // Check if password looks like an app password (should be 16 chars without spaces)
  if (process.env.EMAIL_PASS.includes(' ')) {
    console.warn('⚠️ WARNING: EMAIL_PASS contains spaces. App passwords should NOT have spaces!');
    console.warn('⚠️ Remove all spaces from your app password in .env file');
  }
  if (passLength !== 16 && passLength < 10) {
    console.warn('⚠️ WARNING: App passwords are usually 16 characters. Current length:', passLength);
  }
}

// Create a transporter using your email provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter on startup (non-blocking)
transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Email transporter verification failed:', error.message);
    if (error.code === 'EAUTH') {
      console.error('🔐 Authentication Error - Check:');
      console.error('   1. EMAIL_USER in .env matches your Gmail address');
      console.error('   2. EMAIL_PASS is a 16-character App Password (no spaces)');
      console.error('   3. 2-Step Verification is enabled on your Google account');
      console.error('   4. You restarted the server after updating .env');
    }
  } else {
    console.log('✅ Email transporter verified and ready to send messages');
  }
});

export const sendemail = async (to, html) => {
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ EMAIL_USER or EMAIL_PASS is missing from .env file');
    throw new Error('Email configuration is missing. Please set EMAIL_USER and EMAIL_PASS in .env file');
  }

  // Validate email format
  if (!to || !to.includes('@')) {
    throw new Error(`Invalid recipient email address: ${to}`);
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Welcome to AWSCRM!',
    html,
  };

  try {
    console.log(`📤 Attempting to send email to: ${to}`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent successfully to ${to}`);
    console.log(`   Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    // Handle Gmail authentication errors specifically
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      console.error('❌ Gmail Authentication Failed!');
      console.error('📧 Current configuration:');
      console.error(`   EMAIL_USER: ${process.env.EMAIL_USER}`);
      console.error(`   EMAIL_PASS length: ${process.env.EMAIL_PASS.length} characters`);
      console.error(`   EMAIL_PASS has spaces: ${process.env.EMAIL_PASS.includes(' ') ? 'YES (WRONG!)' : 'NO (GOOD)'}`);
      console.error('');
      console.error('🔧 To fix this issue:');
      console.error('   1. Make sure 2-Step Verification is enabled: https://myaccount.google.com/security');
      console.error('   2. Generate App Password: https://myaccount.google.com/apppasswords');
      console.error('   3. Copy the 16-character password (NO SPACES)');
      console.error('   4. Update EMAIL_PASS in .env file (remove quotes if you added them)');
      console.error('   5. Make sure EMAIL_USER matches your Gmail address exactly');
      console.error('   6. RESTART your server (npm run dev)');
      throw new Error('Gmail authentication failed. Check console for details.');
    }
    console.error('❌ Error sending welcome email:', error.message);
    console.error('   Error code:', error.code);
    console.error('   Full error:', error);
    throw error;
  }
};