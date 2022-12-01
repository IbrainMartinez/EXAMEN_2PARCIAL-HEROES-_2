import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom"
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import Swal from 'sweetalert2';
import '../index.css'
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Examen = () => {

  const [nombrereal, setnombrereal] = useState('')
  const [nombredevillano, setnombredevillano] = useState('')
  const [edad, setedad] = useState('')
  const [afiliacion, setafiliacion] = useState(null)
  const [descripcion, setdescripcion] = useState(null)
  const [archienemigo, setarchienemigo] = useState([])

  const [products, setProducts] = useState([])
  const [villanos, setVillanos] = useState([])
  const productsCollection = collection(db, "Heroes")
  const villanosCollection = collection(db, "heruesyvillanos")
  const navigate = useNavigate()

  const store = async (e) => {

    e.preventDefault()

    await addDoc(productsCollection, { nombrereal: nombrereal, nombredevillano: nombredevillano, edad: edad, afiliacion: afiliacion, descripcion: descripcion, archienemigo: archienemigo })
    window.location.href = window.location.href;
    window.location.replace('');
  }

  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    )
  }

  const getVillanos = async () => {
    const villanosData = await getDocs(villanosCollection)
    setVillanos(
      villanosData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  }

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "Heroes", id)
    await deleteDoc(productDoc)
    getProducts()
  }

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
    getVillanos()
  }, [])


  return (
    <div class="container">
      <div class="row">

        <div class="col">
          <h1>Alta heroes</h1>

          <form onSubmit={store}>
          <div className='mb-3'>
              <label className='form-label'>Nombre real</label>
              <input value={nombrereal} onChange={(e) => setnombrereal(e.target.value)} type="text" className='form-control' required/>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Nombre del villano</label>
              <input value={nombredevillano} onChange={(e) => setnombredevillano(e.target.value)} type="text" className='form-control' required/>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Edad</label>
              <input value={edad} onChange={(e) => setedad(e.target.value)} type="text" className='form-control' required/>
            </div>

            <div className='mb-3'>
              <label>Seleccione su sexo</label>
              <br />
              <input className="espacioCheck" type="radio" value="Masculino" onChange={(e) => setafiliacion(e.target.value)} name='afiliacion' required/>
              <label >Masculino</label>
              
              <br />
              <input className="espacioCheck" type="radio" value="Femenino" onChange={(e) => setafiliacion(e.target.value)} name='afiliacion' required/>
              <label >Femenino</label>
              
              <br />
              <input className="espacioCheck" type="radio" value="NoEspecificado" onChange={(e) => setafiliacion(e.target.value)} name='afiliacion' required/>
              <label >No especificado</label>
             

            </div>

            <div className='mb-3'>
              <label>Seleccione su Origen</label>
              <br />
              <input className="espacioCheck" type="radio" value="Humano" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' required/>
              <label >Humano</label>
             
              <br />
              <input className="espacioCheck" type="radio" value="Extraterestre" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' required/>
              <label >Extraterestre</label>
              
              <br />
              <input className="espacioCheck" type="radio" value="ExperimentoCientifico" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' required/>
              <label >Experimento Cientifico</label>
              
              <br />
              <input className="espacioCheck" type="radio" value="Muntante" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' required/>
              <label >Muntante</label>
              

            </div>



            <div className='mb-3'>
              <label>Seleccione sus Caracteristicas</label>
              <br />
              <input className="espacioCheck Caracteristica1" type="checkbox" value="Volador" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <label > Volador</label>            
              <br />
              <input className="espacioCheck Caracteristica2" type="checkbox" value="Velocidad" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <label > Velocidad</label>
              
              <br />
              <input className="espacioCheck Caracteristica3" type="checkbox" value="Fuerza" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <label >Fuerza</label>
              
              <br />
              <input className="espacioCheck Caracteristica4" type="checkbox" value="Mutante" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <label >Mutante</label>
              
              <br />
              <input className="espacioCheck Caracteristica5" type="checkbox" value="Visión"onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <label >Visión</label>
              
              <br />
              <input className="espacioCheck Caracteristica6" type="checkbox" value="Oído" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <label >Oído</label>
              
              <br />
              <input className="espacioCheck Caracteristica7" type="checkbox" value="Invulnerabilidad" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' /> 
              <label >Invulnerabilidad</label>
              
              <br />
              <input className="espacioCheck Caracteristica8" type="checkbox" value="Telepatia" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <label >Telepatia</label>
                
              <br />
              <input className="espacioCheck Caracteristica9" type="checkbox" value="Telequinesis" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />  
              <label >Telequinesis</label>

              <br />
              <input className="espacioCheck Caracteristica10" type="checkbox" value="LanzaRayos" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />  
              <label >Lanza Rayos</label>
              
              <br />
              <input className="espacioCheck Caracteristica11" type="checkbox" value="ArtesMarciales" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <label >Artes Marciales</label>
                
              <br />
              <input className="espacioCheck Caracteristica12" type="checkbox" value="Inteligencia" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <label >Inteligencia</label>
              
              <br />
              <input className="espacioCheck Caracteristica13" type="checkbox" value="Acrobacia" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />  
              <label >Acrobacia</label>
              
              <br />
              <input className="espacioCheck Caracteristica14" type="checkbox" value="Armadura" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />   
              <label >Armadura</label>
               
              <br />
              <input className="espacioCheck Caracteristica15" type="checkbox" value="Tecnología" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />  
              <label >Tecnología</label>
               
            </div>

            <button type='submit' className='espacioCheck btn btn-success espacioBtn'>Enviar</button>
            <a className='btn btn-danger espacioBtn' href="javascript:location.reload()">Cancelar</a>

          </form>
        </div>

        <div class="col">
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
                  <td>{product.afiliacion}</td>
                  <td>{product.descripcion}</td>
                  <td>{product.archienemigo}</td>
                  <td><Link to={`/ExamenEdit/${product.id}`} className="btn btn-warning">Editar</Link></td>
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

export default Examen