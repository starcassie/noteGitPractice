window.onload = event => {
  // Firebase authentication goes here.
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Console log the user to confirm they are logged in
      console.log("Logged in as: " + user.displayName);
      const googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    }
  });
};

const getNotes = userId => {
  const notesRef = firebase.database().ref(`users/${userId}`);

  notesRef.on("value", snapshot => {
    const data = snapshot.val();
    renderDataAsHtml(data);
  });
};

//Given a list of notes, render them in HTML
const renderDataAsHtml = data => {
  let cards = "";
  for (const noteItem in data) {
    const note = data[noteItem];
    cards += createCard(note);
  }
  document.querySelector("#app").innerHTML = cards;
};

// Return a note object converted into an HTML card
const createCard = note => {
  return `
         <div class="column is-one-quarter">
         <div class="card">
           <header class="card-header">
             <p class="card-header-title">${note.title}</p>
           </header>
           <div class="card-content">
             <div class="content">${note.text}</div>
           </div>
         </div>
       </div> `;
};
