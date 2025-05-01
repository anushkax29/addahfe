import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import "./uploadPhoto.css"

const UploadPhoto = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [weather, setweather] = useState("")
  const [occasion, setOccasion] = useState("Casual")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState([])

  const url = "https://api.escuelajs.co/api/v1/products?limit=2"

  useEffect(() => {
    async function getData() {
      const dataJson = await fetch(url)
      const resp = await dataJson.json()
      console.log(resp)
      setData(resp)
    }
    getData()
  }, [])

  const eleList = data.map((item) => (
    <div className="fit-card" key={item.id}>
      <div className="trending-item">
        <img src={item.images[0]} alt={item.title} className="fit-image" />
      </div>
      <div className="trending-caption">
        <div className="fit-info">
          <h3>{item.title}</h3>
          <p>${item.price}</p>
        </div>
      </div>
    </div>
  ))

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

    const colors = ["black"]

    const query = `${occasion} ${weather} outfit in ${colors.join(" and ")}`
    const encodedQuery = encodeURIComponent(query)
    const pinterestUrl = `https://in.pinterest.com/search/pins/?q=${encodedQuery}`

    console.log("Pinterest URL →", pinterestUrl)
    window.open(pinterestUrl, "_blank")

    setLoading(false)
  }

  const navigateToRandomFit = (e) => {
    e.preventDefault()
    navigate("/recommended-fit")
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const handleSignup = () => {
    navigate("/signup")
  }

  const handleUserDetails = () => {
    navigate("/user-details")
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
              Welcome to Adaah <span className="heart-emoji">💗</span>
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
                <select
                  id="weather-select"
                  className="dropdown-button"
                  value={weather}
                  onChange={(e) => setweather(e.target.value)}
                >
                  <option value="">Weather</option>
                  <option value="Summer">Summer</option>
                  <option value="Spring">Spring</option>
                  <option value="Rainy">Rainy</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>

              <div className="dropdown-right">
                <select
                  id="occasion-select"
                  className="dropdown-button"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                >
                  <option value="">Occasion</option>
                  <option value="Casual">Casual</option>
                  <option value="Formal">Formal</option>
                  <option value="Party">Party</option>
                  <option value="Festive">Festive</option>
                  <option value="Work">Work</option>
                </select>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              className="get-look-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              <span className="sparkle">✨</span>{" "}
              {loading ? "Processing..." : "Wait for the Magic!"}
            </button>
          </div>

          <div className="trending-section">
            <h3 className="trending-title">Trending Looks</h3>
            <div className="trending-grid">   </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPhoto
