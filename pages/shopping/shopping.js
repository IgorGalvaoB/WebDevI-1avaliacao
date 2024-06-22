function redirecionarParaPagamento(event) {
  event.preventDefault(); // Prevenir o comportamento padrão de submissão do formulário
  window.location.href = "../paymentMethods/paymentMethods.html"; // Redirecionar
}