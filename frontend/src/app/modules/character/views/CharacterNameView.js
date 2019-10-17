"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var CharacterNameView = /** @class */ (function (_super) {
    __extends(CharacterNameView, _super);
    function CharacterNameView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CharacterNameView.prototype.render = function () {
        var avatar = this.props.logoUrl ?
            <react_native_paper_1.Avatar.Image size={64} source={{ uri: this.props.logoUrl }}/> :
            <react_native_paper_1.Avatar.Icon size={64} icon='user'/>;
        return <react_native_1.View style={containerStyle}>
      {avatar}
      <react_native_paper_1.Title style={nameTextStyle}>{this.props.name}</react_native_paper_1.Title>
    </react_native_1.View>;
    };
    return CharacterNameView;
}(react_1["default"].Component));
var containerStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
};
var nameTextStyle = {
    marginLeft: 16
};
exports["default"] = CharacterNameView;
