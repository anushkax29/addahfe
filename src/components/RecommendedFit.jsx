import React from 'react';
import './recommendedFit.css';

const RecommendedFit = () => {
  const [data, setData] = React.useState([]);

  const url = "https://api.escuelajs.co/api/v1/products?limit=10";

  React.useEffect(() => {
    async function getData() {
      const values = await fetch(url);
      const respJson = await values.json();
      setData(respJson);
      console.log(respJson);
    }
    getData();
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

  return (
    <div className="recommended-fit">
      <h1 className="fit-heading">Recommended Fits</h1>
      <div className="fit-grid">
        {eleList}
      </div>
    </div>
  );
};

export default RecommendedFit;
