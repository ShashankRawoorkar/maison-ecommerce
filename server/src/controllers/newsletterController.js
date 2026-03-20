const subscribe = (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      const err = new Error('A valid email address is required');
      err.status = 400;
      return next(err);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      const err = new Error('Invalid email address format');
      err.status = 400;
      return next(err);
    }

    console.log(`Newsletter subscription: ${email.trim()}`);

    res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to the Maison Circle!',
      email: email.trim(),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { subscribe };
