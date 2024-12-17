import React, { useState, useEffect } from "react";

function ReservasList() {
    const [reservas, setReservas] = useState([]);
    const [novaMesa, setNovaMesa] = useState({ numero: "", capacidade: "" });

    // Buscar reservas do restaurante
    useEffect(() => {
        fetch(`/mesa?restauranteId=${restauranteId}`)
            .then((response) => response.json())
            .then((data) => setReservas(data))
            .catch((error) => console.error("Erro ao buscar reservas:", error));
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
                setReservas([...reservas, mesa]);
                setNovaMesa({ numero: "", capacidade: "" }); // Limpar o formulário
            })
            .catch((error) => console.error("Erro ao adicionar mesa:", error));
    };

    return (
        <div>
            <h3>reservas</h3>
            <ul>
                {reservas.map((mesa) => (
                    <li key={mesa.id}>
                        Mesa {mesa.numero} - Capacidade: {mesa.capacidade}
                    </li>
                ))}
            </ul>
            <h4>Adicionar Mesa</h4>
            <div>
            <input
                    type="text"
                    placeholder="Reserva"
                    value={reservas.numReserva}
                    onChange={(e) => setReservas({ ...novaMesa, numReserva: e.target.value })}
                />
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

export default reservasList;
