import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useState } from "react";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

function ClienteForm({ atualizarLista }) {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [fieldErrors, setFieldErrors] = useState('');

    const salvarCliente = async (e) => {
        e.preventDefault();
        const cliente = { nome, cpf, telefone, email }
        try {
            const response = await fetch('http://localhost:8080/cliente',
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cliente)
                }
            );
            if (response.ok) {
                setMensagem('Cliente cadastrado com sucesso')
                setNome('');
                setCpf('');
                setTelefone('');
                setEmail('');
                atualizarLista();
            } else {
                const problema = await response.json();
                if (problema.titulo) {
                    setMensagem(problema.titulo);
                }
                if (Array.isArray(problema)) {
                    const errors = {};
                    problema.forEach((campo) => {
                        errors[campo.nome] = campo.mensagem;
                    })
                    setFieldErrors(errors);
                }
            }
        } catch (error) {
            setMensagem(error);
        }
    };

    return (
        <>
            <form onSubmit={salvarCliente} className="p-fluid"
                style={{ maxWidth: '600px', margin: '0 auto' }} >
                <div className="p-field" style={{ marginBottom: '20px' }}>
                    <label htmlFor="nome" style={{ fontWeight: 'bold' }}>
                        Nome
                    </label>
                    <InputText id="nome" value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome do cliente"
                        required className="p-inputtext-lg" />
                    {fieldErrors.nome && <Message severity="error" text={fieldErrors.nome}
                    />}
                </div>
                <div className="p-field" style={{ marginBottom: '20px' }}>
                    <label htmlFor="cpf" style={{ fontWeight: 'bold' }}>
                        CPF
                    </label>
                    <InputMask id="cpf" value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="Digite o cpf do cliente"
                        required className="p-inputtext-lg"
                        mask="999.999.999-99" />
                    {fieldErrors.cpf && <Message severity="error" text={fieldErrors.cpf}
                    />}
                </div>
                <div className="p-field" style={{ marginBottom: '20px' }}>
                    <label htmlFor="telefone" style={{ fontWeight: 'bold' }}>
                        Telefone
                    </label>
                    <InputMask id="telefone" value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="Digite o telefone do cliente"
                        required className="p-inputtext-lg"
                        mask="(99) 99999-9999" />
                    {fieldErrors.telefone && <Message severity="error" text={fieldErrors.telefone}
                    />}
                </div>
                <div className="p-field" style={{ marginBottom: '20px' }}>
                    <label htmlFor="email" style={{ fontWeight: 'bold' }}>
                        E-mail
                    </label>
                    <InputMask id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite o E-mail do cliente"
                        required className="p-inputtext-lg"
                    />
                    {fieldErrors.email && <Message severity="error" text={fieldErrors.email}
                    />}
                </div>
                <Divider />
                <Button label="Cadastrar Cliente" icon="pi pi-check" type="submit"
                    className="p-button-rounded p-button-lg" />

                {mensagem && (<Message severity="success" text={mensagem} style={{ marginTop: '20px' }} />)}

                {fieldErrors.global && (
                    <Message severity="error" text={fieldErrors.global} style={{ marginTop: '20px' }} />
                )}


            </form>
        </>
    );
}

export default ClienteForm;