require([
     "jquery",
     "underscore",
     "backbone",
     "../app/TJ/components/ModalView",
     "splunkjs/mvc",
     "splunkjs/mvc/searchmanager",
     "splunkjs/mvc/savedsearchmanager",
     "splunkjs/mvc/simplexml/ready!"
     ], function(
            $,
            _,
            Backbone,
            ModalView,
            mvc,
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


            // 입력값 가져오기
            var searchName = $("#input_name").val();
            var searchQuery = $("#input_query").val();


            var detailSearch = new SearchManager({
                id: "detailSearch",
                earliest_time: "-24h@h",
                latest_time: "now",
                preview: true,
                cache: false,
                search: searchQuery,
            }, {tokens: true, tokenNamespace: "submitted"});

            // ModalView 인스턴스 생성
            var modal = new ModalView({ title: searchName,  search: detailSearch });

            // e.preventDefault();

            console.log("title : " + searchName);

                    // searchManager 인스턴스 생성


             modal.show();

        });

    });

