// ==UserScript==
// @updateURL      https://github.com/PB101010/tampermonkey/raw/main/aliexpress_product_id_extractor.user.js
// @downloadURL    https://github.com/PB101010/tampermonkey/raw/main/aliexpress_product_id_extractor.user.js
// @name         提取Aliexpress产品ID
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在浏览器中右键点击链接，提取产品ID，并在新标签页打开
// @author       ebal.huangjun@gmail.com
// @include      https://csp.aliexpress.com/apps/csp/*
// @grant        GM_openInTab
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    function extractProductId(url) {
        const regex = /https:\/\/aliexpress\..+\/item\/(\d+)\.html/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
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
