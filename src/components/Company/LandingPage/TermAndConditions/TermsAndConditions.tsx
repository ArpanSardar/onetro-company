import React, { Component } from 'react';
import './Style.css';

class TermsAndConditions extends Component {
    render() {
        return (
            <div className="pdfViewer">
                <embed src="https://s3-ap-northeast-1.amazonaws.com/onetrovideo/OnetroTermsandConditions.pdf" width="100%" height="1000" />
            </div>
        )
    }
}

export default TermsAndConditions;