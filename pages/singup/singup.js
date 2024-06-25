// signup.js

import { app } from "./firebaseConfig.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore(app);

document.getElementById("forms").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();
  const feedback = document.getElementById("feedback");

  // Clear previous feedback messages
  feedback.textContent = '';

  // Validate phone number
  const phonePattern = /^\(\d{2}\) \d \d{4}-\d{4}$/;
  if (!phonePattern.test(phone)) {
    feedback.textContent = 'Por favor, insira um número de telefone válido no formato (99) 9 9999-9999.';
    feedback.style.color = 'red';
    return;
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    feedback.textContent = 'Por favor, insira um endereço de e-mail válido.';
    feedback.style.color = 'red';
    return;
  }

  // Validate password length
  if (password.length < 6) {
    feedback.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    feedback.style.color = 'red';
    return;
  }

  // Validate password match
  if (password !== confirmPassword) {
    feedback.textContent = 'As senhas não correspondem.';
    feedback.style.color = 'red';
    return;
  }

  feedback.textContent = 'Enviando dados...';
  feedback.style.color = 'blue';

  try {
    const docRef = await addDoc(collection(db, "users"), {
      name,
      phone,
      email,
      password, // Note: In a real application, never store plain text passwords. Use proper hashing.
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    feedback.textContent = 'Cadastro realizado com sucesso!';
    feedback.style.color = 'green';
  } catch (e) {
    console.error("Error adding document: ", e);
    feedback.textContent = 'Erro ao realizar cadastro. Tente novamente.';
    feedback.style.color = 'red';
  }

  // Reset the form
  document.getElementById("forms").reset();
});
