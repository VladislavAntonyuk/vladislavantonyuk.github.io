window.JsFunctions = {
    acceptMessage: function (cookieString) {
        document.cookie = cookieString;
    },
    initAds: function () {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {

        }
    },
    embedCopyToClipboardCode: function () {
        document.querySelectorAll('pre[class*="language-"]').forEach(function (element) {
            const content = element.innerText;
            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("class", "mud-icon-root mud-svg-icon mud-icon-size-medium copy-to-clipboard");
            svg.setAttribute("cursor", "pointer");
            svg.setAttribute("style", "position:absolute;right:30px;font-size:2rem;fill:#32333dff");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("width", "24");
            svg.setAttribute("height", "24");
            svg.setAttribute("focusable", "false");
            svg.setAttribute("aria-hidden", "true");

            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("fill-rule", "none");
            const copyIconPath = "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z";
            path.setAttribute("d", copyIconPath);

            svg.appendChild(path);

            svg.addEventListener('click', function () {
                navigator.clipboard.writeText(content);
                path.setAttribute("d", "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z");
                setTimeout(() => {
                    path.setAttribute("d", copyIconPath);
                }, 2000);
            });
            element.before(svg);
        });
    }
};