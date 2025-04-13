import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Display email after login
const emailDisplay = document.getElementById("user-email");
const balance = document.getElementById("balance");
const payment = document.getElementById("payment");
let paid = 0;

// Check authentication status
onAuthStateChanged(auth, (user) => {
  if (user) {
    emailDisplay.textContent = "Logged in as: " + user.email;
    getBalance(user.uid);  // Fetch current balance
    // Start the balance increment function
    startBalanceIncrement(user.uid);
  } else {
    window.location.href = "login.html";
  }
});

// Logout functionality
document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});

// When the "Pay" button is clicked
document.getElementById("pay").addEventListener("click", () => {
  // Show confirmation popup for payment
  const paymentConfirmation = confirm("You can pay to our customer care line at this account: 9072519405 Palmpay.");
  if (paymentConfirmation) {
    // Simulate a payment received of ₦600
    const amount = 600;  // Example payment amount
    processPayment(amount);
  }
});

function processPayment(amount) {
  // Update payment progress and balance on the frontend
  paid += amount;
  balance.textContent = "₦" + paid;
  payment.textContent = "₦" + paid;

  // Add an extra ₦100 after payment confirmation
  const extraCredit = 100;
  paid += extraCredit;
  alert(`Payment confirmed! An extra ₦${extraCredit} has been credited to your account.`);

  // Update Firestore with the new balance
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    setDoc(userRef, { balance: paid }, { merge: true })
      .then(() => {
        console.log("Balance updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating balance: ", error);
      });
  }
}

function getBalance(userId) {
  const userRef = doc(db, "users", userId);
  getDoc(userRef).then((docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      paid = data.balance || 0;  // Use the existing balance if available
      balance.textContent = "₦" + paid;
      payment.textContent = "₦" + paid;
    } else {
      console.log("No balance data found.");
    }
  });
}

// Function to automatically increment the balance every second
function startBalanceIncrement(userId) {
  setInterval(() => {
    paid += 10;  // Increment balance by ₦10 every second (adjust as needed)
    balance.textContent = "₦" + paid;
    payment.textContent = "₦" + paid;

    // Update Firestore with the new balance
    const userRef = doc(db, "users", userId);
    setDoc(userRef, { balance: paid }, { merge: true })
      .then(() => {
        console.log("Balance incremented and updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating balance: ", error);
      });
  }, 1000);  // Every 1000 milliseconds (1 second)
}
