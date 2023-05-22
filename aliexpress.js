// ==UserScript==
// @updateURL      https://raw.githubusercontent.com/PB101010/tampermonkey/main/aliexpress_product_id_extractor.user.js
// @downloadURL    https://raw.githubusercontent.com/PB101010/tampermonkey/main/aliexpress_product_id_extractor.user.js
// @name         提取Aliexpress产品ID
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  在浏览器中右键点击链接，提取产品ID，并在新标签页打开
// @author       ebal.huangjun@gmail.com
// @include      https://csp.aliexpress.com/apps/csp/*
// @include      https://www.aliexpress.com/item/*
// @grant        GM_openInTab
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @run-at       context-menu
// ==/UserScript==

(function() {
    'use strict';

    function extractProductId(url) {
        const regex = /https:\/\/[\w-]*\.?aliexpress\..+\/item\/(\d+)(\.html)?/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }
    
    function() {
    'use strict';

    var productId = window.location.href.match(/\d+.html/)[0].replace('.html', '');
    var newUrl = "https://csp.aliexpress.com/apps/product/publish?productId=" + productId;
    window.open(newUrl, '_blank');
    }

    function openProductPage(productId) {
        const newUrl = `https://aliexpress.com/item/${productId}.html`;
        GM_openInTab(newUrl, {active: true});
    }

    $(document).on('contextmenu', 'a[href*="item/"]', function(event) {
        event.preventDefault();
        const productId = extractProductId(this.href);
        if (productId) {
            openProductPage(productId);
        }
    });
})();
