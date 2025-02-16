import { useEffect, useState } from "react"
import Prayer from "./components/Prayer"

function App() {
  const[prayerTime,setPrayerTime]= useState({})
  const[dateTime,setDateTime]= useState("")
  const[city,setCity]= useState("Cairo")
  const cities=[
    {name:"القاهره", value:"cairo"},
    {name:"الاسكندريه", value:"Alexanderia"},
    {name:"الجيزه", value:"Giza"},
    {name:"المنصوره", value:"Mansoura"},
    {name:"اسوان", value:"Aswan"},
    {name:"الاقصر", value:"luxor"},
  ]
//   https://api.aladhan.com/v1/timingsByCity/16-02-2025?city=Eg&country=cairo
  useEffect(()=>{
    const fetchPrayerTimes= async ()=>{
      try{
          const res = await fetch(`https://api.aladhan.com/v1/timingsByCity/16-02-2025?city=Eg&country=${city}`)
          const data_prayer= await res.json()
          setPrayerTime(data_prayer.data.timings)
          setDateTime(data_prayer.data.date.gregorian.date)
          // console.log(data_prayer.data.date.gregorian.date)
      } catch(error){
        console.log(error);
        
      }
    }
    fetchPrayerTimes()
  },[city])

    function formatTime(time) {
      if(!time){
        return "00:00"
      }
      let [hours, minutes] = time.split(":").map(Number);
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      // ( الاتنين return دول صح اختار اى حل منهم)
      // return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
      return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
    }

  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المحافظه</h3>
            <select name="" id="" onChange={(e)=>setCity(e.target.value)}>
              {cities.map((city)=>(
                <option key={city.value} value={city.value}>{city.name}</option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>تاريخ اليوم</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>

        <Prayer name="الفجر" time={formatTime(prayerTime.Fajr)}/>
        <Prayer name="الظهر" time={formatTime(prayerTime.Dhuhr)}/>
        <Prayer name="العصر" time={formatTime(prayerTime.Asr)}/>
        <Prayer name="المغرب" time={formatTime(prayerTime.Maghrib)}/>
        <Prayer name="العشاء" time={formatTime(prayerTime.Isha)}/>
       
      </div>
    </section>
  )
}

export default App
