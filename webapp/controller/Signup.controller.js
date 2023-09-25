sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/core/routing/History"

], function(Controller, MessageBox, JSONModel, Fragment, History) {
	"use strict";

	return Controller.extend("DemoUI5.controller.Signup", {
		onInit: function() {

			// set data model on view
			var oData = {
				recipient: {
					username: "",
					email: "",
					password: ""
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel, "userDataModel");

		},

		exit: function() {
			this._dialogMessage.destroy();
			delete this._dialogMessage;
		},

		onSignUpButton: function() {
			this.getOwnerComponent().openDialogMessage();
		},
		onBackPressed: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("welcome");
		},
		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("welcome", {}, true);
			}
		}
	});
});