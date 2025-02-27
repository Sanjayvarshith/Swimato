import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
export default function () {

  const [search,setSearch]=useState('');
  const [foodCat,setFoodCat]=useState([]);
  const [foodItem,setFoodItem]=useState([]);
  const loadData=async()=>{
    let response=await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    });

    response=await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(()=>{
    loadData()
  },[])

  return (
    <div>
      <div> <Navbar /> </div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
    <div className="carousel-inner" id="carousel">
      <div className="carousel-caption" style={{zIndex:"10"}}>
      <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
      </div>
      <div className="carousel-item active">
      <img src="https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2024/5/9/33282528-7b2c-458b-ace7-76ce58009158_274.jpg" className="d-block" style={{filter:"brightness(80%)",height:"500px",width:"100%" }} alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://img.freepik.com/premium-photo/indulgent-chocolate-cake-presentation-tempting-treat-plate_1000124-6715.jpg" className="d-block" style={{filter:"brightness(80%)",height:"500px",width:"100%" }} alt="..."/>
      </div>
      <div className="carousel-item">
      <img src="https://img.pikbest.com/wp/202344/tempting-detailed-capture-of-mouthwatering-bbq-chicken-pizza-s-texture_9923830.jpg!sw800" className="d-block" style={{filter:"brightness(70%)",height:"500px",width:"100%" }} alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div></div>
      <div class="container">
        {
          foodCat !==[]
          ? foodCat.map((data)=>{
            return( <div className='row mb-3'>
            <div key={data._id} clasasName="fs-3 m-3">{data.CategoryName}
            </div>
            <hr/>
            {foodItem !==[]?foodItem.filter((item)=>(item.CategoryName==data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
            .map(filterItems=>{
              return(
                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                  <Card foodItem={filterItems} options={filterItems.options[0]}
                  >

                  </Card>
                </div>
              )
            }):<div>No such data found</div>}
            </div>
            )
          })
          :<div>""""</div>
        }
        </div>
      <div><Footer /></div>
    </div>
  )
}
