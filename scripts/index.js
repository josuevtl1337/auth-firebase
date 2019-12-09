//DOM manipulation
const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accDetail = document.querySelector(".account-details");

const setupUI = user => {
  if (user) {
    // account info
    const html = `
      <div>Logged in as ${user.email}</div>
    `;
    accDetail.innerHTML = html;
    // toggle UI elements
    loggedInLinks.forEach(item => (item.style.display = "block"));
    loggedOutLinks.forEach(item => (item.style.display = "none"));
  } else {
    // hide account info
    accDetail.innerHTML = "";
    // toggle UI elements
    loggedInLinks.forEach(item => (item.style.display = "none"));
    loggedOutLinks.forEach(item => (item.style.display = "block"));
  }
};
// setup guides
const setupGuides = data => {
  if (data.length) {
    let html = "";
    data.forEach(doc => {
      const guides = doc.data();
      const li = `
      <li>
      <div class="collapsible-header grey lighten-4">${guides.title}</div>
      <div class="collapsible-body white">${guides.content}</div>
      </li>
    `;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = `<h5 class="center-align">Login to see Guides</h5>`;
  }
};

// set-up Materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
