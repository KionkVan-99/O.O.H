import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user details in Firestore (including initial balance)
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      balance: 0  // Initialize with a zero balance
    });

    // Redirect user to the homepage after successful signup
    window.location.href = "homepage.html";
  } catch (error) {
    console.error("Error signing up: ", error);
  }
});
