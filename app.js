class LecturaBiologica {
    constructor(lote, temperatura) {
        this.lote = lote;
        this.temperatura = parseFloat(temperatura);
        this.estado = (this.temperatura < 2 || this.temperatura > 8) ? "COMPROMETIDO" : "ÓPTIMO";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const btnRegistrar = document.getElementById("btnRegistrarTemp");
    const inputLote = document.getElementById("loteVacuna");
    const inputTemp = document.getElementById("tempActual");
    const gridLecturas = document.getElementById("gridLecturas");

    function obtenerHistorial() {
        const historial = localStorage.getItem("lecturasBiologicas");
        return historial ? JSON.parse(historial) : [];
    }

    function guardarHistorial(lecturas) {
        localStorage.setItem("lecturasBiologicas", JSON.stringify(lecturas));
    }

    function renderizarLecturas() {
        const lecturas = obtenerHistorial();
        gridLecturas.innerHTML = "";

        lecturas.forEach((lectura) => {
            const esComprometido = lectura.estado === "COMPROMETIDO";
            const colorClaseCard = esComprometido ? "border-danger bg-danger-subtle" : "border-success bg-success-subtle";
            const colorClaseBadge = esComprometido ? "bg-danger" : "bg-success";

            const colDiv = document.createElement("div");
            colDiv.className = "col-md-6 mb-3";

            colDiv.innerHTML = `
                <div class="card shadow-sm ${colorClaseCard} p-3 h-100">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Lote: ${lectura.lote}</h5>
                        <p class="card-text mb-1">Temperatura: <strong>${lectura.temperatura} °C</strong></p>
                        <span class="badge ${colorClaseBadge} fs-6">${lectura.estado}</span>
                    </div>
                </div>
            `;
            gridLecturas.appendChild(colDiv);
        });
    }

    btnRegistrar.addEventListener("click", () => {
        const lote = inputLote.value.trim();
        const temperatura = inputTemp.value;

        if (lote === "" || temperatura === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const nuevaLectura = new LecturaBiologica(lote, temperatura);
        const lecturas = obtenerHistorial();
        lecturas.push(nuevaLectura);
        guardarHistorial(lecturas);

        renderizarLecturas();

        inputLote.value = "";
        inputTemp.value = "";
        inputLote.focus();
    });

    renderizarLecturas();
});