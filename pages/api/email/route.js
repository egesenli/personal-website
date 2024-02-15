// pages/api/enail/route.js
import nodemailer from 'nodemailer'

// Your environment variables
const { MY_EMAIL, MY_PASSWORD } = process.env

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MY_EMAIL,
    pass: MY_PASSWORD,
  },
})

// Email sending function
const sendEmail = async (name, email, message) => {
  // Email content
  const mailOptions = {
    from: MY_EMAIL,
    to: MY_EMAIL,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  }

  try {
    // Send email
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// Form submission handler
const handleFormSubmission = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    try {
      // Send email
      const emailSent = await sendEmail(name, email, message)

      if (emailSent) {
        res.status(200).end()
      } else {
        res.status(500).end()
      }
    } catch (error) {
      console.error('Error handling form submission:', error)
      res.status(500).end()
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}

// Default module export
export default handleFormSubmission
