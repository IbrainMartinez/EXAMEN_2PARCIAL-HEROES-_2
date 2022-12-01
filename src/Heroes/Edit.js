import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import { db } from "../Firebase/firebase"
import { getDoc, updateDoc, doc, deleteDoc, collection, getDocs } from "firebase/firestore"
import withReactContent from 'sweetalert2-react-content';
import '../index.css'
const MySwal = withReactContent(Swal)

const ExamenEdit = () => {

  const [nombrereal, setnombrereal] = useState('')
  const [nombredevillano, setnombredevillano] = useState('')
  const [edad, setedad] = useState('')
  const [sexo, setSexo] = useState(null)
  const [origen, setOrigen] = useState(null)
  const [archienemigo, setarchienemigo] = useState({
    caracters: [], pow: [],
  })
  const [products, setProducts] = useState([])
  const productsCollection = collection(db, "Heroes")
  const villanosCollection = collection(db, "heruesyvillanos")
  const [villanos, setVillanos] = useState([])

  const navigate = useNavigate()
  const { id } = useParams()

  const getVillanos = async () => {
    const villanosData = await getDocs(villanosCollection)
    setVillanos(
      villanosData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  }

  


  const update = async (e) => {
    e.preventDefault()
    const product = doc(db, "Heroes", id)
    const data = { nombrereal: nombrereal, nombredevillano: nombredevillano, edad: edad, sexo: sexo, origen: origen, archienemigo: archienemigo.caracters }
    await updateDoc(product, data)
    navigate('/Examen')
  }

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "Heroes", id))
    if (product.exists()) {


      setnombrereal(product.data().nombrereal)
      setnombredevillano(product.data().nombredevillano)
      setedad(product.data().edad)
      setSexo(product.data().sexo)
      setOrigen(product.data().origen)

    } else {
      console.log('no existe')
    }
  }

  useEffect(() => {
    getProductById(id)
    getVillanos()

  }, [])



  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  }
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "Heroes", id)
    await deleteDoc(productDoc)
    getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Quieres eliminar este Registro?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'SI!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        Swal.fire(
          'Eliminado!',
        )
      }
    })
  }

  useEffect(() => {
    getProducts()

  }, [])




  const handleChange = (e) => {
    const { value, checked } = e.target
    const { caracters } = archienemigo;
    if (checked) {
      setarchienemigo({ caracters: [...caracters, value], pow: [...caracters, value] })
    } else {
      setarchienemigo({
        caracters: caracters.filter((e) => e !== value),
        pow: caracters.filter((e) => e !== value),
      })
    }
  }


  return (

    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Editar Heroes</h1>
          <form onSubmit={update}>
          <div className='mb-3'>
              <label className='form-label'>Nombre real</label>
              <input value={nombrereal} onChange={(e) => setnombrereal(e.target.value)} type="text" className='form-control'/>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Nombre del villano</label>
              <input value={nombredevillano} onChange={(e) => setnombredevillano(e.target.value)} type="text" className='form-control'/>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Edad</label>
              <input value={edad} onChange={(e) => setedad(e.target.value)} type="text" className='form-control'/>
            </div>

            <div className='mb-3'>
              <label>Seleccione su sexo</label>
              <br />
              <input className="espacioCheck" type="radio" value="Masculino" onChange={(e) => setSexo(e.target.value)} name='afiliacion'/>
              <label >Masculino</label>
              
              <br />
              <input className="espacioCheck" type="radio" value="Femenino" onChange={(e) => setSexo(e.target.value)} name='afiliacion'/>
              <label >Femenino</label>
              
              <br />
              <input className="espacioCheck" type="radio" value="NoEspecificado" onChange={(e) => setSexo(e.target.value)} name='afiliacion'/>
              <label >No especificado</label>
             

            </div>

            <div className='mb-3'>
              <label>Seleccione su Origen</label>
              <br />
              <input className="espacioCheck" type="radio" value="Humano" onChange={(e) => setOrigen(e.target.value)}/>
              <label >Humano</label>
             
              <br />
              <input className="espacioCheck" type="radio" value="Extraterestre" onChange={(e) => setOrigen(e.target.value)}/>
              <label >Extraterestre</label>
              
              <br />
              <input className="espacioCheck" type="radio" value="ExperimentoCientifico" onChange={(e) => setOrigen(e.target.value)}/>
              <label >Experimento Cientifico</label>
              
              <br />
              <input className="espacioCheck" type="radio" value="Muntante" onChange={(e) => setOrigen(e.target.value)}/>
              <label >Muntante</label>
              

            </div>



            <div className='mb-3'>
              <label>Seleccione sus Caracteristicas</label>
              <br />
              <input className="espacioCheck Caracteristica1" type="checkbox" value="Volador" onChange={handleChange} />
              <label > Volador</label>            
              <br />
              <input className="espacioCheck Caracteristica2" type="checkbox" value="Velocidad" onChange={handleChange} />
              <label > Velocidad</label>
              
              <br />
              <input className="espacioCheck Caracteristica3" type="checkbox" value="Fuerza"onChange={handleChange} />
              <label >Fuerza</label>
              
              <br />
              <input className="espacioCheck Caracteristica4" type="checkbox" value="Mutante" onChange={handleChange} />
              <label >Mutante</label>
              
              <br />
              <input className="espacioCheck Caracteristica5" type="checkbox" value="Visión" onChange={handleChange} />
              <label >Visión</label>
              
              <br />
              <input className="espacioCheck Caracteristica6" type="checkbox" value="Oído" onChange={handleChange} />
              <label >Oído</label>
              
              <br />
              <input className="espacioCheck Caracteristica7" type="checkbox" value="Invulnerabilidad" onChange={handleChange} /> 
              <label >Invulnerabilidad</label>
              
              <br />
              <input className="espacioCheck Caracteristica8" type="checkbox" value="Telepatia" onChange={handleChange} />
              <label >Telepatia</label>
                
              <br />
              <input className="espacioCheck Caracteristica9" type="checkbox" value="Telequinesis" onChange={handleChange} />  
              <label >Telequinesis</label>

              <br />
              <input className="espacioCheck Caracteristica10" type="checkbox" value="LanzaRayos" onChange={handleChange} />  
              <label >Lanza Rayos</label>
              
              <br />
              <input className="espacioCheck Caracteristica11" type="checkbox" value="ArtesMarciales" onChange={handleChange} />
              <label >Artes Marciales</label>
                
              <br />
              <input className="espacioCheck Caracteristica12" type="checkbox" value="Inteligencia" onChange={handleChange} />
              <label >Inteligencia</label>
              
              <br />
              <input className="espacioCheck Caracteristica13" type="checkbox" value="Acrobacia" onChange={handleChange}/>  
              <label >Acrobacia</label>
              
              <br />
              <input className="espacioCheck Caracteristica14" type="checkbox" value="Armadura" onChange={handleChange} />   
              <label >Armadura</label>
               
              <br />
              <input className="espacioCheck Caracteristica15" type="checkbox" value="Tecnología"onChange={handleChange} />  
              <label >Tecnología</label>
               
            </div>

            <button type='submit' className='btn btn-success espacioBtn'>Actualizar</button>

            <br />
          </form>
        </div>
        <div className="col">
          <br /><br />
          <table className='table table-ligth disenioTabla'>
            <thead>
              <tr>
                <th>Nombre Real</th>
                <th>Nombre Heroe</th>
                <th>Edad</th>
                <th>Sexo</th>
                <th>Origen</th>
                <th>Caracteristicas</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody className='table-active'>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.nombrereal}</td>
                  <td>{product.nombredevillano}</td>
                  <td>{product.edad}</td>
                  <td>{product.sexo}</td>
                  <td>{product.origen}</td>
                  <td>{product.archienemigo}</td>
                  <td>
                    <button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger">Eliminar</button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default ExamenEdit