<template>
    <div class="snipcart-settings-summary">
        <wwEditorIcon large name="key" class="snipcart-settings-summary__icon"></wwEditorIcon>
        <span class="caption-m">{{ apiKey }}</span>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    computed: {
        apiKey() {
            const apiKey = this.settings.privateData.apiKey || '';
            return apiKey.replace(/./g, '*');
        },
    },
};
</script>

<style lang="scss" scoped>
.snipcart-settings-summary {
    display: flex;
    align-items: baseline;
    &__icon {
        margin-right: var(--ww-spacing-02);
    }
}
</style>
