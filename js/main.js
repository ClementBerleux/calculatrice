document.getElementById('titre').innerText = "Console comptable";

// Faire une console de calcul

function calcul(operation = "") {
    if (operation.match(/['\+''\*''\/''=']/)) {
        if (operation.match(/[=]/)) {
            const index = operation.indexOf('=');
            return calcul(operation.substring(index + 1));
        }
        else {
            if (operation.match(/[\+]/)) {
                const index = operation.indexOf('+');
                //console.log("Addition : " + operation.substring(0, index) + " + " + operation.substring(index + 1));
                return calcul(operation.substring(0, index)) + calcul(operation.substring(index + 1));
            }
            else {
                if (operation.match(/[\*]/)) {
                    const index = operation.indexOf('*');
                    return calcul(operation.substring(0, index)) * calcul(operation.substring(index + 1));
                }
                else {
                    if (operation.match(/[\/]/)) {
                        const index = operation.indexOf('/');
                        return calcul(operation.substring(0, index)) / calcul(operation.substring(index + 1));
                    }
                }
            }
        }
    }
    else return parseFloat(operation);
}

function handleCalcul() {
    let operation = document.getElementById('resultat').value;
    operation = operation.replaceAll(" ", "");
    if (operation.length > 2) {
        if (operation.match(/[0-9.]$/)) {
            const index = operation.indexOf('=');
            if (index > 0) operation = operation.substring(index + 1);

            const operationAffichee = operation;
            if (operation[0] == "-") operation = "0" + operation;
            operation = operation.replaceAll("-", "+-");
            if (operation[0] == "+") operation[0] = "0";
            // console.log(operation);

            document.getElementById('resultat').value = operationAffichee + " = " + calcul(operation);
        }
    }
}

document.getElementById('egal').addEventListener("click", handleCalcul);

const touchesNumeriques = [
    { nom: "zero", affichage: 0 },
    { nom: "un", affichage: 1 },
    { nom: "deux", affichage: 2 },
    { nom: "trois", affichage: 3 },
    { nom: "quatre", affichage: 4 },
    { nom: "cinq", affichage: 5 },
    { nom: "six", affichage: 6 },
    { nom: "sept", affichage: 7 },
    { nom: "huit", affichage: 8 },
    { nom: "neuf", affichage: 9 }
];

for (let i = 0; i < touchesNumeriques.length; i++) {
    document.getElementById(touchesNumeriques[i].nom).addEventListener("click", () => document.getElementById('resultat').value += touchesNumeriques[i].affichage);
}

const touchesOperations = [
    { nom: "div", affichage: "/" },
    { nom: "mult", affichage: "*" },
    { nom: "plus", affichage: "+" }
];

for (let i = 0; i < touchesOperations.length; i++) {
    document.getElementById(touchesOperations[i].nom).addEventListener("click", () => {
        let affichage = document.getElementById('resultat').value;
        if (affichage.length > 0) {
            if (affichage.match(/['+''\-''\*''\/']$/)) {
                affichage = affichage.substring(0, affichage.length - 1) + touchesOperations[i].affichage;
            }
            else {
                const index = affichage.indexOf('=');
                if (index > 0) affichage = affichage.substring(index + 1);
                affichage += touchesOperations[i].affichage;
            }
            document.getElementById('resultat').value = affichage;
        }
    })
}

document.getElementById("moins").addEventListener("click", () => {
    let affichage = document.getElementById('resultat').value;
    if (affichage.length > 0) {
        if (affichage.match(/['+''\*''\/']$/)) {
            affichage = affichage.substring(0, affichage.length - 1) + "-";
        }
        else {
            const index = affichage.indexOf('=');
            if (index > 0) affichage = affichage.substring(index + 1);
            affichage += "-";
        }
        document.getElementById('resultat').value = affichage;
    }
    else document.getElementById('resultat').value = "-";
})

document.getElementById("point").addEventListener("click", () => {
    let affichage = document.getElementById('resultat').value;
    if (affichage.length > 0) {
        if (!affichage.match(/[\.][0-9]*$/)) document.getElementById('resultat').value = affichage + ".";
    }
    else document.getElementById('resultat').value = ".";
})

document.getElementById("raz").addEventListener("click", () => {
    document.getElementById('resultat').value = "";
})

document.getElementById("del").addEventListener("click", () => {
    let affichage = document.getElementById('resultat').value;

    if (affichage.length > 1) {
        if (affichage.match(/[=]/)) {
            const index = affichage.indexOf('=');
            affichage = affichage.substring(index + 1);
        }
        document.getElementById('resultat').value = affichage.substring(0, affichage.length - 1);
    }
    else document.getElementById('resultat').value = "";
})