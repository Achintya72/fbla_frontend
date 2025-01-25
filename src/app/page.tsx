import Image from "next/image";

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return (
    <main className="px-[20px]">
      <div className="relative *:object-cover w-full rounded-[40px] overflow-hidden" style={{
        height: "calc(100vh - 200px)"
      }}>
        <Image
          src="/TeslaSTEM.png"
          alt="A picture of Tesla STEM High School"
          fill
        />
        <div
          className="absolute w-full h-full opacity-40"
          style={{
            background: "linear-gradient(to bottom right, #D9EFCC, #97BFBF)"
          }}
        />
        <div className="absolute bg-white-200 p-[40px] rounded-tl-[40px] rounded-br-[40px]">
          <h3>WHERE</h3>
          <h1>Leaders</h1>
          <div
            className="absolute circle-cutout-1 top-0 w-[40px] h-[40px] bg-white-200 left-[100%]"
          />
          <div
            className="absolute circle-cutout-1 top-[100%] w-[40px] h-[40px] bg-white-200 left-0"
          />
        </div>
        <div className="absolute right-0 bottom-0 bg-white-200 p-[40px] rounded-tl-[40px] rounded-br-[40px]">
          <h3 className="text-right">NURTURE</h3>
          <h1>Learners</h1>
          <div
            className="circle-cutout-2 absolute bottom-[100%] w-[40px] h-[40px] bg-white-200 right-0"
          />
          <div
            className="circle-cutout-2 absolute bottom-0 w-[40px] h-[40px] bg-white-200 right-[100%]"
          />
        </div>
      </div>
    </main>
  );
}
