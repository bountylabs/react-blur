'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react'),
    ReactDOM = require('react-dom'),
    PureRenderMixin = require('react-addons-pure-render-mixin'),
    stackBlurImage = require('./StackBlur.js');

var ReactBlur = React.createClass({
  displayName: 'ReactBlur',

  mixins: [PureRenderMixin],

  propTypes: {
    img: React.PropTypes.string.isRequired,
    blurRadius: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      blurRadius: 0
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.img !== nextProps.img) {
      var Blur = this;
      this.loadImage(nextProps, Blur);
    }
  },
  componentDidMount: function componentDidMount() {
    var Blur = this;
    this.setDimensions(Blur);
    this.loadImage(this.props, Blur);
  },
  loadImage: function loadImage(props, Blur) {
    Blur.img = new Image();
    Blur.img.crossOrigin = "Anonymous";

    Blur.img.onload = (function (event) {
      stackBlurImage(Blur.img, Blur.canvas, props.blurRadius, Blur.width, Blur.height);
      if (props.onLoadFunction && typeof props.onLoadFunction === "function") props.onLoadFunction(event);
    }).bind(this);

    Blur.img.onerror = (function (event) {
      Blur.img.src = "";
      if (props.onLoadFunction && typeof props.onLoadFunction === "function") props.onLoadFunction(event);
    }).bind(this);

    Blur.img.src = props.img;
  },

  setDimensions: function setDimensions(Blur) {
    var container = ReactDOM.findDOMNode(Blur);

    Blur.height = Blur.props.height || container.offsetHeight;
    Blur.width = Blur.props.width || container.offsetWidth;

    Blur.canvas = Blur.refs.canvas;
    Blur.canvas.height = Blur.height;
    Blur.canvas.width = Blur.width;
  },

  render: function render() {
    var _props = this.props;
    var img = _props.img;
    var className = _props.className;
    var children = _props.children;
    var other = _objectWithoutProperties(_props, ['img', 'className', 'children']);
    var classes = 'react-blur';

    if (className) {
      classes += ' ' + className;
    }

    var styles = {
      width: '100%',
      height: '100%'
    };

    return React.createElement(
      'div',
      _extends({}, other, {
        className: classes }),
      React.createElement('canvas', { className: 'react-blur-canvas', ref: 'canvas', style: styles }),
      children
    );
  }

});

module.exports = ReactBlur;