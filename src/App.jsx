import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [current, setCurrent] = useState(0);
  const [posts, setPosts] = useState([]);

  axios.defaults.baseURL = "http://localhost:3500";

  const nextSlider = () => {
    setCurrent(current === posts.length - 1 ? 0 : current + 1);
  };
  const prevSlider = () => {
    setCurrent(current === 0 ? posts.length - 1 : current - 1);
  };
  const createDotNum = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    axios
      .get("/posts")
      .then(({ data }) => setPosts(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(posts, "posts");
  // return "hi";
  return (
    <>
      <section id="hero">
        <div className="container">
          {posts.map((post, index) => (
            <div
              key={index}
              className={current === index ? "hero-main" : "passive"}
            >
              <div className="hero-contents">
                {post.sale ? (
                  <h2>
                    <span className="discount">
                      {post.sale ? post.sale : ""}%
                    </span>{" "}
                    SUPER SALE
                  </h2>
                ) : (
                  ""
                )}
                <h1>
                  <span>신년맞이</span>
                  <span>감사 대잔치</span>
                  <p>{post.name ? post.name : ""} </p>
                </h1>
                <div className="buy-btn">
                  <div className="btn">구 매 하 기</div>
                </div>
              </div>

              <div className="image">
                <img src={post.image} alt={post.name} className="hero-img" />
              </div>
            </div>
          ))}
          <p className="left-arrow" onClick={prevSlider}>
            {"<"}
          </p>
          <p className="right-arrow" onClick={nextSlider}>
            {">"}
          </p>
        </div>

        <div className="carousel-bottom">
          {posts.map((_, index) => {
            return (
              <p
                key={index}
                className={
                  index === current
                    ? "carousel-circle active"
                    : "carousel-circle"
                }
                onClick={() => createDotNum(index)}
              >
                {"●"}
              </p>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default App;
