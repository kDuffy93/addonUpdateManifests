var synth = window.speechSynthesis;
synth.cancel();


let border = document.createElement("div");
border.id = 'border';
border.style.width = "100vw";
border.style.height = "100vh";
border.style.border = "solid 15px gray";
border.style.position = "fixed";
border.style.top = 0;
border.style.left = 0;
border.style.zIndex = 100;
border.style.pointerEvents = 'none';

let body = document.getElementsByTagName("body")[0];
body.appendChild(border);
let alreadySpoken = false;

let saySentense = (sentense) => {
    return new Promise((resolve, reject) => {
        sentense = sentense.toLowerCase();
        let utterThis = new SpeechSynthesisUtterance(sentense);
        utterThis.pitch = 1;
        utterThis.rate = 1;
        synth.speak(utterThis);
        utterThis.addEventListener("end", () => {
            console.log("speaking Done");
            alreadySpoken = true;
            resolve();
        });
        utterThis.addEventListener("cancel", () => {
            removeSpeakingClasses();
            console.log(`speaking cancelled  `);
            reject();
        });
    });
};

let temp = () => {
    try {
        let border = document.getElementById("border");
        let gameName = document.getElementsByClassName("ipe-EventHeader_Fixture ")[0].textContent;
        let index;
        let indexLength;

        if (gameName.includes('vs')) {
            index = gameName.indexOf(" vs ");
            indexLength = 4;
        } else if (gameName.includes('@')) {
            index = gameName.indexOf(" @ ");
            indexLength = 3;
        } else {
            index = gameName.length;
            indexLength = 0;
        }

        let teamName1 = gameName.slice(0, index)
        let teamName2 = gameName.slice(index + indexLength)
        console.log(`${teamName1} versus ${teamName2}`);


        let field = document.getElementsByClassName("ml18-CommonAnimations_H2Text ")[0];


        
        let footballField = document.getElementsByClassName("ml12-CommonAnimations_H2Text")[0];
        let otherfootballField = document.getElementsByClassName("ml12-CommonAnimations_H3Text")[0];

                let parentField;

        if (!field) {
            field = document.getElementById('inningsStats-inning').childNodes[0];
            parentField = document.getElementById('inningsStatsPanel');
        }

        if (field.textContent == "Time Out") {

            console.log(field.textContent);
            if (!alreadySpoken) {
                if (!synth.speaking) {
                    saySentense(`${teamName1}`);
                }
            }


            if (document.title == `TO - ${teamName1}`) {
                document.title = `${teamName1}`;
                border.style.borderColor = 'red';
            } else {
                document.title = `TO - ${teamName1}`;
                border.style.borderColor = 'orange';
            }

        } else if (field.textContent.includes('Review')) {
            if (parentField.classList.contains('ml16-BaseballFieldView_Opaque')) {

               

                if (!alreadySpoken) {
                    if (!synth.speaking) {
                        saySentense(`${teamName1}`);
                    }
                }
                


                if (document.title == `TO - ${teamName1}`) {
                    document.title = `${teamName1}`;
                    border.style.borderColor = 'red';
                } else {
                    document.title = `TO - ${teamName1}`;
                    border.style.borderColor = 'orange';
                }

            } else {

                border.style.borderColor = "green";
                document.title = `${teamName1}`;
                alreadySpoken = false;

            }

        } else if (footballField.textContent.includes('TV Timeout') || otherfootballField.textContent.includes('Timeout')) {
            console.log("its a football game")
            console.log(field.textContent);
            if (!alreadySpoken) {
                if (!synth.speaking) {
                    saySentense(`${teamName1}`);
                }
            }


            if (document.title == `TO - ${teamName1}`) {
                document.title = `${teamName1}`;
                border.style.borderColor = 'red';
            } else {
                document.title = `TO - ${teamName1}`;
                border.style.borderColor = 'orange';
            }

        }
        else {
            console.log(field.textContent);
            border.style.borderColor = "green";
            document.title = `${teamName1}`;
            alreadySpoken = false;

        }
    } catch {
        console.log("No Fields loaded");
        alreadySpoken = false;

    }
};

const intervalID = setInterval(temp, 500);
console.log('version 5 change - added football compatability');