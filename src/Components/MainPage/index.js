import React from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, NavbarBrand } from 'reactstrap';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'

const photos = [
  { src: '/images/vict-baby.png' },
  { src: '/images/ned.jpeg' },
  { src: '/images/devilgirl.jpg' },
  { src: '/images/trump.jpg' },
  { src: '/images/one-does-not.jpg' },
  { src: '/images/dank.png' },
  { src: '/images/boy.png' },
  { src: '/images/sad.png' },
  { src: '/images/wolf.png' },
  { src: '/images/fry.jpg' },
  { src: '/images/jobs.jpg' },
  { src: '/images/phone.jpg' },
  { src: '/images/oldie.png' },
  { src: '/images/image.png' },
  { src: '/images/doubt.png' },
  { src: '/images/crying.png' },
  { src: '/images/sponge.png' },
  { src: '/images/dog.png' },
  { src: '/images/frust.png' },
  { src: '/images/web.png' },
  { src: '/images/penguin.png' }
];

const initialState = {
  toptext: "",
  bottomtext: "",
  isTopDragging: false,
  isBottomDragging: false,
  topY: "10%",
  topX: "50%",
  bottomX: "50%",
  bottomY: "90%",
  fontFamily: "Impact",
  fontSize: 50,
  displayFontColorPicker: false,
  displayStrokeColorPicker: false,
  fontColor: "#FFF",
  strokeColor: "#000"
}

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      modalIsOpen: false,
      ...initialState
    };
  }

  openImage = (index) => {
    this.setState(prevState => ({
      currentImage: index,
      modalIsOpen: !prevState.modalIsOpen,
      ...initialState
    }));
  }

  toggle = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  }

  changeText = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  changeFontFamily = (event) => {
    this.setState({
      fontFamily: event.currentTarget.value
    });
  }

  changeFontSize = (event) => {
    this.setState({
      fontSize: event.currentTarget.value
    });
  }

  handleFontColorClick = () => {
    this.setState({
      displayFontColorPicker: !this.state.displayFontColorPicker
    });
  };

  handleFontColorClose = () => {
    this.setState({
      displayFontColorPicker: false
    });
  };

  handleFontColorChange = (color) => {
    this.setState({
      fontColor: color.hex
    });
  };

  handleStrokeColorClick = () => {
    this.setState({
      displayStrokeColorPicker: !this.state.displayStrokeColorPicker
    });
  };

  handleStrokeColorClose = () => {
    this.setState({
      displayStrokeColorPicker: false
    });
  };

  handleStrokeColorChange = (color) => {
    this.setState({
      strokeColor: color.hex
    });
  };

  getStateObj = (e, type) => {
    let rect = this.imageRef.getBoundingClientRect();
    const xOffset = e.clientX - rect.left;
    const yOffset = e.clientY - rect.top;
    let stateObj = {};
    if (type === "bottom") {
      stateObj = {
        isBottomDragging: true,
        isTopDragging: false,
        bottomX: `${xOffset}px`,
        bottomY: `${yOffset}px`
      }
    } else if (type === "top") {
      stateObj = {
        isTopDragging: true,
        isBottomDragging: false,
        topX: `${xOffset}px`,
        topY: `${yOffset}px`
      }
    }
    return stateObj;
  }

  handleMouseDown = (e, type) => {
    const stateObj = this.getStateObj(e, type);
    document.addEventListener('mousemove', (event) => this.handleMouseMove(event, type));
    this.setState({
      ...stateObj
    })
  }

  handleMouseMove = (e, type) => {
    if (this.state.isTopDragging || this.state.isBottomDragging) {
      let stateObj = {};
      if (type === "bottom" && this.state.isBottomDragging) {
        stateObj = this.getStateObj(e, type);
      } else if (type === "top" && this.state.isTopDragging){
        stateObj = this.getStateObj(e, type);
      }
      this.setState({
        ...stateObj
      });
    }
  };

  handleMouseUp = (event) => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({
      isTopDragging: false,
      isBottomDragging: false
    });
  }

  convertSvgToImage = () => {

    alert("Oops! This is still under //TODO");
    return;

    const svg = this.svgRef;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    var ctx = canvas.getContext( "2d" );
    var img = document.createElement("img");
    img.setAttribute( "src", "data:image/svg+xml;base64," + btoa(svgData));
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      // SVG is converted to image! Its done!
      console.log(canvas.toDataURL("image/png"));
    };
  };

  render() {
    const image = photos[this.state.currentImage];
    const base_image = new Image();
    base_image.src = image.src;
    var wrh = base_image.width / base_image.height;
    var newWidth = 600;
    var newHeight = newWidth / wrh;
    const textStyle = {
      fontFamily: this.state.fontFamily,
      fontSize: this.state.fontSize+"px",
      textTransform: "uppercase",
      fill: this.state.fontColor,
      stroke: this.state.strokeColor,
      userSelect: "none"
    }

    const colorPickerStyles = reactCSS({
      'default': {
        fontcolor: {
          height: '14px',
          borderRadius: '2px',
          background: `${ this.state.fontColor }`,
        },
        strokecolor: {
          height: '14px',
          borderRadius: '2px',
          background: `${ this.state.strokeColor }`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div className="main-content">
          <div className="sidebar">
            <NavbarBrand href="/">Make-a-Meme</NavbarBrand>
            <p>
              This is a fun 5 + 10 hour project inspired by imgur. Built with React.
            </p>
            <p>
              You can add top and bottom text to a meme-template, move the text around and can save the image by downloading it.
            </p>
          </div>
          <div className="content">
            {photos.map((image, index) => (
              <div className="image-holder" key={image.src}>
                <span className="meme-top-caption">Top text</span>
                <img
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    height: "100%"
                  }}
                  alt={index}
                  src={image.src}
                  onClick={() => this.openImage(index)}
                  role="presentation"
                />
              <span className="meme-bottom-caption">Bottom text</span>
              </div>
            ))}
          </div>
        </div>
        <Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggle}>Make-a-Meme</ModalHeader>
          <ModalBody>
            <svg
              ref={el => { this.svgRef = el }}
              width={newWidth}
              height={newHeight}
              xmlns="http://www.w3.org/2000/svg"
              xmlnshlink="http://www.w3.org/1999/xlink">
              <image
                ref={el => { this.imageRef = el }}
                xlinkHref={photos[this.state.currentImage].src}
                height={newHeight}
                width={newWidth}
              />
              <text
                style={{ ...textStyle, zIndex: this.state.isTopDragging ? 4 : 1 }}
                x={this.state.topX}
                y={this.state.topY}
                dominantBaseline="middle"
                textAnchor="middle"
                onMouseDown={event => this.handleMouseDown(event, 'top')}
                onMouseUp={event => this.handleMouseUp(event, 'top')}
              >
                  {this.state.toptext}
              </text>
              <text
                style={textStyle}
                dominantBaseline="middle"
                textAnchor="middle"
                x={this.state.bottomX}
                y={this.state.bottomY}
                onMouseDown={event => this.handleMouseDown(event, 'bottom')}
                onMouseUp={event => this.handleMouseUp(event, 'bottom')}
              >
                  {this.state.bottomtext}
              </text>
            </svg>
            <div className="meme-form">
            <FormGroup>
              <Label for="fontfamily">Font Family</Label>
              <select id="fontfamily" name="fontfamily" className="form-control" placeholder="select" onChange={this.changeFontFamily}>
                <option value="Impact">Impact</option>
                <option value="Metal Mania">Metal Mania</option>
                <option value="Architects Daughter">Architects Daughter</option>
                <option value="Italianno">Italianno</option>
                <option value="PT Mono">PT Mono</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="fontsize">Font Size</Label>
              <select id="fontsize" name="fontsize" className="form-control" placeholder="select" onChange={this.changeFontSize}>
                <option value="50">50</option>
                <option value="45">45</option>
                <option value="40">40</option>
                <option value="35">35</option>
                <option value="30">30</option>
                <option value="25">25</option>
                <option value="20">20</option>
                <option value="15">15</option>
                <option value="10">10</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="fontColor">Font Color</Label>
              <div style={ colorPickerStyles.swatch } onClick={ this.handleFontColorClick }>
                <div style={ colorPickerStyles.fontcolor } />
              </div>
              { this.state.displayFontColorPicker ? <div style={ colorPickerStyles.popover }>
                <div style={ colorPickerStyles.cover } onClick={ this.handleFontColorClose }/>
                <SketchPicker name="fontColor" color={ this.state.fontColor } onChange={ this.handleFontColorChange } />
              </div> : null }
            </FormGroup>
            <FormGroup>
              <Label for="strokeColor">Stroke Color</Label>
              <div style={ colorPickerStyles.swatch } onClick={ this.handleStrokeColorClick }>
                <div style={ colorPickerStyles.strokecolor } />
              </div>
              { this.state.displayStrokeColorPicker ? <div style={ colorPickerStyles.popover }>
                <div style={ colorPickerStyles.cover } onClick={ this.handleStrokeColorClose }/>
                <SketchPicker name="strokeColor" color={ this.state.strokeColor } onChange={ this.handleStrokeColorChange } />
              </div> : null }
            </FormGroup>
              <FormGroup>
                <Label for="toptext">Top Text</Label>
                <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
              </FormGroup>
              <FormGroup>
                <Label for="bottomtext">Bottom Text</Label>
                <input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText} />
              </FormGroup>
              <button className="btn btn-primary" onClick={this.convertSvgToImage}>Download Meme!</button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default MainPage;
