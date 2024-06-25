// contactForm.js

import { app } from "./firebaseConfig.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore(app);

document.getElementById("forms").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const feedback = document.getElementById("feedback");

  // Clear previous feedback messages
  feedback.textContent = '';

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    feedback.textContent = 'Por favor, insira um endereço de e-mail válido.';
    feedback.style.color = 'red';
    return;
  }

  // Validate subject
  if (subject === "") {
    feedback.textContent = 'O campo de assunto não pode estar vazio.';
    feedback.style.color = 'red';
    return;
  }

  feedback.textContent = 'Enviando mensagem...';
  feedback.style.color = 'blue';

  try {
    const docRef = await addDoc(collection(db, "contacts"), {
      name,
      email,
      subject,
      message,
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    feedback.textContent = 'Mensagem enviada com sucesso!';
    feedback.style.color = 'green';
  } catch (e) {
    console.error("Error adding document: ", e);
    feedback.textContent = 'Erro ao enviar a mensagem. Tente novamente.';
    feedback.style.color = 'red';
  }

  // Reset the form
  document.getElementById("forms").reset();
});
