const {get} = require("./goals");
const config = require("../assets/config.json");

const countries = config.countries.map(country => country.toLowerCase());
const cities = config.cities.map(city => city.toLowerCase());

server.get("/goal/:number", (request, response) => {
    const number = parseInt(request.params.number);
    const values = get(number).split(",");

    if (2 >= values.length || 1 > number) {
        response.render("error");
        response.status(404);
        return;
    }

    let method = values[9].toLowerCase();
    let assist = `et a été servi par ${values[10]} pour inscrire ce but.`

    if (method.includes("peno")) {
        method = method.replace("(peno)", "sur penalty.");
        assist = "";
    }

    const description = `
        Ce but a été marqué durant la saison ${values[1]}.
        Kylian a marqué ce but avec ${replace(values[2], 1)},
        et l'a inscrit face ${replace(values[4], 2)} en ${values[7]}.
        Le match s'est déroulé le ${values[3]} ${replace(values[6], 0)}
        et s'est terminé avec un score de ${values[8].replaceAll("-", "à")}.
        <br><br>Le gardien adverse lors du but était ${values[11]} !
        Kylian a marqué à la ${values[12].replaceAll("'", "ème")} minute du ${method} ${assist}
    `;

    response.render("goal", {
        "id": number,
        "previous": number - 1,
        "next": number + 1,
        "description": description
    });
});


function replace(word, type) {
    const vowel = ["a", "e", "i", "o", "u", "y"];
    const strongLetter = ["p", "r"];

    const startsWithVowel = startsWith(word, vowel);
    const startsWithStrongLetter = startsWith(word, strongLetter);

    const startsWithJ = word.toLowerCase().startsWith("j");
    const startsWithS = word.split(" ")[0].endsWith("s");

    const isCountry = countries.includes(word.toLowerCase());
    const isCity = cities.includes(word.toLowerCase());

    switch (type) {
        case 0:
            return (startsWithVowel ? "à l'" : "au ") + word;
        case 1:
            return (startsWithVowel ? "l'" : (startsWithStrongLetter ? "le " : "")) + word;
        case 2:
            if (startsWithVowel) {
                return (!startsWithS ? "à l'" : "à ") + word;
            }
            if (isCountry || (startsWithS && !isCity)) {
                return (word.endsWith("e") ? "à la " : (word.endsWith("ar") ? "à " : "au ")) + word;
            }
            return (startsWithStrongLetter && !isCity || startsWithJ ? "à la " : "à ") + word;
    }
    return "";
}

function startsWith(word, letters) {
    for (const letter of letters) {
        if (word.toLowerCase().startsWith(letter)) {
            return true;
        }
    }
    return false;
}