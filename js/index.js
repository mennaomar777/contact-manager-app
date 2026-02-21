let fullName = document.getElementById("fullName");
let phoneNumber = document.getElementById("phoneNumber");
let email = document.getElementById("email");
let address = document.getElementById("address");
let group = document.getElementById("group");
let notes = document.getElementById("notes");
let isFavorite = document.getElementById("isFavorite");
let isEmergency = document.getElementById("isEmergency");
let rowData = document.getElementById("rowData");
let saveContactBtn = document.getElementById("saveContactBtn");
let updateContactBtn = document.getElementById("updateContactBtn");
let searchInput = document.getElementById("searchInput");
let totalContacts = document.getElementById("totalContacts");
let favourites = document.getElementById("favourites");
let emergency = document.getElementById("emergency");
let favouritesList = document.getElementById("favouritesList");
let emergencyList = document.getElementById("emergencyList");
let total = document.getElementById("total");
let photoInput = document.getElementById("photoInput");
let photoPreview = document.querySelector(".contact-photo-preview");
let selectedPhoto = "";

let index;
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
displayContacts(contacts);
photoInput.addEventListener("change", () => {
  let file = photoInput.files[0];
  if (file) {
    let reader = new FileReader();

    reader.onload = function (e) {
      selectedPhoto = e.target.result;

      photoPreview.innerHTML = `<img src="${selectedPhoto}" class="w-100 h-100 object-fit-cover rounded-circle">`;
    };
    reader.readAsDataURL(file);
  }
});
function createContact() {
  let isNameValid = validateInputs(fullName);
  let isPhoneValid = validateInputs(phoneNumber);
  let isEmailValid = validateInputs(email);

  if (isNameValid && isPhoneValid && isEmailValid) {
    let contact = {
      fullName: fullName.value.trim(),
      phoneNumber: phoneNumber.value.trim(),
      email: email.value.trim(),
      address: address.value.trim(),
      group: group.value,
      notes: notes.value.trim(),
      isFavorite: isFavorite.checked,
      isEmergency: isEmergency.checked,
      photo: selectedPhoto || "",
    };

    const phoneExists = contacts.some(
      (c) => c.phoneNumber === phoneNumber.value.trim(),
    );

    if (phoneExists) {
      Swal.fire({
        icon: "warning",
        title: "Phone number already exists",
        text: "This phone number is already in your contacts.",
        confirmButtonText: "OK",
      });
      return;
    }
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts(contacts);
    clearForm();

    var addContactModal = document.getElementById("addContactModal");
    var modal = bootstrap.Modal.getInstance(addContactModal);
    modal.hide();

    Swal.fire({
      title: "Contact Added",
      text: "The contact has been successfully added.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid input",
      text: "Please enter a valid name, phone number, and email.",
    });
  }
}

function clearForm() {
  fullName.value = null;
  phoneNumber.value = null;
  email.value = null;
  address.value = null;
  group.value = null;
  notes.value = null;
  isFavorite.checked = false;
  isEmergency.checked = false;
  selectedPhoto = "";
  photoPreview.innerHTML = `<i class="fas fa-user"></i>`;
}
function displayContacts(arr) {
  let cartoona = "";
  if (arr.length == 0) {
    cartoona += `
        <div class="col-12 text-center py-5">
    <div class="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-3 bg-light"
       >
        <i class="fa-solid fa-address-book text-secondary" style="font-size:32px;"></i>
    </div>

    <p class="text-secondary fw-medium mb-1">No contacts found</p>
    <p class="text-muted small">Click "Add Contact" to get started</p>
</div>
  
`;
  } else {
    for (let i = 0; i < arr.length; i++) {
      cartoona += `
    <div class="col-12 col-md-6">
      <div class="card border-0 shadow-sm rounded-4 h-100">

        <div class="card-body p-3">

          <div class="d-flex align-items-center gap-3 mb-2">
            <div class="name-icon text-white users position-relative card-photo p-0 d-flex justify-content-center align-items-center
            ${arr[i].isFavorite ? "favorite-icon" : ""} 
            ${arr[i].isEmergency ? "emergency-icon" : ""}">
              ${
                arr[i].photo
                  ? `<img src="${arr[i].photo}" class="w-100 h-100 object-fit-cover rounded-3">`
                  : `<span class="fw-semibold">${handleNameLetters(arr[i].fullName)}</span>`
              }
            </div>

            <div>
              <h2 class="text-capitalize mb-0 fs-6">${arr[i].fullName}</h2>

              <div class="d-flex align-items-center gap-2 my-1">
                <div class="icon-container small-blue-phone">
                  <i class="fas fa-phone"></i>
                </div>
                <span class="text-muted ph-num">${arr[i].phoneNumber}</span>
              </div>
            </div>
          </div>

          <div class="my-2">
            <div class="d-flex align-items-center gap-2 my-2">
              <div class="icon-container small-email">
                <i class="fas fa-envelope"></i>
              </div>
              <span class="text-muted ph-num">${arr[i].email}</span>
            </div>

            <div class="d-flex align-items-center gap-2 my-1">
              <div class="icon-container small-location">
                <i class="fas fa-location-dot"></i>
              </div>
              <span class="text-muted ph-num">${arr[i].address}</span>
            </div>
          </div>

          <div class="d-flex gap-2 badges mt-3">
            <div class="group-container d-flex justify-content-center align-items-center px-2 py-1 text-capitalize fw-semibold">
              ${arr[i].group}
            </div>

            ${
              arr[i].isEmergency
                ? `
                <div class="emergency-container d-flex justify-content-center align-items-center px-2 py-1 text-capitalize fw-semibold">
                  <i class="fas fa-heartbeat me-1"></i> emergency
                </div>`
                : ""
            }
          </div>

        </div>

        <div class="card-footer rounded-bottom-4">
          <div class="d-flex justify-content-between align-items-center">

            <div class="d-flex gap-2">
              <a href="tel:${arr[i].phoneNumber}">
                <div class="icon-container green-phone">
                  <i class="fas fa-phone"></i>
                </div>
              </a>

              <a href="mailto:${arr[i].email}">
                <div class="icon-container envelope">
                  <i class="fas fa-envelope"></i>
                </div>
              </a>
            </div>

            <div class="d-flex gap-2">

              <div onClick="toggleFavourite(${i})"
                   class="icon-container star ${arr[i].isFavorite ? "active" : ""}">
                <i class="${arr[i].isFavorite ? "fas fa-star" : "far fa-star"}"></i> 
              </div>

              <div onClick="toggleEmergency(${i})"
                   class="icon-container heartbeat ${arr[i].isEmergency ? "active" : ""}">
                  <i class="${arr[i].isEmergency ? "fas fa-heartbeat" : "far fa-heart"}"></i>  
              </div>

              <div onClick="preUpdate(${i})"
                   class="icon-container pen">
                <i class="fas fa-pen"></i>
              </div>

              <div onClick="deleteContact(${i})"
                   class="icon-container trash">
                <i class="fas fa-trash"></i>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
    `;
    }
  }

  rowData.innerHTML = cartoona;
  displayCardsNums();
  displayFavoritesCard();
  displayEmergencyCard();
}

function displayCardsNums() {
  let favCount = 0;
  let emerCount = 0;
  if (contacts.length == 0) {
    favCount = 0;
    emerCount = 0;
    total = 0;
  } else {
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].isFavorite) favCount += 1;
      if (contacts[i].isEmergency) emerCount += 1;
    }
  }
  favourites.innerHTML = favCount;
  emergency.innerHTML = emerCount;
  totalContacts.innerHTML = contacts.length;
  total.innerHTML = contacts.length;
}
function displayFavoritesCard() {
  let cartoona = "";
  let hasFavorites = false;
  if (contacts.length == 0) {
    cartoona += `
     <div class="text-center p-5 text-muted">
        <i class="fas fa-star fa-1x mb-2"></i>
        <p class="mb-0">No favorite contacts yet!</p>
      </div>`;
  } else {
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].isFavorite) {
        hasFavorites = true;
        cartoona += `<div class="d-flex align-items-center justify-content-between m-2 bg-light p-3 rounded-3 favourite-person">
        <div class="d-flex align-items-center gap-3">
      <div class="favourites-name-icon text-white users position-relative rounded-3 p-0 d-flex justify-content-center align-items-center small-card-img">
           ${
             contacts[i].photo
               ? `<img src="${contacts[i].photo}" class="w-100 h-100 object-fit-cover rounded-3">`
               : `<span class="fw-semibold">${handleNameLetters(contacts[i].fullName)}</span>`
           }
        </div>
        <div>
            <h2 class="text-capitalize mb-0 fs-6">${contacts[i].fullName}</h2>
            <div class="d-flex align-items-center gap-2 my-1">
                <span class="text-muted ph-num">${contacts[i].phoneNumber}</span>
            </div>
        </div>
        </div>
     <div class="icon-container favourites-green-phone "><i class="fas fa-phone"></i></div>
      </div>`;
      }
    }
    if (!hasFavorites) {
      cartoona = `
        <div class="text-center p-5 text-muted">
          <i class="fas fa-star fa-1x mb-2"></i>
          <p class="mb-0">No favorite contacts yet!</p>
        </div>
      `;
    }
  }
  favouritesList.innerHTML = cartoona;
}
function displayEmergencyCard() {
  let cartoona = "";
  let hasEmergency = false;
  if (contacts.length == 0) {
    cartoona += `
     <div class="text-center p-5 text-muted">
        <i class="fas fa-heart-broken fa-1x mb-2"></i>
        <p class="mb-0">No emergency contacts yet!</p>
      </div>`;
  } else {
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].isEmergency) {
        hasEmergency = true;
        cartoona += `<div class="d-flex align-items-center justify-content-between m-2 bg-light p-3 rounded-3 emergency-person">
        <div class="d-flex align-items-center gap-3">
       <div class="favourites-name-icon text-white users position-relative rounded-3 p-0 d-flex justify-content-center align-items-center small-card-img">
           ${
             contacts[i].photo
               ? `<img src="${contacts[i].photo}" class="w-100 h-100 object-fit-cover rounded-3">`
               : `<span class="fw-semibold">${handleNameLetters(contacts[i].fullName)}</span>`
           }
        </div>
        <div>
            <h2 class="text-capitalize mb-0 fs-6">${contacts[i].fullName}</h2>
            <div class="d-flex align-items-center gap-2 my-1">
                <span class="text-muted ph-num">${contacts[i].phoneNumber}</span>
            </div>
        </div>
        </div>
     <div class="icon-container favourites-red-phone "><i class="fas fa-phone"></i></div>
      </div>`;
      }
    }
    if (!hasEmergency) {
      cartoona = `
        <div class="text-center p-5 text-muted">
          <i class="fas fa-heart-broken fa-1x mb-2"></i>
          <p class="mb-0">No emergency contacts yet!</p>
        </div>
      `;
    }
  }
  emergencyList.innerHTML = cartoona;
}

function deleteContact(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger mx-2",
      cancelButton: "btn btn-outline-secondary mx-2",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Delete this contact?",
      text: "This contact will be permanently removed from your list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        contacts.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        displayContacts(contacts);

        swalWithBootstrapButtons.fire({
          title: "Contact deleted",
          text: "The contact has been successfully removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
}

function preUpdate(i) {
  index = i;
  var addContactModal = document.getElementById("addContactModal");
  var modal = bootstrap.Modal.getOrCreateInstance(addContactModal);
  modal.show();

  fullName.value = contacts[i].fullName;
  phoneNumber.value = contacts[i].phoneNumber;
  email.value = contacts[i].email;
  address.value = contacts[i].address;
  group.value = contacts[i].group;
  notes.value = contacts[i].notes;
  isFavorite.checked = contacts[i].isFavorite;
  isEmergency.checked = contacts[i].isEmergency;
  selectedPhoto = contacts[i].photo;

  updateContactBtn.classList.remove("d-none");
  saveContactBtn.classList.add("d-none");

  if (selectedPhoto) {
    photoPreview.innerHTML = `<img src="${selectedPhoto}" class="w-100 h-100 object-fit-cover rounded-circle">`;
  } else {
    photoPreview.innerHTML = `<i class="fas fa-user"></i>`;
  }
}
function updateContact() {
  contacts[index].fullName = fullName.value;
  contacts[index].phoneNumber = phoneNumber.value;
  contacts[index].email = email.value;
  contacts[index].address = address.value;
  contacts[index].group = group.value;
  contacts[index].notes = notes.value;
  contacts[index].isFavorite = isFavorite.checked;
  contacts[index].isEmergency = isEmergency.checked;
  contacts[index].photo = selectedPhoto;

  var addContactModal = document.getElementById("addContactModal");
  var modal = bootstrap.Modal.getInstance(addContactModal);
  modal.hide();

  Swal.fire({
    title: "Updated!",
    text: "The contact has been updated successfully.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });

  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts(contacts);
  clearForm();
  updateContactBtn.classList.add("d-none");
  saveContactBtn.classList.remove("d-none");
}
function search() {
  let newArr = [];
  for (let i = 0; i < contacts.length; i++) {
    if (
      contacts[i].fullName
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      contacts[i].phoneNumber
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      contacts[i].email.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      newArr.push(contacts[i]);
    }
  }
  displayContacts(newArr);
}
function toggleFavourite(i) {
  contacts[i].isFavorite = !contacts[i].isFavorite;
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts(contacts);
}
function toggleEmergency(i) {
  contacts[i].isEmergency = !contacts[i].isEmergency;
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts(contacts);
}
function handleNameLetters(name) {
  name = name.trim();
  let firstChar = name.charAt(0).toUpperCase();
  let spaceIndex = name.indexOf(" ");

  if (spaceIndex !== -1 && spaceIndex + 1 < name.length) {
    let secondChar = name.charAt(spaceIndex + 1).toUpperCase();

    return `${firstChar}${secondChar}`;
  }

  return firstChar;
}

function validateInputs(element) {
  const regex = {
    fullName: /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/,
    phoneNumber: /^01[0125][0-9]{8}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
fullName.addEventListener("input", () => validateInputs(fullName));
phoneNumber.addEventListener("input", () => validateInputs(phoneNumber));
email.addEventListener("input", () => validateInputs(email));
