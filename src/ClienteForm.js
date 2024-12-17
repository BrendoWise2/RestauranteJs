import React, { useState } from 'react'; // Importando React e useState hook

function ClienteForm({ atualizarLista }) {
  const [cliente, setCliente] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    restauranteCliente: ''
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        atualizarLista(); // Atualiza a lista de clientes no componente pai
        setCliente({ nome: '', cpf: '', telefone: '', email: '', restauranteCliente: '' }); // Limpa os campos
      } else {
        console.error('Erro ao cadastrar o cliente');
      }
    } catch (error) {
      console.error('Erro ao enviar dados', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cadastrar Cliente</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="nome" style={styles.label}>Nome:</label>
          <input
            type="text"
            id="nome"
            value={cliente.nome}
            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="cpf" style={styles.label}>CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cliente.cpf}
            onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="telefone" style={styles.label}>Telefone:</label>
          <input
            type="text"
            id="telefone"
            value={cliente.telefone}
            onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={cliente.email}
            onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="restauranteCliente" style={styles.label}>Restaurante:</label>
          <input
            type="text"
            id="restauranteCliente"
            value={cliente.restauranteCliente}
            onChange={(e) => setCliente({ ...cliente, restauranteCliente: e.target.value })}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Cadastrar</button>
      </form>
    </div>
  );
}

export default ClienteForm;

const styles = {
  container: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
  },
  button: {
    marginTop: '10px',
    padding: '10px 15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};
