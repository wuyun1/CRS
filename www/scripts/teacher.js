require.config({
	shim: {
		'bootstrap': ['jquery'],
		'fullpage': ['jquery'],
		'jquery_qrcode': ['jquery'],
		'bootstrapValidator':['bootstrap'],
  		'slimScroll':['jquery']
    },
    paths: {
        jquery: '/jquery/dist/jquery.min',
        bootstrap:'/bootstrap/dist/js/bootstrap.min',
        fullpage:'/fullpage.js/jquery.fullPage',
        socketio:'/socket.io/socket.io',
        slimScroll:"/slimScroll/jquery.slimscroll.min",
        jquery_qrcode:'/jquery-qrcode/jquery.qrcode.min',
        bootstrapValidator:'/bootstrapvalidator/dist/js/bootstrapValidator.min',
    }
});

require(['jquery','socketio','bootstrap','fullpage','jquery_qrcode','slimScroll'], function($,io) {



	$(function () {

		var ctm_data=null;
		var start_dati=false;
		var yd_data={};
		var yd_count=0;
		$('#loading_Modal').modal('show');

		var students=[];
		 // students=students.slice(0,index).concat(students.slice(index+1,students.length));

		function fullpagebuild () {
			// body...
		
			$('#fullpage').fullpage({
				anchors: ['page_login', 'page_beginanswer'],
				css3:true,
				paddingTop:"2px",
				loopHorizontal:false,
				// fixedElements:"#ctl_panel",
				controlArrowColor:"rgba(0,0,0,0)",
				scrollOverflow:true,
				// sectionsColor: ['#fff', 'gray', '#7BAABE', '#f90'],
				afterSlideLoad:function (anchorLink,	index,	slideIndex) {
					// console.log(anchorLink,	index,	slideIndex);
					if(getCurtmid()!=-1){
						da_cur_ti();
					}

				},
				afterLoad:function (anchorLink, index) {
					$("#navbar-nav>.active").removeClass("active");
					$("#navbar-nav>li>a[href=#"+anchorLink+"]").parent().addClass("active");
					console.log(anchorLink);
					if(getCurtmid()!=-1 && start_dati){
						da_cur_ti();
					}
					switch(anchorLink){
						case "page_login":
							// $(document).attr('title','学生二维码登录');
							$("#navbar").show(0);
							
							break;
						case "page_beginanswer":
							// $(document).attr('title','开始答题');
							$("#navbar").hide(0);
							
							break;
						default:
							
							break;
					}
					$(document).attr('title',$("#navbar-nav>.active").text());

				}
			});

		}
		fullpagebuild ();
		var socket = io.connect();

		socket.on('connecting', function(e) {
	           	console.log("正在连接。。。",e);
	        });

		socket.on('connect', function(e) {
	            console.log("连接成功", e);

	            setTimeout(function  () {

	            		socket.emit('teacher_login');
				$('#loading_Modal').modal('hide');


				socket.on("xs_dl",function (index,name,num) {
					students.push({name:name,num:num,serverindex:index});
					var xs_len=students.length;
					$("#xs_len").text(xs_len);
					var newli=$("<li></li>");
					newli.text(name);
					newli.attr("id","xsli_"+num);
					$("#logined_users_box").append(	newli	);
				});

				socket.on("xs_xx",function (index,name,num) {
					students=students.slice(0,index).concat(students.slice(index+1,students.length));
					var xs_len=students.length;
					$("#xs_len").text(xs_len);
					$("#xsli_"+num).remove();
				});

	            },1000);



	        });

		socket.on('disconnect', function(e) {
	           	console.log("断开连接",e);
	        });

		socket.on('connect_failed', function(e) {
	           	console.log("连接失败",e);
	        });

		socket.on('error', function(e) {
	           	console.log("错误发生",e);
	        });

		socket.on('message', function(e) {
	           	console.log("message：",e);
	        });

		socket.on('anything', function(e) {
	           	console.log("anything:",e);
	        });

		socket.on('test', function(e) {
	           	console.log("test:",e);
	        });


		socket.on('tm_data', function(tm_data) {
	           	ctm_data=tm_data;

	           	console.log(ctm_data);
	           	var container=$("#tmlist_wraper");
	           	container.children().remove();
	           	ctm_data.forEach(function (item) {

	           		var tmbox=$("<div>");
	           		tmbox.addClass("slide");

	           		var content=$("<h2>");
	           		content.text(item.content);

	           		var xxbox=$("<ol>");
	           		item.answer.forEach(function (item) {
	           			var xx=$("<li>");
	           			xx.text(item.xx)
	           			// xx.attr("is_right")
	           			xxbox.append(xx);
	           		});
	           		tmbox.append(content).append(xxbox).appendTo(container);



	           	});

	           	$.fn.fullpage.destroy("all")
	           	fullpagebuild ();
	           	$('#loading_Modal').modal('hide');
	           	$.fn.fullpage.moveTo("page_beginanswer");
	           	start_dati=true;
	           	//da_cur_ti ();
	           	

	        });

		
		socket.on('yd_data', function(num,xx_index) {
	        yd_count++;
	        var p=(yd_count/$("#logined_users_box").children().length)*100;
	        console.log( p);
	        $("#p_yd").css("width",p+"%");
	        if(p>=100){
	        	$("#btn_yd").click();
	        }
	    });
		
		socket.on('loginFaild', function(e) {
	           	alert("错误!\n"+e);
	           	$("body").remove();
	       });


		$("ul[aria-labelledby=dropdownMenu2]>li").click(function () {
			console.log($(this).text());
			$("#p_group").val($(this).text());
		});


		$("#btn_yd").click(function () {
			var text=$(this).text();
			if(text=="停止应答"){				
				socket.emit("stop_yd",getCurtmid());
				$("#btn_yd").text("下一题");
			}else if(text=="下一题"){
				$.fn.fullpage.moveSlideRight();
				$("#p_yd").css("width","0%");
				// da_cur_ti ();
			}
		});




		$("#btn_beginanswer").click(function () {

			$("#tip_content").text("正在加载题目数据。。。");
			$('#loading_Modal').modal('show');
			// $('#fullpage').fullpage.moveTo("page_beginanswer");
			socket.emit("get_tm_data","default");

			//return false;
		});


		var xsdlurl=window.location.protocol+"//"+window.location.host+"/xs.html";
		$('#login_bincode').qrcode(xsdlurl);
		console.log(xsdlurl);


		function da_cur_ti () {
					if(start_dati) {
						$("#p_tm").width(100*(getCurtmid()+1)/ ctm_data.length+"%");
						var time_end=3;
						console.log(getCurtmid ());
						$("#btn_yd").attr("disabled","disabled");
						$("#btn_yd").text(time_end+" 秒后开始应答");
						var  tid=setInterval(function function_name (argument) {
							time_end--;
							$("#btn_yd").text(time_end+" 秒后开始应答");


							if(time_end==0){
								clearInterval(tid);
								$("#btn_yd").text("停止应答");
								$("#btn_yd").removeAttr("disabled");
								socket.emit("start_yd",getCurtmid());
								yd_count=0;


							}
							
						},1000);
					}
		}

		function getCurtmid () {
			var r=/#page_beginanswer\/?(\d*)/.exec(location.hash);
			if(r) {
				if(r[1]!="") {
					return +r[1];
				}else{
					return 0;
				}
			}else{
				return -1;
			}
		}


	});

});




