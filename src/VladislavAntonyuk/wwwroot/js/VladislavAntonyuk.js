window.JsFunctions = {
    acceptMessage: function (cookieString) {
        document.cookie = cookieString;
    },
    getHeadings: function (selector) {
        return Array.from(document.querySelectorAll(selector))
            .filter(h => h.id)
            .map(h => ({ id: h.id, text: h.textContent.trim(), level: Number(h.tagName.substring(1)) }));
    },
    scrollToId: function (id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    initAds: function () {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {

        }
    }
};