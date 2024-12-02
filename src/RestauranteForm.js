import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Message } from "primereact/message";
import { Button } from "primereact/button";

function RestauranteForm({ atualizarLista }) {
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [proprietarioRestaurante, setProprietarioRestaurante] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const salvarRestaurante = async (e) => {
    e.preventDefault();
    const restaurante = { nomeRestaurante, cnpj, endereco, telefone, email, proprietarioRestaurante };

    try {
      const response = await fetch("http://localhost:8080/restaurante", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(restaurante),
      });

      if (response.ok) {
        setMensagem("Restaurante cadastrado com sucesso!");
        setNomeRestaurante("");
        setCnpj("");
        setEndereco("");
        setTelefone("");
        setEmail("");
        setProprietarioRestaurante("");
        atualizarLista();
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
        setMensagem(problema.titulo || "Erro ao cadastrar restaurante");
      }
    } catch (error) {
      setMensagem("Erro ao conectar ao servidor!!!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cadastrar Restaurante</h2>
      <form onSubmit={salvarRestaurante} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="nomeRestaurante" style={styles.label}>Nome do Restaurante:</label>
          <InputText
            id="nomeRestaurante"
            value={nomeRestaurante}
            onChange={(e) => setNomeRestaurante(e.target.value)}
            style={styles.input}
          />
          {fieldErrors.nomeRestaurante && <Message severity="error" text={fieldErrors.nomeRestaurante} />}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="cnpj" style={styles.label}>CNPJ:</label>
          <InputMask
            id="cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            mask="99.999.999/9999-99"
            style={styles.input}
          />
          {fieldErrors.cnpj && <Message severity="error" text={fieldErrors.cnpj} />}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="endereco" style={styles.label}>Endereço:</label>
          <InputText
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            style={styles.input}
          />
          {fieldErrors.endereco && <Message severity="error" text={fieldErrors.endereco} />}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="telefone" style={styles.label}>Telefone:</label>
          <InputMask
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            mask="(99) 99999-9999"
            style={styles.input}
          />
          {fieldErrors.telefone && <Message severity="error" text={fieldErrors.telefone} />}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>E-mail:</label>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          {fieldErrors.email && <Message severity="error" text={fieldErrors.email} />}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="proprietarioRestaurante" style={styles.label}>Proprietário:</label>
          <InputText
            id="proprietarioRestaurante"
            value={proprietarioRestaurante}
            onChange={(e) => setProprietarioRestaurante(e.target.value)}
            style={styles.input}
          />
          {fieldErrors.proprietarioRestaurante && <Message severity="error" text={fieldErrors.proprietarioRestaurante} />}
        </div>
        <Button label="Cadastrar Restaurante" icon="pi pi-check" type="submit" style={styles.button} />
        {mensagem && <Message severity="success" text={mensagem} />}
      </form>
    </div>
  );
}

export default RestauranteForm;

const styles = {
  container: {
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
