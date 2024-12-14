import Image from "next/image";
import GraphPage from "./graph/graph";

export default function Home() {
  return (
    <div className="w-screen max-w-[100%] min-h-screen bg-white overflow-x-hidden">
      <h1 className="pt-2 w-full text-center text-3xl font-bold text-black">Data Summary</h1>


      <GraphPage/>
    </div>
  );
}
