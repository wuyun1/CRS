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
		$('#form_login').append($(tpl_warning("登录失败！",c)));
		


	});




	$('#btn_login').click(function () {

		$('#form_login').bootstrapValidator('validate');
		if($('#form_login').data('bootstrapValidator').isValid()){
			 socket.emit("xslogin",$("#user_name").val(),$("#user_no").val());
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
	                    min: 6,
	                    max: 30,
	                    message: 'The username must be more than 6 and less than 30 characters long'
	                },
	                regexp: {
	                    regexp: /^[a-zA-Z0-9_\.]+$/,
	                    message: 'The username can only consist of alphabetical, number, dot and underscore'
	                },
	                
	                different: {
	                    field: 'password',
	                    message: 'The username and password cannot be the same as each other'
	                }
	            }
	        },
	        user_no: {
	            message: 'The username is not valid',
	            validators: {
	                notEmpty: {
	                    message: 'The username is required and cannot be empty'
	                },
	                stringLength: {
	                    min: 6,
	                    max: 30,
	                    message: 'The username must be more than 6 and less than 30 characters long'
	                },
	                regexp: {
	                    regexp: /^[0-9]+$/,
	                    message: 'The username can only consist of alphabetical, number, dot and underscore'
	                },
	                
	                different: {
	                    field: 'password',
	                    message: 'The username and password cannot be the same as each other'
	                }
	            }
	        },
	      




	    }
	});



});