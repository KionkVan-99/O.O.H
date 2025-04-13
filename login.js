import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "homepage.html"; // Redirect to homepage on successful login
    console.log("User logged in successfully"); // Log success message
    // Redirect to homepage on successful login
  } catch (error) {
    console.error("Error logging in: ", error);
  }
});
