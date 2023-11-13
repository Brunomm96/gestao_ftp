const createComponent = (value, initialListener) => {
    return {
        valueInternal: value,

        valueListener: (val) => initialListener(val),

        set value(val) {
            this.valueInternal = val;
            this.valueListener(val);
        },

        get value() {
            return this.valueInternal;
        },

        registerListener: (listener) => {
            this.valueListener = listener;
        }
    }
}

const onComponentChange = (event, components) => {
    components.foreach(component => {
        component.registerListener(event)
    })
}

export {
    createComponent,
    onComponentChange
}