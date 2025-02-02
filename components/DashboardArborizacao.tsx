import { useEffect, useState } from "react"
import { useIndexedDB } from "../hooks/useIndexedDB"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js"
import { Pie, Bar } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

export default function DashboardArborizacao() {
  const { getAllData } = useIndexedDB()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getAllData().then(setData)
  }, [getAllData])

  const totalSolicitacoes = data.length
  const solicitacoesArborizacao = data.filter((item) => item.faltaArborizacao).length
  const solicitacoesContraArborizacao = totalSolicitacoes - solicitacoesArborizacao
  const percentualArborizado = (solicitacoesArborizacao / totalSolicitacoes) * 100 || 0

  const pieData = {
    labels: ["A favor da arborização", "Contra a arborização"],
    datasets: [
      {
        data: [solicitacoesArborizacao, solicitacoesContraArborizacao],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  }

  const barData = {
    labels: ["Centro", "Norte", "Sul"],
    datasets: [
      {
        label: "Percentual de arborização",
        data: [65.5, 50.0, 70.0],
        backgroundColor: "#4CAF50",
      },
    ],
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="font-bold">Total de solicitações</h3>
          <p className="text-2xl">{totalSolicitacoes}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-bold">Solicitações a favor</h3>
          <p className="text-2xl">{solicitacoesArborizacao}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h3 className="font-bold">Solicitações contra</h3>
          <p className="text-2xl">{solicitacoesContraArborizacao}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h3 className="font-bold">Percentual arborizado</h3>
          <p className="text-2xl">{percentualArborizado.toFixed(2)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-bold mb-4">Distribuição de solicitações</h3>
          <Pie data={pieData} />
        </div>
        <div>
          <h3 className="font-bold mb-4">Percentual de arborização por região</h3>
          <Bar data={barData} />
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Estatísticas por região</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Região</th>
              <th className="border p-2">Solicitações (Sim)</th>
              <th className="border p-2">Solicitações (Não)</th>
              <th className="border p-2">% Arborizado</th>
              <th className="border p-2">Árvores Plantadas</th>
              <th className="border p-2">Árvores Necessárias</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Centro</td>
              <td className="border p-2">120</td>
              <td className="border p-2">30</td>
              <td className="border p-2">65.5%</td>
              <td className="border p-2">500</td>
              <td className="border p-2">800</td>
            </tr>
            <tr>
              <td className="border p-2">Norte</td>
              <td className="border p-2">90</td>
              <td className="border p-2">20</td>
              <td className="border p-2">50.0%</td>
              <td className="border p-2">300</td>
              <td className="border p-2">600</td>
            </tr>
            <tr>
              <td className="border p-2">Sul</td>
              <td className="border p-2">80</td>
              <td className="border p-2">40</td>
              <td className="border p-2">70.0%</td>
              <td className="border p-2">400</td>
              <td className="border p-2">700</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

