import {useEffect,useState} from "react";

type AirData = {
  pm2_5: number;
  pm10: number;
  carbon_monoxide: number;
  nitrogen_dioxide: number;
};

export default function App(){
 const [data,setData]=useState<AirData|null>(null);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState("");

 useEffect(()=>{
  const fetchAir=async()=>{
   try{
    const res=await fetch(
     "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=17.3850&longitude=78.4867&current=pm2_5,pm10,carbon_monoxide,nitrogen_dioxide"
    );
    if(!res.ok)throw new Error();
    const j=await res.json();
    setData(j.current);
   }catch{
    setError("Unable to fetch air quality");
   }finally{
    setLoading(false);
   }
  };
  fetchAir();
 },[]);

 return <main className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold text-center">Air Quality</h1>

  {loading&&<p>Loading...</p>}
  {error&&<p className="text-red-600">{error}</p>}

  {data&&<section className="grid grid-cols-2 gap-4 mt-6">
   <p>PM2.5: {data.pm2_5}</p>
   <p>PM10: {data.pm10}</p>
   <p>CO: {data.carbon_monoxide}</p>
   <p>NO₂: {data.nitrogen_dioxide}</p>
  </section>}
 </main>
}