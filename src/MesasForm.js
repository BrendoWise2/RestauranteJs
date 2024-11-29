import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useState } from "react";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

function MesasForm({ atualizarLista }) {

    const [num, setNum] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [fieldErrors, setFieldErrors] = useState('');

    const salvarMesas = async (e) => {
        e.preventDefault();
        const mesas = { num }
        try {
            const response = await fetch('http://localhost:8080/mesa',
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(mesas)
                }
            );
            if (response.ok) {
                setMensagem('Mesa cadastrada com sucesso')
                setNum('');
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
            <form onSubmit={salvarMesas} className="p-fluid"
                style={{ maxWidth: '600px', margin: '0 auto' }} >
                <div className="p-field" style={{ marginBottom: '20px' }}>
                    <label htmlFor="num" style={{ fontWeight: 'bold' }}>
                        Num
                    </label>
                    <InputText id="num" value={num}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o número da mesa"
                        required className="p-inputtext-lg" />
                    {fieldErrors.num && <Message severity="error" text={fieldErrors.num}
                    />}
                </div>
            </form>
        </>
    );
}

export default MesasForm;