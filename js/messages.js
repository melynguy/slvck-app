//add code here that is specific to the messages page (messages.html)

"use strict";

var currentUser;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;

        document.getElementById("user-name").textContent = user.displayName;
        var img = document.createElement("img");
        img.src = user.photoURL;

        var src = document.getElementById("profile-pic");
        src.appendChild(img);

    } else {
        window.location = "index.html";
    }
});

/* INPUTTING NEW MESSAGE DATA*/
var msgForm = document.querySelector(".new-msg-form");
var msgContent = msgForm.querySelector(".new-msg-content");
var msgList = document.querySelector(".msgList");
var msgsRef = firebase.database().ref("msgs");

msgForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    if(currentUser.emailVerified) {
        var msg = {
            content: msgContent.value,
            delete: false,
            edit: false,
            createdOn: firebase.database.ServerValue.TIMESTAMP,
            editedOn:firebase.database.ServerValue.TIMESTAMP,
            createdBy: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            }
        };
        msgsRef.push(msg);
        msgContent.value = "";
    }

});

/*RENDER MESSAGES*/
function renderMsgs(snapshot) {
    
    var msg = snapshot.val();
    var div = document.createElement("div");
    
    var div2 = document.createElement("div");
    div2.classList.add("msg-box");

    var image = document.createElement("img");
    image.src = msg.createdBy.photoURL;
    image.classList.add("user-image");
    div.appendChild(image);

    var msgContent = document.createElement("div");
    msgContent.textContent = msg.content;
    msgContent.classList.add("msg-content");
    div2.appendChild(msgContent);

    var msgCreation = document.createElement("div");
    msgCreation.textContent = moment(msg.createdOn).fromNow() + " by " + msg.createdBy.displayName;
    msgCreation.classList.add("msg-creation");
    div2.appendChild(msgCreation);

    if(currentUser.emailVerified) {
        /* DELETE BUTTON */
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("glyphicon", "glyphicon-trash");
        div2.appendChild(deleteButton);

        /* EDIT BUTTON */
        var editButton = document.createElement("button");
        editButton.classList.add("glyphicon", "glyphicon-pencil");
        div2.appendChild(editButton);

        editButton.addEventListener("click", function(evt) {
            var text = evt.target.parentNode.children[0];
            text.setAttribute('contenteditable', 'true');
            text = text.innerHTML;
            if(snapshot.val().createdBy.uid == currentUser.uid) {
                snapshot.ref.update({
                    content: text
                });
            }
            
        });

        deleteButton.addEventListener("click", function(evt) {
            if(snapshot.val().createdBy.uid == currentUser.uid) {
                confirm("This action is permanent. Are you sure?");  
                snapshot.ref.remove();
            }
        });
    }

    document.getElementById("general").addEventListener("click", function(evt) {
        msgsRef = firebase.database().ref("msgs");
        msgsRef.on("value", render);
    });

    document.getElementById("random").addEventListener("click", function(evt) {
        msgsRef = firebase.database().ref("msgs2");
        msgsRef.on("value", render);
    });


    div.appendChild(div2);
    msgList.appendChild(div);
}

function render(snapshot) {
    msgList.innerHTML = "";
    snapshot.forEach(renderMsgs);
    console.log();
}

msgsRef.on("value", render);

document.getElementById("sign-out-button").addEventListener("click", function() {
    firebase.auth().signOut();
});