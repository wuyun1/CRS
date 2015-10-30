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

		var jQuery=$;
		$('#loading_Modal').modal('show');

		var students=[];
		 // students=students.slice(0,index).concat(students.slice(index+1,students.length));

		$('#fullpage').fullpage({
			anchors: ['page_login', 'page_beginanswer'],
			css3:true,
			paddingTop:"50px",
			scrollOverflow:true,
			sectionsColor: ['#fff', 'gray', '#7BAABE', '#f90'],
			afterLoad:function (anchorLink, index) {
				$("#navbar-nav>.active").removeClass("active");
				$("#navbar-nav>li>a[href=#"+anchorLink+"]").parent().addClass("active");
				// switch(anchorLink){
				// 	case "page_login":
				// 		$(document).attr('title','学生二维码登录');
				// 		break;
				// 	case "page_beginanswer":
				// 		$(document).attr('title','开始答题');
				// 		break;
				// 	default:

				// 		break;
				// }
				$(document).attr('title',$("#navbar-nav>.active").text());

			}
		});

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






		$("ul[aria-labelledby=dropdownMenu2]>li").click(function () {
			console.log($(this).text());
			$("#p_group").val($(this).text());
		});

		$("#btn_beginanswer").click(function () {
			$('#fullpage').fullpage.moveTo("page_beginanswer");
			//return false;
		});


		var xsdlurl=window.location.protocol+"//"+window.location.host+"/xs.html";
		$('#login_bincode').qrcode(xsdlurl);
		console.log(xsdlurl);







	});

});




