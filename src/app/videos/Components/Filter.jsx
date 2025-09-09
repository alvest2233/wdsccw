import React from "react";
import styles from "/src/app/videos/Styles/Filter.module.css"

const Filter= ({ selectedFilter, setFilter }) =>{
    const handleClick = (filterOption)=>{
        if (selectedFilter === filterOption){
            setFilter("");
        }
        else{
            setFilter(filterOption);
        }
    }
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Filter Videos</h1>
            <button className={styles.filter} onClick={() => handleClick("Promotion")} >
                <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={selectedFilter === "Promotion"}
                    readOnly
                />
                <span className={styles.text}>Promotion</span>
            </button>
            <button className={styles.filter} onClick={() => handleClick("Highlights") }>
                <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={selectedFilter === "Highlights"}
                    readOnly
                />
                <span className={styles.text}>City Highlights</span>
            </button>
            <button className={styles.filter} onClick={() => handleClick("Other")}>
                <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={selectedFilter === "Other"}
                    readOnly
                />
                <span className={styles.text}>Other</span>
            </button>
        </div>
    )
}

export default Filter;