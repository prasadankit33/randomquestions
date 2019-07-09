var generateSingleSet = function(numpersetv,rangebegv,rangeendv,unique,sort,view) {
	rNUMBERS = new Array(numpersetv);
	rangebegv = parseInt(rangebegv);
	rangeendv = parseInt(rangeendv);
	//console.log("Number per set is " + numpersetv);
	//console.log("Range begining is " + rangebegv);
	//console.log("Range end is " + rangeendv);
	var switchit = 0;
	for (var ra = 0; ra < (numpersetv); ra++) {
		rNUMBERS[ra] = ((Math.floor(Math.random() * ((rangeendv + 1) - (rangebegv)))) + (rangebegv));
		//console.log("Picked number " + rNUMBERS[ra]);
		// determine if unique numbers are desired     
		if (unique == 0){
			// make numbers unique
			for (var rb = 0; rb < ra; rb++) {
				while (rNUMBERS[ra] == rNUMBERS[rb]){
					//console.log("While looping...");
	        		rNUMBERS[ra] = ((Math.floor(Math.random() * ((rangeendv + 1) - (rangebegv)))) + (rangebegv));
					rb = 0;
				}
			}
		}
	}

	// determine if sorted numbers are desired
	if (sort == 1){
	// sort numbers numerically -- least to greatest
		function sortitlg(a,b){
			return(a-b)
		}
		rNUMBERS.sort(sortitlg) ;
	} else if (sort == 2){
	// sort numbers numerically -- greatest to least
		function sortitgl(c,d){
			return(d-c)
		}
		rNUMBERS.sort(sortitgl) ;
	}
	
	return rNUMBERS;
}

window.spn_randomize = function() {
	
	var randomizer = $(".randomizer");
	
	var html = [], k= 0;;
	
	var viewType = randomizer.find("[name=view]").get(0).selectedIndex;
	
	var pvalue = 1;
	var totalScore = 0;
	
	clickedRandom = 1;
	
	if (!($.isNumeric(randomizer.find("[name=sets]").val())) || !($.isNumeric(randomizer.find("[name=nums]").val())) || !($.isNumeric(randomizer.find("[name=from]").val())) || !($.isNumeric(randomizer.find("[name=to]").val()))) {
	    //$("body").append(lightboxTemplateFunc("Error Detected", "Please enter a positive whole number for all values (with no decimal places, leading zeros, or non-numeric characters)." ));	
		//console.log('Huh?');
		$("#myModalLabel").html('Error Detected');
		$("#printThisToo").append("<p class=\"errorText\">Please enter whole numbers that are zero or above for all values (with no decimal places, leading zeros, or non-numeric characters).<\/p>");
		$("#btnDownload").hide();
		$("#btnPrint").hide();
		$("#btnPrintMobile").hide();
		$("#btnDownloadMobile").hide();
		return false;
	} else if ((randomizer.find("[name=from]").val()) <= 0 || (randomizer.find("[name=to]").val()) <= 0 ) { 
	  //$("body").append(lightboxTemplateFunc("Error Detected", "You must enter positive integers in the “Number range...” boxes. Please enter appropriate values." ));
		$("#myModalLabel").html('Error Detected');
		$("#printThisToo").append("<p class=\"errorText\">Please enter whole numbers that are zero or above in the “Number range...” boxes.<\/p>");
		$("#btnDownload").hide();
		$("#btnPrint").hide();
		$("#btnPrintMobile").hide();
		$("#btnDownloadMobile").hide();
	  	return false;
	} else if ((randomizer.find("[name=sets]").val()) <= 0) { 
	  //$("body").append(lightboxTemplateFunc("Error Detected", "You must enter a positive integer in the “How many sets of numbers...” box. Please enter an appropriate value." ));
		$("#myModalLabel").html('Error Detected');
		$("#printThisToo").append("<p class=\"errorText\">You must enter a positive integer in the “How many sets of numbers...” box. Please enter an appropriate value.<\/p>");
		$("#btnDownload").hide();
		$("#btnPrint").hide();
		$("#btnPrintMobile").hide();
		$("#btnDownloadMobile").hide();
	  	return false;
	} else if ((randomizer.find("[name=nums]").val()) <= 0) { 
	    //$("body").append(lightboxTemplateFunc("Error Detected", "You must enter a positive integer in the “How many numbers per set?” box. Please enter an appropriate value." ));
		$("#myModalLabel").html('Error Detected');
		$("#printThisToo").append("<p class=\"errorText\">You must enter a positive integer in the “How many numbers per set?” box. Please enter an appropriate value.<\/p>");
		$("#btnDownload").hide();
		$("#btnPrint").hide();
		$("#btnPrintMobile").hide();
		$("#btnDownloadMobile").hide();
	    return false;
	} else if (parseInt(randomizer.find("[name=from]").val()) >= parseInt(randomizer.find("[name=to]").val())) { 
  		$("#myModalLabel").html('Error Detected');
		$("#printThisToo").append("<p class=\"errorText\">The value in the “From” box must be less than the value in the “To” box. Please enter appropriate values.<\/p>");
		$("#btnDownload").hide();
		$("#btnPrint").hide();
		$("#btnPrintMobile").hide();
		$("#btnDownloadMobile").hide();
	  return false;
	} else if (((randomizer.find("[name=nums]").val()) > (((randomizer.find("[name=to]").val()) - (randomizer.find("[name=from]").val())) +1)) && ((randomizer.find("[name=unique]").get(0).selectedIndex) == 0)) {
	    //$("body").append(lightboxTemplateFunc("Error Detected", "You cannot generate more unique numbers per set than there are numbers in the specified range. Please enter appropriate values." ));  
		$("#myModalLabel").html('Error Detected');
		$("#printThisToo").append("<p class=\"errorText\">You cannot generate more unique numbers per set than there are numbers in the specified range. Please enter appropriate values.<\/p>");
		$("#btnDownload").hide();
		$("#btnPrint").hide();
		$("#btnPrintMobile").hide();
		$("#btnDownloadMobile").hide();
	  return false;
	} else if ( randomizer.find("[name=sets]").val() > 999 || randomizer.find("[name=nums]").val() > 999 ) {
	  $("#myModalLabel").html('Tip');
	  $("#printThisToo").append("<p class=\"errorText\">Please make sure that the number of sets you request, and numbers per set, are below 1000. If you want to generate more or larger random number sets than that, please <a class=\"lightlink\" href=\"http://windows.microsoft.com/en-us/internet-explorer/\" target=\"_blank\">upgrade your browser<\/a>.<\/p>");	  
	  $("#btnDownload").hide();
	  $("#btnPrint").hide();
	  $("#btnPrintMobile").hide();
	  $("#btnDownloadMobile").hide();
	  return false;
	}
	
	
	//$("#printThisToo").append("Randomizer Results");
	
	//$("body").append(lightboxTemplateFunc("Randomizer Results", html.join("")));
	var sets = String(Math.floor(randomizer.find("[name=sets]").val()));
	var num = String(Math.floor(randomizer.find("[name=nums]").val()));
	var from = String(Math.floor(randomizer.find("[name=from]").val()));
	var to = String(Math.floor(randomizer.find("[name=to]").val()));
	
	var unique = randomizer.find("[name=unique]").get(0).selectedIndex;
	var sort = randomizer.find("[name=sort]").get(0).selectedIndex; 
	var view = randomizer.find("[name=view]").get(0).selectedIndex;
	
	var intro = "<p><span class=\"red darker\">" + sets.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') + "<\/span>";
	if (sets > 1) {
		intro = intro + " Sets "
	} else {
		intro = intro + " Set "
	}
	intro = intro + "of <span class=\"red darker\">" + num.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	if (unique == 0) {
		intro = intro + " Unique";
	}
	
	if (sets > 1 && num > 1) {
		intro = intro + "<\/span> Numbers Per Set";
	} else if (sets == 1 && num == 1) {
		intro = intro + "<\/span> Number";
	} else if (sets > 1 && num == 1) {
		intro = intro + "<\/span> Number";
	} else {
		intro = intro + "<\/span> Numbers";
	}
	intro = intro + "<br>Range: From <span class=\"red darker\">" + from.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') + "<\/span> to <span class=\"red darker\">" + to.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') + "<\/span>";
	
	if (sort == 1) {
		intro = intro + "—  <span class=\"red darker\">Sorted from Least to Greatest<\/span><\/p>";
	} else if (sort == 2) {
		intro = intro + "—  <span class=\"red darker\">Sorted from Greatest to Least<\/span><\/p>";		
	} 
	$("#myModalLabel").html('RESULTS');
	$("#printThisToo").html(intro);
	
	//console.log("Current section is " + currentSection);
	if (currentSection > 0) {
		if (currentSection == 1) {
			html[k++] = "<p><em><strong>Note:<\/strong> For demonstration purposes, the numbers listed below are not actually randomly generated and will be the same every time you run this tutorial.<\/em><\/p>";
			html[k++] = "<h5>Set #1<\/h5>";
			html[k++] = "<p>8, 24, 25, 29, 36, 56, 67, 114, 115, 151, 156, 164, 182, 202, 213, 214, 221, 227, 241, 245, 259, 266, 272, 273, 274, 277, 281, 284, 290, 295, 298, 322, 367, 375, 386, 391, 410, 412, 461, 466, 473, 487, 490, 505, 539, 541, 552, 553, 567, 569<\/p>";
			html[k++] = "<p>You now have a list of all the students selected to participate in your study (Student #8, Student #24, Student #25, and so on). When generating random numbers on the <a target=\"_blank\" href=\"index.html\">Randomizer.org<\/a> web site, you're able to print them, view or download them in an Excel spreadsheet, or copy and paste them into another software program.<\/p>";
			$("#printThisToo").append(html.join(""));
		} else if (currentSection == 2) {
			html[k++] = "<p><em><strong>Note:<\/strong> For demonstration purposes, the numbers listed below are not actually randomly generated and will be the same every time you run this tutorial.<\/em><\/p>";
			html[k++] = "<h5>Set #1<\/h5>";
			html[k++] = "<p>3, 4, 4, 3, 2, 2, 4, 4, 1, 2, 2, 2, 1, 3, 3, 1, 4, 4, 2, 1, 3, 2, 1, 1, 3, 2, 3, 2, 4, 2, 2, 3, 3, 4, 2, 2, 1, 3, 4, 2<\/p>";
			html[k++] = "<p>You now have a list assigning each volunteer to an experimental condition. According to this list, Participant #1 will be assigned to Condition 3 (Wonderdrug 15%), Participant #2 will be assigned to Condition 4 (Placebo), Participant #3 will be assigned to Condition 4 (Placebo), Participant #4 will be assigned to Condition 3 (Wonderdrug 15%), Participant #5 will be assigned to Condition 2 (Wonderdrug 10%), and so on.<\/p> \
	<p>Note that using the Randomizer form this way often leads to different sample sizes within each condition. In this example, for instance, the 40 volunteers were not divided evenly among the 4 experimental conditions (i.e., 10 participants per condition). Instead, only 7 participants ended up in Condition 1; 14 participants ended up in Condition 2; 10 participants ended up in Condition 3; and 9 participants ended up in Condition 4. If you want to assign an equal number of participants to each condition, one way to do it is with a blocked design. The use of blocked designs is covered in Lesson 3.<\/p>";
			$("#printThisToo").append(html.join(""));
		} else if (currentSection == 3) {
			html[k++] = "<p><em><strong>Note:<\/strong> For demonstration purposes, the numbers listed below are not actually randomly generated and will be the same every time you run this tutorial.<\/em><\/p>";
			html[k++] = "<h5>Set #1<\/h5>";
			html[k++] = "<p><small><font color=\"#990000\">p1=<\/font><\/small>4, <small><font color=\"#990000\">p2=<\/font><\/small>1, <small><font color=\"#990000\">p3=<\/font><\/small>3, <small><font color=\"#990000\">p4=<\/font><\/small>2<\/p>";
			html[k++] = "<h5>Set #2<\/h5>";
			html[k++] = "<p><small><font color=\"#990000\">p5=<\/font><\/small>2, <small><font color=\"#990000\">p6=<\/font><\/small>1, <small><font color=\"#990000\">p7=<\/font><\/small>3, <small><font color=\"#990000\">p8=<\/font><\/small>4<\/p>";
			html[k++] = "<h5>Set #3<\/h5>";
			html[k++] = "<p><small><font color=\"#990000\">p9=<\/font><\/small>4, <small><font color=\"#990000\">p10=<\/font><\/small>2, <small><font color=\"#990000\">p11=<\/font><\/small>3, <small><font color=\"#990000\">p12=<\/font><\/small>1<\/p>";
			html[k++] = "<h5>Set #4<\/h5>";
			html[k++] = "<p><small><font color=\"#990000\">p13=<\/font><\/small>1, <small><font color=\"#990000\">p14=<\/font><\/small>2, <small><font color=\"#990000\">p15=<\/font><\/small>4, <small><font color=\"#990000\">p16=<\/font><\/small>3<\/p>";
			html[k++] = "<h5>Set #5<\/h5>";
			html[k++] = "<p><small><font color=\"#990000\">p17=<\/font><\/small>1, <small><font color=\"#990000\">p18=<\/font><\/small>3, <small><font color=\"#990000\">p19=<\/font><\/small>4, <small><font color=\"#990000\">p20=<\/font><\/small>2<\/p>";
			html[k++] = "<h5>Set #6<\/h5>";
			html[k++] = "<p><small><font color=\"#990000\">p21=<\/font><\/small>4, <small><font color=\"#990000\">p22=<\/font><\/small>1, <small><font color=\"#990000\">p23=<\/font><\/small>2, <small><font color=\"#990000\">p24=<\/font><\/small>3<\/p>";
			html[k++] = "<h5>Set #7<\/h5>";
			html[k++] = "<p><small><font color=\"#990000\">p25=<\/font><\/small>3, <small><font color=\"#990000\">p26=<\/font><\/small>2, <small><font color=\"#990000\">p27=<\/font><\/small>4, <small><font color=\"#990000\">p28=<\/font><\/small>1<\/p>";
			html[k++] = "<h5>Set #8<\/h5>";
			html[k++] = "<p>p<small><font color=\"#990000\">29=<\/font><\/small>4, <small><font color=\"#990000\">p30=<\/font><\/small>1, <small><font color=\"#990000\">p31=<\/font><\/small>2, <small><font color=\"#990000\">p32=<\/font><\/small>3<\/p>";
			html[k++] = "<h5>Set #9<\/h5>";
			html[k++] = "<p><small><font color=\"#990000\">p33=<\/font><\/small>4, <small><font color=\"#990000\">p34=<\/font><\/small>3, <small><font color=\"#990000\">p35=<\/font><\/small>2, <small><font color=\"#990000\">p36=<\/font><\/small>1<\/p>";
			html[k++] = "<h5>Set #10<\/h5>";
			html[k++] = "<p><small><font color=\"#990000\">p37=<\/font><\/small>3, <small><font color=\"#990000\">p38=<\/font><\/small>1, <small><font color=\"#990000\">p39=<\/font><\/small>2, <small><font color=\"#990000\">p40=<\/font><\/small>4<\/p>";
			html[k++] = "<p>With these results, Participant #1 will be assigned to Condition 4 (Placebo), Participant #2 will be assigned to Condition 1 (Wonderdrug 5%), Participant #3 will be assigned to Condition 3 (Wonderdrug 15%), Participant #4 will be assigned to Condition 2 (Wonderdrug 10%), Participant #5 will be assigned to Condition 2 (Wonderdrug 10%), and so on.<\/p> \
	<p>One of the nice things about this design is that once the study is complete, there will be identical sample sizes in each condition (n = 10). Also, if for any reason the study is forced to end prematurely, the difference in sample size between any two conditions will be at most one participant. For this reason, random assignment by blocks is a popular procedure among experimenters.<\/p>";
			$("#printThisToo").append(html.join(""));
		} else if (currentSection == 4) {
			html[k++] = "<p><em><strong>Note:<\/strong> For demonstration purposes, the numbers listed below are not actually randomly generated and will be the same every time you run this tutorial.<\/em><\/p>";
			html[k++] = "<h5>Set #1<\/h5>";
			html[k++] = "<p>3920943, 3927666, 3929470, 3927626, 3922034, 3929802, 3922601, 3925134, 3929391, 3923849, 3929011, 3922381, 3925583, 3923230, 3924216, 3927902, 3922575, 3929996, 3924787, 3926785, 3921343, 3922824, 3923858, 3927873, 3927686, 3926153, 3920650, 3922127, 3925985, 3929526, 3923204, 3928946, 3928718, 3929267, 3926937, 3928068, 3926234, 3923873, 3929855, 3926475, 3929492, 3922026, 3928153, 3923098, 3925628, 3923545, 3927573, 3924723, 3928219, 3927663, 3921559, 3920346, 3928457, 3929754, 3929731, 3920506, 3922730, 3920261, 3921251, 3922736, 3923494, 3922005, 3927965, 3923191, 3923282, 3920331, 3923581, 3927492, 3929378, 3925117, 3922060, 3920204, 3920919, 3927579, 3926464, 3928678, 3926301, 3922438, 3928395, 3926442, 3928030, 3927316, 3927040, 3921878, 3922206, 3929539, 3922329, 3929110, 3927501, 3922180, 3928064, 3920638, 3926992, 3928061, 3926993, 3926644, 3920017, 3921065, 3921425, 3924195<\/p>";
			html[k++] = "<p>You now have a list of 100 randomly sampled numbers in this district. Of course, many of these numbers will be unassigned or belong to businesses, so you may want to begin by generating 1000 numbers in this range and then simply use the first 100 valid numbers that you call.<\/p>";
			$("#printThisToo").append(html.join(""));
		} else if (currentSection == 5) {
			html[k++] = "<p><em><strong>Note:<\/strong> For demonstration purposes, the numbers listed below are not actually randomly generated and will be the same every time you run this tutorial.<\/em><\/p>";
			html[k++] = "<h5>Set #1<\/h5>";
			html[k++] = "<p>9, 25, 3, 19, 14, 6, 5, 24, 11, 18, 7, 15, 16, 12, 22, 1, 23, 2, 13, 17, 8, 21, 10, 20, 4<\/p>";
			html[k++] = "<h5>Set #2<\/h5>";
			html[k++] = "<p>2, 16, 9, 1, 11, 6, 4, 19, 17, 21, 25, 7, 22, 12, 10, 15, 3, 14, 18, 20, 5, 13, 23, 24, 8<\/p>";
			html[k++] = "<h5>Set #3<\/h5>";
			html[k++] = "<p>14, 17, 11, 13, 3, 15, 22, 5, 18, 25, 7, 16, 4, 1, 20, 10, 23, 8, 6, 12, 2, 24, 19, 9, 21<\/p>";
			html[k++] = "<p>You now have randomized item orders for three different versions of your test. In Version 1, Item #9 would be presented first, Item #25 would be presented second, Item #3 would be presented third, and so on. In Version 2, Item #2 would be presented first, Item #16 would be presented second, Item #9 would be presented third, and so on. In Version 3, Item #14 would be presented first, Item #17 would be presented second, Item #11 would be presented third, and so on.<\/p> \
	<p>Congratulations -- this ends the last lesson of the tutorial! Please continue to Parts 1 and 2 of the assignment, which are each worth 3 points.<\/p>";
			$("#printThisToo").append(html.join(""));
		}
	} else {
		//console.log("About to generate sets");
		//var sets = generateRandomSets(randomizer.find("[name=sets]").val(), randomizer.find("[name=nums]").val(), randomizer.find("[name=from]").val(), randomizer.find("[name=to]").val(), randomizer.find("[name=unique]").get(0).selectedIndex, randomizer.find("[name=sort]").get(0).selectedIndex, randomizer.find("[name=view]").get(0).selectedIndex);
		//console.log("Generated sets");
		
		if (viewType == 0) {
			/*
			for(var i in sets) {
				html[k++] = "<h5>Set #"+parseInt(parseInt(i)+1)+"<\/h5>";
				html[k++] = "<p>"+sets[i].join(", ")+"<\/p>";
			}
			$("#printThisToo").append(html.join(""));
			*/
			for (var i = 0; i < randomizer.find("[name=sets]").val(); i++) {
				var set = generateSingleSet(randomizer.find("[name=nums]").val(), randomizer.find("[name=from]").val(), randomizer.find("[name=to]").val(), randomizer.find("[name=unique]").get(0).selectedIndex, randomizer.find("[name=sort]").get(0).selectedIndex, randomizer.find("[name=view]").get(0).selectedIndex);
				//console.log(set);
				$("#printThisToo").append("<h5>Set #"+parseInt(parseInt(i)+1)+"<\/h5>");
				$("#printThisToo").append("<p>"+set.join(", ")+"<\/p>");
			}
		} else if (viewType == 1) {
			/*
			for(var i in sets) {
				html[k++] = "<h5>Set #"+parseInt(parseInt(i)+1)+"<\/h5>";
			    pvalue = 1;
				var current_set = sets[i];
			    for (var i=0; i < current_set.length; i++){
			  	  v = current_set[i];
			  	  current_set[i] = "p" + pvalue + "=" + v + "";
			  	  pvalue++;
			    }
				html[k++] = "<p>"+current_set.join(", ")+"<\/p>";
			}
			$("#printThisToo").append(html.join(""));
			*/
			for (var i = 0; i < randomizer.find("[name=sets]").val(); i++) {
				pvalue = 1;
				var current_set = generateSingleSet(randomizer.find("[name=nums]").val(), randomizer.find("[name=from]").val(), randomizer.find("[name=to]").val(), randomizer.find("[name=unique]").get(0).selectedIndex, randomizer.find("[name=sort]").get(0).selectedIndex, randomizer.find("[name=view]").get(0).selectedIndex);
			    for (var j=0; j < current_set.length; j++){
			  	  v = current_set[j];
			  	  current_set[j] = "<small><font color=\"#990000\">p=" + pvalue + "<\/font><\/small>" + v + "";
			  	  pvalue++;
			    }
				$("#printThisToo").append("<h5>Set #"+parseInt(parseInt(i)+1)+"<\/h5>");
				$("#printThisToo").append("<p>"+current_set.join(", ")+"<\/p>");
			}
		} else if (viewType == 2) {
			/*
			for(var i in sets) {
				html[k++] = "<h5>Set #"+parseInt(parseInt(i)+1)+"<\/h5>";
				var current_set = sets[i];
			    for (var i=0; i < current_set.length; i++){
			  	  v = current_set[i];
			  	  current_set[i] = "p" + pvalue + "=" + v + "";
			  	  pvalue++;
			    }
				html[k++] = "<p>"+current_set.join(", ")+"<\/p>";
			}
			$("#myModal .modal-body").append(html.join(""));
			*/
			for (var i = 0; i < randomizer.find("[name=sets]").val(); i++) {
				var current_set = generateSingleSet(randomizer.find("[name=nums]").val(), randomizer.find("[name=from]").val(), randomizer.find("[name=to]").val(), randomizer.find("[name=unique]").get(0).selectedIndex, randomizer.find("[name=sort]").get(0).selectedIndex, randomizer.find("[name=view]").get(0).selectedIndex);
			    for (var j=0; j < current_set.length; j++){
			  	  v = current_set[j];
			  	  current_set[j] = "<small><font color=\"#990000\">p" + pvalue + "<\/font><\/small>=" + v + "";
			  	  pvalue++;
			    }
				$("#printThisToo").append("<h5>Set #"+parseInt(parseInt(i)+1)+"<\/h5>");
				$("#printThisToo").append("<p>"+current_set.join(", ")+"<\/p>");
			}
		}
	}
};
