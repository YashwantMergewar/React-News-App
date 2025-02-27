import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
        
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=7ed5f56d0441406e93f6a7ffb02a68ce";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles})
    }

    render() {
        return (
            <div className='container my-3'>
                <h2>InstaNews - Top Headlines</h2>
                <div className="row">
                {
                    this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title= {element.title ? element.title: ""} description={element.description ? element.description.slice(0, 71): ""} imageurl={element.urlToImage} newsurl={element.url}/>
                    </div>
                    })
                }
                </div>
                <div className="container d-flex justify-content-between">
                <button type="button" class="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
                <button type="button" class="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
