import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Message } from "primereact/message";
import { Button } from "primereact/button";

function RestauranteForm({ atualizarLista }) {
    const [nomeRestaurante, setNomeRestaurante] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [proprietarioRestaurante, setProprietarioRestaurante] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const salvarRestaurante = async (e) => {
        e.preventDefault();
        const restaurante = { nomeRestaurante, cnpj, endereco, telefone, email, proprietarioRestaurante };

        try {
            const response = await fetch('http://localhost:8080/restaurante', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(restaurante)
            });

            if (response.ok) {
                setMensagem('Restaurante cadastrado com sucesso!');
                setNomeRestaurante('');
                setCnpj('');
                setEndereco('');
                setTelefone('');
                setEmail('');
                setProprietarioRestaurante('');
                atualizarLista();  // Atualiza a lista de restaurantes
                setFieldErrors({});
            } else {
                const problema = await response.json();
                if (Array.isArray(problema)) {
                    const errors = {};
                    problema.forEach((campo) => {
                        errors[campo.nome] = campo.mensagem;
                    });
                    setFieldErrors(errors);
                }
                setMensagem(problema.titulo || 'Erro ao cadastrar restaurante');
            }
        } catch (error) {
            setMensagem('Erro ao conectar ao servidor!!!');
        }
    };

    return (
        <form onSubmit={salvarRestaurante} className="p-fluid" style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Campos de entrada do restaurante */}
            <div className="p-field">
                <label htmlFor="nomeRestaurante">Nome do Restaurante</label>
                <InputText id="nomeRestaurante" value={nomeRestaurante} onChange={(e) => setNomeRestaurante(e.target.value)} placeholder="Nome do restaurante" required />
                {fieldErrors.nomeRestaurante && <Message severity="error" text={fieldErrors.nomeRestaurante} />}
            </div>
            <div className="p-field">
                <label htmlFor="cnpj">CNPJ</label>
                <InputMask id="cnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)} mask="99.999.999/9999-99" required />
                {fieldErrors.cnpj && <Message severity="error" text={fieldErrors.cnpj} />}
            </div>
            <div className="p-field">
                <label htmlFor="endereco">Endereço</label>
                <InputText id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço do restaurante" required />
                {fieldErrors.endereco && <Message severity="error" text={fieldErrors.endereco} />}
            </div>
            <div className="p-field">
                <label htmlFor="telefone">Telefone</label>
                <InputMask id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} mask="(99) 99999-9999" required />
                {fieldErrors.telefone && <Message severity="error" text={fieldErrors.telefone} />}
            </div>
            <div className="p-field">
                <label htmlFor="email">E-mail</label>
                <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail do restaurante" required />
                {fieldErrors.email && <Message severity="error" text={fieldErrors.email} />}
            </div>
            <div className="p-field">
                <label htmlFor="proprietarioRestaurante">Nome do Proprietário</label>
                <InputText id="proprietarioRestaurante" value={proprietarioRestaurante} onChange={(e) => setProprietarioRestaurante(e.target.value)} placeholder="Nome do proprietário" required />
                {fieldErrors.proprietarioRestaurante && <Message severity="error" text={fieldErrors.proprietarioRestaurante} />}
            </div>
            <Button label="Cadastrar Restaurante" icon="pi pi-check" type="submit" className="p-button-rounded p-button-lg" />
            {mensagem && <Message severity="success" text={mensagem} />}
        </form>
    );
}

export default RestauranteForm;
