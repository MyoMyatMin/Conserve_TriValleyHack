import bcrypt from "bcryptjs";

const getSomething = async (req, res) => {
  res.status(200).json("hi");
};

const signIn = (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "conserve@gmail.com") {
      if (password === "1234") {
        res.status(200).json("Successfully signned in.");
      } else {
        res.status(500).json({ error: "Invalid Password." });
      }
    } else {
      res.status(500).json({ error: "Invalid Email." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getSomething, signIn };
