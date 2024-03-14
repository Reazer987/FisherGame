const logoutBtn = document.querySelector("#logout");
const loadBtn = document.querySelector(".load");
const catches = document.querySelector("#catches");
const addForm = document.querySelector("#addForm");

addForm.addEventListener("submit", addNewCatch);

logoutBtn.addEventListener("click", (e) => {
    sessionStorage.clear();
    location.reload();
});
loadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loadCatches();
});
function CheckUser() {
    const user = document.querySelector("#user");
    const guest = document.querySelector("#guest");

    const isUser = sessionStorage.getItem("email");

    if (isUser) {
        const email = document.querySelector(".email");
        email.textContent = email.textContent.replace("guest", isUser);
        user.style.display = "inline-block";
        guest.style.display = "none";
    } else {
        guest.style.display = "inline-block";
        user.style.display = "none";
    }
}

async function loadCatches() {
    const url = "http://localhost:3030/data/catches";
    const fetchAll = await fetch(url);
    const data = await fetchAll.json();

    data.forEach((x) => {
        createSingleCatch(x);
    });

    const updateBtns = document.querySelectorAll(".update");
    const deleteBtns = document.querySelectorAll(".delete");

    deleteBtns.forEach((x) =>
        x.addEventListener("click", (e) => {
            e.preventDefault();
            const elementID = e.currentTarget.getAttribute("data-id");

            deleteCatch(elementID);
        })
    );
    updateBtns.forEach((x) =>
        x.addEventListener("click", (e) => {
            const elementID = e.currentTarget.getAttribute("data-id");
            const inputElements = Array.from(
                e.currentTarget.parentNode.children
            );
            const angler = inputElements[1].value;
            const weight = inputElements[3].value;
            const species = inputElements[5].value;
            const location = inputElements[7].value;
            const bait = inputElements[9].value;
            const captureTime = inputElements[11].value;

            updateCatch(
                elementID,
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            );
        })
    );
}

async function deleteCatch(id) {
    try {
        const currentCatch = `http://localhost:3030/data/catches/${id}`;
        const token = sessionStorage.getItem("accessToken");
        const userId = sessionStorage.getItem("id");

        const data = await fetch(currentCatch);
        const res = await data.json();

        if (res._ownerId !== userId) {
            throw new Error("You are not the owner");
        }
        const options = {
            method: "DELETE",
            headers: {
                "X-Authorization": token,
            },
        };
        await fetch(currentCatch, options);
        location.reload();
    } catch (error) {
        alert(error.message);
    }
}

function createSingleCatch(data) {
    const catchDiv = document.createElement("div");
    catchDiv.classList = "catch";

    catchDiv.innerHTML = `<label>${data.angler}</label>
                        <input type="text" class="angler" value="${data.angler}">
                        <label>${data.weight}</label>
                        <input type="text" class="weight" value="${data.weight}">
                        <label>${data.species}</label>
                        <input type="text" class="species" value="${data.species}">
                        <label>${data.location}</label>
                        <input type="text" class="location" value="${data.location}">
                        <label>${data.bait}</label>
                        <input type="text" class="bait" value="${data.bait}">
                        <label>${data.captureTime}</label>
                        <input type="number" class="captureTime" value="${data.captureTime}">
                        <button class="update" data-id="${data._id}">Update</button>
                        <button class="delete" data-id="${data._id}">Delete</button>`;
    catches.appendChild(catchDiv);
}

async function updateCatch(
    id,
    angler,
    weight,
    species,
    location,
    bait,
    captureTime
) {
    const currentCatch = `http://localhost:3030/data/catches/${id}`;
    const data = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
    };
    const token = sessionStorage.getItem("accessToken");
    const options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "X-Authorization": token,
        },
    };
    await fetch(currentCatch, options);
    location.reload();
}

async function addNewCatch(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const url = "http://localhost:3030/data/catches";

    const { angler, weight, species, location, bait, captureTime } =
        Object.fromEntries(data);
    const userId = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("accessToken");

    const sendData = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
        _ownerId: userId,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
            "X-Authorization": token,
        },
    };

    await fetch(url, options);
}

CheckUser();
