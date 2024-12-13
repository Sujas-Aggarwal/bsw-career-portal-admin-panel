let currentProfile;
async function showFormFields(profile) {
  const fragment = document.createDocumentFragment();
  document.querySelector(".main").innerHTML = "";
  Array.from(Object.keys(profile)).forEach((key) => {
    if (key === "id") return;
    const div = document.createElement("div");
    div.classList.add("form-field");
    div.classList.add(`form-field-${key}`);
    const label = document.createElement("label");
    label.classList.add("important");
    label.innerText = key.charAt(0).toUpperCase() + key.slice(1);
    const textarea = document.createElement("span");
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
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete Profile";
  buttonsDiv.appendChild(deleteBtn);
  buttonsDiv.appendChild(saveBtn);
  document.querySelector(".main").appendChild(buttonsDiv);
}
const profileButtonFunction = (profile, data) => {
  currentProfile = profile.name ?? "ok";
  showFormFields(profile);
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
getProfiles();
