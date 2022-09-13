import type { NextPage } from "next";

import { useSelector } from "react-redux";
import CreatePost from "../src/components/CreatePost";
import Layout from "../src/components/layouts/Layout";
import Navbar from "../src/components/Navbar";
import { Post } from "../src/redux/slices/postsReducer";

const Home: NextPage = () => {
  const posts = useSelector((state) => state.posts);

  return (
    <Layout>
      <Navbar />
      <main className="flex-col items-center justify-center ">
        <div>
          {posts.map((post: Post) => (
            <div key={post.id}>
              <h2 className="text-xl text-primary">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>

        <CreatePost />
      </main>
    </Layout>
  );
};

export default Home;
