export default class Storage {
    constructor(name, isJson) {
        this.name = name
        this.isJson = isJson // 存的是否为json
        this.value = localStorage.getItem(this.name)
    }

    get() {
        /*
        *
        * */
        const value = localStorage.getItem(this.name)
        return this.isJson ? JSON.parse(value) : value
    }

    set(value) {
        /*
        *
        * */
        this.value = this.isJson ? JSON.stringify(value) : value;
        localStorage.setItem(this.name, this.value)
    }

    toJsonStr(value) {
        let ms = (() => {
            try {
                return JSON.stringify(value)
            } catch (e) {
                return false
            }
        })();
        return ms ? ms : value
    }

    toStrJson(value) {
        let ms = (() => {
            try {
                return JSON.parse(value)
            } catch (e) {
                return false
            }
        })()
        return ms ? ms : value
    }

    clear() {
        localStorage.removeItem(this.name)
    }
}
