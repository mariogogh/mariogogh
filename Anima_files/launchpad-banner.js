

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || 
                              Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

var elements = document.getElementsByTagName('a');
for(var i = 0, len = elements.length; i < len; i++) {
    var el = elements[i];
    el.addEventListener('click', function (e) {
        var closestElement = e.target.closest('a');
        if (closestElement) {
            var href = closestElement.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript:')) {
              window.parent.postMessage({event: 'link.clicked', href: href}, '*');
            }   
        }
    });
}

//window.addEventListener('popstate', function(e) {
//});
