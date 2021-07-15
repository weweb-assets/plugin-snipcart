<template>
    <div class="snipcart-settings-summary">
        <div class="snipcart-settings-summary__elem">
            <div><wwEditorIcon large name="key" class="snipcart-settings-summary__icon" /></div>
            <span class="snipcart-settings-summary__value caption-m">
                {{ apiKey }}
            </span>
        </div>
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
    &__elem {
        display: flex;
        align-items: center;
        &:not(:last-child) {
            margin-bottom: var(--ww-spacing-02);
        }
    }
    &__icon {
        margin-right: var(--ww-spacing-02);
    }
    &__value {
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
