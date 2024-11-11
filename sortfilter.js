function errorset() {return true; }

function initialize() {
var _info = navigator.userAgent;
_ie = (_info.indexOf("MSIE") > 0 && _info.indexOf("Win") > 0 && _info.indexOf("Windows 3.1") < 0);
// _ie, arrowU, arrayD is defined in global
  window.onerror=errorset;
// avoid throw javascript error when run sort

if (_ie ) {
      arrowU = document.createElement("SPAN");
      var ad = document.createTextNode("5");
      arrowU.appendChild(ad);
      arrowU.style.fontFamily ="webdings";
      arrowU.style.color="black";
      arrowD = document.createElement("SPAN");
      var ad = document.createTextNode("6");
      arrowD.appendChild(ad);
      arrowD.style.fontFamily="webdings";
      arrowD.style.color="black";
}
else {
      arrowU = document.createElement("SPAN");
      var ad = document.createTextNode(" ");
      arrowU.appendChild(ad);
      arrowU.style.fontFamily ="webdings";
      arrowU.style.color="black";
      arrowD = document.createElement("SPAN");
      var ad = document.createTextNode(" ");
      arrowD.appendChild(ad);
      arrowD.style.fontFamily="webdings";
      arrowD.style.color="black";
}
}

function sortTbl(tableNode, Col, Desc, cType) {

    if (cType==null)
    return;
  var tBody = tableNode.tBodies[0];
  var trs = tBody.rows;
  var trl= trs.length;
  var a = new Array();

  for (var i = 0; i < trl; i++) {
//    if (i==0) {continue}			// Original Filter is the first row
    {
      if (trs[i].getAttribute("style")!="display:none")
        a[i] = trs[i];
    }
  }
  a.sort(compareCol(Col,Desc,cType));
  for (var i = 0; i < trl; i++) {
    if (i%2==0 && oddbc != '')
	a[i].setAttribute("bgColor", oddbc);
    if (i%2==1 && evenbc != '')
	a[i].setAttribute("bgColor", evenbc);
    tBody.appendChild(a[i]);
  }
}

function markTbl(tableNode) {
    var tBody = tableNode.tBodies[0];
    var trs = tBody.rows;
    var trl = trs.length;
    var cnt=0;

    var cnttbl = 0;
    var cntrls=0;
    var minyear="3000";
    var maxyear="0000";
    var mintrs = "3000";
    var maxtrs = "0000";
    var text = "";
    var colrls = 4;
    var colyear = 2;

    for (var i = 0; i < trl; i++) {
        if (trs[i].getAttribute("style")!="display:none")
	{
	  cnt++;
	  cnttbl++;
	  text = trs[i].cells[colrls].textContent.toLowerCase();
          if (text != '')
          {
	    cntrls++;
	    if (text.localeCompare(mintrs) < 0) mintrs = text;	    
	    if (text.localeCompare(maxtrs) > 0) maxtrs = text;
	  }
	  text = trs[i].cells[colyear].textContent.toLowerCase();
	  if (text.localeCompare(minyear) < 0) minyear = text;	    
	  if (text.localeCompare(maxyear) > 0) maxyear = text;
            
	}
        if (cnt % 2 == 0 && oddbc != '')
            trs[i].setAttribute("bgColor", oddbc);
        if (cnt % 2 == 1 && evenbc != '')
            trs[i].setAttribute("bgColor", evenbc);
    }

    text = "共计:"+cnttbl;
    if (minyear != "3000")
      text += " (已发布:"+cntrls+", 待发布:"+(cnttbl-cntrls)+") 原片时间:"+minyear+"-"+maxyear;
    if (mintrs != "3000")
      text += "  发布时间:"+mintrs+"-"+maxtrs;
    var element = document.getElementById('atvttl');
    element.innerHTML = text;
    
//    element = document.getElementByID('atvttlcnt');
// Only display all    element.innerHTML = cnttbl;

}

function parseDate(s) {
  return Date.parse(s.replace(/\-/g, '/'));
}

function compareCol(Col, Descending, cType) {
      var c = Col;
      var d = Descending;
      if (cType == "Number" || cType == "Percentage")
          fTypeCast = Number;
      else if (cType == "Date")
            fTypeCast = parseDate;
      else if (cType == "String")
            fTypeCast = String;
      else if (cType == "None")
            fTypeCast = Boolean;
      else  fTypeCast = String;
 return function (n1, n2) {
 if (_ie ) {
   var s1 = n1.cells[c].innerText;
   var s2 = n2.cells[c].innerText;
   if (s1 == '' || s2 == '')
   {
     if (s1 == s2) return 0;
     else if (s1 == '') return d ? -1 : +1;
     else return d ? +1 : -1;
   }
   if (cType == "Numberx"){
     var r1 = "";
     var r2 = "";
     fTypeCast = Number;
     for (var i=0; i < s1.length; i++) {
       if (s1.charAt(i) != '$' && s1.charAt(i) != '%' && s1.charAt(i) != ',') {
         r1 += s1.charAt(i);
       }
     }
     for (var i=0; i < s2.length; i++) {
       if (s2.charAt(i) != '$' && s2.charAt(i) != '%' && s2.charAt(i) != ',') {
         r2 += s2.charAt(i);
       }
     }
     if (fTypeCast(r1) < fTypeCast(r2))
       return d ? -1 : +1;
     if (fTypeCast(r1) > fTypeCast(r2))
       return d ? +1 : -1;
  }
  else{
    if (fTypeCast(s1) < fTypeCast(s2))
      return d ? -1 : +1;
    if (fTypeCast(s1) > fTypeCast(s2))
      return d ? +1 : -1;
  }
  return 0;
}
else {
  if (fTypeCast(getInnerText(n1.cells[c])) < fTypeCast(getInnerText(n2.cells[c])))
    return d ? -1 : +1;
  if (fTypeCast(getInnerText(n1.cells[c])) > fTypeCast(getInnerText(n2.cells[c])))
    return d ? +1 : -1;
  return 0;
}
}
}


function dspydiv(divname)
{
  var div1 = document.getElementById(divname);
  if (div1 != null)
  {
	// css defines display as none
      if (div1.style.display=="" || div1.style.display=="none") div1.style.display="block";
      else div1.style.display="none";
  }  
}

function sortCol(e) {
  var tmp = e.target ? e.target : e.srcElement;
  var tHeadParent = getParent(tmp, "THEAD");  var el = getParent(tmp, "TH");
  if (tHeadParent == null)
    return;
  if (el != null) {
    var p = el.parentNode;
    var i;
    el._descending = !Boolean(el._descending);
    if (tHeadParent.arrow != null) {
      if (tHeadParent.arrow.parentNode != el) {
        tHeadParent.arrow.parentNode._descending = null;
      }
      tHeadParent.arrow.parentNode.removeChild(tHeadParent.arrow);
    }
    if (el._descending)
      tHeadParent.arrow = arrowU.cloneNode(true);
    else
      tHeadParent.arrow = arrowD.cloneNode(true);
    if (el.getAttribute("type")!="None") {
      el.appendChild(tHeadParent.arrow); 
    }
    var cells = p.cells;
    var l = cells.length;
    for (i = 0; i < l; i++) {
      if (cells[i] == el) break;
    }
    var table = getParent(el, "TABLE");
    sortTbl(table,i,el._descending, el.getAttribute("type"));
  }
}

function getInnerText(el) {
  var str = "";
  var cs = el.childNodes;
  var l = cs.length;
  for (var i = 0; i < l; i++) {
    switch (cs[i].nodeType) {
    case 1: 
      str += getInnerText(cs[i]); break;
    case 3:
      str += cs[i].nodeValue; break;
    }
  }
  return str;
}

function getParent(el, pTagName) {
  if (el == null) return null;
  else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())
    return el;
  else
    return getParent(el.parentNode, pTagName);
}

function enableFilter()
{
      attachFilter(document.getElementById("id1"), 1);
}

function attachFilter(table, filterRow)
{ 
    table.filterRow = filterRow;
    if(table.rows.length > 0)
    {
        var filterRow = table.insertRow(table.filterRow);
        for(var i = 0; i < table.rows[table.filterRow + 1].cells.length; i++)
        {
            var c = document.createElement("TH");
            table.rows[table.filterRow].appendChild(c);
            var opt = document.createElement("select");
            opt.onchange = filter;
         opt.style.width="100%";
             c.style.zoom="100%"; 
             c.style.height="30"; 
             c.className="Header"; 

             c.appendChild(opt);
      }
      table.fillFilters = fillFilters;
      table.inFilter = inFilter;
      table.buildFilter = buildFilter;
      table.showAll = showAll;
      table.filterElements = new Array();
      table.fillFilters();
      table.filterEnabled = true;
  }
}

function inFilter(col)
{
  for(var i = 0; i < this.filterElements.length; i++)
  {
      if(this.filterElements[i].index == col)
          return true;
  }
  return false;
}

function fillFilters()
{
  for(var col = 0; col < this.rows[this.filterRow].cells.length; col++)
  {
 if ( col != 1 &&  col != 2 &&  col != 3 ) {continue}
      if(!this.inFilter(col))
      {
          this.buildFilter(col, "(all)");
      }
  }
}

function buildFilter(col, setValue)
{
  var opt = this.rows[this.filterRow].cells[col].firstChild;
  while(opt.length > 0)
      opt.remove(0);
  var values = new Array();
  for(var i = this.filterRow + 1; i < this.rows.length; i++)
  {
      var row = this.rows[i];
      if(row.style.display != "none" & row.className != "noFilter")
      {
          values.push(row.cells[col].innerHTML.toLowerCase());
      }
  }
  values.sort();
  var value;
  for(var i = 0; i < values.length; i++)
  {
      if(values[i].toLowerCase() != value)
      {
          value = values[i].toLowerCase();
          opt.options.add(new Option(values[i], value));
      }
  }
  opt.options.add(new Option("(all)", "(all)"), 0);
  if(setValue != undefined)
      opt.value = setValue;
  else
      opt.options[0].selected = true;
}

function filter()
{
  var table = this; // 'this' is a reference to the dropdownbox which changed
  while(table.tagName.toUpperCase() != "TABLE")
      table = table.parentNode;
  var filterIndex = this.parentNode.cellIndex; // The column number of the column which should be filtered
  var filterText = table.rows[table.filterRow].cells[filterIndex].firstChild.value;
  var bFound = false;
  for(var i = 0; i < table.filterElements.length; i++)
  {
      if(table.filterElements[i].index == filterIndex)
      {
          bFound = true;
          if(filterText == "(all)")
          {
              table.filterElements.splice(i, 1);
          }
          else
          {
              table.filterElements[i].filter = filterText;
          }
          break;
      }
  }
  if(!bFound)
  {
      var obj = new Object();
      obj.filter = filterText;
      obj.index = filterIndex;
      table.filterElements.push(obj);
  }
  table.showAll();
  for(var i = 0; i < table.filterElements.length; i++)
  {
      table.buildFilter(table.filterElements[i].index, table.filterElements[i].filter);
      for(var j = table.filterRow + 1; j < table.rows.length; j++)
      {
          var row = table.rows[j];
          if(table.style.display != "none" && row.className != "noFilter")
          {
              if(table.filterElements[i].filter != row.cells[table.filterElements[i].index].innerHTML.toLowerCase())
              {
                  row.style.display = "none";
              }
          }
      }
  }
  table.fillFilters();
}

function showAll()
{
  for(var i = this.filterRow + 1; i < this.rows.length; i++)
  {
      this.rows[i].style.display = "";
  }
}

function filterTbl(tableNode, filter)
{
    if (filter==null) return;
    var idx = filter.lastIndexOf("@");
    var filterIdx;
    var filterVal;
    if (idx==-1)
    {
	filterIdx = "title";
	filterVal = filter;
    } else {
	filterIdx = filter.substring(idx+1);
	filterVal = filter.substring(0, idx);
    }
    if (filterIdx=='pub') filterIdx=0;
    else if (filterIdx=='title') filterIdx=1;
    else if (filterIdx=='year') filterIdx=2;
    else if (filterIdx=='sub') filterIdx=4;
    else if (filterIdx=='cat') filterIdx=3;
    else return;

    var tBody = tableNode.tBodies[0];
    var trs = tBody.rows;
    var trl = trs.length;
    var j = filterIdx;
    var disMatch = true;
    filterVal = decodeURIComponent(filterVal).toLowerCase();

// Here is a modify of RE, if the string have ! at begining, then all re will be false

    if (filterVal.startsWith("!"))
    {
        disMatch = false;
        filterVal = filterVal.substring(1);
    }

//    alert(trs[0].cells[0].textContent);
    for (var i = 0; i < trl; i++) {
	var text = trs[i].cells[j].textContent.toLowerCase();
	var isMatch = text.match(filterVal);
//	if (!text.match(filterVal))	// filterVal = re string
        if ((!isMatch && disMatch) || (isMatch && !disMatch)) 
            trs[i].setAttribute("style", "display:none");
    }

}

function setClassText(className, newText)
{

   var elements = document.querySelectorAll(className);
//   alert(className+" "+elements.length);
   elements.forEach(element => {
            element.textContent = newText;
    });
}
