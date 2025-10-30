import { useState } from 'react'
import './App.css'
import { Input } from './components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import dados from '@/data/achadinhos.json'

interface Achadinho {
  codigo: string;
  titulo: string;
  link: string;
}

function App() {
  const [achadinhos, setAchadinhos] = useState<Achadinho[]>(dados);
  const [resultados, setResultados] = useState<Achadinho[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();

    if (query) {
      const results = achadinhos.filter(achadinho => achadinho.codigo.includes(query));
      setResultados(results);
    } else {
      setResultados([]);
    }
  }

  return (
    <>
      <div className="container">
        <div className='profile-image'></div>
        <p>Encontre seus achadinhos de forma rápida e prática ✨</p>
        <Input placeholder='Pesquise pelo número do produto' onChange={handleSearch} className='mt-5' />

        {
          resultados.length > 0 ? (
            <Table>
              <TableCaption>Lista de Achadinhos</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Número do Produto</TableHead>
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
            <p className='text-gray-200 mt-0.5'>☝️ Digite o número do produto para ver os resultados</p>
          )
        }
      </div>
    </>
  )
}

export default App
