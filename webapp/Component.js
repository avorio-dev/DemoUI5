sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"./model/models",
	"./controller/DialogMessage"

], function(UIComponent, Device, models, DialogMessage) {
	"use strict";

	return UIComponent.extend("DemoUI5.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			//Set default lang
			//sap.ui.getCore().getConfiguration().setLanguage("it"); /*lingua di default italiano*/

			//create the views based on URL/Hash
			this.getRouter().initialize();
		},

		getContentDensityClass: function() {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},

		exit: function() {
			this._dialogMessage.destroy();
			delete this._dialogMessage;
		},
		openDialogMessage: function() {
			this._dialogMessage = new DialogMessage(this.getRootControl());
			this._dialogMessage.open();
		}

	});
});