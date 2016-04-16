define([
    'underscore',
    'backbone',
    'jquery',
    'splunkjs/mvc/searchmanager',
    'splunkjs/mvc/simplexml/element/table',

    ], function(_, Backbone, $, SearchManager, TableElement) {

    var ModalView = Backbone.View.extend({
	    defaults: {
	        /*default values if none are given i.e the modal’s title*/
	        title : '검색 결과'
	    },
	    initialize: function(options) {
	        /* Where initial values passed in to an instance
	           of this view will be handled */
	        //the options parameter allows us to pass values to our view
            this.options = options;
            //this checks for values in the default object or if a title was
            //actually passed through the options parameter
            this.options = _.extend({}, this.defaults, this.options);
            //for testing purposes we will log out the title
            console.log('Hello from Modal View: ' + this.options.title);

            this.childViews = [];
	    },

	    events: {
	        /* events such as the click of a button */
	    },

	    render: function() {
	        /* renders the view */
	    },

	    show: function() {


			//create a new div in which we will add our table
			$(this.el).find('.modal-body').append('<div id="modalVizualization"/>');
			//modify the modal so it occupies 90% of the screen width
			$(this.el).find('.modal').css({
			    width:'90%',
			    height:'auto',
			    left: '5%',
			    'margin-left': '0',
			    'max-height':'100%'
			});

			//get a reference to the search
			var search = mvc.Components.get(this.options.search.id);
			 
			//define our table view and we will use the search as the manager to populate it
			var detailTable = new TableElement({
			        id: "detailTable",
			        managerid: search.name,
			        pageSize: "5",
			        el: $('#modalVizualization')
			}).render();
			 
			//add our detailTable to our childViews array so we can remove them later
			this.childViews.push(detailTable);
			 
			//run the search
			search.startSearch();

		},

	   	close: function() {
	        /* handles the closing of the modal window */

			_.each(this.childViews, function(childView){
		    childView.unbind();
		    childView.remove();
		});
	    }
    });
 
    //return the modal in order to access it
    return ModalView;
 
});