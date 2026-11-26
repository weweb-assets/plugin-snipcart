// The previous editor still mounts the Vue form. Once the new editor adopts a
// checkout, the project's published HTML owns its public key.
export function hasManagedStorefront() {
    const html = wwLib.wwWebsiteData?.info?.bodyScripts;
    if (typeof html !== 'string' || !html.includes('data-ww-storefront')) return false;
    const template = document.createElement('template');
    template.innerHTML = html;
    return !!template.content.querySelector('div#snipcart[ww-plugin-snipcart][data-ww-storefront="1"]');
}
