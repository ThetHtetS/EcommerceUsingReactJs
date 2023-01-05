import react, {useState} from "react";
import axios from "axios";
import { addDays } from 'date-fns';
import DatePicker from "react-datepicker";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
const Profi = ()=>{
    
    //const [startDate, setStartDate] = useState(new Date());
    const [state, setState] = useState(
    
      {
          startDate: new Date(),
          endDate: addDays(new Date(),7),
          key: 'selection'
        }
        );
        console.log(state.startDate);
console.log(state.endDate);
console.log(state.startDate.toISOString().slice(0,10));
console.log(state.endDate.toISOString().slice(0,10));
  /*  const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
    */

//console.log(state.startDate);
const [date,setDate] = useState([]);
//setDate.sDate(new Date());
//set
//setDate.sDate();
//setDate.eDate(state.endDate.toISOString().slice(0,10));
//console.log(date);
    const [order, setOrder]= useState();
    const[loading, setLoading]= useState(true);
 //   console.log(state.startDate.toISOString().slice(0,10));
    const submit =()=>{
      //  const date = startDate.toISOString().slice(0,10);
          const date ={
            sDate : state.startDate.toISOString().slice(0,10),
            eDate : state.endDate.toISOString().slice(0,10)
          }
          console.log(date);       
      //  console.log(date);
        /*axios.post(`http://localhost/laravel/public/api/view-orders-history/${date}`).then(res=>{
    
            if(res.status===200){
            
                console.log(res.data); 
                setOrder(res.data.data);
               setLoading(false);
            }
        
        })  
     */  
    } 
  //  const dating =(Date)=>{
    //    setStartDate(Date);  
         
    //} 

    
    //console.log(startDate);

    return(
        <div>
           
          <br></br>
            <DateRangePicker
       onChange={item => setState(item.selection)}
       showSelectionPreview={true}
       moveRangeOnFirstSelection={false}
       months={2}
       ranges={[state]}
       direction="horizontal"
      />
      <button onClick={submit}>send</button>
        </div>
    )
}
export default Profi;