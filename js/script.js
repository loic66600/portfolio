document.addEventListener("DOMContentLoaded", function () {
    var forms = document.querySelectorAll(".js-contact-form");

    forms.forEach(function (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!form.reportValidity()) {
                return;
            }

            var submitButton = form.querySelector('button[type="submit"]');
            var defaultLabel = form.querySelector(".contact-submit-label");
            var loadingLabel = form.querySelector(".contact-submit-loading");
            var status = form.querySelector(".contact-form-status");

            submitButton.disabled = true;
            submitButton.setAttribute("aria-busy", "true");
            status.className = "contact-form-status";
            status.textContent = "";

            if (defaultLabel && loadingLabel) {
                defaultLabel.hidden = true;
                loadingLabel.hidden = false;
            }

            try {
                var response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        Accept: "application/json"
                    }
                });
                var result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message || "Le service d’envoi n’a pas accepté le message.");
                }

                form.reset();
                status.classList.add("is-success");
                status.textContent = "Votre message a bien été envoyé. Merci, je vous répondrai rapidement.";
            } catch (error) {
                status.classList.add("is-error");
                status.textContent = "L’envoi a échoué. Vous pouvez me contacter directement par email.";
            } finally {
                submitButton.disabled = false;
                submitButton.removeAttribute("aria-busy");

                if (defaultLabel && loadingLabel) {
                    defaultLabel.hidden = false;
                    loadingLabel.hidden = true;
                }
            }
        });
    });
});
