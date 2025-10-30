import { useState, useEffect } from 'react'
import './App.css'
import { Input } from './components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Achadinho {
  codigo: string;
  titulo: string;
  link: string;
}

function App() {
  const [achadinhos, setAchadinhos] = useState<Achadinho[]>([]);
  const [resultados, setResultados] = useState<Achadinho[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();

    if (query) {
      const results = achadinhos.filter(achadinho => achadinho.codigo.includes(query));
      setResultados(results);
    } else {
      setResultados([]);
    }
  }

  useEffect(() => {
    // URL do seu arquivo JSON no GitHub
    const url = 'https://raw.githubusercontent.com/felipefranzim/achadinhosbysis/main/src/data/achadinhos.json';

    fetch(url)
      .then(response => {
        // Verifica se a resposta da rede foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Atualiza o estado com os dados recebidos
        setAchadinhos(data); // Acessando a propriedade 'achadinhos' do JSON
        setLoading(false);
      })
      .catch(error => {
        // Captura e armazena qualquer erro que ocorrer na busca
        console.error("Não foi possível buscar os dados:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const MessageFeedback = () => {
    if (error) {
      return <p className='text-gray-200 mt-0.5'>😢 Ocorreu um erro ao carregar a lista de achadinhos</p>
    } else if (loading) {
      return <p className='text-gray-200 mt-0.5'>🔎 Carregando a lista de achadinhos...</p>
    } else {
      return <p className='text-gray-200 mt-0.5'>☝️ Digite o número do produto para ver os resultados</p>
    }
  }

  return (
    <>
      <div className="container">
        <div className='profile-image'></div>
        <p>Encontre seus achadinhos de forma rápida e prática ✨</p>
        <Input placeholder='Pesquise pelo número do produto' onChange={handleSearch} className='mt-5' disabled={loading} />

        {
          resultados.length > 0 ? (
            <Table>
              <TableCaption>Lista de Achadinhos</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  resultados.map((achadinho) => (
                    <TableRow key={achadinho.codigo}>
                      <TableCell className="font-medium">{achadinho.codigo}</TableCell>
                      <TableCell>{achadinho.titulo}</TableCell>
                      <TableCell>
                        <a href={achadinho.link} target="_blank" rel="noopener noreferrer" className="link-produto">
                          Ver Produto
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          ) : (
            <MessageFeedback />
          )
        }
      </div>
    </>
  )
}

export default App
