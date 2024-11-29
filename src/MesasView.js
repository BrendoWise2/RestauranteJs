import React from "react";

function RestauranteView({ mesas }) {
    if (!mesas) {
        return <p>Nenhuma mesa selecionado.</p>;
    }

    return (
        <div>
            <h2>Detalhes da mesa</h2>
            <p><strong>Número:</strong> {mesas.num}</p>
        </div>
    );
}

export default MesasView;