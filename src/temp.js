const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  secure: false, // use SSL
  port: 587,
  auth: {
    user: "lilliana.schulist@ethereal.email",
    pass: "n5ZvzaQTQNUUcCVndy",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// send mail with defined transport object
let info = await transporter.sendMail({
  from: '"Bookshelf_" <foo@example.com>', // sender address
  to: `${email}`, // list of receivers
  subject: "Please verify your email address", // Subject line
  html: `<a href='http://localhost:3000/verify-email?token=${verificationToken}&email=${email}'>Link</a>`, // html body
});

const sendVerificationEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { email: userEmail } = req.body;

  const msg = {
    to: "kutyamacifoka@gmail.com",
    from: "fekete_gabor@outlook.hu",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  const email = await sgMail.send(msg);

  res.status(200).json(email);
};
