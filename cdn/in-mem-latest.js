(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./lib/index.js');

},{"./lib/index.js":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbms = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('./helper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DBMS = function (_Array) {
  _inherits(DBMS, _Array);

  function DBMS() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DBMS);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DBMS.__proto__ || Object.getPrototypeOf(DBMS)).call.apply(_ref, [this].concat(args))), _this), _this.id = (0, _helper.getId)(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DBMS, [{
    key: 'insert',
    value: function insert(table, record) {
      var id = (0, _helper.getId)(table, table),
          updatedRecord = (0, _helper.deepAssign)(record, { id: id });
      this.push(updatedRecord);
      return updatedRecord;
    }
  }, {
    key: 'update',
    value: function update(table, id, newRecord) {
      var override = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var recordIndex = this.findIndex(function (record) {
        return DBMS.isBelongsTo(record, table) && record.id === id;
      });
      if (recordIndex >= 0) {
        this[recordIndex] = override ? (0, _helper.deepAssign)({ id: this[recordIndex].id }, newRecord) : (0, _helper.deepAssign)(this[recordIndex], newRecord);
        return this[recordIndex];
      }
    }
  }, {
    key: 'find',
    value: function find(table) {
      var where = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (record, i) {
        return true;
      };

      if (arguments.length === 1) return this.filter(function (record) {
        return DBMS.isBelongsTo(record, table);
      });else return this.filter(function (record, i) {
        return DBMS.isBelongsTo(record, table) && where(record, i);
      });
    }
  }, {
    key: 'remove',
    value: function remove(table, where) {

      if (arguments.length === 1) this.removeIf(function (record) {
        return DBMS.isBelongsTo(record, table);
      });else this.removeIf(function (record, i) {
        return DBMS.isBelongsTo(record, table) && where(record, i);
      });
    }
  }, {
    key: 'removeIf',
    value: function removeIf(callback) {
      var i = this.length;
      while (i--) {
        if (callback(this[i], i)) {
          this.splice(i, 1);
        }
      }
    }
  }], [{
    key: 'isBelongsTo',
    value: function isBelongsTo(record, table) {
      return record.id.startsWith(table) && record.id.endsWith(table);
    }
  }]);

  return DBMS;
}(Array);

var dbms = exports.dbms = new DBMS();
exports.default = DBMS;
},{"./helper":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepAssign = deepAssign;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function deepAssign(target, source) {
  var output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(function (key) {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, _defineProperty({}, key, source[key]));else output[key] = deepAssign(target[key], source[key]);
      } else {
        Object.assign(output, _defineProperty({}, key, source[key]));
      }
    });
  }
  return output;
}

var getId = exports.getId = function getId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '_';
  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  return prefix + parseInt(Math.random() * 10E10) + Date.now() + suffix;
};
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.del = exports.update = exports.select = exports.insert = undefined;

var _DBMS = require('./DBMS');

var insert = exports.insert = _DBMS.dbms.insert.bind(undefined);
var select = exports.select = _DBMS.dbms.find.bind(undefined);
var update = exports.update = _DBMS.dbms.update.bind(undefined);
var del = exports.del = _DBMS.dbms.remove.bind(undefined);
},{"./DBMS":2}]},{},[1]);
