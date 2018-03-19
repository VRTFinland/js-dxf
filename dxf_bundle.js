require=(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Arc = function () {
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     * @param {number} startAngle - degree 
     * @param {number} endAngle - degree 
     */
    function Arc(x1, y1, r, startAngle, endAngle) {
        _classCallCheck(this, Arc);

        this.x1 = x1;
        this.y1 = y1;
        this.r = r;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    _createClass(Arc, [{
        key: "toDxfString",
        value: function toDxfString() {
            //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
            var s = "0\nARC\n";
            s += "8\n" + this.layer.name + "\n";
            s += "10\n" + this.x1 + "\n20\n" + this.y1 + "\n30\n0\n";
            s += "40\n" + this.r + "\n50\n" + this.startAngle + "\n51\n" + this.endAngle + "\n";
            return s;
        }
    }]);

    return Arc;
}();

module.exports = Arc;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     */
    function Circle(x1, y1, r) {
        _classCallCheck(this, Circle);

        this.x1 = x1;
        this.y1 = y1;
        this.r = r;
    }

    _createClass(Circle, [{
        key: "toDxfString",
        value: function toDxfString() {
            //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/circle_al_u05_c.htm
            var s = "0\nCIRCLE\n";
            s += "8\n" + this.layer.name + "\n";
            s += "10\n" + this.x1 + "\n20\n" + this.y1 + "\n30\n0\n";
            s += "40\n" + this.r + "\n";
            return s;
        }
    }]);

    return Circle;
}();

module.exports = Circle;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layer = function () {
    function Layer(name, colorNumber, lineTypeName) {
        _classCallCheck(this, Layer);

        this.name = name;
        this.colorNumber = colorNumber;
        this.lineTypeName = lineTypeName;
        this.shapes = [];
    }

    _createClass(Layer, [{
        key: 'toDxfString',
        value: function toDxfString() {
            var s = '0\nLAYER\n';
            s += '70\n64\n';
            s += '2\n' + this.name + '\n';
            s += '62\n' + this.colorNumber + '\n';
            s += '6\n' + this.lineTypeName + '\n';
            return s;
        }
    }, {
        key: 'addShape',
        value: function addShape(shape) {
            this.shapes.push(shape);
            shape.layer = this;
        }
    }, {
        key: 'getShapes',
        value: function getShapes() {
            return this.shapes;
        }
    }, {
        key: 'shapesToDxf',
        value: function shapesToDxf() {
            var s = '';
            for (var i = 0; i < this.shapes.length; ++i) {
                s += this.shapes[i].toDxfString();
            }

            return s;
        }
    }]);

    return Layer;
}();

module.exports = Layer;

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
    function Line(x1, y1, x2, y2) {
        _classCallCheck(this, Line);

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    _createClass(Line, [{
        key: "toDxfString",
        value: function toDxfString() {
            //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
            var s = "0\nLINE\n";
            s += "8\n" + this.layer.name + "\n";
            s += "10\n" + this.x1 + "\n20\n" + this.y1 + "\n30\n0\n";
            s += "11\n" + this.x2 + "\n21\n" + this.y2 + "\n31\n0\n";
            return s;
        }
    }]);

    return Line;
}();

module.exports = Line;

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LineType = function () {
    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a 
     */
    function LineType(name, description, elements) {
        _classCallCheck(this, LineType);

        this.name = name;
        this.description = description;
        this.elements = elements;
    }

    /**
     * @link https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
     */


    _createClass(LineType, [{
        key: 'toDxfString',
        value: function toDxfString() {
            var s = '0\nLTYPE\n';
            s += '72\n65\n';
            s += '70\n64\n';
            s += '2\n' + this.name + '\n';
            s += '3\n' + this.description + '\n';
            s += '73\n' + this.elements.length + '\n';
            s += '40\n' + this.getElementsSum() + '\n';

            for (var i = 0; i < this.elements.length; ++i) {
                s += '49\n' + this.elements[i] + '\n';
            }

            return s;
        }
    }, {
        key: 'getElementsSum',
        value: function getElementsSum() {
            var sum = 0;
            for (var i = 0; i < this.elements.length; ++i) {
                sum += Math.abs(this.elements[i]);
            }

            return sum;
        }
    }]);

    return LineType;
}();

module.exports = LineType;

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polyline = function () {
    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ]
     */
    function Polyline(points) {
        _classCallCheck(this, Polyline);

        this.points = points;
    }

    _createClass(Polyline, [{
        key: "toDxfString",
        value: function toDxfString() {
            //https://www.autodesk.com/techpubs/autocad/acad2000/dxf/polyline_dxf_06.htm
            //https://www.autodesk.com/techpubs/autocad/acad2000/dxf/vertex_dxf_06.htm
            var s = "0\nPOLYLINE\n";
            s += "8\n" + this.layer.name + "\n";
            s += "66\n1\n70\n0\n";

            for (var i = 0; i < this.points.length; ++i) {
                s += "0\nVERTEX\n";
                s += "8\n" + this.layer.name + "\n";
                s += "70\n0\n";
                s += "10\n" + this.points[i][0] + "\n20\n" + this.points[i][1] + "\n";
            }

            s += "0\nSEQEND\n";
            return s;
        }
    }]);

    return Polyline;
}();

module.exports = Polyline;

},{}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Text = function () {
    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     */
    function Text(x1, y1, height, rotation, value) {
        _classCallCheck(this, Text);

        this.x1 = x1;
        this.y1 = y1;
        this.height = height;
        this.rotation = rotation;
        this.value = value;
    }

    _createClass(Text, [{
        key: "toDxfString",
        value: function toDxfString() {
            //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm
            var s = "0\nTEXT\n";
            s += "8\n" + this.layer.name + "\n";
            s += "1\n" + this.value + "\n";
            s += "10\n" + this.x1 + "\n20\n" + this.y1 + "\n30\n0\n";
            s += "40\n" + this.height + "\n50\n" + this.rotation + "\n";
            return s;
        }
    }]);

    return Text;
}();

module.exports = Text;

},{}],"Drawing":[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LineType = require('./LineType');
var Layer = require('./Layer');
var Line = require('./Line');
var Arc = require('./Arc');
var Circle = require('./Circle');
var Text = require('./Text');
var Polyline = require('./Polyline');

var Drawing = function () {
    function Drawing() {
        _classCallCheck(this, Drawing);

        this.layers = {};
        this.activeLayer = null;
        this.lineTypes = {};

        for (var i = 0; i < Drawing.LINE_TYPES.length; ++i) {
            this.addLineType(Drawing.LINE_TYPES[i].name, Drawing.LINE_TYPES[i].description, Drawing.LINE_TYPES[i].elements);
        }

        for (var _i = 0; _i < Drawing.LAYERS.length; ++_i) {
            this.addLayer(Drawing.LAYERS[_i].name, Drawing.LAYERS[_i].colorNumber, Drawing.LAYERS[_i].lineTypeName);
        }

        this.setActiveLayer('0');
    }

    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a 
     */


    _createClass(Drawing, [{
        key: 'addLineType',
        value: function addLineType(name, description, elements) {
            this.lineTypes[name] = new LineType(name, description, elements);
            return this;
        }
    }, {
        key: 'addLayer',
        value: function addLayer(name, colorNumber, lineTypeName) {
            this.layers[name] = new Layer(name, colorNumber, lineTypeName);
            return this;
        }
    }, {
        key: 'setActiveLayer',
        value: function setActiveLayer(name) {
            this.activeLayer = this.layers[name];
            return this;
        }
    }, {
        key: 'drawLine',
        value: function drawLine(x1, y1, x2, y2) {
            this.activeLayer.addShape(new Line(x1, y1, x2, y2));
            return this;
        }

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         * @param {number} startAngle - degree 
         * @param {number} endAngle - degree 
         */

    }, {
        key: 'drawArc',
        value: function drawArc(x1, y1, r, startAngle, endAngle) {
            this.activeLayer.addShape(new Arc(x1, y1, r, startAngle, endAngle));
            return this;
        }

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         */

    }, {
        key: 'drawCircle',
        value: function drawCircle(x1, y1, r) {
            this.activeLayer.addShape(new Circle(x1, y1, r));
            return this;
        }

        /**
         * @param {number} x1 - x
         * @param {number} y1 - y
         * @param {number} height - Text height
         * @param {number} rotation - Text rotation
         * @param {string} value - the string itself
         */

    }, {
        key: 'drawText',
        value: function drawText(x1, y1, height, rotation, value) {
            this.activeLayer.addShape(new Text(x1, y1, height, rotation, value));
            return this;
        }

        /**
         * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ] 
         */

    }, {
        key: 'drawPolyline',
        value: function drawPolyline(points) {
            this.activeLayer.addShape(new Polyline(points));
            return this;
        }
    }, {
        key: '_getDxfLtypeTable',
        value: function _getDxfLtypeTable() {
            var s = '0\nTABLE\n'; //start table
            s += '2\nLTYPE\n'; //name table as LTYPE table

            for (var lineTypeName in this.lineTypes) {
                s += this.lineTypes[lineTypeName].toDxfString();
            }

            s += '0\nENDTAB\n'; //end table

            return s;
        }
    }, {
        key: '_getDxfLayerTable',
        value: function _getDxfLayerTable() {
            var s = '0\nTABLE\n'; //start table
            s += '2\nLAYER\n'; //name table as LAYER table

            for (var layerName in this.layers) {
                s += this.layers[layerName].toDxfString();
            }

            s += '0\nENDTAB\n';

            return s;
        }
    }, {
        key: 'toDxfString',
        value: function toDxfString() {
            var s = '';

            //start section
            s += '0\nSECTION\n';
            //name section as TABLES section
            s += '2\nTABLES\n';

            s += this._getDxfLtypeTable();
            s += this._getDxfLayerTable();

            //end section
            s += '0\nENDSEC\n';

            //ENTITES section
            s += '0\nSECTION\n';
            s += '2\nENTITIES\n';

            for (var layerName in this.layers) {
                var layer = this.layers[layerName];
                s += layer.shapesToDxf();
                // let shapes = layer.getShapes();
            }

            s += '0\nENDSEC\n';

            //close file
            s += '0\nEOF';

            return s;
        }
    }]);

    return Drawing;
}();

//AutoCAD Color Index (ACI)
//http://sub-atomic.com/~moses/acadcolors.html


Drawing.ACI = {
    LAYER: 0,
    RED: 1,
    YELLOW: 2,
    GREEN: 3,
    CYAN: 4,
    BLUE: 5,
    MAGENTA: 6,
    WHITE: 7
};

Drawing.LINE_TYPES = [{ name: 'CONTINUOUS', description: '______', elements: [] }, { name: 'DASHED', description: '_ _ _ ', elements: [5.0, -5.0] }, { name: 'DOTTED', description: '. . . ', elements: [0.0, -5.0] }];

Drawing.LAYERS = [{ name: '0', colorNumber: Drawing.ACI.WHITE, lineTypeName: 'CONTINUOUS' }];

module.exports = Drawing;

},{"./Arc":1,"./Circle":2,"./Layer":3,"./Line":4,"./LineType":5,"./Polyline":6,"./Text":7}]},{},[]);
