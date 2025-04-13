import { db } from './firebase-config.js';
import { getDocs, collection, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const paymentRequestsDiv = document.getElementById("paymentRequests");

async function getPaymentRequests() {
  const querySnapshot = await getDocs(collection(db, "paymentRequests"));
  querySnapshot.forEach((doc) => {
    const paymentRequest = doc.data();
    const paymentDiv = document.createElement("div");
    paymentDiv.classList.add("bg-gray-100", "p-4", "rounded-lg", "shadow", "space-y-2");

    paymentDiv.innerHTML = `
      <p><strong>User:</strong> ${paymentRequest.email}</p>
      <p><strong>Amount Requested:</strong> ₦${paymentRequest.amount}</p>
      <button onclick="confirmPayment('${doc.id}', ${paymentRequest.amount})" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Confirm Payment</button>
    `;
    
    paymentRequestsDiv.appendChild(paymentDiv);
  });
}

async function confirmPayment(paymentId, amount) {
  const paymentRef = doc(db, "paymentRequests", paymentId);
  await updateDoc(paymentRef, { confirmed: true });

  // Add amount to user's balance
  // You will need to update the user's balance in the database as well.
  // Example update for user's balance:
  const userRef = doc(db, "users", paymentId);  // Assuming users' IDs are stored in paymentRequest
  await updateDoc(userRef, { balance: amount });

  alert("Payment confirmed!");
}

getPaymentRequests();
