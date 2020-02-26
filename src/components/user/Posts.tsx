import { IonContent } from "@ionic/react";
import React from "react";
import Post from "./Post";

interface PostsProps {
  data: [];
}

const Posts: React.FC<PostsProps> = ({ data = [] }) => {
  return (
    <IonContent>
      {data.map((each, i) => (
        <Post key={i} {...each} />
      ))}
    </IonContent>
  );
};

export default Posts;
