import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { removed,create,getdata } from '../functions/product'
import { Link } from 'react-router-dom'
function FormProduct() {

    const art ='art bongkot'
    const [data,setData] = useState([])
    const [form,setForm] = useState([])

    useEffect(()=>{
        loadData()


    },[])
    //ดึง api
    const loadData = async()=>{
        getdata()
          .then((res) => setData(res.data))
          .catch((err) => console.log(err));
    }
    //ทำเปลี่ยนข้อมูลเมื่อกรอก
    const handleChange = (e)=>{

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    //ส่งข้อมูล
    const handleSubmit = async (e) =>{
        e.preventDefault()
        create(form)
        .then((res)=>{
            console.log(res.data)
            loadData()
        })
        .catch((err)=>console.log(err))
    }
    //ลบข้อมูล
    const handleRemove = async (id)=>{
        removed(id)
        .then((res)=>{
            console.log(res)
            loadData()
        })
        .catch((err)=>console.log(err))
    }


  return (
    <div>
      FormProduct
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' onChange={e => handleChange(e)} placeholder='name'></input><br/>
        <input type='text' name='detail'  onChange={e => handleChange(e)} placeholder='detail'></input><br/>
        <input type='text' name='price'  onChange={e => handleChange(e)} placeholder='price'></input><br/>
        <button>Submit</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">detail</th>
            <th scope="col">price</th>
            <th scope="col">delete</th>
            <th scope="col">edit</th>
          </tr>
        </thead>
        <tbody>
            {//จัดข้อมูลเข้าตาราง
                data ? data.map((item,index)=>
          <tr key={index}>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.detail}</td>
            <td>{item.price}</td>
            <td onClick={()=>handleRemove(item._id)}>delete</td>
            <td>
              <Link to={'/edit/'+item._id}>edit</Link>
            </td>
          </tr>
                )
                :null
            }     
        </tbody>
      </table>
    </div>
  );
}

export default FormProduct