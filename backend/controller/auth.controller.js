//import admin from "firebase-admin";

import { createRequire } from "module";
import User from "../model/user.model.js";
import { buildErrorResponse, buildReponse } from "./../util/util.js";
import { generateJWT } from "../util/jwtUtil.js";
const require = createRequire(import.meta.url);

const bcrypt = require("bcryptjs");
/*
const serviceAccount = require("./firebase-serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://diamond-soft-auth-db.firebaseapp.com/",
});
*/

export const authenticateFirebase = async (req, res) => {
  const { tokenFirebase } = req.body;

  try {

    const decodedToken = await admin.auth().verifyIdToken(tokenFirebase);

    let userSaved = await User.findOne({
      email: decodedToken.email,
    }).exec();

    if (userSaved === null) {
      let newUser = new User();
      newUser.name = decodedToken.name;
      newUser.email = decodedToken.email;
      newUser.password = decodedToken.uid;

      userSaved = await newUser.save();
    }
    userSaved.password = "";

    res
      .status(200)
      .json(buildReponse("Usuario autenticado correctamente", userSaved));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

export const basicAuthentication = async (req, res) => {
  try {
    // Extract Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res
        .status(401)
        .json(buildErrorResponse("Missing or invalid Authorization header"));
    }

    // Decode Base64 credentials
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [email, password] = credentials.split(":");

    if (!email || !password) {
      return res.status(401).json(buildErrorResponse("Invalid credentials"));
    }

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json(buildErrorResponse("Invalid credentials"));
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(buildErrorResponse("Invalid credentials"));
    }

    // Generate JWT Token
    const token = generateJWT(user);

    const userData = {
      name: user.name,
      email: user.email,
      token,
    };

    res.json(buildReponse("Authentication successful", userData));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json(buildErrorResponse("Review the fields"));
    }

    if (email.indexOf("@") === -1) {
      return res.status(400).json(buildErrorResponse("Invalid email"));
    }

    if (password !== confirmPassword) {
      return res.status(400).json(buildErrorResponse("Passwords do not match"));
    }

    // Find the user in the database
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json(buildErrorResponse("Email already registered"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const userSaved = await newUser.save();
    res
      .status(201)
      .json(buildReponse("User registered successfully", userSaved));
  } catch (err) {
    res.status(500).json(buildErrorResponse(err.message));
  }
};
