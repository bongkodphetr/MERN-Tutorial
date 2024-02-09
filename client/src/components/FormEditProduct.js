import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { read,update } from '../functions/product'

//แก้ไขข้อมูล

const FormEditProduct = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [data,setData] = useState({
    name:'',
    detail:'',
    price:''
  })

  useEffect(()=>{
    loadData(params.id)
  },[])
  const loadData = async (id)=>{
    read(id).then((res)=>{
      setData(res.data)
    })
  }
  const handleChange = (e)=>{

    setData({
        ...data,
        [e.target.name]: e.target.value
    })
}
//ส่งข้อมูล
const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(data)
    update(params.id,data)
    .then((res)=>{
        console.log(res)
        navigate('/')
      
    })
    .catch((err)=>console.log(err))
}
  return (
    <div>
      FormEditProduct 555
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' onChange={e => handleChange(e)} placeholder='name' value={data.name}></input><br/>
        <input type='text' name='detail'  onChange={e => handleChange(e)} placeholder='detail' value={data.detail}></input><br/>
        <input type='text' name='price'  onChange={e => handleChange(e)} placeholder='price' value={data.price}></input><br/>
        <button>Submit</button>
      </form>

    </div>
  )
}

export default FormEditProduct