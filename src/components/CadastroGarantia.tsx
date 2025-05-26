import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GarantiaFormData {
  tipoGarantia: string;
  valor: string;
  dataVencimento: string;
  descricao: string;
  veiculoId: string;
  documentos: File[];
}

const CadastroGarantia: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<GarantiaFormData>({
    tipoGarantia: 'veiculo',
    valor: '',
    dataVencimento: '',
    descricao: '',
    veiculoId: '',
    documentos: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFormData({ ...formData, documentos: fileList });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Convert form data to FormData for file upload
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'documentos') {
          data.append(key, value);
        }
      });
      
      // Append each file individually
      formData.documentos.forEach((file, index) => {
        data.append(`documento_${index}`, file);
      });

      // API call would go here
      const response = await fetch('http://localhost:3001/api/garantias', {
        method: 'POST',
        body: data,
        // Don't set Content-Type header when using FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar garantia');
      }

      // Redirect on success
      navigate('/garantias');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Garantia</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tipoGarantia">Tipo de Garantia</label>
          <select
            id="tipoGarantia"
            name="tipoGarantia"
            value={formData.tipoGarantia}
            onChange={handleInputChange}
            required
          >
            <option value="veiculo">Veículo</option>
            <option value="imovel">Imóvel</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="valor">Valor (R$)</label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={formData.valor}
            onChange={handleInputChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataVencimento">Data de Vencimento</label>
          <input
            type="date"
            id="dataVencimento"
            name="dataVencimento"
            value={formData.dataVencimento}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="veiculoId">Veículo Vinculado</label>
          <input
            type="text"
            id="veiculoId"
            name="veiculoId"
            value={formData.veiculoId}
            onChange={handleInputChange}
            placeholder="ID do veículo"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            placeholder="Descreva detalhes da garantia"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="documentos">Documentos</label>
          <input
            type="file"
            id="documentos"
            name="documentos"
            onChange={handleFileChange}
            multiple
          />
          <small>Faça upload dos documentos relacionados à garantia (contrato, fotos, etc)</small>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/garantias')}
            className="cancel-button"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="submit-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Garantia'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroGarantia;

