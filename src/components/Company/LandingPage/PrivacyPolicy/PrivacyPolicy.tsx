import React, { Component } from 'react';

class PrivacyPolicy extends Component {
    render() {
        return (
            <div className="pdfViewer">
                <embed src="https://s3-ap-northeast-1.amazonaws.com/onetrovideo/OnetroPrivacyPolicy.pdf" width="100%" height="1000" />
            </div>
        )
    }
}

export default PrivacyPolicy;