import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";

const Update = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");

  const formSubmit = () => {
    fetch("/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        pic: url,
        pic2: url2,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          console.log("error posting file");
        } else {
          console.log("post created successfully");
          <Redirect to="/admin/home" />; //send to home after signup
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="my-5">
        <h1 className="text-center"> Update Site </h1>
      </div>
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form onSubmit={formSubmit}>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  body
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  name="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Add description"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  image
                </label>
                <input
                  type="url"
                  class="form-control"
                  id="exampleFormControlInput1"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Add image url"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  image
                </label>
                <input
                  type="url"
                  class="form-control"
                  id="exampleFormControlInput1"
                  name="url2"
                  value={url2}
                  onChange={(e) => setUrl2(e.target.value)}
                  placeholder="Add another image url"
                />
              </div>

              <div class="col-12">
                <button class="btn btn-outline-primary" type="submit">
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
