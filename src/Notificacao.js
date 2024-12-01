import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

const Notificacao = () => {
    const toast = useRef(null); 

    const showConfirmation = () => {
        toast.current.show({
            severity: 'success', 
            summary: 'Reserva Confirmada', 
            detail: 'Sua reserva foi confirmada.', 
            life: 3000, 
        });
    };

    const showCancellation = () => {
        toast.current.show({
            severity: 'error', 
            summary: 'Reserva Cancelada', 
            detail: 'Sua reserva foi cancelada.', 
            life: 3000, 
        });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Toast ref={toast} position="bottom-left" />

            <Button
                label="Confirmar Reserva"
                icon="pi pi-check"
                className="p-button-success"
                onClick={showConfirmation}
                style={{ marginRight: '10px' }}
            />
            <Button
                label="Cancelar Reserva"
                icon="pi pi-times"
                className="p-button-danger"
                onClick={showCancellation}
            />
        </div>
    );
};

export default Notificacao;
