import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
      <h1 className="text-3xl text-primary-950 font-bold">
        Bem vindo ao Sys.SO
      </h1>

      <h3 className="text-xl text-primary-950 font-semibold">
        Cadastre seus clientes e crie suas Ordens de Serviços aqui!
      </h3>
    </main>
  )
}
