const registerForm = document.querySelector("#registerForm");
registerForm.addEventListener("submit", createUser);

function createUser(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    sendUserData(email, password);
}

function sendUserData(email, password) {
    const data = {
        email,
        password,
    };

    fetch("http://localhost:3030/users/register", {
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((user) => {
            if (user.code === 409) {
                throw new Error(user.message);
            }
            sessionStorage.setItem("email", user.email);
            sessionStorage.setItem("accessToken", user.accessToken);
        })
        .catch((e) => {
            const notification = document.querySelector(".notification");
            notification.textContent = e.message;
            setTimeout(() => {
                notification.textContent = "";
            }, 2000);
        });
}
