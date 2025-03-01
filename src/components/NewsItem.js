import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageurl, newsurl, author, date, source} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                <span className="position-absolute top-0 badge rounded-pill text-bg-success">{source}</span>
                    <img src={!imageurl ? "https://www.castanetkamloops.net/content/2025/2/img_7043_p4149954.jpg":imageurl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}....</h5>
                        <p className="card-text">{description}....</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsurl} target='_blank' className="btn btn-sm btn-dark">Get More..!</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
