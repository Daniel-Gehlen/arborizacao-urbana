import { useState, useEffect } from "react"
import { useIndexedDB } from "../hooks/useIndexedDB"
import { useCEP } from "../hooks/useCEP"
import { useIpLimiter } from "../hooks/useIpLimiter"

export default function FormularioArborizacao() {
  const [cep, setCep] = useState("")
  const [rua, setRua] = useState("")
  const [bairro, setBairro] = useState("")
  const [faltaArborizacao, setFaltaArborizacao] = useState(false)
  const [interesseIncentivo, setInteresseIncentivo] = useState(false)
  const { addData } = useIndexedDB()
  const { fetchAddress } = useCEP()
  const { canSubmit, updateSubmission } = useIpLimiter()

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 8) {
      setCep(value.replace(/(\d{5})(\d)/, "$1-$2"))
    }
  }

  useEffect(() => {
    if (cep.length === 9) {
      fetchAddress(cep).then((data) => {
        if (data) {
          setRua(data.logradouro)
          setBairro(data.bairro)
        }
      })
    }
  }, [cep, fetchAddress])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) {
      alert("Você só pode preencher o formulário uma vez por mês.")
      return
    }
    const data = {
      cep,
      rua,
      bairro,
      faltaArborizacao,
      interesseIncentivo,
      dataRegistro: new Date().toISOString(),
    }
    await addData(data)
    updateSubmission()
    alert("Dados salvos com sucesso!")
    handleClear()
  }

  const handleClear = () => {
    setCep("")
    setRua("")
    setBairro("")
    setFaltaArborizacao(false)
    setInteresseIncentivo(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="cep" className="block mb-2">
          CEP:
        </label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={handleCepChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rua" className="block mb-2">
          Rua:
        </label>
        <input type="text" id="rua" value={rua} readOnly className="w-full px-3 py-2 border rounded bg-gray-100" />
      </div>
      <div className="mb-4">
        <label htmlFor="bairro" className="block mb-2">
          Bairro:
        </label>
        <input
          type="text"
          id="bairro"
          value={bairro}
          readOnly
          className="w-full px-3 py-2 border rounded bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={faltaArborizacao}
            onChange={(e) => setFaltaArborizacao(e.target.checked)}
            className="mr-2"
          />
          Falta arborização na sua rua?
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={interesseIncentivo}
            onChange={(e) => setInteresseIncentivo(e.target.checked)}
            className="mr-2"
          />
          Tem interesse em receber incentivo para arborização?
        </label>
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Salvar
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

