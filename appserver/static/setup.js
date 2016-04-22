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


        // save button click function
        $("#button_save").on("click", function (){


            // 입력값 가져오기
            var searchName = $("#input_name").val();
            var searchQuery = $("#input_query").val();
            var searchDesc = $("#input_desc").val();

            console.log(searchName);
            console.log(searchDesc);
            console.log(searchQuery);

            // savedsearch 생성
            mySavedSearches.create({

                name: searchName,
                search: searchQuery,
                description : searchDesc

                }, function(err, newSearch) {

                    if(err){
                        alert("이미 존재하는 이름입니다.");
                        return;
                    } else {
                        console.log("A new saved search was created : \"" + searchName + "\"");
                        alert(searchName + "이(가) 저장 되었습니다.");
                        searchName = "";
                        searchQuery = "";
                        searchQuery = "";
                    }
                }); 
            });

        // verify button click function
        $("#button_verify").on("click", function (){


            var random  = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var result = "";             
            for(var i = 0; i < 6; i++) {
              result += random.charAt(Math.floor(Math.random() * random.length));
            };

            // 입력값 가져오기
            var searchName = $("#input_name").val();
            var searchQuery = $("#input_query").val();
            var detailSearch = new SearchManager({
                id: result,
                earliest_time: "-24h@h",
                latest_time: "now",
                preview: true,
                cache: false,
                search: searchQuery,
            }, {tokens: true, tokenNamespace: "submitted"});

            // ModalView 인스턴스 생성
            var modal = new ModalView({ title: searchName,  search: detailSearch });

            console.log("title : " + searchName);
            console.log("id : " + result);
            modal.show();

        });


        // table custom button
        var ButtonForTable = TableView.BaseCellRenderer.extend({

            canRender: function(cell) {
                // Only use the cell renderer for the 'config' field
                return cell.field === 'config';
            },

            render: function($td, cell) {

                console.log("cell.value :" + cell.value);
                // config 클래스로 생성
                $td.addClass('button').html(_.template('<button type="button" class="config" id="'+cell.value+'">설정</button>', {

                }));
            }

        });


        mvc.Components.get('table_list').getVisualization(function(tableView){
            tableView.addCellRenderer(new ButtonForTable());
        });


        // .config 로 클래스 호출.
        $('body').on('click', '.config', function(e){

            e.preventDefault();
            var modal = new ModalViewDetail({ title: "룰 상세보기"});
            modal.show();
            console.log(this.value);
        });





    });

