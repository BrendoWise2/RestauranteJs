import React, { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import ClienteForm from "./ClienteForm";


function ClienteList() {

    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const listarCliente = async () => {
        try {
            const clientesResponse = await fetch('http://localhost:8080/cliente')
            if (!clientesResponse.ok) {
                throw new Error('Falha na requisição');
            }

            const dataClientes = await clientesResponse.json();
            setClientes(dataClientes);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        listarCliente();
    }, []);

    const salvarAtualizar = async () => {
        await listarCliente();
        setIsAdding(false);
    }
    return (
        <div>
            <Panel header={isAdding ? "Cadastro de Cliente" : "Clientes Cadastrados"}>
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                    <Button label={isAdding ? "Ver Lista de Clientes" : "Cadastrar Novo Cliente"}
                        icon={isAdding ? "pi pi-arrow-left" : "pi pi-plus"}
                        onClick={() => setIsAdding(!isAdding)} />
                </div>
                {loading && <ProgressSpinner />}
                {isAdding ? (<ClienteForm atualizarLista={salvarAtualizar}/>) :
                    (
                        <>
                            {!loading && !error && (<DataTable value={clientes} paginator rows={5}
                                rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                                <Column field="nome" header="Nome" style={{ width: '25%' }}></Column>
                                <Column field="cpf" header="CPF" style={{ width: '25%' }}></Column>
                                <Column field="telefone" header="Telefone" style={{ width: '25%' }}></Column>
                                <Column field="email" header="E-mail" style={{ width: '25%' }}></Column>
                            </DataTable>)}
                        </>
                    )}
            </Panel>
        </div>
    );
}


export default ClienteList;