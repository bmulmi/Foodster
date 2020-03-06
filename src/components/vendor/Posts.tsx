import { IonContent, IonTitle } from "@ionic/react";
import React from "react";
import Post from "./Post";

interface PostsProps {
  name: string;
  location: string;
  id: string;
  posts: any;
}

const Posts: React.FC<PostsProps> = ({
  name = "",
  id = "",
  location = "",
  posts = []
}) => {
  return (
    <IonContent>
      {posts.map((each: any, i: any) => (
        <Post
          key={i}
          id={id}
          name={name}
          location={location}
          validFrom={each.validFrom}
          validUntil={each.validUntil}
          description={each.description}
        />
      ))}
    </IonContent>
  );
};

export default Posts;
