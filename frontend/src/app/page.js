import Image from "next/image";
import ComparePipe from "./comparepipe";

export default function Home() {
  return (
    <div className="w-screen max-w-[100%] min-h-screen bg-white overflow-x-hidden">
      <h1 className="pt-2 w-full text-center text-3xl font-bold text-black">Compare Pipes models</h1>

      <div className="flex px-[20%] items-start justify-center w-screen mt-2 flex-col">
        <input type="text" className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Type here..."/>
      </div>
      
      <ComparePipe/>

    </div>
  );
}
