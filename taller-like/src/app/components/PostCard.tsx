
// src/app/components/PostCard.tsx

import React, { useState, useEffect } from 'react';
import { Datum } from '../interfaces/post.interface';
import { addLike, getLikesForPost } from '../controller/like.controller'; 
import  styles  from '../components/styles/post.module.css';

const PostCard: React.FC<{
  post: Datum;
  
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ post, onEdit, onDelete }) => {
  const [likes, setLikes] = useState<number>(0); // Número inicial de "likes"
  const [userId, setUserId] = useState<string>(''); // Obtén el user_id según sea necesario

   // Obtener el número inicial de "likes" cuando el componente se monta
   useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await getLikesForPost(post.id);
        const initialLikes = response.likes.length > 0 ? response.likes[0].quantity : 0;
        setLikes(initialLikes);
      } catch (err) {
        console.error('Failed to fetch initial likes:', err);
      }
    };
  
    fetchLikes();
  }, [post.id]);


  const handleLike = async () => {
    try {
      const response = await addLike({
        quantity: likes + 1,
        post_id: Number(post.id),
        id: '' // Asegúrate de que este ID esté correctamente manejado según tu backend
      });
  
      // Asegúrate de que `response.likes` esté definido y tenga una longitud adecuada
      const updatedLikes = response && response.likes && response.likes.length > 0
        ? response.likes[0].quantity
        : likes + 1;
  
      setLikes(updatedLikes);
    } catch (err) {
      console.error('Failed to add like:', err);
    }
  };
  return (
    <figure className={styles.card}>
      <h2 className={styles.title}>{post.title}</h2>
      <h4 className={styles.author}>Author: </h4>
      <figcaption className={styles.body}>
        <h5 className={styles.description}>{post.description}</h5>
        <p className={styles.summary}>Summary goes here </p>
        <h6 className={styles.date}>Publication Date </h6>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.warning}`}
            type="button"
            onClick={() => onEdit(post.id)}
          >
            Edit
          </button>
          <button
            className={`${styles.button} ${styles.danger}`}
            type="button"
            onClick={() => onDelete(post.id)}
          >
            Delete
          </button>
          <button
            className={`${styles.button} ${styles.primary}`}
            type="button"
            onClick={handleLike}
          >
            Like ({likes})
          </button>
        </div>
      </figcaption>
    </figure>
  );
};

export default PostCard;