import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomeProtected = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/allpost")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      });
  }, []);

  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="home">
      <div className="card home-card" style={{ display: "flex" }}>
        <Link to="/createpost" className="btn btn-outline-success">
          create post
        </Link>
        <Link to="/" className="btn btn-outline-success">
          all post
        </Link>
      </div>

      {data.map((item) => {
        return (
          <div
            className="card home-card"
            key={item._id}
            // style={{ width: "18rem" }}
          >
            <img src={item.photo} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">
                {item.title}
                <Link>
                  <i
                    class="bi bi-trash-fill"
                    style={{ float: "right" }}
                    onClick={() => deletePost(item._id)}
                  ></i>
                </Link>
                <Link to={`/admin/updatepost/${item._id}`}>
                  <i
                    class="bi bi-pen-fill"
                    style={{ float: "right", marginRight: "20px" }}
                  ></i>
                </Link>
              </h5>
              <p className="card-text">{item.body}</p>
              <Link to="#" className="btn btn-primary">
                Go somewhere
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeProtected;
