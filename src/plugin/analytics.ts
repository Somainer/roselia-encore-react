// To make Typescript happy.
interface PaqWindow extends Window {
    _paq?: {
        push(args: any[]): void
    }
}
const globalWindow = window as PaqWindow;
const paq = globalWindow._paq || [];
globalWindow._paq = paq;
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
// Analytic codes
paq.push(["setDomains", ["*.encore.roselia.xyz","*.encore.roselia.moe"]]);
paq.push(['trackPageView']);
paq.push(['enableLinkTracking']);
(function() {
    const u = "//analyse.runode.com/";
    paq.push(['setTrackerUrl', u + 'matomo.php']);
    paq.push(['setSiteId', '4']);
    const d = document;
    const g = d.createElement('script');
    const s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.defer = true;
    g.src = u + 'matomo.js';
    s.parentNode!.insertBefore(g, s);
})();
let currentUrl = location.href;

window.addEventListener('popstate', ev => {
    paq.push(['setReferrerUrl', currentUrl]);
    currentUrl = location.href;
    paq.push(['setCustomUrl', currentUrl]);
    paq.push(['setDocumentTitle', document.title]);

    // remove all previously assigned custom variables, requires Matomo (formerly Piwik) 3.0.2
    paq.push(['deleteCustomVariables', 'page']); 
    paq.push(['setGenerationTimeMs', 0]);
    paq.push(['trackPageView']);

    // make Matomo aware of newly added content
    const content = document.body;
    paq.push(['MediaAnalytics::scanForMedia', content]);
    paq.push(['trackContentImpressionsWithinNode', content]);
    paq.push(['enableLinkTracking']);
})