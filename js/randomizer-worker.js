self.addEventListener('message', function(e) {
  //self.postMessage(e.data);
  spnRandomizeWorker(e.data.sets, e.data.nums, e.data.from, e.data.to, e.data.view, e.data.unique, e.data.sort);
}, false);

var generateSingleSetWorker = function(numpersetv,rangebegv,rangeendv,unique,sort,view) {
	rNUMBERS = new Array(numpersetv);
	rangebegv = parseInt(rangebegv);
	rangeendv = parseInt(rangeendv);
	var switchit = 0;
	for (var ra = 0; ra < (numpersetv); ra++) {
		rNUMBERS[ra] = ((Math.floor(Math.random() * ((rangeendv + 1) - (rangebegv)))) + (rangebegv));
		// determine if unique numbers are desired     
		if (unique == 0){
			// make numbers unique
			for (var rb = 0; rb < ra; rb++) {
				while (rNUMBERS[ra] == rNUMBERS[rb]){
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

var spnRandomizeWorker = function(sets, num, from, to, viewType, unique, sort) {	
	var pvalue = 1;
	var totalScore = 0;
	clickedRandom = 1;	
	var view = viewType;
	
	sets = String(Math.floor(sets));
	num = String(Math.floor(num));
	from = String(Math.floor(from));
	to = String(Math.floor(to));
	
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
	
	self.postMessage({'cmd': 'setText', 'msg': intro});
                            
	if (viewType == 0) {
		for (var i = 0; i < sets; i++) {
			self.postMessage({'cmd': 'setIntro', 'msg': '<h5 class="dkred">Set #'+parseInt(parseInt(i)+1)+'<\/h5>'});
			var set = generateSingleSetWorker(num, from, to, unique, sort, view);
			self.postMessage({'cmd': 'setText', 'msg': '<p class="numberSet sans">'+set.join(", ")+'<\/p>'});
			self.postMessage({'cmd': 'setData', 'msg': set});
		}
	} else if (viewType == 1) {
		for (var i = 0; i < sets; i++) {
			pvalue = 1;
			self.postMessage({'cmd': 'setIntro', 'msg': '<h5 class="dkred">Set #'+parseInt(parseInt(i)+1)+'<\/h5>'});
			var current_set = generateSingleSetWorker(num, from, to, unique, sort, view);
            self.postMessage({'cmd': 'setData', 'msg': current_set});
		    for (var j=0; j < current_set.length; j++){
		  	  v = current_set[j];
		  	  current_set[j] = "<span class=\"pClass\">p" + pvalue + "<\/span><span class=\"pNumber\">=" + v + "<\/span>";
		  	  pvalue++;
		    }
			self.postMessage({'cmd': 'setText', 'msg': '<p class="numberSet sans">'+current_set.join(", ")+'<\/p>'});
		}
	} else if (viewType == 2) {
		for (var i = 0; i < sets; i++) {
			self.postMessage({'cmd': 'setIntro', 'msg': '<h5 class="dkred">Set #'+parseInt(parseInt(i)+1)+'<\/h5>'});
			var current_set = generateSingleSetWorker(num, from, to, unique, sort, view);
            self.postMessage({'cmd': 'setData', 'msg': current_set});
		    for (var j=0; j < current_set.length; j++){
		  	  v = current_set[j];
		  	  current_set[j] = "<span class=\"pClass\">p" + pvalue + "<\/span><span class=\"pNumber\">=" + v + "<\/span>";
		  	  pvalue++;
		    }
			self.postMessage({'cmd': 'setText', 'msg': '<p class="numberSet sans">'+current_set.join(", ")+'<\/p>'})
		}
	}
	self.postMessage({'cmd': 'done'});
};