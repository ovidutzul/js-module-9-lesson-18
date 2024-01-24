const userInput = document.getElementById("userId");
const button = document.getElementById("searchUserButton");
const userList = document.getElementById("userList");

function generateNodes(userData) {
  const { name, email, phone, address: { city, street } } = userData;

  const ul = document.createElement("ul");

  const nameLi = document.createElement("li");
  nameLi.textContent = name;
  ul.append(nameLi);

  const emailLi = document.createElement("li");
  emailLi.textContent = email;
  ul.append(emailLi);

  const phoneLi = document.createElement("li");
  phoneLi.textContent = phone;
  ul.append(phoneLi);

  const cityLi = document.createElement("li");
  cityLi.textContent = city;
  ul.append(cityLi);

  const streetLi = document.createElement("li");
  streetLi.textContent = street;
  ul.append(streetLi);

  userList.append(ul);
}

button.addEventListener("click", () => {
  const userId = userInput.value;
  if (!userId || (userId > 0 && userId <= 10)) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(res => {
        userList.querySelectorAll('*').forEach(n => n.remove());

        if (Array.isArray(res)) {
          res.forEach(user => {
            generateNodes(user);
          });
        } else {
          generateNodes(res);
        }
      })
      .catch(err => console.error(err));
  } else {
    alert("Insert a valid id");
  }
});