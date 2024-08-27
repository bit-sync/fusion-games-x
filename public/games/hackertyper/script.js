var Typer = {
  text: null,
  accessCountimer: null,
  index: 0, // current cursor position
  speed: 3, // speed of the Typer
  file: "code.txt", //file, must be setted
  accessCount: 0, //times alt is pressed for Access Granted
  deniedCount: 0, //times caps is pressed for Access Denied
  init: function () {
    // inizialize Hacker Typer
    accessCountimer = setInterval(function () {
      Typer.updLstChr();
    }, 500); // inizialize timer for blinking cursor

    fetch(Typer.file)
      .then((response) => response.text())
      .then((data) => {
        Typer.text = data;
      });
  },

  content: function () {
    return document.querySelector("#console").innerHTML; // get console content
  },

  write: function (str) {
    // append to console content
    document.querySelector("#console").innerHTML =
      document.querySelector("#console").innerHTML + str;
    return false;
  },

  makeAccess: function () {
    //create Access Granted popUp
    Typer.hidepop(); // hide all popups
    Typer.accessCount = 0; //reset count
    document.querySelector("#gran").style.display = "block";
    return false;
  },

  makeDenied: function () {
    //create Access Denied popUp
    Typer.hidepop(); // hide all popups
    Typer.deniedCount = 0; //reset count
    document.querySelector("#deni").style.display = "block";
    return false;
  },

  hidepop: function () {
    // hide pop ups
    document.querySelector("#deni").style.display = "none";
    document.querySelector("#gran").style.display = "none";
  },
  addText: function (key) {
    //Main function to add the code
    if (key.keyCode == 18) {
      // key 18 = alt key
      Typer.accessCount++; //increase counter
      if (Typer.accessCount >= 3) {
        // if it's presed 3 times
        Typer.makeAccess(); // make access popup
      }
    } else if (key.keyCode == 17) {
      // key 20 = caps lock
      Typer.deniedCount++; // increase counter
      if (Typer.deniedCount >= 3) {
        // if it's pressed 3 times
        Typer.makeDenied(); // make denied popup
      }
    } else if (key.keyCode == 27) {
      // key 27 = esc key
      Typer.hidepop(); // hide all popups
    } else if (Typer.text) {
      // otherway if text is loaded
      var cont = Typer.content(); // get the console content
      if (cont.substring(cont.length - 1, cont.length) == "|")
        // if the last char is the blinking cursor
        document.querySelector("#console").innerHTML = document
          .querySelector("#console")
          .innerHTML.substring(0, cont.length - 1); // remove it before adding the text
      if (key.keyCode != 8) {
        // if key is not backspace
        Typer.index += Typer.speed; // add to the index the speed
      } else {
        if (Typer.index > 0)
          // else if index is not less than 0
          Typer.index -= Typer.speed; //     remove speed for deleting text
      }
      // var text = $('<div/>').text(Typer.text.substring(0, Typer.index)).html(); // parse the text for stripping html enities
      var text = Typer.text.substring(0, Typer.index);
      var rtn = new RegExp("\n", "g"); // newline regex
      var rts = new RegExp("\\s", "g"); // whitespace regex
      var rtt = new RegExp("\\t", "g"); // tab regex

      document.querySelector("#console").innerHTML = text
        .replace(rtn, "<br/>")
        .replace(rtt, "&nbsp;&nbsp;&nbsp;&nbsp;")
        .replace(rts, "&nbsp;");
      // replace newline chars with br, tabs with 4 space and blanks with an html blank
      window.scrollBy(0, 50); // scroll to make sure bottom is always visible
    }
    if (key.preventDefault && key.keyCode != 122) {
      // prevent F11(fullscreen) from being blocked
      key.preventDefault();
    }
    if (key.keyCode != 122) {
      // otherway prevent keys default behavior
      key.returnValue = false;
    }
  },

  updLstChr: function () {
    // blinking cursor
    var cont = this.content(); // get console
    if (cont.substring(cont.length - 1, cont.length) == "|")
      // if last char is the cursor
      document.querySelector("#console").innerHTML = document
        .querySelector("#console")
        .innerHTML.substring(0, cont.length - 1);
    else this.write("|"); // else write it
  },
};

Typer.init();

document.addEventListener("touchstart", (e) => {
  document.querySelector(".settings").style.display = "none";
  Typer.addText(e); //Capture the tap event for mobileand call the addText, this is executed on page load
});

document.addEventListener("keydown", (e) => {
  document.querySelector(".settings").style.display = "none";
  Typer.addText(e); //Capture the keydown event and call the addText, this is executed on page load
});

document.querySelector("#showhelp").addEventListener("click", (e) => {
  document.querySelector(".settings").style.display = "block";
});

document.querySelector(".settings-btn").addEventListener("click", (e) => {
  document.querySelector(".settings").style.display = "none";
});
