import React from "react";
import { useData } from "../context/DataContext";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { userID } = useParams();
  const { data } = useData();
  const { posts, users, comments } = data;

  const userName = users.find(
    (user) => user.userID === parseInt(userID)
  )?.nazwa;

  return (
    <>
      <h2>Posty użytkownika {userName}</h2>
      {posts
        .filter((post) => post.userID === parseInt(userID))
        .map((post) => (
          <div key={post.postID}>
            <h3>
              <strong>{post.tytul}</strong>
            </h3>
            <p>{post.tresc}</p>
            <p>
              Komentarze:{" "}
              {
                comments.filter((comment) => comment.postID === post.postID)
                  .length
              }
            </p>
            <p>Polubienia: {post.polub}</p>
          </div>
        ))}
    </>
  );
};

export default UserPage;
