import nodemailer from 'nodemailer';

// Create a transporter object with the necessary configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service
    auth: {
        user: 'darkdevil7032@gmail.com', // Replace with your email
        pass: 'sqbj lnwi ezug ylpr'   // Replace with your email password or app password
    }
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'darkdevil7032@gmail.com', // Replace with your email
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email", error.message);
        throw new Error('Error sending email');
    }
};

export default sendEmail;