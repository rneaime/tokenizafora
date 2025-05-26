import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TokenizerFormData {
  garantiaId: string;
  valorTokenizacao: string;
  quantidadeTokens: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
  termos: boolean;
}

interface Garantia {
  id: string;
  tipoGarantia: string;
  descricao: string;
  valor: number;
}

const CadastroTokenizer: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TokenizerFormData>({
    garantiaId: '',
    valorTokenizacao: '',
    quantidadeTokens: '100',
    dataInicio: '',
    dataFim: '',
    descricao: '',
    termos: false
  });
  
  const [garantias, setGarantias] = useState<Garantia[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated fetch of available guarantees
  useEffect(() => {
    const fetchGarantias = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('http://localhost:3001/api/garantias/disponiveis');
        // const data = await response.json();
        
        // Simulated data
        const mockData = [
          { id: '1', tipoGarantia: 'veiculo', descricao: 'Toyota Corolla 2022', valor: 120000 },
          { id: '2', tipoGarantia: 'veiculo', descricao: 'Honda Civic 2021', valor: 95000 },
          { id: '3', tipoGarantia: 'imovel', descricao: 'Apartamento Centro', valor: 450000 },
        ];
        
        setGarantias(mockData);
      } catch (err) {
        setError('Erro ao carregar garantias disponíveis');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGarantias();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Auto-calculate fields
    if (name === 'garantiaId') {
      const selectedGarantia = garantias.find(g => g.id === value);
      if (selectedGarantia) {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          valorTokenizacao: selectedGarantia.valor.toString()
        }));
      }
    }
    
    if (name === 'valorTokenizacao' || name === 'quantidadeTokens') {
      // Any additional calculations can be done here
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.termos) {
      setError('Você precisa aceitar os termos para prosseguir');
      setIsSubmitting(false);
      return;
    }

    try {
      // API call would go here
      const response = await fetch('http://localhost:3001/api/tokenizacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar tokenização');
      }

      // Redirect on success
      navigate('/tokenizar');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Carregando garantias disponíveis...</div>;
  }

  return (
    <div className="cadastro-container">
      <h2>Tokenização de Garantia</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="garantiaId">Selecione a Garantia</label>
          <select
            id="garantiaId"
            name="garantiaId"
            value={formData.garantiaId}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione uma garantia</option>
            {garantias.map(garantia => (
              <option key={garantia.id} value={garantia.id}>
                {garantia.descricao} - R$ {garantia.valor.toLocaleString('pt-BR')}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="valorTokenizacao">Valor Total (R$)</label>
            <input
              type="number"
              id="valorTokenizacao"
              name="valorTokenizacao"
              value={formData.valorTokenizacao}
              onChange={handleInputChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantidadeTokens">Quantidade de Tokens</label>
            <input
              type="number"
              id="quantidadeTokens"
              name="quantidadeTokens"
              value={formData.quantidadeTokens}
              onChange={handleInputChange}
              placeholder="Ex: 100"
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dataInicio">Data de Início</label>
            <input
              type="date"
              id="dataInicio"
              name="dataInicio"
              value={formData.dataInicio}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataFim">Data de Término</label>
            <input
              type="date"
              id="dataFim"
              name="dataFim"
              value={formData.dataFim}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição da Oferta</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            placeholder="Descreva os detalhes da oferta de tokenização"
            rows={4}
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="termos"
            name="termos"
            checked={formData.termos}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="termos">
            Aceito os termos de serviço e confirmo que li todas as informações sobre o processo de tokenização
          </label>
        </div>

        <div className="token-info">
          <h3>Informações do Token</h3>
          <p>
            Valor por token: R$ {formData.valorTokenizacao && formData.quantidadeTokens 
              ? (parseFloat(formData.valorTokenizacao) / parseFloat(formData.quantidadeTokens)).toFixed(2) 
              : '0.00'
            }
          </p>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/tokenizar')}
            className="cancel-button"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="submit-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processando...' : 'Criar Tokenização'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroTokenizer;

