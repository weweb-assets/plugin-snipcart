/* wwEditor:start */
import './popups';
/* wwEditor:end */

export default {
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        Data
    \================================================================================================*/
    settings: {
        data: {},
        privateData: {
            apiKey: '',
        },
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        Init
    \================================================================================================*/
    async init() {
        /* wwEditor:start */
        const plugin = wwLib.wwPlugins.pluginSnipcart;
        plugin.settings = (await wwLib.wwPlugin.getSettings(plugin.id)) || this.settings;
        if (!plugin.settings.privateData.apiKey) plugin.settings.privateData.apiKey = '';
        if (!plugin.settings.privateData.apiKey.length) {
            this.sidebarButton();
        }
        /* wwEditor:end */
        const isSetup = !!plugin.settings.privateData.apiKey.length;
        if (isSetup) await this.injectSnipcartDependencies();
    },
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        INJECT SNIPCART
    \================================================================================================*/
    async injectSnipcartDependencies() {
        const links = [
            { href: 'https://app.snipcart.com', rel: 'preconnect' },
            { href: 'https://cnd.snipcart.com', rel: 'preconnect' },
            { href: 'https://cdn.snipcart.com/themes/v3.0.30/default/snipcart.css', rel: 'stylesheet' },
        ];
        links.forEach(link => {
            const el = document.createElement('link');
            el.setAttribute('rel', link.rel);
            el.setAttribute('href', link.href);
            document.head.appendChild(el);
        });

        const cart = document.createElement('div');
        cart.setAttribute('id', 'snipcart');
        cart.setAttribute('data-api-key', wwLib.wwPlugins.pluginSnipcart.settings.privateData.apiKey);
        document.body.appendChild(cart);

        const snipcart = document.createElement('script');
        snipcart.setAttribute('async', '');
        snipcart.setAttribute('src', 'https://cdn.snipcart.com/themes/v3.0.30/default/snipcart.js');
        document.body.appendChild(snipcart);
    },
    /*=============================================m_ÔÔ_m=============================================\
        SIDEBAR POPUP
    \================================================================================================*/
    async sidebarButton() {
        try {
            const { id, settings } = wwLib.wwPlugins.pluginSnipcart;
            const isSetup = !!settings.privateData.apiKey.length;
            await wwLib.wwPopups.open({
                firstPage: isSetup ? 'SNIPCART_POPUP' : 'SNIPCART_CONFIGURATION_POPUP',
                data: {
                    pluginId: id,
                    settings,
                },
            });
        } catch (err) {
            wwLib.wwLog.error(err);
        }
    },
    /* wwEditor:end */
};
