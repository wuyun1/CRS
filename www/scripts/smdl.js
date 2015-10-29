$(function () {



	$('#fullpage').fullpage({
		anchors: ['page_login', 'page_beginanswer'],
		css3:true,
		paddingTop:"50px",
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
