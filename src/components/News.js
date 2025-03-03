import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 6,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    toCapitalizeString = (str) =>{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page:1,
            totalResults: 0
        }

        document.title = `InstaNews - ${this.toCapitalizeString(this.props.category)}`;
        
    }

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState(
            {
                articles: parsedData.articles, 
                totalResults: parsedData.totalResults,
                loading: false,
            })
        this.props.setProgress(100);
    }

    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7ed5f56d0441406e93f6a7ffb02a68ce&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState(
        //     {
        //         articles: parsedData.articles, 
        //         totalResults: parsedData.totalResults,
        //         loading: false
        //     })
        this.updateNews();
    }

//     handlePreviousClick = async  () => {
//         console.log("Previous");
// //         let url = `
// // https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7ed5f56d0441406e93f6a7ffb02a68ce&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
// //         this.setState({loading: true});
// //         let data = await fetch(url);
// //         let parsedData = await data.json();
// //         this.setState({
// //             page: this.state.page - 1,
// //             articles: parsedData.articles,
// //             loading: false
// //         })

//         this.setState({page: this.state.page - 1});
//         this.updateNews();
//     }
//     handleNextClick = async () => {
//         console.log("Next");
// //         if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
// //             let url = `
// // https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7ed5f56d0441406e93f6a7ffb02a68ce&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
// //             this.setState({loading: true});
// //             let data = await fetch(url);
// //             let parsedData = await data.json();
// //             console.log(parsedData);
// //             this.setState({
// //                 page: this.state.page + 1,
// //                 articles: parsedData.articles,
// //                 loading: false
// //             })
// //         }
//         this.setState({page: this.state.page + 1});
//         this.updateNews();
//     }


        fetchMoreData = async () => {
            this.setState({page: this.state.page + 1});
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState(
                {
                    articles: this.state.articles.concat(parsedData.articles), 
                    totalResults: parsedData.totalResults,
                })
        };

    render() {
        return (
            <>
                <h2 className='text-center' style={{margin: '35px 0px'}}>InstaNews - Top {this.toCapitalizeString(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                    scrollableTarget="scrollableDiv">
                <div className="container">
                <div className="row">
                {
                    this.state.articles.map((element)=>{
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
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News
