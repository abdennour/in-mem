(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.inMem = require('../index');

},{"../index":2}],2:[function(require,module,exports){
module.exports = require('./lib/index.js');

},{"./lib/index.js":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbms = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _helper = require('./helper');

var _babelAutobind = require('babel-autobind');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var config = {
  idCol: '$$id'
};

var DBMS = (0, _babelAutobind.Autobind)(_class = function (_extendableBuiltin2) {
  _inherits(DBMS, _extendableBuiltin2);

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
    key: 'getId',
    value: function getId() {
      return _helper.getId.apply(undefined, arguments);
    }
  }, {
    key: 'insert',
    value: function insert(table) {
      var _this2 = this;

      for (var _len2 = arguments.length, records = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        records[_key2 - 1] = arguments[_key2];
      }

      var added = records.map(function (record) {
        var _deepAssign;

        var id = _this2.getId(table, table),
            updatedRecord = (0, _helper.deepAssign)(record, (_deepAssign = {}, _defineProperty(_deepAssign, config.idCol, id), _defineProperty(_deepAssign, 'dateCreated', new Date()), _deepAssign));
        _this2.push(updatedRecord);
        return updatedRecord;
      });
      if (records.length === 1) return added[0];

      return added;
    }
  }, {
    key: 'update',
    value: function update(table, where, newRecord) {
      var _this3 = this;

      var override = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var recordIndexes = this.findIndexes(function (record, i) {
        return DBMS.isBelongsTo(record, table) && where(record, i);
      });
      recordIndexes.forEach(function (index) {
        var _extends2;

        _this3[index] = (0, _helper.updateObject)(_extends({}, typeof newRecord === 'function' ? newRecord(_extends({}, _this3[index])) : newRecord, (_extends2 = {}, _defineProperty(_extends2, config.idCol, _this3[index][config.idCol]), _defineProperty(_extends2, 'lastUpdated', new Date()), _extends2)), _this3[index], override);
      });
      return recordIndexes.map(function (index) {
        return _this3[index];
      });
    }
  }, {
    key: 'findIndexes',
    value: function findIndexes(where) {
      return this.reduce(function (a, e, i) {
        return where(e, i) ? a.concat(i) : a;
      }, []);
    }
  }, {
    key: 'findAll',
    value: function findAll(table) {
      var where = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (record, i) {
        return true;
      };

      return this.filter(function (record, i) {
        return DBMS.isBelongsTo(record, table) && where(record, i);
      });
    }
  }, {
    key: 'find',
    value: function find() {
      var results = this.findAll.apply(this, arguments);
      if (results.length) return results[0];
    }
  }, {
    key: 'findById',
    value: function findById(table, id) {
      return this.find(table, function (record) {
        return record.id === id;
      });
    }
  }, {
    key: 'findByLocalId',
    value: function findByLocalId(table, id) {
      return this.find(table, function (record) {
        return record[config.idCol] === id;
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
  }, {
    key: 'count',
    value: function count(table) {
      if (!arguments.length) return this.length;
      return this.findAll(table).length;
    }
  }], [{
    key: 'isBelongsTo',
    value: function isBelongsTo(record, table) {
      return record[config.idCol].startsWith(table) && record[config.idCol].endsWith(table);
    }
  }]);

  return DBMS;
}(_extendableBuiltin(Array))) || _class;

var dbms = exports.dbms = new DBMS();
exports.default = DBMS;
},{"./helper":4,"babel-autobind":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.deepAssign = deepAssign;
exports.isObject = isObject;
exports.updateObject = updateObject;

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

function isObject(item) {
  return item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !Array.isArray(item) && item !== null;
}

var getId = exports.getId = function getId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '_';
  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  return prefix + parseInt(Math.random() * 10e10) + Date.now() + suffix;
};

function updateObject(newObj, oldObj, override) {
  return override ? newObj : deepAssign(oldObj, newObj);
}
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.count = exports.del = exports.update = exports.findByLocalId = exports.findById = exports.find = exports.findAll = exports.insert = exports.dbms = undefined;

var _DBMS = require('./DBMS');

exports.dbms = _DBMS.dbms;
var insert = exports.insert = _DBMS.dbms.insert.bind(undefined);
var findAll = exports.findAll = _DBMS.dbms.findAll.bind(undefined);
var find = exports.find = _DBMS.dbms.find.bind(undefined);
var findById = exports.findById = _DBMS.dbms.findById.bind(undefined);
var findByLocalId = exports.findByLocalId = _DBMS.dbms.findByLocalId.bind(undefined);
var update = exports.update = _DBMS.dbms.update.bind(undefined);
var del = exports.del = _DBMS.dbms.remove.bind(undefined);
var count = exports.count = _DBMS.dbms.count.bind(undefined);
},{"./DBMS":3}],6:[function(require,module,exports){
module.exports = require('./lib');

},{"./lib":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autobind = Autobind;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Autobind(Mocked, ClassName) {
  if (typeof Mocked === 'string') {
    return function (target) {
      return Autobind(target, Mocked);
    };
  }
  var methods = Object.getOwnPropertyNames(Mocked.prototype);
  var getMethodProperty = function getMethodProperty(methodName, prop) {
    return Object.getOwnPropertyDescriptor(Mocked.prototype, methodName)[prop];
  };
  var methodsExcluded = ['constructor', 'render'];
  var ruleIncluder = function ruleIncluder(methodName) {
    return methodsExcluded.indexOf(methodName) < 0 && typeof getMethodProperty(methodName, 'value') === 'function';
  };

  var Mocker = function (_Mocked) {
    _inherits(Mocker, _Mocked);

    function Mocker() {
      _classCallCheck(this, Mocker);

      var _this = _possibleConstructorReturn(this, (Mocker.__proto__ || Object.getPrototypeOf(Mocker)).apply(this, arguments));

      methods.filter(ruleIncluder).forEach(function (methodName) {
        _this[methodName] = _this[methodName].bind(_this);
      });
      return _this;
    }

    return Mocker;
  }(Mocked);

  var rename = function () {
    Object.defineProperty(Mocker, 'name', {
      writable: true
    });
    Mocker.name = ClassName || Mocked.name || 'AutoBoundComponent';
    Object.defineProperty(Mocker, 'name', {
      writable: false
    });
  }();

  Object.keys(Mocked).forEach(function (staticAttribute) {
    Mocker[staticAttribute] = Mocked[staticAttribute];
  });

  return Mocker;
};
},{}]},{},[1]);
