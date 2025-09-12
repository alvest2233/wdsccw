import React from "react";
import styles from "./page.module.css";

export default function LatestNews(props) {
  console.log(props.news[0])
  return (
    <div className={styles.latestNews}>
      <h2 className={styles.latestNewsHeading}>Latest News</h2>
      <div className={styles.latestNewsGrid}>
      
      {props.news.map((item, index) => {
        // Description is already cleaned by stripHtmlAndDecode function
        const words = item.description.split(/\s+/).filter(word => word.length > 0);
        const truncatedDescription = words.length > 65 
          ? words.slice(0, 65).join(' ') + '...' 
          : item.description;
        
        // Debug logging
        console.log('News item:', index, {
          title: item.title,
          description: item.description,
          truncatedDescription: truncatedDescription,
          wordCount: words.length
        });
        
        return (
            <div key = {index} className={styles.latestNewsGridItem}>
              <h4 className={styles.latestNewsTitle}>{item.title}</h4>
              <p className={styles.latestNewsDate}>{new Date(item.pubDate).toLocaleDateString()}</p>
              {truncatedDescription && (
                <p className={styles.latestNewsText}>{truncatedDescription}</p>
              )}
            </div>
         
        );
      })}
      
      
    </div>
  </div>
  );
}
