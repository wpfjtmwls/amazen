import React from 'react';
import PropTypes from 'prop-types';
import ProductListing from './ProductListing.jsx';
import axios from 'axios';

export default class ResultPage extends React.Component {
    constructor() {
        super(...arguments);
        console.log(this.props);
        this.state = { positive: (this.props.positive.length != 0) ? this.props.positive.split(',') : [], 
            negative: (this.props.negative.length != 0) ? this.props.negative.split(',') : [],
                        products: [] };
    }

    componentDidMount() {
        axios.get("/search?query=" + this.props.query + "&positive=" + this.props.positive + "&negative=" + this.props.negative)
            .then(res => {
                this.setState({ products: res.data.data });
            });
    }

    render() {
        return (
            <div>
                <div className="result-page-bar-background">
                    <a href="/">
                        <img className="logo-small" src="/static/img/logo_s.png" width="200" />
                    </a>
                </div>
                {this.state.products.map(function (p, i) {
                    return <ProductListing
                        key={i}
                        productTitle={p.productTitle}
                        price={p.price}
                        seller={p.seller}
                        desc={p.desc}
                        keywords={p.keywords}
                        keywordscores={p.keywordscores}
                        keywordScoreList={p.keywordscorelist}
                        rating={p.rating}
                        imgUrl={p.imgUrl}
                        numRatings={p.numRatings}
                        asin={p.asin} />
                })}
            </div>
        );
    }
}

ResultPage.propTypes = {
    query: PropTypes.string.isRequired,
    descriptors: PropTypes.string,
};