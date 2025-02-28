import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageurl, newsurl} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={!imageurl ? "https://www.castanetkamloops.net/content/2025/2/img_7043_p4149954.jpg":imageurl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}....</h5>
                        <p className="card-text">{description}....</p>
                        <a rel="noreferrer" href={newsurl} target='_blank' className="btn btn-sm btn-dark">Get More..!</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
