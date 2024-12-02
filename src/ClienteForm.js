import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function ClienteForm({ restaurantes, atualizarLista }) {
    const [cliente, setCliente] = useState({
        nome: "",
        email: "",
        restauranteId: "",
        cpf:"",
        telefone:"",
        restaurante:""  // Adiciona o campo para o restaurante
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRestauranteChange = (e) => {
        setCliente((prev) => ({
            ...prev,
            restauranteId: e.value.id,  // Armazena o id do restaurante selecionado
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/cliente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente),
            });

            if (!response.ok) {
                throw new Error("Erro ao cadastrar cliente");
            }

            atualizarLista();  // Atualiza a lista de clientes após cadastro
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-field">
                <label htmlFor="nome">Nome</label>
                <InputText id="nome" name="nome" value={cliente.nome} onChange={handleChange} />
            </div>

            <div className="p-field">
                <label htmlFor="cpf">CPF</label>
                <InputText id="cpf" name="cpf" value={cliente.cpf} onChange={handleChange} />
            </div>

            <div className="p-field">
                <label htmlFor="telefone">Telefone</label>
                <InputText id="telefone" name="telefone" value={cliente.telefone} onChange={handleChange} />
            </div>

            <div className="p-field">
                <label htmlFor="email">Email</label>
                <InputText id="email" name="email" value={cliente.email} onChange={handleChange} />
            </div>

            <div className="p-field">
                <label htmlFor="restaurenteCliente">Restaurante do Cliente</label>
                <InputText id="restauranteCliente" name="restauranteCliente" value={cliente.restauranteCliente} onChange={handleChange} />
            </div>

            <div className="p-field">
                <label htmlFor="restaurante">Restaurante</label>
                <Dropdown
                    id="restaurante"
                    value={cliente.restauranteId}
                    options={restaurantes}
                    onChange={handleRestauranteChange}
                    optionLabel="nomeRestaurante"
                    optionValue="id"
                    placeholder="Selecione o Restaurante"
                />
            </div>

            <Button label="Cadastrar" type="submit" />
        </form>
    );
}

export default ClienteForm;
