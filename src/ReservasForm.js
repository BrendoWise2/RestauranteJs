import { useState } from "react";



function ReservasForm({ atualizarLista }) {

    const [numReserva, setnumReserva] = useState('');
    const [cliente, setCliente] = useState('');
    const [mesa, setMesa] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [fieldErrors, setFieldErrors] = useState('');

    const salvarReserva = async (e) => {
        e.preventDefault();
        const reservas = { numReserva }
        try {
            const response = await fetch('http://localhost:8080/reserva',
                {

                    method: "POST",
                    headers: { 'Conten-Type': 'application/json' },
                    body: JSON.stringify(reservas)
                }
            );

            if (response.ok) {
                setMensagem('Reserva Cadastrada!');
                setnumReserva('');
                atualizarLista('');
                setCliente('');
                setMesa('');

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
            <form onSubmit={salvarReserva} className="p-fluid"
                style={{ maxWidth: '600px', margin: '0 auto' }} >
                <div className="p-field" style={{ marginBottom: '20px' }}>
                    <label htmlFor="num" style={{ fontWeight: 'bold' }}>
                        Num
                    </label>
                    <InputText id="numReserva" value={numReserva}
                        onChange={(e) => setnumReserva(e.target.value)}
                        placeholder="Digite o número da Reserva"
                        required className="p-inputtext-lg" />
                    {fieldErrors.numReserva && <Message severity="error" text={fieldErrors.numReserva}
                    />}
                    <InputText id="cliente" value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        placeholder="Insira o nome do solicitante da reserva"
                        required className="p-inputtext-lg" />
                    {fieldErrors.cliente && <Message severity="error" text={fieldErrors.cliente}
                    />}
                    <InputText id="numMesa" value={mesa}
                        onChange={(e) => setMesa(e.target.value)}
                        placeholder="Digite o número da mesa"
                        required className="p-inputtext-lg" />
                    {fieldErrors.numMesa && <Message severity="error" text={fieldErrors.numMesa}
                    />}
                </div>
            </form>
        </>
    );

}