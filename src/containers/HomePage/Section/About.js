import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        return (
            <div className='section-about section-share'>
                <div className='section-about-header'>
                    Smile Forever
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/yEvMW5KZKEk" title="Smile Forever" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Chúng ta thường được khuyến khích rằng hãy đi tìm và theo đuổi đam mê. Nhưng rồi song song đó chúng ta cũng nghe rất nhiều lời khuyên ngược lại rằng theo đuổi đam mê là một điều nguy hiểm. Vậy đứng giữa 2 luồng ý kiến trái ngược này, đâu sẽ là câu trả lời đúng cho câu hỏi quan trọng này?
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
