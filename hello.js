app.get("/", async (req, res) => {
  const handlefetch = async () => {
    axios.post("https://api.openai.com/v1/completions%22");
    try {
      // Check if user is authenticated with Firebase
      const { uid } = req.body;
      const decodedIdToken = await admin.auth().verifyIdToken(uid);

      // Extract newsletter content from email using mailparser
      const { emailContent } = req.body; // Replace with the appropriate field name in your request body
      const mail = await mailparser.simpleParser(emailContent);
      const newsletterText = mail.text;

      // Call OpenAI API for text summarization
      const prompt = `Summarize the following newsletter:\n\n${newsletterText}`;
      const response = await openai.summarize(prompt, {
        maxh: 100,
        model: "text-davinci-002",
      }); // Replace with desired parameters

      // Extract summarized text from API response
      const summarizedText = response.choices[0].text;

      // Send summarized newsletter to user via email using Nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "summario.vercel.app@gmail.com", // Replace with your Gmail email address
          pass: "Summario@123", // Replace with your Gmail email password
        },
      });

      const mailOptions = {
        from: "summario.vercel.app@gmail.com", // Replace with your Gmail email address
        to: decodedIdToken.email,
        subject: "your summarized newsletter from summario",
        text: summarizedText,
      };

      await transporter.sendMail(mailOptions);

      // Return success response
      res
        .status(200)
        .json({ success: true, message: "Summarized newsletter sent to user" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to summarize newsletter" });
    }
  };
  res.send(handlefetch);
});

// Start the Express server
const port = 3000; // Replace with desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
