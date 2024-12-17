import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Panel } from 'primereact/panel';
import RestauranteForm from "./RestauranteForm";
import RestauranteView from "./RestauranteView";
import ClienteForm from "./ClienteForm";
import ClienteList from "./ClienteList";

function RestauranteList() {
    const [restaurantes, setRestaurantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("list");
    const [selectedRestaurante, setSelectedRestaurante] = useState(null);

    // Função para listar os restaurantes
    const listarRestaurantes = async () => {
        try {
            const response = await fetch("http://localhost:8080/restaurante");
            if (!response.ok) {
                throw new Error("Erro ao carregar restaurantes");
            }
            const data = await response.json();
            setRestaurantes(data);  // Atualiza a lista de restaurantes
        } catch (err) {
            setError(err.message);  // Define o erro caso ocorra
        } finally {
            setLoading(false);  // Finaliza o carregamento
        }
    };

    useEffect(() => {
        listarRestaurantes();  // Carrega a lista ao inicializar o componente
    }, []);

    const handleViewRestaurante = (restaurante) => {
        setSelectedRestaurante(restaurante);
        setActiveComponent("view");
    };

    return (
        <div>
            <Panel header="Restaurantes">
                <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                    {activeComponent === "list" && (
                        <Button label="Cadastrar Novo Restaurante" icon="pi pi-plus" onClick={() => setActiveComponent("form")} />
                    )}
                    {activeComponent !== "list" && (
                        <Button label="Voltar à Lista" icon="pi pi-arrow-left" onClick={() => setActiveComponent("list")} />
                    )}
                    {selectedRestaurante && activeComponent === "view" && (
                        <>
                            <Button label="Cadastrar Cliente" icon="pi pi-plus" onClick={() => setActiveComponent("clienteForm")} />
                            <Button label="Ver Clientes" icon="pi pi-users" onClick={() => setActiveComponent("clienteList")} />
                        </>
                    )}
                </div>

                {loading && <ProgressSpinner />}
                {error && <p>Erro: {error}</p>}

                {activeComponent === "list" && (
                    <>
                        {restaurantes.length > 0 ? (
                            <DataTable value={restaurantes} paginator rows={5}>
                                <Column field="nomeRestaurante" header="Nome" />
                                <Column field="cnpj" header="CNPJ" />
                                <Column field="endereco" header="Endereço" />
                                <Column
                                    header="Ações"
                                    body={(rowData) => (
                                        <Button label="Ver Detalhes" icon="pi pi-eye" onClick={() => handleViewRestaurante(rowData)} />
                                    )}
                                />
                            </DataTable>
                        ) : (
                            <p>Nenhum restaurante disponível</p>
                        )}
                    </>
                )}

                {activeComponent === "form" && <RestauranteForm atualizarLista={listarRestaurantes} />}
                {activeComponent === "view" && <RestauranteView restaurante={selectedRestaurante} />}
                {activeComponent === "clienteForm" && (
                    <ClienteForm restaurantes={restaurantes} atualizarLista={listarRestaurantes} />
                )}
                {activeComponent === "clienteList" && (
                    <ClienteList restauranteId={selectedRestaurante.id} />
                )}
            </Panel>
        </div>
    );
}

export default RestauranteList;
