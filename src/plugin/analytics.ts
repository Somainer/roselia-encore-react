// To make Typescript happy.
type JointListType<T, U> = (T | U)[]

interface RecursiveStringList extends JointListType<string, RecursiveStringList> { }

interface PaqWindow extends Window {
    _paq?: RecursiveStringList
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