define([
    'underscore',
    'backbone',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/searchmanager',
    'splunkjs/mvc/simplexml/element/table',
    "splunkjs/mvc/textinputview"
    ], function(_, Backbone, $, mvc, SearchManager, TableElement, TextInputView) {

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
		        title : '상세보기'
		    },

		    initialize: function(options) {

		    	this.options = options;
                this.options = _.extend({}, this.defaults, this.options);
                this.childViews = [];
                console.log('Hello from the modal window: ', this.options.title);
                this.template = _.template(modalTemplate);
		    },

		    events: {
		        'click .close': 'close',              
		        'click .modal-backdrop': 'close'
		    },

		    render: function() {
                var data = { title : this.options.title }
        	    this.$el.html(this.template(data));
                return this;
            },


		    show: function() {

                $(document.body).append(this.render().el);
                
                $(this.el).find('.modal-body').append('<div id="mod_1"/>');
                $(this.el).find('.modal-body').append('<div id="mod_2"/>');
                $(this.el).find('.modal-body').append('<div id="mod_3"/>');
                $(this.el).find('.modal-body').append('<div id="mod_4"/>');
                $(this.el).find('.modal-body').append('<div id="mod_5"/>');

                $(this.el).find('.modal-body').append('<button id="btn_modify">수정');
                $(this.el).find('.modal-body').append('<button id="btn_save">저장');

                // 텍스트입력이랑 버튼 위치 조정 해야함
                // (2, X) 가 좋을듯.
                // 레이블도 붙여야 함. ex) 룰 이름 : _______
                // 대충 와꾸 잡고 일부 텍스트입력은 disabled.
                // savedsearch 에서 데이터 가져와야 하고
                // savedsearch 에 저장도 해야함. 존나 많네. 시벌.


                $(this.el).find('.modal').css({
                    width:'80%',
                    height:'auto',
                    left: '5%',
                    'margin-left': '0',
                    'max-height':'80%'
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
		        /* handles the closing of the modal window */

		        this.unbind();
		        this.remove();

				_.each(this.childViews, function(childView){
				    childView.unbind();
				    childView.remove();
				});
		    }

	    });
	 
    //return the modal in order to access it
    return ModalViewDetail;
 
});


