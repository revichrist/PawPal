const nodemailer = require("nodemailer");

async function sendMail(payload, type) {
  try {
    console.log('Sending email in progress...' + ` <<<<<<<< nodemailer`)
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    let html = `
      <b>Hello World!</b>
    `;

    let subject = "Halo dunia!";

    switch (type) {
      case "Pending":
        html = `
          <h1>Hello! ${payload.username}!</h1>
          <p>${payload.petName} is now in queue awaiting for admin's approval!</p>
        `;

        subject = "Your pet data has been recieved";
        break;

      case "Rejected":
        html = `
        <h1>Hello! ${payload.username}!</h1>
        <p>We're sorry to inform you that ${payload.petName}'s submission has been rejected by our admin.</p>
      `;

      subject = "Your pet submission has been rejected";
      break;

      case "Adopted":
        const pronounce = {
          male: 'his',
          female: 'her'
        }

        const pronounce2 = {
          male: 'him',
          female: 'her'
        }

        html = `
        <h1>Hello! ${payload.username}!</h1>
        <p>${payload.petName} has finally find ${pronounce[payload.petGender] || 'their'} forever home. Please take a good care of ${pronounce2[payload.petGender] || 'them'}!</p>
      `;

      subject = "Pet adoption success!";
        break;

      case "Register":
        html = `
          <h1>Hello! ${payload.username}!</h1>
          <p>We hope you enjoy your visit here!</p>
        `
        subject = "Welcome to PawPal!";
        break;

      default:
        break;
    }

    const info = await transporter.sendMail({
      from: `PawPal <${process.env.USER_MAIL}>`,
      to: payload.email,
      subject,
      html,
    });

    console.log("Message sent! " + info.messageId);
    console.log(info.accepted, `<<<< accepted`, 78);
    console.log(info.rejected, `<<<< rejected`, 79);
  } catch (error) {
    console.log(error, 7);
  }
}

module.exports = sendMail;
