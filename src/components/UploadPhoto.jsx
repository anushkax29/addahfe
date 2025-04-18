"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import "./uploadPhoto.css"

const UploadPhoto = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [weather, setweather] = useState("")
  const [occasion, setOccasion] = useState("Casual")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isweatherOpen, setIsweatherOpen] = useState(false)
  const [isOccasionOpen, setIsOccasionOpen] = useState(false)

    const [data, setData] = useState([]);
  
    const url = "https://api.escuelajs.co/api/v1/products?limit=10";
    //const url = "https://fakestoreapi.com/products/category/women's%20clothing";
  
    useEffect(() => {
      async function getData() {
        const dataJson = await fetch(url);
        const resp = await dataJson.json();
        console.log(resp)
        setData(resp)
      }
      getData()
    }, []);

    const eleList = data.map((item) => (
      <div className="fit-card" key={item.id}>
        <img src={item.images[0]} alt={item.title} className="fit-image" />
        <div className="fit-info">
          <h3>{item.title}</h3>
          <p>${item.price}</p>
        </div>
      </div>
    ));
  
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!file) {
      setError("Please upload an image")
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("image", file)
    formData.append("weather", weather)
    formData.append("occasion", occasion)

    // try {
    //   const response = await axios.post("http://localhost:5000/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })

    //   if (response.data.success) {
    //     navigate("/display-fit", { state: { data: response.data.data } })
    //   } else {
    //     setError(response.data.error || "Upload failed")
    //   }
    // } catch (err) {
    //   setError(err.response?.data?.error || "Server error")
    // } finally {
    //   setLoading(false)
    // }
    navigate('/display-fit')

  }

  const navigateToRandomFit = (e) => {
    e.preventDefault()
    navigate("/recommended-fit")
  }

  const toggleweatherDropdown = () => {
    setIsweatherOpen(!isweatherOpen)
    setIsOccasionOpen(false)
  }

  const toggleOccasionDropdown = () => {
    setIsOccasionOpen(!isOccasionOpen)
    setIsweatherOpen(false)
  }

  const selectweather = (selectedweather) => {
    setweather(selectedweather)
    setIsweatherOpen(false)
  }

  const selectOccasion = (selectedOccasion) => {
    setOccasion(selectedOccasion)
    setIsOccasionOpen(false)
  }

  function handleLogin(){
    navigate('/login')
  }
  function handleSignup(){
    navigate('/signup')
  }
  function handleUserDetails(){

  }

  return (
    <div className="whole">
      <div className="top-nav">      
        <button onClick={handleLogin}>Log In</button>
        <button onClick={handleSignup}>Sign Up</button> 
        <button onClick={handleUserDetails}>User Details</button>
      </div>
      <div className="app-container">

        <div className="right-panel">
          <div className="welcome-section">
            <h2 className="welcome-title">
              Welcome to Addah <span className="wave-emoji">👋</span>
            </h2>

            <div className="file-upload-container">
              <label htmlFor="file-upload" className="file-upload-label">
                {file ? file.name : "Upload your image"}
              </label>
              <input
                id="file-upload"
                type="file"
                className="file-upload-input"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
              />
            </div>
            <div className="filters-container">
              <div className="dropdown-left">
                  {/* <label htmlFor="weather-select" className="dropdown-label">Weather</label> */}
                  <select
                  id="weather-select"
                  className="dropdown-button"
                  value={weather}
                  onChange={(e) => selectweather(e.target.value)}
                  >
                  <option value="">{weather || "Select weather"}</option>
                  <option value="Summer">Summer</option>
                  <option value="Spring">Spring</option>
                  <option value="Rainy">Rainy</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                  </select>
              </div>

    <div className="dropdown-right">
      {/* <label htmlFor="occasion-select" className="dropdown-label">Occasion</label> */}
      <select
        id="occasion-select"
        className="dropdown-button"
        value={occasion}
        onChange={(e) => selectOccasion(e.target.value)}
      >
        <option value="">{occasion || "Select Occasion"}</option>
        <option value="Casual">Casual</option>
        <option value="Formal">Formal</option>
        <option value="Party">Party</option>
        <option value="Festive">Festive</option>
        <option value="Work">Work</option>
      </select>
    </div>
  </div>


            {error && <div className="error-message">{error}</div>}

            <button className="get-look-button" onClick={handleSubmit} disabled={loading}>
              <span className="sparkle">✨</span> {loading ? "Processing..." : "Get My Look"}
            </button>
          </div>

          <div className="trending-section">
            <h3 className="trending-title">Trending Looks</h3>
            <div className="trending-grid">
              <div className="trending-item"></div>
              <div className="trending-item"></div>
              <div className="trending-caption"></div>
              <div className="trending-caption"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPhoto
