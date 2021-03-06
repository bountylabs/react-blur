var React = require('react'),
  ReactDOM = require('react-dom'),
  PureRenderMixin = require('react-addons-pure-render-mixin'),
  stackBlurImage = require('./StackBlur.js');

var ReactBlur = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    img: React.PropTypes.string.isRequired,
    blurRadius: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      blurRadius: 0
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.img !== nextProps.img) {
      var Blur = this;
      this.loadImage(nextProps, Blur);
    }
  },
  componentDidMount() {
    var Blur = this;
    this.setDimensions(Blur);
    this.loadImage(this.props, Blur);
  },
  loadImage(props, Blur) {
    Blur.img = new Image;
    Blur.img.crossOrigin = "Anonymous";

    Blur.img.onload = function(event){
      stackBlurImage( Blur.img, Blur.canvas, props.blurRadius, Blur.width, Blur.height);
      if (props.onLoadFunction && typeof props.onLoadFunction === "function") props.onLoadFunction(event);
    }.bind(this);

    Blur.img.onerror = function(event){
      Blur.img.src = "";
      if (props.onLoadFunction && typeof props.onLoadFunction === "function") props.onLoadFunction(event);
    }.bind(this);

    Blur.img.src = props.img;
  },

  setDimensions(Blur) {
    var container = ReactDOM.findDOMNode(Blur);

    Blur.height = Blur.props.height || container.offsetHeight;
    Blur.width = Blur.props.width || container.offsetWidth;

    Blur.canvas = Blur.refs.canvas;
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
