import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHistoryItem } from "@apis";

const Log = () => {
  const where = useParams().id
  const [isUpload, setIsUpload] = useState(false)
  const [date, setDate] = useState("")
  const [persona, setPersona] = useState({})
  const [chatLog, setChatLog] = useState([])
  const [report, setReport] = useState({})

  
  useEffect(()=> {
    getHistoryItem(where)
    .then(res=> {
      setDate(res.date)
      setPersona(Object.values(res.persona))
      setChatLog(res.chat_log)
      setReport(res.report)
      setIsUpload(true)
    })
    .catch(err=> console.log(err))
  },[])

  console.log(persona)
  console.log(chatLog)
  console.log(date)
  console.log(report)


  return (
    <> 
      <div>{where} page</div>
      <div>
        <span>persona</span>
        {isUpload && persona.map((item,idx)=> {
          return (
            <div key={idx}>{item}</div>
          )
        })}
      </div>
    </>
  ) 
}

export default Log;