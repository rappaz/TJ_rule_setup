// ModalViewDetail 에서 savesearch 컨트롤.

require([
     "jquery",
     "underscore",
     "backbone",
     "../app/TJ/components/ModalView",
     "../app/TJ/components/ModalViewDetail",
     "splunkjs/mvc",
     "splunkjs/mvc/tableview",
     "splunkjs/mvc/searchmanager",
     "splunkjs/mvc/savedsearchmanager",
     "splunkjs/mvc/simplexml/ready!"
     ], function(
            $,
            _,
            Backbone,
            ModalView,
            ModalViewDetail,
            mvc,
            TableView,
            SearchManager,
            SavedSearchManager
     ) {


        // ---------------------------------------------- //
        // -------------------- init -------------------- //
        // ---------------------------------------------- //

        // 서비스 인스턴스 생성
        var service = mvc.createService({ owner: "nobody" });

        // savedsearch 인스턴스 생성
        var mySavedSearches = service.savedSearches();


        // ---------------------------------------------- //
        // --------------- Click Function --------------- //
        // ---------------------------------------------- //

        




    });

