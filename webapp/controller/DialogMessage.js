sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"

], function(ManagedObject, Fragment, JSONModel) {
	"use strict";

	return ManagedObject.extend("DemoUI5.controller.DialogMessage", {
		constructor: function(oView) {
			this._oView = oView;
		},

		exit: function() {
			delete this._oView;
		},

		open: function() {
			var oView = this._oView;

			// create the dialog lazily
			if (!oView.byId("dialogMessage")) {
				
				var oFragmentController = {
					onCloseDialog : function () {
						oView.byId("dialogMessage").close();
					}
				};
				
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "DemoUI5.view.DialogMessage",
					controller: oFragmentController
				}).then(function(oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				oView.byId("dialogMessage").open();
			}

			var oBundle = oView.getModel("i18n").getResourceBundle();
			var signUpMsg = oBundle.getText("dialogMsg");

			var oDialogTxt = {
				text: {
					text: signUpMsg
				}
			};
			var oModel = new JSONModel(oDialogTxt);
			oView.setModel(oModel, "dialogMessageModel");

			//this._oView = oView;

		}
	});

});