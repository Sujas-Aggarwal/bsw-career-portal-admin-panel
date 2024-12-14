let currentProfile;
let formValues = {};
async function deleteProfile() {
  const confirmation = confirm("Are you sure you want to delete this profile?");
  if (!confirmation) return;
  await fetch(`/profiles/${formValues.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    if (data.status !== 200){
      alert("An error occurred while deleting the profile");
    };
    location.reload();
  });
}
async function updateProfile() {
  const docId = formValues.id;
  delete formValues.id;
  await fetch(`/profiles/${docId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formValues }),
  }).then((data) => {
    if (data.status !== 200){
      alert("An error occurred while updating the profile");
    };
    location.reload();
  });
}
async function showFormFields(profile) {
  const fragment = document.createDocumentFragment();
  document.querySelector(".main").innerHTML = "";
  Array.from(Object.keys(profile)).forEach((key) => {
    if (key == "id") return;
    const div = document.createElement("div");
    div.classList.add("form-field");
    div.classList.add(`form-field-${key}`);
    const label = document.createElement("label");
    label.classList.add("important");
    label.innerText = key.charAt(0).toUpperCase() + key.slice(1);
    const textarea = document.createElement("span");
    textarea.addEventListener("input", (e) => {
      formValues[key] = e.target.innerText;
    });
    textarea.setAttribute("contenteditable", true);
    textarea.spellcheck = false;
    textarea.type = "text";
    textarea.innerText = profile[key];
    div.appendChild(label);
    div.appendChild(textarea);
    fragment.appendChild(div);
  });
  const h1 = document.createElement("h1");
  h1.innerText = profile.name;
  h1.classList.add("profile-name");
  fragment.prepend(h1);
  document.querySelector(".main").appendChild(fragment);
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons-main");
  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Save Profile";
  saveBtn.addEventListener("click", updateProfile);
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete Profile";
  deleteBtn.addEventListener("click", deleteProfile);
  buttonsDiv.appendChild(deleteBtn);
  buttonsDiv.appendChild(saveBtn);
  document.querySelector(".main").appendChild(buttonsDiv);
}
const profileButtonFunction = (profile, data) => {
  formValues = profile;
  currentProfile = profile.name ?? "ok";
  showFormFields(formValues);
};
async function getProfiles() {
  let response = await fetch("/profiles");
  let data = await response.json();
  console.log(data);
  const fragment = document.createDocumentFragment();
  Array.from(data).forEach((profile) => {
    const profileElement = document.createElement("button");
    profileElement.innerText = profile.name;
    profileElement.addEventListener("click", () => {
      profileButtonFunction(profile, data);
    });
    fragment.appendChild(profileElement);
  });
  document.querySelector(".loading-sidebar").remove();
  document.querySelector(".sidebar").appendChild(fragment);
}

async function createProfile() {
  const name = document.querySelector(".add-profile-input").value;
  if (!name || name.length == 0) return;
  await fetch("/profiles/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  }).then(() => {
    document.querySelector(".add-profile-input").value = "";
    document.querySelector(".popover-container").style.display = "none";
    location.reload();
  });
}
const addProfile = async () => {
  document.querySelector(".popover-container").style.display = "flex";
  document
    .querySelector(".create-profile-btn")
    .addEventListener("click", createProfile);
};

document
  .querySelector(".add-profile-btn")
  .addEventListener("click", addProfile);
document.querySelector(".close-popover-btn").addEventListener("click", () => {
  document.querySelector(".popover-container").style.display = "none";
  document
    .querySelector(".create-profile-btn")
    .removeEventListener("click", createProfile);
});
getProfiles();
