let form = document.querySelector("form");
let submit = document.querySelector("#submit");
let show = document.querySelector("#show");

submit.addEventListener("click", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const errorMessage = document.getElementById("error-message");

  if (!name || !age || !city) {
    errorMessage.textContent = "All fields are required.";
    return;
  }

  const user = { name, age, city };

  try {
    const response = await fetch("http://localhost:3000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    errorMessage.textContent = "";
    alert("User created successfully");
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});

show.addEventListener("click", showData);

async function showData() {
  try {
    const response = await fetch("http://localhost:3000/show");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    console.log(users);
    const userContainer = document.querySelector(".user-container");
    userContainer.innerHTML = "";
    users.forEach((element) => {
      userContainer.innerHTML += `
            <div class = "card">
                <h3>id: ${element._id}</h3>
                <h3>name: ${element.name}</h3>
                <h3>age: ${element.age}</h3>
                <h3>city: ${element.city}</h3>
                <button class="delete" data-id="${element._id}">Delete</button>
            </div>
        `;
    });

    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", (event) => {
        const userId = event.target.dataset.id;
        Delete(userId);
      });
    });
  } catch (error) {
    alert(error.message);
  }
}

function Delete(id) {
  fetch(`http://localhost:3000/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Deleted:", data);
      showData();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
