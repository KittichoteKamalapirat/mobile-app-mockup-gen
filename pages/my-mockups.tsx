import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import Container from "../src/components/containers/Container";
import Layout from "../src/components/layouts/Layout";
import { Loading } from "../src/components/Loading";
import MockupItem from "../src/components/MockupItem3d";
import PageHeading from "../src/components/typography/PageHeading";
import { auth, firestore } from "../src/firebase/client";
import { Mockup, updateMockups } from "../src/redux/slices/mockupReducer";
import { RootState } from "../src/redux/store";

interface Props {}

const MyMockups = ({}: Props) => {
  const mockups: Mockup[] = useSelector((state: RootState) => state.mockups);
  const dispatch = useDispatch();
  const [user, userLoading] = useAuthState(auth);

  console.log("mockups", mockups);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(firestore, "users", user?.uid);

      const mockupColRef = collection(userDocRef, "mockups");
      // Create the DB listener
      const unsuscribe = onSnapshot(mockupColRef, (snapshot) => {
        const myMockups = snapshot.docs.map((doc) => doc.data());
        dispatch(updateMockups(myMockups));
      });

      return () => {
        unsuscribe();
      };
    }
  }, [user, dispatch]);

  if (userLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <Container>
        <PageHeading heading="My Mockups" />

        <div className="grid grid-cols-2 md:grid-cols-4 mt-10">
          {mockups.map((mockup) => (
            <MockupItem mockup={mockup} key={mockup.name} />
          ))}
        </div>
      </Container>
    </Layout>
  );
};
export default MyMockups;
