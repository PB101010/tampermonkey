function parse_item_id(raw_url){
	let idParsed = /(?<=item\/)\d+/.exec(raw_url);
	console.log("raw_url:" + raw_url);
	console.log("id_parsed:" + raw_url);
    // 解析产品id
    return idParsed;
}

function product_detail(){
    let pro_id = parse_item_id(document.activeElement.href);
    if (pro_id == null){return}
    let link_ = "https://www.aliexpress.com/item/" + pro_id + ".html";
    GM_openInTab(link_);
}


function product_edit(){
    let pro_id = parse_item_id(document.activeElement.href);
    if (pro_id == null){return}
    let link_ = "https://gsp.aliexpress.com/apps/product/publish?productId=" + pro_id;
    GM_openInTab(link_);
}


function ali_order() {
    GM_openInTab("https://gsp.aliexpress.com/apps/order/detail?orderId=" + document.getSelection());
}

function aliexpress_main() {
	GM_registerMenuCommand("订单详情", ali_order, "o");
    GM_registerMenuCommand("产品链接", product_detail, "p");
    GM_registerMenuCommand("产品编辑", product_edit, "e");
}
