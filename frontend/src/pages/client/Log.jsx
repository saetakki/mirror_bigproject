import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHistoryItem } from "@apis";
import { PageHeader } from "@organisms";
import { Container } from "@styles"


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

  return (
    <Container>
      <PageHeader page={where}/>
        <div>
          <span>persona</span>
          {isUpload && persona.map((item,idx)=> {
            return (
              <div key={idx}>{item}</div>
            )
          })}
        </div>
    </Container>
  ) 
}

export default Log;