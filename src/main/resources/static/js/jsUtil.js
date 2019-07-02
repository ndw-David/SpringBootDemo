
var btm = {};

(function($) {
	/**
	 * 获得项目根路径
	 * 
	 * 使用方法：pactera_bi.bp();
	 */
	btm.bp = function() {
		var curWwwPath = window.document.location.href;
		var pathName = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathName);
		var localhostPaht = curWwwPath.substring(0, pos);
		var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
		/*return (localhostPaht + projectName);*/
		return localhostPaht;
	};

})(jQuery);
