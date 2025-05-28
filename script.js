let paises = [];

fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
        paises = data;
        mostrarPaises(paises);
    })
    .catch(error => console.error("Error al obtener los países:", error));

function mostrarPaises(lista) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    lista.forEach(pais => {
        const nombre = pais.translations?.spa?.common || pais.name.common || pais.name.official;
        const div = document.createElement("div");
        div.innerHTML = `
            <h2>${nombre}</h2>
            <img src="${pais.flags.svg}" alt="Bandera de ${nombre}">
            <p><strong>Región:</strong> ${pais.region}</p>
            <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
            <hr>
        `;
        resultado.appendChild(div);
    });
}

document.getElementById("buscar").addEventListener("input", function() {
    const texto = this.value.toLowerCase();
    const filtrados = paises.filter(pais => {
        const nombre = (pais.translations?.spa?.common || pais.name.common || pais.name.official).toLowerCase();
        return nombre.includes(texto);
    });
    mostrarPaises(filtrados);
});
