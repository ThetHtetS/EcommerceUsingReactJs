import React, {Component} from "react";
import axios from "axios";

class AddCourse2 extends Component{
state ={
  file: null
}
handlefile(e){
let file= e.target.files[0];
this.setState({file: file});
}
handleupload(e){
  e.preventDefault();
  let file = this.state.file;
  let formData = new FormData();

  formData.append('image', file)
  formData.append('name', 'are yoe')
  
/*axios({
  url: 'http://localhost/laravel/blog/public/api/add-course',
  method: 'post',
 // headers: {},
  data: formData
}).then((res)=> {
console.log(res);
})*/
fetch("http://localhost/laravel/blog/public/api/add-course", {
  method: 'POST',
  body : {
    data : formData,
  },
  headers: {
    'Accept': 'Application/json',
    'Content-type' : 'multipart/form-data'
  }
})

}


  render() {
    return(
      <div>
       <form>
         <input type='file' name="file" onChange={(e)=> this.handlefile(e)}/> <br />
         <button onClick={(e)=> this.handleupload(e)} type="submit">Upload</button>
       </form>
      </div>
    )
  }
}
export default AddCourse2;