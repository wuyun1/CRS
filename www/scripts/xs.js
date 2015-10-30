

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


require(['jquery','socketio','bootstrap','fullpage','bootstrapValidator','slimScroll'], function($,io) {




	$(function (argument) {


		// $("#form_login").submit(function (e) {
		// 	console.log(e);
		// 	return false;
		// })

		var xs_name=null;
		var xs_num=null;
		var xs_index=null;

		var tpl_warning=function  (title,content) {
			// body...
	             return     '<div class="alert alert-warning alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>'+title+'</strong> '+content+'  </div>';
		}



		$('#loading_Modal').modal('show');
		var socket = io.connect();

		socket.on('connecting', function(e) {
	           	console.log("正在连接。。。",e);
	        });

		socket.on('connect', function(e) {
	            console.log("连接成功", e);


	            setTimeout(function  () {
	            		$('#loading_Modal').modal('hide');
	            		socket.emit('xs_login');

	            },1000);


	            	

			//socket.emit('get_all_pro');




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


		socket.on("require_login",function (argument) {
			$('#login_Modal').modal('show');
		});


		socket.on("loginSuccess",function (index,name,num) {
			$('#btn_login').button('reset');
			$('#login_Modal').modal('hide');
			$( '#login_tip' ).hide();
			$('#open_login').hide();
			xs_name=name;
			xs_num=num;
			xs_index=index;
			console.log(xs_name,xs_num,xs_index);		
			$(document).attr('title',"CRS课堂应答器"+"|"+name);


		});


		socket.on("logout",function (index,name,num) {

			location.reload(true);
			//$(document).attr('title',"CRS课堂应答器"+"|未登录！");


		});


		socket.on("loginFaild",function (c) {
			$('#btn_login').button('reset');
			$('#form_login').append($(tpl_warning("登录失败！",c)));
			


		});


		// $('#btn_test').on('click', function () {
		//     var $btn = $(this).button('loading');
		//     // business logic...
		//     setTimeout(function () {
		// 		$btn.button('reset');
		// 	},3000);
		//   });



		$('#btn_login').click(function () {

			$('#form_login').bootstrapValidator('validate');
			if($('#form_login').data('bootstrapValidator').isValid()){
				
				$(btn_login).button('loading');
				setTimeout(function () {
					 socket.emit("xslogin",$("#user_name").val(),$("#user_no").val());
				},2000);
				


			};
			//$('#login_Modal').modal('hide');
		});

		
	});


	$(function () {

		

		$('#form_login').bootstrapValidator({
			// live: 'disabled',
		    message: 'This value is not valid',
		    feedbackIcons: {
		        valid: 'glyphicon glyphicon-ok',
		        invalid: 'glyphicon glyphicon-remove',
		        validating: 'glyphicon glyphicon-refresh'
		    },
		    fields: {

		        user_name: {
		            message: 'The username is not valid',
		            validators: {
		                notEmpty: {
		                    message: 'The username is required and cannot be empty'
		                },
		                stringLength: {
		                    min: 2,
		                    max: 30,
		                    message: 'The username must be more than 3 and less than 30 characters long'
		                },
		                // regexp: {
		                //     regexp: /^[a-zA-Z0-9_\.]+$/,
		                //     message: 'The username can only consist of alphabetical, number, dot and underscore'
		                // },
		                
		                // different: {
		                //     field: 'password',
		                //     message: 'The username and password cannot be the same as each other'
		                // }
		            }
		        },
		        user_no: {
		            message: 'The username is not valid',
		            validators: {
		                notEmpty: {
		                    message: 'The username is required and cannot be empty'
		                },
		                stringLength: {
		                    min: 2,
		                    max: 30,
		                    message: 'The username must be more than 2 and less than 30 characters long'
		                },
		                regexp: {
		                    regexp: /^[0-9]+$/,
		                    message: 'The username can only consist of alphabetical, number, dot and underscore'
		                },
		                
		                // different: {
		                //     field: 'password',
		                //     message: 'The username and password cannot be the same as each other'
		                // }
		            }
		        },
		      




		    }
		});



	});


});






