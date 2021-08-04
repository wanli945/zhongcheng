import addPrototype from "./addPrototype"
// 优化放在
// import addComponent from "./addComponent"


export default {
    install: (Vue, options) => {
        addPrototype(Vue, options)
        // addComponent(Vue, options)
    },

}
