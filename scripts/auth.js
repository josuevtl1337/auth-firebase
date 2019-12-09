//Cuidado con weak password 6 caracteres minimo

// listen for the auth state changes
auth.onAuthStateChanged(user => {
  //Si está logueado le cargo el html
  // get data
  if (user) {
    console.log("user logged in", user);
    // onSnapshot checkea cuando hay un cambio en la BD
    db.collection("guides")
      .onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
        setupUI(user);
      })
      .function(err => {
        console.log(err.message);
      });
  } else {
    console.log("user logged out");
    //Si no está logueado le cargo el HTML VACÍO
    setupGuides([]);
    setupUI();
  }
});

// funcion para cerrar el modal
function closeModal(param) {
  const modal = document.querySelector(param);
  M.Modal.getInstance(modal).close();
  signupForm.reset();
}

// create new guides
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", e => {
  e.preventDefault();
  db.collection("guides")
    .add({
      title: createForm["title"].value,
      content: createForm["content"].value
    })
    .then(() => {
      // close the modal and reset form
      closeModal("#modal-create");
      createForm.reset();
    });
});

// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // signup the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
    closeModal("#modal-signup");
  });
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("user signed out");
  });
});
// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  // get user input
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // console.log(cred.user);
    // close the modal form
    closeModal("#modal-login");
  });
});
