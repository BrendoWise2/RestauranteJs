import React, { useState } from "react";

function ClienteForm({ restaurante }) {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cliente = {
            nome,
            cpf,
            telefone,
            email,
            restaurante: { id: restaurante.id },
        };

        try {
            const response = await fetch("/api/cliente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente),
            });

            if (response.ok) {
                setMessage("Cliente adicionado com sucesso!");
                setNome("");
                setCpf("");
                setTelefone("");
                setEmail("");
            } else {
                const data = await response.json();
                setMessage(`Erro: ${data.message}`);
            }
        } catch (error) {
            setMessage("Erro ao adicionar cliente.");
        }
    };

    return (
        <div>
            <h3>Adicionar Cliente</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>CPF:</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Adicionar Cliente</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ClienteForm;
//works