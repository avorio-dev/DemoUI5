sap.ui.define([
	"sap/ui/core/mvc/Controller"

], function (Controller) {
	"use strict";

	function hideProgressIndicator(oContext) {
		var oProgressIndicator = oContext.getView().byId("progInd"); 

		oProgressIndicator.setVisible(false);

	}

	function showProgressIndicator(oContext) {
		var oProgressIndicator = oContext.getView().byId("progInd"); 

		oProgressIndicator.setVisible(true);

		oProgressIndicator.setPercentValue(0);
		oProgressIndicator.setDisplayValue(0 + "%");
	}

	function hideComponent(oContext) {

		var oSignupBtn = oContext.getView().byId("signupBtn"),
			oViewInvoiceBtn = oContext.getView().byId("viewInvoiceBtn"),
			oShowImgBtn = oContext.getView().byId("showImgBtn");

		oSignupBtn.setVisible(false);
		oViewInvoiceBtn.setVisible(false);
		oShowImgBtn.setVisible(false);

	}

	function showComponent(oContext) {

		var oSignupBtn = oContext.getView().byId("signupBtn"),
			oViewInvoiceBtn = oContext.getView().byId("viewInvoiceBtn"),
			oShowImgBtn = oContext.getView().byId("showImgBtn"),
			oProgressIndicator = oContext.getView().byId("progInd");

		if (oProgressIndicator.getPercentValue() === 100) {

			oSignupBtn.setVisible(true);
			oViewInvoiceBtn.setVisible(true);
			oShowImgBtn.setVisible(true);
			oProgressIndicator.setVisible(false);

		}
	}

	return Controller.extend("DemoUI5.controller.Welcome", {
		onInit: function () {

			//Set content density setted in component
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			hideProgressIndicator(this);
			hideComponent(this);
			setTimeout(showProgressIndicator, 1000, this);

			var maxProgress = 100,
				updateInterval = 15,
				currentValue = 0; // 1 secondo di ritardo tra gli aggiornamenti

			function loadComponents(oContext) {
				var oProgressIndicator = oContext.getView().byId("progInd");
				if (currentValue <= maxProgress) {
					oProgressIndicator.setPercentValue(+currentValue);
					oProgressIndicator.setDisplayValue(currentValue + "%");

					currentValue += 1; // Incremento del progresso (puoi modificare questo valore)
					setTimeout(loadComponents, updateInterval, oContext);

				} else {
					setTimeout(showComponent, 100, oContext);
				}
			}

			setTimeout(loadComponents, 1500, this);
			// loadComponents(this); // Inizia l'aggiornamento

		},
		onGoToSignup: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("signup");

		},
		onShowInvoices: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("invoiceList");
		},
		onDummy: function () {
			window.open("https://shorturl.at/tILT5", "_blank");
		}
	});
});