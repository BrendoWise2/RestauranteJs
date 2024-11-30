import React from "react";

function ClienteList({ clientes }) {
    // Verifica se há clientes cadastrados, caso contrário, exibe uma mensagem
    if (clientes.length === 0) {
        return <p>Não há clientes cadastrados.</p>;
    }

    return (
        <div>
            <h3>Lista de Clientes</h3>
            <ul>
                {clientes.map((cliente, index) => (
                    <li key={index}>
                        <strong>{cliente.nome}</strong> - {cliente.telefone}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClienteList;
