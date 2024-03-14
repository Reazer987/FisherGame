const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", createUser);

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

    fetch("http://localhost:3030/users/login", {
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((user) => {
            if (user.code === 403) {
                throw new Error(user.message);
            }
            sessionStorage.setItem("email", user.email);
            sessionStorage.setItem("accessToken", user.accessToken);
            sessionStorage.setItem("id", user._id);
        })
        .catch((e) => {
            const notification = document.querySelector(".notification");
            notification.textContent = e.message;
            setTimeout(() => {
                notification.textContent = "";
            }, 500);
        });
}
