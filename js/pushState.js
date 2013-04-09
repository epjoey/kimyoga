(function($) {

	if (history.pushState) {
		$('.nav-menu a').click(function(e) {
			
				url = $(this).attr("href");
				
				loadPageContent(url, function() {
					history.pushState({'url':url}, 'New URL: '+url, url);
				});

				e.preventDefault();
		});
	}
	
	//fired when back/forward is used from a pushState history item
	window.onpopstate = function(event) {
		if (event.state == null) { //dont fire ajax on initial page load
        	return;
        }
        loadPageContent(location.href);
	};

	function loadPageContent(url, onSuccess){
		
		//$("#loading").show();

		$.get("/wp-admin/admin-ajax.php", 
			{
				action: 'get_page_content',
				url: url
			},
			function(page) {
				document.title = page.post_title + " | Yoga";

				$('.entry-title').html(page.post_title);
				$('.entry-content').html(page.post_content);

				//$("#loading").hide();
				
				//select the current nav item
				$('.nav-menu li').removeClass('current_page_item');
				$('.nav-menu li a[href="'+url+'"]').parent().addClass('current_page_item');	

				if (onSuccess) {
					onSuccess();
				}			
			}
		);
		

	}

})(jQuery);	