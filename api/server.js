/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _routes_parcelsRoutesV1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes/parcelsRoutesV1 */ \"./src/routes/parcelsRoutesV1.js\");\n/* eslint-disable prefer-template */\n\n\nvar port = process.env.PORT || 9000;\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()(); // middleware\n\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.json());\napp.use('/api/v1/parcels/', _routes_parcelsRoutesV1__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\napp.get('/', function (req, res) {\n  res.json({\n    message: 'Welcome to my API, this is the information about my api',\n    apiV1Routes: {\n      gettingAllParcels: {\n        url: '/api/v1/parcels',\n        method: 'GET'\n      },\n      gettingASingleParcelById: {\n        url: '/api/v1/parcels/<parcelId>',\n        method: 'GET'\n      },\n      gettingParcelsByUserId: {\n        url: '/api/v1/users/<userId>/parcels',\n        method: 'GET'\n      },\n      creatingAParcel: {\n        url: '/api/v1/parcels',\n        method: 'POST',\n        objectFormat: {\n          userId: 'The id of the user creating the parcel',\n          weight: 'The weight of the parcel',\n          pickupLocation: 'The location where the parcel should be picked up',\n          destination: 'The parcel\\'s destination',\n          description: 'Some info about the parcel'\n        }\n      },\n      cancelParcel: {\n        url: '/api/v1/parcels/<parcelId>/cancel',\n        method: 'PUT'\n      }\n    }\n  });\n});\napp.get('/api/v1/users/:userId/parcels', function (req, res) {\n  var userId = Number.parseInt(req.params.userId, 10);\n  var userParcels = _routes_parcelsRoutesV1__WEBPACK_IMPORTED_MODULE_1__[\"myParcels\"].getParcelsByUserId(userId);\n\n  if (userParcels) {\n    res.status(200).json(userParcels);\n  } else {\n    res.status(200).json([]);\n  }\n}); // eslint-disable-next-line no-console\n\napp.listen(port, function () {\n  return console.log(\"the app started on port \".concat(port));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/classes/parcelsDataStructure.js":
/*!*********************************************!*\
  !*** ./src/classes/parcelsDataStructure.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === \"function\" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== \"function\") { throw new TypeError(\"Super expression must either be null or a function\"); } if (typeof _cache !== \"undefined\") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\n\nfunction isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf(\"[native code]\") !== -1; }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Parcel = function Parcel(_ref) {\n  var payload = _extends({}, _ref);\n\n  _classCallCheck(this, Parcel);\n\n  this.parcelId = payload.parcelId;\n  this.userId = payload.userId;\n  this.weight = payload.weight;\n  this.pickupLocation = payload.pickupLocation;\n  this.currentLocation = payload.pickupLocation;\n  this.destination = payload.destination;\n  this.description = payload.description;\n  this.delivered = payload.delivered;\n  this.price = payload.price;\n};\n\nvar ParcelsCollection =\n/*#__PURE__*/\nfunction (_Array) {\n  _inherits(ParcelsCollection, _Array);\n\n  function ParcelsCollection() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, ParcelsCollection);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ParcelsCollection)).call.apply(_getPrototypeOf2, [this].concat(args)));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"createNewParcel\", function (userId, weight, pickupLocation, destination, description, price) {\n      var parcelId;\n\n      if (_this.length <= 0) {\n        parcelId = 1;\n      } else {\n        parcelId = _this[_this.length - 1].parcelId + 1;\n      }\n\n      var newParcel = new Parcel({\n        parcelId: parcelId,\n        userId: userId,\n        weight: weight,\n        pickupLocation: pickupLocation,\n        destination: destination,\n        description: description,\n        price: price,\n        delivered: false\n      });\n\n      if (!newParcel.userId || !newParcel.pickupLocation || !newParcel.parcelId || !newParcel.weight || !newParcel.currentLocation || !newParcel.description || !newParcel.destination || !newParcel.price) {\n        return null;\n      }\n\n      _this.push(newParcel);\n\n      return _objectSpread({}, newParcel);\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"getParcelById\", function (parcelId) {\n      // eslint-disable-next-line no-restricted-syntax\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = _this.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var _step$value = _slicedToArray(_step.value, 2),\n              index = _step$value[0],\n              value = _step$value[1];\n\n          if (value.parcelId === parcelId) {\n            return {\n              index: index,\n              parcel: _objectSpread({}, value)\n            };\n          }\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator.return != null) {\n            _iterator.return();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n\n      return null;\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"getParcelsByUserId\", function (userId) {\n      var parcelsForOneUser = [];\n\n      _this.forEach(function (parcel) {\n        if (parcel.userId === userId) {\n          parcelsForOneUser.push(parcel);\n        }\n      });\n\n      if (parcelsForOneUser.length) return parcelsForOneUser;\n      return null;\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"editParcelDestinationById\", function (parcelId, destination) {\n      var parcelObj = _this.getParcelById(parcelId);\n\n      if (!parcelObj) return null;\n      var editedParcel = new Parcel(_objectSpread({}, parcelObj.parcel, {\n        destination: destination\n      }));\n\n      var prevThis = _toConsumableArray(_assertThisInitialized(_assertThisInitialized(_this)));\n\n      var editedThis = [];\n      _this.length = 0;\n      editedThis = _toConsumableArray(prevThis.slice(0, parcelObj.index)).concat([editedParcel], _toConsumableArray(prevThis.slice(parcelObj.index + 1)));\n      editedThis.forEach(function (parcel) {\n        _this.push(parcel);\n      });\n      return editedParcel;\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"editParcelCurrentLocationById\", function (parcelId, currentLocation) {\n      var parcelObj = _this.getParcelById(parcelId);\n\n      if (!parcelObj) return null;\n      var editedParcel = new Parcel(_objectSpread({}, parcelObj.parcel, {\n        currentLocation: currentLocation\n      }));\n\n      var prevThis = _toConsumableArray(_assertThisInitialized(_assertThisInitialized(_this)));\n\n      var editedThis = [];\n      _this.length = 0;\n      editedThis = _toConsumableArray(prevThis.slice(0, parcelObj.index)).concat([editedParcel], _toConsumableArray(prevThis.slice(parcelObj.index + 1)));\n      editedThis.forEach(function (parcel) {\n        _this.push(parcel);\n      });\n      return editedParcel;\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"editParcelStatusById\", function (parcelId, _ref2) {\n      var status = _extends({}, _ref2);\n\n      var parcelObj = _this.getParcelById(parcelId);\n\n      if (!parcelObj) return null;\n      var editedParcel = new Parcel(_objectSpread({}, parcelObj.parcel, status));\n\n      var prevThis = _toConsumableArray(_assertThisInitialized(_assertThisInitialized(_this)));\n\n      var editedThis = [];\n      _this.length = 0;\n      editedThis = _toConsumableArray(prevThis.slice(0, parcelObj.index)).concat([editedParcel], _toConsumableArray(prevThis.slice(parcelObj.index + 1)));\n      editedThis.forEach(function (parcel) {\n        _this.push(parcel);\n      });\n      return editedParcel;\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"removeParcelById\", function (parcelId) {\n      var parcelIndex = null;\n      var tempParcel = null; // eslint-disable-next-line no-restricted-syntax\n\n      var _iteratorNormalCompletion2 = true;\n      var _didIteratorError2 = false;\n      var _iteratorError2 = undefined;\n\n      try {\n        for (var _iterator2 = _this.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n          var _step2$value = _slicedToArray(_step2.value, 2),\n              index = _step2$value[0],\n              value = _step2$value[1];\n\n          if (value.parcelId === parcelId) {\n            parcelIndex = index;\n            tempParcel = value;\n            break;\n          }\n        }\n      } catch (err) {\n        _didIteratorError2 = true;\n        _iteratorError2 = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {\n            _iterator2.return();\n          }\n        } finally {\n          if (_didIteratorError2) {\n            throw _iteratorError2;\n          }\n        }\n      }\n\n      if (tempParcel) {\n        _this.splice(parcelIndex, 1);\n      } else {\n        return null;\n      }\n\n      return tempParcel;\n    });\n\n    return _this;\n  }\n\n  return ParcelsCollection;\n}(_wrapNativeSuper(Array));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ParcelsCollection);\n\n//# sourceURL=webpack:///./src/classes/parcelsDataStructure.js?");

/***/ }),

/***/ "./src/routes/parcelsRoutesV1.js":
/*!***************************************!*\
  !*** ./src/routes/parcelsRoutesV1.js ***!
  \***************************************/
/*! exports provided: default, myParcels */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"myParcels\", function() { return myParcels; });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _classes_parcelsDataStructure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/parcelsDataStructure */ \"./src/classes/parcelsDataStructure.js\");\n\n\nvar Router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\nvar myParcels = new _classes_parcelsDataStructure__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nRouter.get('/', function (req, res) {\n  // database.createNewParcel();\n  res.json(myParcels);\n});\nRouter.post('/', function (req, res) {\n  /**\n   * =====Setting up the price====\n   * The currency is $\n   * 1kg of weight cost 12$\n   */\n  var price = req.body.weight * 12;\n  var createdParcel = myParcels.createNewParcel(req.body.userId, req.body.weight, req.body.pickupLocation, req.body.destination, req.body.description, price);\n\n  if (createdParcel) {\n    res.status(201).json(createdParcel);\n  } else {\n    res.status(400).json({\n      message: 'Sorry, something might be wrong with your data'\n    });\n  }\n});\nRouter.get('/:parcelId', function (req, res) {\n  var parcel = myParcels.getParcelById(Number.parseInt(req.params.parcelId, 10));\n\n  if (parcel) {\n    res.status(200).json(parcel.parcel);\n  } else {\n    res.status(404).json({\n      message: 'No match found'\n    });\n  }\n});\nRouter.put('/:parcelId/cancel', function (req, res) {\n  var parcelId = Number.parseInt(req.params.parcelId, 10);\n  var removedParcel = myParcels.removeParcelById(parcelId);\n\n  if (removedParcel) {\n    res.status(202).json({\n      message: 'Parcel removed'\n    });\n  } else {\n    res.status(404).json({\n      message: 'Sorry, something went wrong'\n    });\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (Router);\n\n\n//# sourceURL=webpack:///./src/routes/parcelsRoutesV1.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ })

/******/ });