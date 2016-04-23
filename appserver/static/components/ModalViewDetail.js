define([
    'underscore',
    'backbone',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/searchmanager',
    'splunkjs/mvc/simplexml/element/table',
    "splunkjs/mvc/textinputview",
    "splunkjs/mvc/savedsearchmanager",
    "splunkjs/mvc/simplexml/ready!"
    ], function(_, Backbone, $, mvc, SearchManager, TableElement, TextInputView, SavedSearchManager) {

    	this.childViews = [];

    	var modalTemplate = "<div id=\"pivotModal\" class=\"modal\">" +
                        "<div class=\"modal-header\"><h3><%- title %></h3></div>" +
                        "<div class=\"modal-body\"></div>" +
                        "<div class=\"modal-footer\"><button " +
                        "class=\"dtsBtn close\">Close</button></div>" +
                        "</div>" +
                        "<div class=\"modal-backdrop\"></div>";

	    var ModalViewDetail = Backbone.View.extend({


		    defaults: {
		        /*default values if none are given i.e the modal’s title*/

		    },

		    initialize: function(options) {

		    	this.options = options;
                this.options = _.extend({}, this.defaults, this.options);
                this.childViews = [];
                console.log('Hello from the modal window: ', this.options.title);
                console.log('Hello from the modal window\'s rulename : ', this.options.rulename);
                this.template = _.template(modalTemplate);
		    },

		    events: {
		        'click .close': 'close',              
		        'click .modal-backdrop': 'close'
		    },

		    render: function() {
                var data = { title : this.options.title, rulename : this.options.rulename };
        	    this.$el.html(this.template(data));
                return this;
            },


		    show: function() {

                $(document.body).append(this.render().el);
                
                $(this.el).find('.modal-body').append('룰 이름 : <span id="mod_1"/>');
                $(this.el).find('.modal-body').append('<div></div>룰 설명 : <span id="mod_2"/>');
                $(this.el).find('.modal-body').append('<div></div>검색문 : <span id="mod_3"/>');
                $(this.el).find('.modal-body').append('<div></div>위험도 : <span id="mod_4"/>');
                $(this.el).find('.modal-body').append('<div></div>작성자 : <span id="mod_5"/><div></div>');

                $(this.el).find('.modal-body').append('<button id="btn_delete" class="delete">삭제');
                $(this.el).find('.modal-body').append('<button id="btn_modify" class="modify">수정');

                // 텍스트입력이랑 버튼 위치 조정 해야함 -> 나중에. tobe.
                // (2, X) 가 좋을듯. -> (1, X) 로 변경.
                // 레이블도 붙여야 함. ex) 룰 이름 : _______ -> ㅇㅇ.
                // 대충 와꾸 잡고 일부 텍스트입력은 disabled. -> ㄴㄴ.

                // savedsearch 에서 데이터 가져와야 하고 -> 클릭한 로우의 이름으로 savedsearch 호출.
                // savedsearch 에 저장도 해야함. 존나 많네. 시벌. -> 상
                // 아 언제하지 금보원 들어가기전엔 해야하는데. 하..


                $(this.el).find('.modal').css({
                    width:'600px',
                    height:'auto',
                    left: '40%',
                    'margin-left': '0',
                    'max-height':'90%'
                });


                var text_rulename = new TextInputView({
                    id: "text_rulename",
                    value: "",
                    default: "type here",
                    el: $("#mod_1")
                }).render();

                var text_ruledesc = new TextInputView({
                    id: "text_ruledesc",
                    value: "",
                    default: "type here",
                    el: $("#mod_2")
                }).render();

                var text_rulequery = new TextInputView({
                    id: "text_rulequery",
                    value: "",
                    default: "type here",
                    el: $("#mod_3")
                }).render();

                var text_rulelevel = new TextInputView({
                    id: "text_rulelevel",
                    value: "",
                    default: "type here",
                    el: $("#mod_4")
                }).render();

                var text_ruleown = new TextInputView({
                    id: "text_ruleown",
                    value: "",
                    default: "type here",
                    el: $("#mod_5")
                }).render();


                this.childViews.push(text_rulename, text_ruledesc, text_rulequery, text_rulelevel, text_ruleown);

                   
            },

		   	close: function() {

		        this.unbind();
		        this.remove();

				_.each(this.childViews, function(childView){
				    childView.unbind();
				    childView.remove();
				});
		    }

	    });



        // ---------------------------------------------- //
        // -------------------- init -------------------- //
        // ---------------------------------------------- //




        // ---------------------------------------------- //
        // --------------- Click Function --------------- //
        // ---------------------------------------------- //


        $('body').on('click', '.delete', function(e){

            e.preventDefault();
            alert("삭제할거임? ㅋㅋ");
        });

        $('body').on('click', '.modify', function(e){

            e.preventDefault();
            alert("수정할거임? ㅋㅋ");
        });



        // ---------------------------------------------- //
        // -------------------- init -------------------- //    
        // ---------------------------------------------- //

        console.log("언제까지하지 : " + temp);

        // 서비스 인스턴스 생성     
        var service = mvc.createService({ owner: "nobody" }); 
        // The saved search created earlier

        var mySavedSearches = service.savedSearches();

        mySavedSearches.fetch(function(err, mySavedSearches) {

          // Retrieve a specific saved search
          var mySavedSearch = mySavedSearches.item(searchName);

          // Display some properties
          console.log("Name:                " + mySavedSearch.name);
          console.log("Query:               " + mySavedSearch.properties().search);
          console.log("Description:         " + mySavedSearch.properties().description);
          console.log("Scheduled:           " + mySavedSearch.properties().is_scheduled);
          console.log("Next scheduled time: " + mySavedSearch.properties().next_scheduled_time);

          // Modify the description and schedule the saved search
          mySavedSearch.update({
            description: "This is a test search",
            is_scheduled: true,         // Schedule the search
            cron_schedule: "15 4 * * 6" // Runs the search on Saturdays at 4:15am
          }, function() {
            console.log("\n...properties were modified...")
          });

          // Create a small delay to allow time for the update between server and client
          splunkjs.Async.sleep(2000, function() {

            // Update the local copy of the object with changes
            mySavedSearch.fetch(function(err, mySavedSearch) {

              // Display the updated properties to verify
              console.log("\nUpdated properties:");
              console.log("Description:         " + mySavedSearch.properties().description);
              console.log("Scheduled:           " + mySavedSearch.properties().is_scheduled);
              console.log("Next scheduled time: " + mySavedSearch.properties().next_scheduled_time);
            });
          });
        });


	 
    //return the modal in order to access it
    return ModalViewDetail;
 
});



