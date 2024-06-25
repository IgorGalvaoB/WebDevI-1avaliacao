// login.js

import { app } from "./firebaseConfig.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);

document.getElementById("forms").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("input[name='email']").value.trim();
  const password = document.querySelector("input[name='pass']").value.trim();
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

  // Validate password
  if (password.length < 6) {
    feedback.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    feedback.style.color = 'red';
    return;
  }

  feedback.textContent = 'Enviando dados...';
  feedback.style.color = 'blue';

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuário logado: ", user);
    feedback.textContent = 'Login realizado com sucesso!';
    feedback.style.color = 'green';
    // Redirecionar para outra página, se necessário
    // window.location.href = 'pagina_de_destino.html';
  } catch (error) {
    console.error("Erro durante o login: ", error);
    feedback.textContent = 'Erro ao realizar login. Tente novamente.';
    feedback.style.color = 'red';
  }

  // Reset the form (opcional)
  // document.getElementById("forms").reset();
});
