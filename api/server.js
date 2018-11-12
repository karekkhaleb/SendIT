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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _parcelsRoutesV = __webpack_require__(/*! ./routes/parcelsRoutesV1 */ \"./src/routes/parcelsRoutesV1.js\");\n\nvar _parcelsRoutesV2 = _interopRequireDefault(_parcelsRoutesV);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* eslint-disable prefer-template */\nvar port = process.env.PORT || 9000;\nvar app = (0, _express2.default)();\n\n// middleware\napp.use(_express2.default.json());\n\napp.use('/api/v1/parcels/', _parcelsRoutesV2.default);\n\napp.get('/', function (req, res) {\n  res.json({\n    message: 'Welcome to my API, this is the information about my api',\n    apiV1Routes: {\n      gettingAllParcels: {\n        url: '/api/v1/parcels',\n        method: 'GET'\n      },\n      gettingASingleParcelById: {\n        url: '/api/v1/parcels/<parcelId>',\n        method: 'GET'\n      },\n      gettingParcelsByUserId: {\n        url: '/api/v1/users/<userId>/parcels',\n        method: 'GET'\n      },\n      creatingAParcel: {\n        url: '/api/v1/parcels',\n        method: 'POST',\n        objectFormat: {\n          userId: 'The id of the user creating the parcel',\n          weight: 'The weight of the parcel',\n          pickupLocation: 'The location where the parcel should be picked up',\n          destination: 'The parcel\\'s destination',\n          description: 'Some info about the parcel'\n        }\n      },\n      cancelParcel: {\n        url: '/api/v1/parcels/<parcelId>/cancel',\n        method: 'PUT'\n      }\n    }\n  });\n});\n\napp.get('/api/v1/users/:userId/parcels', function (req, res) {\n  var userId = Number.parseInt(req.params.userId, 10);\n  var userParcels = _parcelsRoutesV.myParcels.getParcelsByUserId(userId);\n  if (userParcels) {\n    res.status(200).json(userParcels);\n  } else {\n    res.status(200).json([]);\n  }\n});\n\n// eslint-disable-next-line no-console\napp.listen(port, function () {\n  return console.log('the app started on port ' + port);\n});\n\nexports.default = app;\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/classes/parcelsDataStructure.js":
/*!*********************************************!*\
  !*** ./src/classes/parcelsDataStructure.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Parcel = function Parcel(_ref) {\n  var payload = _objectWithoutProperties(_ref, []);\n\n  _classCallCheck(this, Parcel);\n\n  this.parcelId = payload.parcelId;\n  this.userId = payload.userId;\n  this.weight = payload.weight;\n  this.pickupLocation = payload.pickupLocation;\n  this.currentLocation = payload.pickupLocation;\n  this.destination = payload.destination;\n  this.description = payload.description;\n  this.delivered = payload.delivered;\n  this.price = payload.price;\n};\n\nvar ParcelsCollection = function (_Array) {\n  _inherits(ParcelsCollection, _Array);\n\n  function ParcelsCollection() {\n    var _ref2;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, ParcelsCollection);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = ParcelsCollection.__proto__ || Object.getPrototypeOf(ParcelsCollection)).call.apply(_ref2, [this].concat(args))), _this), _this.createNewParcel = function (userId, weight, pickupLocation, destination, description, price) {\n      var parcelId = void 0;\n      if (_this.length <= 0) {\n        parcelId = 1;\n      } else {\n        parcelId = _this[_this.length - 1].parcelId + 1;\n      }\n      var newParcel = new Parcel({\n        parcelId: parcelId,\n        userId: userId,\n        weight: weight,\n        pickupLocation: pickupLocation,\n        destination: destination,\n        description: description,\n        price: price,\n        delivered: false\n      });\n\n      if (!newParcel.userId || !newParcel.pickupLocation || !newParcel.parcelId || !newParcel.weight || !newParcel.currentLocation || !newParcel.description || !newParcel.destination || !newParcel.price) {\n        return null;\n      }\n      _this.push(newParcel);\n      return _extends({}, newParcel);\n    }, _this.getParcelById = function (parcelId) {\n      // eslint-disable-next-line no-restricted-syntax\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = _this.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var _ref3 = _step.value;\n\n          var _ref4 = _slicedToArray(_ref3, 2);\n\n          var index = _ref4[0];\n          var value = _ref4[1];\n\n          if (value.parcelId === parcelId) {\n            return {\n              index: index,\n              parcel: _extends({}, value)\n            };\n          }\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator.return) {\n            _iterator.return();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n\n      return null;\n    }, _this.getParcelsByUserId = function (userId) {\n      var parcelsForOneUser = [];\n      _this.forEach(function (parcel) {\n        if (parcel.userId === userId) {\n          parcelsForOneUser.push(parcel);\n        }\n      });\n\n      if (parcelsForOneUser.length) return parcelsForOneUser;\n      return null;\n    }, _this.editParcelDestinationById = function (parcelId, destination) {\n      var parcelObj = _this.getParcelById(parcelId);\n      if (!parcelObj) return null;\n\n      var editedParcel = new Parcel(_extends({}, parcelObj.parcel, { destination: destination }));\n      var prevThis = [].concat(_toConsumableArray(_this));\n      var editedThis = [];\n      _this.length = 0;\n\n      editedThis = [].concat(_toConsumableArray(prevThis.slice(0, parcelObj.index)), [editedParcel], _toConsumableArray(prevThis.slice(parcelObj.index + 1)));\n\n      editedThis.forEach(function (parcel) {\n        _this.push(parcel);\n      });\n      return editedParcel;\n    }, _this.editParcelCurrentLocationById = function (parcelId, currentLocation) {\n      var parcelObj = _this.getParcelById(parcelId);\n      if (!parcelObj) return null;\n\n      var editedParcel = new Parcel(_extends({}, parcelObj.parcel, { currentLocation: currentLocation }));\n      var prevThis = [].concat(_toConsumableArray(_this));\n      var editedThis = [];\n      _this.length = 0;\n\n      editedThis = [].concat(_toConsumableArray(prevThis.slice(0, parcelObj.index)), [editedParcel], _toConsumableArray(prevThis.slice(parcelObj.index + 1)));\n\n      editedThis.forEach(function (parcel) {\n        _this.push(parcel);\n      });\n\n      return editedParcel;\n    }, _this.editParcelStatusById = function (parcelId, _ref5) {\n      var status = _objectWithoutProperties(_ref5, []);\n\n      var parcelObj = _this.getParcelById(parcelId);\n      if (!parcelObj) return null;\n\n      var editedParcel = new Parcel(_extends({}, parcelObj.parcel, status));\n      var prevThis = [].concat(_toConsumableArray(_this));\n      var editedThis = [];\n      _this.length = 0;\n\n      editedThis = [].concat(_toConsumableArray(prevThis.slice(0, parcelObj.index)), [editedParcel], _toConsumableArray(prevThis.slice(parcelObj.index + 1)));\n\n      editedThis.forEach(function (parcel) {\n        _this.push(parcel);\n      });\n\n      return editedParcel;\n    }, _this.removeParcelById = function (parcelId) {\n      var parcelIndex = null;\n      var tempParcel = null;\n      // eslint-disable-next-line no-restricted-syntax\n      var _iteratorNormalCompletion2 = true;\n      var _didIteratorError2 = false;\n      var _iteratorError2 = undefined;\n\n      try {\n        for (var _iterator2 = _this.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n          var _ref6 = _step2.value;\n\n          var _ref7 = _slicedToArray(_ref6, 2);\n\n          var index = _ref7[0];\n          var value = _ref7[1];\n\n          if (value.parcelId === parcelId) {\n            parcelIndex = index;\n            tempParcel = value;\n            break;\n          }\n        }\n      } catch (err) {\n        _didIteratorError2 = true;\n        _iteratorError2 = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion2 && _iterator2.return) {\n            _iterator2.return();\n          }\n        } finally {\n          if (_didIteratorError2) {\n            throw _iteratorError2;\n          }\n        }\n      }\n\n      console.log(tempParcel);\n      if (tempParcel) {\n        // if (parcelIndex === 0) {\n        //   this.shift();\n        // } else {\n        _this.splice(parcelIndex, 1);\n\n        // }\n      } else {\n        return null;\n      }\n      return tempParcel;\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  return ParcelsCollection;\n}(Array);\n\nexports.default = ParcelsCollection;\n\n//# sourceURL=webpack:///./src/classes/parcelsDataStructure.js?");

/***/ }),

/***/ "./src/routes/parcelsRoutesV1.js":
/*!***************************************!*\
  !*** ./src/routes/parcelsRoutesV1.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.myParcels = undefined;\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _parcelsDataStructure = __webpack_require__(/*! ../classes/parcelsDataStructure */ \"./src/classes/parcelsDataStructure.js\");\n\nvar _parcelsDataStructure2 = _interopRequireDefault(_parcelsDataStructure);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Router = _express2.default.Router();\nvar myParcels = new _parcelsDataStructure2.default();\n\nRouter.get('/', function (req, res) {\n  // database.createNewParcel();\n  res.json(myParcels);\n});\n\nRouter.post('/', function (req, res) {\n  /**\n   * =====Setting up the price====\n   * The currency is $\n   * 1kg of weight cost 12$\n   */\n  var price = req.body.weight * 12;\n\n  var createdParcel = myParcels.createNewParcel(req.body.userId, req.body.weight, req.body.pickupLocation, req.body.destination, req.body.description, price);\n\n  if (createdParcel) {\n    res.status(201).json(createdParcel);\n  } else {\n    res.status(400).json({ message: 'Sorry, something might be wrong with your data' });\n  }\n});\n\nRouter.get('/:parcelId', function (req, res) {\n  var parcel = myParcels.getParcelById(Number.parseInt(req.params.parcelId, 10));\n  if (parcel) {\n    res.status(200).json(parcel.parcel);\n  } else {\n    res.status(404).json({ message: 'No match found' });\n  }\n});\n\nRouter.put('/:parcelId/cancel', function (req, res) {\n  var parcelId = Number.parseInt(req.params.parcelId, 10);\n  var removedParcel = myParcels.removeParcelById(parcelId);\n  if (removedParcel) {\n    res.status(202).json({ message: 'Parcel removed' });\n  } else {\n    res.status(404).json({ message: 'Sorry, something went wrong' });\n  }\n});\n\nexports.default = Router;\nexports.myParcels = myParcels;\n\n//# sourceURL=webpack:///./src/routes/parcelsRoutesV1.js?");

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