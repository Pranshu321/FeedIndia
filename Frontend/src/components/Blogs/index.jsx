import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Card from "./components/Card";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const Blog = () => {
  const [idi, setidi] = useState([]);
  const [data, setdata] = useState([]);
  const getData = async () => {
    let temp = [];
    let ids = [];
    const querySnapshot = await getDocs(collection(db, "Blogs"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      ids.push(doc.id);
      temp.push(doc.data());
    });
    setidi(ids);
    setdata(temp);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div className="hero h-[50vh] bg-white">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Read and Write Blogs </h1>
            <p className="py-6">
              Share your food and nutrition knowledge to the community. Write
              your blogs today
            </p>
            <button className="btn bg-btn">Get Started</button>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly gap-y-4 flex-wrap mx-10">
        {data.map((item, idx) => {
          return (
            <Card
              key={idx + 1}
              Heading={item.title}
              author={item.author}
              Description={item.content}
              Image={item.image}
              id={idi[idx]}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Blog;
