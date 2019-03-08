var main = {};

main.startGame = function (MAX_BUTTONS) {
    "use strict";
    var i, answer, setOfValues, btn, container;
    MAX_BUTTONS = typeof MAX_BUTTONS === "number" && MAX_BUTTONS > 0 ? MAX_BUTTONS : 16;
    setOfValues = new Set(); // creating an empty set.

    document.getElementById("main-body").onclick = function print(event) { //onClick listener to the Body
        var clickedElement, value;
        clickedElement = event.target; //getting the reference of the clicked object

        if (clickedElement.getAttribute("typeName") === "random-block") { //checking if the clicked object is a button using custom attribute
            clickedElement.classList.remove("unselectedClass"); //removing all the classes
            clickedElement.classList.add("selectedClass"); //adding a class to style the selected buttons
            value = parseInt(clickedElement.textContent, 10); //getting the integer value of the clicked button
            if (value === answer) { //validating
                alert("Congrats!");
                initGame(); // Restarting the game
            } 
            else if (clickedElement.textContent > answer) {
                alert("Wrong! This is too big.");
            } 
            else {
                alert("Wrong! i'm not that small");
            }
        }
    };
    
    window.onkeypress = function reset(event) { // when enter is pressed it will get the input and restart the game with that many boxes.
        if (event.which === 13) {
            main.startGame(parseInt(document.getElementById("max-buttons").value));
        }
    }

    function initGame() { // Initializer
        container = document.getElementById("container");
        if(container) { //removing previous buttons.
            container.remove();
        }
        container = document.createElement("div");
        container.id = "container";
        document.getElementById("main-body").appendChild(container);
        setOfValues = [];
        for (i = 1; i <= MAX_BUTTONS; i += 1) { //initializing array
            setOfValues[i] = i;
        } 
        for (i = 1; i <= MAX_BUTTONS; i += 1) { //getting random value for each button and adding class
            var temp = Math.floor((Math.random() * (MAX_BUTTONS-i+1) + i))
            btn = setOfValues[temp];
            setOfValues[temp] = setOfValues[i];
            setOfValues[i] = btn;
            btn = document.createElement("button");
            btn.textContent = setOfValues[i];
            btn.id = "box-" + i;
            btn.classList.add("unselectedClass");
            btn.setAttribute("typeName", "random-block"); //Testing setAttribute method
            document.getElementById("container").appendChild(btn); //adding created button to div-container
        }
        setOfValues = []; //clearing the set for reuse.

        answer = "box-" + Math.floor(Math.random() * MAX_BUTTONS + 1);
        answer = parseInt(document.getElementById(answer).textContent, 10); //choosing a random value from the created boxes
    }
    initGame();
};
main.startGame();