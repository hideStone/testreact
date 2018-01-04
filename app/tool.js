const tool = {
	fetchData(url, data, cb) {
		this.forIos('showLoading', { body: '' })
		this.forAndroid('showLoading')
		fetch(url, data).then((response) => {
			this.forIos('dismissLoading', { body: '' })
			this.forAndroid('dismissLoading')
			if(response.ok) {
				return response.json()
			}
		}).then((res) => {
			if (res.status > 0) {
				this.forIos('submitSuccess', { message: res.message })
				this.forAndroid('showToastAndFinish', res.message)
			} else {
				this.forIos('submitFail', { message: res.message })
				this.forAndroid('showToast', res.message)
			}
		}).catch((error)=>{
			console.log(error)
		})
	},
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
	},
	calc_file_type(url) {
		const splitArr = url.split('.')
		const type = splitArr[splitArr.length - 1]
		switch(type) {
			case 'doc':
			case 'docx':
				return 'doc'
				break;
			case 'xls':
				return 'excel'
				break;
			case 'pdf':
				return 'pdf'
				break;
			case 'ppt':
			case 'pptx':
				return 'ppt'
				break;
			case 'txt':
				return 'txt'
				break;
			case 'jpg':
			case 'JPG':
			case 'png':
			case 'PNG':
				return 'pic'
				break;
			default:
				return 'file'
				break;
		}
	},
	makeUpData(formDom) {
		const inputLists = formDom.querySelectorAll('input,textarea,radio') // ?如遇到更多表单类型可能出bug
		const tempObj = {}
		for(let info of [...inputLists]) {
			tempObj[info.name] = info.value
		}
		return tempObj
	}
}

export default tool