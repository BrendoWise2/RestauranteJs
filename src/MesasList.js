import React, { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import MesasForm from "./MesasForm";


function MesasList() {

    const [mesas, setMesas] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const listarMesas = async () => {
        try {
            const mesasResponse = await fetch('http://localhost:8080/mesa')
            if (!mesasResponse.ok) {
                throw new Error('Falha na requisição');
            }

            const dataMesas = await mesasResponse.json();
            setMesas(dataMesas);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        listarMesas();
    }, []);

    const salvarAtualizar = async () => {
        await listarMesas();
        setIsAdding(false);
    }
    return (
        <div>
            <Panel header={isAdding ? "Cadastro de Mesa" : "Mesas Cadastrados"}>
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                    <Button label={isAdding ? "Ver Lista de Mesas" : "Cadastrar Nova Mesa"}
                        icon={isAdding ? "pi pi-arrow-left" : "pi pi-plus"}
                        onClick={() => setIsAdding(!isAdding)} />
                </div>
                {loading && <ProgressSpinner />}
                {isAdding ? (<MesasForm atualizarLista={salvarAtualizar}/>) :
                    (
                        <>
                            {!loading && !error && (<DataTable value={mesas} paginator rows={5}
                                rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                                <Column field="Numero" header="Numero" style={{ width: '25%' }}></Column>
                            </DataTable>)}
                        </>
                    )}
            </Panel>
        </div>
    );
}


export default MesasList;