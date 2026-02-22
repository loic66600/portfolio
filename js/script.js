async function sendMail(event) {
    if (event) {
        event.preventDefault();
    }

    const payload = {
        access_key: "c239e419-ca30-4944-b34e-67340b76084e",
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";

            errorMessage.style.display = "none";
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 5000);

            return false;
        }

        successMessage.style.display = "none";
        errorMessage.style.display = "block";
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 5000);

        return false;
    } catch (error) {
        successMessage.style.display = "none";
        errorMessage.style.display = "block";
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 5000);

        return false;
    }
}