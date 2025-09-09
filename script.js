document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    if (email === "" || message === "") {
        formMessage.style.color = "red";
        formMessage.textContent = "⚠️ Por favor, completá todos los campos.";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        formMessage.style.color = "red";
        formMessage.textContent = "⚠️ Ingresá un email válido.";
        return;
    }

    formMessage.style.color = "lightgreen";
    formMessage.textContent = "✅ ¡Mensaje enviado correctamente!";
    document.getElementById("contactForm").reset();
});
