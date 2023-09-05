async function init() {
    const response = await fetch("http://127.0.0.1:3000/goals/0");
    const data = await response.text();

    const goals = data.split("\n");

    for (let i = 0; i < goals.length; i++) {
        const values = goals[i].split(",");

        let div = document.createElement("a");
        let actualClub = document.createElement("img");
        let opponentClub = document.createElement("img");
        let against = document.createElement("p");
        let againstName = document.createElement("p");
        let info = document.createElement("p");
        let date = document.createElement("p");

        div.className = "card"
        div.href = "/goal/" + values[0];

        actualClub.className = "club actual";
        actualClub.src = "/img/" + formatName(values[2]) + ".webp";
        actualClub.alt = "Image";

        opponentClub.className = "club opponent";
        opponentClub.src = "/img/" + formatName(values[4]) + ".webp";
        opponentClub.alt = "Image";

        against.className = "against";
        against.textContent = "VS";

        againstName.className = "against-name";
        againstName.textContent = values[4];

        info.className = "info";
        info.innerHTML = "N°" + values[0] + "・50<i class=\"eye\"></i>";

        date.className = "date";
        date.textContent = values[3];

        div.appendChild(actualClub);
        div.appendChild(opponentClub);
        div.appendChild(against);
        div.appendChild(againstName);
        div.appendChild(info);
        div.appendChild(date);

        document.querySelector(".goals").appendChild(div);
    }

    let actual = 0;

    const interval = setInterval(() => {
        if (actual < goals.length) {
            actual++;
            document.querySelector(".goals-number").innerHTML = "SES " + actual + " BUTS";
        } else {
            clearInterval(interval);
        }
    }, 7);
}

function formatName(input) {
    return input.replaceAll(" ", "-").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}