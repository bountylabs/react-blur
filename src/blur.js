var React = require('react/addons'),
  stackBlurImage = require('./StackBlur.js');

var ReactBlur = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    img: React.PropTypes.string.isRequired,
    blurRadius: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      blurRadius: 0
    }
  },

  componentDidMount() {
    var Blur = this;
    this.setDimensions();

    Blur.img = new Image;
    Blur.img.crossOrigin = "Anonymous";

    Blur.img.onload = function(event){
      stackBlurImage( Blur.img, Blur.canvas, Blur.props.blurRadius, Blur.width, Blur.height);
      if (this.props.onLoadFunction && typeof this.props.onLoadFunction === "function") this.props.onLoadFunction(event);
    }.bind(this);

    Blur.img.onerror = function(event){
      Blur.img.src = "";
      if (this.props.onLoadFunction && typeof this.props.onLoadFunction === "function") this.props.onLoadFunction(event);
    }.bind(this);

    Blur.img.src = Blur.props.img;
  },

  setDimensions() {
    var Blur = this;
    var container = Blur.getDOMNode();

    Blur.height = Blur.props.height || container.offsetHeight;
    Blur.width = Blur.props.width || container.offsetWidth;

    Blur.canvas = Blur.refs.canvas.getDOMNode();
    Blur.canvas.height = Blur.height;
    Blur.canvas.width = Blur.width;
  },

  render() {
    var {img, className, children, ...other} = this.props,
      classes = 'react-blur';

    if(className) {
      classes += ' ' + className;
    }

    var styles = {
      width: '100%',
      height: '100%'
    }

    return (
      <div
        {...other}
        className={classes} >

        <canvas className='react-blur-canvas' ref='canvas' style={styles}/>
        {children}
      </div>
    );
  }

});

module.exports = ReactBlur;
