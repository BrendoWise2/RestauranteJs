import React from "react";

function RestauranteView({ cliente }) {
    if (!cliente) {
        return <p>Nenhum cliente selecionado.</p>;
    }

    return (
        <div>
            <h2>Detalhes do cliente</h2>
            <p><strong>Nome:</strong> {cliente.nomeCliente}</p>
            <p><strong>CPF:</strong> {cliente.cpf}</p>
            <p><strong>Telefone:</strong> {cliente.telefone}</p>
            <p><strong>E-mail:</strong> {cliente.email}</p>
        </div>
    );
}

export default ClienteView;