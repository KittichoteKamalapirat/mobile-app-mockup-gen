import type { NextPage } from "next";
import { firestoreConnect } from "react-redux-firebase";

import "firebase/compat/firestore";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import CreatePost from "../src/components/CreatePost";
import Layout from "../src/components/layouts/Layout";
import { Post } from "../src/redux/slices/postsReducer";

const Home: NextPage = () => {
  // const posts = useSelector((state) => state.posts);
  useFirestoreConnect(["posts"]); // sync posts collection from Firestore into redux
  const posts = useSelector((state) => state.firestore.data.posts);

  return (
    <Layout>
      <main className="flex-col items-center justify-center ">
        <div>
          {posts?.map((post: Post) => (
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

// export default firestoreConnect([{ collection: "posts" }])(Home);
export default compose(
  firestoreConnect(() => ["posts"]), // or { collection: 'todos' }
  connect((state, props) => {
    return {
      posts: state.firestore.ordered.posts,
    };
  })
)(Home);
