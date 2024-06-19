exports.donation = async (req, res) => {
    try {
      const { amount } = req.body;
      if (!amount) {
        return res.status(500).json({
          success: false,
          message: "Please provide the amount.",
        });
      }
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Amount in cents
        // currency: "usd",
        currency: "inr",
        description: "Donation for Smileaday !!",
        payment_method_types: ["card"],
      });
  
      res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  exports.donationConfirm = async (req, res) => {
    const { name, email, contactNo, location, amount, paymentIntentId } =
      req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
      const donation = await StripeDB.create({
        name,
        email,
        contactNo,
        location,
        amount,
        // currency: "usd",
        currency: "inr",
        payment_id: paymentIntent.id,
      });
  
      res.status(200).json({
        success: true,
        message: "Donation successful !!",
        donation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };