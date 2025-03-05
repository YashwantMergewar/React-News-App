import React, {useEffect, useState}from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export const News = (props) =>{
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
    const toCapitalizeString = (str) =>{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const updateNews = async () =>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResult(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    
    useEffect(() =>{
        document.title = `InstaNews - ${toCapitalizeString(props.category)}`;
        updateNews();
        //eslint-disable-next-line
    },[])

    // const handlePreviousClick = async  () => {
    // setPage(page - 1);
    //     updateNews();
    // }
    // const handleNextClick = async () => {
    //     setPage(page + 1);
    //     updateNews();
    // }


        const fetchMoreData = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
            setPage(page + 1);
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(articles.concat(parsedData.articles));
            setTotalResult(parsedData.totalResult);
        };

        return (
            <>
                <h2 className='text-center' style={{margin: '35px 0px', marginTop: '90px'}}>InstaNews - Top {toCapitalizeString(props.category)} Headlines</h2>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResult}
                    loader={<Spinner />}
                    scrollableTarget="scrollableDiv">
                <div className="container">
                <div className="row">
                {
                    articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title= {element.title ? element.title: ""} description={element.description ? element.description.slice(0, 71): ""} 
                        imageurl={element.urlToImage} newsurl={element.url} 
                        author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                    })
                }
                </div>
                </div>
                </InfiniteScroll>
                {/* This is next previous button */}
                {/*<div className="container d-flex justify-content-between">
                    <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
                    <button disabled={page + 1 >= Math.ceil(totalResult/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
}

News.defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
