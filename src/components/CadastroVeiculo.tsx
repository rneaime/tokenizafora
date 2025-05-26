import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface VeiculoFormData {
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
  renavam: string;
  cor: string;
  valorMercado: string;
  proprietario: string;
  documentacao: File[];
}

const CadastroVeiculo: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<VeiculoFormData>({
    marca: '',
    modelo: '',
    ano: '',
    placa: '',
    renavam: '',
    cor: '',
    valorMercado: '',
    proprietario: '',
    documentacao: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFormData({ ...formData, documentacao: fileList });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      
      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'documentacao') {
          data.append(key, value);
        }
      });
      
      // Add each file individually
      formData.documentacao.forEach((file, index) => {
        data.append(`documento_${index}`, file);
      });

      // API call would go here
      const response = await fetch('http://localhost:3001/api/veiculos', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar veículo');
      }

      // Redirect on success
      navigate('/veiculos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Veículo</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="marca">Marca</label>
            <input
              type="text"
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              placeholder="Ex: Toyota"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="modelo">Modelo</label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleInputChange}
              placeholder="Ex: Corolla"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ano">Ano</label>
            <input
              type="number"
              id="ano"
              name="ano"
              value={formData.ano}
              onChange={handleInputChange}
              placeholder="Ex: 2022"
              min="1900"
              max={new Date().getFullYear() + 1}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cor">Cor</label>
            <input
              type="text"
              id="cor"
              name="cor"
              value={formData.cor}
              onChange={handleInputChange}
              placeholder="Ex: Prata"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="placa">Placa</label>
            <input
              type="text"
              id="placa"
              name="placa"
              value={formData.placa}
              onChange={handleInputChange}
              placeholder="Ex: ABC1234"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="renavam">RENAVAM</label>
            <input
              type="text"
              id="renavam"
              name="renavam"
              value={formData.renavam}
              onChange={handleInputChange}
              placeholder="Ex: 00123456789"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="valorMercado">Valor de Mercado (R$)</label>
          <input
            type="number"
            id="valorMercado"
            name="valorMercado"
            value={formData.valorMercado}
            onChange={handleInputChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="proprietario">Proprietário</label>
          <input
            type="text"
            id="proprietario"
            name="proprietario"
            value={formData.proprietario}
            onChange={handleInputChange}
            placeholder="Nome completo do proprietário"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="documentacao">Documentação</label>
          <input
            type="file"
            id="documentacao"
            name="documentacao"
            onChange={handleFileChange}
            multiple
          />
          <small>Faça upload dos documentos do veículo (CRLV, nota fiscal, etc)</small>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/veiculos')}
            className="cancel-button"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="submit-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Veículo'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroVeiculo;

