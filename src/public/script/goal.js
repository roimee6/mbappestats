async function init(number) {
    const response = await fetch("http://127.0.0.1:3000/goals/" + number);
    const data = await response.text();

    const values = data.split(",");

    let actual = document.createElement("img");
    let against = document.createElement("img");

    actual.src = "/img/" + formatName(values[2]) + ".webp";
    actual.alt = "Image";

    against.src = "/img/" + formatName(values[4]) + ".webp";
    against.alt = "Image";

    document.querySelector(".actual").appendChild(actual);
    document.querySelector(".against").appendChild(against);

    if (2 > number) {
        document.querySelector(".previous").remove();
    } else if (number >= values[15]) {
        document.querySelector(".next").remove();
    }
}

function formatName(input) {
    return input.replaceAll(" ", "-").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}