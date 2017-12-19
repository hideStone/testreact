const tool = {
	/**
	 * 处理url
	 * @param  {[string]} name [description]
	 * @return {[type]}      [description]
	 */
	getUrlParam(name) {
		const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    	const r = window.location.search.substr(1).match(reg);
    	if (r != null) return decodeURI(r[2]); return null;
	},
	/**
	 * @param {string} fnName 
	 * @param {object} options 
	 */
	forIos(fnName, options) {
	    if (options) {
	        this.judgeMobileSystem().isIOS && window.webkit.messageHandlers[fnName].postMessage(options)
	    } else {
	        this.judgeMobileSystem().isIOS && window.webkit.messageHandlers[fnName].postMessage()
	    }
	},
	/**
	 * @param {string} fnName 
	 * @param {string} msg 
	 */
	forAndroid(fnName, msg) {
	    if (msg) {
	        this.judgeMobileSystem().isAnd && android[fnName](msg)
	    } else {
	        this.judgeMobileSystem().isAnd && android[fnName]()
	    }
	},
	/**
	 * 判断手机系统
	 */
	judgeMobileSystem() {
	    var u = navigator.userAgent;
	    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	    return {
	        isAnd: isAndroid,
	        isIOS: isiOS
	    }
	}
}

export default tool