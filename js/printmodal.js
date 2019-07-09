// JavaScript Document

if (document.getElementById("btnPrint") != null) {
	document.getElementById("btnPrint").onclick = function() {
	    printElement(document.getElementById("printThis"));
	    printElement(document.getElementById("printThisToo"), true, "<hr />");
		setTimeout( window.print(), 500);
	}	
}

if (document.getElementById("btnPrintMobile") != null){
	document.getElementById("btnPrintMobile").onclick = function() {
	    printElement(document.getElementById("printThis"));
	    printElement(document.getElementById("printThisToo"), true, "<hr />");
	    window.print();
	}	
}

function printElement(elem, append, delimiter) {
    var domClone = elem.cloneNode(true);

    var $printSection = document.getElementById("printSection");

    if (!$printSection) {
        var $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
    }

    if (append !== true) {
        $printSection.innerHTML = "";
    }

    else if (append === true) {
        if (typeof(delimiter) === "string") {
            $printSection.innerHTML += delimiter;
        }
        else if (typeof(delimiter) === "object") {
            $printSection.appendChlid(delimiter);
        }
    }

    $printSection.appendChild(domClone);
}
