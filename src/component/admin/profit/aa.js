import react, {useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
const Profi = ()=>{
    
    const [startDate, setStartDate] = useState(new Date());
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
    
    const [order, setOrder]= useState("2022-07-03");
    const[loading, setLoading]= useState(true);
    const submit =()=>{
        const date = startDate.toISOString().slice(0,10);
       
        console.log(date);
        axios.post(`http://localhost/laravel/blog/public/api/view-orders-history/${date}`).then(res=>{
    
            if(res.status===200){
            
                console.log(res.data); 
                setOrder(res.data.data);
               setLoading(false);
            }
        
        })  
       
    } 
    const dating =(Date)=>{
        setStartDate(Date);  
         
    } 

    
    console.log(startDate);

    return(
        <div>
            <DatePicker dateFormat="dd/MM/yy" selected={startDate} onChange={(Date) => dating(Date)} />
            <button onClick={submit}>send</button>
          <br></br>
            <DateRangePicker
        ranges={[selectionRange]}
        
      />
        </div>
    )
}
export default Profi;