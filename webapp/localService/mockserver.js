sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/base/util/UriParameters"

], function (MockServer, UriParameters) {
    "use strict";

    return{
        init: function(){

            //Create
            var oMockServer = new MockServer({

                rootUri: "https://services.odata.org/V2/Northwind/Northwind.svc/"
                //rootUri:"https://services.odata.org/V2/Northwind/Northwind.svc/Invoices"

            });

            var oUriParameters = new UriParameters(window.location.href);

            //Config mock server
            MockServer.config({

                autoRespond: true,
                autoRespondAfter: oUriParameters.get("serverDelay") || 500
            });


            //Simulate
            var sPath = "../localService";
            oMockServer.simulate(sPath + "/metadata.xml", + sPath + "/mockdata");
        
            
            //Start Mock Server
            oMockServer.start();
        }
    }
});