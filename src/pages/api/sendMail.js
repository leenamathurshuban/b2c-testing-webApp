const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default async function handler(req, res) {
  // module.exports = async ({ sendTo, subject, template }) => {
  const email = process.env.SENDGRID_FROM_EMAIL || "";
  const name = process.env.SENDGRID_FROM_NAME || "";
  let { sendTo, subject, template } = req.body;

  const msg = {
    to: sendTo,
    // cc: "shopifyprodev@gmail.com",
    // bcc: "shopifyprodev@gmail.com",
    from: {
      email,
      name,
    },
    subject: subject,
    html: template, // html body
  };

  try {
    await sgMail.send(msg);
    return res
      .status(200)
      .send({ status: true, message: "Data Found", data: sendTo });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}
