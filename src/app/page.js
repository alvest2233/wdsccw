"use client";
import React from "react";
import styles from "./page.module.css";
import TopHero from "./TopHero";
import AboutMe from "./AboutMe.jsx";
import DropDownInfo from "./DropDownInfo";
import dropDownText from "./dropDownText";
import LatestNews from "./LatestNews.jsx";
import { useState, useEffect } from "react";
import RSSParser from "rss-parser";
import DOMPurify from "dompurify";


// HTML stripping function using DOMPurify
const stripHtmlAndDecode = (htmlString) => {
  if (!htmlString) return '';
  
  // Use DOMPurify to sanitize and strip HTML
  const cleanHtml = DOMPurify.sanitize(htmlString, { 
    ALLOWED_TAGS: [], // Remove all HTML tags
    ALLOWED_ATTR: []  // Remove all attributes
  });
  
  // Decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = cleanHtml;
  const decoded = textarea.value;
  
  // Clean up extra whitespace
  let cleaned = decoded.replace(/\s+/g, ' ').trim();
  
  // Remove the standard newsletter greeting
  cleaned = cleaned.replace(/Welcome to the the City of London: Ward 13 [A-Za-z]+ \d{4} Newsletter\.?\s*Hello <<First Name>>\.?\s*/gi, '');
  
  // Remove any remaining generic greetings
  cleaned = cleaned.replace(/Hello <<First Name>>\.?\s*/gi, '');
  cleaned = cleaned.replace(/Welcome to the [^.]*Newsletter\.?\s*/gi, '');
  
  return cleaned.trim();
};

export default function Home() {
   const [newsItems, setNewsItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
  
    useEffect(() => {
      const fetchRSS = async () => {
        const parser = new RSSParser();
        try {
          const response = await fetch(
            "https://corsproxy.io/?https://us8.campaign-archive.com/feed?u=d7d8421e0c331407035def386&id=2899bf3f73"
          );
          
  
          if (!response.ok) {
            throw new Error(
              `Network error: ${response.status} - ${response.statusText}`
            );
          }
  
          const xmlText = await response.text();
          const feed = await parser.parseString(xmlText);
  
          const items = feed.items.slice(0,3)
            .map((item) => ({
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              description: stripHtmlAndDecode(item.content || item.contentSnippet || ""),
            }))
            .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

          setNewsItems(items);
          setFilteredItems(items);
          
        } catch (error) {
          console.error("Error fetching or parsing RSS feed:", error.message);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRSS();
    }, []);

   
    useEffect(() => {
      console.log(newsItems);
    }, [newsItems])

  return ( 
    <div>
      <TopHero />
      <AboutMe/>
      {dropDownText.map((item, index)=> {
        console.log(item)
        return <DropDownInfo
        key = {index}
        text = {item}
       
      />})}
      {error ? (
                <p>Error loading newsletters. Please try again later.</p>
              ) : loading ? (
                <p>Loading...</p>
              ) : newsItems.length > 0 ? (
                <LatestNews news={newsItems} />
              ) : (
                <p>No newsletters found.</p>
              )}
      
    </div>
  );
}
