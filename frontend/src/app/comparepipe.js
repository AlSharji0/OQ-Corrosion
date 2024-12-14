import Image from "next/image";

export default function ComparePipe() {

  const pipe1 = {
    pipename: "Default Pipe",
    corrosion: 1,
    heat: 1,
    image: "/pipe.png"
  }
  
  const pipe2 = {
    pipename: "Default Pipe",
    corrosion: 1,
    heat: 1,
    image: "/pipe.png"
  }

  return (
    <div className="w-screen flex flex-col px-[10%]">
      {/* Pipe Image */}
      <div className="w-full  h-full flex grid-cols-2 justify-center mt-20">
      <div className="w-full text-center h-full flex justify-center items-center flex-col">
        <h1 className="text-black text-xl">{pipe1.pipename}</h1>
        <div className="w-[80%] h-[1px] bg-black mt-10"></div>
        <Image src={pipe1.image} width={100} height={100} alt="" className="w-[200px] h-[200px] object-cover my-10 rounded-3xl border-black border-2"/>

      </div>
      <div className="w-full text-center h-full flex justify-center items-center flex-col">
        <h1 className="text-black text-xl">{pipe2.pipename}</h1>
        <div className="w-[80%] h-[1px] bg-black mt-10"></div>
        <Image src={pipe2.image} width={100} height={100} alt="" className="w-[200px] h-[200px] object-cover my-10 rounded-3xl border-black border-2"/>
      </div>
      
      </div>

      {/* Summary  */}
      <h1 className="text-black text-left w-full text-2xl font-semibold mt-10">Summary</h1>
      <div className="w-full h-[1px] bg-black mt-10"></div>

      {/* Detail  */}
      <div className="w-full  h-full flex grid-cols-2 justify-center mt-20">
        <div className="w-full text-center h-full flex justify-center items-center flex-col">
          <div className="w-[200px] h-[200px]">
            <h1 className="text-7xl font-semibold text-black">{pipe1.corrosion}</h1>
            <h1 className="text-black text-2xl">Corrosion</h1>
          </div>
          <div className="w-[200px] h-[200px]">
            <h1 className="text-7xl font-semibold text-black">{pipe1.heat}</h1>
            <h1 className="text-black text-2xl">Heat</h1>
          </div>
          <div className="w-[200px] h-[200px]">
            <h1 className="text-7xl font-semibold text-black">{pipe1.heat}</h1>
            <h1 className="text-black text-2xl">Heat</h1>
          </div>
        </div>
        <div className="w-full text-center h-full flex justify-center items-center flex-col">
          <div></div>
        </div>
      </div>

    </div>        
    
  );
}
