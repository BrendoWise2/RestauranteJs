import React, { useState, useEffect } from "react";

function MesasList({ restauranteId }) {
    const [mesas, setMesas] = useState([]);
    const [novaMesa, setNovaMesa] = useState({ numero: "", capacidade: "" });

    // Buscar mesas do restaurante
    useEffect(() => {
        fetch(`/mesa?restauranteId=${restauranteId}`)
            .then((response) => response.json())
            .then((data) => setMesas(data))
            .catch((error) => console.error("Erro ao buscar mesas:", error));
    }, [restauranteId]);

    // Adicionar mesa
    const adicionarMesa = () => {
        fetch("/mesa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...novaMesa, restauranteId }),
        })
            .then((response) => response.json())
            .then((mesa) => {
                setMesas([...mesas, mesa]);
                setNovaMesa({ numero: "", capacidade: "" }); // Limpar o formulário
            })
            .catch((error) => console.error("Erro ao adicionar mesa:", error));
    };

    return (
        <div>
            <h3>Mesas</h3>
            <ul>
                {mesas.map((mesa) => (
                    <li key={mesa.id}>
                        Mesa {mesa.numero} - Capacidade: {mesa.capacidade}
                    </li>
                ))}
            </ul>
            <h4>Adicionar Mesa</h4>
            <div>
                <input
                    type="text"
                    placeholder="Número"
                    value={novaMesa.numero}
                    onChange={(e) => setNovaMesa({ ...novaMesa, numero: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Capacidade"
                    value={novaMesa.capacidade}
                    onChange={(e) => setNovaMesa({ ...novaMesa, capacidade: e.target.value })}
                />
                <button onClick={adicionarMesa}>Adicionar</button>
            </div>
        </div>
    );
}

export default MesasList;
