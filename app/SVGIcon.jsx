import React from 'react';

import Image from 'semantic-ui-react/dist/commonjs/elements/Image';

class SVGIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image ui>
            <svg
                height={this.props.size}
                viewBox={'0 0 '+this.props.size+' '+this.props.size}
                width={this.props.size}
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d={this.props.path}
                    fill={this.props.inverted ? this.props.invertedColor : this.props.color}
                />
            </svg>
            </Image>
        );
    }
}

SVGIcon.defaultProps = {
    size: 24,
    color: '#000',
    invertedColor: '#fff'
}

SVGIcon.propTypes = {
    path: React.PropTypes.string.isRequired,
    inverted: React.PropTypes.bool,
    size: React.PropTypes.number,
    color: React.PropTypes.string,
    invertedColor: React.PropTypes.string
};

export default SVGIcon;
